import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  X,
  Music,
  Check,
  Volume2,
  VolumeX,
  ShieldCheck,
  Zap,
  Radio,
  Sparkles,
  MessageCircle,
  MapPin,
} from "lucide-react";
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

export const SwipeCard: React.FC<SwipeCardProps> = ({
  profile,
  onLike,
  onPass,
  matchMode,
  onMatchModeChange,
  coinsCount,
  availableSuperLikes,
}) => {
  const [voicePlaying, setVoicePlaying] = useState(false);
  const [vibeSparkle, setVibeSparkle] = useState(false);
  const [customMsgInput, setCustomMsgInput] = useState("");
  const [showDirectSend, setShowDirectSend] = useState(false);

  // Restart voice equalizer animation when profile shifts
  useEffect(() => {
    setVoicePlaying(false);
    setShowDirectSend(false);
    setCustomMsgInput("");
  }, [profile.id]);

  const toggleVoice = () => {
    setVoicePlaying(!voicePlaying);
  };

  const handleInteractiveSparkRate = () => {
    setVibeSparkle(true);
    setTimeout(() => setVibeSparkle(false), 2000);
  };

  return (
    <div
      id={`profile-card-${profile.id}`}
      className="w-full max-w-sm h-[700px] bg-[#090909] rounded-2xl overflow-hidden relative border border-white/5 flex flex-col justify-between shadow-2xl glass-card select-none"
    >
      {/* Immersive Profile Hero Media Cover */}
      <div className="absolute inset-x-0 top-0 bottom-[14%] z-0 overflow-hidden bg-neutral-950">
        <motion.img
          key={profile.id}
          initial={{ scale: 1.05, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          src={profile.imageUrl}
          alt={profile.moniker}
          className="w-full h-full object-cover select-none"
        />

        {/* Dynamic Dark Gradient shading from bottom up & top down */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-neutral-900/10 to-black/50 pointer-events-none" />
      </div>

      {/* Floating Header Actions inside media */}
      <div className="relative z-10 p-4 flex items-center justify-between pointer-events-auto">
        {/* Alignment match mode toggles */}
        <div className="flex gap-1.5 bg-black/50 p-1 rounded-full border border-white/10 backdrop-blur-md">
          {(["dating", "friendship", "networking"] as MatchMode[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => onMatchModeChange(m)}
              className={`px-3 py-1 text-[9px] font-sans font-extrabold tracking-wider uppercase rounded-full transition cursor-pointer ${matchMode === m ? "bg-brand-green text-black font-semibold" : "text-white/60 hover:text-white"}`}
            >
              {m}
            </button>
          ))}
        </div>

        {/* Compatibility and verification badges */}
        <div className="flex items-center gap-1.5 bg-brand-green/10 text-brand-green border border-brand-green/20 px-2.5 py-1 rounded-full backdrop-blur-md font-mono text-[9px] font-bold">
          <Sparkles className="w-3.5 h-3.5 text-brand-green animate-pulse" />
          <span>{profile.compatibility}% Vibe Overlay</span>
        </div>
      </div>

      {/* Center Interactive: Direct Voice Intro element */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center pt-28 pointer-events-auto">
        <button
          onClick={toggleVoice}
          className="px-4 py-2.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md hover:border-brand-green/30 text-white/90 text-xs transition flex items-center gap-2.5 shadow-lg max-w-[200px] cursor-pointer"
        >
          {voicePlaying ? (
            <Volume2 className="w-4 h-4 text-brand-green animate-bounce" />
          ) : (
            <VolumeX className="w-4 h-4 text-white/60" />
          )}
          <div className="text-left font-sans">
            <span className="block font-bold text-[9px] uppercase tracking-widest text-[#9e9e9e]">
              Listen: Intro Clip
            </span>
            <span className="text-[10px] text-white font-mono uppercase tracking-tight">
              {voicePlaying ? "Streaming frequency..." : "Sync Voice Intro"}
            </span>
          </div>
        </button>

        {/* Voice Equalizer lines simulation */}
        {voicePlaying && (
          <div className="flex gap-1 mt-3.5 h-6 items-center">
            {[1, 2, 3, 4, 2, 1, 3, 4, 5, 2, 1, 3, 4].map((h, i) => (
              <motion.div
                key={i}
                animate={{ height: [8, h * 4, 8] }}
                transition={{
                  repeat: Infinity,
                  duration: 0.6 + i * 0.05,
                  ease: "easeInOut",
                }}
                className="w-[1.5px] bg-brand-green/80"
              />
            ))}
          </div>
        )}
      </div>

      {/* Bottom Profile info Drawer overlay */}
      <div className="relative z-10 p-5 pt-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/95 to-transparent pointer-events-auto">
        <div className="space-y-3 pb-2 text-left">
          <div className="flex items-center gap-2">
            <h2 className="font-display font-extrabold text-lg text-white tracking-wide">
              {profile.moniker}, {profile.age}
            </h2>
            {profile.isVerified && (
              <span
                className="material-symbols-outlined text-brand-green verified-icon text-base relative top-0.5"
                title="Trust Verified"
              >
                verified
              </span>
            )}
            <span className="text-[10px] text-white/50 bg-white/5 px-2 py-0.5 rounded-full border border-white/5 font-mono ml-auto">
              📍 {profile.nearbyDistance}
            </span>
          </div>

          <p className="text-xs text-white/70 leading-relaxed font-sans font-light">
            {profile.bio}
          </p>

          <div className="flex flex-wrap gap-1">
            {profile.tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-white/5 text-white/70 text-[9px] px-2.5 py-0.8 rounded-full border border-white/5 font-mono"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Relationship Goal descriptor */}
          <div className="flex items-center gap-1.5 text-[10px] text-white/40 border-t border-white/[0.04] pt-2 ml-0.5">
            <span className="material-symbols-outlined text-brand-purple text-xs select-none">
              orbit
            </span>
            <span>
              Relationship Target:{" "}
              <strong className="text-white/70 font-sans font-medium">
                {profile.relationshipGoals}
              </strong>
            </span>
          </div>

          {/* Current Music overlay info */}
          {profile.currentMusicName && (
            <div className="flex items-center justify-between bg-black/40 border border-white/5 rounded-xl p-2.5">
              <div className="flex items-center gap-2.5 min-w-0">
                <Music className="w-3.5 h-3.5 text-brand-green animate-pulse" />
                <div className="text-left truncate min-w-0">
                  <span className="block text-[8px] uppercase tracking-widest text-[#818181] font-mono leading-none">
                    Listening On Spotify
                  </span>
                  <span className="text-[10px] font-sans font-medium text-white truncate inline-block max-w-[150px]">
                    {profile.currentMusicName}
                  </span>
                </div>
              </div>
              <span className="text-[9px] text-[#00ff88]/80 font-mono bg-[#00ff88]/5 px-2 py-0.5 rounded uppercase font-semibold">
                {profile.mood}
              </span>
            </div>
          )}
        </div>

        {/* Action swipes triggers */}
        <div className="flex items-center justify-around pt-3 border-t border-white/5">
          <button
            onClick={onPass}
            className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-red-400 hover:bg-white/10 active:scale-95 transition cursor-pointer"
            title="Pass"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Spark pulse like button */}
          <button
            onClick={onLike}
            className="w-16 h-16 rounded-full bg-brand-green text-black flex items-center justify-center hover:bg-opacity-90 active:scale-90 transition neon-glow shadow-lg cursor-pointer select-none"
            title="Like & Connect"
          >
            <Heart className="w-7 h-7 fill-black" />
          </button>

          <button
            onClick={() => setShowDirectSend(!showDirectSend)}
            className={`w-12 h-12 rounded-full border flex items-center justify-center active:scale-95 transition cursor-pointer ${showDirectSend ? "bg-brand-purple text-black border-brand-purple" : "bg-white/5 text-white/60 border-white/10 hover:text-brand-purple hover:bg-white/10"}`}
            title="Super Like / Direct Message"
          >
            <Zap className={`w-5 h-5 ${showDirectSend ? "fill-black" : ""}`} />
          </button>
        </div>

        {/* Direct Icebreaker message box for Super Sweeps */}
        <AnimatePresence>
          {showDirectSend && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3.5 pt-3.5 border-t border-white/5 text-left"
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-[9.5px] font-mono tracking-wider uppercase text-brand-purple font-semibold">
                  Secure Direct Message
                </span>
                <span className="text-[9px] text-white/30 truncate font-mono">
                  Cost: 10 Tribby Coins
                </span>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={customMsgInput}
                  onChange={(e) => setCustomMsgInput(e.target.value)}
                  placeholder="Send a high-vibe pitch instantly..."
                  className="flex-1 bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-white/20 focus:outline-none focus:border-brand-purple/50"
                />
                <button
                  onClick={() => {
                    if (customMsgInput.trim()) {
                      onLike(); // Triggers match
                      setCustomMsgInput("");
                      setShowDirectSend(false);
                    }
                  }}
                  className="bg-brand-purple text-black px-3.5 rounded-lg text-xs font-bold leading-none cursor-pointer"
                >
                  Post
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
