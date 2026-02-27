# お気に入りスポット紹介

### 作品概要

過去に行った場所の管理をmicroCMSを使用して管理できます！
画像・5段階評価・メモ感想などの機能が使えます！

### 主な機能

- お気に入りスポットの一覧表示 / 詳細表示
- 画像カルーセル表示
- メモ感想表示
- 5段階評価
- microCMS 連携によるデータ取得

--- 

### 使用技術

- Next.js (App Router)
- TypeScript
- CSS Modules
- microCMS

--- 

### ディレクトリ構成

- / (ホーム)
  - ファイル: `app/page.tsx` - トップページ

- /favorites (お気に入り一覧)
  - `app/favorites/page.tsx` - microCMS から一覧を取得
  - `app/favorites/FavoritesListClient.tsx` - カード、サムネイル、タグ、星評価、リンクなど
    - `app/favorites/components/Favorites.module.css` - スタイル

- /favorites/[id] (お気に入り詳細)
  - `app/favorites/[id]/page.tsx` - 指定IDのお気に入りスポット詳細を表示
    - `app/components/carousel` - カルーセル
    - `app/components/fullImg` - サムネイル モーダル
    - `app/components/starRating` - 星評価
    - `.memoSection` / `MemoView` - メモ表示

---

### 環境設定

- **Node.js**: 18+（推奨）
- **TypeScript**: 5.x
- **Next.js**: 14.1.4（App Router）
- **React**: 18.x

<br>

**外部ライブラリ**
  - microcms-js-sdk（v3.2.0）: microCMS API クライアント

### 環境変数

ルートに `.env.local` を作成し、microCMS の情報を設定してください

```
MICROCMS_SERVICE_DOMAIN=your-service-domain
MICROCMS_API_KEY=your-api-key
```

---

### 仕様の説明

**FavoriteSpot**
- `id`: スポットの一意識別子
- `spot_name`: スポット名（表示用）
- `memo`: メモ・感想（HTML形式）
- `rating`: 5段階評価（1～5）
- `tags`: タグ配列（例: ["カフェ", "景観"]）
- `visit_photos`: 訪問写真配列（URL, width, height）
- `createdAt`, `updatedAt`: タイムスタンプ


### 主な UI 機能

**ホーム（/）**
- トップカルーセル表示、ランディング

<br>

**お気に入り一覧（/favorites）**
- スポットカード一覧、サムネイル・タグ・星評価・リンク表示

<br>

**詳細ページ（/favorites/[id]）**
- カルーセル
- サムネイル、モーダル
- 星評価、タグ表示
- メモ・感想

### その他
- レスポンシブ対応


