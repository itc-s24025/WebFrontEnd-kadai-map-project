// app/page.tsx
import { client, AppSettings } from '@/lib/microcms-client'; 
import Map from '@/app/components/Map';
import Link from 'next/link';

// Tailwind CSSのレイアウトクラス（デフォルトスタイルを置き換える）
// ※この定数は削除しても構いませんが、今回はデザイン調整に注力します。
// const DEFAULT_LAYOUT_CLASS = "min-h-screen bg-gray-50 flex flex-col"; 

/**
 * microCMSからアプリ設定値 (app_settings) を取得するサーバーロジック
 */
async function getAppSettings(): Promise<AppSettings> {
  try {
    const data = await client.get<AppSettings>({
      endpoint: 'app_settings', // ★ このAPIにコンテンツが存在し、公開されているか再確認
    });
    return data;
  } catch (error) {
    console.error('Error fetching app settings from microCMS:', error);
    // データ取得に失敗した場合、安全なデフォルト値を返します (例: 東京中心部)
    return {
      initial_lat: 35.6895, // 東京の緯度
      initial_lng: 139.6917, // 東京の経度
      default_zoom: 12,
    };
  }
}

/**
 * Home Page (サーバーコンポーネント)
 * microCMSから初期設定データを取得し、Mapコンポーネントに渡します。
 */
export default async function Home() {
  const settings = await getAppSettings(); 
  
  return (
    // 【改善点１】メイン背景を白またはライトグレーに戻し、清潔感を出す
    <main className="min-h-screen bg-white flex flex-col">
      {/* 【改善点２】ヘッダーのデザインを強調
        - 背景色をインディゴ系に変更し、プロジェクトカラーを表現
        - 強めのシャドウ (shadow-xl) で立体感を出す
      */}
      <header className="bg-indigo-600 shadow-xl p-4 sticky top-0 z-20 flex justify-between items-center text-white">
        <h1 className="text-3xl font-black tracking-wider">
          Map Project
        </h1>
        <nav className="flex items-center space-x-4">
          {/* 【改善点３】CMSデータ確認用の表示は目立たないように
            - デバッグ情報なので、小さく薄い文字色に
          */}
          <p className="text-xs text-indigo-200">
            初期緯度: {settings.initial_lat}
          </p>
          
          {/* 【改善点４】ナビゲーションリンクのスタイルをボタン風に調整
            - 背景色をhoverで変更し、クリック可能な要素であることを強調
          */}
          <Link 
            href="/favorites" 
            className="px-3 py-1 bg-indigo-500 rounded-lg text-sm font-semibold hover:bg-indigo-400 transition duration-150 ease-in-out"
          >
            お気に入り一覧へ →
          </Link>
        </nav>
      </header>

      {/* マップコンテナ */}
      <div className="flex-grow w-full relative z-10">
        <Map
          initialLat={settings.initial_lat}
          initialLng={settings.initial_lng}
          initialZoom={settings.default_zoom}
        />
      </div>

      {/* 【改善点５】フッターの調整
        - シンプルで落ち着いた色合いに
      */}
      <footer className="p-3 text-center text-sm text-gray-600 bg-gray-100 border-t border-gray-200">
        © 2023 WebFrontEnd MapProject | Powered by microCMS
      </footer>
    </main>
  );
}