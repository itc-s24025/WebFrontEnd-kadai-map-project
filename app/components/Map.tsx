"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./Map.module.css";

interface MapProps {
  initialLat: number;
  initialLng: number;
  initialZoom: number;
}

export default function Map({ initialLat, initialLng, initialZoom }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const [status, setStatus] = useState<"LOADING" | "READY" | "ERROR">("LOADING");

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

  /** マップを初期化 */
  const initializeMap = () => {
    if (!mapRef.current || !window.google?.maps) return;

    if (mapInstanceRef.current) {
      // 既にマップが存在する場合は再利用（再生成しない）
      console.debug("Googleマップは既に初期化されているため、再初期化をスキップします。");
      return;
    }

    mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
      center: { lat: initialLat, lng: initialLng },
      zoom: initialZoom,
      disableDefaultUI: false,
    });

    setStatus("READY");
    console.log("Googleマップが初期化されました。");
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

  return (
    <div className={styles.mapContainer}>
      <div ref={mapRef} style={{ width: "100%", height: "100%" }} />

      {status === "ERROR" && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm z-20">
          <div className={styles.statusBox}>
            <p className="text-2xl font-semibold text-red-500 mb-2">
              Google Maps の読み込みに失敗しました
            </p>
            <p>APIキーを確認してください。</p>
          </div>
        </div>
      )}
    </div>
  );
}
