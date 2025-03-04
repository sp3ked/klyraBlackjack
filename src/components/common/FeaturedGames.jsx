import React from 'react';
import GameCard from './GameCard';

const FeaturedGames = () => {
    // Hardcoded game data for now
    const games = [
        {
            id: 1,
            title: 'Blackjack',
            description: 'Beat the dealer to 21 without going over. The classic card game of skill and luck.',
            image: 'https://via.placeholder.com/400x300',
            path: '/blackjack',
            players: 128,
            minBet: 5,
            maxWin: 5000,
            featured: true
        },
        {
            id: 2,
            title: 'Roulette',
            description: 'Place your bets and watch the wheel spin. Will your number come up?',
            image: 'https://via.placeholder.com/400x300',
            path: '/roulette',
            players: 95,
            minBet: 1,
            maxWin: 3500,
            featured: true
        },
        {
            id: 3,
            title: 'Slots',
            description: 'Spin the reels and match symbols to win big. Exciting bonus rounds await!',
            image: 'https://via.placeholder.com/400x300',
            path: '/slots',
            players: 256,
            minBet: 0.5,
            maxWin: 10000,
            featured: false
        },
        {
            id: 4,
            title: 'Poker',
            description: 'Test your poker face and strategy against other players. Royal flushes welcome!',
            image: 'https://via.placeholder.com/400x300',
            path: '/poker',
            players: 72,
            minBet: 10,
            maxWin: 25000,
            featured: false
        }
    ];

    return (
        <section className="py-16 bg-gradient-to-b from-casino-black to-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white font-casino">
                        <span className="text-casino-gold">Popular</span> Games
                    </h2>
                    <div className="w-24 h-1 bg-casino-gold mx-auto mt-4"></div>
                    <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
                        Try your luck with our most popular casino games. From classic table games to exciting slots, we have something for everyone.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {games.map(game => (
                        <GameCard key={game.id} game={game} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedGames; 