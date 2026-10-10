import type { Metadata } from "next";
import "@/styles/globals.css";
import Link from "next/link";
import FolkArtBorder from "@/components/shared/FolkArtBorder";
import LogoLoader from "@/components/shared/LogoLoader";
import Navbar from "@/components/layout/Navbar";
import CraftChatBot from "@/components/shared/CraftChatBot";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "KalaSamanvaya (ಕಲಾ ಸಮನ್ವಯ) | Digital Market Access for Karnataka Artisans",
  description: "Authentic Karnataka handicrafts platform featuring Kasuti embroidery, Beedu basketry, and coastal pottery with Kannada voice listing and coordinated multi-artisan bulk fulfilment.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[#FAF6F0] text-[#2A1810] font-sans antialiased selection:bg-[#D9822B] selection:text-white">
        {/* Animated Brand Preloader on First Visit */}
        <LogoLoader />

        {/* Top Announcement Bar (Truly Tribal e-commerce style) */}
        <div className="bg-[#23170F] text-[#FAF6F0] text-[11px] py-1.5 px-4 text-center border-b border-amber-900/40">
          <span className="font-semibold text-amber-300">Free Pan-India Delivery on Orders Above ₹999</span> • 100% Authentic GI-Tagged Crafts Direct from Karnataka Artisans
        </div>

        {/* Main Sticky Navbar (Dynamic Route-Aware) */}
        <Navbar />

        {/* Main Content Area */}
        <main className="flex-1">{children}</main>

        {/* Interactive Craft Concierge & Voice Chat Bot */}
        <CraftChatBot />

        {/* Footer (Matching Reference Design) */}
        <Footer />
      </body>
    </html>
  );
}
