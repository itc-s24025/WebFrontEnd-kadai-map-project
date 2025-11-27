// ...existing code...
"use client";
import { useState, useEffect } from "react";
import styles from "./fullImg.module.css";

type Photo = { url: string; alt?: string };

export default function ImageModal({ photos }: { photos: Photo[] }) {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!photos || photos.length === 0) return null;

  return (
    <div className={styles.container}>
      <div className={styles.imageModalThumbs}>
        {photos.map((p, i) => (
          <button
            key={i}
            onClick={() => { setIdx(i); setOpen(true); }}
            style={{ border: "none", padding: 0, background: "transparent", cursor: "pointer" }}
            aria-label={`拡大 ${i + 1}`}
          >
            <img src={p.url} alt={p.alt ?? ""} />
          </button>
        ))}
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.85)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            padding: 20,
          }}
        >
          <img
            src={photos[idx].url}
            alt={photos[idx].alt ?? ""}
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "95%", maxHeight: "90%", objectFit: "contain", borderRadius: 8 }}
          />
        </div>
      )}
    </div>
  );
}
