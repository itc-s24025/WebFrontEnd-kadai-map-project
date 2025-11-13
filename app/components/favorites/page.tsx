import { client } from "@/lib/microcms-client.server";
import Link from "next/link";
import { FavoriteSpot } from "@/lib/types";
import styles from '@/app/components/favorites/Favorites.module.css';

// microCMSから取得したデータ全体（リスト形式）の型
type FavoriteSpotsResponse = {
  contents: FavoriteSpot[];
  totalCount: number;
  offset: number;
  limit: number;
};

export default async function FavoritesPage() {
  // サーバーサイドでデータを取得
  const data = await client.getList<FavoriteSpot>({
    endpoint: "favorite_spots",
  });
  
  return (
    // 💡 CSS Modulesのクラスを適用
    <div className={styles.container}>
      <h1 className={styles.title}>
        ˚.🎀༘⋆ お気に入りスポット一覧 ˚.🎀༘⋆
      </h1>

      {data.contents.length === 0 && (
        <p className={styles.emptyMessage}>
          まだお気に入りスポットがありません。microCMSでスポットを追加してください。
        </p>
      )}

      <ul className="space-y-6">
        {data.contents.map((spot) => (
          // 💡 CSS Modulesのクラスを適用
          <li
            key={spot.id}
            className={styles.listItem}
          >
            <Link href={`/favorites/${spot.id}`}>
              <h2 className={styles.spotName}>
                {spot.spot_name}
              </h2>
            </Link>
            
            {/* 評価の表示 */}
            {spot.rating && (
              // 💡 CSS Modulesのクラスを適用
              <p className={`${styles.rating} mt-2 flex items-center`}>
                {spot.rating}/5
              </p>
            )}
            
            {/* タグの表示 */}
            {spot.tags && spot.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {spot.tags.map((tag) => (
                  <span 
                    key={tag}
                    // 💡 CSS Modulesのクラスを適用
                    className={styles.tag}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* 写真の表示 */}
            {spot.visit_photos?.length ? (
              // 💡 CSS Modulesのクラスを適用
              <div className={`${styles.photoContainer} mt-4 flex overflow-x-auto p-1`}>
                {spot.visit_photos.map((photo, idx) => (
                  <img
                    key={idx}
                    src={photo.url}
                    alt={`${spot.spot_name} 訪問写真 ${idx + 1}`}
                    // 💡 CSS Modulesのクラスを適用
                    className={styles.photo}
                  />
                ))}
              </div>
            ) : null}
          </li>
        ))}
      </ul>
      <Link href="/favorites" className={styles.backLink}>
        戻る
      </Link>
    </div>
    
  );
}