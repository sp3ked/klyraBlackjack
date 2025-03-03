import React, { useState, useEffect } from 'react';
import './App.css';
import PlayerHand from './components/PlayerHand';
import DealerHand from './components/DealerHand';
import GameControls from './components/GameControls';
import GameStatus from './components/GameStatus';
import Stats from './components/Stats';
import { fetchShuffledDeck, getAllCards, createFallbackDeck } from './services/deckService';
import { 
  calculateHandValue, 
  isBusted, 
  shouldDealerHit, 
  determineWinner, 
  initializeGame
} from './utils/gameLogic';

function App() {
  // Game state
  const [deckId, setDeckId] = useState(null);
  const [cards, setCards] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [gameStatus, setGameStatus] = useState('idle'); // 'idle', 'dealing', 'playerTurn', 'dealerTurn', 'gameOver'
  const [gameResult, setGameResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Game statistics
  const [stats, setStats] = useState({
    wins: 0,
    losses: 0,
    pushes: 0,
    blackjacks: 0
  });
  
  // Initialize or refresh the deck
  const initializeDeck = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const deckData = await fetchShuffledDeck(1);
      setDeckId(deckData.id);
      setCards(deckData.deck.cards);
      
      setIsLoading(false);
    } catch (err) {
      console.error('Error fetching deck:', err);
      
      // Fallback to client-side deck if API fails
      const fallbackDeck = createFallbackDeck(1);
      setDeckId(fallbackDeck.id);
      setCards(fallbackDeck.deck.cards);
      
      setError('Could not connect to card API. Using local deck shuffle.');
      setIsLoading(false);
    }
  };
  
  // Deal cards to start a new game
  const handleDeal = () => {
    if (cards.length < 4) {
      initializeDeck();
      return;
    }
    
    setGameStatus('dealing');
    setGameResult(null);
    
    try {
      const { playerHand, dealerHand, remainingCards } = initializeGame(cards);
      
      setPlayerHand(playerHand);
      setDealerHand(dealerHand);
      setCards(remainingCards);
      
      // Check for initial blackjack
      const initialResult = determineWinner(playerHand, dealerHand);
      if (initialResult === 'playerBlackjack' || initialResult === 'dealerBlackjack' || initialResult === 'push') {
        handleGameEnd(initialResult, playerHand, dealerHand);
      } else {
        setGameStatus('playerTurn');
      }
    } catch (err) {
      setError(err.message);
      setGameStatus('idle');
    }
  };
  
  // Player hits (takes another card)
  const handleHit = () => {
    if (gameStatus !== 'playerTurn' || cards.length === 0) return;
    
    const newCard = cards[0];
    const newPlayerHand = [...playerHand, newCard];
    
    setPlayerHand(newPlayerHand);
    setCards(cards.slice(1));
    
    // Check if player busts
    if (isBusted(newPlayerHand)) {
      handleGameEnd('playerBust', newPlayerHand, dealerHand);
    }
  };
  
  // Player stands (dealer's turn)
  const handleStand = async () => {
    if (gameStatus !== 'playerTurn') return;
    
    setGameStatus('dealerTurn');
    
    // Deal cards to dealer until they reach 17 or higher
    let currentDealerHand = [...dealerHand];
    let currentCards = [...cards];
    
    // Simulate dealer play with a slight delay to show animation
    const dealerPlay = async () => {
      while (shouldDealerHit(currentDealerHand) && currentCards.length > 0) {
        const nextCard = currentCards[0];
        currentDealerHand = [...currentDealerHand, nextCard];
        currentCards = currentCards.slice(1);
        
        setDealerHand(currentDealerHand);
        setCards(currentCards);
        
        // Add a small delay to visualize dealer drawing cards
        await new Promise(resolve => setTimeout(resolve, 800));
        
        if (isBusted(currentDealerHand)) {
          break;
        }
      }
      
      const result = determineWinner(playerHand, currentDealerHand);
      handleGameEnd(result, playerHand, currentDealerHand);
    };
    
    dealerPlay();
  };
  
  // Handle the end of a game
  const handleGameEnd = (result, finalPlayerHand, finalDealerHand) => {
    setGameResult(result);
    setGameStatus('gameOver');
    
    // Update statistics
    const newStats = { ...stats };
    
    if (result === 'playerBlackjack') {
      newStats.wins += 1;
      newStats.blackjacks += 1;
    } else if (result === 'player' || result === 'dealerBust') {
      newStats.wins += 1;
    } else if (result === 'dealer' || result === 'dealerBlackjack' || result === 'playerBust') {
      newStats.losses += 1;
    } else if (result === 'push') {
      newStats.pushes += 1;
    }
    
    setStats(newStats);
  };
  
  // Start a new game
  const handleNewGame = () => {
    setPlayerHand([]);
    setDealerHand([]);
    setGameStatus('idle');
    setGameResult(null);
    
    // If we're running low on cards, get a new deck
    if (cards.length < 10) {
      initializeDeck();
    }
  };
  
  // Initialize the game on first load
  useEffect(() => {
    initializeDeck();
  }, []);

  return (
    <div className="min-h-screen felt-bg p-4 md:p-8 flex flex-col">
      <div className="max-w-4xl mx-auto bg-gray-900 bg-opacity-75 rounded-lg shadow-2xl p-6 md:p-8 w-full">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">Blackjack</h1>
          <p className="text-gray-300">Try your luck against the dealer!</p>
        </header>
        
        {error && (
          <div className="bg-red-900 border-l-4 border-red-500 text-white p-4 mb-6">
            <p>{error}</p>
          </div>
        )}
        
        <GameStatus 
          result={gameResult} 
          playerScore={calculateHandValue(playerHand)} 
          dealerScore={calculateHandValue(dealerHand)} 
          isVisible={gameStatus === 'gameOver'}
        />
        
        <GameControls 
          onDeal={handleDeal}
          onHit={handleHit}
          onStand={handleStand}
          onNewGame={handleNewGame}
          gameStatus={gameStatus}
          isLoading={isLoading}
          cardsRemaining={cards.length}
        />
        
        <div className="table-area bg-felt-green p-6 rounded-lg mb-6">
          <DealerHand 
            cards={dealerHand} 
            hideSecondCard={gameStatus === 'playerTurn'} 
            isGameOver={gameStatus === 'gameOver'}
          />
          
          <div className="border-t border-white border-opacity-20 my-8"></div>
          
          <PlayerHand 
            cards={playerHand} 
            isGameOver={gameStatus === 'gameOver'}
          />
        </div>
        
        {/* Show statistics */}
        <Stats 
          wins={stats.wins}
          losses={stats.losses}
          pushes={stats.pushes}
          blackjacks={stats.blackjacks}
        />
        
        <div className="mt-8 text-sm text-gray-400 text-center">
          <p>Cards remaining in deck: {cards.length}</p>
          {deckId && deckId.startsWith('fallback') && (
            <p className="mt-1">Using local shuffling algorithm</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;