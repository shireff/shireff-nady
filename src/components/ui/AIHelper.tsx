"use client";



import { useState, useRef, useEffect } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { Send, X, Bot } from "lucide-react";
import AIHelperButton from "./AIHelperButton";
import "./AIHelper.css";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  language?: "ar" | "en";
  options?: string[];
  topic?: string;
  projectId?: string;
}

interface AIResponse {
  response: string;
  language: "ar" | "en";
  topic?: string;
  tone?: string;
  projectId?: string;
  options?: string[];
}

// Helper to detect Arabic text
const isArabic = (text: string) => {
  const arabicRegex = /[\u0600-\u06FF]/;
  return arabicRegex.test(text);
};

export default function AIHelper() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "👋 Hi! I'm Shireff’s AI Assistant. How may I help you today?",
      timestamp: new Date(),
      language: "en",
      options: ["View Projects", "View Experience", "Contact Shireff"],
      topic: "greeting"
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => scrollToBottom(), [messages]);
  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);

  const sendMessage = async (message: string) => {
    if (!message.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: message.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    if (inputRef.current) inputRef.current.style.height = "2.4rem";
    setIsLoading(true);

    try {
      const res = await fetch("/api/ai-helper", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          conversationHistory: messages
            .slice(-6)
            .map(({ role, content, language, topic, projectId }) => ({
              role,
              content,
              language,
              topic,
              projectId
            })),
        }),
      });

      const data: AIResponse = await res.json();


      // Typing effect
      let displayed = "";
      const text = data.response || "";

      for (let i = 0; i < text.length; i++) {
        displayed += text[i];
        setMessages((prev) => {
          const newMsgs = [...prev];
          const last = newMsgs[newMsgs.length - 1];
          if (
            last &&
            last.role === "assistant" &&
            last.content.endsWith("⌛")
          ) {
            last.content = displayed + "⌛";
          } else {
            newMsgs.push({
              id: (Date.now() + 1).toString(),
              role: "assistant",
              content: displayed + "⌛",
              timestamp: new Date(),
              language: data.language,
              topic: data.topic,
              projectId: data.projectId,
              options: i === text.length - 1 ? data.options : undefined
            });
          }
          return [...newMsgs];
        });
        await new Promise((r) => setTimeout(r, 15));
      }

      setMessages((prev) =>
        prev.map((m) =>
          m.content.endsWith("⌛")
            ? { ...m, content: m.content.replace("⌛", "") }
            : m
        )
      );

      scrollToBottom();
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "⚠️ Sorry, something went wrong. Please try again.",
          timestamp: new Date(),
          language: "en",
        },
      ]);
    } finally {
      setIsLoading(false);
      if (inputRef.current) inputRef.current.style.height = "2.4rem";
      requestAnimationFrame(() => {
        if (inputRef.current) inputRef.current.focus();
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputMessage);
  };

  const handleOptionClick = (option: string) => sendMessage(option);

  return (
    <>
      <AIHelperButton onClick={() => setIsOpen((prev) => !prev)} />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, x: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20, x: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bot glass"
          >
            <div className="bot-header">
              <div className="bot-info">
                <div className="bot-avatar">
                  <Bot size={20} className="text-blue-500" />
                </div>
                <div>
                  <h3>AI Assistant</h3>
                  <p>System Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/5 rounded-xl transition text-zinc-500 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="bot-body">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  className={`message-row ${msg.role === "user" ? "user" : "assistant"
                    }`}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                >
                  {msg.role === "assistant" && (
                    <div className="w-8 h-8 rounded-lg glass-card-premium flex items-center justify-center shrink-0 border-blue-500/20">
                      <Bot size={16} className="text-blue-400" />
                    </div>
                  )}

                  <div
                    className={`${msg.role === "user" ? "user-message" : "bot-message"
                      }`}
                    dir={isArabic(msg.content) ? "rtl" : "ltr"}
                  >
                    <p
                      className="whitespace-pre-wrap"
                      style={{ textAlign: 'inherit' }}
                      dangerouslySetInnerHTML={{
                        __html: msg.content.replace(/\n/g, "<br/>"),
                      }}
                    />

                    {msg.options && (
                      <div className="option-list">
                        {msg.options.map((opt, i) => (
                          <button
                            key={i}
                            onClick={() => handleOptionClick(opt)}
                            className="option-button"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <div className="message-row assistant">
                  <div className="w-8 h-8 rounded-lg glass-card-premium flex items-center justify-center shrink-0 border-blue-500/20">
                    <Bot size={16} className="text-blue-400" />
                  </div>
                  <div className="bot-message typing">
                    <div className="dots">
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="bot-input">
              <textarea
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => {
                  setInputMessage(e.target.value);
                  e.currentTarget.style.height = "auto";
                  e.currentTarget.style.height =
                    Math.min(e.currentTarget.scrollHeight, 120) + "px";
                  if (e.currentTarget.value.trim() === "") {
                    e.currentTarget.style.height = "2.4rem";
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
                placeholder="How can I help?"
                disabled={isLoading}
                className="bot-textarea"
                rows={1}
                dir="auto"
              />


              <button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                className="shadow-xl"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
