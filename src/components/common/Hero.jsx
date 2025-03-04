import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <div className="relative overflow-hidden bg-casino-black">
            {/* Background pattern */}
            <div className="absolute inset-0 z-0 opacity-20 bg-casino-pattern"></div>

            {/* Gold accent lines */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-casino-gold to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-casino-gold to-transparent"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-casino leading-tight">
                            <span className="text-casino-gold">Experience</span> the Thrill of <span className="text-casino-gold">Winning</span>
                        </h1>
                        <p className="mt-6 text-xl text-gray-300 font-display">
                            Welcome to Klyra Casino, where fortune favors the bold. Play our premium selection of casino games and win big!
                        </p>
                        <div className="mt-10 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                            <Link
                                to="/games"
                                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-casino-black bg-casino-gold hover:bg-yellow-500 shadow-lg hover:shadow-neon transition-all duration-300"
                            >
                                Play Now
                            </Link>
                            <Link
                                to="/promotions"
                                className="inline-flex items-center justify-center px-8 py-3 border border-casino-gold text-base font-medium rounded-md text-white hover:text-casino-gold hover:border-white transition-all duration-300"
                            >
                                View Promotions
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative mx-auto w-full max-w-md">
                            {/* Casino chips animation */}
                            <motion.div
                                animate={{
                                    y: [0, -10, 0],
                                    rotate: [0, 5, 0]
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 4,
                                    ease: "easeInOut"
                                }}
                                className="absolute -top-10 -right-10 z-20"
                            >
                                <div className="w-20 h-20 rounded-full bg-casino-red border-4 border-white shadow-lg flex items-center justify-center">
                                    <span className="text-white font-bold">100</span>
                                </div>
                            </motion.div>

                            <motion.div
                                animate={{
                                    y: [0, 10, 0],
                                    rotate: [0, -5, 0]
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 3.5,
                                    ease: "easeInOut",
                                    delay: 0.5
                                }}
                                className="absolute -bottom-5 -left-5 z-20"
                            >
                                <div className="w-16 h-16 rounded-full bg-casino-blue border-4 border-white shadow-lg flex items-center justify-center">
                                    <span className="text-white font-bold">50</span>
                                </div>
                            </motion.div>

                            {/* Cards */}
                            <div className="relative bg-white rounded-lg shadow-2xl overflow-hidden transform rotate-3 z-10">
                                <img
                                    src="https://via.placeholder.com/400x300"
                                    alt="Casino games"
                                    className="w-full h-auto"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <h3 className="text-white text-xl font-bold">Blackjack</h3>
                                    <p className="text-gray-300 text-sm">Test your skills against the dealer</p>
                                </div>
                            </div>

                            <div className="absolute top-10 -left-10 bg-white rounded-lg shadow-2xl overflow-hidden transform -rotate-6 z-0 w-full">
                                <img
                                    src="https://via.placeholder.com/400x300"
                                    alt="Casino games"
                                    className="w-full h-auto"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <h3 className="text-white text-xl font-bold">Roulette</h3>
                                    <p className="text-gray-300 text-sm">Where fortune meets fate</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Hero; 