import React from 'react';
import Card from './Card';
import { calculateHandValue, isBusted, hasNaturalBlackjack } from '../utils/gameLogic';

const PlayerHand = ({ cards = [], isGameOver = false }) => {
  const handValue = calculateHandValue(cards);
  const busted = isBusted(cards);
  const hasBlackjack = hasNaturalBlackjack(cards);
  
  // Determine value display style
  const getValueStyle = () => {
    if (busted) return 'bg-red-600 text-white';
    if (hasBlackjack) return 'bg-yellow-400 text-black';
    return 'bg-blue-100 text-blue-800';
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-2">
        <h2 className="text-xl font-bold text-white mr-4">Your Hand</h2>
        
        {cards.length > 0 && (
          <div className={`px-3 py-1 rounded-full font-bold ${getValueStyle()}`}>
            {handValue}
            {hasBlackjack && cards.length === 2 && ' (Blackjack!)'}
            {busted && ' (Bust!)'}
          </div>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2 justify-center">
        {cards.map((card, index) => (
          <div key={`player-card-${index}`} className="transform transition-transform hover:scale-105">
            <Card 
              card={card} 
              animationDelay={index * 100} 
            />
          </div>
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