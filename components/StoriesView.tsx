import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, Share2, Music, Sparkles } from "lucide-react";
import { MOCK_STORIES } from "../lib/data";

interface StoriesViewProps {
  onClose: () => void;
}

const ui = {
  container: "fixed inset-0 bg-black/95 z-50 flex items-center justify-center",
  card: "w-full max-w-md h-screen md:h-[820px] bg-[#0B0B12] rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col relative",
  blur: "absolute inset-0 blur-3xl opacity-20 scale-110",
  progressWrap: "absolute top-4 left-4 right-4 flex gap-2 z-20",
  progress: "h-1 flex-1 bg-white/20 rounded-full overflow-hidden",
  progressFill: "h-full bg-gradient-to-r from-fuchsia-500 to-rose-400",
  header:
    "absolute top-8 left-4 right-4 z-20 flex justify-between items-center",
  avatar: "w-10 h-10 rounded-full border-2 border-fuchsia-500 overflow-hidden",
  close: "w-8 h-8 rounded-full bg-white/10 text-white",
  hero: "w-full h-[65%] relative overflow-hidden",
  overlay:
    "absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40",
  drawer:
    "p-5 bg-gradient-to-t from-black via-black/95 flex-1 flex flex-col justify-between",
  text: "text-sm text-white/90",
  tag: "text-fuchsia-300 text-xs",
  music: "flex gap-2 p-3 rounded-2xl bg-white/5 text-white",
  actions: "flex justify-between pt-4 border-t border-white/10",
  btn: "flex items-center gap-2 text-white/70",
  comments:
    "max-h-20 overflow-auto p-3 rounded-xl bg-white/5 text-xs text-white/80",
  input: "flex-1 px-3 py-2 rounded-xl bg-black/30 text-white outline-none",
  send: "px-4 rounded-xl bg-gradient-to-r from-fuchsia-500 to-rose-400 text-white",
};

export const StoriesView: React.FC<StoriesViewProps> = ({ onClose }) => {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [showHeart, setShowHeart] = useState(false);
  const [comment, setComment] = useState("");
  const story = MOCK_STORIES[index];

  useEffect(() => {
    setProgress(0);
    const i = setInterval(
      () => setProgress((p) => (p >= 100 ? (next(), 0) : p + 1)),
      60,
    );
    return () => clearInterval(i);
  }, [index]);

  const next = () =>
    setIndex((i) => (i >= MOCK_STORIES.length - 1 ? (onClose(), 0) : i + 1));
  const prev = () => setIndex((i) => (i <= 0 ? 0 : i - 1));

  return (
    <div className={ui.container}>
      <div className={ui.card}>
        <div
          className={ui.blur}
          style={{
            backgroundImage: `url(${story.bgUrl})`,
            backgroundSize: "cover",
          }}
        />

        <div className={ui.progressWrap}>
          {MOCK_STORIES.map((s, i) => (
            <div key={s.id} className={ui.progress}>
              <div
                className={ui.progressFill}
                style={{
                  width:
                    i < index ? "100%" : i === index ? `${progress}%` : "0%",
                }}
              />
            </div>
          ))}
        </div>

        <div className={ui.header}>
          <div className="flex gap-3 items-center">
            <img src={story.avatarUrl} className={ui.avatar} />
            <div>
              <div className="text-white text-sm">{story.userMoniker}</div>
              <div className="text-white/50 text-xs">{story.badge}</div>
            </div>
          </div>
          <button onClick={onClose} className={ui.close}>
            ✕
          </button>
        </div>

        <div
          className={ui.hero}
          onDoubleClick={() => {
            setLiked({ ...liked, [story.id]: true });
            setShowHeart(true);
            setTimeout(() => setShowHeart(false), 800);
          }}
        >
          <motion.img
            key={story.id}
            src={story.bgUrl}
            className="w-full h-full object-cover"
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
          />
          <div className={ui.overlay} />
          <AnimatePresence>
            {showHeart && (
              <motion.div
                initial={{ scale: 0.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Heart className="w-24 h-24 fill-fuchsia-500 text-fuchsia-500" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className={ui.drawer}>
          <div>
            <p className={ui.text}>{story.text}</p>
            <div className="flex gap-2 mt-2">
              {story.tags.map((t, i) => (
                <span key={i} className={ui.tag}>
                  {t}
                </span>
              ))}
            </div>
            <div className={ui.music}>
              <Music size={16} /> Live Audio Vibe
            </div>
          </div>

          <div>
            <div className={ui.actions}>
              <button className={ui.btn}>
                <Heart />
              </button>
              <button className={ui.btn}>
                <MessageCircle />
              </button>
              <button className={ui.btn}>
                <Share2 />
              </button>
            </div>

            <div className={ui.comments}>Live reactions flowing...</div>

            <div className="flex gap-2 mt-3">
              <input
                className={ui.input}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Reply to vibe..."
              />
              <button className={ui.send}>Post</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
