import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Trash2 } from 'lucide-react';

interface Entry {
  text: string;
  date: string;
}

interface EntryListProps {
  entries: Entry[];
  onDelete: (index: number) => void;
}

export function EntryList({ entries, onDelete }: EntryListProps) {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Previous Entries</h2>
      <div className="space-y-4">
        {entries.map((entry, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-lg bg-purple-50 relative group"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-2 text-sm text-purple-600 mb-2">
                <Calendar className="w-4 h-4" />
                {new Date(entry.date).toLocaleDateString()}
              </div>
              <button
                onClick={() => onDelete(index)}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-4 h-4 text-red-500 hover:text-red-600" />
              </button>
            </div>
            <p className="text-gray-700 whitespace-pre-wrap">{entry.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}