"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
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

const TABS = [
  { key: "hangouts", label: "📍 Local Hangouts" },
  { key: "tribes", label: "🔥 Tribal Nodes" },
] as const;

export const MeetupsView: React.FC<MeetupsViewProps> = ({
  onTribeJoined,
  userTribeKeys,
}) => {
  const prefersReducedMotion = useReducedMotion();

  const [tab, setTab] = useState<"hangouts" | "tribes">("hangouts");
  const [search, setSearch] = useState("");
  const [joinedMeetupIds, setJoinedMeetupIds] = useState<string[]>([]);
  const [vibeFilter] = useState("All");

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
    if (prefersReducedMotion) return;

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
  }, [prefersReducedMotion]);

  const handleBoostVibe = (index: number) => {
    setTrendingVibes((prev) => {
      const copy = [...prev];
      const now = Date.now();

      copy[index] = {
        ...copy[index],
        count: copy[index].count + 15,
        isHot: true,
        pulseTrigger: copy[index].pulseTrigger + 1,
        borderGlowTrigger: copy[index].borderGlowTrigger + 1,
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
  };

  return (
    <section
      aria-label="Meetups and tribes"
      className="w-full space-y-6 sm:space-y-8"
    >
      {/* Header */}
      <header className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">
          Discover Your Community
        </h1>

        <p className="max-w-2xl text-sm sm:text-base text-white/70 leading-relaxed">
          Find local hangouts, trending vibes, and interest-based tribes that
          match your energy.
        </p>
      </header>

      {/* Tabs */}
      <div
        role="tablist"
        aria-label="Meetup sections"
        className="flex flex-col sm:flex-row gap-3"
      >
        {TABS.map((t) => {
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
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-green-400
                focus-visible:ring-offset-2
                focus-visible:ring-offset-black
                ${
                  active
                    ? "bg-green-400 text-black"
                    : "bg-white/10 text-white hover:bg-white/20"
                }
              `}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Search */}
      <div className="space-y-2">
        <label
          htmlFor="meetup-search"
          className="text-sm font-medium text-white"
        >
          Search communities
        </label>

        <div className="relative">
          <Search
            aria-hidden="true"
            className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50"
          />

          <input
            id="meetup-search"
            type="search"
            inputMode="search"
            autoComplete="off"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search ${tab}...`}
            aria-label={`Search ${tab}`}
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
              focus:outline-none
              focus:ring-2
              focus:ring-green-400
              min-h-[52px]
            "
          />
        </div>
      </div>

      {/* Trending */}
      <section
        aria-labelledby="trending-vibes-heading"
        className="rounded-3xl border border-white/10 bg-white/5 p-4 sm:p-6"
      >
        <div className="mb-5 flex items-center gap-2">
          <Sparkles aria-hidden="true" className="h-4 w-4 text-green-400" />

          <h2
            id="trending-vibes-heading"
            className="text-xs font-semibold uppercase tracking-[0.25em] text-white/70"
          >
            Trending Vibes
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {trendingVibes.map((v, i) => (
            <motion.button
              key={v.tag}
              type="button"
              whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
              whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
              onClick={() => handleBoostVibe(i)}
              aria-label={`Boost ${v.tag} vibe`}
              className={`
                rounded-2xl
                border
                p-5
                text-left
                transition-all
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-pink-400
                min-h-[160px]
                ${
                  v.isHot
                    ? "border-pink-500 shadow-lg shadow-pink-500/20"
                    : "border-white/10"
                }
                bg-black/30
                hover:bg-black/40
              `}
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl" aria-hidden="true">
                  {v.icon}
                </span>

                <TrendingUp
                  aria-hidden="true"
                  className="h-4 w-4 text-green-400"
                />
              </div>

              <h3 className="mt-4 text-lg font-semibold text-white">{v.tag}</h3>

              <p className="mt-2 text-sm text-green-400">
                {v.count.toLocaleString()} syncs
              </p>

              <span className="sr-only">
                {v.isHot
                  ? "Currently trending rapidly"
                  : "Normal trend activity"}
              </span>
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
          <div className="mb-5">
            <h2 className="text-xl font-semibold text-white">Local Hangouts</h2>

            <p className="mt-1 text-sm text-white/60">
              Meet people through shared experiences and events.
            </p>
          </div>

          {filteredMeetups.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/10 p-8 text-center text-white/60">
              No hangouts found for your search.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              {filteredMeetups.map((m) => {
                const joined = joinedMeetupIds.includes(m.id);

                return (
                  <article
                    key={m.id}
                    className="
                      rounded-3xl
                      border
                      border-white/10
                      bg-white/5
                      p-5
                      backdrop-blur-xl
                    "
                  >
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {m.title}
                        </h3>

                        <p className="mt-2 text-sm leading-relaxed text-white/65">
                          {m.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-white/75">
                        <Music aria-hidden="true" className="h-4 w-4" />

                        <span>{m.music}</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleJoinMeetup(m.id)}
                        aria-pressed={joined}
                        className={`
                          flex
                          min-h-[52px]
                          w-full
                          items-center
                          justify-center
                          rounded-2xl
                          px-4
                          py-3
                          text-sm
                          font-semibold
                          transition-all
                          focus-visible:outline-none
                          focus-visible:ring-2
                          focus-visible:ring-green-400
                          ${
                            joined
                              ? "bg-purple-500 text-black"
                              : "bg-green-400 text-black hover:brightness-110"
                          }
                        `}
                      >
                        {joined ? (
                          <>
                            <CheckCircle2
                              aria-hidden="true"
                              className="mr-2 h-4 w-4"
                            />
                            Joined
                          </>
                        ) : (
                          <>
                            <Ticket
                              aria-hidden="true"
                              className="mr-2 h-4 w-4"
                            />
                            Join Meetup
                          </>
                        )}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      )}

      {/* Tribes */}
      {tab === "tribes" && (
        <section id="tribes-panel" role="tabpanel" aria-labelledby="tribes-tab">
          <div className="mb-5">
            <h2 className="text-xl font-semibold text-white">Tribal Nodes</h2>

            <p className="mt-1 text-sm text-white/60">
              Connect with people who share your passions and interests.
            </p>
          </div>

          {filteredTribes.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/10 p-8 text-center text-white/60">
              No tribes found for your search.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filteredTribes.map((t) => {
                const joined = userTribeKeys.includes(t.name);

                return (
                  <article
                    key={t.id}
                    className="
                      overflow-hidden
                      rounded-3xl
                      border
                      border-white/10
                      bg-white/5
                    "
                  >
                    <img
                      src={t.imageUrl}
                      alt={`${t.name} tribe`}
                      className="h-44 w-full object-cover"
                      loading="lazy"
                    />

                    <div className="space-y-4 p-5">
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {t.name}
                        </h3>

                        <p className="mt-2 text-sm leading-relaxed text-white/65">
                          {t.description}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => onTribeJoined(t.name)}
                        aria-pressed={joined}
                        className={`
                          min-h-[52px]
                          w-full
                          rounded-2xl
                          px-4
                          py-3
                          text-sm
                          font-semibold
                          transition-all
                          focus-visible:outline-none
                          focus-visible:ring-2
                          focus-visible:ring-green-400
                          ${
                            joined
                              ? "bg-green-400 text-black"
                              : "bg-white/10 text-white hover:bg-white/20"
                          }
                        `}
                      >
                        {joined ? "Synced ✓" : "Connect Node"}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      )}
    </section>
  );
};

export default MeetupsView;
