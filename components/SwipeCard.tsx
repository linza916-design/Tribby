"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Heart,
  X,
  Music,
  Volume2,
  VolumeX,
  Zap,
  Sparkles,
  Coins,
  Flame,
  Send,
} from "lucide-react";

import type { Profile, MatchMode } from "../lib/types";

interface SwipeCardProps {
  profile: Profile;
  onLike: () => void;
  onPass: () => void;
  matchMode: MatchMode;
  onMatchModeChange: (mode: MatchMode) => void;
  coinsCount: number;
  availableSuperLikes: number;
}

const ui = {
  card: `
    relative
    w-full
    max-w-[420px]
    min-h-[720px]
    overflow-hidden
    rounded-[34px]
    border
    border-white/10
    bg-[#0B0B12]
    shadow-2xl
    flex
    flex-col
    justify-between
    isolate
  `,

  hero: "absolute inset-0",

  overlay: `
    absolute
    inset-0
    bg-gradient-to-t
    from-black
    via-black/50
    to-black/10
  `,

  header: `
    relative
    z-20
    flex
    items-start
    justify-between
    gap-3
    p-4
  `,

  glass: `
    border
    border-white/10
    bg-white/10
    backdrop-blur-xl
  `,

  tabs: `
    flex
    flex-wrap
    gap-1
    rounded-full
    p-1
  `,

  tab: `
    min-h-[40px]
    rounded-full
    px-3
    py-2
    text-[11px]
    font-semibold
    uppercase
    tracking-wide
    transition-all
    focus:outline-none
    focus-visible:ring-4
    focus-visible:ring-fuchsia-400/40
  `,

  active: `
    bg-gradient-to-r
    from-fuchsia-500
    to-rose-400
    text-white
  `,

  inactive: `
    text-white/70
    hover:text-white
    hover:bg-white/10
  `,

  badge: `
    flex
    items-center
    gap-2
    rounded-full
    px-3
    py-2
    text-xs
    text-amber-200
  `,

  voiceWrap: `
    relative
    z-20
    flex
    flex-col
    items-center
    pt-28
    px-4
  `,

  voiceBtn: `
    flex
    min-h-[48px]
    items-center
    gap-3
    rounded-2xl
    px-5
    py-3
    text-sm
    font-medium
    text-white
    transition-all
    focus:outline-none
    focus-visible:ring-4
    focus-visible:ring-white/30
  `,

  drawer: `
    relative
    z-20
    rounded-t-[34px]
    bg-gradient-to-t
    from-black
    via-black/95
    to-black/70
    p-6
    backdrop-blur-2xl
  `,

  title: `
    text-[30px]
    font-semibold
    tracking-tight
    text-white
  `,

  bio: `
    mt-2
    text-sm
    leading-relaxed
    text-zinc-300
  `,

  tag: `
    rounded-full
    bg-white/10
    px-3
    py-1.5
    text-xs
    text-zinc-200
    border
    border-white/10
  `,

  actionBar: `
    flex
    items-center
    justify-center
    gap-4
    pt-6
  `,

  sideBtn: `
    flex
    h-14
    w-14
    items-center
    justify-center
    rounded-full
    border
    border-white/10
    bg-white/10
    text-white
    transition-all
    hover:bg-white/20
    focus:outline-none
    focus-visible:ring-4
    focus-visible:ring-white/30
  `,

  passBtn: `
    hover:border-red-400/40
  `,

  likeBtn: `
    flex
    h-16
    w-16
    items-center
    justify-center
    rounded-full
    bg-gradient-to-br
    from-rose-400
    to-fuchsia-500
    text-white
    shadow-xl
    shadow-fuchsia-500/30
    transition-all
    hover:scale-105
    focus:outline-none
    focus-visible:ring-4
    focus-visible:ring-fuchsia-400/40
  `,

  zapBtn: `
    hover:border-yellow-400/40
  `,

  panel: `
    mt-5
    rounded-2xl
    border
    border-white/10
    bg-white/5
    p-4
    backdrop-blur-xl
  `,

  input: `
    flex-1
    rounded-xl
    border
    border-white/10
    bg-black/40
    px-4
    py-3
    text-sm
    text-white
    outline-none
    placeholder:text-white/40
    focus-visible:ring-4
    focus-visible:ring-fuchsia-400/30
  `,

  send: `
    flex
    min-h-[48px]
    items-center
    justify-center
    gap-2
    rounded-xl
    bg-gradient-to-r
    from-fuchsia-500
    to-rose-400
    px-4
    py-3
    text-sm
    font-medium
    text-white
    transition-all
    hover:opacity-90
    focus:outline-none
    focus-visible:ring-4
    focus-visible:ring-fuchsia-400/40
  `,
};

