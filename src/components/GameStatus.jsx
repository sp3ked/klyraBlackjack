import React from 'react';
import { getResultMessage } from '../utils/gameLogic';

const GameStatus = ({ 
  result, 
  playerScore, 
  dealerScore, 
  isVisible = false 
}) => {
  if (!isVisible || !result) return null;

  const message = getResultMessage(result, playerScore, dealerScore);
  
  // Determine the style based on result
  const getStatusStyle = () => {
    if (result.includes('player') && !result.includes('Bust')) {
      return 'bg-green-700 border-green-600';
    } else if (result === 'push') {
      return 'bg-yellow-700 border-yellow-600';
    } else if (result === 'dealerBust') {
      return 'bg-green-700 border-green-600';
    } else {
      return 'bg-red-700 border-red-600';
    }
  };

  return (
    <div className={`border-l-4 p-4 mb-6 text-white ${getStatusStyle()} fade-in`}>
      <p className="font-bold text-lg">{message}</p>
    </div>
  );
};

export default GameStatus;