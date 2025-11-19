"use client";

// このファイル: お気に入り一覧のクライアントコンポーネント（一覧表示・写真・評価）

import Link from "next/link";
import type { FavoriteSpot } from "@/lib/types";
import styles from "@/app/favorites/Favorites.module.css";
import StarRating from "@/app/components/starRating/StarRating";
import pageStyles from "@/app/page.module.css";

export default function FavoritesPageClient({ data }: { data: FavoriteSpot[] }) {
  return (
    <div className={styles.container}>
      {/* ページタイトル */}
      <h1 className={styles.title}>お気に入り一覧</h1>

      {/* 空状態のメッセージ（アイテムがない場合） */}
      {data.length === 0 && (
        <p className={styles.emptyMessage}>
          まだお気に入りスポットがありません。microCMSでスポットを追加してください。
        </p>
      )}

      {/* スポット一覧（各アイテムをループして表示） */}
      <ul className="space-y-6">
        {data.map((spot) => (
          <li key={spot.id} className={styles.listItem}>
            {/* スポット名（詳細ページへのリンク） */}
            <Link href={`/favorites/${spot.id}`}>
              <h2 className={styles.spotName}>{spot.spot_name}</h2>
            </Link>

            {/* 星評価 */}
            {spot.rating != null && (
              <div style={{ marginTop: 8 }}>
                <StarRating rating={spot.rating} />
              </div>
            )}

            {/* タグ表示 */}
            {spot.tags && spot.tags.length > 0 && (
              <div className="mt-3 flex-wrap gap-2">
                {spot.tags.map((tag) => (
                  <span key={tag} className={styles.tag}># {tag}</span>
                ))}
              </div>
            )}

            {/* 訪問写真（存在する場合にサムネイルを並べる） */}
            {spot.visit_photos?.length ? (
              <div className={`${styles.photoContainer} mt-4`}>
                {spot.visit_photos.map((photo, idx) => (
                  <img key={idx} src={photo.url} alt={`${spot.spot_name} ${idx+1}`} className={styles.photo} />
                ))}
              </div>
            ) : null}
          </li>
        ))}
      </ul>
      {/* トップへ戻るリンク */}
      <Link href="/" className={styles.backLink}>戻る</Link>
    </div>
  );
}
