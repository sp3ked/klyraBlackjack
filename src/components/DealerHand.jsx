import React from 'react';
import Card from './Card';
import { motion } from 'framer-motion';
import { calculateHandValue } from '../utils/gameLogic';

const DealerHand = ({ cards = [], hideSecondCard = false, isGameOver = false }) => {
  // If we're hiding the second card, only consider the first card for value display
  const visibleCards = hideSecondCard ? cards.slice(0, 1) : cards;
  const handValue = calculateHandValue(visibleCards);
  const fullHandValue = calculateHandValue(cards);

  // Determine if the hand is busted or has blackjack
  const isBusted = fullHandValue > 21;
  const hasBlackjack = fullHandValue === 21 && cards.length === 2;

  // Determine the status text and style
  let statusText = '';
  let statusClass = '';

  if (isBusted && !hideSecondCard) {
    statusText = 'BUST!';
    statusClass = 'text-casino-red';
  } else if (hasBlackjack && !hideSecondCard) {
    statusText = 'BLACKJACK!';
    statusClass = 'text-casino-gold';
  }

  return (
    <div className="flex flex-col items-center mb-8">
      <div className="text-white text-lg mb-2">
        Dealer's Hand: {hideSecondCard ? `${handValue}+` : fullHandValue}
      </div>

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
            key={`dealer-card-${index}`}
            initial={{ opacity: 0, y: -50, rotateY: 180 }}
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
            <Card
              card={card}
              hidden={hideSecondCard && index === 1}
            />
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

export default DealerHand;