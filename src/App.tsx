import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import EmojiPicker from 'emoji-picker-react';
import { Header } from './components/Header';
import { Toolbar } from './components/Toolbar';
import { JournalEntry } from './components/JournalEntry';
import { SaveButton } from './components/SaveButton';

const AppContainer = styled.div`
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7));
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M25,50 C25,25 75,25 75,50 C75,75 25,75 25,50 Z' fill='none' stroke='rgba(180, 160, 120, 0.2)' stroke-width='2'/%3E%3C/svg%3E");
`;

const JournalContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const App: React.FC = () => {
  const [entry, setEntry] = useState<string>('');
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const recognition = useRef<any>(null);

  // Initialize speech recognition
  if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
    recognition.current = new (window as any).webkitSpeechRecognition();
    recognition.current.continuous = true;
    recognition.current.interimResults = true;

    recognition.current.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0])
        .map((result) => result.transcript)
        .join('');

      setEntry((prev) => prev + ' ' + transcript);
    };
  }

  const toggleRecording = () => {
    if (isRecording) {
      recognition.current?.stop();
    } else {
      recognition.current?.start();
    }
    setIsRecording(!isRecording);
  };

  const onEmojiClick = (emojiData: any) => {
    setEntry((prev) => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const saveEntry = () => {
    if (entry.trim()) {
      const entries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
      entries.push({
        text: entry,
        date: new Date().toISOString(),
      });
      localStorage.setItem('journalEntries', JSON.stringify(entries));
      setEntry('');
      
      setTimeout(() => {
        alert('Journal entry saved! ✨');
      }, 500);
    }
  };

  return (
    <AppContainer>
      <JournalContainer>
        <Header />
        
        <Toolbar 
          onEmojiClick={() => setShowEmojiPicker(!showEmojiPicker)}
          onVoiceClick={toggleRecording}
          isRecording={isRecording}
        />

        {showEmojiPicker && (
          <div style={{ position: 'relative', zIndex: 1 }}>
            <EmojiPicker onEmojiClick={onEmojiClick} />
          </div>
        )}

        <JournalEntry 
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
        />

        <SaveButton onClick={saveEntry} />
      </JournalContainer>
    </AppContainer>
  );
};

export default App;