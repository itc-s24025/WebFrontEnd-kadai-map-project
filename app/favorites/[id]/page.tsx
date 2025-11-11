"use client"; // 💡 クライアントコンポーネントに変更

import { client } from "@/lib/microcms-client";
import Link from "next/link";
import { FavoriteSpot } from "@/lib/microcms-client";
import styles from '@/app/favorites/Detail.module.css'; // 💡 CSS Modulesをインポート
import { useState, useEffect } from 'react'; // 💡 useStateとuseEffectをインポート

// 💡 サーバーコンポーネントのasync関数をクライアントコンポーネント内のデータ取得用関数に変更
async function getSpotDetail(id: string): Promise<FavoriteSpot> {
  const spot = await client.get<FavoriteSpot>({
    endpoint: "favorite_spots",
    contentId: id,
  });
  return spot;
}

export default function FavoriteDetail({
  params,
}: {
  params: { id: string };
}) {
  const [activeTab, setActiveTab] = useState<'memo' | 'photos'>('memo'); // 💡 タブの状態管理
  const [spot, setSpot] = useState<FavoriteSpot | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 💡 クライアントサイドでデータを取得する
  useEffect(() => {
    getSpotDetail(params.id)
      .then(data => {
        setSpot(data);
        setIsLoading(false);
        // 写真がない場合はメモタブをデフォルトにする
        if (!data.visit_photos?.length) {
            setActiveTab('memo');
        }
      })
      .catch(error => {
        console.error("Failed to fetch spot detail:", error);
        setIsLoading(false);
      });
  }, [params.id]);

  if (isLoading || !spot) {
    return (
        <div className={styles.detailContainer}>
            <p className={styles.noPhotoMessage}>読み込み中...</p>
        </div>
    );
  }

  // タブボタンの共通スタイル（TailwindとCSS Modulesを併用）
  const tabClass = "py-3 px-6 text-lg font-bold rounded-t-xl cursor-pointer transition duration-200 shadow-md";

  return (
    <div className={styles.detailContainer}>
      {/* 戻るリンク */}
      <Link href="/favorites" className={styles.backLink}>
        戻る
      </Link>

      <h1 className={styles.spotName}>{spot.spot_name}</h1>
      {spot.rating && <p className={styles.rating}>{spot.rating}/5</p>}
      
      {/* ----------------- 💡 タブナビゲーション部分 ----------------- */}
      <div className="mt-8 flex border-b-4 border-pink-100">
        {/* メモ・感想タブ */}
        <button
          onClick={() => setActiveTab('memo')}
          className={`${tabClass} ${activeTab === 'memo' ? styles.activeTab : styles.inactiveTab}`}
        >
          📝 メモ・感想
        </button>

        {/* 訪問写真タブ */}
        <button
          onClick={() => setActiveTab('photos')}
          className={`${tabClass} ${activeTab === 'photos' ? styles.activeTab : styles.inactiveTab}`}
          disabled={!spot.visit_photos?.length}
        >
          📸 訪問写真 ({spot.visit_photos?.length || 0})
        </button>
      </div>
      {/* ----------------------------------------------------------- */}

      {/* ----------------- 💡 タブコンテンツ部分 ----------------- */}
      <div className="pt-6">
        {activeTab === 'memo' && (
          // メモ・感想コンテンツ
          spot.memo ? (
            <div
              className={`${styles.memoContent} prose max-w-none`}
              dangerouslySetInnerHTML={{ __html: spot.memo }}
            />
          ) : (
            <p className={styles.noPhotoMessage}>📝 メモはありません</p>
          )
        )}

        {activeTab === 'photos' && (
          // 訪問写真コンテンツ
          spot.visit_photos?.length ? (
            <div className={`${styles.photoGrid} grid grid-cols-2 md:grid-cols-3 gap-4`}>
              {spot.visit_photos.map((photo: any, idx: number) => (
                <img
                  key={idx}
                  src={photo.url}
                  alt={`${spot.spot_name} 訪問写真 ${idx + 1}`}
                  className={styles.photo}
                />
              ))}
            </div>
          ) : (
            <p className={styles.noPhotoMessage}>📸 写真はまだありません</p>
          )
        )}
      </div>
      {/* ----------------------------------------------------------- */}
    </div>
  );
}