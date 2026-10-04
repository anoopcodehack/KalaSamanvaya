"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShoppingBag,
  Mic,
  Building2,
  User,
  Menu,
  X,
  Store,
  Home,
  Info,
  ChevronRight,
  PackageCheck,
  LogOut,
  RefreshCw,
  ShieldCheck,
  Scale
} from "lucide-react";
import { ARTISAN_PRODUCTS } from "@/lib/db/products";
import MockCheckoutModal from "@/components/marketplace/MockCheckoutModal";

interface CartItem {
  id: string;
  title: string;
  craft: string;
  maker: string;
  district: string;
  price: number;
  compareAtPrice: number;
  artisanPayout: number;
  image: string;
  quantity: number;
}

const DEFAULT_CART_ITEMS: CartItem[] = [
  {
    id: "prod-kasuti-01",
    title: "Dharwad Heritage Kasuti Silk Shawl",
    craft: "Kasuti GI Heritage",
    maker: "Savita Naik (Dharwad Kendra)",
    district: "Dharwad",
    price: 1850,
    compareAtPrice: 2400,
    artisanPayout: 1380,
    image: "/assets/craft-kasuti.jpg",
    quantity: 1,
  },
  {
    id: "prod-wood-01",
    title: "Channapatna Lacquer Wooden Rocking Horse",
    craft: "Channapatna GI Woodcraft",
    maker: "Subbanna Achar (Ramanagara)",
    district: "Ramanagara",
    price: 1150,
    compareAtPrice: 1500,
    artisanPayout: 820,
    image: "/assets/craft-channapatna.jpg",
    quantity: 1,
  },
  {
    id: "prod-bidri-01",
    title: "Bidar Pure Silver Inlay Heritage Coasters",
    craft: "Bidriware GI Metalcraft",
    maker: "Mohammed Rafeeq (Bidar Fort)",
    district: "Bidar",
    price: 1650,
    compareAtPrice: 2200,
    artisanPayout: 1220,
    image: "/assets/craft-bidri.jpg",
    quantity: 1,
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>(DEFAULT_CART_ITEMS);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalArtisanPayout = cartItems.reduce((acc, item) => acc + item.artisanPayout * item.quantity, 0);

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  useEffect(() => {
    const loadUser = () => {
      try {
        const stored = localStorage.getItem("kala_active_user");
        if (stored) {
          setCurrentUser(JSON.parse(stored));
        } else {
          // Default demo user: Savita Naik
          const defaultUser = {
            id: "user-artisan-01",
            role: "artisan",
            name: "Savita Naik",
            nameKn: "ಸವಿತಾ ನಾಯಕ್",
            title: "GI Kasuti Master Artisan & SHG Lead",
            titleKn: "ಕಸೂತಿ ಕರಕುಶಲಕರ್ಮಿ • ಸಂಘದ ಮುಖ್ಯಸ್ಥೆ",
            badge: "Dharwad Cluster Head",
            avatarChar: "ಸ",
            defaultRoute: "/artisan/inbox",
          };
          setCurrentUser(defaultUser);
        }
      } catch (e) {
        // ignore
      }
    };

    loadUser();
    window.addEventListener("kala-user-changed", loadUser);
    return () => window.removeEventListener("kala-user-changed", loadUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("kala_active_user");
    setCurrentUser(null);
    setUserDropdownOpen(false);
  };

  const navLinks = [
    {
      name: "Home",
      href: "/",
      isActive: pathname === "/",
      icon: Home,
    },
    {
      name: "Shop",
      kannada: "ಮಳಿಗೆ",
      href: "/marketplace",
      isActive: pathname.startsWith("/marketplace"),
      icon: Store,
    },
    {
      name: "Business Solutions",
      kannada: "ಬಿ2ಬಿ",
      href: "/b2b",
      isActive: pathname.startsWith("/b2b"),
      icon: Building2,
    },
    {
      name: "Voice Portal",
      kannada: "ಧ್ವನಿ ನೊಂದಣಿ",
      href: "/artisan/onboard",
      isActive: pathname === "/artisan/onboard",
      icon: Mic,
    },
    {
      name: "Artisan Inbox",
      kannada: "ಇನ್‌ಬಾಕ್ಸ್",
      href: "/artisan/inbox",
      isActive: pathname === "/artisan/inbox",
      icon: PackageCheck,
    },
    {
      name: "Impact & 8% Model",
      kannada: "ಪ್ರಭಾವ & ಮಾದರಿ",
      href: "/impact",
      isActive: pathname === "/impact",
      icon: Scale,
    },
  ];

  return (
    <>
      <header className="border-b border-stone-200/80 bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-sm transition-shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* ── 1. PROMINENT BIG LOGO (Sleek nav, big crisp logo) ── */}
          <Link
            href="/"
            className="flex items-center gap-3 group transition-transform duration-300 ease-out"
          >
            {/* Big Logo Image with subtle smooth hover micro-zoom */}
            <img
              src="/logo.png"
              alt="KalaSamanvaya - Local Crafts • Global Hands"
              className="h-16 sm:h-18 md:h-20 w-auto object-contain transition-all duration-300 ease-out group-hover:scale-[1.04] group-hover:-translate-y-0.5 filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.08)]"
            />
            <span className="hidden xl:inline-block text-xs font-bold text-[#C85A32] bg-amber-50/90 px-2.5 py-1 rounded-full border border-amber-200 transition-all duration-200 group-hover:border-[#C85A32]/40 group-hover:bg-amber-100/80">
              ಕಲಾ ಸಮನ್ವಯ
            </span>
          </Link>

          {/* ── 2. DESKTOP DYNAMIC NAVIGATION (Tactile soft dev hover animations) ── */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`group relative px-3.5 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ease-out flex items-center gap-1.5 ${
                    link.isActive
                      ? "text-[#C85A32] font-bold bg-amber-50/90 shadow-sm"
                      : "text-stone-700 hover:text-[#C85A32] hover:bg-stone-50/80 hover:-translate-y-0.5 active:translate-y-0"
                  }`}
                >
                  {/* Icon with subtle upward micro-nudge on hover */}
                  <Icon
                    className={`w-3.5 h-3.5 transition-transform duration-200 ease-out ${
                      link.isActive
                        ? "text-[#C85A32]"
                        : "text-stone-400 group-hover:text-[#C85A32] group-hover:-translate-y-0.5"
                    }`}
                  />
                  <span>{link.name}</span>

                  {/* Smooth expanding underline on hover (standard dev craftsmanship, no AI glow) */}
                  <span
                    className={`absolute bottom-0.5 left-3 right-3 h-[2px] bg-[#C85A32] rounded-full transition-transform duration-300 ease-out origin-center ${
                      link.isActive
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100 opacity-80"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* ── 3. RIGHT ACTION ICONS (Tactile hover micro-interactions) ── */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            {/* Quick Kannada Voice Listing Badge (Desktop only) */}
            <Link
              href="/artisan/onboard"
              className="group hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF7F2] border border-amber-300 text-[11px] font-bold text-[#C85A32] hover:bg-amber-100 hover:border-[#C85A32]/60 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 ease-out shadow-xs"
            >
              <Mic className="w-3 h-3 text-[#C85A32] transition-transform duration-200 ease-out group-hover:rotate-12 group-hover:scale-110" />
              <span>ಮಾತನಾಡಿ ನೊಂದಾಯಿಸಿ</span>
            </Link>

            {/* User Profile / Login Pill */}
            {currentUser ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="group px-3.5 py-1.5 rounded-full border border-stone-300 hover:border-[#C85A32] text-stone-800 text-xs font-semibold transition-all duration-200 ease-out flex items-center gap-2 hover:bg-amber-50/60 hover:-translate-y-0.5 hover:shadow-xs active:translate-y-0 active:scale-95"
                  title={`${currentUser.name} (${currentUser.title || "Active Persona"})`}
                >
                  <span className="hidden sm:inline font-bold text-[#2A1810]">
                    {currentUser.nameKn || currentUser.name}
                  </span>
                  <span className="w-6 h-6 rounded-full bg-[#E67E22] text-white flex items-center justify-center text-[10px] font-bold transition-transform duration-200 ease-out group-hover:scale-105 shadow-xs">
                    {currentUser.avatarChar || "U"}
                  </span>
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-stone-200 py-2 z-50 animate-fadeIn text-xs text-stone-800">
                    <div className="px-4 py-2 border-b border-stone-100">
                      <p className="font-extrabold text-stone-900 text-sm">
                        {currentUser.nameKn || currentUser.name}
                      </p>
                      <p className="text-[10px] text-stone-500 mt-0.5 leading-snug">
                        {currentUser.badge || currentUser.title}
                      </p>
                    </div>

                    <div className="py-1">
                      <Link
                        href={currentUser.defaultRoute || "/artisan/inbox"}
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-amber-50 hover:text-[#C85A32] transition-colors"
                      >
                        <PackageCheck className="w-3.5 h-3.5 text-[#C85A32]" />
                        <span>ನನ್ನ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ (My Portal)</span>
                      </Link>

                      <Link
                        href="/login"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-amber-50 hover:text-[#C85A32] transition-colors"
                      >
                        <RefreshCw className="w-3.5 h-3.5 text-amber-600" />
                        <span>ಪಾತ್ರ ಬದಲಿಸಿ (Switch Persona)</span>
                      </Link>
                    </div>

                    <div className="pt-1 border-t border-stone-100">
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2 text-stone-500 hover:text-red-600 hover:bg-red-50/60 transition-colors"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>ಲಾಗ್ ಔಟ್ (Sign Out)</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="group px-3.5 py-1.5 rounded-full border border-stone-300 hover:border-[#C85A32] text-stone-800 text-xs font-semibold transition-all duration-200 ease-out flex items-center gap-2 hover:bg-stone-50 hover:-translate-y-0.5 hover:shadow-xs active:translate-y-0 active:scale-95"
              >
                <span>Log In</span>
                <span className="w-6 h-6 rounded-full bg-stone-900 text-white flex items-center justify-center text-[11px] transition-transform duration-200 ease-out group-hover:scale-105 group-hover:bg-[#C85A32]">
                  <User className="w-3 h-3" />
                </span>
              </Link>
            )}

            {/* Shopping Cart Button - Opens Interactive Slide-out Cart Drawer */}
            <button
              type="button"
              onClick={() => setCartDrawerOpen(true)}
              className="group relative p-2 rounded-full text-stone-800 hover:text-[#C85A32] hover:bg-stone-50 hover:-translate-y-0.5 active:scale-95 transition-all duration-200 ease-out"
              aria-label={`Shopping Cart (${totalCartCount} items)`}
              title={`Open Handcrafted Cart (${totalCartCount} items)`}
            >
              <ShoppingBag className="w-5 h-5 transition-transform duration-200 ease-out group-hover:-rotate-6 group-hover:scale-105" />
              <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-[#C85A32] text-white text-[10px] font-bold flex items-center justify-center shadow-xs transition-transform duration-200 ease-out group-hover:scale-110">
                {totalCartCount}
              </span>
            </button>

            {/* Mobile Menu Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-stone-700 hover:text-[#C85A32] hover:bg-stone-100 active:scale-95 transition-all duration-200"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* ── MOBILE ACCORDION / SLIDEOUT MENU ── */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-white px-4 py-4 space-y-2 shadow-lg animate-fadeIn">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-[0.99] ${
                  link.isActive
                    ? "bg-amber-50 text-[#C85A32] font-bold"
                    : "text-stone-700 hover:bg-stone-50 hover:text-[#C85A32]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      link.isActive ? "text-[#C85A32]" : "text-stone-400"
                    }`}
                  />
                  <span>{link.name}</span>
                </div>
                {link.kannada && (
                  <span className="text-xs text-stone-400 font-normal">
                    {link.kannada}
                  </span>
                )}
                <ChevronRight className="w-4 h-4 text-stone-400" />
              </Link>
            );
          })}

          <div className="pt-2 border-t border-stone-200 space-y-2">
            <Link
              href="/artisan/onboard"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-xl bg-[#C85A32] hover:bg-[#a84420] active:scale-[0.98] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all duration-200"
            >
              <Mic className="w-4 h-4" />
              <span>Launch Kannada Voice Portal (ಧ್ವನಿ ನೊಂದಣಿ)</span>
            </Link>

            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-xl border border-stone-300 hover:border-[#C85A32] active:scale-[0.98] text-stone-800 font-bold text-xs flex items-center justify-center gap-2 transition-all duration-200"
            >
              <User className="w-4 h-4 text-[#C85A32]" />
              <span>
                {currentUser
                  ? `ಪಾತ್ರ ಬದಲಿಸಿ (${currentUser.nameKn || currentUser.name})`
                  : "Log In (ಪ್ರವೇಶಿಸಿ)"}
              </span>
            </Link>
          </div>
        </div>
      )}
    </header>

    {/* ── INTERACTIVE CART DRAWER (Positioned Outside Header) ── */}
    {cartDrawerOpen && (
      <div className="fixed inset-0 z-[100] overflow-hidden text-[#2A1810]">
        {/* Full-screen Dark Backdrop */}
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fadeIn z-[100]"
          onClick={() => setCartDrawerOpen(false)}
        />

        {/* Full-height Slide-out Drawer Panel */}
        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10 z-[101] h-screen pointer-events-none">
          <div className="w-screen max-w-md bg-[#FAF7F2] shadow-2xl flex flex-col justify-between border-l border-stone-200 animate-slideInRight h-full pointer-events-auto">
              
              {/* Header */}
              <div className="p-4 sm:p-5 bg-white border-b border-stone-200 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-[#C85A32] flex items-center justify-center border border-amber-200">
                    <ShoppingBag className="w-5 h-5 text-[#C85A32]" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#2A1810]">
                      Your Handcrafted Cart
                    </h3>
                    <p className="text-[11px] text-stone-500 font-medium">
                      {totalCartCount} Authentic Karnataka Artisan {totalCartCount === 1 ? "Piece" : "Pieces"}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setCartDrawerOpen(false)}
                  className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Pan-India Delivery Ribbon */}
              <div className="bg-[#24130A] text-amber-200 text-xs py-2 px-4 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-emerald-400">
                  Free Pan-India Delivery Unlocked!
                </span>
                <span className="text-[10px] text-stone-400">100% GI Authentic</span>
              </div>

              {/* Cart Items Area */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5">
                {cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <div key={item.id} className="bg-white rounded-2xl p-3.5 border border-stone-200 shadow-xs space-y-3">
                      <div className="flex gap-3">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl border border-stone-200 flex-shrink-0"
                        />

                        <div className="flex-1 space-y-1">
                          <span className="px-2 py-0.5 rounded bg-amber-100 text-[#C85A32] text-[10px] font-bold uppercase tracking-wider inline-block">
                            {item.craft}
                          </span>
                          <h4 className="font-bold text-xs sm:text-sm text-[#2A1810] leading-snug">
                            {item.title}
                          </h4>
                          <p className="text-[11px] text-stone-500">
                            Maker: {item.maker}
                          </p>
                          <div className="flex items-baseline gap-2 pt-0.5">
                            <span className="font-extrabold text-[#C85A32] text-sm">
                              ₹{item.price.toLocaleString("en-IN")}
                            </span>
                            <span className="text-stone-400 line-through text-xs">
                              ₹{item.compareAtPrice.toLocaleString("en-IN")}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Quantity & Payout Row */}
                      <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                        {/* Quantity Selector */}
                        <div className="flex items-center border border-stone-300 rounded-lg overflow-hidden bg-[#FAF7F2]">
                          <button
                            type="button"
                            onClick={() => handleUpdateQuantity(item.id, -1)}
                            className="px-2.5 py-1 text-stone-600 hover:bg-stone-200 transition-colors font-bold"
                            title="Decrease quantity or remove"
                          >
                            -
                          </button>
                          <span className="px-3 py-1 font-bold text-stone-800">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleUpdateQuantity(item.id, 1)}
                            className="px-2.5 py-1 text-stone-600 hover:bg-stone-200 transition-colors font-bold"
                            title="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        {/* Direct Fair Wage Payout */}
                        <div className="text-right">
                          <span className="text-[10px] text-stone-500 block">
                            Direct Artisan Wage (75%):
                          </span>
                          <span className="font-extrabold text-emerald-700 text-xs">
                            ₹{(item.artisanPayout * item.quantity).toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 bg-white rounded-2xl border border-stone-200 p-6 space-y-2">
                    <p className="text-stone-500 text-sm">Your cart is currently empty.</p>
                    <Link
                      href="/marketplace#catalog"
                      onClick={() => setCartDrawerOpen(false)}
                      className="text-xs font-bold text-[#C85A32] hover:underline"
                    >
                      Browse Karnataka Crafts Catalog →
                    </Link>
                  </div>
                )}

                {/* Fair-Trade Promise Note */}
                <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-[#C85A32]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Fair-Trade Direct Payment Guarantee</span>
                  </div>
                  <p className="text-[11px] text-stone-600 leading-relaxed">
                    Zero middlemen deductions. Over <strong>74%+</strong> of this order (₹{totalArtisanPayout.toLocaleString("en-IN")}) directly credits Karnataka artisan SHG bank accounts with instant UPI settlement.
                  </p>
                </div>
              </div>

              {/* Drawer Footer & Checkout Button */}
              <div className="p-4 sm:p-5 bg-white border-t border-stone-200 space-y-3">
                <div className="space-y-1.5 text-xs text-stone-600">
                  <div className="flex justify-between">
                    <span>Subtotal ({totalCartCount} items):</span>
                    <span className="font-semibold text-stone-800">
                      ₹{cartSubtotal.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pan-India Delivery:</span>
                    <span className="font-bold text-emerald-600">FREE</span>
                  </div>
                  <div className="flex justify-between text-sm font-extrabold text-[#2A1810] pt-1.5 border-t border-stone-100">
                    <span>Total Order Value:</span>
                    <span className="text-[#C85A32] text-base">
                      ₹{cartSubtotal.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  disabled={cartItems.length === 0}
                  onClick={() => {
                    setCartDrawerOpen(false);
                    setCheckoutModalOpen(true);
                  }}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#C85A32] hover:bg-[#a84420] disabled:bg-stone-300 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>Proceed to Instant Mock Checkout (UPI)</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <div className="text-center pt-1">
                  <Link
                    href="/marketplace#catalog"
                    onClick={() => setCartDrawerOpen(false)}
                    className="text-xs text-stone-500 hover:text-[#C85A32] underline"
                  >
                    Or explore more handcrafted collections
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ── MOCK CHECKOUT MODAL ── */}
      <MockCheckoutModal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
        product={ARTISAN_PRODUCTS[0]}
      />
    </>
  );
}
