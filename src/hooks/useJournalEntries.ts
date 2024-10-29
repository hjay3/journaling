import { useState, useEffect } from 'react';

interface JournalEntry {
  text: string;
  date: string;
}

export function useJournalEntries() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);

  useEffect(() => {
    const savedEntries = localStorage.getItem('journalEntries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  const saveEntry = (text: string) => {
    if (text.trim()) {
      const newEntry = {
        text,
        date: new Date().toISOString(),
      };
      
      const updatedEntries = [...entries, newEntry];
      setEntries(updatedEntries);
      localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
      return true;
    }
    return false;
  };

  const deleteEntry = (index: number) => {
    const updatedEntries = entries.filter((_, i) => i !== index);
    setEntries(updatedEntries);
    localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
  };

  return {
    entries,
    saveEntry,
    deleteEntry
  };
}