export const SwipeCard: React.FC<SwipeCardProps> = ({
  profile,
  onLike,
  onPass,
  matchMode,
  coinsCount,
  availableSuperLikes,
  onMatchModeChange,
}) => {
  const shouldReduceMotion = useReducedMotion();

  const [voice, setVoice] = useState(false);
  const [showMsg, setShowMsg] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    setVoice(false);
    setShowMsg(false);
    setMsg("");
  }, [profile.id]);

  return (
    <article
      aria-label={`Profile card for ${profile.moniker}`}
      className={ui.card}
    >
      {/* Background Image */}
      <div className={ui.hero}>
        <motion.div
          key={profile.id}
          initial={shouldReduceMotion ? false : { scale: 1.05, opacity: 0.85 }}
          animate={shouldReduceMotion ? {} : { scale: 1, opacity: 1 }}
          transition={{ duration: 0.45 }}
          className="relative h-full w-full"
        >
          <Image
            src={profile.imageUrl}
            alt={`${profile.moniker} profile picture`}
            fill
            priority
            className="object-cover"
          />
        </motion.div>

        <div className={ui.overlay} />
      </div>

      {/* Header */}
      <header className={ui.header}>
        {/* Match Modes */}
        <div
          role="tablist"
          aria-label="Match modes"
          className={`${ui.glass} ${ui.tabs}`}
        >
          {(["dating", "friendship", "networking"] as MatchMode[]).map((m) => {
            const active = matchMode === m;

            return (
              <button
                key={m}
                role="tab"
                type="button"
                aria-selected={active}
                onClick={() => onMatchModeChange(m)}
                className={`${ui.tab} ${active ? ui.active : ui.inactive}`}
              >
                {m}
              </button>
            );
          })}
        </div>

        {/* Compatibility */}
        <div
          className={`${ui.glass} ${ui.badge}`}
          aria-label={`${profile.compatibility}% compatibility`}
        >
          <Sparkles size={14} />
          <span>{profile.compatibility}%</span>
        </div>
      </header>

      {/* Floating top stats */}
      <div className="absolute right-4 top-24 z-20 space-y-3">
        <div
          className={`${ui.glass} flex items-center gap-2 rounded-full px-3 py-2 text-xs text-yellow-200`}
        >
          <Coins className="h-4 w-4" />
          {coinsCount}
        </div>

        <div
          className={`${ui.glass} flex items-center gap-2 rounded-full px-3 py-2 text-xs text-pink-200`}
        >
          <Flame className="h-4 w-4" />
          {availableSuperLikes}
        </div>
      </div>

      {/* Voice Intro */}
      <div className={ui.voiceWrap}>
        <button
          type="button"
          aria-pressed={voice}
          aria-label={voice ? "Disable voice intro" : "Enable voice intro"}
          onClick={() => setVoice(!voice)}
          className={`${ui.glass} ${ui.voiceBtn}`}
        >
          {voice ? (
            <Volume2 className="h-5 w-5 text-green-400" />
          ) : (
            <VolumeX className="h-5 w-5 text-zinc-300" />
          )}

          <span>{voice ? "Voice Intro Playing" : "Play Voice Intro"}</span>
        </button>
      </div>

      {/* Bottom Content */}
      <div className={ui.drawer}>
        {/* Name */}
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className={ui.title}>
              {profile.moniker}, {profile.age}
            </h2>

            <p className="mt-1 text-sm text-zinc-400">
              {profile.location || "Nearby"}
            </p>
          </div>

          <div
            className="
              rounded-full
              border
              border-emerald-400/20
              bg-emerald-400/10
              px-3
              py-1.5
              text-xs
              font-medium
              text-emerald-300
            "
          >
            Online
          </div>
        </div>

        {/* Bio */}
        <p className={ui.bio}>{profile.bio}</p>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {profile.tags.map((t, i) => (
            <span key={i} className={ui.tag}>
              #{t}
            </span>
          ))}
        </div>

        {/* Music */}
        {profile.currentMusicName && (
          <div
            className={`${ui.panel} mt-5 flex items-center justify-between gap-3`}
          >
            <div className="flex items-center gap-3 text-white">
              <Music className="h-4 w-4 text-pink-400" />

              <div>
                <p className="text-sm font-medium">
                  {profile.currentMusicName}
                </p>

                <p className="text-xs text-zinc-400">Current vibe</p>
              </div>
            </div>

            <span
              className="
                rounded-full
                bg-white/10
                px-3
                py-1
                text-xs
                text-zinc-200
              "
            >
              {profile.mood}
            </span>
          </div>
        )}

        {/* Actions */}
        <div className={ui.actionBar}>
          {/* Pass */}
          <button
            type="button"
            aria-label={`Pass on ${profile.moniker}`}
            onClick={onPass}
            className={`${ui.sideBtn} ${ui.passBtn}`}
          >
            <X className="h-6 w-6" />
          </button>

          {/* Like */}
          <button
            type="button"
            aria-label={`Like ${profile.moniker}`}
            onClick={onLike}
            className={ui.likeBtn}
          >
            <Heart className="h-7 w-7" fill="white" />
          </button>

          {/* Message */}
          <button
            type="button"
            aria-expanded={showMsg}
            aria-label={showMsg ? "Close message panel" : "Open message panel"}
            onClick={() => setShowMsg(!showMsg)}
            className={`${ui.sideBtn} ${ui.zapBtn}`}
          >
            <Zap className="h-6 w-6" />
          </button>
        </div>

        {/* Message Panel */}
        <AnimatePresence>
          {showMsg && (
            <motion.div
              initial={
                shouldReduceMotion
                  ? false
                  : {
                      opacity: 0,
                      height: 0,
                    }
              }
              animate={{
                opacity: 1,
                height: "auto",
              }}
              exit={{
                opacity: 0,
                height: 0,
              }}
              transition={{ duration: 0.25 }}
              className={ui.panel}
            >
              <label htmlFor="swipe-message" className="sr-only">
                Send a message
              </label>

              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  id="swipe-message"
                  type="text"
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  className={ui.input}
                  placeholder="Send a vibe..."
                />

                <button type="button" className={ui.send} onClick={onLike}>
                  <Send className="h-4 w-4" />
                  Send
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </article>
  );
};

export default SwipeCard;
