"use client";

import React, { useState } from "react";
import { ArtisanProduct } from "@/lib/db/products";
import { X, CheckCircle2, ShieldCheck, Truck, CreditCard, Sparkles, MapPin, Smartphone } from "lucide-react";

interface MockCheckoutModalProps {
  product: ArtisanProduct | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function MockCheckoutModal({
  product,
  isOpen,
  onClose
}: MockCheckoutModalProps) {
  const [buyerName, setBuyerName] = useState("Anoop Kumar");
  const [buyerPhone, setBuyerPhone] = useState("+91 98765 43210");
  const [deliveryDistrict, setDeliveryDistrict] = useState("Bengaluru Urban");
  const [deliveryAddress, setDeliveryAddress] = useState("Flat 402, Heritage Residency, Koramangala");
  const [paymentMethod, setPaymentMethod] = useState<"UPI" | "CARD" | "COD">("UPI");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");

  if (!isOpen || !product) return null;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const generatedId = `KS-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(generatedId);
      setIsProcessing(false);
      setIsSuccess(true);
    }, 1200);
  };

  const handleReset = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-[#FAF6F0] rounded-2xl shadow-2xl border border-amber-900/20 overflow-hidden text-[#2A1810]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-[#2A1810] text-[#FAF6F0] px-6 py-4 flex items-center justify-between border-b border-amber-800/40">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#C85A32] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-base font-bold tracking-wide">
                {isSuccess ? "Order Confirmed!" : "Direct Artisan Mock Checkout"}
              </h3>
              <p className="text-xs text-amber-200/80">
                {isSuccess ? "ಧನ್ಯವಾದಗಳು • Empowering Karnataka Craft Clusters" : "Zero Middlemen • 95% Direct Payout to Rural Artisan"}
              </p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSuccess ? (
          /* Success Screen */
          <div className="p-8 text-center space-y-5 animate-fadeIn">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                Mock Payment Succeeded
              </span>
              <h4 className="text-xl font-bold text-[#2A1810] mt-3">
                Thank You, {buyerName}!
              </h4>
              <p className="text-xs text-stone-600 mt-1 max-w-md mx-auto">
                Your order for <strong className="text-[#2A1810]">{product.title}</strong> has been confirmed.
              </p>
            </div>

            {/* Direct Payout Receipt Card */}
            <div className="bg-white p-5 rounded-xl border border-amber-200/80 max-w-md mx-auto text-left shadow-sm space-y-3">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-stone-200">
                <span className="text-stone-500">Order Reference:</span>
                <span className="font-mono font-bold text-[#C85A32]">{orderId}</span>
              </div>
              <div className="flex items-center justify-between text-xs pb-2 border-b border-stone-200">
                <span className="text-stone-500">Maker:</span>
                <span className="font-semibold">{product.artisanName} ({product.artisanCluster})</span>
              </div>
              <div className="flex items-center justify-between text-xs pb-2 border-b border-stone-200">
                <span className="text-stone-500">Direct Artisan Earning:</span>
                <span className="font-bold text-emerald-700">₹{product.breakdown.artisanDirectPayoutINR.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex items-center justify-between text-xs pb-2 border-b border-stone-200">
                <span className="text-stone-500">Estimated Dispatch:</span>
                <span className="font-medium text-stone-700">Within {product.leadTimeDays} business days</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-500">Shipping to:</span>
                <span className="font-medium text-stone-700">{deliveryDistrict}</span>
              </div>
            </div>

            <p className="text-xs text-stone-500 italic max-w-md mx-auto">
              &quot;By buying direct, you ensure that ₹{product.breakdown.artisanDirectPayoutINR} reaches {product.artisanName}&apos;s household instead of disappearing into middleman commissions.&quot;
            </p>

            <button
              onClick={handleReset}
              className="px-6 py-2.5 rounded-lg bg-[#C85A32] hover:bg-[#A34828] text-white font-semibold text-xs shadow-md transition-colors"
            >
              Continue Exploring Crafts
            </button>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handlePlaceOrder} className="p-6 space-y-5">
            {/* Product Summary Header */}
            <div className="flex items-center gap-4 p-3 bg-white rounded-xl border border-amber-200/80 shadow-sm">
              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-16 h-16 object-cover rounded-lg border border-amber-100"
              />
              <div className="flex-1">
                <h4 className="text-xs font-bold text-[#2A1810] line-clamp-1">{product.title}</h4>
                <p className="text-[11px] text-stone-500">Artisan: {product.artisanName} • {product.artisanDistrict}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm font-bold text-[#C85A32]">₹{product.priceINR.toLocaleString("en-IN")}</span>
                  <span className="text-xs text-stone-400 line-through">₹{product.compareAtPriceINR.toLocaleString("en-IN")}</span>
                  <span className="text-[10px] text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded font-semibold">
                    Direct Payout: ₹{product.breakdown.artisanDirectPayoutINR}
                  </span>
                </div>
              </div>
            </div>

            {/* Delivery Details */}
            <div className="space-y-3">
              <h5 className="text-xs font-bold text-[#2A1810] uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#C85A32]" />
                Delivery Information (Karnataka & Pan-India)
              </h5>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-[11px] font-medium text-stone-600 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-amber-200 text-stone-800 text-xs focus:ring-1 focus:ring-[#C85A32] focus:outline-none"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-stone-600 mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    required
                    value={buyerPhone}
                    onChange={(e) => setBuyerPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-amber-200 text-stone-800 text-xs focus:ring-1 focus:ring-[#C85A32] focus:outline-none"
                    placeholder="+91 98765 XXXXX"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-[11px] font-medium text-stone-600 mb-1">District / Region</label>
                  <select
                    value={deliveryDistrict}
                    onChange={(e) => setDeliveryDistrict(e.target.value)}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-amber-200 text-stone-800 text-xs focus:ring-1 focus:ring-[#C85A32] focus:outline-none"
                  >
                    <option value="Bengaluru Urban">Bengaluru Urban</option>
                    <option value="Mangaluru / Dakshina Kannada">Mangaluru / Dakshina Kannada</option>
                    <option value="Udupi">Udupi</option>
                    <option value="Dharwad / Hubballi">Dharwad / Hubballi</option>
                    <option value="Mysuru">Mysuru</option>
                    <option value="Belagavi">Belagavi</option>
                    <option value="Delhi NCR">Delhi NCR</option>
                    <option value="Mumbai">Mumbai</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-stone-600 mb-1">Delivery Address</label>
                  <input
                    type="text"
                    required
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-amber-200 text-stone-800 text-xs focus:ring-1 focus:ring-[#C85A32] focus:outline-none"
                    placeholder="Street, locality, landmark"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <h5 className="text-xs font-bold text-[#2A1810] uppercase tracking-wider flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-[#C85A32]" />
                Select Mock Payment Mode
              </h5>

              <div className="grid grid-cols-3 gap-2.5 text-xs">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("UPI")}
                  className={`p-2.5 rounded-lg border text-center transition-all flex flex-col items-center gap-1 ${
                    paymentMethod === "UPI"
                      ? "bg-amber-100/80 border-[#C85A32] text-[#C85A32] font-bold shadow-sm"
                      : "bg-white border-amber-200 text-stone-600 hover:bg-stone-50"
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  <span>UPI / QR</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("CARD")}
                  className={`p-2.5 rounded-lg border text-center transition-all flex flex-col items-center gap-1 ${
                    paymentMethod === "CARD"
                      ? "bg-amber-100/80 border-[#C85A32] text-[#C85A32] font-bold shadow-sm"
                      : "bg-white border-amber-200 text-stone-600 hover:bg-stone-50"
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>RuPay / Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("COD")}
                  className={`p-2.5 rounded-lg border text-center transition-all flex flex-col items-center gap-1 ${
                    paymentMethod === "COD"
                      ? "bg-amber-100/80 border-[#C85A32] text-[#C85A32] font-bold shadow-sm"
                      : "bg-white border-amber-200 text-stone-600 hover:bg-stone-50"
                  }`}
                >
                  <Truck className="w-4 h-4" />
                  <span>Pay on Delivery</span>
                </button>
              </div>
            </div>

            {/* Transparency Note */}
            <div className="flex items-start gap-2 p-3 bg-amber-50 rounded-lg border border-amber-200 text-[11px] text-stone-700">
              <ShieldCheck className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Direct Artisan Payout:</strong> ₹{product.breakdown.artisanDirectPayoutINR} is credited directly into {product.artisanName}&apos;s account upon delivery confirmation.
              </span>
            </div>

            {/* Footer Buttons */}
            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isProcessing}
                className="px-6 py-2.5 bg-[#C85A32] hover:bg-[#A34828] text-white text-xs font-semibold rounded-lg shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing Order...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm Order (₹{product.priceINR.toLocaleString("en-IN")})</span>
                    <Sparkles className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
