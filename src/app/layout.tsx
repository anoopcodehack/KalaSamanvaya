import type { Metadata } from "next";
import "@/styles/globals.css";
import Link from "next/link";
import FolkArtBorder from "@/components/shared/FolkArtBorder";
import LogoLoader from "@/components/shared/LogoLoader";
import Navbar from "@/components/layout/Navbar";
import CraftChatBot from "@/components/shared/CraftChatBot";

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

        {/* Folk Art Decorative Border above footer */}
        <FolkArtBorder variant="gold" />

        {/* Rich Ethnic Footer (Matching Screenshot 5 / Truly Tribal) */}
        <footer className="bg-[#20120A] text-[#FAF6F0] pt-14 pb-8 border-t border-amber-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 pb-10 border-b border-amber-900/30 text-xs">
              
              {/* Col 1: Contact */}
              <div className="space-y-3">
                <h4 className="font-bold text-white uppercase tracking-wider text-xs">
                  Contact
                </h4>
                <div className="space-y-1.5 text-stone-300 text-[11px] leading-relaxed">
                  <p>KalaSamanvaya 101, Heritage Crafts Center,</p>
                  <p>Dharwad & Udupi Clusters,</p>
                  <p>Karnataka, India - 580001</p>
                  <p className="pt-2 text-stone-200">Phone: +91 91138 09951</p>
                  <p className="text-stone-200">Email: info@kalasamanvaya.in</p>
                </div>

                <div className="pt-2">
                  <h5 className="font-bold text-white uppercase tracking-wider text-[11px] mb-1">
                    Opening Hours
                  </h5>
                  <p className="text-stone-300 text-[11px]">Mon - Sat: 10am - 07:30pm</p>
                  <p className="text-stone-400 text-[11px]">Sunday: Closed</p>
                </div>
              </div>

              {/* Col 2: Helpful Links */}
              <div className="space-y-3">
                <h4 className="font-bold text-white uppercase tracking-wider text-xs">
                  Helpful Links
                </h4>
                <ul className="space-y-2 text-stone-300 text-[11px]">
                  <li>
                    <Link href="/marketplace" className="hover:text-amber-300 transition-colors">
                      Shipping & Returns
                    </Link>
                  </li>
                  <li>
                    <Link href="/marketplace" className="hover:text-amber-300 transition-colors">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/marketplace" className="hover:text-amber-300 transition-colors">
                      Terms & Conditions
                    </Link>
                  </li>
                  <li>
                    <Link href="/b2b" className="hover:text-amber-300 transition-colors">
                      Bulk Enquiry
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Col 3: Company */}
              <div className="space-y-3">
                <h4 className="font-bold text-white uppercase tracking-wider text-xs">
                  Company
                </h4>
                <ul className="space-y-2 text-stone-300 text-[11px]">
                  <li>
                    <Link href="/marketplace#about" className="hover:text-amber-300 transition-colors">
                      Our Story
                    </Link>
                  </li>
                  <li>
                    <Link href="/b2b" className="hover:text-amber-300 transition-colors">
                      Business Solutions
                    </Link>
                  </li>
                  <li>
                    <Link href="/artisan/onboard" className="hover:text-amber-300 transition-colors">
                      Artisan Voice Portal
                    </Link>
                  </li>
                  <li>
                    <Link href="/marketplace" className="hover:text-amber-300 transition-colors">
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Col 4: Follow Us */}
              <div className="space-y-3">
                <h4 className="font-bold text-white uppercase tracking-wider text-xs">
                  Follow Us
                </h4>
                <div className="flex items-center gap-2.5 text-stone-300">
                  <div className="w-8 h-8 rounded-lg bg-pink-700/80 flex items-center justify-center text-white text-xs font-bold hover:scale-105 transition-transform cursor-pointer">
                    IG
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-blue-600/80 flex items-center justify-center text-white text-xs font-bold hover:scale-105 transition-transform cursor-pointer">
                    FB
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-red-600/80 flex items-center justify-center text-white text-xs font-bold hover:scale-105 transition-transform cursor-pointer">
                    YT
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-stone-700 flex items-center justify-center text-white text-xs font-bold hover:scale-105 transition-transform cursor-pointer">
                    X
                  </div>
                </div>

                <p className="text-[11px] text-stone-400 pt-2 leading-relaxed">
                  Join our movement celebrating Karnataka&apos;s living handicraft traditions.
                </p>
              </div>

              {/* Col 5: Brand Logo (Matching Screenshot 5 Right) */}
              <div className="space-y-3 flex flex-col items-start md:items-end justify-center">
                <div className="p-3 bg-white rounded-2xl shadow-xl border border-amber-900/30">
                  <img
                    src="/logo.png"
                    alt="KalaSamanvaya - Local Crafts • Global Hands"
                    className="h-24 w-auto object-contain"
                  />
                </div>
                <div className="text-[11px] text-stone-400 text-left md:text-right">
                  Local Crafts • Global Hands
                </div>
              </div>

            </div>

            {/* Copyright Bar (Matching Truly Tribal bottom bar) */}
            <div className="pt-6 text-center text-xs text-stone-400">
              © 2026 by KalaSamanvaya.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
