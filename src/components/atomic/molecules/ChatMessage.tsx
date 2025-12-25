'use client';

import React from 'react';
import { motion } from 'framer-motion';
import ChatAvatar from '../atoms/ChatAvatar';
import OptionButton from '../atoms/OptionButton';
import { Message } from '@/store/slices/aiSlice';

interface ChatMessageProps {
    message: Message;
    onOptionClick: (option: string) => void;
    isArabic: (text: string) => boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, onOptionClick, isArabic }) => {
    return (
        <motion.div
            className={`message-row ${message.role === "user" ? "user" : "assistant"}`}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
        >
            {message.role === "assistant" && <ChatAvatar />}

            <div
                className={`${message.role === "user" ? "user-message" : "bot-message"}`}
                dir={isArabic(message.content) ? "rtl" : "ltr"}
            >
                <p
                    className="whitespace-pre-wrap"
                    style={{ textAlign: 'inherit' }}
                    dangerouslySetInnerHTML={{
                        __html: message.content.replace(/\n/g, "<br/>"),
                    }}
                />

                {message.options && (
                    <div className="option-list">
                        {message.options.map((opt, i) => (
                            <OptionButton
                                key={i}
                                label={opt}
                                onClick={() => onOptionClick(opt)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default ChatMessage;
