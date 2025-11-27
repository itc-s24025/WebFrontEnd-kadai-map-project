import { client } from "@/lib/microcms-client.server";
import styles from "@/app/favorites/components/Favorites.module.css";
import Link from "next/link";
import Carousel from "@/app/components/carousel";
import style from "./Detail.module.css"
import MemoView from "@/app/favorites/components/memo/MemoView";

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

      <p>
        <Link href="/">トップページ</Link> &gt;{" "}
        <Link href="/favorites">お気に入り一覧</Link> &gt;{" "}
        <Link href={`/favorites/${data.id}`}>{data.spot_name}</Link>
      </p>

      {/* microCMS の画像を渡すカルーセル（クライアントコンポーネント） */}
      {photos.length > 0 && <Carousel photos={photos} />}

      {/* ここで既存の memoMeta と memoSection を削除して MemoView に置き換え */}
      <MemoView
        memoHtml={data.memo}
        rating={data.rating}
        tags={data.tags}
        photos={photos}
      />

      {/* 一覧へ戻るリンク */}
      <Link href="/favorites" className={styles.backLink}>
        戻る
      </Link>
    </div>
  );
}
