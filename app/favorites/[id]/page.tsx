import { client } from "@/lib/microcms-client.server";
import styles from "@/app/favorites/Favorites.module.css";
import Link from "next/link";
import Carousel from "@/app/components/carousel/Carousel";

export default async function FavoriteDetailPage({
  params,
}: {
  params: { id: string };
}) {
  // microCMSからID指定でデータを取得
  const data = await client.get({
    endpoint: "favorite_spots",
    contentId: params.id,
  });

  const photos = Array.isArray(data.visit_photos)
    ? data.visit_photos.map((p: any) => ({
        url: p.url,
        alt: p.alt ?? p.name ?? "",
      }))
    : [];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{data.spot_name}</h1>
      {/* microCMS の画像を渡すカルーセル（クライアントコンポーネント） */}
      {photos.length > 0 && <Carousel photos={photos} />}

      {data.rating && (
        <p className={`${styles.rating} mt-2`}>評価: {data.rating}/5</p>
      )}

      {data.tags && data.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {data.tags.map((tag: string) => (
            <span key={tag} className={styles.tag}>
              #{tag}
            </span>
          ))}
        </div>
      )}

      {data.memo && (
        <div className={styles.memoSection}>
          {data.memo && (<h2 className={styles.sectionTitle}>メモ・感想</h2>)}
          <div
            className={styles.memoContent}
            dangerouslySetInnerHTML={{ __html: data.memo }}
          />
        </div>
      )}
      <Link href="/favorites" className={styles.backLink}>
        戻る
      </Link>
    </div>
  );
}
