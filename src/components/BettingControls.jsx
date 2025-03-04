import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, RotateCcw, DollarSign, ChevronUp, ChevronDown } from 'lucide-react';

const BettingControls = ({ balance, onPlaceBet, disabled }) => {
    const [betAmount, setBetAmount] = useState(10);
    const chipValues = [5, 25, 100, 500];

    const handleIncreaseBet = (amount) => {
        if (betAmount + amount <= balance) {
            setBetAmount(prev => prev + amount);
        }
    };

    const handleDecreaseBet = (amount) => {
        if (betAmount - amount >= 5) {
            setBetAmount(prev => prev - amount);
        }
    };

    const handleResetBet = () => {
        setBetAmount(10);
    };

    const handlePlaceBet = () => {
        if (betAmount > 0 && betAmount <= balance) {
            onPlaceBet(betAmount);
        }
    };

    const getChipColor = (value) => {
        switch (value) {
            case 5: return 'bg-white border-red-500 text-red-500';
            case 25: return 'bg-casino-red text-white';
            case 100: return 'bg-casino-blue text-white';
            case 500: return 'bg-casino-gold text-black';
            default: return 'bg-gray-200 text-gray-800';
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto">
            <div className="text-center mb-4">
                <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Place Your Bet</h2>
                <p className="text-gray-300 text-sm md:text-base">Balance: <span className="text-casino-gold font-bold">${balance}</span></p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {/* Betting chips */}
                <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                    {chipValues.map((value) => (
                        <motion.button
                            key={`chip-${value}`}
                            whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)' }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleIncreaseBet(value)}
                            disabled={disabled || value + betAmount > balance}
                            className={`relative w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center font-bold text-lg md:text-xl shadow-lg border-4 ${getChipColor(value)} disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                            <div className="absolute inset-0 rounded-full border-2 border-white border-opacity-20"></div>
                            <div className="absolute inset-2 md:inset-3 rounded-full border border-white border-opacity-10"></div>
                            ${value}
                        </motion.button>
                    ))}
                </div>

                {/* Bet controls */}
                <div className="flex flex-col items-center justify-center">
                    <div className="bg-gray-800 rounded-lg p-4 w-full max-w-xs">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-300">Current Bet:</span>
                            <motion.span
                                key={betAmount}
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                className="text-casino-gold font-bold text-xl"
                            >
                                ${betAmount}
                            </motion.span>
                        </div>

                        {/* Bet adjustment buttons */}
                        <div className="flex justify-between gap-2 mb-4">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleDecreaseBet(5)}
                                disabled={betAmount <= 5 || disabled}
                                className="bg-gray-700 hover:bg-gray-600 text-white rounded-lg p-2 flex-1 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Minus size={18} />
                                <span className="ml-1">5</span>
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleResetBet}
                                disabled={disabled}
                                className="bg-gray-700 hover:bg-gray-600 text-white rounded-lg p-2 flex-1 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <RotateCcw size={18} />
                                <span className="ml-1">Reset</span>
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleIncreaseBet(5)}
                                disabled={betAmount + 5 > balance || disabled}
                                className="bg-gray-700 hover:bg-gray-600 text-white rounded-lg p-2 flex-1 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Plus size={18} />
                                <span className="ml-1">5</span>
                            </motion.button>
                        </div>

                        {/* Mobile-friendly slider for bet amount */}
                        <div className="mb-4 px-2">
                            <input
                                type="range"
                                min="5"
                                max={balance}
                                step="5"
                                value={betAmount}
                                onChange={(e) => setBetAmount(parseInt(e.target.value))}
                                disabled={disabled}
                                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-casino-gold"
                            />
                            <div className="flex justify-between text-xs text-gray-400 mt-1">
                                <span>$5</span>
                                <span>${Math.min(balance, 1000)}</span>
                            </div>
                        </div>

                        {/* Place bet button */}
                        <motion.button
                            whileHover={{ scale: 1.03, boxShadow: '0 0 15px rgba(255, 215, 0, 0.5)' }}
                            whileTap={{ scale: 0.97 }}
                            onClick={handlePlaceBet}
                            disabled={betAmount <= 0 || betAmount > balance || disabled}
                            className="w-full bg-casino-gold hover:bg-yellow-500 text-black font-bold py-3 rounded-lg shadow-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <DollarSign size={20} />
                            <span className="ml-1">Place Bet</span>
                        </motion.button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BettingControls; 