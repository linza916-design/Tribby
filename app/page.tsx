"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  Search,
  Music,
  TrendingUp,
  Users,
  Sparkles,
  Ticket,
  CheckCircle2,
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

  const handleJoinMeetup = (id: string) => {
    setJoinedMeetupIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

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

  return (
    <main
      className="
        mx-auto
        max-w-7xl
        px-4
        sm:px-6
        lg:px-8
        py-6
        space-y-10
      "
    >
      {/* Skip link */}
      <a
        href="#main-content"
        className="
          sr-only
          focus:not-sr-only
          focus:absolute
          focus:top-4
          focus:left-4
          focus:z-50
          focus:bg-black
          focus:text-white
          focus:px-4
          focus:py-2
          focus:rounded-lg
        "
      >
        Skip to content
      </a>

      {/* Tabs */}
      <section aria-labelledby="section-tabs">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-green-400" />

          <h2 id="section-tabs" className="text-lg font-semibold text-white">
            Discover Communities
          </h2>
        </div>

        <div
          role="tablist"
          aria-label="Meetup sections"
          className="flex flex-wrap gap-3"
        >
          {["hangouts", "tribes"].map((t) => {
            const active = tab === t;

            return (
              <button
                key={t}
                role="tab"
                type="button"
                aria-selected={active}
                aria-controls={`${t}-panel`}
                id={`${t}-tab`}
                tabIndex={active ? 0 : -1}
                onClick={() => setTab(t as "hangouts" | "tribes")}
                className={`
                  min-h-[44px]
                  rounded-xl
                  px-5
                  py-3
                  text-sm
                  font-semibold
                  transition-all
                  focus:outline-none
                  focus-visible:ring-4
                  focus-visible:ring-green-400/40
                  ${
                    active
                      ? "bg-green-400 text-black"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }
                `}
              >
                {t === "hangouts" ? "📍 Local Hangouts" : "🔥 Tribal Nodes"}
              </button>
            );
          })}
        </div>
      </section>

      {/* Search */}
      <section aria-labelledby="search-section">
        <h2 id="search-section" className="sr-only">
          Search
        </h2>

        <div className="relative">
          <label htmlFor="meetup-search" className="sr-only">
            Search meetups or tribes
          </label>

          <Search
            aria-hidden="true"
            className="
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              w-4
              h-4
              text-white/50
            "
          />

          <input
            id="meetup-search"
            type="search"
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
              pl-10
              pr-4
              py-3
              text-sm
              text-white
              placeholder:text-white/50
              focus:outline-none
              focus-visible:ring-4
              focus-visible:ring-green-400/40
            "
          />
        </div>
      </section>

      {/* Filters */}
      {tab === "hangouts" && (
        <section aria-labelledby="filters-heading">
          <h2 id="filters-heading" className="sr-only">
            Meetup Filters
          </h2>

          <div className="flex flex-wrap gap-3">
            {categories.map((category) => {
              const active = vibeFilter === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setVibeFilter(category)}
                  aria-pressed={active}
                  className={`
                    min-h-[44px]
                    rounded-full
                    px-4
                    py-2
                    text-sm
                    transition
                    focus:outline-none
                    focus-visible:ring-4
                    focus-visible:ring-green-400/40
                    ${
                      active
                        ? "bg-green-400 text-black"
                        : "bg-white/10 text-white hover:bg-white/20"
                    }
                  `}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* Trending vibes */}
      <section aria-labelledby="trending-vibes" id="main-content">
        <div className="flex items-center gap-2 mb-5">
          <TrendingUp className="w-5 h-5 text-pink-400" />

          <h2 id="trending-vibes" className="text-lg font-semibold text-white">
            Trending Vibes
          </h2>
        </div>

        <div aria-live="polite" className="sr-only">
          Trending vibes updated
        </div>

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-3
            gap-4
          "
        >
          {trendingVibes.map((v, i) => (
            <motion.button
              key={v.tag}
              type="button"
              whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
              onClick={() => handleBoostVibe(i)}
              aria-label={`Boost ${v.tag} vibe`}
              className={`
                text-left
                rounded-2xl
                border
                p-5
                backdrop-blur-xl
                transition-all
                focus:outline-none
                focus-visible:ring-4
                focus-visible:ring-pink-400/40
                ${
                  v.isHot
                    ? "border-pink-500 shadow-lg shadow-pink-500/20"
                    : "border-white/10 bg-white/5"
                }
              `}
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl">{v.icon}</span>

                <TrendingUp className="w-4 h-4 text-green-400" />
              </div>

              <h3 className="mt-4 text-lg font-semibold text-white">{v.tag}</h3>

              <p className="mt-1 text-sm text-green-400">
                {v.count.toLocaleString()} syncs
              </p>

              <div className="mt-4 flex items-center gap-2 text-xs text-zinc-300">
                <Users className="w-4 h-4" />
                Live community growth
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Profiles */}
      <section aria-labelledby="recommended-connections">
        <div className="flex items-center gap-2 mb-5">
          <Users className="w-5 h-5 text-cyan-400" />

          <h2
            id="recommended-connections"
            className="
              text-lg
              font-semibold
              text-white
            "
          >
            Recommended Connections
          </h2>
        </div>

        {matchedProfiles.length === 0 ? (
          <div
            role="status"
            className="
              rounded-2xl
              border
              border-white/10
              bg-white/5
              p-6
              text-zinc-300
            "
          >
            No matching profiles found.
          </div>
        ) : (
          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              xl:grid-cols-3
              gap-5
            "
          >
            {matchedProfiles.map((profile) => (
              <article
                key={profile.id}
                className="
                  overflow-hidden
                  rounded-3xl
                  border
                  border-white/10
                  bg-white/5
                  backdrop-blur-xl
                "
              >
                <div className="relative h-52 w-full">
                  <Image
                    src={profile.imageUrl}
                    alt={`${profile.moniker} profile picture`}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-lg font-semibold text-white">
                      {profile.moniker}
                    </h3>

                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                    {profile.bio}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {profile.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="
                          rounded-full
                          bg-white/10
                          px-3
                          py-1
                          text-xs
                          text-zinc-200
                        "
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectProfile(profile)}
                    className="
                      mt-5
                      w-full
                      min-h-[48px]
                      rounded-xl
                      bg-green-400
                      px-4
                      py-3
                      font-semibold
                      text-black
                      transition
                      hover:opacity-90
                      focus:outline-none
                      focus-visible:ring-4
                      focus-visible:ring-green-400/40
                    "
                  >
                    View Match
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Hangouts */}
      {tab === "hangouts" && (
        <section
          id="hangouts-panel"
          role="tabpanel"
          aria-labelledby="hangouts-tab"
        >
          <div className="flex items-center gap-2 mb-5">
            <Ticket className="w-5 h-5 text-yellow-400" />

            <h2 className="text-lg font-semibold text-white">Local Hangouts</h2>
          </div>

          {filteredMeetups.length === 0 ? (
            <div
              role="status"
              className="
                rounded-2xl
                border
                border-white/10
                bg-white/5
                p-6
                text-zinc-300
              "
            >
              No meetups found matching your search.
            </div>
          ) : (
            <div
              className="
                grid
                grid-cols-1
                lg:grid-cols-2
                gap-5
              "
            >
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
                      p-6
                      backdrop-blur-xl
                    "
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {m.title}
                        </h3>

                        <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                          {m.description}
                        </p>
                      </div>

                      <span
                        className="
                          rounded-full
                          bg-green-400/10
                          px-3
                          py-1
                          text-xs
                          text-green-300
                        "
                      >
                        {m.category}
                      </span>
                    </div>

                    <div className="mt-4 flex items-center gap-2 text-sm text-zinc-300">
                      <Music className="w-4 h-4 text-pink-400" />
                      <span>{m.music}</span>
                    </div>

                    <button
                      type="button"
                      aria-pressed={joined}
                      onClick={() => handleJoinMeetup(m.id)}
                      className="
                        mt-6
                        w-full
                        min-h-[48px]
                        rounded-xl
                        bg-green-400
                        px-4
                        py-3
                        font-semibold
                        text-black
                        transition
                        hover:opacity-90
                        focus:outline-none
                        focus-visible:ring-4
                        focus-visible:ring-green-400/40
                      "
                    >
                      {joined ? "Joined ✓" : "Join Meetup"}
                    </button>
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
          <div className="flex items-center gap-2 mb-5">
            <Users className="w-5 h-5 text-purple-400" />

            <h2 className="text-lg font-semibold text-white">Tribal Nodes</h2>
          </div>

          {filteredTribes.length === 0 ? (
            <div
              role="status"
              className="
                rounded-2xl
                border
                border-white/10
                bg-white/5
                p-6
                text-zinc-300
              "
            >
              No tribes found matching your search.
            </div>
          ) : (
            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                xl:grid-cols-3
                gap-5
              "
            >
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
                      backdrop-blur-xl
                    "
                  >
                    <div className="relative h-40 w-full">
                      <Image
                        src={t.imageUrl}
                        alt={`${t.name} tribe cover`}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-white">
                        {t.name}
                      </h3>

                      <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                        {t.description}
                      </p>

                      <button
                        type="button"
                        aria-pressed={joined}
                        onClick={() => onTribeJoined(t.name)}
                        className={`
                          mt-5
                          w-full
                          min-h-[48px]
                          rounded-xl
                          px-4
                          py-3
                          font-semibold
                          transition
                          focus:outline-none
                          focus-visible:ring-4
                          focus-visible:ring-green-400/40
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
    </main>
  );
};

export default MeetupsView;
