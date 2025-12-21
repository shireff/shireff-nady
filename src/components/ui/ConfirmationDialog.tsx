'use client';

import React from 'react';
import Modal from './Modal';
import Button from './Button';
import { AlertTriangle } from 'lucide-react';

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDestructive?: boolean;
}

export default function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  isDestructive = true
}: ConfirmationDialogProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-full shrink-0 ${isDestructive ? 'bg-red-500/10' : 'bg-blue-500/10'}`}>
            <AlertTriangle className={isDestructive ? 'text-red-400' : 'text-blue-400'} size={24} />
          </div>
          <p className="text-zinc-400 text-lg">{description}</p>
        </div>
        
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={onClose}>
            {cancelLabel}
          </Button>
          <Button 
            variant={isDestructive ? 'secondary' : 'primary'} 
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={isDestructive ? 'bg-red-600 hover:bg-red-700 text-white border-none' : ''}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
