"use client";

import React, { useEffect, useRef, useState } from 'react';
import styles from '@/app/components/Map.module.css'; 

// MapコンポーネントのProps型定義
interface MapProps {
  initialLat: number;
  initialLng: number;
  initialZoom: number;
}

/**APIをロードし、地図を表示する
 * Mapコンポーネント: Google Maps 
 * @param {MapProps} props - microCMSから取得した初期設定
 */

export default function Map({ initialLat, initialLng, initialZoom }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<'LOADING' | 'READY' | 'ERROR'>('LOADING');

  useEffect(() => {
    // 実際にはここでGoogle Maps APIをロードするロジックが入ります。
    // 今回はモックとして、数秒後にREADYにする
    const timer = setTimeout(() => {
      setStatus('READY');
      console.log(`Map initialized at: ${initialLat}, ${initialLng} with zoom ${initialZoom}`);
    }, 2000); 

    // クリーンアップ
    return () => clearTimeout(timer);
  }, [initialLat, initialLng, initialZoom]);

  const mapCenter = `初期位置: ${initialLat}, ${initialLng} / ズーム: ${initialZoom}`;

  return (
    // 【重要】CSS Modulesのクラスを適用 (styles.mapContainer)
    <div ref={mapRef} className={styles.mapContainer}>
      
      {status === 'LOADING' && (
        // TailwindとCSS Modulesのクラスを併用
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50/70 backdrop-blur-sm z-30">
          <div className={`${styles.statusBox} text-center`}>
            <p className={`${styles.authWaiting} text-2xl font-semibold mb-2`}>
              🚧 Google Maps APIキー認証待機中
            </p>
            <p className="text-sm text-gray-600">{mapCenter}</p>
          </div>
        </div>
      )}

      {status === 'READY' && (
        // マップがロードされた後のメッセージ（デバッグ用）
        <div className="absolute top-2 left-2 p-2 bg-white/80 rounded-lg text-xs font-mono shadow-md z-40">
            Map Loaded: ({initialLat}, {initialLng})
        </div>
      )}

      {/* 実際にはこの中にGoogle Mapsの描画要素（Canvasなど）が入ります */}
      {/* statusBoxの裏側にあり、READY時に表示される */}
      <div className="w-full h-full bg-blue-100 flex items-center justify-center text-gray-400">
        {status === 'READY' ? 'Google Map がここに表示されます' : '地図領域'}
      </div>

    </div>
  );
}