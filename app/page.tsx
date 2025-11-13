// app/page.tsx
import {AppSettings, FavoriteSpot } from '@/lib/types';
import {client} from '@/lib/microcms-client.server';
import ClientHome from '@/app/ClientHome'; // クライアント側に分ける

async function getAppSettings(): Promise<AppSettings> {
  try {
    return await client.getObject<AppSettings>({ endpoint: 'app_settings' });
  } catch {
    return { initial_lat: 35.6895, initial_lng: 139.6917, default_zoom: 12 };
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
  const [settings, spots] = await Promise.all([
    getAppSettings(),
    getFavoriteSpots(),
  ]);

  return (
    <ClientHome settings={settings} spots={spots} /> // クライアント側で状態管理
  );
}
