import Map from '@/app/components/Map';

export default function ContactPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">アクセス</h1>
      <Map initialLat={35.6809591} initialLng={139.7673068} initialZoom={15} />
    </div>
  );
}
