import React from 'react';
import { Shuffle, Plus, Hand, Square } from 'lucide-react';

const GameControls = ({
  onDeal,
  onHit,
  onStand,
  onNewGame,
  gameStatus,
  isLoading,
  cardsRemaining
}) => {
  // Game status can be 'idle', 'dealing', 'playerTurn', 'dealerTurn', 'gameOver'
  const isGameInProgress = gameStatus === 'playerTurn';
  const isGameOver = gameStatus === 'gameOver';
  const showDealButton = gameStatus === 'idle';
  
  return (
    <div className="flex flex-wrap gap-3 mb-6 justify-center">
      {showDealButton && (
        <button
          onClick={onDeal}
          disabled={isLoading || cardsRemaining < 4}
          className="btn btn-primary pulse-button"
        >
          {isLoading ? (
            <>
              <span className="mr-2">Dealing</span>
              <div className="animate-spin h-5 w-5 border-2 border-white rounded-full border-t-transparent"></div>
            </>
          ) : (
            <>
              <Shuffle className="w-5 h-5 mr-2" />
              Deal Cards
            </>
          )}
        </button>
      )}

      {isGameInProgress && (
        <>
          <button
            onClick={onHit}
            disabled={isLoading || cardsRemaining === 0}
            className="btn btn-success"
          >
            <Plus className="w-5 h-5 mr-2" />
            Hit
          </button>
          
          <button
            onClick={onStand}
            disabled={isLoading}
            className="btn btn-warning"
          >
            <Hand className="w-5 h-5 mr-2" />
            Stand
          </button>
        </>
      )}

      {isGameOver && (
        <button
          onClick={onNewGame}
          className="btn btn-primary"
        >
          <Square className="w-5 h-5 mr-2" />
          New Game
        </button>
      )}
      
      {cardsRemaining < 10 && gameStatus !== 'dealing' && (
        <div className="text-yellow-300 text-sm font-bold">
          {cardsRemaining === 0 
            ? "Deck empty! Start a new game to reshuffle." 
            : `Low on cards: ${cardsRemaining} remaining`}
        </div>
      )}
    </div>
  );
};

export default GameControls;