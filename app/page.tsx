"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ShieldCheck,
  Coins,
  Flame,
  Heart,
  MessageSquare,
  MapPin,
  Plus,
  UserCheck,
  Calendar,
  Radio,
  Share2,
  Award,
  Tv,
  Cpu,
  Compass,
  Bell,
  ArrowRight,
  CornerDownRight,
} from "lucide-react";

import { Profile, MatchMode } from "../lib/types";
import {
  MOCK_PROFILES,
  INITIAL_USER_PROFILE,
  MOCK_NOTIFICATIONS,
} from "../lib/data";
import { SwipeCard } from "../components/SwipeCard";
import { BiometricsScanner } from "../components/BiometricsScanner";
import { GeminiMatchmaker } from "../components/GeminiMatchmaker";
import { FlutterwaveCheckout } from "../components/FlutterwaveCheckout";
import { StoriesView } from "../components/StoriesView";
import { ChatView } from "../components/ChatView";
import { MeetupsView } from "../components/MeetupsView";

const TRAFFIC_ALERTS = [
  {
    senderName: "Kai",
    msg: "curated a new digital vinyl deck",
    extra: "Axiom",
  },
  {
    senderName: "Sora Node",
    msg: "joined Underground Techno Tribe",
    extra: "Neon",
  },
  {
    senderName: "Valerie",
    msg: "sent a public frequency wave nearby",
    extra: "0.4km",
  },
  {
    senderName: "System Central",
    msg: "activated a matching route corridor",
    extra: "Overclock",
  },
  {
    senderName: "Zara Tech",
    msg: "posted an ambient focus track vibe",
    extra: "Berlin",
  },
  {
    senderName: "Tribe Bot",
    msg: "synchronized peer grid database logs",
    extra: "Core",
  },
];

