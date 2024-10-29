import React from 'react';
import { Save } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import EmojiPicker from 'emoji-picker-react';

interface EntryEditorProps {
  entry: string;
  showEmojiPicker: boolean;
  onEntryChange: (value: string) => void;
  onEmojiClick: (emojiObject: any) => void;
  onSave: () => void;
}

export function EntryEditor({
  entry,
  showEmojiPicker,
  onEntryChange,
  onEmojiClick,
  onSave
}: EntryEditorProps) {
  return (
    <>
      <AnimatePresence>
        {showEmojiPicker && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute z-10"
          >
            <EmojiPicker onEmojiClick={onEmojiClick} />
          </motion.div>
        )}
      </AnimatePresence>

      <textarea
        value={entry}
        onChange={(e) => onEntryChange(e.target.value)}
        placeholder="Write your thoughts here..."
        className="w-full h-40 p-4 mb-4 rounded-lg border border-purple-200 focus:border-purple-400 focus:ring focus:ring-purple-200 focus:ring-opacity-50 resize-none transition-colors"
      />

      <button
        onClick={onSave}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
      >
        <Save className="w-5 h-5" />
        Save Entry
      </button>
    </>
  );
}