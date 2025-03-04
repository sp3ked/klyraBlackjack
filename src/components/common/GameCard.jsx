import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const GameCard = ({ game }) => {
    return (
        <motion.div
            className="group relative rounded-xl overflow-hidden shadow-lg bg-casino-black border border-gray-800 hover:border-casino-gold transition-all duration-300"
            whileHover={{
                y: -5,
                transition: { duration: 0.2 }
            }}
        >
            <div className="relative aspect-[4/3] overflow-hidden">
                <img
                    src={game.image}
                    alt={game.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>

                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Link
                        to={game.path}
                        className="bg-casino-gold hover:bg-yellow-500 text-casino-black rounded-full p-4 transform transition-transform duration-300 hover:scale-110 shadow-neon"
                    >
                        <Play className="h-8 w-8" />
                    </Link>
                </div>
            </div>

            <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-bold text-white">{game.title}</h3>
                    <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                        <span className="text-xs text-green-500">{game.players} Playing</span>
                    </div>
                </div>
                <p className="text-gray-400 text-sm mb-4">{game.description}</p>
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <span className="text-xs text-gray-500 mr-2">Min Bet:</span>
                        <span className="text-sm text-casino-gold font-bold">${game.minBet}</span>
                    </div>
                    <div className="flex items-center">
                        <span className="text-xs text-gray-500 mr-2">Max Win:</span>
                        <span className="text-sm text-casino-gold font-bold">${game.maxWin}</span>
                    </div>
                </div>
            </div>

            {/* Ribbon for featured games */}
            {game.featured && (
                <div className="absolute top-0 right-0">
                    <div className="bg-casino-gold text-casino-black text-xs font-bold px-3 py-1 transform rotate-45 translate-x-6 translate-y-3 shadow-md">
                        HOT
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default GameCard;

