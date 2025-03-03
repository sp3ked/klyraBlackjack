import React from 'react';

const Card = ({ card, hidden = false, animationDelay = 0 }) => {
  if (!card || hidden) {
    return (
      <div 
        className="card-hidden"
        style={{ animationDelay: `${animationDelay}ms` }}
      >
        <div className="card-pattern"></div>
      </div>
    );
  }

  const { rank, suit } = card;
  
  // Determine card colors
  const isRed = suit === 'hearts' || suit === 'diamonds';
  const textColor = isRed ? 'text-red-600' : 'text-black';
  
  // Get proper display for rank
  const displayRank = formatRank(rank);
  
  // Get proper symbol for suit
  const suitSymbol = getSuitSymbol(suit);
  
  return (
    <div 
      className={`card deal-animation ${textColor}`}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <div className="flex justify-between items-start">
        <div className="text-xl font-bold">{displayRank}</div>
        <div className="text-xl">{suitSymbol}</div>
      </div>
      
      <div className="flex-grow flex items-center justify-center">
        <div className="text-4xl">{suitSymbol}</div>
      </div>
      
      <div className="flex justify-between items-end">
        <div className="text-xl">{suitSymbol}</div>
        <div className="text-xl font-bold transform rotate-180">{displayRank}</div>
      </div>
    </div>
  );
};

// Helper function to format the rank for display
const formatRank = (rank) => {
  const rankMap = {
    'ace': 'A',
    'jack': 'J',
    'queen': 'Q',
    'king': 'K'
  };
  
  return rankMap[rank.toLowerCase()] || rank;
};

// Helper function to get the suit symbol
const getSuitSymbol = (suit) => {
  const suitMap = {
    'hearts': '♥',
    'diamonds': '♦',
    'clubs': '♣',
    'spades': '♠'
  };
  
  return suitMap[suit.toLowerCase()] || '';
};

export default Card;