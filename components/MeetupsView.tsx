import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Users,
  Ticket,
  Award,
  Search,
  PlusCircle,
  Sparkles,
  Filter,
  Music,
  HeartHandshake,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import { MeetupItem, TribeNode } from "../lib/types";
import {
  MOCK_MEETUPS,
  MOCK_TRIBES,
  MOCK_PROFILES,
  INITIAL_USER_PROFILE,
} from "../lib/data";

interface MeetupsViewProps {
  onTribeJoined: (tribeName: string) => void;
  userTribeKeys: string[];
}

export const MeetupsView: React.FC<MeetupsViewProps> = ({
  onTribeJoined,
  userTribeKeys,
}) => {
  const [tab, setTab] = useState<"hangouts" | "tribes">("hangouts");
  const [search, setSearch] = useState("");
  const [joinedMeetupIds, setJoinedMeetupIds] = useState<string[]>([]);
  const [vibeFilter, setVibeFilter] = useState("All");

  // Calculates top 3 trending vibe tags used in profiles across the platform
  const [trendingVibes, setTrendingVibes] = useState<
    {
      tag: string;
      count: number;
      icon: string;
      isHot: boolean;
      lastRapidIncrease: number;
      pulseTrigger: number;
      borderGlowTrigger: number;
      activityLog: Array<{
        id: string;
        timestamp: string;
        increment: number;
        totalAfter: number;
        isManual: boolean;
      }>;
    }[]
  >(() => {
    const allProfiles = [INITIAL_USER_PROFILE, ...MOCK_PROFILES];
    const tagCounts: { [key: string]: number } = {};

    allProfiles.forEach((profile) => {
      if (profile.tags) {
        profile.tags.forEach((tag) => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
      }
    });

    const topTags = Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    const icons = ["🧠", "⚡", "🧱", "📷", "🎵"];
    return topTags.map(([tag, freq], index) => {
      const startingCount = freq * 314 + Math.floor(Math.random() * 88) + 140;
      const refTime = Date.now();

      const mockLogs = [
        {
          id: `init-${index}-1`,
          timestamp: new Date(refTime - 4 * 60 * 1000).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
          increment: Math.floor(Math.random() * 3) + 1,
          totalAfter: startingCount - 8,
          isManual: false,
        },
        {
          id: `init-${index}-2`,
          timestamp: new Date(refTime - 2 * 60 * 1000).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
          increment: 6,
          totalAfter: startingCount - 2,
          isManual: false,
        },
        {
          id: `init-${index}-3`,
          timestamp: new Date(refTime - 45 * 1000).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
          increment: 2,
          totalAfter: startingCount,
          isManual: false,
        },
      ];

      return {
        tag,
        count: startingCount,
        icon: icons[index % icons.length],
        isHot: false,
        lastRapidIncrease: 0,
        pulseTrigger: 0,
        borderGlowTrigger: 0,
        activityLog: mockLogs,
      };
    });
  });

  // Background ticker that simulates platform-wide active nodes syncing
  useEffect(() => {
    const interval = setInterval(() => {
      setTrendingVibes((prev) => {
        const now = Date.now();
        return prev.map((v) => {
          // A vibe tag remains marked as 'Hot' if there was a rapid increase within the window (e.g. last 15 seconds)
          const isHotStill =
            v.lastRapidIncrease > 0 && now - v.lastRapidIncrease < 15000;

          // 40% chance of random increments per tick
          if (Math.random() > 0.6) {
            const isSpike = Math.random() > 0.85; // 15% chance of a random spike of traffic platform-wide
            const increment = isSpike
              ? Math.floor(Math.random() * 8) + 12
              : Math.floor(Math.random() * 3) + 1;
            const updatedLastIncrease = isSpike ? now : v.lastRapidIncrease;
            const nextCount = v.count + increment;

            // Checks if it crosses any multiple of 100 threshold (e.g., from 199 to 201)
            const crossedThreshold =
              Math.floor(v.count / 100) < Math.floor(nextCount / 100);

            const newLog = {
              id: `log-${now}-${Math.random()}`,
              timestamp: new Date(now).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              }),
              increment,
              totalAfter: nextCount,
              isManual: false,
            };
            const updatedLog = [newLog, ...(v.activityLog || [])].slice(0, 3);

            return {
              ...v,
              count: nextCount,
              lastRapidIncrease: updatedLastIncrease,
              isHot: isSpike || isHotStill,
              pulseTrigger: increment > 5 ? v.pulseTrigger + 1 : v.pulseTrigger,
              borderGlowTrigger: crossedThreshold
                ? (v.borderGlowTrigger || 0) + 1
                : v.borderGlowTrigger || 0,
              activityLog: updatedLog,
            };
          }
          return {
            ...v,
            isHot: isHotStill,
          };
        });
      });
    }, 5500);

    return () => clearInterval(interval);
  }, []);

  const handleBoostVibe = (index: number) => {
    setTrendingVibes((prev) => {
      const copy = [...prev];
      const now = Date.now();
      const prevCount = copy[index].count;
      const nextCount = prevCount + 15;
      const crossedThreshold =
        Math.floor(prevCount / 100) < Math.floor(nextCount / 100);

      const newLog = {
        id: `boost-${now}-${Math.random()}`,
        timestamp: new Date(now).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        increment: 15,
        totalAfter: nextCount,
        isManual: true,
      };
      const updatedLog = [newLog, ...(copy[index].activityLog || [])].slice(
        0,
        3,
      );

      copy[index] = {
        ...copy[index],
        count: nextCount, // clicking boosts vibe energy immediately!
        lastRapidIncrease: now,
        isHot: true,
        pulseTrigger: copy[index].pulseTrigger + 1,
        borderGlowTrigger: crossedThreshold
          ? (copy[index].borderGlowTrigger || 0) + 1
          : copy[index].borderGlowTrigger || 0,
        activityLog: updatedLog,
      };
      return copy;
    });
  };

  const filteredMeetups = MOCK_MEETUPS.filter((m) => {
    const matchesSearch =
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.description.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = vibeFilter === "All" || m.category === vibeFilter;
    return matchesSearch && matchesFilter;
  });

  const filteredTribes = MOCK_TRIBES.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase()),
  );

  const handleJoinMeetup = (id: string) => {
    if (joinedMeetupIds.includes(id)) {
      setJoinedMeetupIds((prev) => prev.filter((mId) => mId !== id));
    } else {
      setJoinedMeetupIds((prev) => [...prev, id]);
    }
  };

  return (
    <div id="meetups-view-panel" className="space-y-6">
      {/* Search and Navigation filters */}
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
        <div
          id="gatherings-tabs"
          className="flex gap-2 bg-black/40 p-1 rounded-xl border border-white/5 w-full md:w-auto"
        >
          <button
            onClick={() => setTab("hangouts")}
            className={`flex-1 md:flex-initial px-5 py-2 text-xs font-sans font-semibold rounded-lg transition ${tab === "hangouts" ? "bg-brand-green text-black font-bold" : "text-white/60 hover:text-white"}`}
          >
            📍 Local Hangouts
          </button>
          <button
            onClick={() => setTab("tribes")}
            className={`flex-1 md:flex-initial px-5 py-2 text-xs font-sans font-semibold rounded-lg transition ${tab === "tribes" ? "bg-brand-green text-black font-bold" : "text-white/60 hover:text-white"}`}
          >
            🔥 Tribal Nodes
          </button>
        </div>

        {/* Search bar inside container */}
        <div className="relative w-full md:w-64">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search ${tab === "hangouts" ? "hangouts..." : "tribal coordinates..."}`}
            className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-brand-green/50"
          />
          <Search className="w-4 h-4 text-white/30 absolute left-3.5 top-3" />
        </div>
      </div>

      {/* Trending vibes program widget */}
      <div
        id="trending-vibes-widget"
        className="bg-white/5 rounded-2xl p-4 border border-white/10 relative overflow-hidden glass-panel text-left"
      >
        <div className="absolute top-0 right-0 w-36 h-24 bg-gradient-to-l from-brand-green/15 to-transparent pointer-events-none filter blur-xl" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 mb-3.5 pb-2.5 border-b border-white/5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-green animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#ababab]">
              Trending Vibes Indexing Platform-wide
            </span>
          </div>
          <div className="bg-brand-purple/10 border border-brand-purple/20 rounded-full px-2.5 py-0.5 flex items-center gap-1 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-purple animate-ping" />
            <span className="text-[8px] font-mono text-brand-purple uppercase tracking-wider font-extrabold font-sans">
              Live Ingestion Active
            </span>
          </div>
        </div>

        <p className="text-[10px] text-white/50 mb-3 leading-relaxed">
          The algorithm extracts tags from match grids periodically. Click any
          node profile keyword tracker to request an instant signal boost.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {trendingVibes.map((v, index) => (
            <div
              key={`${v.tag}-${v.pulseTrigger}-${v.borderGlowTrigger || 0}`}
              className="relative group/vibetag"
            >
              <motion.div
                onClick={() => handleBoostVibe(index)}
                initial={{ scale: v.pulseTrigger > 0 ? 0.96 : 1, y: 0 }}
                animate={{
                  scale: v.pulseTrigger > 0 ? [1, 1.1, 1] : 1,
                  borderColor:
                    v.borderGlowTrigger && v.borderGlowTrigger > 0
                      ? [
                          "rgba(255, 255, 255, 0.1)",
                          "rgba(255, 215, 0, 1)", // Pure Brilliant Gold
                          "rgba(255, 92, 0, 1)", // Intense Neon Orange
                          "rgba(255, 0, 92, 1)", // Fierce Cyber Pink
                          v.isHot
                            ? "rgba(255, 0, 92, 0.4)"
                            : "rgba(255, 255, 255, 0.05)",
                        ]
                      : v.pulseTrigger > 0
                        ? [
                            "rgba(255,92,0,0.15)",
                            "rgba(255,92,0,0.85)",
                            v.isHot
                              ? "rgba(255,0,92,0.4)"
                              : "rgba(255,255,255,0.05)",
                          ]
                        : v.isHot
                          ? "rgba(255,0,92,0.4)"
                          : "rgba(255,255,255,0.05)",
                  boxShadow:
                    v.borderGlowTrigger && v.borderGlowTrigger > 0
                      ? [
                          "0 0 0px rgba(255, 215, 0, 0)",
                          "0 0 45px rgba(255, 215, 0, 1), inset 0 0 15px rgba(255, 215, 0, 0.4)", // Ultra Gold burst!
                          "0 0 35px rgba(255, 92, 0, 0.95), inset 0 0 12px rgba(255, 92, 0, 0.3)", // Fire Orange
                          "0 0 25px rgba(255, 0, 92, 0.8), inset 0 0 8px rgba(255, 0, 92, 0.2)", // Cyber Pink
                          v.isHot
                            ? "0 0 15px rgba(255, 0, 92, 0.25)"
                            : "0 0 0px rgba(0, 0, 0, 0)",
                        ]
                      : v.pulseTrigger > 0
                        ? [
                            "0 0 0px rgba(255,92,0,0)",
                            "0 0 30px rgba(255,92,0,0.85)",
                            v.isHot
                              ? "0 0 15px rgba(255,0,92,0.25)"
                              : "0 0 0px rgba(255,92,0,0)",
                          ]
                        : v.isHot
                          ? "0 0 15px rgba(255,0,92,0.25)"
                          : "0 0 0px rgba(0,0,0,0)",
                }}
                transition={{
                  duration:
                    v.borderGlowTrigger && v.borderGlowTrigger > 0 ? 1.8 : 0.6,
                  times:
                    v.borderGlowTrigger && v.borderGlowTrigger > 0
                      ? [0, 0.15, 0.45, 0.75, 1]
                      : undefined,
                  ease: "easeOut",
                }}
                className={`bg-black/30 hover:bg-black/60 border p-3 rounded-xl flex items-center justify-between group cursor-pointer active:scale-95 select-none relative overflow-hidden transition-all duration-300 w-full ${
                  v.isHot
                    ? "shadow-[0_0_15px_rgba(255,0,92,0.25)] ring-1 ring-[#FF005C]/35 bg-gradient-to-r from-black/50 to-[#FF005C]/5"
                    : "hover:border-brand-green/30"
                }`}
              >
                {v.isHot && (
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#FF5C00] via-[#FF005C] to-[#FF5C00]" />
                )}

                {/* Sync spike flare radiating wave overlay */}
                {v.pulseTrigger > 0 && (
                  <motion.div
                    initial={{ opacity: 0.85, scale: 0.8 }}
                    animate={{ opacity: 0, scale: 1.6 }}
                    transition={{ duration: 0.55, ease: "easeOut" }}
                    className="absolute inset-0 bg-brand-green/15 pointer-events-none rounded-xl"
                  />
                )}

                {/* High-threshold milestone boundary crossed glow background ripple */}
                {v.borderGlowTrigger && v.borderGlowTrigger > 0 && (
                  <motion.div
                    initial={{ opacity: 0.95, scale: 0.8 }}
                    animate={{ opacity: 0, scale: 2 }}
                    transition={{ duration: 1.3, ease: "easeOut" }}
                    className="absolute inset-0 bg-yellow-400/20 pointer-events-none rounded-xl"
                  />
                )}

                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-sm transition-all shrink-0 ${
                      v.isHot
                        ? "bg-[#FF005C]/15 border-[#FF005C]/40"
                        : "group-hover:bg-brand-green/10 group-hover:border-brand-green/20"
                    }`}
                  >
                    {v.icon}
                  </div>
                  <div className="text-left min-w-0">
                    <div className="text-[8px] font-mono text-white/35 flex items-center gap-1.5 flex-wrap">
                      <span>RANK #0{index + 1}</span>
                      {v.isHot && !v.borderGlowTrigger && (
                        <span className="inline-flex items-center gap-0.5 px-1 py-0.2 text-[7px] font-sans font-black bg-[#FF005C]/20 text-[#FF005C] rounded-sm uppercase tracking-wider animate-pulse border border-[#FF005C]/35 font-sans">
                          <span className="w-1 h-1 rounded-full bg-[#FF005C] animate-ping" />
                          🔥 HOT TREND (5m)
                        </span>
                      )}
                      {v.borderGlowTrigger && v.borderGlowTrigger > 0 && (
                        <span className="inline-flex items-center gap-0.5 px-1 py-0.2 text-[7px] font-sans font-black bg-gradient-to-r from-yellow-500/35 to-amber-500/35 text-yellow-300 rounded-sm uppercase tracking-wider animate-bounce border border-yellow-500/40 font-sans">
                          ⚡ 100+ CODES
                        </span>
                      )}
                    </div>
                    <div
                      className={`text-xs font-semibold transition truncate ${v.isHot ? "text-white" : "text-white/90 group-hover:text-brand-green"}`}
                    >
                      {v.tag}
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div
                    className={`text-xs font-mono font-bold transition ${v.isHot ? "text-[#FF005C]" : "text-brand-green"}`}
                  >
                    {v.count}
                  </div>
                  <div className="text-[8px] font-mono text-white/30 uppercase tracking-tight">
                    syncs
                  </div>
                </div>
              </motion.div>

              {/* Hover tooltip widget displaying recent activity */}
              <div className="absolute pointer-events-none opacity-0 invisible group-hover/vibetag:opacity-100 group-hover/vibetag:visible transition-all duration-300 transform scale-95 origin-bottom group-hover/vibetag:scale-100 bottom-full left-1/2 -translate-x-1/2 mb-3.5 w-60 bg-black/95 border border-white/10 rounded-xl p-3 shadow-[0_12px_30px_rgba(0,0,0,0.85)] z-50 text-left backdrop-blur-md">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-brand-green" />
                    <span className="text-[9px] font-mono uppercase tracking-widest text-white/55">
                      Recent Activity
                    </span>
                  </div>
                  <span className="text-[7px] font-mono uppercase bg-white/5 py-0.5 px-1.5 rounded text-white/40">
                    Vibe Node Log
                  </span>
                </div>

                <div className="space-y-1.5">
                  {(v.activityLog || []).map((log) => (
                    <div
                      key={log.id}
                      className="flex items-center justify-between text-[10px] font-mono py-1 border-b border-white/[0.03] last:border-0 leading-none"
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="text-white/30 text-[8.5px]">
                          {log.timestamp}
                        </span>
                        {log.isManual ? (
                          <span className="text-[7.5px] text-amber-400 bg-amber-400/10 px-1 py-0.2 rounded font-sans font-bold uppercase tracking-tight">
                            Boost
                          </span>
                        ) : (
                          <span className="text-[7.5px] text-brand-purple bg-brand-purple/10 px-1 py-0.2 rounded font-sans font-semibold uppercase tracking-tight">
                            Sync
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-brand-green font-bold text-[9.5px]">
                          +{log.increment}
                        </span>
                        <span className="text-white/30 text-[8.5px]">
                          ({log.totalAfter})
                        </span>
                      </div>
                    </div>
                  ))}
                  {(!v.activityLog || v.activityLog.length === 0) && (
                    <div className="text-[9.5px] font-mono text-white/30 text-center py-1.5">
                      No recent activity logged...
                    </div>
                  )}
                </div>

                <p className="mt-2 pt-1.5 border-t border-white/[0.04] text-[8px] text-white/40 font-mono text-center leading-none">
                  Tag Tracker:{" "}
                  <span className="text-brand-green font-bold">{v.tag}</span>
                </p>

                {/* Arrow indicator at the bottom to target the vibe node element */}
                <div className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rotate-45 bg-[#0a0a0d] border-r border-b border-white/10" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {tab === "hangouts" ? (
        <div className="space-y-4">
          {/* Quick Filter chips */}
          <div className="flex flex-wrap gap-1.5 text-left">
            {[
              "All",
              "Art & Design",
              "Clubbing & Nightlife",
              "Gaming & Synths",
            ].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setVibeFilter(cat)}
                className={`px-3 py-1.5 rounded-full text-[10px] font-mono tracking-wide transition border cursor-pointer ${vibeFilter === cat ? "bg-white text-black border-white font-bold" : "bg-white/5 text-white/60 border-white/5 hover:border-white/20"}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredMeetups.map((m) => {
              const isJoined = joinedMeetupIds.includes(m.id);
              return (
                <div
                  key={m.id}
                  className="bg-surface-container border border-white/5 rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between glass-card"
                >
                  {/* Decorative Glow */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-brand-green/5 rounded-full filter blur-2xl pointer-events-none" />

                  <div className="space-y-3 text-left">
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-[9px] font-mono bg-brand-green/10 text-brand-green px-2 py-0.5 rounded-full font-semibold border border-brand-green/15 tracking-wide">
                        {m.vibe}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold text-white/50">
                          {m.distance}
                        </span>
                        <span className="text-[10px] text-brand-green font-mono">
                          {m.costLevel}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-display font-medium text-sm text-white">
                        {m.title}
                      </h3>
                      <p className="text-[11px] text-white/60 leading-relaxed">
                        {m.description}
                      </p>
                    </div>

                    {/* Vibe and host integrity attributes */}
                    <div className="flex items-center gap-4 py-1.5 border-t border-b border-white/[0.03] text-[10px] text-white/50">
                      <div className="flex items-center gap-1">
                        <Music className="w-3.5 h-3.5 text-brand-green" />
                        <span className="truncate max-w-[124px]">
                          {m.music}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-green fill-brand-green/10" />
                        <span>Host Verified</span>
                      </div>
                    </div>

                    {/* Attendees avatars preview */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-1.5">
                        <div className="flex -space-x-2">
                          {m.attendeesPics.map((pic, idx) => (
                            <div
                              key={idx}
                              className="w-6 h-6 rounded-full overflow-hidden border border-brand-dark bg-neutral-900"
                            >
                              <img
                                referrerPolicy="no-referrer"
                                src={pic}
                                alt="attendee"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                        <span className="text-[10px] text-white/40 font-mono">
                          +{m.attendeesCount} high-matching nodes joined
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleJoinMeetup(m.id)}
                    className={`w-full py-2.5 mt-4 text-[11px] font-sans font-semibold rounded-xl tracking-wider uppercase transition flex items-center justify-center gap-1.5 cursor-pointer ${isJoined ? "bg-brand-purple text-black font-bold" : "bg-brand-green text-black hover:bg-opacity-95"}`}
                  >
                    {isJoined ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 fill-black text-brand-purple" />{" "}
                        Node Lock Active (Joined)
                      </>
                    ) : (
                      <>
                        <Ticket className="w-4 h-4 fill-black" /> Claim Secure
                        Ticket
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTribes.map((t) => {
            const hasJoined = userTribeKeys.includes(t.name);
            return (
              <div
                key={t.id}
                className="bg-surface-container border border-white/5 rounded-2xl overflow-hidden flex flex-col justify-between glass-card text-left"
              >
                {/* Image header with overlay */}
                <div className="h-32 relative bg-neutral-950">
                  <img
                    referrerPolicy="no-referrer"
                    src={t.imageUrl}
                    alt={t.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                  <span className="absolute bottom-3 left-3 bg-brand-purple/25 backdrop-blur-md text-brand-purple border border-brand-purple/30 text-[9px] font-mono uppercase px-2 py-0.5 rounded font-bold">
                    #{t.category}
                  </span>
                </div>

                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <h3 className="font-display font-bold text-xs text-white">
                      {t.name}
                    </h3>
                    <p className="text-[10px] text-white/50 leading-relaxed line-clamp-2">
                      {t.description}
                    </p>
                  </div>

                  {/* Node statistics */}
                  <div className="flex items-center justify-between text-[9px] font-mono text-white/40 border-t border-white/[0.04] pt-2.5">
                    <span>{t.activeNodesCount}</span>
                    <span>{t.membersCount}</span>
                  </div>

                  <button
                    onClick={() => onTribeJoined(t.name)}
                    className={`w-full py-2 text-[10px] font-mono rounded-lg transition tracking-widest uppercase cursor-pointer ${hasJoined ? "bg-brand-green/20 text-brand-green border border-brand-green/35" : "bg-white/5 text-white/60 hover:text-white border border-white/10 hover:border-brand-purple/30"}`}
                  >
                    {hasJoined ? "Synced to Node ✓" : "Connect Node +"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