export default function Home() {
  // Navigation & Core States
  const [activeTab, setActiveTab] = useState<
    "swipe" | "explore" | "chats" | "matchmaker" | "verification"
  >("swipe");
  const [currentProfileIdx, setCurrentProfileIdx] = useState(0);
  const [matchMode, setMatchMode] = useState<MatchMode>("dating");
  const [userProfile, setUserProfile] = useState<Profile>(INITIAL_USER_PROFILE);
  const [coinsCount, setCoinsCount] = useState(120);
  const [streakCount, setStreakCount] = useState(5);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [userTribeKeys, setUserTribeKeys] = useState<string[]>([
    "Underground Techno",
  ]);
  const [activeChatId, setActiveChatId] = useState<string>("aria_vance_24");

  // Interactive Stories Overlay state
  const [isStoriesOpen, setIsStoriesOpen] = useState(false);

  // Match Success Overlay states
  const [recentMatchedProfile, setRecentMatchedProfile] =
    useState<Profile | null>(null);

  // Notifications drawer state
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [showNotificationDrawer, setShowNotificationDrawer] = useState(false);

  // Traffic overdrive parameters
  const [trafficMode, setTrafficMode] = useState<
    "normal" | "heavy" | "overclocked"
  >("normal");
  const [activePeers, setActivePeers] = useState(18420);

  // Realtime Traffic Simulation Engine based on user-selected intensity
  useEffect(() => {
    let tickSpeed = 2200;
    if (trafficMode === "heavy") tickSpeed = 950;
    if (trafficMode === "overclocked") tickSpeed = 330;

    const interval = setInterval(() => {
      setActivePeers((prev) => {
        let increment = Math.floor(Math.random() * 3) + 1;
        if (trafficMode === "heavy")
          increment = Math.floor(Math.random() * 11) + 4;
        if (trafficMode === "overclocked")
          increment = Math.floor(Math.random() * 88) + 33;
        return prev + increment;
      });

      // Spawn live activity notifications as proof of high traffic density
      const spawnChance =
        trafficMode === "normal" ? 0.05 : trafficMode === "heavy" ? 0.2 : 0.42;
      if (Math.random() < spawnChance) {
        const randomIndex = Math.floor(Math.random() * TRAFFIC_ALERTS.length);
        const alert = TRAFFIC_ALERTS[randomIndex];
        const newNotif = {
          id: `notif_sim_${Date.now()}_${Math.random()}`,
          type: "like",
          userMoniker: alert.senderName,
          message: alert.msg,
          partnerAvatar:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBC84CWhJwBA_oOPwR1qbM654ItFm6orh9CFizyKu2d8lvVLBCQmC9M7gu0RhXuoNTQDJpF24hN_dgbCzbUd8bMgaKDexnxR2TKh_WcZ8MsWPd3CY4461FQhBEM0fYJZlbnSLu8ARmmwXTdwekDgHzPRsrsKe5Go6PWpaoRcd6dFUUoS22giiqyr9uJFx0T8RhX6BvzuCAQmu-xJSB_GpJziuv_esyp3DmGTaBFkD4Qn9Pb8DtoLGKYAUTZLd7teug6ybgwHbPnz6U",
          time: "Just now",
          extra: alert.extra,
        };
        // Cap notifications array at 10 items to prevent infinite memory array growth
        setNotifications((prev) => [newNotif, ...prev.slice(0, 9)]);
      }
    }, tickSpeed);

    return () => clearInterval(interval);
  }, [trafficMode]);

  // Feed filtration based on active matchMode
  const filteredProfiles = MOCK_PROFILES.filter(
    (p) => p.matchMode === matchMode,
  );
  const activeProfile = filteredProfiles[currentProfileIdx];

  // Increment current index on swiping
  const handleLike = () => {
    if (!activeProfile) return;

    // Simulate match algorithm triggers
    if (activeProfile.compatibility >= 94) {
      setRecentMatchedProfile(activeProfile);
    } else {
      handleNextProfile();
    }
  };

  const handlePass = () => {
    handleNextProfile();
  };

  const handleNextProfile = () => {
    setCurrentProfileIdx((prev) => prev + 1);
  };

  const handleCloseMatchOverlay = () => {
    setRecentMatchedProfile(null);
    handleNextProfile();
  };

  const handleStartMatchChat = () => {
    if (recentMatchedProfile) {
      setActiveChatId(recentMatchedProfile.id);
      setRecentMatchedProfile(null);
      setActiveTab("chats");
    }
  };

  const handleVerifySuccess = () => {
    setUserProfile((prev) => ({ ...prev, isVerified: true }));
    setCoinsCount((v) => v + 50); // reward coins
  };

  const handleUpgradeCompleted = (coinsAwarded: number) => {
    setCoinsCount((v) => v + coinsAwarded);
    setUserProfile((prev) => ({ ...prev, isVerified: true }));
  };

  const handleTribeJoinToggle = (tribeName: string) => {
    setUserTribeKeys((prev) => {
      if (prev.includes(tribeName)) {
        return prev.filter((t) => t !== tribeName);
      } else {
        setCoinsCount((c) => c + 15); // Reward coins on joining a tribe community!
        return [...prev, tribeName];
      }
    });
  };

  const handleSelectMatchedProfileFromAI = (profile: Profile) => {
    // Inject custom selected profile into swipe interface
    const existingIdx = filteredProfiles.findIndex((p) => p.id === profile.id);
    if (existingIdx !== -1) {
      setCurrentProfileIdx(existingIdx);
      setActiveTab("swipe");
    }
  };

  return (
    <div
      id="tribby-app-root"
      className="min-h-screen bg-[#080808] text-[#e5e2e1] flex flex-col items-center justify-between font-sans overflow-x-hidden relative select-none mesh-gradient pb-20 md:pb-6"
    >
      {/* Background Atmosphere Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#121212] via-[#080808] to-[#1a1005] opacity-60 pointer-events-none z-0" />

      {/* Exquisite Top Atmospheric Navigation Header */}
      <header className="w-full max-w-7xl mx-auto px-4 py-4 flex items-center justify-between border-b border-white/5 relative z-30 bg-black/40 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-[#FF5C00] to-[#FF005C] rounded-xl flex items-center justify-center font-black text-xl tracking-tighter text-white shadow-[0_0_20px_rgba(255,92,0,0.3)] transform hover:scale-105 transition">
            T
          </div>
          <div className="text-left select-none">
            <h1 className="font-display font-black text-2xl tracking-tight text-white flex items-center gap-1.5 leading-none">
              Tribby
              <span className="text-[10px] text-brand-purple font-mono uppercase font-bold tracking-widest relative top-0.5">
                PRO
              </span>
            </h1>
            <span className="text-[9px] text-white/40 block tracking-tight font-mono">
              Social Algorithm Framework
            </span>
          </div>
        </div>

        {/* Global Gamification, Coins meter, and Account parameters */}
        <div id="quick-metrics-hub" className="flex items-center gap-3">
          {/* Physical Location Beacon Badge */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-white/80 font-mono text-[10.5px]">
              Kampala, UG
            </span>
          </div>

          {/* Real-time Traffic Overload Indicator */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10.5px] font-mono">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                trafficMode === "normal"
                  ? "bg-emerald-400 animate-pulse"
                  : trafficMode === "heavy"
                    ? "bg-yellow-400 animate-pulse"
                    : "bg-rose-500 animate-ping"
              }`}
            ></span>
            <span className="text-white/40">Density:</span>
            <span
              className={`font-bold uppercase tracking-tight ${
                trafficMode === "normal"
                  ? "text-emerald-400"
                  : trafficMode === "heavy"
                    ? "text-yellow-400 font-bold"
                    : "text-rose-400 font-black animate-pulse"
              }`}
            >
              {trafficMode === "normal" && "Stable (1.0x)"}
              {trafficMode === "heavy" && "Peak (2.5x)"}
              {trafficMode === "overclocked" && "OVERFLOW (10x+)"}
            </span>
          </div>

          {/* Stories reels launch button */}
          <button
            onClick={() => setIsStoriesOpen(true)}
            className="flex items-center gap-1.5 bg-brand-green/10 hover:bg-brand-green/20 text-brand-green px-3 py-1.5 rounded-xl border border-brand-green/20 text-xs font-semibold cursor-pointer transition select-none"
          >
            <Tv className="w-3.5 h-3.5" />
            <span className="hidden sm:inline font-sans">Vibe Stories</span>
          </button>

          {/* Daily Streak Indicator */}
          <div className="flex items-center gap-1 bg-[#ff5e00]/10 border border-[#ff5e00]/20 px-2.5 py-1.5 rounded-xl text-[#ff5e00] text-xs font-bold animate-pulse-subtle">
            <Flame className="w-4 h-4 fill-[#ff5e00]" />
            <span className="font-mono">{streakCount}D</span>
          </div>

          {/* Coin economy metrics widget */}
          <button
            onClick={() => setIsCheckoutOpen(true)}
            className="flex items-center gap-1.5 bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/20 px-3 py-1.5 rounded-xl text-yellow-500 text-xs font-bold transition cursor-pointer"
          >
            <Coins className="w-4 h-4" />
            <span className="font-mono">{coinsCount} 🪙</span>
          </button>

          {/* User Verification / Account preview summary */}
          <button
            onClick={() => setActiveTab("verification")}
            className="flex items-center gap-1.5 bg-white/5 border border-white/10 p-0.5 rounded-full hover:border-[#FF5C00]/60 transition select-none cursor-pointer"
          >
            <div className="w-7 h-7 rounded-full border border-brand-green/45 p-0.5 overflow-hidden flex items-center justify-center bg-neutral-900">
              <img
                referrerPolicy="no-referrer"
                src={userProfile.imageUrl}
                alt={userProfile.moniker}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            {userProfile.isVerified && (
              <span className="material-symbols-outlined text-brand-green text-xs font-bold leading-none select-none pr-1">
                verified
              </span>
            )}
          </button>

          {/* Notification Inbox Icon */}
          <div className="relative">
            <button
              onClick={() => setShowNotificationDrawer(!showNotificationDrawer)}
              className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/70 relative cursor-pointer"
            >
              <Bell className="w-4 h-4" />
              {notifications.length > 0 && (
                <div className="absolute top-1 right-1 w-2 h-2 bg-brand-green rounded-full" />
              )}
            </button>

            {/* In-app Instant Notifications drop list */}
            <AnimatePresence>
              {showNotificationDrawer && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2.5 w-72 bg-surface-container border border-white/10 rounded-2xl p-4 shadow-2xl z-50 text-left glass-panel"
                >
                  <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#939393]">
                      Secure Signal Log
                    </span>
                    <button
                      onClick={() => setNotifications([])}
                      className="text-[9px] text-[#ff6161] font-mono tracking-wider cursor-pointer"
                    >
                      CLEAR ALL
                    </button>
                  </div>
                  <div className="space-y-3 max-h-60 overflow-y-auto custom-scrollbar">
                    {notifications.length === 0 ? (
                      <span className="text-[10px] text-white/30 block py-6 text-center">
                        Diagnostics empty. Match signals clear.
                      </span>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n.id}
                          className="flex gap-2.5 items-center bg-black/30 p-2 rounded-xl border border-white/5"
                        >
                          <img
                            referrerPolicy="no-referrer"
                            src={n.partnerAvatar}
                            alt={n.userMoniker}
                            className="w-8 h-8 rounded-full object-cover border border-white/10"
                          />
                          <div className="flex-1 min-w-0">
                            <span className="block text-[10px] font-bold text-white leading-none">
                              {n.userMoniker}
                            </span>
                            <span className="text-[9px] text-white/50 block truncate mt-0.5">
                              {n.message}
                            </span>
                          </div>
                          <span className="text-[8px] font-mono text-brand-green italic bg-brand-green/5 px-1 py-0.2 rounded shrink-0">
                            {n.extra}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* Main Framework Body: Desktop multi-column grid & mobile single focus */}
      <main className="w-full max-w-7xl mx-auto px-4 py-6 flex-1 flex flex-col lg:flex-row gap-6 items-start justify-center relative z-20">
        {/* Left Side: Desktop navigation side panel (hidden on smaller screen sizes) */}
        <section
          id="desktop-side-nav"
          className="hidden lg:flex flex-col gap-2.5 w-64 bg-surface-container border border-white/5 p-4 rounded-2xl glass-card text-left"
        >
          <span className="text-[10.5px] font-mono tracking-widest text-white/30 uppercase pl-2 select-none">
            System Submodules
          </span>

          <button
            onClick={() => setActiveTab("swipe")}
            className={`px-4 py-3 rounded-xl text-xs font-semibold flex items-center justify-between transition cursor-pointer ${activeTab === "swipe" ? "bg-brand-green text-black font-extrabold shadow-md" : "text-white/70 hover:bg-white/5"}`}
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-base">radar</span>
              <span>Radar Swipe Feed</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 opacity-40 shrink-0" />
          </button>

          <button
            onClick={() => setActiveTab("matchmaker")}
            className={`px-4 py-3 rounded-xl text-xs font-semibold flex items-center justify-between transition cursor-pointer ${activeTab === "matchmaker" ? "bg-brand-purple text-black font-extrabold shadow-md" : "text-white/70 hover:bg-white/5"}`}
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-base text-glow-purple">
                magic_exchange
              </span>
              <span>Gemini Matchmaker</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 opacity-40 shrink-0" />
          </button>

          <button
            onClick={() => setActiveTab("explore")}
            className={`px-4 py-3 rounded-xl text-xs font-semibold flex items-center justify-between transition cursor-pointer ${activeTab === "explore" ? "bg-brand-green text-black font-extrabold shadow-md" : "text-white/70 hover:bg-white/5"}`}
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-base">hub</span>
              <span>Gatherings & Tribes</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 opacity-40 shrink-0" />
          </button>

          <button
            onClick={() => setActiveTab("chats")}
            className={`px-4 py-3 rounded-xl text-xs font-semibold flex items-center justify-between transition cursor-pointer ${activeTab === "chats" ? "bg-brand-green text-black font-extrabold shadow-md" : "text-white/70 hover:bg-white/5"}`}
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-base">
                security_key
              </span>
              <span>Encrypted Chats</span>
            </div>
            {sessionsUnreadCount() > 0 && (
              <span className="bg-brand-green text-black font-mono font-bold text-[9px] px-1.5 py-0.5 rounded-full">
                {sessionsUnreadCount()}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("verification")}
            className={`px-4 py-3 rounded-xl text-xs font-semibold flex items-center justify-between transition cursor-pointer ${activeTab === "verification" ? "bg-brand-green text-black font-extrabold shadow-md" : "text-white/70 hover:bg-white/5"}`}
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-base">
                face_5
              </span>
              <span>Anti-Catfish Scanner</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 opacity-40 shrink-0" />
          </button>

          {/* User tribal active logs statistics */}
          <div className="mt-6 border-t border-white/[0.04] pt-4 px-2 space-y-3 text-left">
            <span className="text-[9px] font-mono tracking-wider text-white/30 uppercase block">
              ACTIVE CONNECTIONS SUMMARY
            </span>

            <div className="flex justify-between items-center text-xs text-white/70">
              <span className="flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-brand-green" /> Linked
                Tribes
              </span>
              <span className="font-mono text-[10px] text-white/50">
                {userTribeKeys.length} nodes
              </span>
            </div>

            <div className="flex justify-between items-center text-xs text-white/70">
              <span className="flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-brand-green" /> Safety Status
              </span>
              <span className="text-[10px] text-brand-green font-mono uppercase font-bold">
                {userProfile.isVerified ? "Green verified ✓" : "Scan Pending"}
              </span>
            </div>
          </div>

          {/* Interactive Platform Traffic Overdrive Panel */}
          <div
            id="traffic-multiplier-console"
            className="mt-5 p-3.5 bg-white/5 rounded-xl border border-white/5 text-left relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span
                    className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${trafficMode === "normal" ? "bg-emerald-400" : trafficMode === "heavy" ? "bg-yellow-400" : "bg-rose-500"}`}
                  ></span>
                  <span
                    className={`relative inline-flex rounded-full h-2 w-2 ${trafficMode === "normal" ? "bg-emerald-400" : trafficMode === "heavy" ? "bg-yellow-400" : "bg-rose-500"}`}
                  ></span>
                </span>
                <span className="text-[9px] font-mono uppercase tracking-widest text-white/50">
                  PLATFORM TRAFFIC
                </span>
              </div>
              <span className="text-[8px] font-mono text-white/30 truncate">
                CONTROLLER
              </span>
            </div>

            <div className="mb-2">
              <div className="text-lg font-mono font-bold text-white tracking-widest flex items-baseline gap-1 animate-pulse-subtle">
                {activePeers.toLocaleString()}
                <span className="text-[9px] text-brand-green font-normal tracking-normal uppercase shrink-0 font-sans">
                  Active Peers
                </span>
              </div>
              <p className="text-[9px] text-white/40 leading-tight">
                Live computational channels connected within your Kampala
                cluster coordinate node.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-1 pt-1.5 border-t border-white/[0.04]">
              <button
                onClick={() => setTrafficMode("normal")}
                className={`py-1 rounded text-[8.5px] font-bold uppercase tracking-tight transition cursor-pointer ${trafficMode === "normal" ? "bg-[#ff5e00] text-black font-extrabold shadow-[0_0_8px_rgba(255,94,0,0.3)]" : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10"}`}
              >
                Normal
              </button>
              <button
                onClick={() => setTrafficMode("heavy")}
                className={`py-1 rounded text-[8.5px] font-bold uppercase tracking-tight transition cursor-pointer ${trafficMode === "heavy" ? "bg-yellow-500 text-black font-extrabold shadow-[0_0_8px_rgba(234,179,8,0.3)]" : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10"}`}
              >
                Heavy
              </button>
              <button
                onClick={() => setTrafficMode("overclocked")}
                className={`py-1 rounded text-[8.5px] font-bold uppercase tracking-tight transition cursor-pointer ${trafficMode === "overclocked" ? "bg-gradient-to-r from-red-500 to-rose-600 text-white font-extrabold shadow-[0_0_12px_rgba(244,63,94,0.55)] animate-pulse" : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10"}`}
              >
                Overdrive
              </button>
            </div>

            {trafficMode === "overclocked" && (
              <div className="mt-2 text-[8px] font-mono text-rose-400 capitalize bg-rose-500/10 p-1 rounded border border-rose-500/20 animate-pulse flex items-center gap-1 leading-tight">
                ⚠️ Overclock active! Multi-channel match routing queues running
                at max capacity.
              </div>
            )}
          </div>
        </section>

        {/* Center Canvas: Active tab rendering dynamic view content ports */}
        <section
          id="active-viewport-engine"
          className="w-full max-w-lg lg:max-w-none flex-1"
        >
          <AnimatePresence mode="wait">
            {activeTab === "swipe" && (
              <motion.div
                key="swipe"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-center"
              >
                {activeProfile ? (
                  <SwipeCard
                    profile={activeProfile}
                    onLike={handleLike}
                    onPass={handlePass}
                    matchMode={matchMode}
                    onMatchModeChange={setMatchMode}
                    coinsCount={coinsCount}
                    availableSuperLikes={2}
                  />
                ) : (
                  <div className="w-full max-w-sm h-[600px] bg-surface-container border border-white/5 rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-6 glass-card relative overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-brand-purple/10 rounded-full filter blur-3xl" />

                    <div className="w-16 h-16 rounded-2xl bg-brand-purple/10 border border-brand-purple/30 flex items-center justify-center text-brand-purple mb-2">
                      <Compass className="w-8 h-8 animate-spin" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-display font-medium text-lg text-white">
                        Grid Coordinates Exhausted
                      </h3>
                      <p className="text-xs text-white/60 leading-relaxed px-4">
                        All profiles matching{" "}
                        <strong className="text-brand-green">
                          {matchMode}
                        </strong>{" "}
                        mode nearby have been indexed. Expand parameters using
                        the semantic matchmaking terminal.
                      </p>
                    </div>

                    <button
                      onClick={() => setActiveTab("matchmaker")}
                      className="px-6 py-3 bg-brand-purple hover:bg-opacity-90 text-black font-bold text-xs rounded-xl transition tracking-wider uppercase font-sans flex items-center gap-2 cursor-pointer shadow-lg"
                    >
                      Initialize Gemini Matchmaker{" "}
                      <Sparkles className="w-4 h-4 fill-black" />
                    </button>

                    <button
                      onClick={() => {
                        setCurrentProfileIdx(0);
                      }}
                      className="text-xs text-white/40 hover:text-white transition cursor-pointer underline"
                    >
                      Re-calibrate Grid Feed
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === "verification" && (
              <motion.div
                key="verification"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <BiometricsScanner
                  onVerifySuccess={handleVerifySuccess}
                  isAlreadyVerified={userProfile.isVerified}
                />
              </motion.div>
            )}

            {activeTab === "matchmaker" && (
              <motion.div
                key="matchmaker"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <GeminiMatchmaker
                  onSelectProfile={handleSelectMatchedProfileFromAI}
                  matchMode={matchMode}
                />
              </motion.div>
            )}

            {activeTab === "chats" && (
              <motion.div
                key="chats"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                <ChatView
                  activeSessionId={activeChatId}
                  userAvatar={userProfile.imageUrl}
                />
              </motion.div>
            )}

            {activeTab === "explore" && (
              <motion.div
                key="explore"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <MeetupsView
                  onTribeJoined={handleTribeJoinToggle}
                  userTribeKeys={userTribeKeys}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>

      {/* Exquisite Fullscreen Stories / Tiktok reels view portals */}
      <AnimatePresence>
        {isStoriesOpen && (
          <StoriesView onClose={() => setIsStoriesOpen(false)} />
        )}
      </AnimatePresence>

      {/* Flutterwave monetization gold payment flow modal overlays */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <FlutterwaveCheckout
            onUpgradeCompleted={handleUpgradeCompleted}
            onClose={() => setIsCheckoutOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Massive Mutual Match High-vibration frequency popups */}
      <AnimatePresence>
        {recentMatchedProfile && (
          <div
            id="match-celebration-canvas"
            className="fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center p-6"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-radial-gradient from-brand-green/20 to-transparent filter blur-3xl pointer-events-none" />

            <div className="space-y-6 text-center max-w-md relative z-10">
              <div className="w-16 h-16 rounded-full bg-brand-green/15 flex items-center justify-center border border-brand-green/35 text-brand-green mx-auto mb-2 animate-spin duration-3000">
                <Radio className="w-8 h-8 animate-pulse text-glow" />
              </div>

              <div className="space-y-1">
                <h1 className="font-display font-black text-2xl sm:text-3xl tracking-widest text-brand-green text-glow leading-none">
                  MUTUAL FREQUENCY REACHED!
                </h1>
                <p className="text-xs uppercase tracking-widest text-white/50 font-mono">
                  End-to-end encrypted node connection locked
                </p>
              </div>

              {/* Dynamic avatars display connected with glowing vector path lines */}
              <div className="flex justify-center items-center gap-10 py-6">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full border-2 border-brand-green p-1 overflow-hidden bg-neutral-900 select-none">
                    <img
                      referrerPolicy="no-referrer"
                      src={userProfile.imageUrl}
                      alt="user avatar"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <span className="block mt-2 text-[10px] font-mono font-bold text-white/60">
                    Aria (You)
                  </span>
                </div>

                <div className="relative">
                  {/* Dynamic wave animation connecting links between nodes */}
                  <div className="absolute top-1/2 -left-10 h-[2px] w-10 bg-gradient-to-r from-brand-green via-brand-purple to-brand-green animate-pulse" />
                  <div className="w-20 h-20 rounded-full border-2 border-brand-purple p-1 overflow-hidden bg-neutral-900 select-none">
                    <img
                      referrerPolicy="no-referrer"
                      src={recentMatchedProfile.imageUrl}
                      alt="partner avatar"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <span className="block mt-2 text-[10px] font-mono font-bold text-white/60">
                    {recentMatchedProfile.moniker}
                  </span>
                </div>
              </div>

              <p className="text-xs text-white/70 px-6 leading-relaxed">
                Your high-vibe compatibility maps registered a matching vector
                overlay sequence of{" "}
                <strong className="text-brand-green font-mono">
                  {recentMatchedProfile.compatibility}%
                </strong>
                . Elias' node server generated initial E2EE keys instantly.
              </p>

              {/* Secure Chat Link buttons */}
              <div className="space-y-3 pt-4">
                <button
                  onClick={handleStartMatchChat}
                  className="w-full py-3 bg-brand-green text-black font-semibold text-xs rounded-xl tracking-wider uppercase transition neon-glow-primary hover:bg-opacity-90 font-sans cursor-pointer block text-center select-none"
                >
                  Start Encrypted Chat (E2EE)
                </button>
                <button
                  onClick={handleCloseMatchOverlay}
                  className="text-xs text-white/40 hover:text-white transition cursor-pointer block mx-auto underline"
                >
                  Continue Swiping Grid
                </button>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Immersive Mobile Navigation Navigation Bar (visible on md to mobile displays) */}
      <nav
        id="mobile-nav-bar"
        className="lg:hidden fixed bottom-0 inset-x-0 bg-[#0c0c0c]/90 border-t border-white/5 backdrop-blur-md flex justify-around py-3 px-2 z-40"
      >
        <button
          onClick={() => setActiveTab("swipe")}
          className={`flex flex-col items-center gap-1 cursor-pointer transition select-none ${activeTab === "swipe" ? "text-brand-green" : "text-[#818181] hover:text-white"}`}
        >
          <span className="material-symbols-outlined text-[19px]">radar</span>
          <span className="text-[9px] font-sans font-medium">Radar</span>
        </button>

        <button
          onClick={() => setActiveTab("matchmaker")}
          className={`flex flex-col items-center gap-1 cursor-pointer transition select-none ${activeTab === "matchmaker" ? "text-brand-purple text-glow-purple" : "text-[#818181] hover:text-white"}`}
        >
          <span className="material-symbols-outlined text-[19px]">
            magic_exchange
          </span>
          <span className="text-[9px] font-sans font-medium">Vibes AI</span>
        </button>

        <button
          onClick={() => setActiveTab("explore")}
          className={`flex flex-col items-center gap-1 cursor-pointer transition select-none ${activeTab === "explore" ? "text-brand-green" : "text-[#818181] hover:text-white"}`}
        >
          <span className="material-symbols-outlined text-[19px]">hub</span>
          <span className="text-[9px] font-sans font-medium">Hangouts</span>
        </button>

        <button
          onClick={() => setActiveTab("chats")}
          className={`flex flex-col items-center gap-1 cursor-pointer transition select-none ${activeTab === "chats" ? "text-brand-green" : "text-[#818181] hover:text-white"}`}
        >
          <div className="relative">
            <span className="material-symbols-outlined text-[19px]">
              security_key
            </span>
            {sessionsUnreadCount() > 0 && (
              <div className="absolute -top-1.5 -right-1.5 bg-brand-green text-black font-mono font-black text-[7.5px] w-4 h-4 rounded-full flex items-center justify-center leading-none">
                {sessionsUnreadCount()}
              </div>
            )}
          </div>
          <span className="text-[9px] font-sans font-medium">Encrypted</span>
        </button>

        <button
          onClick={() => setActiveTab("verification")}
          className={`flex flex-col items-center gap-1 cursor-pointer transition select-none ${activeTab === "verification" ? "text-brand-green" : "text-[#818181] hover:text-white"}`}
        >
          <span className="material-symbols-outlined text-[19px]">face_5</span>
          <span className="text-[9px] font-sans font-medium">Scanner</span>
        </button>
      </nav>
    </div>
  );

  function sessionsUnreadCount() {
    return 1; // Elena's unread message!
  }
}
