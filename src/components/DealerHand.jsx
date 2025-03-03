import React from 'react';
import Card from './Card';
import { calculateHandValue, isBusted, hasNaturalBlackjack } from '../utils/gameLogic';

const DealerHand = ({ cards = [], hideSecondCard = false, isGameOver = false }) => {
  // If we're hiding the second card, only consider the first card for value display
  const visibleCards = hideSecondCard ? cards.slice(0, 1) : cards;
  const handValue = calculateHandValue(visibleCards);
  const fullHandValue = calculateHandValue(cards);
  
  const busted = isBusted(cards);
  const hasBlackjack = hasNaturalBlackjack(cards);
  
  // Determine value display style
  const getValueStyle = () => {
    if (busted) return 'bg-red-600 text-white';
    if (hasBlackjack && !hideSecondCard) return 'bg-yellow-400 text-black';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-2">
        <h2 className="text-xl font-bold text-white mr-4">Dealer's Hand</h2>
        
        {cards.length > 0 && (
          <div className={`px-3 py-1 rounded-full font-bold ${getValueStyle()}`}>
            {hideSecondCard ? `${handValue}+` : fullHandValue}
            {hasBlackjack && !hideSecondCard && cards.length === 2 && ' (Blackjack!)'}
            {busted && !hideSecondCard && ' (Bust!)'}
          </div>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2 justify-center">
        {cards.map((card, index) => (
          <div key={`dealer-card-${index}`} className="transform transition-transform hover:scale-105">
            <Card 
              card={card} 
              hidden={hideSecondCard && index === 1}
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

export default DealerHand;