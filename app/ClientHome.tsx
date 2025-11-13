"use client";

import { useState } from "react";
import Map from "@/app/components/Map";
import Link from "next/link";
import type { AppSettings, FavoriteSpot } from "@/lib/types";

export default function ClientHome({
  settings,
  spots,
}: {
  settings: AppSettings;
  spots: FavoriteSpot[];
}) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = Array.from(new Set(spots.flatMap((s) => s.tags)));
  const filteredSpots = selectedTag
    ? spots.filter((s) => s.tags.includes(selectedTag))
    : spots;

  return (
    <main className="min-h-screen bg-white flex flex-col">
      {/* ヘッダー */}
      <header className="bg-indigo-600 shadow-xl p-4 sticky top-0 z-20 flex justify-between items-center text-white">
        <h1 className="text-3xl font-black tracking-wider">Map Project</h1>

        <nav className="flex items-center space-x-4">
          <p className="text-xs text-indigo-200">
            初期緯度: {settings.initial_lat.toFixed(4)}
          </p>
          <Link
            href="/favorites"
            className="px-3 py-1 bg-indigo-500 rounded-lg text-sm font-semibold hover:bg-indigo-400 transition duration-150 ease-in-out"
          >
            お気に入り一覧
          </Link>
        </nav>
      </header>

    
      {/* マップ */}
      <div className="flex-grow w-full relative z-10">
        <Map
          initialLat={settings.initial_lat}
          initialLng={settings.initial_lng}
          initialZoom={settings.default_zoom}
          spots={filteredSpots}
        />
      </div>
    </main>
  );
}
