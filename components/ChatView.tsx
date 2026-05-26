import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Shield,
  Sparkles,
  MessageSquareDot,
  HelpCircle,
  Bot,
  Reply,
  ArrowLeft,
  MoreVertical,
  Trash2,
} from "lucide-react";
import { ChatSession, ChatMessage, Profile } from "../lib/types";
import { MOCK_CHATS } from "../lib/data";

interface ChatViewProps {
  activeSessionId: string;
  onBack?: () => void;
  userAvatar: string;
}

export const ChatView: React.FC<ChatViewProps> = ({
  activeSessionId,
  onBack,
  userAvatar,
}) => {
  const [sessions, setSessions] = useState<ChatSession[]>(MOCK_CHATS);
  const [activeId, setActiveId] = useState(
    activeSessionId || MOCK_CHATS[0].partnerId,
  );
  const [messageText, setMessageText] = useState("");
  const [mobileView, setMobileView] = useState<"list" | "chat">(() => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      return "list";
    }
    return activeSessionId ? "chat" : "list";
  });
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const activeSession =
    sessions.find((s) => s.partnerId === activeId) || sessions[0];
  const isFirstMount = useRef(true);

  // Align to selected sessions immediately
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

  // Scroll to bottom on message updates
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeSession.messages]);

  // AI-Powered Starters & Smart replies
  const starters = [
    "🎸 Since we both listen to deep synthesizer tracks, have you checked the new experimental club in RAW-Gelände?",
    "🔬 Spotted we both value AI Ethics! Did you attend the philosophy meetup in Node 4 last Tuesday?",
    "☕️ Your bio on cyberpunk architecture looks brilliant. Found a cool third-wave brutalist cafe nearby, down for a coffee crawl?",
  ];

  const smartReplies = [
    "That sounds absolute magic. Count me in!",
    "Actually, I just patched my first modular synth loop today! ⚡️",
    "Let's catch up tonight. Send me the coordinates.",
  ];

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const newMsg: ChatMessage = {
      id: `user_msg_${Date.now()}`,
      senderId: "user",
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      read: true,
    };

    // Append to active session
    setSessions((prev) =>
      prev.map((s) => {
        if (s.partnerId === activeId) {
          return {
            ...s,
            messages: [...s.messages, newMsg],
          };
        }
        return s;
      }),
    );

    setMessageText("");

    // Simulate reactive conversational intelligence replies after some delay
    setTimeout(() => {
      const responseMsg: ChatMessage = {
        id: `partner_msg_${Date.now()}`,
        senderId: activeId,
        text: getRandomPartnerResponse(),
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        read: false,
      };

      setSessions((prev) =>
        prev.map((s) => {
          if (s.partnerId === activeId) {
            return {
              ...s,
              messages: [...s.messages, responseMsg],
            };
          }
          return s;
        }),
      );
    }, 1500);
  };

  const getRandomPartnerResponse = () => {
    const lines = [
      "Let's sync up on that! I'm completely free around 8 PM.",
      "That is a total resonance frequency! Tell me more about your patch parameters.",
      "Woah, I haven't heard that model since the 2012 Amsterdam retro loop!",
      "I am literally packing my headphones right now. Where are you located?",
      "Highly agreeable! Let's schedule a Tribby meetup card so the node locks our attendance.",
    ];
    return lines[Math.floor(Math.random() * lines.length)];
  };

  const handleClearChat = () => {
    setSessions((prev) =>
      prev.map((s) => {
        if (s.partnerId === activeId) {
          return { ...s, messages: [] };
        }
        return s;
      }),
    );
  };

  return (
    <div
      id="instant-chat-view"
      className="w-full h-[580px] sm:h-[620px] lg:h-[650px] bg-surface-container rounded-2xl border border-white/5 overflow-hidden flex flex-col glass-card relative"
    >
      {/* Encryption Header banner */}
      <div className="bg-brand-green/10 text-brand-green text-[10px] font-mono py-1.5 px-4 flex items-center justify-between border-b border-brand-green/10 select-none">
        <div className="flex items-center gap-1.5 justify-center mx-auto">
          <Shield className="w-3.5 h-3.5" />
          <span>END-TO-END ENCRYPTED VIA CLIENT-SIDE SHA-256 KEYS</span>
        </div>
      </div>

      {/* Chat Navigation Header */}
      {mobileView === "list" ? (
        <div className="p-4 border-b border-white/5 flex items-center justify-between bg-[#111] lg:hidden">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-brand-green/10 border border-brand-green/20 flex items-center justify-center text-brand-green shrink-0">
              <MessageSquareDot className="w-4 h-4 animate-pulse" />
            </div>
            <div className="text-left">
              <h3 className="font-display font-bold text-[11px] uppercase tracking-widest text-white">
                DECRYPTED CONTACT NODES
              </h3>
              <p className="text-[9px] text-white/45 font-mono">
                Select a peer node to resume secure conversations
              </p>
            </div>
          </div>
        </div>
      ) : null}

      <div
        className={`p-4 border-b border-white/5 flex items-center justify-between bg-black/20 ${mobileView === "list" ? "hidden lg:flex" : "flex"}`}
      >
        <div className="flex items-center gap-3">
          {/* Back to list arrow button */}
          <button
            type="button"
            onClick={() => {
              if (onBack) {
                onBack();
              } else {
                setMobileView("list");
              }
            }}
            className="lg:hidden w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white cursor-pointer select-none"
            title="Exit conversation"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="relative w-10 h-10 rounded-full border border-white/10 overflow-hidden flex-shrink-0 bg-neutral-900">
            <img
              referrerPolicy="no-referrer"
              src={activeSession.partnerAvatar}
              alt={activeSession.partnerName}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-brand-green rounded-full border-2 border-brand-dark" />
          </div>

          <div className="text-left font-sans">
            <h3 className="font-display font-bold text-xs text-white">
              {activeSession.partnerName}
            </h3>
            <span className="text-[9px] text-brand-green font-mono flex items-center gap-1">
              Active on Node #412 • E2EE Key: cb1f8c...
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleClearChat}
            title="Clear Chat History"
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 hover:text-red-400 flex items-center justify-center text-white/60 transition cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Chats Section Selector for Desktop / Sidebar view */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left lists: Sessions list (only visible if multi sessions shown) */}
        <div
          id="secure-contacts-sidebar"
          className={`${mobileView === "list" ? "block w-full" : "hidden"} lg:block lg:w-64 border-r border-white/5 overflow-y-auto bg-black/20 custom-scrollbar`}
        >
          <div className="p-3 text-[10px] font-mono text-white/40 uppercase tracking-widest border-b border-white/5 text-left">
            Secure Node Contacts
          </div>
          {sessions.map((s) => {
            const hasUnread = s.messages.some(
              (m) => m.senderId !== "user" && !m.read,
            );
            const lastMsgText =
              s.messages[s.messages.length - 1]?.text ||
              "No conversations yet.";

            return (
              <div
                key={s.partnerId}
                onClick={() => {
                  setActiveId(s.partnerId);
                  setMobileView("chat");
                }}
                className={`p-3 border-b border-white/[0.02] flex items-center gap-3 cursor-pointer transition ${s.partnerId === activeId ? "bg-white/5" : "hover:bg-white/[0.02]"}`}
              >
                <div className="relative w-9 h-9 rounded-full overflow-hidden border border-white/10 flex-shrink-0 bg-neutral-950">
                  <img
                    referrerPolicy="no-referrer"
                    src={s.partnerAvatar}
                    alt={s.partnerName}
                    className="w-full h-full object-cover"
                  />
                  {hasUnread && (
                    <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-brand-green rounded-full border-2 border-brand-dark" />
                  )}
                </div>
                <div className="flex-1 min-w-0 text-left font-sans">
                  <div className="flex items-center justify-between">
                    <span className="font-sans font-bold text-xs text-white truncate">
                      {s.partnerName}
                    </span>
                    <span className="text-[8px] font-mono text-white/30 shrink-0">
                      {s.lastActive}
                    </span>
                  </div>
                  <p className="text-[10px] text-white/50 truncate mt-0.5">
                    {lastMsgText}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right list: Active Messages thread */}
        <div
          id="conversation-thread-container"
          className={`${mobileView === "chat" ? "flex w-full" : "hidden"} lg:flex lg:flex-1 flex-col justify-between overflow-hidden bg-black/10`}
        >
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 custom-scrollbar text-left">
            {/* Thread starter disclaimer */}
            <div className="text-center py-4 space-y-1 bg-white/5 border border-white/5 rounded-xl p-3.5 max-w-xs mx-auto mb-3">
              <span className="material-symbols-outlined text-brand-green text-sm select-none">
                security_key
              </span>
              <p className="text-[10px] text-white/70">
                Your key matches Elias' block signature. Conversations vanish
                safely based on system heartbeat rates.
              </p>
            </div>

            {activeSession.messages.length === 0 ? (
              <div className="py-20 text-center text-xs text-white/30">
                Silence. Use a Gemini secure starter bubble to connect.
              </div>
            ) : (
              activeSession.messages.map((m) => {
                const isUser = m.senderId === "user";
                return (
                  <div
                    key={m.id}
                    className={`flex gap-2.5 ${isUser ? "justify-end" : "justify-start"}`}
                  >
                    {!isUser && (
                      <div className="w-8 h-8 rounded-full overflow-hidden border border-white/10 flex-shrink-0 bg-neutral-900 mt-1">
                        <img
                          referrerPolicy="no-referrer"
                          src={activeSession.partnerAvatar}
                          alt={activeSession.partnerName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    <div className="max-w-[70%] space-y-1">
                      <div
                        className={`p-3 rounded-2xl text-xs line-clamp-none whitespace-pre-wrap leading-relaxed ${isUser ? "bg-brand-green text-black font-medium rounded-tr-none" : "bg-surface-container-high text-white/90 rounded-tl-none border border-white/5"}`}
                      >
                        {m.text}
                      </div>
                      <div
                        className={`flex items-center gap-1.5 text-[9px] font-mono text-white/30 ${isUser ? "justify-end" : "justify-start"}`}
                      >
                        <span>{m.timestamp}</span>
                        {isUser && (
                          <span className="text-brand-green text-[10px] font-bold">
                            ✓✓
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Help open-vibe options (AI suggestions) */}
          <div className="px-4 py-2 border-t border-white/5 bg-black/20 text-left">
            <div className="flex items-center gap-1 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-brand-purple" />
              <span className="text-[9px] font-mono uppercase tracking-wider text-brand-purple font-semibold">
                Gemini Smart Responses
              </span>
            </div>

            {/* Replies grid */}
            <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
              {smartReplies.map((r, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSend(r)}
                  className="px-3 py-1.5 rounded-full bg-brand-purple/5 hover:bg-brand-purple/10 border border-brand-purple/20 text-[10px] text-white/80 hover:text-white transition whitespace-nowrap cursor-pointer hover:border-brand-purple/40"
                >
                  {r}
                </button>
              ))}
            </div>

            {/* Conversation starter suggestions if thread is relatively quiet */}
            {activeSession.messages.length <= 5 && (
              <div className="mt-3.5 border-t border-white/5 pt-3">
                <span className="text-[9.5px] font-mono text-white/30 tracking-wider uppercase block mb-1.5">
                  Suggested Intros to break stillness
                </span>
                <div className="space-y-1.5">
                  {starters.map((s, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSend(s)}
                      className="w-full text-left p-2.5 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-brand-green/25 rounded-xl text-[10px] text-white/80 transition flex items-center justify-between gap-1 cursor-pointer"
                    >
                      <span className="truncate">{s}</span>
                      <Reply className="w-3.5 h-3.5 text-brand-green rotate-180 flex-shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Message Input box */}
          <div className="p-4 border-t border-white/5 flex gap-2 bg-black/30">
            <input
              type="text"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend(messageText)}
              placeholder="Inject encrypted transmission..."
              className="flex-1 bg-black/40 border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder-white/30 focus:outline-none focus:border-brand-green/50"
            />
            <button
              onClick={() => handleSend(messageText)}
              disabled={!messageText.trim()}
              className="w-10 h-10 rounded-xl bg-brand-green text-black flex items-center justify-center disabled:opacity-50 transition cursor-pointer select-none"
            >
              <Send className="w-4 h-4 fill-black" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
