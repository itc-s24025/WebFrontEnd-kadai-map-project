"use client";

import React, { useEffect, useState } from "react";
import styles from "./Carousel.module.css";

type Photo = { url: string; alt?: string };

export default function Carousel({ photos }: { photos: Photo[] }) {
  const [index, setIndex] = useState(0);
  const total = photos.length;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, total]);

  useEffect(() => {
    if (index >= total) setIndex(0);
  }, [total]);

  const prev = () => setIndex((i) => (total === 0 ? 0 : (i - 1 + total) % total));
  const next = () => setIndex((i) => (total === 0 ? 0 : (i + 1) % total));

  if (total === 0) return null;

  return (
    <div className={styles.container} aria-roledescription="carousel">
      <div className={styles.viewport}>
        {photos.map((p, i) => (
          <img
            key={i}
            src={p.url}
            alt={p.alt ?? `photo-${i + 1}`}
            className={`${styles.img} ${i === index ? styles.active : ""}`}
            aria-hidden={i === index ? "false" : "true"}
          />
        ))}
      </div>

      <button className={styles.prev} onClick={prev} aria-label="前の画像">‹</button>
      <button className={styles.next} onClick={next} aria-label="次の画像">›</button>

      <div className={styles.footer}>
        <div className={styles.dots}>
          {photos.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === index ? styles.dotActive : ""}`}
              onClick={() => setIndex(i)}
              aria-label={`スライド ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}