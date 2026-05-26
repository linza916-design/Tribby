"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard,
  CheckCircle2,
  ShieldAlert,
  Award,
  Coins,
  ArrowRight,
  Loader,
} from "lucide-react";

interface FlutterwaveCheckoutProps {
  onUpgradeCompleted: (coinsAwarded: number) => void;
  onClose: () => void;
}

type CheckoutState = "idle" | "processing" | "otp" | "success";
type Tier = "gold" | "coins";

export const FlutterwaveCheckout: React.FC<FlutterwaveCheckoutProps> = ({
  onUpgradeCompleted,
  onClose,
}) => {
  const [email, setEmail] = useState("aria.sterling@axiom.io");
  const [tier, setTier] = useState<Tier>("gold");

  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  const [checkoutState, setCheckoutState] = useState<CheckoutState>("idle");

  const [otpCode, setOtpCode] = useState("");

  const plans = {
    gold: {
      title: "Tribby Elite Gold Pro",
      price: "$14.99 / mo",
      amountInUSD: 14.99,
      coins: 500,
      features: [
        "Gold profile verification",
        "Unlimited instant matches",
        "Priority AI match reports",
        "500 free Tribby Coins",
      ],
    },
    coins: {
      title: "1,200 Tribby Coins",
      price: "$9.99 one-time",
      amountInUSD: 9.99,
      coins: 1200,
      features: [
        "Unlock secret tribe listings",
        "Direct super likes",
        "Permanent featured highlights",
        "Biometric trust unlock",
      ],
    },
  };

  const formatCardNumber = (value: string) =>
    value
      .replace(/\D/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim()
      .slice(0, 19);

  const formatExpiry = (value: string) => {
    const clean = value.replace(/\D/g, "");
    if (clean.length <= 2) return clean;
    return `${clean.slice(0, 2)}/${clean.slice(2, 4)}`;
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();

    if (!cardNumber || !cardExpiry || !cardCvv) return;

    setCheckoutState("processing");

    setTimeout(() => {
      setCheckoutState("otp");
    }, 1600);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();

    if (!otpCode) return;

    setCheckoutState("processing");

    setTimeout(() => {
      setCheckoutState("success");
      onUpgradeCompleted(plans[tier].coins);
    }, 1800);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          className="w-full max-w-md bg-zinc-950 border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-green-500/20 p-5 border-b border-white/10 relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-xs text-white/60 hover:text-white"
            >
              Cancel
            </button>

            <div className="flex items-center gap-2 mb-1">
              <Coins className="w-5 h-5 text-green-400" />
              <h2 className="font-bold text-white text-lg">Tribby Vault</h2>
            </div>

            <p className="text-xs text-white/60">
              Secured with Flutterwave 3D Secure
            </p>
          </div>

          <div className="p-6">
            {/* ================= IDLE ================= */}
            {checkoutState === "idle" && (
              <div className="space-y-5">
                {/* Tier Selector */}
                <div className="grid grid-cols-2 gap-2 bg-black/30 p-1 rounded-xl">
                  {(["gold", "coins"] as Tier[]).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTier(t)}
                      className={`py-2 rounded-lg text-sm font-semibold transition ${
                        tier === t ? "bg-green-400 text-black" : "text-white/60"
                      }`}
                    >
                      {t === "gold" ? "⚡ Gold Elite" : "🪙 Coin Bundle"}
                    </button>
                  ))}
                </div>

                {/* Plan Card */}
                <div className="rounded-xl border border-white/10 p-4 bg-white/5">
                  <div className="flex justify-between">
                    <h3 className="font-semibold text-white">
                      {plans[tier].title}
                    </h3>

                    <span className="text-green-400 font-bold">
                      {plans[tier].price}
                    </span>
                  </div>

                  <ul className="mt-3 space-y-2 text-xs text-white/70">
                    {plans[tier].features.map((f) => (
                      <li key={f} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Payment Form */}
                <form onSubmit={handlePay} className="space-y-4">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-sm text-white"
                    placeholder="Email"
                  />

                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={cardNumber}
                      onChange={(e) =>
                        setCardNumber(formatCardNumber(e.target.value))
                      }
                      className="w-full bg-black/30 border border-white/10 rounded-xl p-3 pl-10 text-sm text-white"
                      placeholder="4123 4567 8910 1112"
                    />
                    <CreditCard className="absolute left-3 top-3.5 w-4 h-4 text-white/40" />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      maxLength={5}
                      value={cardExpiry}
                      onChange={(e) =>
                        setCardExpiry(formatExpiry(e.target.value))
                      }
                      className="bg-black/30 border border-white/10 rounded-xl p-3 text-white text-center"
                      placeholder="MM/YY"
                    />

                    <input
                      type="password"
                      required
                      maxLength={3}
                      value={cardCvv}
                      onChange={(e) =>
                        setCardCvv(e.target.value.replace(/\D/g, ""))
                      }
                      className="bg-black/30 border border-white/10 rounded-xl p-3 text-white text-center"
                      placeholder="CVV"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-green-400 text-black font-bold rounded-xl flex justify-center items-center gap-2"
                  >
                    Pay via Flutterwave
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}

            {/* ================= PROCESSING ================= */}
            {checkoutState === "processing" && (
              <div className="py-12 flex flex-col items-center gap-4">
                <Loader className="w-10 h-10 animate-spin text-green-400" />
                <p className="text-white/70 text-sm">
                  Processing secure transaction...
                </p>
              </div>
            )}

            {/* ================= OTP ================= */}
            {checkoutState === "otp" && (
              <form
                onSubmit={handleVerifyOtp}
                className="space-y-5 text-center py-8"
              >
                <ShieldAlert className="w-12 h-12 text-green-400 mx-auto" />

                <h3 className="text-white font-bold text-lg">Enter OTP Code</h3>

                <input
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  maxLength={6}
                  className="w-full bg-black/30 border border-white/10 rounded-xl p-4 text-center text-white tracking-[0.4em]"
                  placeholder="123456"
                />

                <button
                  type="submit"
                  className="w-full py-3 bg-green-400 text-black font-bold rounded-xl"
                >
                  Verify Payment
                </button>
              </form>
            )}

            {/* ================= SUCCESS ================= */}
            {checkoutState === "success" && (
              <div className="py-10 text-center space-y-5">
                <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto" />

                <h3 className="text-white text-xl font-bold">
                  Upgrade Activated
                </h3>

                <p className="text-white/60 text-sm">
                  Payment successful via Flutterwave.
                </p>

                <div className="bg-white/5 rounded-xl p-4 flex justify-center gap-8">
                  <div>
                    <p className="text-xs text-white/40">Coins</p>
                    <p className="text-green-400 font-bold">
                      +{plans[tier].coins}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-white/40">Status</p>
                    <p className="text-purple-400 font-bold flex items-center gap-1">
                      Elite <Award className="w-4 h-4" />
                    </p>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-white text-black rounded-xl font-bold"
                >
                  Close Gateway
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default FlutterwaveCheckout;
