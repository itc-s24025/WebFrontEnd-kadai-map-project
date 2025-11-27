# WebFrontEnd-kadai-map-project

Next.js (App Router) + TypeScript で作った「お気に入りスポット」アプリ。
microCMS でスポットを管理し、カルーセル・星評価・メモ感想などの UI を提供します。

## 主な機能

- お気に入りスポットの一覧表示 / 詳細表示
- 画像カルーセル表示
- メモ感想表示
- 評価(☆)表示
- microCMS 連携によるデータ取得

## 技術スタック

- Next.js (App Router)
- TypeScript
- CSS Modules（コンポーネント単位のスタイル）
- microCMS（ヘッドレス CMS）

## ページ構成

- / (ホーム)
  - ファイル: `app/page.tsx`
  - 概要: トップページ。サーバー側でデータ取得し、クライアント用コンポーネント（例: `ClientHome`）をレンダリングしてトップカルーセル等を表示。

- /favorites (お気に入り一覧)
  - ファイル（サーバー）: `app/favorites/page.tsx`  
    - microCMS から一覧を取得して、クライアントコンポーネントに渡す責務を持つ。
  - ファイル（クライアント表示）: `app/favorites/FavoritesListClient.tsx`
    - 実際の一覧レンダリング（カード、サムネイル、タグ、星評価、リンクなど）。
    - スタイル: `app/favorites/components/Favorites.module.css`
    - 利用コンポーネント例: `StarRating`（現状 `app/favorites/components/starRating` から import）  

- /favorites/[id] (お気に入り詳細)
  - ファイル: `app/favorites/[id]/page.tsx`
  - 概要: 指定IDのスポット詳細を表示。主に以下のコンポーネントを組み合わせている
    - カルーセル: `app/components/carousel`
    - サムネイル／モーダル: `app/components/fullImg`（ImageModal）
    - 星評価: `app/components/starRating`（プロジェクト内の配置に差分があるため要確認）
    - メモ表示: `.memoSection` / `MemoView` 相当のコンポーネント（場所に依存）

