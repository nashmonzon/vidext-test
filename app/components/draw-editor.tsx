"use client";

import { Button } from "@/components/ui/button";

import { Cog } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  DefaultMenuPanel,
  Editor,
  TLComponents,
  TLEventMapHandler,
  Tldraw,
} from "tldraw";
import "tldraw/tldraw.css";
import HistoryDrawer from "./history-drawer";

export function DrawEditor() {
  const [editor, setEditor] = useState<Editor | undefined>();
  const [lastEvent, setLastEvent] = useState<string | null>(null);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [isExpanded, setIsExpanded] = useState(false);

  const setAppToState = useCallback((editor: Editor) => {
    setEditor(editor);
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

      debounceTimeoutRef.current = setTimeout(() => {
        console.log("Enviando al backend:", lastEvent);
      }, 500);
    }
  }, [lastEvent]);

  function CustomMenuPanel() {
    return (
      <div className="ml-12 flex  gap-2">
        <DefaultMenuPanel />
      </div>
    );
  }

  const components: TLComponents = {
    MenuPanel: CustomMenuPanel,
  };

  return (
    <div className="w-full h-[100vh] flex">
      <HistoryDrawer isExpanded={isExpanded} />
      <div className="flex-1 h-full w-full relative">
        <div className="absolute top-0 left-0 z-10">
          <Button onClick={() => setIsExpanded(!isExpanded)}>
            <Cog />
          </Button>
        </div>
        <Tldraw onMount={setAppToState} components={components} />
      </div>
    </div>
  );
}
