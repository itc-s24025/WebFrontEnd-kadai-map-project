import { client } from "@/lib/microcms-client.server";
import styles from "@/app/favorites/Favorites.module.css";
import Link from "next/link";
import Carousel from "@/app/components/carousel/Carousel";
import StarRating from "@/app/components/starRating/StarRating";
import ImageModal from "@/app/components/fullImg/fullImg";

// このファイル: お気に入り詳細ページ。microCMS から指定IDのスポット情報を取得して表示します。
export default async function FavoriteDetailPage({
  params,
}: {
  params: { id: string };
}) {
  // microCMS に対して指定のエンドポイントからコンテンツを取得する非同期呼び出し。
  // この呼び出しは Promise を返すため await して結果オブジェクト（data）を受け取る。
  const data = await client.get({
    endpoint: "favorite_spots", // 取得したいコレクション
    contentId: params.id, // 取得したいアイテムの ID
  });

  // 画像配列をカルーセル用の形に変換
  const photos = Array.isArray(data.visit_photos)
    ? data.visit_photos.map((p: any) => ({
        url: p.url,
        alt: p.alt ?? p.name ?? "",
      }))
    : [];

  return (
    <div className={styles.container}>

      {/* ページタイトル（スポット名） */}
      <header>{data.spot_name}</header>

      <p><Link href="/">トップページ</Link> &gt; <Link href="/favorites">お気に入り一覧</Link> &gt; <Link href={`/favorites/${data.id}`}>{data.spot_name}</Link></p>

      {/* microCMS の画像を渡すカルーセル（クライアントコンポーネント） */}
      {photos.length > 0 && <Carousel photos={photos} />}

        {/* 追加: サムネイル／全画面表示ボタン */}
  {photos.length > 0 && <ImageModal photos={photos} />}


      {/* 星評価: data は単一オブジェクトなので map は不要。StarRating を使って表示 */}
        <div className={styles.memoMeta}>
      {data.rating != null && (
        <div style={{ marginTop: 8 }}>
          <StarRating rating={data.rating} />
        </div>
      )}

      {/* タグ表示 */}
      {data.tags && data.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {data.tags.map((tag: string) => (
            <span key={tag} className={styles.tag}>
              #{tag}
            </span>
          ))}
        </div>
      )}
      </div>

      {/* メモ・感想 */}
      {data.memo && (
        <div className={styles.memoSection}>
          {data.memo && <h2 className={styles.sectionTitle}>メモ・感想</h2>}
          <div
            className={styles.memoContent}
            dangerouslySetInnerHTML={{ __html: data.memo }}
          />                  
        </div>
      )}
      {/* 一覧へ戻るリンク */}
      <Link href="/favorites" className={styles.backLink}>
        戻る
      </Link>
    </div>
  );
}
