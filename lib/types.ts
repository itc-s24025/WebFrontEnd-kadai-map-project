export interface FavoriteSpot {
  id: string;
  place_id: string;
  spot_name: string;
  memo: string;
  rating: number;
  tags: string[];
  visit_photos?: {
    url: string;
    height: number;
    width: number;
  }[];
  lat: number;
  lng: number;
  createdAt: string;
  updatedAt: string;
}

export interface LandmarkCategory {
  category_name: string;
  search_keyword: string;
  pin_color?: string;
}

export interface MicroCMSResponse<T> {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
}

export interface SlideContent {
  image: {
    url: string;
    width: number;
    height: number;
  };
}
