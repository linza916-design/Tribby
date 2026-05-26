import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, Music, Volume2, VolumeX, Zap, Sparkles } from "lucide-react";
import { Profile, MatchMode } from "../lib/types";

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
  card: "relative w-full max-w-[390px] h-[720px] rounded-[34px] overflow-hidden bg-[#0B0B12] border border-white/10 shadow-2xl flex flex-col justify-between",
  hero: "absolute inset-0",
  overlay:
    "absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent",
  header: "relative z-10 p-4 flex justify-between",
  glass: "bg-white/5 backdrop-blur-xl border border-white/10",
  tabs: "flex p-1 rounded-full",
  tab: "px-3 py-1 rounded-full text-[10px] uppercase",
  active: "bg-gradient-to-r from-fuchsia-500 to-rose-400 text-white",
  inactive: "text-white/60 hover:text-white",
  badge:
    "px-3 py-2 rounded-full text-xs flex items-center gap-2 text-amber-200",
  voiceWrap: "relative z-10 flex flex-col items-center pt-28",
  voiceBtn: "px-5 py-3 rounded-2xl text-white flex gap-3 items-center",
  drawer: "relative z-10 p-6 bg-gradient-to-t from-black via-black/90",
  title: "text-[28px] font-serif text-white",
  bio: "text-sm text-white/70 mt-2",
  tag: "px-3 py-1 rounded-full bg-white/5 text-xs text-white/70",
  actionBar: "flex justify-around pt-5",
  sideBtn:
    "w-12 h-12 rounded-full bg-white/5 text-white flex items-center justify-center",
  likeBtn:
    "w-16 h-16 rounded-full bg-gradient-to-br from-rose-400 to-fuchsia-500 text-white flex items-center justify-center",
  panel: "mt-4 p-4 rounded-2xl bg-white/5",
  input: "flex-1 px-3 py-2 rounded-xl bg-black/30 text-white outline-none",
  send: "px-4 rounded-xl bg-gradient-to-r from-fuchsia-500 to-rose-400 text-white",
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
  const [voice, setVoice] = useState(false);
  const [showMsg, setShowMsg] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    setVoice(false);
    setShowMsg(false);
    setMsg("");
  }, [profile.id]);

  return (
    <div className={ui.card}>
      <div className={ui.hero}>
        <motion.img
          key={profile.id}
          src={profile.imageUrl}
          className="w-full h-full object-cover"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
        />
        <div className={ui.overlay} />
      </div>

      <div className={ui.header}>
        <div className={`${ui.glass} ${ui.tabs}`}>
          {(["dating", "friendship", "networking"] as MatchMode[]).map((m) => (
            <button
              key={m}
              onClick={() => onMatchModeChange(m)}
              className={`${ui.tab} ${matchMode === m ? ui.active : ui.inactive}`}
            >
              {m}
            </button>
          ))}
        </div>
        <div className={`${ui.glass} ${ui.badge}`}>
          <Sparkles size={14} />
          {profile.compatibility}%
        </div>
      </div>

      <div className={ui.voiceWrap}>
        <button
          onClick={() => setVoice(!voice)}
          className={`${ui.glass} ${ui.voiceBtn}`}
        >
          {voice ? <Volume2 /> : <VolumeX />} Voice Intro
        </button>
      </div>

      <div className={ui.drawer}>
        <h2 className={ui.title}>
          {profile.moniker}, {profile.age}
        </h2>
        <p className={ui.bio}>{profile.bio}</p>

        <div className="flex gap-2 flex-wrap mt-3">
          {profile.tags.map((t, i) => (
            <span key={i} className={ui.tag}>
              #{t}
            </span>
          ))}
        </div>

        {profile.currentMusicName && (
          <div className={`${ui.panel} flex justify-between mt-4`}>
            <div className="flex gap-2 text-white">
              <Music size={16} />
              {profile.currentMusicName}
            </div>
            <span>{profile.mood}</span>
          </div>
        )}

        <div className={ui.actionBar}>
          <button onClick={onPass} className={ui.sideBtn}>
            <X />
          </button>
          <button onClick={onLike} className={ui.likeBtn}>
            <Heart fill="white" />
          </button>
          <button onClick={() => setShowMsg(!showMsg)} className={ui.sideBtn}>
            <Zap />
          </button>
        </div>

        <AnimatePresence>
          {showMsg && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={ui.panel}
            >
              <div className="flex gap-2">
                <input
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  className={ui.input}
                  placeholder="Send a vibe..."
                />
                <button className={ui.send} onClick={onLike}>
                  Send
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
