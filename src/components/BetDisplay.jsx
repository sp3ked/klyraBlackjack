import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DollarSign, Award } from 'lucide-react';

const BetDisplay = ({ currentBet, winnings, gameStatus }) => {
    // Determine if we should show winnings
    const showWinnings = gameStatus === 'gameOver' && winnings > 0;

    return (
        <div className="flex flex-col items-center">
            {/* Current bet display */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center"
            >
                <div className="text-gray-300 text-sm mb-1">Current Bet</div>
                <div className="bg-gray-800 px-4 py-2 rounded-lg border border-casino-gold">
                    <span className="text-casino-gold font-bold text-xl">${currentBet}</span>
                </div>
            </motion.div>

            {/* Winnings display */}
            <AnimatePresence>
                {showWinnings && (
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 20, opacity: 0 }}
                        transition={{ delay: 0.3, duration: 0.3 }}
                        className="mt-4 flex flex-col items-center"
                    >
                        <div className="flex items-center text-casino-gold mb-1">
                            <Award size={16} className="mr-1" />
                            <span className="text-sm">You Won!</span>
                        </div>
                        <motion.div
                            animate={{
                                scale: [1, 1.1, 1],
                            }}
                            transition={{
                                duration: 0.5,
                                repeat: 2,
                                repeatType: "reverse"
                            }}
                            className="bg-casino-gold text-black font-bold px-4 py-2 rounded-lg shadow-lg flex items-center"
                        >
                            <DollarSign size={18} />
                            <span>{winnings}</span>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default BetDisplay; 