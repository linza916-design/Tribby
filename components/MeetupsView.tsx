"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Search,
  Music,
  TrendingUp,
  Users,
  Sparkles,
  Ticket,
  CheckCircle2,
  Flame,
  Compass,
  Bell,
  Radio,
  Cpu,
  ShieldCheck,
} from "lucide-react";

import {
  MOCK_MEETUPS,
  MOCK_TRIBES,
  MOCK_PROFILES,
  INITIAL_USER_PROFILE,
  MOCK_NOTIFICATIONS,
} from "../lib/data";

import type { Profile, MatchMode } from "../lib/types";

interface MeetupsViewProps {
  onTribeJoined: (tribeName: string) => void;
  userTribeKeys: string[];
  matchMode: MatchMode;
  onSelectProfile: (profile: Profile) => void;
}

interface ActivityLog {
  id: string;
  timestamp: string;
  increment: number;
  totalAfter: number;
  isManual: boolean;
}

interface TrendingVibe {
  tag: string;
  count: number;
  icon: string;
  isHot: boolean;
  pulseTrigger: number;
  activityLog: ActivityLog[];
}

const categories = ["All", "Music", "Tech", "Art", "Gaming", "Fitness"];

export const MeetupsView: React.FC<MeetupsViewProps> = ({
  onTribeJoined,
  userTribeKeys,
  matchMode,
  onSelectProfile,
}) => {
  const shouldReduceMotion = useReducedMotion();

  const [tab, setTab] = useState<"hangouts" | "tribes">("hangouts");
  const [search, setSearch] = useState("");
  const [joinedMeetupIds, setJoinedMeetupIds] = useState<string[]>([]);
  const [vibeFilter, setVibeFilter] = useState("All");
  const [showNotifications, setShowNotifications] = useState(false);

  const [notifications] = useState(MOCK_NOTIFICATIONS);

  const [trendingVibes, setTrendingVibes] = useState<TrendingVibe[]>(() => {
    const allProfiles = [INITIAL_USER_PROFILE, ...MOCK_PROFILES];

    const counts: Record<string, number> = {};

    allProfiles.forEach((profile) => {
      profile.tags?.forEach((tag) => {
        counts[tag] = (counts[tag] || 0) + 1;
      });
    });

    const icons = ["🧠", "⚡", "🎵"];

    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([tag, count], i) => ({
        tag,
        count: count * 320 + 120,
        icon: icons[i],
        isHot: false,
        pulseTrigger: 0,
        activityLog: [],
      }));
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTrendingVibes((prev) =>
        prev.map((v) => {
          const increment = Math.floor(Math.random() * 8) + 1;

          return {
            ...v,
            count: v.count + increment,
            isHot: increment > 5,
            pulseTrigger: increment > 5 ? v.pulseTrigger + 1 : v.pulseTrigger,
            activityLog: [
              {
                id: crypto.randomUUID(),
                timestamp: new Date().toLocaleTimeString(),
                increment,
                totalAfter: v.count + increment,
                isManual: false,
              },
              ...v.activityLog,
            ].slice(0, 5),
          };
        }),
      );
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const filteredMeetups = useMemo(() => {
    return MOCK_MEETUPS.filter(
      (m) =>
        (m.title.toLowerCase().includes(search.toLowerCase()) ||
          m.description.toLowerCase().includes(search.toLowerCase())) &&
        (vibeFilter === "All" || m.category === vibeFilter),
    );
  }, [search, vibeFilter]);

  const filteredTribes = useMemo(() => {
    return MOCK_TRIBES.filter(
      (t) =>
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.description.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]);

  const matchedProfiles = useMemo(() => {
    return MOCK_PROFILES.filter((p) => p.matchMode === matchMode).slice(0, 6);
  }, [matchMode]);

  const handleJoinMeetup = (id: string) => {
    setJoinedMeetupIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      {/* Atmospheric Background */}
      <div className="absolute inset-0 bg-[#050505]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,255,170,0.12),transparent_30%),radial-gradient(circle_at_top_right,rgba(255,0,120,0.1),transparent_30%),radial-gradient(circle_at_bottom,rgba(130,0,255,0.08),transparent_40%)]" />

      <div className="absolute inset-0 backdrop-blur-[120px]" />

      {/* Top Header */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-black/40 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#00ff99] to-[#00c2ff] shadow-[0_0_40px_rgba(0,255,153,0.35)]">
              <Compass className="h-5 w-5 text-black" />
            </div>

            <div>
              <h1 className="font-black tracking-tight text-white text-2xl">
                Tribby
              </h1>

              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
                Social Frequency Network
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-semibold text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Kampala Node Online
            </div>

            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl transition hover:bg-white/10"
            >
              <Bell className="h-5 w-5 text-white/80" />

              <div className="absolute right-2 top-2 h-2 w-2 rounded-full bg-emerald-400" />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {showNotifications && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute right-4 top-20 z-50 w-80 rounded-3xl border border-white/10 bg-[#0d0d0d]/95 p-5 backdrop-blur-2xl shadow-[0_0_60px_rgba(0,0,0,0.6)]"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-white/40">
                  Signal Logs
                </h3>

                <Radio className="h-4 w-4 text-emerald-400 animate-pulse" />
              </div>

              <div className="space-y-3">
                {notifications.map((n: any) => (
                  <div
                    key={n.id}
                    className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.03] p-3"
                  >
                    <img
                      src={n.partnerAvatar}
                      alt={n.userMoniker}
                      className="h-11 w-11 rounded-full object-cover"
                    />

                    <div className="flex-1">
                      <p className="text-sm font-semibold text-white">
                        {n.userMoniker}
                      </p>

                      <p className="text-xs text-white/50">{n.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="relative z-10 mx-auto max-w-7xl px-4 py-8">
        {/* Hero */}
        <section className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-2xl shadow-[0_0_80px_rgba(0,0,0,0.4)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,255,153,0.18),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(255,0,120,0.15),transparent_35%)]" />

          <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-4 flex items-center gap-2 text-emerald-400">
                <Cpu className="h-5 w-5" />

                <span className="font-mono text-xs uppercase tracking-[0.3em]">
                  Live Neural Discovery
                </span>
              </div>

              <h1 className="text-4xl font-black leading-tight tracking-tight md:text-6xl">
                Discover
                <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-pink-500 bg-clip-text text-transparent">
                  {" "}
                  Communities
                </span>
                <br />
                Around Your Frequency
              </h1>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/60">
                Tribby connects underground communities, nightlife tribes,
                creators, gamers, artists, and emotional frequencies in real
                time.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <button className="rounded-2xl bg-emerald-400 px-6 py-4 text-sm font-black uppercase tracking-wider text-black transition hover:scale-[1.02]">
                  Explore Live Nodes
                </button>

                <button className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-sm font-semibold text-white backdrop-blur-xl transition hover:bg-white/10">
                  Open Match Grid
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  icon: Flame,
                  label: "Trending",
                  value: "24K+",
                },
                {
                  icon: ShieldCheck,
                  label: "Verified",
                  value: "98%",
                },
                {
                  icon: Users,
                  label: "Communities",
                  value: "1,204",
                },
                {
                  icon: Sparkles,
                  label: "AI Sync",
                  value: "ACTIVE",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-3xl border border-white/10 bg-black/30 p-5 backdrop-blur-xl"
                >
                  <item.icon className="h-6 w-6 text-emerald-400" />

                  <p className="mt-4 text-3xl font-black text-white">
                    {item.value}
                  </p>

                  <p className="mt-1 text-sm text-white/50">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Search */}
        <section className="mt-10">
          <div className="relative">
            <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tribes, meetups, frequencies..."
              className="h-16 w-full rounded-3xl border border-white/10 bg-white/[0.03] pl-14 pr-6 text-white outline-none backdrop-blur-2xl placeholder:text-white/40 focus:border-emerald-400/40"
            />
          </div>
        </section>

        {/* Tabs */}
        <section className="mt-8 flex flex-wrap gap-4">
          {["hangouts", "tribes"].map((t) => {
            const active = tab === t;

            return (
              <button
                key={t}
                onClick={() => setTab(t as "hangouts" | "tribes")}
                className={`rounded-2xl px-6 py-4 text-sm font-bold transition-all ${
                  active
                    ? "bg-emerald-400 text-black shadow-[0_0_30px_rgba(0,255,153,0.35)]"
                    : "border border-white/10 bg-white/[0.03] text-white hover:bg-white/10"
                }`}
              >
                {t === "hangouts" ? "📍 Local Hangouts" : "🔥 Tribal Nodes"}
              </button>
            );
          })}
        </section>

        {/* Trending */}
        <section className="mt-12">
          <div className="mb-6 flex items-center gap-3">
            <TrendingUp className="h-6 w-6 text-pink-400" />

            <h2 className="text-2xl font-black tracking-tight text-white">
              Trending Frequencies
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {trendingVibes.map((v) => (
              <motion.div
                key={v.tag}
                whileHover={shouldReduceMotion ? {} : { y: -5 }}
                className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-2xl transition-all hover:border-emerald-400/30"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{v.icon}</span>

                    <TrendingUp className="h-5 w-5 text-emerald-400" />
                  </div>

                  <h3 className="mt-6 text-2xl font-black text-white">
                    {v.tag}
                  </h3>

                  <p className="mt-2 font-mono text-sm text-emerald-400">
                    {v.count.toLocaleString()} syncs
                  </p>

                  <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/5">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400"
                      style={{
                        width: `${Math.min(v.count / 30, 100)}%`,
                      }}
                    />
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/40">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    Live growth
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Meetups */}
        {tab === "hangouts" && (
          <section className="mt-14">
            <div className="mb-6 flex items-center gap-3">
              <Ticket className="h-6 w-6 text-yellow-400" />

              <h2 className="text-2xl font-black text-white">Local Hangouts</h2>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {filteredMeetups.map((m) => {
                const joined = joinedMeetupIds.includes(m.id);

                return (
                  <motion.article
                    key={m.id}
                    whileHover={shouldReduceMotion ? {} : { y: -6 }}
                    className="overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />

                      <Image
                        src={m.imageUrl}
                        alt={m.title}
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-110"
                      />

                      <div className="absolute bottom-5 left-5 z-20">
                        <span className="rounded-full bg-emerald-400/15 px-4 py-2 text-xs font-bold uppercase tracking-wider text-emerald-300 backdrop-blur-xl">
                          {m.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-2xl font-black text-white">
                        {m.title}
                      </h3>

                      <p className="mt-4 leading-relaxed text-white/60">
                        {m.description}
                      </p>

                      <div className="mt-5 flex items-center gap-2 text-sm text-pink-300">
                        <Music className="h-4 w-4" />

                        {m.music}
                      </div>

                      <button
                        onClick={() => handleJoinMeetup(m.id)}
                        className={`mt-6 h-14 w-full rounded-2xl text-sm font-black uppercase tracking-wider transition-all ${
                          joined
                            ? "bg-emerald-400 text-black"
                            : "border border-white/10 bg-white/5 text-white hover:bg-white/10"
                        }`}
                      >
                        {joined ? "Joined ✓" : "Join Meetup"}
                      </button>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </section>
        )}

        {/* Tribes */}
        {tab === "tribes" && (
          <section className="mt-14">
            <div className="mb-6 flex items-center gap-3">
              <Users className="h-6 w-6 text-purple-400" />

              <h2 className="text-2xl font-black text-white">Tribal Nodes</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredTribes.map((t) => {
                const joined = userTribeKeys.includes(t.name);

                return (
                  <motion.article
                    key={t.id}
                    whileHover={shouldReduceMotion ? {} : { y: -6 }}
                    className="overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl"
                  >
                    <div className="relative h-56">
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />

                      <Image
                        src={t.imageUrl}
                        alt={t.name}
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-110"
                      />
                    </div>

                    <div className="p-6">
                      <h3 className="text-2xl font-black text-white">
                        {t.name}
                      </h3>

                      <p className="mt-4 leading-relaxed text-white/60">
                        {t.description}
                      </p>

                      <button
                        onClick={() => onTribeJoined(t.name)}
                        className={`mt-6 h-14 w-full rounded-2xl text-sm font-black uppercase tracking-wider transition-all ${
                          joined
                            ? "bg-emerald-400 text-black"
                            : "border border-white/10 bg-white/5 text-white hover:bg-white/10"
                        }`}
                      >
                        {joined ? "Synced ✓" : "Connect Node"}
                      </button>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </section>
        )}

        {/* Recommended Connections */}
        <section className="mt-14">
          <div className="mb-6 flex items-center gap-3">
            <Users className="h-6 w-6 text-cyan-400" />

            <h2 className="text-2xl font-black text-white">
              Recommended Connections
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {matchedProfiles.map((profile) => (
              <motion.article
                key={profile.id}
                whileHover={shouldReduceMotion ? {} : { y: -6 }}
                className="overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl"
              >
                <div className="relative h-72">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />

                  <Image
                    src={profile.imageUrl}
                    alt={profile.moniker}
                    fill
                    className="object-cover"
                  />

                  <div className="absolute bottom-5 left-5 z-20">
                    <div className="flex items-center gap-2">
                      <h3 className="text-2xl font-black text-white">
                        {profile.moniker}
                      </h3>

                      <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <p className="leading-relaxed text-white/60">{profile.bio}</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {profile.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => onSelectProfile(profile)}
                    className="mt-6 h-14 w-full rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-sm font-black uppercase tracking-wider text-black shadow-[0_0_30px_rgba(0,255,153,0.35)] transition hover:scale-[1.01]"
                  >
                    View Match
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default MeetupsView;
