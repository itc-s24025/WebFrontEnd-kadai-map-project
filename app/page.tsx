// app/page.tsx
import {FavoriteSpot, SlideContent } from '@/lib/types';
import {client} from '@/lib/microcms-client.server';
import ClientHome from '@/app/components/HomeClient'; 

async function getSlideImages(): Promise<SlideContent[]> {
  try {
    const data = await client.getList<SlideContent>({ endpoint: 'slides' });
    return data.contents;
  } catch (error) {
    console.error("Failed to fetch slide images:", error);
    return [];
  }
}

async function getFavoriteSpots(): Promise<FavoriteSpot[]> {
  try {
    const data = await client.getList<FavoriteSpot>({ endpoint: 'favorite_spots' });
    return data.contents;
  } catch {
    return [];
  }
}

export default async function Home() {
  const [slides] = await Promise.all([
    getSlideImages(),
  ]);

  const topCarouselPhotos = slides.map(slide => ({
    url: slide.image.url,
    alt: slide.image.url,
  }));

  return (
    <ClientHome topCarouselPhotos={topCarouselPhotos} />
  );
}

