import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "NextAuth App",
  description: "Google Auth with Next.js + Tailwind",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900 min-h-screen">
        <Navbar />
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
