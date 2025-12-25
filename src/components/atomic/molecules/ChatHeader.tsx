'use client';

import React from 'react';
import { Bot, X } from 'lucide-react';

interface ChatHeaderProps {
    onClose: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ onClose }) => {
    return (
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
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-xl transition text-zinc-500 hover:text-white"
            >
                <X size={18} />
            </button>
        </div>
    );
};

export default ChatHeader;
