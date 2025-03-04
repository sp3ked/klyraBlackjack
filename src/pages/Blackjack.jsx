import React, { useState, useEffect } from 'react';
import Layout from '../components/common/Layout';
import PlayerHand from '../components/PlayerHand';
import DealerHand from '../components/DealerHand';
import GameStatus from '../components/GameStatus';
import Stats from '../components/Stats';
import { Link } from 'react-router-dom';
import { ArrowLeft, Info, RefreshCw, Shuffle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { createFallbackDeck } from '../services/deckService';
import {
    calculateHandValue,
    isBusted,
    shouldDealerHit,
    determineWinner,
    initializeGame
} from '../utils/gameLogic';

const Blackjack = () => {
    // Game state
    const [deckId, setDeckId] = useState(null);
    const [cards, setCards] = useState([]);
    const [playerHand, setPlayerHand] = useState([]);
    const [dealerHand, setDealerHand] = useState([]);
    const [gameStatus, setGameStatus] = useState('idle'); // 'idle', 'dealing', 'playerTurn', 'dealerTurn', 'gameOver'
    const [gameResult, setGameResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showRules, setShowRules] = useState(false);
    const [deckCount, setDeckCount] = useState(6);
    const [isShuffling, setIsShuffling] = useState(false);

    // Game statistics
    const [stats, setStats] = useState({
        wins: 0,
        losses: 0,
        pushes: 0,
        blackjacks: 0
    });

    // Player balance and betting
    const [balance, setBalance] = useState(1000);
    const [currentBet, setCurrentBet] = useState(0);
    const [betAmount, setBetAmount] = useState(10);

    // Initialize or refresh the deck
    const initializeDeck = (numDecks = deckCount) => {
        try {
            setIsLoading(true);
            setIsShuffling(true);
            setError(null);

            // Use fallback deck directly to avoid API errors
            const fallbackDeck = createFallbackDeck(numDecks);
            setDeckId(fallbackDeck.id);
            setCards(fallbackDeck.deck.cards);

            setIsLoading(false);
            setIsShuffling(false);
        } catch (err) {
            console.error('Error initializing deck:', err);

            // Fallback to client-side deck if there's any error
            const fallbackDeck = createFallbackDeck(numDecks);
            setDeckId(fallbackDeck.id);
            setCards(fallbackDeck.deck.cards);

            setError('Could not initialize deck. Using local deck shuffle.');
            setIsLoading(false);
            setIsShuffling(false);
        }
    };

    // Handle deck count change
    const handleDeckCountChange = (e) => {
        const count = parseInt(e.target.value);
        setDeckCount(count);
        if (gameStatus === 'idle') {
            initializeDeck(count);
        }
    };

    // Handle bet amount change
    const handleBetChange = (e) => {
        const amount = parseInt(e.target.value);
        setBetAmount(amount);
    };

    // Deal cards to start a new game
    const handleDeal = () => {
        if (cards.length < 4) {
            initializeDeck();
            return;
        }

        // Place bet
        if (balance < betAmount) {
            setError("Not enough balance to place bet");
            return;
        }

        setBalance(balance - betAmount);
        setCurrentBet(betAmount);
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

        // Calculate winnings
        let winnings = 0;

        if (result === 'playerBlackjack') {
            newStats.wins += 1;
            newStats.blackjacks += 1;
            winnings = Math.floor(currentBet * 2.5); // Blackjack pays 3:2
        } else if (result === 'player' || result === 'dealerBust') {
            newStats.wins += 1;
            winnings = currentBet * 2; // Regular win pays 1:1
        } else if (result === 'dealer' || result === 'dealerBlackjack' || result === 'playerBust') {
            newStats.losses += 1;
            winnings = 0; // Loss
        } else if (result === 'push') {
            newStats.pushes += 1;
            winnings = currentBet; // Push returns the bet
        }

        setBalance(balance + winnings);
        setStats(newStats);
    };

    // Start a new game
    const handleNewGame = () => {
        setPlayerHand([]);
        setDealerHand([]);
        setGameStatus('idle');
        setGameResult(null);
        setCurrentBet(0);

        // If we're running low on cards, get a new deck
        if (cards.length < 10) {
            initializeDeck();
        }
    };

    // Manually reshuffle the deck
    const handleReshuffle = () => {
        if (gameStatus === 'idle') {
            initializeDeck();
        }
    };

    // Initialize the game on first load
    useEffect(() => {
        initializeDeck();
    }, []);

    return (
        <Layout>
            <div className="bg-gradient-to-b from-casino-black to-gray-900 min-h-screen">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
                    <div className="flex justify-between items-center mb-4">
                        <Link to="/" className="flex items-center text-white hover:text-casino-gold transition-colors">
                            <ArrowLeft className="mr-2" />
                            <span className="hidden sm:inline">Back to Home</span>
                            <span className="sm:hidden">Back</span>
                        </Link>
                        <div className="flex items-center space-x-2 md:space-x-4">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="flex items-center bg-gray-800 border border-casino-gold rounded-full px-3 py-1"
                            >
                                <span className="text-white text-sm font-medium ml-1">${balance}</span>
                            </motion.div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setShowRules(!showRules)}
                                className="flex items-center text-white hover:text-casino-gold transition-colors"
                            >
                                <Info className="h-5 w-5" />
                                <span className="ml-1 hidden md:inline">Rules</span>
                            </motion.button>
                        </div>
                    </div>

                    <AnimatePresence>
                        {showRules && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="bg-gray-800 rounded-lg p-4 md:p-6 mb-6 border border-gray-700"
                            >
                                <h3 className="text-xl font-bold text-white mb-4">Blackjack Rules</h3>
                                <ul className="text-gray-300 space-y-2 list-disc pl-5 text-sm md:text-base">
                                    <li>The goal is to beat the dealer by having a hand value closer to 21 without going over.</li>
                                    <li>Cards 2-10 are worth their face value. Face cards (J, Q, K) are worth 10. Aces are worth 1 or 11.</li>
                                    <li>You start with two cards. The dealer gets two cards, with one face down.</li>
                                    <li>You can "Hit" to get another card or "Stand" to keep your current hand.</li>
                                    <li>If you go over 21, you "bust" and lose the hand.</li>
                                    <li>After you stand, the dealer reveals their hidden card and must hit until they have 17 or higher.</li>
                                    <li>If the dealer busts, you win. Otherwise, the hand closest to 21 wins.</li>
                                    <li>Blackjack (an Ace and a 10-value card) pays 3:2.</li>
                                </ul>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setShowRules(false)}
                                    className="mt-4 text-casino-gold hover:text-yellow-500 transition-colors"
                                >
                                    Close
                                </motion.button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="bg-gray-800 rounded-lg shadow-2xl overflow-hidden border border-gray-700">
                        <div className="bg-casino-black border-b border-gray-700 p-3 md:p-4 flex justify-between items-center">
                            <h1 className="text-xl md:text-2xl font-bold text-white font-casino">Blackjack</h1>
                            {gameStatus !== 'idle' && (
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleNewGame}
                                    className="flex items-center text-white hover:text-casino-gold transition-colors"
                                >
                                    <RefreshCw className="h-5 w-5 mr-1" />
                                    <span className="hidden md:inline">New Game</span>
                                </motion.button>
                            )}
                        </div>

                        <div className="p-4 md:p-6 felt-bg">
                            {error && (
                                <div className="bg-red-900 border-l-4 border-red-500 text-white p-4 mb-6">
                                    <p>{error}</p>
                                </div>
                            )}

                            {/* Game settings */}
                            {gameStatus === 'idle' && (
                                <div className="bg-gray-800 rounded-lg p-4 mb-6 border border-gray-700">
                                    <div className="flex flex-wrap gap-4 justify-between items-center">
                                        <div>
                                            <label className="block text-white text-sm font-medium mb-1">Number of Decks</label>
                                            <select
                                                value={deckCount}
                                                onChange={handleDeckCountChange}
                                                className="bg-gray-700 text-white rounded-md px-3 py-2 border border-gray-600"
                                                disabled={isShuffling}
                                            >
                                                <option value="1">1 Deck</option>
                                                <option value="2">2 Decks</option>
                                                <option value="4">4 Decks</option>
                                                <option value="6">6 Decks (Standard)</option>
                                                <option value="8">8 Decks</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-white text-sm font-medium mb-1">Bet Amount</label>
                                            <select
                                                value={betAmount}
                                                onChange={handleBetChange}
                                                className="bg-gray-700 text-white rounded-md px-3 py-2 border border-gray-600"
                                            >
                                                <option value="5">$5</option>
                                                <option value="10">$10</option>
                                                <option value="25">$25</option>
                                                <option value="50">$50</option>
                                                <option value="100">$100</option>
                                            </select>
                                        </div>

                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={handleReshuffle}
                                            disabled={isShuffling}
                                            className="flex items-center bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-md"
                                        >
                                            <Shuffle className="h-4 w-4 mr-2" />
                                            {isShuffling ? 'Shuffling...' : 'Reshuffle Deck'}
                                        </motion.button>
                                    </div>
                                </div>
                            )}

                            <GameStatus
                                result={gameResult}
                                playerScore={calculateHandValue(playerHand)}
                                dealerScore={calculateHandValue(dealerHand)}
                                isVisible={gameStatus === 'gameOver'}
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

                            <div className="flex flex-wrap gap-3 mb-6 justify-center">
                                {gameStatus === 'idle' && (
                                    <button
                                        onClick={handleDeal}
                                        disabled={isLoading || cards.length < 4}
                                        className="bg-casino-gold hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-lg shadow-lg"
                                    >
                                        {isLoading ? 'Dealing...' : 'Deal Cards'}
                                    </button>
                                )}

                                {gameStatus === 'playerTurn' && (
                                    <>
                                        <button
                                            onClick={handleHit}
                                            disabled={isLoading || cards.length === 0}
                                            className="bg-casino-blue hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-md"
                                        >
                                            Hit
                                        </button>

                                        <button
                                            onClick={handleStand}
                                            disabled={isLoading}
                                            className="bg-casino-red hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg shadow-md"
                                        >
                                            Stand
                                        </button>
                                    </>
                                )}

                                {gameStatus === 'gameOver' && (
                                    <button
                                        onClick={handleNewGame}
                                        className="bg-casino-gold hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-lg shadow-lg"
                                    >
                                        Play Again
                                    </button>
                                )}

                                {cards.length < 10 && gameStatus !== 'dealing' && (
                                    <div className="text-yellow-300 text-sm font-bold">
                                        {cards.length === 0
                                            ? "Deck empty! Start a new game to reshuffle."
                                            : `Low on cards: ${cards.length} remaining`}
                                    </div>
                                )}
                            </div>

                            <Stats
                                wins={stats.wins}
                                losses={stats.losses}
                                pushes={stats.pushes}
                                blackjacks={stats.blackjacks}
                            />

                            <div className="mt-8 text-sm text-gray-400 text-center">
                                <p>Cards remaining in deck: {cards.length}</p>
                                <p>Using {deckCount} deck{deckCount > 1 ? 's' : ''}</p>
                                {deckId && deckId.startsWith('fallback') && (
                                    <p className="mt-1">Using local shuffling algorithm</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Blackjack; 