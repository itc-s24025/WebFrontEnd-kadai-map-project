// lib/microcms-client.ts
import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN || "",
  apiKey: process.env.MICROCMS_API_KEY || "",
});

// アプリケーション設定 (app_settings) の型定義
// microCMSの型生成ツールを使えばより正確な型が作れますが、ここでは手動で定義します。
export type AppSettings = {
  initial_lat: number;
  initial_lng: number;
  default_zoom: number;
};

// ランドマークカテゴリ (landmark_categories) の型定義
export type LandmarkCategory = {
  category_name: string;
  search_keyword: string;
  pin_color?: string; // pin_colorはオプションなので '?' をつける
};

// お気に入りスポット (favorite_spots) の型定義（簡略版）
export type FavoriteSpot = {
  place_id: string;
  spot_name: string;
  memo: string; // リッチエディタの内容は文字列として取得
  rating: number;
  tags: string[]; // セレクト（複数選択）は文字列の配列
  visit_photos?: any[]; // 複数画像（メディア）はオブジェクトの配列
};