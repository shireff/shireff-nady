'use client';

import React from 'react';

interface OptionButtonProps {
    label: string;
    onClick: () => void;
}

const OptionButton: React.FC<OptionButtonProps> = ({ label, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="option-button"
        >
            {label}
        </button>
    );
};

export default OptionButton;
