import React from 'react';
import Card from './Card';
import { motion } from 'framer-motion';
import { calculateHandValue } from '../utils/gameLogic';

const PlayerHand = ({ cards = [], isGameOver = false }) => {
  const handValue = calculateHandValue(cards);

  // Determine if the hand is busted or has blackjack
  const isBusted = handValue > 21;
  const hasBlackjack = handValue === 21 && cards.length === 2;

  // Determine the status text and style
  let statusText = '';
  let statusClass = '';

  if (isBusted) {
    statusText = 'BUST!';
    statusClass = 'text-casino-red';
  } else if (hasBlackjack) {
    statusText = 'BLACKJACK!';
    statusClass = 'text-casino-gold';
  }

  return (
    <div className="flex flex-col items-center mb-4">
      <div className="text-white text-lg mb-2">Your Hand: {handValue}</div>

      {/* Status display */}
      {statusText && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`font-bold text-xl mb-2 ${statusClass}`}
        >
          {statusText}
        </motion.div>
      )}

      {/* Cards display */}
      <div className="relative h-40 flex justify-center items-center" style={{ minWidth: '300px' }}>
        {cards.map((card, index) => (
          <motion.div
            key={`player-card-${index}`}
            initial={{ opacity: 0, y: 50, rotateY: 180 }}
            animate={{ opacity: 1, y: 0, rotateY: 0 }}
            transition={{
              delay: index * 0.2,
              duration: 0.5
            }}
            style={{
              position: 'absolute',
              left: `calc(50% - 48px + ${index * 30}px)`,
              zIndex: index
            }}
          >
            <Card card={card} hidden={false} />
          </motion.div>
        ))}

        {cards.length === 0 && (
          <div className="text-white italic">
            No cards yet. Start a new game!
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerHand;