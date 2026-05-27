import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  HelpCircle,
  MapPin,
  Radio,
  HeartHandshake,
  Bot,
  ChevronRight,
  Zap,
} from "lucide-react";
import { Profile } from "../lib/types";
import { MOCK_PROFILES } from "../lib/data";

interface GeminiMatchmakerProps {
  onSelectProfile: (profile: Profile) => void;
  matchMode: "dating" | "friendship" | "networking";
}

interface MatchReport {
  matchedProfile: Profile;
  affinityScore: number;
  reasoning: string;
  suggestedIcebreaker: string;
}

export const GeminiMatchmaker: React.FC<GeminiMatchmakerProps> = ({
  onSelectProfile,
  matchMode,
}) => {
  const [query, setQuery] = useState("");
  const [finding, setFinding] = useState(false);
  const [result, setResult] = useState<MatchReport | null>(null);

  const presets = [
    "A techno adventurer to crawl underground Berlin warehouses with tonight.",
    "Someone intellectual into simulation theories, transhumanism, and modular synthesizers.",
    "A spontaneous visual artist who loves cyber-botany and raw concrete brutalist aesthetics.",
  ];

  const handleSearch = (vibeText: string) => {
    setQuery(vibeText);
    setFinding(true);
    setResult(null);

    // Simulate server side embedding computations and response
    setTimeout(() => {
      const lowerQuery = vibeText.toLowerCase();
      let bestProfile = MOCK_PROFILES[0];
      let maxScore = 0;

      // Simple scoring model to align tags, bios and hangouts
      MOCK_PROFILES.forEach((p) => {
        let score = 50; // base compatibility
        p.tags.forEach((t) => {
          if (lowerQuery.includes(t.toLowerCase())) score += 15;
        });
        p.favoriteHangouts.forEach((h) => {
          if (lowerQuery.includes(h.toLowerCase())) score += 10;
        });
        if (lowerQuery.includes(p.location.toLowerCase())) score += 20;
        if (lowerQuery.includes("techno") && p.tags.includes("Techno"))
          score += 25;
        if (lowerQuery.includes("philosoph") && p.tags.includes("Philosophy"))
          score += 25;
        if (lowerQuery.includes("art") && p.tags.includes("Art Galleries"))
          score += 25;

        // Add compatibility bias from standard profiles to keep high-vibe authenticity
        score += p.compatibility - 90;

        if (score > maxScore) {
          maxScore = score;
          bestProfile = p;
        }
      });

      // Clamp score
      const finalScore = Math.min(99, Math.max(82, maxScore));

      let reasoning = "";
      let suggestedIcebreaker = "";

      if (bestProfile.id === "aria_vance_24") {
        reasoning =
          "Gemini neural indexing detected a 98% overlap in sonic resonance and nightlife. Aria Vance thrives in underground locations like Tresor and lists matching strobe-adrenaline triggers in her bio profile. She matches your exact timing and location logs.";
        suggestedIcebreaker =
          "“I think Trek-Node is host of a modular synth-loop set tonight. Interested in trading frequencies?”";
      } else if (bestProfile.id === "julian_thorne_27") {
        reasoning =
          "Julian Thorne scores incredibly high on brutalist aesthetics and philosophy tags. His deep interest in vintage analog modular hardware is aligned with your query on modular synthesizers and simulation systems.";
        suggestedIcebreaker =
          "“Spotted your vintage synthesizers tag! Have you patched into the new experimental acoustics node yet?”";
      } else if (bestProfile.id === "kira_moon_22") {
        reasoning =
          "Kira's cyber-botany aesthetic coordinates align with bioluminescent flora query points. She explores neo-tribal trends and organic hardware overlaps in Shibuya, creating an elite visual matching curve.";
        suggestedIcebreaker =
          "“Your bio on organic tech and cyber-gardening is wild. Have you captured any glowing flora lately?”";
      } else if (bestProfile.id === "elias_thorne_29") {
        reasoning =
          "Elias Thorne scores highly for deep physics minimal theories. He focuses heavily on non-linear spatial audio systems, creating elite compatibility circles for neural-sound inquiry.";
        suggestedIcebreaker =
          "“Curious what sub-bass parameters you're currently configuring. Ready to sync on local quantum nodes?”";
      } else {
        reasoning =
          "Maya shares a profound alignment with digital interactive galleries and algorithmic techno spaces. Her geographic location indices list an absolute match for urban visual exposure.";
        suggestedIcebreaker =
          "“I was just looking at digital light-space architectures. Which gallery is your current baseline reference?”";
      }

      setResult({
        matchedProfile: bestProfile,
        affinityScore: finalScore,
        reasoning,
        suggestedIcebreaker,
      });
      setFinding(false);
    }, 1200);
  };

  return (
    <div
      id="gemini-matchmaker-root"
      className="w-full bg-surface-container border border-white/5 rounded-2xl p-6 glass-card relative overflow-hidden"
    >
      {/* Glow Effects */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-purple/10 rounded-full filter blur-2xl pointer-events-none" />

      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-brand-purple/10 flex items-center justify-center border border-brand-purple/30">
          <Sparkles className="w-5 h-5 text-brand-purple text-glow-purple" />
        </div>
        <div>
          <h2 className="font-display font-medium text-base text-white flex items-center gap-1.5">
            Gemini Matchmaker Engine{" "}
            <span className="text-[10px] bg-brand-purple/20 text-brand-purple px-1.5 py-0.5 rounded uppercase font-semibold">
              Pro
            </span>
          </h2>
          <p className="text-[11px] text-white/50">
            Semantic preference matchmaking on vibes, not only swipe profiles
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="E.g., Find me an underground techno fan to explore secret warehouses with, who is into synthesizers..."
            className="w-full h-24 bg-black/40 border border-white/10 rounded-xl p-4 text-xs text-white/90 placeholder-white/30 focus:outline-none focus:border-brand-purple/50 custom-scrollbar resize-none"
          />
          <div className="absolute bottom-2.5 right-2 text-[9px] font-mono text-white/20 select-none">
            Gemini-3.5-Flash Active
          </div>
        </div>

        {/* Presets Grid */}
        <div className="space-y-1.5">
          <span className="text-[10px] text-white/40 font-semibold tracking-wide uppercase font-mono">
            Suggested Prompts
          </span>
          <div className="grid grid-cols-1 gap-1.5">
            {presets.map((p, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSearch(p)}
                className="text-left py-2 px-3 rounded-lg bg-white/5 border border-white/5 hover:border-brand-purple/20 text-[10px] text-white/70 hover:text-white transition truncate cursor-pointer hover:bg-white/10"
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => query && handleSearch(query)}
          disabled={!query || finding}
          className="w-full py-3 bg-brand-purple hover:bg-opacity-90 disabled:opacity-50 text-black font-semibold text-xs rounded-xl tracking-wider uppercase font-sans flex items-center justify-center gap-2 transition"
        >
          {finding ? (
            <>
              <Radio className="w-4 h-4 animate-pulse duration-1000" />{" "}
              Synthesizing Embedding Maps...
            </>
          ) : (
            <>
              <Zap className="w-4 h-4 fill-black" /> Run High-Vibe Evaluation
            </>
          )}
        </button>

        {/* AI Result Cards */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mt-6 border-t border-white/10 pt-5 space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[11px] font-mono font-semibold uppercase tracking-wider text-brand-purple">
                  <Bot className="w-4 h-4" /> AI Affinity Match
                </div>
                <div className="px-2.5 py-0.5 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-purple text-xs font-mono font-bold">
                  {result.affinityScore}% Compatibility Match
                </div>
              </div>

              {/* Profile card preview */}
              <div
                onClick={() => onSelectProfile(result.matchedProfile)}
                className="p-3 bg-black/30 border border-white/5 hover:border-brand-purple/30 rounded-xl flex items-center gap-3 transition cursor-pointer hover:bg-black/50"
              >
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/10 flex-shrink-0 bg-neutral-900">
                  <img
                    referrerPolicy="no-referrer"
                    src={result.matchedProfile.imageUrl}
                    alt={result.matchedProfile.moniker}
                    className="w-full h-full object-cover"
                  />
                  {result.matchedProfile.isVerified && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-brand-green text-black rounded-full flex items-center justify-center border-2 border-brand-dark">
                      <span className="material-symbols-outlined text-[10px] font-bold">
                        check
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-display font-bold text-xs text-white truncate">
                      {result.matchedProfile.moniker},{" "}
                      {result.matchedProfile.age}
                    </h4>
                    <span className="text-[9px] text-white/40">
                      {result.matchedProfile.nearbyDistance} away
                    </span>
                  </div>
                  <div className="flex gap-1 flex-wrap mt-1">
                    {result.matchedProfile.tags.slice(0, 3).map((t, idx) => (
                      <span
                        key={idx}
                        className="bg-white/5 text-white/60 text-[8px] px-1.5 py-0.5 rounded font-mono"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                <ChevronRight className="w-4 h-4 text-white/30" />
              </div>

              {/* AI Reasoning Insight */}
              <div className="bg-brand-purple/5 border border-brand-purple/10 rounded-xl p-3.5 space-y-2">
                <span className="text-[10px] font-mono text-brand-purple font-semibold tracking-wider uppercase block">
                  Synthesis Log
                </span>
                <p className="text-[11px] text-white/70 leading-relaxed text-left">
                  {result.reasoning}
                </p>
              </div>

              {/* Suggested Icebreaker */}
              <div className="space-y-1 text-left">
                <span className="text-[10px] font-mono text-white/40 tracking-wider uppercase block ml-1">
                  Suggested Gemini Icebreaker
                </span>
                <div className="bg-black/40 border border-white/5 rounded-xl p-3 text-xs italic text-brand-purple/90 border-l-2 border-l-brand-purple">
                  {result.suggestedIcebreaker}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
