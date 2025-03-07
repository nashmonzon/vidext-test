"use client";
import { Tldraw } from "tldraw";
import "tldraw/tldraw.css";
import { useCallback, useEffect } from "react";
import { getSnapshot, loadSnapshot, useEditor } from "tldraw";

function SnapshotToolbar() {
  const editor = useEditor();

  const save = useCallback(() => {
    const { document, session } = getSnapshot(editor.store);
    localStorage.setItem("snapshot", JSON.stringify({ document, session }));
  }, [editor]);

  const load = useCallback(() => {
    const snapshot = localStorage.getItem("snapshot");
    if (!snapshot) return;
    loadSnapshot(editor.store, JSON.parse(snapshot));
  }, [editor]);

  // Cargar automáticamente el último estado guardado al iniciar
  useEffect(() => {
    load();
  }, [load]);

  // Guardado automático
  useEffect(() => {
    const handleChange = () => {
      save();
    };

    // Supongamos que el editor tiene un evento 'change' que podemos escuchar
    editor.on("change", handleChange);

    return () => {
      editor.off("change", handleChange);
    };
  }, [editor, save]);

  return (
    <div
      style={{
        padding: 20,
        pointerEvents: "all",
        display: "flex",
        gap: "10px",
      }}
    >
      <span
        style={{
          display: "inline-block",
          transition: "transform 0.2s ease, opacity 0.2s ease",
          transform: `scale(1)`,
          opacity: 1,
        }}
      >
        Auto-Saved
      </span>
    </div>
  );
}

export const DrawEditor = () => {
  return (
    <div style={{ position: "fixed", inset: 0 }}>
      <Tldraw
        components={{
          SharePanel: SnapshotToolbar,
        }}
      />
    </div>
  );
};
