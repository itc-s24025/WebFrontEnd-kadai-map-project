import { client } from "@/lib/microcms-client.server";
import type { FavoriteSpot } from "@/lib/types";
import FavoritesPageClient from "./FavoritesPageClient";

export default async function FavoritesPage() {
  const data = await client.getList<FavoriteSpot>({
    endpoint: "favorite_spots",
  });

  return <FavoritesPageClient data={data.contents} />;
}