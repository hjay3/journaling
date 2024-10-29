import React from 'react';
import styled from 'styled-components';

const TextArea = styled.textarea`
  width: 100%;
  min-height: 300px;
  padding: 1rem;
  border: 2px solid #e6e6e6;
  border-radius: 8px;
  font-size: 1.1rem;
  line-height: 1.6;
  resize: vertical;
  background: rgba(255, 255, 255, 0.9);
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #b19cd9;
  }
`;

interface JournalEntryProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const JournalEntry: React.FC<JournalEntryProps> = ({ value, onChange }) => {
  return (
    <TextArea
      value={value}
      onChange={onChange}
      placeholder="Write your thoughts here..."
    />
  );
};