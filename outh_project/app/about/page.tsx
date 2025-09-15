export const revalidate = 10; // ISR (regenerates every 10s)

export default function AboutPage() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold">ℹ️ About Page (ISR)</h2>
      <p className="mt-4 text-gray-700">
        This page is regenerated every <b>10 seconds</b>.
      </p>
    </div>
  );
}
