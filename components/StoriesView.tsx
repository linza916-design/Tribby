"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Heart,
  MessageCircle,
  Share2,
  Music,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Send,
} from "lucide-react";

import { MOCK_STORIES } from "../lib/data";

interface StoriesViewProps {
  onClose: () => void;
}

const ui = {
  container: `
    fixed
    inset-0
    z-50
    flex
    items-center
    justify-center
    bg-black/95
    p-0
    md:p-6
  `,

  card: `
    relative
    flex
    h-screen
    w-full
    flex-col
    overflow-hidden
    bg-[#0B0B12]
    md:h-[820px]
    md:max-w-md
    md:rounded-[34px]
    border
    border-white/10
    shadow-2xl
  `,

  blur: `
    absolute
    inset-0
    scale-110
    blur-3xl
    opacity-20
  `,

  progressWrap: `
    absolute
    left-4
    right-4
    top-4
    z-30
    flex
    gap-2
  `,

  progress: `
    h-1
    flex-1
    overflow-hidden
    rounded-full
    bg-white/20
  `,

  progressFill: `
    h-full
    rounded-full
    bg-gradient-to-r
    from-fuchsia-500
    to-rose-400
  `,

  header: `
    absolute
    left-4
    right-4
    top-8
    z-30
    flex
    items-center
    justify-between
  `,

  avatar: `
    relative
    h-11
    w-11
    overflow-hidden
    rounded-full
    border-2
    border-fuchsia-500
  `,

  close: `
    flex
    h-10
    w-10
    items-center
    justify-center
    rounded-full
    border
    border-white/10
    bg-white/10
    text-white
    backdrop-blur-xl
    transition-all
    hover:bg-white/20
    focus:outline-none
    focus-visible:ring-4
    focus-visible:ring-fuchsia-400/40
  `,

  hero: `
    relative
    h-[65%]
    w-full
    overflow-hidden
  `,

  overlay: `
    absolute
    inset-0
    bg-gradient-to-t
    from-black
    via-transparent
    to-black/50
  `,

  drawer: `
    flex
    flex-1
    flex-col
    justify-between
    bg-gradient-to-t
    from-black
    via-black/95
    to-black/70
    p-5
    backdrop-blur-2xl
  `,

  text: `
    text-sm
    leading-relaxed
    text-zinc-100
  `,

  tag: `
    rounded-full
    border
    border-fuchsia-500/20
    bg-fuchsia-500/10
    px-3
    py-1
    text-xs
    text-fuchsia-200
  `,

  music: `
    mt-4
    flex
    items-center
    gap-3
    rounded-2xl
    border
    border-white/10
    bg-white/5
    p-4
    text-white
    backdrop-blur-xl
  `,

  actions: `
    flex
    items-center
    justify-between
    border-t
    border-white/10
    pt-4
  `,

  btn: `
    flex
    min-h-[44px]
    items-center
    gap-2
    rounded-xl
    px-3
    py-2
    text-sm
    text-white/80
    transition-all
    hover:bg-white/10
    hover:text-white
    focus:outline-none
    focus-visible:ring-4
    focus-visible:ring-fuchsia-400/40
  `,

  comments: `
    mt-4
    max-h-24
    overflow-auto
    rounded-2xl
    border
    border-white/10
    bg-white/5
    p-4
    text-sm
    text-zinc-200
  `,

  input: `
    flex-1
    rounded-xl
    border
    border-white/10
    bg-black/40
    px-4
    py-3
    text-sm
    text-white
    outline-none
    placeholder:text-white/40
    focus-visible:ring-4
    focus-visible:ring-fuchsia-400/30
  `,

  send: `
    flex
    min-h-[48px]
    items-center
    justify-center
    gap-2
    rounded-xl
    bg-gradient-to-r
    from-fuchsia-500
    to-rose-400
    px-4
    py-3
    text-sm
    font-medium
    text-white
    transition-all
    hover:opacity-90
    focus:outline-none
    focus-visible:ring-4
    focus-visible:ring-fuchsia-400/40
  `,
};

