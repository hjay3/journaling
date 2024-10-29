import React from 'react';
import styled from 'styled-components';
import { useReward } from 'react-rewards';

const HeaderContainer = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  color: #4a4a4a;
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
`;

export const Header: React.FC = () => {
  const { reward: confetti } = useReward('headerReward', 'confetti', {
    elementCount: 200,
    spread: 160,
    decay: 0.94,
    lifetime: 200,
    startVelocity: 35,
    colors: ['#b19cd9', '#9f86c0', '#e6c3c3', '#f4e1d2', '#b8e0d2']
  });

  return (
    <HeaderContainer onClick={confetti}>
      ✨ My Journal ✨
      <span id="headerReward" />
    </HeaderContainer>
  );
};