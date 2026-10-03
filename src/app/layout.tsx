import type { Metadata } from "next";
import "@/styles/globals.css";
import Link from "next/link";
import FolkArtBorder from "@/components/shared/FolkArtBorder";
import LogoLoader from "@/components/shared/LogoLoader";
import { ShoppingBag, Mic, Layers, Sparkles, User, MessageCircle } from "lucide-react";

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

        {/* Main Sticky Navbar (Truly Tribal / Tribes India Inspired) */}
        <header className="border-b border-amber-900/15 bg-white sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 py-3 flex items-center justify-between">
            {/* Big Prominent Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <img
                src="/logo.png"
                alt="KalaSamanvaya - Local Crafts • Global Hands"
                className="h-16 sm:h-20 w-auto object-contain group-hover:scale-105 transition-transform drop-shadow-sm"
              />
              <span className="hidden xl:inline-block text-xs font-bold text-[#C85A32] bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                ಕಲಾ ಸಮನ್ವಯ
              </span>
            </Link>

            {/* Desktop Navigation (Truly Tribal: Home, About Us, Business Solutions, Blog, Shop, More) */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs font-bold text-stone-700">
              <Link href="/" className="hover:text-[#C85A32] transition-colors py-1">
                Home
              </Link>
              <Link href="/marketplace#about" className="hover:text-[#C85A32] transition-colors py-1">
                About Us
              </Link>
              <Link href="/b2b" className="hover:text-[#C85A32] transition-colors py-1">
                Business Solutions
              </Link>
              <Link href="/marketplace" className="hover:text-[#C85A32] transition-colors py-1 text-[#C85A32] flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#D9822B]" />
                <span>Shop</span>
              </Link>
              <Link href="/artisan/onboard" className="hover:text-[#C85A32] transition-colors py-1 flex items-center gap-1">
                <Mic className="w-3.5 h-3.5 text-[#C85A32]" />
                <span>Voice Portal</span>
              </Link>
            </nav>

            {/* Right Action Icons (Log In pill + Cart icon like Truly Tribal) */}
            <div className="flex items-center gap-3.5">
              <Link
                href="/artisan/onboard"
                className="px-4 py-2 rounded-full border border-stone-300 hover:border-[#C85A32] text-stone-800 text-xs font-bold transition-all flex items-center gap-2 hover:bg-amber-50"
              >
                <span>Log In</span>
                <span className="w-6 h-6 rounded-full bg-stone-900 text-white flex items-center justify-center text-[11px]">
                  <User className="w-3.5 h-3.5" />
                </span>
              </Link>

              <Link
                href="/marketplace#catalog"
                className="relative p-2.5 text-stone-800 hover:text-[#C85A32] transition-colors"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#E67E22] text-white text-[10px] font-bold flex items-center justify-center">
                  1
                </span>
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1">{children}</main>

        {/* Floating Orange Chat Button (Truly Tribal bottom-right widget) */}
        <div className="fixed bottom-6 right-6 z-40">
          <Link
            href="/artisan/onboard"
            className="w-13 h-13 p-3.5 rounded-full bg-[#E67E22] hover:bg-[#cf6d17] text-white shadow-2xl flex items-center justify-center transition-all hover:scale-110 border-2 border-white/80 group"
            aria-label="Artisan Voice Assistant"
            title="Voice Portal & Craft Assistant"
          >
            <MessageCircle className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
          </Link>
        </div>

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
