"use client";

import React, { useState, useEffect, useMemo, useId } from "react";

import Image from "next/image";

import { motion, useReducedMotion } from "framer-motion";

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

import type { Profile } from "../lib/types";

type MatchMode = "dating" | "friends" | "networking";

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
  lastRapidIncrease: number;
  pulseTrigger: number;
  borderGlowTrigger: number;
  activityLog: ActivityLog[];
}

const tabs = [
  {
    key: "hangouts",
    label: "📍 Local Hangouts",
  },
  {
    key: "tribes",
    label: "🔥 Tribal Nodes",
  },
] as const;

export function MeetupsView({
  userTribeKeys,
  onTribeJoined,
  onSelectProfile,
  matchMode,
}: MeetupsViewProps) {
  const shouldReduceMotion = useReducedMotion();

  const searchId = useId();

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

  const filteredMeetups = useMemo(() => {
    return MOCK_MEETUPS.filter((m) => {
      const matchesSearch =
        m.title.toLowerCase().includes(search.toLowerCase()) ||
        m.description.toLowerCase().includes(search.toLowerCase());

      const matchesFilter = vibeFilter === "All" || m.category === vibeFilter;

      return matchesSearch && matchesFilter;
    });
  }, [search, vibeFilter]);

  const filteredTribes = useMemo(() => {
    return MOCK_TRIBES.filter(
      (t) =>
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.description.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]);

  const handleJoinMeetup = (id: string) => {
    setJoinedMeetupIds((prev) =>
      prev.includes(id) ? prev.filter((mId) => mId !== id) : [...prev, id],
    );

    const compatible = MOCK_PROFILES.find((p) => p.matchMode === matchMode);

    if (compatible) {
      onSelectProfile(compatible);
    }
  };

  return (
    <section aria-label="Meetups and tribes" className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        {/* Tabs */}
        <div
          role="tablist"
          aria-label="View options"
          className="
            flex
            w-full
            flex-wrap
            gap-3
            lg:w-auto
          "
        >
          {tabs.map((t) => {
            const active = tab === t.key;

            return (
              <button
                key={t.key}
                role="tab"
                type="button"
                aria-selected={active}
                aria-controls={`${t.key}-panel`}
                id={`${t.key}-tab`}
                onClick={() => setTab(t.key as "hangouts" | "tribes")}
                className={`
                  min-h-[48px]
                  rounded-2xl
                  px-5
                  py-3
                  text-sm
                  font-semibold
                  transition-all
                  duration-200
                  focus:outline-none
                  focus-visible:ring-4
                  focus-visible:ring-green-400/30
                  ${
                    active
                      ? "bg-green-400 text-black shadow-lg shadow-green-500/20"
                      : "border border-white/10 bg-white/5 text-white hover:bg-white/10"
                  }
                `}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative w-full lg:max-w-md">
          <label htmlFor={searchId} className="sr-only">
            Search meetups or tribes
          </label>

          <Search
            aria-hidden="true"
            className="
              absolute
              left-4
              top-1/2
              h-4
              w-4
              -translate-y-1/2
              text-white/40
            "
          />

          <input
            id={searchId}
            type="search"
            autoComplete="off"
            placeholder={`Search ${tab}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full
              rounded-2xl
              border
              border-white/10
              bg-black/40
              py-3
              pl-11
              pr-4
              text-sm
              text-white
              placeholder:text-white/40
              outline-none
              backdrop-blur-xl
              transition-all
              focus:border-green-400/50
              focus:ring-4
              focus:ring-green-400/20
            "
          />
        </div>
      </div>

      {/* Trending */}
      <section
        aria-labelledby="trending-vibes"
        className="
          overflow-hidden
          rounded-3xl
          border
          border-white/10
          bg-white/[0.04]
          p-4
          sm:p-6
          backdrop-blur-2xl
        "
      >
        <div className="mb-5 flex items-center gap-3">
          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-2xl
              bg-green-400/10
            "
          >
            <Sparkles className="h-5 w-5 text-green-400" />
          </div>

          <div>
            <h2
              id="trending-vibes"
              className="
                text-sm
                font-semibold
                uppercase
                tracking-[0.18em]
                text-white
              "
            >
              Trending Vibes
            </h2>

            <p className="text-xs text-white/50">
              Live emotional sync activity
            </p>
          </div>
        </div>

        <div
          className="
            grid
            grid-cols-1
            gap-4
            sm:grid-cols-2
            xl:grid-cols-3
          "
        >
          {trendingVibes.map((vibe, index) => (
            <motion.button
              key={vibe.tag}
              type="button"
              whileHover={
                shouldReduceMotion
                  ? {}
                  : {
                      y: -4,
                      scale: 1.02,
                    }
              }
              whileTap={
                shouldReduceMotion
                  ? {}
                  : {
                      scale: 0.98,
                    }
              }
              onClick={() => handleBoostVibe(index)}
              aria-label={`Boost ${vibe.tag} vibe`}
              className={`
                  relative
                  overflow-hidden
                  rounded-3xl
                  border
                  p-5
                  text-left
                  transition-all
                  duration-300
                  focus:outline-none
                  focus-visible:ring-4
                  focus-visible:ring-pink-500/30
                  ${
                    vibe.isHot
                      ? "border-pink-500/40 bg-pink-500/10 shadow-lg shadow-pink-500/10"
                      : "border-white/10 bg-white/[0.03]"
                  }
                `}
            >
              <div className="flex items-start justify-between">
                <div className="text-3xl">{vibe.icon}</div>

                <div
                  className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-2xl
                      bg-green-400/10
                    "
                >
                  <TrendingUp className="h-5 w-5 text-green-400" />
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold text-white">{vibe.tag}</h3>

                <p className="mt-2 text-sm text-green-400">
                  {vibe.count.toLocaleString()} syncs
                </p>
              </div>

              {vibe.isHot && (
                <div
                  className="
                      absolute
                      right-4
                      top-4
                      rounded-full
                      bg-pink-500/20
                      px-3
                      py-1
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-widest
                      text-pink-300
                    "
                >
                  Hot
                </div>
              )}
            </motion.button>
          ))}
        </div>
      </section>

      {/* Hangouts */}
      {tab === "hangouts" && (
        <section
          id="hangouts-panel"
          role="tabpanel"
          aria-labelledby="hangouts-tab"
        >
          <div
            className="
              grid
              grid-cols-1
              gap-5
              lg:grid-cols-2
            "
          >
            {filteredMeetups.map((m) => {
              const joined = joinedMeetupIds.includes(m.id);

              return (
                <motion.article
                  key={m.id}
                  initial={
                    shouldReduceMotion
                      ? false
                      : {
                          opacity: 0,
                          y: 20,
                        }
                  }
                  animate={
                    shouldReduceMotion
                      ? {}
                      : {
                          opacity: 1,
                          y: 0,
                        }
                  }
                  className="
                    rounded-3xl
                    border
                    border-white/10
                    bg-white/[0.04]
                    p-5
                    backdrop-blur-2xl
                  "
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {m.title}
                      </h3>

                      <p className="mt-3 text-sm leading-relaxed text-white/65">
                        {m.description}
                      </p>
                    </div>

                    <div
                      className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-2xl
                        bg-green-400/10
                      "
                    >
                      <Users className="h-5 w-5 text-green-400" />
                    </div>
                  </div>

                  <div
                    className="
                      mt-5
                      flex
                      flex-wrap
                      items-center
                      gap-3
                    "
                  >
                    <div
                      className="
                        flex
                        items-center
                        gap-2
                        rounded-full
                        bg-white/5
                        px-4
                        py-2
                        text-xs
                        text-white/70
                      "
                    >
                      <Music className="h-4 w-4" />
                      {m.music}
                    </div>

                    <div
                      className="
                        rounded-full
                        bg-green-400/10
                        px-4
                        py-2
                        text-xs
                        font-medium
                        text-green-300
                      "
                    >
                      {m.category}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleJoinMeetup(m.id)}
                    aria-pressed={joined}
                    className={`
                      mt-6
                      flex
                      min-h-[50px]
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-2xl
                      px-4
                      py-3
                      text-sm
                      font-semibold
                      transition-all
                      duration-200
                      focus:outline-none
                      focus-visible:ring-4
                      focus-visible:ring-green-400/30
                      ${
                        joined
                          ? "bg-purple-500 text-black"
                          : "bg-green-400 text-black hover:brightness-110"
                      }
                    `}
                  >
                    {joined ? (
                      <>
                        <CheckCircle2 className="h-4 w-4" />
                        Joined
                      </>
                    ) : (
                      <>
                        <Ticket className="h-4 w-4" />
                        Join Meetup
                      </>
                    )}
                  </button>
                </motion.article>
              );
            })}
          </div>
        </section>
      )}

      {/* Tribes */}
      {tab === "tribes" && (
        <section id="tribes-panel" role="tabpanel" aria-labelledby="tribes-tab">
          <div
            className="
              grid
              grid-cols-1
              gap-5
              sm:grid-cols-2
              xl:grid-cols-3
            "
          >
            {filteredTribes.map((t) => {
              const joined = userTribeKeys.includes(t.name);

              return (
                <motion.article
                  key={t.id}
                  initial={
                    shouldReduceMotion
                      ? false
                      : {
                          opacity: 0,
                          y: 20,
                        }
                  }
                  animate={
                    shouldReduceMotion
                      ? {}
                      : {
                          opacity: 1,
                          y: 0,
                        }
                  }
                  className="
                    overflow-hidden
                    rounded-3xl
                    border
                    border-white/10
                    bg-white/[0.04]
                    backdrop-blur-2xl
                  "
                >
                  <div className="relative h-44 w-full">
                    <Image
                      src={t.imageUrl}
                      alt={t.name}
                      fill
                      className="object-cover"
                    />

                    <div
                      className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-black
                        to-transparent
                      "
                    />
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-white">
                      {t.name}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-white/65">
                      {t.description}
                    </p>

                    <button
                      type="button"
                      onClick={() => onTribeJoined(t.name)}
                      aria-pressed={joined}
                      className={`
                        mt-6
                        flex
                        min-h-[50px]
                        w-full
                        items-center
                        justify-center
                        rounded-2xl
                        px-4
                        py-3
                        text-sm
                        font-semibold
                        transition-all
                        duration-200
                        focus:outline-none
                        focus-visible:ring-4
                        focus-visible:ring-green-400/30
                        ${
                          joined
                            ? "bg-green-400 text-black"
                            : "border border-white/10 bg-white/10 text-white hover:bg-white/20"
                        }
                      `}
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
    </section>
  );
}

export default MeetupsView;
