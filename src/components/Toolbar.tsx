import React from 'react';
import styled from 'styled-components';

const ToolbarContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

interface ToolbarProps {
  onEmojiClick: () => void;
  onVoiceClick: () => void;
  isRecording: boolean;
}

export const Toolbar: React.FC<ToolbarProps> = ({ onEmojiClick, onVoiceClick, isRecording }) => {
  return (
    <ToolbarContainer>
      <IconButton onClick={onEmojiClick}>😊</IconButton>
      <IconButton onClick={onVoiceClick}>
        {isRecording ? '🔴' : '🎤'}
      </IconButton>
    </ToolbarContainer>
  );
};