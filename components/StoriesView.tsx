import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  MessageCircle,
  Share2,
  Music,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  UserPlus,
  Flame,
} from "lucide-react";
import { MOCK_STORIES } from "../lib/data";

interface StoriesViewProps {
  onClose: () => void;
}

export const StoriesView: React.FC<StoriesViewProps> = ({ onClose }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [hasLiked, setHasLiked] = useState<Record<string, boolean>>({});
  const [showHeartOverlay, setShowHeartOverlay] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState<Record<string, string[]>>({
    story_1: [
      "This art gallery is incredible",
      "Which area is this?",
      "High vibration matches here! 🔋",
    ],
    story_2: [
      "Those modular rigs are insane",
      "Post the track ID",
      "Subterranean heavy! 🔊",
    ],
  });

  const activeStory = MOCK_STORIES[activeIndex];

  // Auto progression of stories
  useEffect(() => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          handleNext();
          return 0;
        }
        return p + 0.8; // fine-tune speed
      });
    }, 50);

    return () => clearInterval(interval);
  }, [activeIndex]);

  const handleNext = () => {
    setActiveIndex((prev) => {
      if (prev >= MOCK_STORIES.length - 1) {
        onClose();
        return 0;
      }
      return prev + 1;
    });
  };

  const handlePrev = () => {
    setActiveIndex((prev) => {
      if (prev <= 0) return 0;
      return prev - 1;
    });
  };

  const handleDoubleTap = (e: React.MouseEvent) => {
    const doubleClickDelay = 300;
    // Check for double click simulation
    if (e.detail === 2) {
      setHasLiked((prev) => ({ ...prev, [activeStory.id]: true }));
      setShowHeartOverlay(true);
      setTimeout(() => setShowHeartOverlay(false), 800);
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    setComments((prev) => ({
      ...prev,
      [activeStory.id]: [...(prev[activeStory.id] || []), commentInput.trim()],
    }));
    setCommentInput("");
  };

  return (
    <div
      id="stories-view-container"
      className="fixed inset-0 bg-[#060606] z-50 flex items-center justify-center p-0 md:p-4 select-none"
    >
      {/* Background Ambient Blur */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-3xl opacity-20 transition-all duration-500 scale-105"
        style={{ backgroundImage: `url(${activeStory.bgUrl})` }}
      />

      <div className="w-full max-w-md h-full md:h-[800px] h-screen bg-[#111] md:rounded-2xl overflow-hidden relative border border-white/5 flex flex-col justify-between shadow-2xl">
        {/* Story Progress Bars */}
        <div className="absolute top-4 left-4 right-4 z-20 flex gap-1.5 p-1 rounded-full bg-black/10 backdrop-blur-md">
          {MOCK_STORIES.map((story, i) => (
            <div
              key={story.id}
              className="h-1 flex-1 bg-white/25 rounded-full overflow-hidden"
            >
              <div
                className="h-full bg-brand-green rounded-full transition-all duration-300 ease-out"
                style={{
                  width:
                    i < activeIndex
                      ? "100%"
                      : i === activeIndex
                        ? `${progress}%`
                        : "0%",
                }}
              />
            </div>
          ))}
        </div>

        {/* Story Creator Header */}
        <div className="absolute top-8 left-4 right-4 z-20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-brand-green bg-neutral-900 p-[1.5px]">
              <img
                referrerPolicy="no-referrer"
                src={activeStory.avatarUrl}
                alt={activeStory.userMoniker}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-display font-bold text-xs text-white">
                  {activeStory.userMoniker}
                </span>
                <span className="text-[10px] text-brand-green font-mono bg-brand-green/10 px-1.5 py-0.2 rounded">
                  {activeStory.badge}
                </span>
              </div>
              <span className="text-[9px] text-white/50 block text-left">
                Glow-box Area, Active 10m ago
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md flex items-center justify-center text-white text-xs border border-white/10"
          >
            ✕
          </button>
        </div>

        {/* Navigation Handlers (Left/Right Tap Zones) */}
        <div className="absolute inset-x-0 top-20 bottom-44 z-10 flex">
          <div
            onClick={handlePrev}
            className="w-1/3 h-full cursor-west-resize"
          />
          <div
            onClick={handleDoubleTap}
            className="w-1/3 h-full cursor-pointer flex items-center justify-center relative"
          >
            <AnimatePresence>
              {showHeartOverlay && (
                <motion.div
                  initial={{ scale: 0.2, rotate: -20, opacity: 0 }}
                  animate={{
                    scale: [0.2, 1.4, 1],
                    rotate: [0, -10, 0],
                    opacity: 1,
                  }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  className="pointer-events-none absolute"
                >
                  <Heart className="w-20 h-20 text-brand-green fill-brand-green drop-shadow-[0_0_15px_rgba(0,ff,136,0.6)]" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div
            onClick={handleNext}
            className="w-1/3 h-full cursor-east-resize"
          />
        </div>

        {/* Content Showcase Image */}
        <div className="w-full h-[65%] relative bg-black/90 flex items-center justify-center overflow-hidden">
          <motion.img
            key={activeStory.id}
            initial={{ scale: 1.05, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
            src={activeStory.bgUrl}
            alt="story content"
            className="w-full h-full object-cover"
          />
          {/* Wave overlay animation simulation */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 pointer-events-none" />
        </div>

        {/* Story Metadata & Text overlay */}
        <div className="p-4 bg-[#111] relative z-20 flex-1 flex flex-col justify-between">
          <div id="reels-text" className="space-y-2 text-left">
            <p className="text-xs text-white/90 leading-relaxed font-sans">
              {activeStory.text}
            </p>
            <div className="flex gap-1.5 flex-wrap">
              {activeStory.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-brand-green font-mono text-[9px] font-semibold"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="pt-2 flex items-center gap-2 text-[10px] text-white/50 bg-white/5 p-2 rounded-lg border border-white/5">
              <Music className="w-3.5 h-3.5 text-brand-green animate-pulse" />
              <span className="truncate font-sans tracking-wide">
                Juan Atkins & Cybotron - Clear (Retro Remix)
              </span>
            </div>
          </div>

          {/* Social Action metrics drawer */}
          <div className="flex items-center justify-between border-t border-white/5 pt-3.5 text-xs">
            {/* Quick Metrics */}
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() =>
                  setHasLiked((prev) => ({
                    ...prev,
                    [activeStory.id]: !prev[activeStory.id],
                  }))
                }
                className="flex items-center gap-1.5 hover:text-brand-green text-white/70 transition cursor-pointer"
              >
                <Heart
                  className={`w-4 h-4 ${hasLiked[activeStory.id] ? "text-brand-green fill-brand-green" : "text-white"}`}
                />
                <span className="font-mono text-[10px]">
                  {hasLiked[activeStory.id] ? "2.5k" : activeStory.likes}
                </span>
              </button>

              <div className="flex items-center gap-1.5 text-white/70 cursor-pointer">
                <MessageCircle className="w-4 h-4 text-white" />
                <span className="font-mono text-[10px]">
                  {comments[activeStory.id]?.length || 0}
                </span>
              </div>
            </div>

            <button
              type="button"
              className="text-white/40 hover:text-white transition"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          {/* Live Comment list loop & text box */}
          <div className="mt-2.5 space-y-2">
            <div className="max-h-16 overflow-y-auto hide-scrollbar text-left text-[10px] text-white/80 space-y-1 bg-black/20 p-2 rounded-lg border border-white/5">
              {(comments[activeStory.id] || []).map((cmt, idx) => (
                <div key={idx} className="truncate">
                  <span className="text-brand-green font-bold mr-1">
                    @Tribber
                  </span>
                  : {cmt}
                </div>
              ))}
            </div>

            <form onSubmit={handleAddComment} className="flex gap-2">
              <input
                type="text"
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder="Say something to match this vibe..."
                className="flex-1 bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-[10px] text-white placeholder-white/30 focus:outline-none focus:border-brand-green/50"
              />
              <button
                type="submit"
                className="bg-brand-green text-black px-3 py-1 rounded-lg text-[10px] font-bold tracking-wider uppercase"
              >
                Post
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
