"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Shield,
  Reply,
  ArrowLeft,
  Trash2,
  MessageSquareDot,
} from "lucide-react";

import { ChatSession, ChatMessage } from "../lib/types";
import { MOCK_CHATS } from "../lib/data";

interface ChatViewProps {
  activeSessionId: string;
  onBack?: () => void;
  userAvatar: string;
}

const starters = [
  "🎸 Since we both listen to deep synthesizer tracks, have you checked the new experimental club in RAW-Gelände?",
  "🔬 Spotted we both value AI Ethics! Did you attend the philosophy meetup in Node 4 last Tuesday?",
  "☕️ Your bio on cyberpunk architecture looks brilliant. Found a cool brutalist café nearby, down for a coffee crawl?",
];

const smartReplies = [
  "That sounds absolute magic. Count me in!",
  "Actually, I just patched my first modular synth loop today ⚡️",
  "Let's catch up tonight. Send coordinates.",
];

const randomResponses = [
  "Let's sync up on that! I'm free around 8PM.",
  "That is total resonance frequency. Tell me more.",
  "Woah — haven’t heard that model since Amsterdam 2012.",
  "Packing headphones already. Where are you?",
  "Agreed. Let's schedule a Tribby meetup card.",
];

export const ChatView: React.FC<ChatViewProps> = ({
  activeSessionId,
  onBack,
}) => {
  const [sessions, setSessions] = useState<ChatSession[]>(MOCK_CHATS);

  const [activeId, setActiveId] = useState(
    activeSessionId || MOCK_CHATS[0]?.partnerId,
  );

  const [messageText, setMessageText] = useState("");

  const [mobileView, setMobileView] = useState<"list" | "chat">(() =>
    typeof window !== "undefined" && window.innerWidth < 1024 ? "list" : "chat",
  );

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const isFirstMount = useRef(true);

  const activeSession =
    sessions.find((s) => s.partnerId === activeId) || sessions[0];

  useEffect(() => {
    if (activeSessionId) {
      setActiveId(activeSessionId);

      if (
        !isFirstMount.current ||
        (typeof window !== "undefined" && window.innerWidth >= 1024)
      ) {
        setMobileView("chat");
      }
    }

    isFirstMount.current = false;
  }, [activeSessionId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [activeSession.messages]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileView("chat");
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getRandomPartnerResponse = () =>
    randomResponses[Math.floor(Math.random() * randomResponses.length)];

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      read: true,
    };

    setSessions((prev) =>
      prev.map((s) =>
        s.partnerId === activeId
          ? {
              ...s,
              messages: [...s.messages, newMsg],
            }
          : s,
      ),
    );

    setMessageText("");

    setTimeout(() => {
      const reply: ChatMessage = {
        id: `reply-${Date.now()}`,
        senderId: activeId,
        text: getRandomPartnerResponse(),
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        read: false,
      };

      setSessions((prev) =>
        prev.map((s) =>
          s.partnerId === activeId
            ? {
                ...s,
                messages: [...s.messages, reply],
              }
            : s,
        ),
      );
    }, 1400);
  };

  const handleClearChat = () => {
    setSessions((prev) =>
      prev.map((s) =>
        s.partnerId === activeId
          ? {
              ...s,
              messages: [],
            }
          : s,
      ),
    );
  };

  return (
    <section
      aria-label="Secure chat conversations"
      className="w-full h-[100dvh] lg:h-[700px] rounded-2xl border border-white/10 bg-[#0B0B12] overflow-hidden flex flex-col shadow-2xl"
    >
      {/* Encryption Banner */}
      <div
        role="status"
        aria-live="polite"
        className="bg-emerald-500/10 text-emerald-400 text-[11px] font-medium py-2 px-4 flex justify-center items-center border-b border-emerald-500/10 text-center"
      >
        <Shield className="w-3.5 h-3.5 mr-2 shrink-0" />

        <span>End-to-end encrypted via client SHA-256</span>
      </div>

      {/* Header */}
      {mobileView === "chat" && activeSession && (
        <header className="p-4 border-b border-white/10 flex items-center justify-between bg-black/20 backdrop-blur-xl">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => (onBack ? onBack() : setMobileView("list"))}
              aria-label="Go back to chats list"
              className="lg:hidden w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <img
              src={activeSession.partnerAvatar}
              alt={`${activeSession.partnerName} avatar`}
              className="w-11 h-11 rounded-full object-cover border border-white/10"
            />

            <div className="min-w-0">
              <h2 className="text-sm sm:text-base font-semibold truncate text-white">
                {activeSession.partnerName}
              </h2>

              <p className="text-[11px] text-emerald-400">Active • Node #412</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClearChat}
            aria-label="Clear conversation"
            className="w-10 h-10 rounded-full bg-white/5 hover:bg-red-500/10 border border-white/10 hover:text-red-400 flex items-center justify-center transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </header>
      )}

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          aria-label="Secure contacts"
          className={`${
            mobileView === "list" ? "flex" : "hidden"
          } lg:flex flex-col w-full lg:w-80 border-r border-white/10 overflow-y-auto bg-black/10`}
        >
          <div className="p-4 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/50 border-b border-white/10 sticky top-0 bg-[#0B0B12]/90 backdrop-blur-xl z-10">
            <MessageSquareDot className="w-4 h-4" />
            Secure Contacts
          </div>

          <nav aria-label="Chat sessions" className="flex flex-col">
            {sessions.map((s) => {
              const last =
                s.messages[s.messages.length - 1]?.text || "No messages yet";

              const active = s.partnerId === activeId;

              return (
                <button
                  key={s.partnerId}
                  type="button"
                  onClick={() => {
                    setActiveId(s.partnerId);
                    setMobileView("chat");
                  }}
                  aria-current={active}
                  className={`w-full text-left p-4 flex gap-3 border-b border-white/[0.04] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                    active ? "bg-white/8" : "hover:bg-white/[0.04]"
                  }`}
                >
                  <img
                    src={s.partnerAvatar}
                    alt={`${s.partnerName} avatar`}
                    className="w-12 h-12 rounded-full object-cover shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold truncate text-white">
                      {s.partnerName}
                    </h3>

                    <p className="text-xs text-white/50 truncate mt-1">
                      {last}
                    </p>
                  </div>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Chat Area */}
        <main
          aria-label="Conversation messages"
          className={`${
            mobileView === "chat" ? "flex" : "hidden"
          } lg:flex flex-1 flex-col`}
        >
          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto p-3 sm:p-5 space-y-4"
            role="log"
            aria-live="polite"
            aria-relevant="additions"
          >
            {activeSession.messages.length === 0 && (
              <div className="h-full flex items-center justify-center text-center px-6">
                <div>
                  <MessageSquareDot className="w-10 h-10 text-white/20 mx-auto mb-3" />

                  <p className="text-sm text-white/50">
                    No messages yet. Start the encrypted conversation.
                  </p>
                </div>
              </div>
            )}

            {activeSession.messages.map((m) => {
              const isUser = m.senderId === "user";

              return (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                >
                  <article
                    className={`max-w-[90%] sm:max-w-[75%] rounded-2xl px-4 py-3 text-sm shadow-lg ${
                      isUser
                        ? "bg-emerald-400 text-black"
                        : "bg-white/5 border border-white/10 text-white"
                    }`}
                    aria-label={
                      isUser
                        ? "Your message"
                        : `${activeSession.partnerName} message`
                    }
                  >
                    <p className="leading-relaxed break-words">{m.text}</p>

                    <div
                      className={`text-[10px] mt-2 ${
                        isUser ? "text-black/60" : "text-white/40"
                      }`}
                    >
                      {m.timestamp}
                    </div>
                  </article>
                </motion.div>
              );
            })}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          <section
            aria-label="Suggested replies"
            className="px-3 sm:px-4 py-3 border-t border-white/10 bg-black/20"
          >
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {smartReplies.map((r, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSend(r)}
                  className="px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs whitespace-nowrap hover:bg-purple-500/20 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
                >
                  {r}
                </button>
              ))}
            </div>

            {activeSession.messages.length <= 4 && (
              <div className="space-y-2 mt-3">
                {starters.map((s, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSend(s)}
                    className="w-full text-left p-3 rounded-xl bg-white/5 border border-white/10 text-xs hover:bg-white/10 transition flex items-start justify-between gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                  >
                    <span className="leading-relaxed">{s}</span>

                    <Reply className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  </button>
                ))}
              </div>
            )}
          </section>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(messageText);
            }}
            className="p-3 sm:p-4 border-t border-white/10 flex items-end gap-2 bg-[#0B0B12]"
          >
            <label htmlFor="chat-message" className="sr-only">
              Type your encrypted message
            </label>

            <textarea
              id="chat-message"
              rows={1}
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Inject encrypted transmission..."
              className="flex-1 resize-none min-h-[52px] max-h-40 bg-black/40 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />

            <button
              type="submit"
              disabled={!messageText.trim()}
              aria-label="Send message"
              className="w-12 h-12 shrink-0 rounded-2xl bg-emerald-400 hover:brightness-110 text-black flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </main>
      </div>
    </section>
  );
};

export default ChatView;
