# WebFrontEnd-kadai-map-project

Next.js (App Router) + TypeScript で作った「お気に入りスポット」アプリケーション。
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

## フォルダ構成（要点）

app/
  favorites/                 # お気に入りページ群
    components/              # favorites 固有コンポーネント
    page.tsx                 # サーバー側一覧ページ（データ取得）
    [id]/page.tsx            # 詳細ページ（サーバー）
  components/                # 共通コンポーネント（StarRating など）
  globals.css                # グローバルスタイル
lib/
  microcms-client.server.ts  # microCMS クライアント
  types.ts                   # 型定義


## デプロイ

Vercel を推奨。環境変数はデプロイ先に設定してください。