export const StoriesView: React.FC<StoriesViewProps> = ({
  onClose,
}) => {
  const shouldReduceMotion = useReducedMotion();

  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const [liked, setLiked] = useState<
    Record<string, boolean>
  >({});

  const [showHeart, setShowHeart] = useState(false);

  const [comment, setComment] = useState("");

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const story = MOCK_STORIES[index];

  useEffect(() => {
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          next();
          return 0;
        }

        return p + 1;
      });
    }, 60);

    return () => clearInterval(interval);
  }, [index]);

  const next = () => {
    setIndex((i) =>
      i >= MOCK_STORIES.length - 1
        ? (onClose(), 0)
        : i + 1,
    );
  };

  const prev = () => {
    setIndex((i) => (i <= 0 ? 0 : i - 1));
  };

  const handleDoubleLike = () => {
    setLiked((prev) => ({
      ...prev,
      [story.id]: true,
    }));

    setShowHeart(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setShowHeart(false);
    }, 800);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();

      if (e.key === "ArrowLeft") prev();

      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
  }, []);

  return (
    <div
      className={ui.container}
      role="dialog"
      aria-modal="true"
      aria-label="Stories viewer"
    >
      <div className={ui.card}>
        {/* Background blur */}
        <div
          className={ui.blur}
          style={{
            backgroundImage: `url(${story.bgUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Progress bars */}
        <div className={ui.progressWrap}>
          {MOCK_STORIES.map((s, i) => (
            <div
              key={s.id}
              className={ui.progress}
              aria-hidden="true"
            >
              <div
                className={ui.progressFill}
                style={{
                  width:
                    i < index
                      ? "100%"
                      : i === index
                      ? `${progress}%`
                      : "0%",
                }}
              />
            </div>
          ))}
        </div>

        {/* Header */}
        <header className={ui.header}>
          <div className="flex items-center gap-3">
            <div className={ui.avatar}>
              <Image
                src={story.avatarUrl}
                alt={`${story.userMoniker} avatar`}
                fill
                className="object-cover"
              />
            </div>

            <div>
              <div className="text-sm font-medium text-white">
                {story.userMoniker}
              </div>

              <div className="text-xs text-zinc-400">
                {story.badge}
              </div>
            </div>
          </div>

          <button
            type="button"
            aria-label="Close stories"
            onClick={onClose}
            className={ui.close}
          >
            ✕
          </button>
        </header>

        {/* Navigation overlays */}
        <button
          type="button"
          aria-label="Previous story"
          onClick={prev}
          className="
            absolute
            left-0
            top-0
            z-20
            h-full
            w-1/3
          "
        />

        <button
          type="button"
          aria-label="Next story"
          onClick={next}
          className="
            absolute
            right-0
            top-0
            z-20
            h-full
            w-1/3
          "
        />

        {/* Story Image */}
        <div
          className={ui.hero}
          onDoubleClick={handleDoubleLike}
        >
          <motion.div
            key={story.id}
            initial={
              shouldReduceMotion
                ? false
                : {
                    scale: 1.05,
                    opacity: 0.9,
                  }
            }
            animate={
              shouldReduceMotion
                ? {}
                : {
                    scale: 1,
                    opacity: 1,
                  }
            }
            transition={{ duration: 0.45 }}
            className="relative h-full w-full"
          >
            <Image
              src={story.bgUrl}
              alt={`Story by ${story.userMoniker}`}
              fill
              priority
              className="object-cover"
            />
          </motion.div>

          <div className={ui.overlay} />

          {/* Heart animation */}
          <AnimatePresence>
            {showHeart && (
              <motion.div
                initial={{
                  scale: 0.3,
                  opacity: 0,
                }}
                animate={{
                  scale: 1,
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.8,
                }}
                className="
                  absolute
                  inset-0
                  flex
                  items-center
                  justify-center
                "
              >
                <Heart
                  className="
                    h-24
                    w-24
                    fill-fuchsia-500
                    text-fuchsia-500
                    drop-shadow-2xl
                  "
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Side arrows */}
          <div
            className="
              absolute
              bottom-6
              left-4
              z-20
              flex
              gap-3
            "
          >
            <button
              type="button"
              aria-label="Previous story"
              onClick={prev}
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                border
                border-white/10
                bg-black/40
                text-white
                backdrop-blur-xl
                transition-all
                hover:bg-white/10
                focus:outline-none
                focus-visible:ring-4
                focus-visible:ring-white/30
              "
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              aria-label="Next story"
              onClick={next}
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                border
                border-white/10
                bg-black/40
                text-white
                backdrop-blur-xl
                transition-all
                hover:bg-white/10
                focus:outline-none
                focus-visible:ring-4
                focus-visible:ring-white/30
              "
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Bottom drawer */}
        <div className={ui.drawer}>
          <div>
            {/* Story text */}
            <p className={ui.text}>{story.text}</p>

            {/* Tags */}
            <div className="mt-3 flex flex-wrap gap-2">
              {story.tags.map((t, i) => (
                <span
                  key={i}
                  className={ui.tag}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Audio card */}
            <div className={ui.music}>
              <Music className="h-5 w-5 text-pink-400" />

              <div className="flex-1">
                <p className="text-sm font-medium">
                  Live Audio Vibe
                </p>

                <p className="text-xs text-zinc-400">
                  Ambient emotional stream
                </p>
              </div>

              <Sparkles className="h-5 w-5 text-fuchsia-300" />
            </div>
          </div>

          {/* Actions */}
          <div>
            <div className={ui.actions}>
              <button
                type="button"
                aria-pressed={liked[story.id]}
                className={ui.btn}
                onClick={handleDoubleLike}
              >
                <Heart
                  className={`h-5 w-5 ${
                    liked[story.id]
                      ? "fill-fuchsia-500 text-fuchsia-500"
                      : ""
                  }`}
                />

                <span>Like</span>
              </button>

              <button
                type="button"
                className={ui.btn}
              >
                <MessageCircle className="h-5 w-5" />

                <span>Reply</span>
              </button>

              <button
                type="button"
                className={ui.btn}
              >
                <Share2 className="h-5 w-5" />

                <span>Share</span>
              </button>
            </div>

            {/* Comments */}
            <div
              className={ui.comments}
              aria-live="polite"
            >
              ✨ Live reactions flowing through the
              vibe stream...
            </div>

            {/* Reply input */}
            <div className="mt-4 flex gap-2">
              <label
                htmlFor="story-reply"
                className="sr-only"
              >
                Reply to story
              </label>

              <input
                id="story-reply"
                type="text"
                className={ui.input}
                value={comment}
                onChange={(e) =>
                  setComment(e.target.value)
                }
                placeholder="Reply to vibe..."
              />

              <button
                type="button"
                className={ui.send}
              >
                <Send className="h-4 w-4" />

                <span className="hidden sm:inline">
                  Post
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoriesView;