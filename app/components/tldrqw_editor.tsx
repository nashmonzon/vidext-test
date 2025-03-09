"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  DefaultMenuPanel,
  DefaultToolbar,
  Editor,
  TLComponents,
  TLEventMapHandler,
  Tldraw,
  getSnapshot,
  loadSnapshot,
} from "tldraw";
import "tldraw/tldraw.css";

import { trpc } from "../trpc/client";
import { Snapshot } from "@prisma/client";
import { useTheme } from "next-themes";

export function TldrqwEditor({
  userId,
  snapshots,
}: {
  userId: string;
  snapshots: Snapshot;
}) {
  const [editor, setEditor] = useState<Editor | undefined>();
  const [lastEvent, setLastEvent] = useState<string | null>(null);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const saveSnapshot = trpc.snapshot.saveSnapshot.useMutation();
  const { theme } = useTheme();

  const setAppToState = useCallback((editor: Editor) => {
    setEditor(editor);

    if (snapshots?.data !== null && Object.keys(snapshots.data).length > 0) {
      loadSnapshot(editor.store, JSON.parse(snapshots.data as string));
    }
  }, []);

  useEffect(() => {
    if (!editor) return;

    const logChangeEvent = (eventName: string) => {
      setLastEvent(eventName);
    };

    const handleChangeEvent: TLEventMapHandler<"change"> = (change) => {
      const { added, updated, removed } = change.changes;

      // Added
      Object.values(added).forEach((record) => {
        if (record.typeName === "shape") {
          logChangeEvent(`created shape (${record.type})\n`);
        }
      });

      // Updated
      Object.values(updated).forEach(([from, to]) => {
        if (
          from.typeName === "instance" &&
          to.typeName === "instance" &&
          from.currentPageId !== to.currentPageId
        ) {
          logChangeEvent(
            `changed page (${from.currentPageId}, ${to.currentPageId})`
          );
        } else if (from.id.startsWith("shape") && to.id.startsWith("shape")) {
          const diff = Object.keys(from).reduce(
            (result: any[], key: string) => {
              if (from[key] !== to[key]) {
                result.push(key, to[key]);
              }
              return result;
            },
            []
          );

          if (diff?.[0] === "props") {
            const propsDiff = Object.keys(from.props).reduce(
              (result: string[], key: string) => {
                if (from.props[key] !== to.props[key]) {
                  result.push(key, to.props[key]);
                }
                return result;
              },
              []
            );
            logChangeEvent(`updated shape (${JSON.stringify(propsDiff)})\n`);
          } else {
            logChangeEvent(`updated shape (${JSON.stringify(diff)})\n`);
          }
        }
      });

      Object.values(removed).forEach((record) => {
        if (record.typeName === "shape") {
          logChangeEvent(`deleted shape (${record.type})\n`);
        }
      });
    };

    const cleanupFunction = editor.store.listen(handleChangeEvent, {
      source: "user",
      scope: "all",
    });

    return () => {
      cleanupFunction();
    };
  }, [editor]);

  useEffect(() => {
    if (lastEvent) {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }

      debounceTimeoutRef.current = setTimeout(async () => {
        if (!editor) return;
        const { document, session } = getSnapshot(editor?.store);
        const data = JSON.stringify({
          document,
          session,
        });

        await saveSnapshot.mutateAsync({
          data,
          userId: userId,
          snapshotId: snapshots.id,
        });
        console.log("Enviando al backend:", lastEvent, editor?.store);
      }, 500);
    }
  }, [lastEvent]);

  useEffect(() => {
    if (editor) {
      editor.user.updateUserPreferences({
        colorScheme: theme === "dark" ? "dark" : "light",
      });
    }
  }, [theme, editor]);

  const components: TLComponents = {
    MenuPanel: null,
    Toolbar: CustomToolbar,
  };

  return (
    <div className="flex-1 h-full w-full relative">
      <Tldraw
        onMount={setAppToState}
        components={components}
        persistenceKey="disable-pages"
        options={{ maxPages: 1 }}
      />
    </div>
  );
}

function CustomToolbar() {
  return (
    <div className="ml-12 flex flex-col">
      <DefaultMenuPanel />
      <DefaultToolbar />
    </div>
  );
}
