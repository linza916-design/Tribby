"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Sparkles,
  Music,
  Ticket,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";

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
  lastRapidIncrease: number;
  pulseTrigger: number;
  borderGlowTrigger: number;
  activityLog: ActivityLog[];
}

export const MeetupsView: React.FC<MeetupsViewProps> = ({
  onTribeJoined,
  userTribeKeys,
}) => {
  const [tab, setTab] = useState<"hangouts" | "tribes">("hangouts");
  const [search, setSearch] = useState("");
  const [joinedMeetupIds, setJoinedMeetupIds] = useState<string[]>([]);
  const [vibeFilter, setVibeFilter] = useState("All");

  const [trendingVibes, setTrendingVibes] = useState<TrendingVibe[]>(() => {
    const allProfiles = [INITIAL_USER_PROFILE, ...MOCK_PROFILES];
    const tagCounts: Record<string, number> = {};

    allProfiles.forEach((profile) => {
      profile.tags?.forEach((tag: string) => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });

    const icons = ["🧠", "⚡", "🎵"];

    return Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([tag, freq], index) => ({
        tag,
        count: freq * 314 + 140,
        icon: icons[index % icons.length],
        isHot: false,
        lastRapidIncrease: 0,
        pulseTrigger: 0,
        borderGlowTrigger: 0,
        activityLog: [],
      }));
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTrendingVibes((prev) =>
        prev.map((v) => {
          const now = Date.now();
          const isSpike = Math.random() > 0.85;
          const increment = isSpike
            ? Math.floor(Math.random() * 8) + 12
            : Math.floor(Math.random() * 3) + 1;

          const nextCount = v.count + increment;

          const log: ActivityLog = {
            id: `${now}-${Math.random()}`,
            timestamp: new Date(now).toLocaleTimeString(),
            increment,
            totalAfter: nextCount,
            isManual: false,
          };

          return {
            ...v,
            count: nextCount,
            isHot: isSpike,
            lastRapidIncrease: isSpike ? now : v.lastRapidIncrease,
            pulseTrigger: increment > 5 ? v.pulseTrigger + 1 : v.pulseTrigger,
            activityLog: [log, ...v.activityLog].slice(0, 5),
          };
        }),
      );
    }, 5500);

    return () => clearInterval(interval);
  }, []);

  const handleBoostVibe = (index: number) => {
    setTrendingVibes((prev) => {
      const copy = [...prev];
      const now = Date.now();

      copy[index] = {
        ...copy[index],
        count: copy[index].count + 15,
        isHot: true,
        pulseTrigger: copy[index].pulseTrigger + 1,
        lastRapidIncrease: now,
        activityLog: [
          {
            id: `${now}`,
            timestamp: new Date(now).toLocaleTimeString(),
            increment: 15,
            totalAfter: copy[index].count + 15,
            isManual: true,
          },
          ...copy[index].activityLog,
        ].slice(0, 5),
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
    setJoinedMeetupIds((prev) =>
      prev.includes(id) ? prev.filter((mId) => mId !== id) : [...prev, id],
    );
  };

  return (
    <div className="space-y-8">
      {/* Tabs */}
      <div className="flex gap-3">
        {["hangouts", "tribes"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t as "hangouts" | "tribes")}
            className={`px-5 py-2 rounded-xl text-xs font-semibold transition ${
              tab === t
                ? "bg-green-400 text-black"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            {t === "hangouts" ? "📍 Local Hangouts" : "🔥 Tribal Nodes"}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <input
          className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 py-3 text-sm text-white focus:outline-none"
          placeholder={`Search ${tab}...`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Search className="absolute left-3 top-3.5 w-4 h-4 text-white/40" />
      </div>

      {/* Trending */}
      <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
        <div className="flex items-center gap-2 mb-5">
          <Sparkles className="text-green-400 w-4 h-4" />
          <span className="text-xs uppercase tracking-widest text-white/70">
            Trending Vibes
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {trendingVibes.map((v, i) => (
            <motion.div
              key={v.tag}
              whileTap={{ scale: 0.96 }}
              whileHover={{ scale: 1.03 }}
              onClick={() => handleBoostVibe(i)}
              className={`cursor-pointer rounded-xl p-5 border transition ${
                v.isHot
                  ? "border-pink-500 shadow-lg shadow-pink-500/20"
                  : "border-white/10"
              }`}
            >
              <div className="flex justify-between">
                <span className="text-xl">{v.icon}</span>
                <TrendingUp className="w-4 h-4 text-green-400" />
              </div>

              <h3 className="mt-3 font-semibold">{v.tag}</h3>

              <p className="text-green-400 text-sm mt-1">
                {v.count.toLocaleString()} syncs
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Hangouts */}
      {tab === "hangouts" && (
        <div className="grid md:grid-cols-2 gap-5">
          {filteredMeetups.map((m) => {
            const joined = joinedMeetupIds.includes(m.id);

            return (
              <div
                key={m.id}
                className="rounded-2xl border border-white/10 p-5 bg-white/5"
              >
                <h3 className="font-semibold">{m.title}</h3>

                <p className="text-sm text-white/60 mt-2">{m.description}</p>

                <div className="flex items-center gap-2 mt-3 text-xs text-white/70">
                  <Music className="w-4 h-4" />
                  {m.music}
                </div>

                <button
                  onClick={() => handleJoinMeetup(m.id)}
                  className={`w-full mt-5 py-3 rounded-xl font-semibold transition ${
                    joined
                      ? "bg-purple-500 text-black"
                      : "bg-green-400 text-black hover:brightness-110"
                  }`}
                >
                  {joined ? (
                    <>
                      <CheckCircle2 className="inline mr-2 w-4 h-4" />
                      Joined
                    </>
                  ) : (
                    <>
                      <Ticket className="inline mr-2 w-4 h-4" />
                      Join Meetup
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Tribes */}
      {tab === "tribes" && (
        <div className="grid md:grid-cols-3 gap-5">
          {filteredTribes.map((t) => {
            const joined = userTribeKeys.includes(t.name);

            return (
              <div
                key={t.id}
                className="rounded-2xl border border-white/10 overflow-hidden bg-white/5"
              >
                <img
                  src={t.imageUrl}
                  alt={t.name}
                  className="w-full h-36 object-cover"
                />

                <div className="p-5">
                  <h3 className="font-semibold">{t.name}</h3>

                  <p className="text-xs text-white/60 mt-2">{t.description}</p>

                  <button
                    onClick={() => onTribeJoined(t.name)}
                    className={`w-full mt-5 py-3 rounded-xl transition ${
                      joined
                        ? "bg-green-400 text-black"
                        : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    {joined ? "Synced ✓" : "Connect Node"}
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

export default MeetupsView;
