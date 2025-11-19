// このファイル: 汎用カルーセルコンポーネント。
// - キーボード操作（左右矢印）対応
// - ドット/前後ボタンによる手動切替
// - autoPlay と interval による自動再生サポート
"use client";

import React, { useEffect, useState, useCallback } from "react";
import styles from "./Carousel.module.css";

type Photo = { url: string; alt?: string };

/**
 * 汎用カルーセルコンポーネント
 * @param photos 表示する画像の配列
 * @param autoPlay true の場合、interval ミリ秒ごとに自動で次の画像に切り替え
 * @param interval 自動切替の間隔（ミリ秒）
 */
export default function Carousel({
  photos,
  autoPlay = false,
  interval = 5,
}: {
  photos: Photo[];
  autoPlay?: boolean;
  interval?: number;
}) {
  // photos: 表示する画像配列
  // autoPlay: true の場合 interval ミリ秒ごとに自動で次の画像へ切替
  // interval: 自動切替の間隔（ミリ秒）
  const [index, setIndex] = useState(0);
  const total = photos.length;

  // 前へ／次へ（total に依存）
  const prev = useCallback(
    () => setIndex((i) => (total === 0 ? 0 : (i - 1 + total) % total)),
    [total]
  );
  const next = useCallback(
    () => setIndex((i) => (total === 0 ? 0 : (i + 1) % total)),
    [total]
  );

  // total が変わった場合に index を 0 にリセット（安全対策）
  useEffect(() => {
    if (index >= total) setIndex(0);
  }, [total, index]);

  // 自動再生: autoPlay が有効で total > 0 のとき interval ごとに次の画像へ移動
  useEffect(() => {
        console.log("Carousel:", { autoPlay, interval, total });
    if (!autoPlay || total === 0) return; // autoPlay 無効または画像なしの場合は何もしない
    const id = setInterval(() => {
      setIndex((i) => (total === 0 ? 0 : (i + 1) % total)); // 次の画像に切り替え
    }, interval);
    return () => clearInterval(id);
  }, [autoPlay, interval, total]);

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

      {/* autoPlay が true の場合、前へ/次へボタンは表示しない */}
      {!autoPlay && (
        <>
          <button className={styles.prev} onClick={prev} aria-label="前の画像">
            ‹
          </button>
          <button className={styles.next} onClick={next} aria-label="次の画像">
            ›
          </button>
        </>
      )}

      {/* autoPlay が true の場合はドット（ページネーション）を表示しない */}
      {!autoPlay && (
        <div className={styles.footer}>
          <div className={styles.dots}>
            {photos.map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${
                  i === index ? styles.dotActive : ""
                }`}
                onClick={() => setIndex(i)}
                aria-label={`スライド ${i + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
