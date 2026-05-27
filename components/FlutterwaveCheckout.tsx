"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  CreditCard,
  CheckCircle2,
  ShieldAlert,
  Award,
  Coins,
  ArrowRight,
  Loader,
  X,
  LockKeyhole,
  AlertCircle,
} from "lucide-react";

interface FlutterwaveCheckoutProps {
  onUpgradeCompleted: (coinsAwarded: number) => void;
  onClose: () => void;
}

type CheckoutState = "idle" | "processing" | "otp" | "success";
type Tier = "gold" | "coins";

interface Plan {
  title: string;
  price: string;
  amountInUSD: number;
  coins: number;
  features: string[];
}

const plans: Record<Tier, Plan> = {
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

export const FlutterwaveCheckout: React.FC<FlutterwaveCheckoutProps> = ({
  onUpgradeCompleted,
  onClose,
}) => {
  const prefersReducedMotion = useReducedMotion();

  const [email, setEmail] = useState("");
  const [tier, setTier] = useState<Tier>("gold");

  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  const [checkoutState, setCheckoutState] = useState<CheckoutState>("idle");

  const [otpCode, setOtpCode] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});

  const selectedPlan = useMemo(() => plans[tier], [tier]);

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

  const validateForm = () => {
    const nextErrors: Record<string, string> = {};

    if (!email.trim()) {
      nextErrors.email = "Email address is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (cardNumber.replace(/\s/g, "").length < 16) {
      nextErrors.cardNumber = "Enter a valid card number.";
    }

    if (!/^\d{2}\/\d{2}$/.test(cardExpiry)) {
      nextErrors.cardExpiry = "Enter expiry as MM/YY.";
    }

    if (cardCvv.length < 3) {
      nextErrors.cardCvv = "Enter a valid CVV.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setCheckoutState("processing");

    setTimeout(() => {
      setCheckoutState("otp");
    }, 1800);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();

    if (otpCode.trim().length < 4) {
      setErrors({
        otp: "Enter the verification code sent to your device.",
      });

      return;
    }

    setErrors({});

    setCheckoutState("processing");

    setTimeout(() => {
      setCheckoutState("success");
      onUpgradeCompleted(selectedPlan.coins);
    }, 1800);
  };

  return (
    <AnimatePresence>
      <div
        className="
          fixed inset-0 z-50
          flex items-center justify-center
          bg-black/80
          backdrop-blur-md
          p-3 sm:p-5
        "
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-title"
      >
        <motion.div
          initial={prefersReducedMotion ? false : { scale: 0.96, opacity: 0 }}
          animate={prefersReducedMotion ? {} : { scale: 1, opacity: 1 }}
          exit={prefersReducedMotion ? {} : { scale: 0.96, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="
            relative
            w-full
            max-w-md
            overflow-hidden
            rounded-3xl
            border
            border-white/10
            bg-zinc-950
            shadow-2xl
          "
        >
          {/* Header */}
          <header
            className="
              relative
              border-b border-white/10
              bg-gradient-to-r
              from-purple-500/20
              via-blue-500/20
              to-green-500/20
              p-5 sm:p-6
            "
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close payment dialog"
              className="
                absolute right-4 top-4
                flex h-10 w-10 items-center justify-center
                rounded-full
                bg-white/10
                text-white/70
                transition
                hover:bg-white/20
                hover:text-white
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-green-400
              "
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-3">
              <div
                className="
                  flex h-12 w-12 items-center justify-center
                  rounded-2xl
                  bg-green-400/10
                "
              >
                <Coins className="h-6 w-6 text-green-400" />
              </div>

              <div>
                <h2
                  id="checkout-title"
                  className="text-xl font-bold text-white"
                >
                  Tribby Vault
                </h2>

                <p className="mt-1 text-sm text-white/60">
                  Secured with Flutterwave 3D Secure
                </p>
              </div>
            </div>
          </header>

          <div className="p-5 sm:p-6">
            {/* ================= IDLE ================= */}
            {checkoutState === "idle" && (
              <div className="space-y-6">
                {/* Tier Selector */}
                <fieldset className="space-y-3">
                  <legend className="text-sm font-medium text-white">
                    Select a plan
                  </legend>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {(["gold", "coins"] as Tier[]).map((t) => {
                      const active = tier === t;

                      return (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setTier(t)}
                          aria-pressed={active}
                          className={`
                            min-h-[72px]
                            rounded-2xl
                            border
                            px-4
                            py-4
                            text-left
                            transition-all
                            focus-visible:outline-none
                            focus-visible:ring-2
                            focus-visible:ring-green-400
                            ${
                              active
                                ? "border-green-400 bg-green-400 text-black"
                                : "border-white/10 bg-white/5 text-white"
                            }
                          `}
                        >
                          <p className="text-sm font-bold">
                            {t === "gold" ? "⚡ Gold Elite" : "🪙 Coin Bundle"}
                          </p>

                          <p
                            className={`mt-1 text-xs ${
                              active ? "text-black/70" : "text-white/60"
                            }`}
                          >
                            {plans[t].price}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                {/* Plan Card */}
                <section
                  aria-labelledby="selected-plan"
                  className="
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/5
                    p-5
                  "
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3
                        id="selected-plan"
                        className="text-lg font-semibold text-white"
                      >
                        {selectedPlan.title}
                      </h3>

                      <p className="mt-1 text-sm text-white/60">
                        Includes {selectedPlan.coins} bonus coins
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-lg font-bold text-green-400">
                        {selectedPlan.price}
                      </p>
                    </div>
                  </div>

                  <ul className="mt-5 space-y-3">
                    {selectedPlan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <CheckCircle2
                          aria-hidden="true"
                          className="mt-0.5 h-4 w-4 shrink-0 text-green-400"
                        />

                        <span className="text-sm text-white/75">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Payment Form */}
                <form onSubmit={handlePay} className="space-y-5" noValidate>
                  {/* Email */}
                  <div className="space-y-2">
                    <label
                      htmlFor="checkout-email"
                      className="text-sm font-medium text-white"
                    >
                      Email address
                    </label>

                    <input
                      id="checkout-email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      aria-invalid={!!errors.email}
                      aria-describedby={
                        errors.email ? "checkout-email-error" : undefined
                      }
                      placeholder="you@example.com"
                      className="
                        min-h-[52px]
                        w-full
                        rounded-2xl
                        border
                        border-white/10
                        bg-black/30
                        px-4
                        py-3
                        text-sm
                        text-white
                        placeholder:text-white/40
                        focus:outline-none
                        focus:ring-2
                        focus:ring-green-400
                      "
                    />

                    {errors.email && (
                      <p
                        id="checkout-email-error"
                        className="flex items-center gap-2 text-sm text-red-400"
                      >
                        <AlertCircle className="h-4 w-4" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Card Number */}
                  <div className="space-y-2">
                    <label
                      htmlFor="card-number"
                      className="text-sm font-medium text-white"
                    >
                      Card number
                    </label>

                    <div className="relative">
                      <CreditCard
                        aria-hidden="true"
                        className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40"
                      />

                      <input
                        id="card-number"
                        type="text"
                        inputMode="numeric"
                        autoComplete="cc-number"
                        required
                        value={cardNumber}
                        onChange={(e) =>
                          setCardNumber(formatCardNumber(e.target.value))
                        }
                        aria-invalid={!!errors.cardNumber}
                        aria-describedby={
                          errors.cardNumber ? "card-number-error" : undefined
                        }
                        placeholder="4123 4567 8910 1112"
                        className="
                          min-h-[52px]
                          w-full
                          rounded-2xl
                          border
                          border-white/10
                          bg-black/30
                          py-3
                          pl-11
                          pr-4
                          text-sm
                          tracking-wide
                          text-white
                          placeholder:text-white/40
                          focus:outline-none
                          focus:ring-2
                          focus:ring-green-400
                        "
                      />
                    </div>

                    {errors.cardNumber && (
                      <p
                        id="card-number-error"
                        className="flex items-center gap-2 text-sm text-red-400"
                      >
                        <AlertCircle className="h-4 w-4" />
                        {errors.cardNumber}
                      </p>
                    )}
                  </div>

                  {/* Expiry + CVV */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label
                        htmlFor="card-expiry"
                        className="text-sm font-medium text-white"
                      >
                        Expiry date
                      </label>

                      <input
                        id="card-expiry"
                        type="text"
                        inputMode="numeric"
                        autoComplete="cc-exp"
                        required
                        maxLength={5}
                        value={cardExpiry}
                        onChange={(e) =>
                          setCardExpiry(formatExpiry(e.target.value))
                        }
                        aria-invalid={!!errors.cardExpiry}
                        placeholder="MM/YY"
                        className="
                          min-h-[52px]
                          w-full
                          rounded-2xl
                          border
                          border-white/10
                          bg-black/30
                          px-4
                          py-3
                          text-sm
                          text-white
                          placeholder:text-white/40
                          focus:outline-none
                          focus:ring-2
                          focus:ring-green-400
                        "
                      />

                      {errors.cardExpiry && (
                        <p className="text-sm text-red-400">
                          {errors.cardExpiry}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="card-cvv"
                        className="text-sm font-medium text-white"
                      >
                        Security code
                      </label>

                      <input
                        id="card-cvv"
                        type="password"
                        inputMode="numeric"
                        autoComplete="cc-csc"
                        required
                        maxLength={4}
                        value={cardCvv}
                        onChange={(e) =>
                          setCardCvv(e.target.value.replace(/\D/g, ""))
                        }
                        aria-invalid={!!errors.cardCvv}
                        placeholder="CVV"
                        className="
                          min-h-[52px]
                          w-full
                          rounded-2xl
                          border
                          border-white/10
                          bg-black/30
                          px-4
                          py-3
                          text-sm
                          text-white
                          placeholder:text-white/40
                          focus:outline-none
                          focus:ring-2
                          focus:ring-green-400
                        "
                      />

                      {errors.cardCvv && (
                        <p className="text-sm text-red-400">{errors.cardCvv}</p>
                      )}
                    </div>
                  </div>

                  {/* Security */}
                  <div
                    className="
                      flex items-start gap-3
                      rounded-2xl
                      border border-green-400/20
                      bg-green-400/5
                      p-4
                    "
                  >
                    <LockKeyhole className="mt-0.5 h-5 w-5 text-green-400" />

                    <div>
                      <p className="text-sm font-medium text-white">
                        Secure checkout
                      </p>

                      <p className="mt-1 text-xs leading-relaxed text-white/60">
                        Your payment is encrypted and protected using
                        Flutterwave secure authentication.
                      </p>
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="
                      flex min-h-[56px] w-full
                      items-center justify-center gap-2
                      rounded-2xl
                      bg-green-400
                      px-5 py-4
                      text-sm font-bold text-black
                      transition-all
                      hover:brightness-110
                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-green-400
                    "
                  >
                    Pay via Flutterwave
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              </div>
            )}

            {/* ================= PROCESSING ================= */}
            {checkoutState === "processing" && (
              <div className="flex flex-col items-center py-14 text-center">
                <Loader className="h-12 w-12 animate-spin text-green-400" />

                <h3 className="mt-5 text-lg font-semibold text-white">
                  Processing transaction
                </h3>

                <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/60">
                  Please wait while we securely verify your payment.
                </p>
              </div>
            )}

            {/* ================= OTP ================= */}
            {checkoutState === "otp" && (
              <form onSubmit={handleVerifyOtp} className="space-y-6 py-8">
                <div className="text-center">
                  <ShieldAlert className="mx-auto h-14 w-14 text-green-400" />

                  <h3 className="mt-5 text-xl font-bold text-white">
                    Verify your payment
                  </h3>

                  <p className="mt-2 text-sm text-white/60">
                    Enter the one-time password sent to your device.
                  </p>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="otp-code"
                    className="text-sm font-medium text-white"
                  >
                    OTP code
                  </label>

                  <input
                    id="otp-code"
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={6}
                    value={otpCode}
                    onChange={(e) =>
                      setOtpCode(e.target.value.replace(/\D/g, ""))
                    }
                    aria-invalid={!!errors.otp}
                    placeholder="123456"
                    className="
                      min-h-[60px]
                      w-full
                      rounded-2xl
                      border
                      border-white/10
                      bg-black/30
                      px-4
                      py-4
                      text-center
                      text-lg
                      tracking-[0.4em]
                      text-white
                      placeholder:text-white/40
                      focus:outline-none
                      focus:ring-2
                      focus:ring-green-400
                    "
                  />

                  {errors.otp && (
                    <p className="text-sm text-red-400">{errors.otp}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="
                    min-h-[56px]
                    w-full
                    rounded-2xl
                    bg-green-400
                    px-5 py-4
                    text-sm font-bold text-black
                    transition-all
                    hover:brightness-110
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-green-400
                  "
                >
                  Verify Payment
                </button>
              </form>
            )}

            {/* ================= SUCCESS ================= */}
            {checkoutState === "success" && (
              <div className="space-y-6 py-10 text-center">
                <div
                  className="
                    mx-auto
                    flex h-20 w-20 items-center justify-center
                    rounded-full
                    bg-green-400/10
                  "
                >
                  <CheckCircle2 className="h-12 w-12 text-green-400" />
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white">
                    Upgrade Activated
                  </h3>

                  <p className="mt-2 text-sm text-white/60">
                    Payment successful via Flutterwave.
                  </p>
                </div>

                <div
                  className="
                    grid grid-cols-2 gap-4
                    rounded-2xl
                    border border-white/10
                    bg-white/5
                    p-5
                  "
                >
                  <div>
                    <p className="text-xs uppercase tracking-wide text-white/40">
                      Coins
                    </p>

                    <p className="mt-2 text-xl font-bold text-green-400">
                      +{selectedPlan.coins}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wide text-white/40">
                      Status
                    </p>

                    <div className="mt-2 flex items-center justify-center gap-2 text-xl font-bold text-purple-400">
                      Elite
                      <Award className="h-5 w-5" />
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="
                    min-h-[52px]
                    rounded-2xl
                    bg-white
                    px-6 py-3
                    text-sm font-bold text-black
                    transition-all
                    hover:bg-white/90
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-white
                  "
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
