// lib/microcms-client.server.ts
import { createClient } from "microcms-js-sdk";
import type {FavoriteSpot, MicroCMSResponse } from "@/lib/types";

console.log("✅ MICROCMS_SERVICE_DOMAIN:", process.env.MICROCMS_SERVICE_DOMAIN);
console.log("✅ MICROCMS_API_KEY:", process.env.MICROCMS_API_KEY ? "設定済み" : "未設定");

/* ------------------------------------------------------
  microCMS クライアント設定
------------------------------------------------------ */
const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
const apiKey = process.env.MICROCMS_API_KEY;

if (!serviceDomain || !apiKey) {
  throw new Error("microCMSの環境変数 (MICROCMS_SERVICE_DOMAIN / MICROCMS_API_KEY) が設定されていません。");
}

export const client = createClient({
  serviceDomain,
  apiKey,
});

export const ENDPOINTS = {
  APP_SETTINGS: "app_settings",
  FAVORITE_SPOTS: "favorite_spots",
  LANDMARK_CATEGORIES: "landmark_categories",
};
