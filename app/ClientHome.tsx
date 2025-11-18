"use client";

import { useState } from "react";
import Link from "next/link";
import type { FavoriteSpot } from "@/lib/types";
import Carousel from "@/app/components/carousel/Carousel";
import styles from "@/app/page.module.css";

export default function ClientHome({
  spots,
  topCarouselPhotos
}: {
  spots: FavoriteSpot[];
  topCarouselPhotos: { url: string; alt: string; }[];
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
            <div className={styles.container}>
      <h1 className={styles.title}>˚.🎀༘⋆ お気に入りスポット紹介 ˚.🎀༘⋆</h1>
      </div>

        <nav className="flex items-center space-x-4">
          <Link
            href="/favorites"
            className="px-3 py-1 bg-indigo-500 rounded-lg text-sm font-semibold hover:bg-indigo-400 transition duration-150 ease-in-out"
          >
            お気に入り一覧
          </Link>
        </nav>
      </header>
              {topCarouselPhotos.length > 0 && <Carousel photos={topCarouselPhotos} />}    
    </main>
  );
}
