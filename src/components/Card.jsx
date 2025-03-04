import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ card, hidden = false }) => {
  // If no card is provided, return an empty placeholder
  if (!card) return null;

  // Get suit and rank from card object
  const { suit, rank } = card;

  // Determine card color based on suit
  const isRed = suit === 'hearts' || suit === 'diamonds';
  const textColor = isRed ? 'text-red-600' : 'text-black';

  // Get suit symbol
  const getSuitSymbol = () => {
    switch (suit) {
      case 'spades': return '♠';
      case 'hearts': return '♥';
      case 'diamonds': return '♦';
      case 'clubs': return '♣';
      default: return '';
    }
  };

  // Format the rank for display
  const formatRank = () => {
    switch (rank.toLowerCase()) {
      case 'ace': return 'A';
      case '10': return '10';
      case 'jack': return 'J';
      case 'queen': return 'Q';
      case 'king': return 'K';
      default: return rank;
    }
  };

  // Card back design (shown when hidden is true)
  const CardBack = () => (
    <div className="w-24 h-36 rounded-lg bg-gradient-to-br from-blue-800 to-purple-800 border-2 border-white flex items-center justify-center overflow-hidden shadow-lg">
      <div className="w-20 h-32 border-2 border-casino-gold rounded-md flex items-center justify-center bg-blue-900">
        <div className="grid grid-cols-3 grid-rows-3 gap-1 w-full h-full p-2">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="bg-casino-gold opacity-30 rounded-full"></div>
          ))}
        </div>
      </div>
    </div>
  );

  // Card front design
  const CardFront = () => (
    <div className="w-24 h-36 bg-white rounded-lg border-2 border-gray-300 shadow-lg flex flex-col p-2 overflow-hidden">
      {/* Top left corner */}
      <div className={`flex flex-col items-start ${textColor}`}>
        <div className="text-xl font-bold leading-none">{formatRank()}</div>
        <div className="text-xl leading-none">{getSuitSymbol()}</div>
      </div>

      {/* Center symbol */}
      <div className={`flex-grow flex items-center justify-center ${textColor} text-5xl font-bold`}>
        {getSuitSymbol()}
      </div>

      {/* Bottom right corner (rotated) */}
      <div className={`flex flex-col items-end transform rotate-180 ${textColor}`}>
        <div className="text-xl font-bold leading-none">{formatRank()}</div>
        <div className="text-xl leading-none">{getSuitSymbol()}</div>
      </div>
    </div>
  );

  return (
    <div className="flip-card" style={{ width: '96px', height: '144px' }}>
      <motion.div
        className="flip-card-inner w-full h-full relative"
        initial={{ rotateY: hidden ? 0 : 180 }}
        animate={{ rotateY: hidden ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="flip-card-front absolute w-full h-full" style={{ backfaceVisibility: 'hidden' }}>
          <CardFront />
        </div>
        <div className="flip-card-back absolute w-full h-full" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
          <CardBack />
        </div>
      </motion.div>
    </div>
  );
};

export default Card;