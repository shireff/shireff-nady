'use client';

import React, { useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
    value: string;
    onChange: (val: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ value, onChange, onSubmit, isLoading }) => {
    const inputRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSubmit(e);
        }
    };

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(e.target.value);
        e.currentTarget.style.height = "auto";
        e.currentTarget.style.height = Math.min(e.currentTarget.scrollHeight, 120) + "px";
        if (e.currentTarget.value.trim() === "") {
            e.currentTarget.style.height = "2.4rem";
        }
    };

    return (
        <form onSubmit={onSubmit} className="bot-input">
            <textarea
                ref={inputRef}
                value={value}
                onChange={handleTextareaChange}
                onKeyDown={handleKeyDown}
                placeholder="How can I help?"
                disabled={isLoading}
                className="bot-textarea"
                rows={1}
                dir="auto"
            />
            <button
                type="submit"
                disabled={!value.trim() || isLoading}
                className="shadow-xl"
            >
                <Send size={16} />
            </button>
        </form>
    );
};

export default ChatInput;
