"use client";
import ImageModal from "@/app/favorites/components/fullImg";
import StarRating from "@/app/favorites/components/starRating";
import styles from "./memo.module.css";

export default function MemoInteractive({
  rating,
  tags,
  photos,
}: {
  rating?: number | null;
  tags?: string[] | null;
  photos?: { url: string; alt?: string }[] | null;
}) {
  return (
    <div className={styles.memoMeta}>
      {/* 1. 複数画像（サムネイル＋モーダル） */}
      {photos && photos.length > 0 && (
        <div className={styles.photoContainer}>
          {/* ImageModal がサムネイル表示を行う想定 */}
          <ImageModal photos={photos} />
        </div>
      )}

      {/* 3. 星評価 */}
      {rating != null && (
        <div className={styles.starsWrap}>
          <StarRating rating={rating} />
        </div>
      )}

      {/* 2. タグ（複数） */}
      {tags && tags.length > 0 && (
        <div className={styles.tagList} aria-hidden={false}>
          {tags.map((t) => (
            <span key={t} className={styles.tag}>
              #{t}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
