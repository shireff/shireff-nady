"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AIHelperButton from "./AIHelperButton";
import "./AIHelper.css";

// Redux
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  toggleIsOpen,
  setIsOpen,
  addMessage,
  updateLastAssistantMessage,
  removeTypingIndicator,
  setIsLoading,
  Message
} from "@/store/slices/aiSlice";

// Components
import ChatHeader from "../atomic/molecules/ChatHeader";
import ChatMessage from "../atomic/molecules/ChatMessage";
import ChatInput from "../atomic/molecules/ChatInput";
import ChatAvatar from "../atomic/atoms/ChatAvatar";

interface AIResponse {
  response: string;
  language: "ar" | "en";
  topic?: string;
  tone?: string;
  projectId?: string;
  options?: string[];
}

const isArabic = (text: string) => /[\u0600-\u06FF]/.test(text);

export default function AIHelper() {
  const dispatch = useAppDispatch();
  const { isOpen, messages, isLoading } = useAppSelector((state) => state.ai);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => scrollToBottom(), [messages]);

  const sendMessage = async (message: string) => {
    if (!message.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: message.trim(),
      timestamp: new Date().toISOString(),
    };

    dispatch(addMessage(userMessage));
    setInputMessage("");
    dispatch(setIsLoading(true));

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

      let displayed = "";
      const text = data.response || "";

      for (let i = 0; i < text.length; i++) {
        displayed += text[i];

        // Typing effect logic
        if (i === 0) {
          dispatch(addMessage({
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: displayed + "⌛",
            timestamp: new Date().toISOString(),
            language: data.language,
            topic: data.topic,
            projectId: data.projectId,
            options: i === text.length - 1 ? data.options : undefined
          }));
        } else {
          dispatch(updateLastAssistantMessage({
            content: displayed + "⌛",
            options: i === text.length - 1 ? data.options : undefined
          }));
        }
        await new Promise((r) => setTimeout(r, 15));
      }

      dispatch(removeTypingIndicator());
      scrollToBottom();
    } catch (err) {
      console.error(err);
      dispatch(addMessage({
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "⚠️ Sorry, something went wrong. Please try again.",
        timestamp: new Date().toISOString(),
        language: "en",
      }));
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputMessage);
  };

  return (
    <>
      <AIHelperButton onClick={() => dispatch(toggleIsOpen())} />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, x: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20, x: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bot glass"
          >
            <ChatHeader onClose={() => dispatch(setIsOpen(false))} />

            <div className="bot-body">
              {messages.map((msg) => (
                <ChatMessage
                  key={msg.id}
                  message={msg}
                  onOptionClick={sendMessage}
                  isArabic={isArabic}
                />
              ))}

              {isLoading && (
                <div className="message-row assistant">
                  <ChatAvatar />
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

            <ChatInput
              value={inputMessage}
              onChange={setInputMessage}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
