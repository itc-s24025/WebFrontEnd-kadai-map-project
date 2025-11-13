"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./Map.module.css";
import type { FavoriteSpot } from "@/lib/types";


interface MapProps {
  initialLat: number;
  initialLng: number;
  initialZoom: number;
  spots: FavoriteSpot[];

}

export default function Map({
  initialLat, 
  initialLng, 
  initialZoom,
  spots
}: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const [status, setStatus] = useState<"LOADING" | "READY" | "ERROR">("LOADING");
  const markersRef = useRef<google.maps.Marker[]>([]);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  /** Google Maps API スクリプトを1回だけ読み込む */
  const loadGoogleMapsScript = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (window.google?.maps) {
        resolve();
        return;
      }

      const existingScript = document.querySelector<HTMLScriptElement>(
        'script[data-googlemaps="true"]'
      );
      if (existingScript) {
        existingScript.addEventListener("load", () => resolve());
        existingScript.addEventListener("error", () => reject());
        return;
      }

      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
      script.async = true;
      script.defer = true;
      script.dataset.googlemaps = "true";
      script.onload = () => resolve();
      script.onerror = () => reject();
      document.head.appendChild(script);
    });
  };

  // Google Map 初期化
    const initializeMap = () => {
    if (!mapRef.current || !window.google?.maps) return;
    mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
      center: { lat: initialLat, lng: initialLng },
      zoom: initialZoom,
    });
    setStatus("READY");
  };


  useEffect(() => {
    let active = true;
    if (!apiKey) {
      console.error("NEXT_PUBLIC_GOOGLE_MAPS_API_KEY が設定されていません。");
      setStatus("ERROR");
      return;
    }

    loadGoogleMapsScript()
      .then(() => {
        if (active) initializeMap();
      })
      .catch(() => {
        if (active) setStatus("ERROR");
      });

    return () => {
      // アンマウント時に Map の DOM 操作はしない（エラー防止）
      active = false;
    };
  }, [apiKey, initialLat, initialLng, initialZoom]);

  // スポット表示
  useEffect(() => {
    if (!mapInstanceRef.current || !window.google?.maps) return;

    // 既存マーカーを削除
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];

    // 新しいマーカー追加
    spots.forEach((spot) => {
      const marker = new google.maps.Marker({
        position: { lat: spot.lat, lng: spot.lng },
        map: mapInstanceRef.current!,
        title: spot.spot_name,
      });

      const info = new google.maps.InfoWindow({
        content: `<div><strong>${spot.spot_name}</strong><br>${spot.memo || ""}</div>`,
      });

      marker.addListener("click", () => info.open(mapInstanceRef.current, marker));

      markersRef.current.push(marker);
    });
  }, [spots]);

// 修正後の return の部分

return (
    <div style={{ width: "100%", height: "500px", position: "relative" }}>
      <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
      {/* 修正：statusが "ERROR" の時だけ、オーバーレイを表示する */}
      {status === "ERROR" && (
        <div className={styles.absoluteOverlay}>
          <div className={styles.statusBox}>
            <p style={{ color: '#dc143c' }}>
              Google Maps 読み込み失敗
            </p>
            <p>APIキーの確認、またはネットワーク状況を確認してください</p>
          </div>
        </div>
      )}
      {/* LOADINGの時は、オーバーレイも statusBox も表示されない（マップが表示されるのを待つ状態になる） */}
    </div>
  );
}