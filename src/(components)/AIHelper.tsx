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
}

interface AIResponse {
  response: string;
  language: "ar" | "en";
  topic?: string;
  tone?: string;
}

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
            .map(({ role, content, language }) => ({
              role,
              content,
              language,
            })),
        }),
      });

      const data: AIResponse = await res.json();
      document.body.dir = data.language === "ar" ? "rtl" : "ltr";

      // ✨ Typing effect
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
            });
          }
          return [...newMsgs];
        });
        await new Promise((r) => setTimeout(r, 20));
      }

      setMessages((prev) =>
        prev.map((m) =>
          m.content.endsWith("⌛")
            ? { ...m, content: m.content.replace("⌛", "") }
            : m
        )
      );

      scrollToBottom();
    } catch {
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
      {/* Floating Chat Button */}
      <AIHelperButton onClick={() => setIsOpen((prev) => !prev)} />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="bot"
          >
            {/* Header */}
            <div className="bot-header">
              <div className="bot-info">
                <div className="bot-avatar">
                  <Bot size={18} className="text-blue-500" />
                </div>
                <div>
                  <h3>Shireff’s AI Assistant</h3>
                  <p>Always ready to help 🚀</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="close-btn text-gray-400 hover:text-gray-600 transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat Body */}
            <div className="bot-body">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  className={`message-row ${
                    msg.role === "user" ? "user" : "assistant"
                  }`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {msg.role === "assistant" && (
                    <div className="bot-avatar-inline">
                      <Bot size={22} className="text-blue-500" />
                    </div>
                  )}

                  <div
                    className={`${
                      msg.role === "user" ? "user-message" : "bot-message"
                    }`}
                  >
                    <p
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
                <div className="bot-message typing">
                  <div className="dots">
                    <div></div>
                    <div></div>
                    <div></div>
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
                    e.currentTarget.scrollHeight + "px";

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
                placeholder="Write your message..."
                disabled={isLoading}
                className="bot-textarea"
                rows={1}
              />

              <button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
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
