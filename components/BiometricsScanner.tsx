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
  Users,
} from "lucide-react";

import {
  MOCK_MEETUPS,
  MOCK_TRIBES,
  MOCK_PROFILES,
  INITIAL_USER_PROFILE,
} from "../lib/data";

import type { Profile, MatchMode } from "../lib/types";

interface MeetupsViewProps {
  onTribeJoined: (tribeName: string) => void;
  userTribeKeys: string[];
  matchMode?: MatchMode;
  onSelectProfile?: (profile: Profile) => void;
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

export const MeetupsView: React.FC<MeetupsViewProps> = ({
  onTribeJoined,
  userTribeKeys,
  matchMode = "dating",
  onSelectProfile,
}) => {
  const [tab, setTab] = useState<"hangouts" | "tribes">("hangouts");
  const [search, setSearch] = useState("");
  const [joinedMeetupIds, setJoinedMeetupIds] = useState<string[]>([]);
  const [vibeFilter, setVibeFilter] = useState("All");

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
          const total = v.count + increment;

          return {
            ...v,
            count: total,
            isHot: increment > 5,
            pulseTrigger: increment > 5 ? v.pulseTrigger + 1 : v.pulseTrigger,
            activityLog: [
              {
                id: crypto.randomUUID(),
                timestamp: new Date().toLocaleTimeString(),
                increment,
                totalAfter: total,
                isManual: false,
              },
              ...v.activityLog,
            ].slice(0, 5),
          };
        }),
      );
    }, 5500);

    return () => clearInterval(interval);
  }, []);

  const handleBoostVibe = (index: number) => {
    setTrendingVibes((prev) => {
      const copy = [...prev];
      const vibe = copy[index];

      copy[index] = {
        ...vibe,
        count: vibe.count + 15,
        isHot: true,
        pulseTrigger: vibe.pulseTrigger + 1,
        activityLog: [
          {
            id: crypto.randomUUID(),
            timestamp: new Date().toLocaleTimeString(),
            increment: 15,
            totalAfter: vibe.count + 15,
            isManual: true,
          },
          ...vibe.activityLog,
        ].slice(0, 5),
      };

      return copy;
    });
  };

  const filteredMeetups = MOCK_MEETUPS.filter(
    (m) =>
      (m.title.toLowerCase().includes(search.toLowerCase()) ||
        m.description.toLowerCase().includes(search.toLowerCase())) &&
      (vibeFilter === "All" || m.category === vibeFilter),
  );

  const filteredTribes = MOCK_TRIBES.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase()),
  );

  const matchedProfiles = MOCK_PROFILES.filter(
    (p) => p.matchMode === matchMode,
  ).slice(0, 6);

  const handleJoinMeetup = (id: string) => {
    setJoinedMeetupIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

    const compatible = MOCK_PROFILES.find((p) => p.matchMode === matchMode);

    if (compatible && onSelectProfile) {
      onSelectProfile(compatible);
    }
  };

  return (
    <div className="space-y-8 text-white">
      <div className="flex gap-3 flex-wrap">
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

      <div className="relative">
        <input
          className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 py-3 text-sm text-white focus:outline-none"
          placeholder={`Search ${tab}...`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Search className="absolute left-3 top-3.5 w-4 h-4 text-white/40" />
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {trendingVibes.map((v, i) => (
          <motion.div
            key={v.tag}
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.03 }}
            onClick={() => handleBoostVibe(i)}
            className={`cursor-pointer rounded-xl p-5 border ${
              v.isHot
                ? "border-pink-500 shadow-lg shadow-pink-500/20"
                : "border-white/10"
            } bg-white/5`}
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

      <div>
        <h3 className="text-xs uppercase tracking-widest text-white/50 mb-4 flex items-center gap-2">
          <Users className="w-4 h-4" />
          Recommended Connections
        </h3>

        <div className="grid md:grid-cols-3 gap-5">
          {matchedProfiles.map((profile) => (
            <div
              key={profile.id}
              className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
            >
              <img
                src={profile.imageUrl}
                alt={profile.moniker}
                className="w-full h-48 object-cover"
              />

              <div className="p-5">
                <h3 className="font-semibold">{profile.moniker}</h3>

                <p className="text-xs text-white/60 mt-2">{profile.bio}</p>

                <button
                  onClick={() => onSelectProfile?.(profile)}
                  className="w-full mt-5 py-3 rounded-xl bg-green-400 text-black font-semibold"
                >
                  View Match
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MeetupsView;
