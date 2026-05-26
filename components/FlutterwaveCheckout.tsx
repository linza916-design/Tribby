import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard,
  CheckCircle2,
  ShieldAlert,
  Cpu,
  Award,
  Milestone,
  Coins,
  ArrowRight,
  Loader,
} from "lucide-react";

interface FlutterwaveCheckoutProps {
  onUpgradeCompleted: (coinsAwarded: number) => void;
  onClose: () => void;
}

export const FlutterwaveCheckout: React.FC<FlutterwaveCheckoutProps> = ({
  onUpgradeCompleted,
  onClose,
}) => {
  const [email, setEmail] = useState("aria.sterling@axiom.io");
  const [tier, setTier] = useState<"gold" | "coins">("gold");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [checkoutState, setCheckoutState] = useState<
    "idle" | "processing" | "otp" | "success"
  >("idle");
  const [otpCode, setOtpCode] = useState("");

  const plans = {
    gold: {
      title: "Tribby Elite Gold Pro",
      price: "$14.99 / mo",
      features: [
        "Gold profile mesh & verification status",
        "Unlimited instant swipes & matches",
        "Priority Gemini custom match reports",
        "500 free Tribby Coins currency pack",
      ],
      amountInUSD: 14.99,
    },
    coins: {
      title: "1,200 Tribby Coins Batch",
      price: "$9.99 flat value",
      features: [
        "Unlocks secret tribal map listings",
        "Biometric server trust overrides",
        "Direct instant super likes",
        "Permanent story featured highlights",
      ],
      amountInUSD: 9.99,
    },
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardNumber || !cardExpiry || !cardCvv) return;

    setCheckoutState("processing");

    // Simulate Flutterwave routing engine
    setTimeout(() => {
      setCheckoutState("otp");
    }, 1500);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode) return;

    setCheckoutState("processing");

    setTimeout(() => {
      setCheckoutState("success");
      // Award matching coins
      const coins = tier === "gold" ? 500 : 1200;
      onUpgradeCompleted(coins);
    }, 1800);
  };

  return (
    <div
      id="flutterwave-checkout-root"
      className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-md bg-surface border border-white/10 rounded-2xl overflow-hidden glass-panel relative"
      >
        {/* Header Branding */}
        <div className="bg-gradient-to-r from-brand-purple/20 via-brand-blue/25 to-brand-green/20 p-5 border-b border-white/5 relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 text-white/40 hover:text-white text-xs bg-black/20 px-2 py-1 rounded-md"
          >
            Cancel
          </button>

          <div className="flex items-center gap-2 mb-1">
            <Coins className="w-5 h-5 text-brand-green animate-bounce" />
            <h2 className="font-display font-bold text-base text-white">
              Tribby Payments Vault
            </h2>
          </div>
          <p className="text-[11px] text-white/60">
            Secured with Flutterwave 3-Domain Secure 2.0
          </p>
        </div>

        <div className="p-6 space-y-5 text-left">
          {checkoutState === "idle" && (
            <div className="space-y-4">
              {/* Product selection tabs */}
              <div className="grid grid-cols-2 gap-2 bg-black/40 p-1 rounded-xl border border-white/5">
                <button
                  type="button"
                  onClick={() => setTier("gold")}
                  className={`py-2 text-[11px] font-sans font-semibold rounded-lg transition ${tier === "gold" ? "bg-brand-purple text-black" : "text-white/60 hover:text-white"}`}
                >
                  ⚡️ Go Gold Elite
                </button>
                <button
                  type="button"
                  onClick={() => setTier("coins")}
                  className={`py-2 text-[11px] font-sans font-semibold rounded-lg transition ${tier === "coins" ? "bg-brand-green text-black" : "text-white/60 hover:text-white"}`}
                >
                  🪙 Coins Bundle
                </button>
              </div>

              {/* Show Plan Details */}
              <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-display font-bold text-sm text-white">
                    {plans[tier].title}
                  </h3>
                  <span className="text-xs font-mono font-bold text-brand-green bg-brand-green/10 px-2 py-0.5 rounded-full border border-brand-green/20">
                    {plans[tier].price}
                  </span>
                </div>
                <ul className="space-y-1.5 mt-3">
                  {plans[tier].features.map((f, idx) => (
                    <li
                      key={idx}
                      className="text-[10px] text-white/70 flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-brand-green text-[12px] font-bold">
                        verified
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Payment details form */}
              <form onSubmit={handlePay} className="space-y-3.5">
                <div>
                  <label className="text-[10px] text-white/50 font-mono tracking-wider uppercase block mb-1">
                    Flutterwave Identity Link
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="example@yourdomain.com"
                    className="w-full bg-black/40 border border-white/15 rounded-lg p-3 text-xs text-white placeholder-white/20 focus:outline-none focus:border-brand-green/50"
                  />
                </div>

                <div className="grid grid-cols-1 gap-2">
                  <div>
                    <label className="text-[10px] text-white/50 font-mono tracking-wider uppercase block mb-1">
                      Simulated Card Credentials
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) =>
                          setCardNumber(
                            e.target.value
                              .replace(/\s?/g, "")
                              .replace(/(\d{4})/g, "$1 ")
                              .trim(),
                          )
                        }
                        maxLength={19}
                        required
                        placeholder="4123 5678 9012 3456"
                        className="w-full bg-black/40 border border-white/15 rounded-lg p-3 pl-10 text-xs text-white placeholder-white/20 font-mono tracking-wider focus:outline-none focus:border-brand-green/50"
                      />
                      <CreditCard className="w-4 h-4 text-white/30 absolute left-3.5 top-3.5" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-white/50 font-mono tracking-wider uppercase block mb-1">
                      Exp Date
                    </label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      maxLength={5}
                      required
                      placeholder="MM/YY"
                      className="w-full bg-black/40 border border-white/15 rounded-lg p-3 text-xs text-white placeholder-white/20 font-mono tracking-wider text-center focus:outline-none focus:border-brand-green/50"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-white/50 font-mono tracking-wider uppercase block mb-1">
                      Secure CVV
                    </label>
                    <input
                      type="password"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      maxLength={3}
                      required
                      placeholder="***"
                      className="w-full bg-black/40 border border-white/15 rounded-lg p-3 text-xs text-white placeholder-white/20 font-mono tracking-wider text-center focus:outline-none focus:border-brand-green/50"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!cardNumber || !cardExpiry || !cardCvv}
                  className="w-full py-3 mt-2 bg-brand-green hover:bg-opacity-90 disabled:opacity-50 text-black font-semibold text-xs rounded-xl tracking-wider uppercase font-sans flex items-center justify-center gap-1.5 transition neon-glow cursor-pointer"
                >
                  Pay via Flutterwave Gateway <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

          {checkoutState === "processing" && (
            <div className="py-12 flex flex-col items-center justify-center space-y-4">
              <Loader className="w-10 h-10 text-brand-green animate-spin" />
              <div className="text-center">
                <h3 className="font-display font-medium text-sm text-white">
                  Transacting on Flutterwave node...
                </h3>
                <p className="text-[10px] text-white/50 font-mono mt-1">
                  Routing secure cryptographic card indexes...
                </p>
              </div>
            </div>
          )}

          {checkoutState === "otp" && (
            <form
              onSubmit={handleVerifyOtp}
              className="py-6 space-y-4 max-w-xs mx-auto text-center"
            >
              <div className="w-12 h-12 bg-brand-green/10 rounded-full flex items-center justify-center border border-brand-green/30 mx-auto mb-2">
                <ShieldAlert className="w-6 h-6 text-brand-green" />
              </div>
              <h3 className="font-display font-bold text-base text-white">
                Enter secure OTP code
              </h3>
              <p className="text-xs text-white/50">
                A test secure pin has been sent to your simulated card provider.
                Please enter any 4-digit code below.
              </p>

              <input
                type="text"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                maxLength={6}
                required
                placeholder="123456"
                className="w-full bg-black/40 border border-white/15 rounded-lg p-3 text-center text-sm font-bold font-mono tracking-widest text-white focus:outline-none focus:border-brand-green/50"
              />

              <button
                type="submit"
                className="w-full py-3 bg-brand-green text-black font-semibold text-xs rounded-xl tracking-wider uppercase font-sans transition neon-glow cursor-pointer"
              >
                Submit Code Verification
              </button>
            </form>
          )}

          {checkoutState === "success" && (
            <div className="py-10 text-center space-y-6">
              <div className="w-16 h-16 bg-brand-green/10 rounded-full flex items-center justify-center border border-brand-green/40 mx-auto animate-bounce">
                <CheckCircle2 className="w-10 h-10 text-brand-green" />
              </div>

              <div className="space-y-2">
                <h3 className="font-display font-bold text-lg text-white">
                  Tribby Upgrade Activated!
                </h3>
                <p className="text-xs text-white/70 leading-relaxed px-4">
                  Payment of{" "}
                  <span className="text-brand-green font-bold">
                    ${plans[tier].amountInUSD}
                  </span>{" "}
                  captured successfully via Flutterwave servers. Your premium
                  benefits and coin balances are loaded instantly.
                </p>
              </div>

              <div className="bg-white/5 border border-white/5 rounded-xl p-3.5 flex justify-around items-center max-w-xs mx-auto">
                <div className="text-center">
                  <span className="text-[9px] text-white/40 font-mono tracking-wider uppercase block">
                    Coins Awarded
                  </span>
                  <span className="text-sm font-bold text-brand-green flex items-center gap-1 justify-center mt-0.5">
                    +{tier === "gold" ? 500 : 1200}{" "}
                    <Coins className="w-3.5 h-3.5" />
                  </span>
                </div>
                <div className="h-6 w-[1px] bg-white/10" />
                <div className="text-center">
                  <span className="text-[9px] text-white/40 font-mono tracking-wider uppercase block">
                    Elite Badge
                  </span>
                  <span className="text-sm font-bold text-brand-purple flex items-center gap-1 justify-center mt-0.5">
                    Activated <Award className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 bg-white text-black font-bold text-xs rounded-xl hover:bg-neutral-200 transition tracking-wider uppercase font-sans"
              >
                Close Payment Gateway
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
