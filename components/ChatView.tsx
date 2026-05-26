"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Shield,
  Sparkles,
  MessageSquareDot,
  Reply,
  ArrowLeft,
  Trash2,
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
    activeSessionId || MOCK_CHATS[0].partnerId,
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
      prev.map((s) => (s.partnerId === activeId ? { ...s, messages: [] } : s)),
    );
  };

  return (
    <div className="w-full h-[650px] bg-surface-container rounded-2xl border border-white/5 overflow-hidden flex flex-col glass-card">
      {/* Encryption Banner */}
      <div className="bg-brand-green/10 text-brand-green text-[10px] font-mono py-2 px-4 flex justify-center border-b border-brand-green/10">
        <Shield className="w-3.5 h-3.5 mr-2" />
        END-TO-END ENCRYPTED VIA CLIENT SHA-256
      </div>

      {/* Header */}
      {mobileView === "chat" && (
        <div className="p-4 border-b border-white/5 flex justify-between bg-black/20">
          <div className="flex items-center gap-3">
            <button
              onClick={() => (onBack ? onBack() : setMobileView("list"))}
              className="lg:hidden w-8 h-8 rounded-full bg-white/5 flex items-center justify-center"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <img
              src={activeSession.partnerAvatar}
              alt={activeSession.partnerName}
              className="w-10 h-10 rounded-full object-cover"
            />

            <div>
              <h3 className="text-sm font-bold">{activeSession.partnerName}</h3>
              <p className="text-[10px] text-brand-green">Active • Node #412</p>
            </div>
          </div>

          <button
            onClick={handleClearChat}
            className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:text-red-400"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className={`${mobileView === "list" ? "block w-full" : "hidden"} lg:block lg:w-72 border-r border-white/5 overflow-y-auto`}
        >
          <div className="p-4 text-xs uppercase text-white/40 border-b border-white/5">
            Secure Contacts
          </div>

          {sessions.map((s) => {
            const last =
              s.messages[s.messages.length - 1]?.text || "No messages";

            return (
              <div
                key={s.partnerId}
                onClick={() => {
                  setActiveId(s.partnerId);
                  setMobileView("chat");
                }}
                className={`p-4 flex gap-3 cursor-pointer border-b border-white/[0.03]
                  ${
                    s.partnerId === activeId
                      ? "bg-white/5"
                      : "hover:bg-white/[0.03]"
                  }`}
              >
                <img
                  src={s.partnerAvatar}
                  className="w-10 h-10 rounded-full object-cover"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold truncate">
                    {s.partnerName}
                  </h4>
                  <p className="text-xs text-white/40 truncate">{last}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Messages */}
        <div
          className={`${mobileView === "chat" ? "flex" : "hidden"} lg:flex flex-1 flex-col`}
        >
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {activeSession.messages.map((m) => {
              const isUser = m.senderId === "user";

              return (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-2xl text-sm ${
                      isUser
                        ? "bg-brand-green text-black"
                        : "bg-white/5 text-white"
                    }`}
                  >
                    {m.text}

                    <div className="text-[9px] opacity-50 mt-2">
                      {m.timestamp}
                    </div>
                  </div>
                </motion.div>
              );
            })}

            <div ref={messagesEndRef} />
          </div>

          {/* Smart Replies */}
          <div className="px-4 py-3 border-t border-white/5 bg-black/20">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {smartReplies.map((r, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(r)}
                  className="px-3 py-2 rounded-full bg-brand-purple/10 text-xs whitespace-nowrap"
                >
                  {r}
                </button>
              ))}
            </div>

            {activeSession.messages.length <= 4 && (
              <div className="space-y-2 mt-2">
                {starters.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(s)}
                    className="w-full text-left p-3 rounded-xl bg-white/5 text-xs flex justify-between"
                  >
                    {s}
                    <Reply className="w-4 h-4 text-brand-green" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/5 flex gap-2">
            <input
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend(messageText)}
              placeholder="Inject encrypted transmission..."
              className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm"
            />

            <button
              onClick={() => handleSend(messageText)}
              disabled={!messageText.trim()}
              className="w-12 h-12 rounded-xl bg-brand-green text-black flex items-center justify-center disabled:opacity-40"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatView;
