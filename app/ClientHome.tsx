// クライアントサイド表示用のホームコンポーネント（トップのカルーセル等を表示）
"use client";

import Link from "next/link";
import Carousel from "@/app/components/carousel/Carousel";
import styles from "@/app/page.module.css";
export default function ClientHome({
  topCarouselPhotos, // トップカルーセル用の写真配列（配列が空の場合は非表示）
}: {
  topCarouselPhotos: { url: string }[];
}) {
  // トップページ（クライアント側） — 受け取った写真をカルーセルで表示
  return (
    <main className="min-h-screen bg-white flex flex-col">

      {/* ヘッダー（簡易） */}
      <header>お気に入りスポット紹介</header>

      {/* 写真がある場合、右側にカルーセルを表示 */}
      {topCarouselPhotos.length > 0 && (
        <div className={styles.heroSection}>
          {/* 左側のテキストエリア（サービス説明とリンク） */}
          <div className={styles.heroText}>
            <h2 className={styles.titleLeft}>記録が体験を変える</h2>
            <h2 className={styles.titleLeft}>お気に入りスポットの訪問記録</h2>

            <p className={styles.textLeft}>
              あなたの「好き」を育てる成長ログ
            </p>
            <p className={styles.textLeft}>
              お気に入りの場所の記録と評価で、次の訪問を120%楽しむために
            </p>
            <br />
            <Link href="/favorites" className={styles.button09}>
              お気に入り一覧
            </Link>
          </div>

          {/* 右側のカルーセル（写真表示） */}
          <div className={styles.heroCarousel}>
            <Carousel
              photos={topCarouselPhotos}
              autoPlay={true}
              interval={4000}
            />
          </div>
        </div>
      )}
    </main>
  );
}
