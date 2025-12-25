'use client';

import React from 'react';
import { Bot } from 'lucide-react';

interface ChatAvatarProps {
    size?: number;
    className?: string;
}

const ChatAvatar: React.FC<ChatAvatarProps> = ({ size = 16, className = "" }) => {
    return (
        <div className={`w-8 h-8 rounded-lg glass-card-premium flex items-center justify-center shrink-0 border-blue-500/20 ${className}`}>
            <Bot size={size} className="text-blue-400" />
        </div>
    );
};

export default ChatAvatar;
