import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, DollarSign } from 'lucide-react';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isGamesMenuOpen, setIsGamesMenuOpen] = useState(false);
    const location = useLocation();
    const gamesMenuRef = useRef(null);

    // Hardcoded user data for now
    const user = {
        name: 'Player 1',
        balance: 1000,
        avatar: 'https://i.pravatar.cc/150?img=3',
        isLoggedIn: true
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (gamesMenuRef.current && !gamesMenuRef.current.contains(event.target)) {
                setIsGamesMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Close dropdown when route changes
    useEffect(() => {
        setIsGamesMenuOpen(false);
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    // Check if a link is active
    const isActive = (path) => {
        return location.pathname === path;
    };

    // Get link classes based on active state
    const getLinkClasses = (path) => {
        return `px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive(path)
                ? 'text-casino-gold bg-gray-800'
                : 'text-white hover:text-casino-gold'
            }`;
    };

    return (
        <nav className="bg-casino-black border-b border-casino-gold shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center">
                            <span className="text-casino-gold font-casino text-3xl font-bold">KLYRA</span>
                            <span className="ml-2 text-white font-casino text-xl">CASINO</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex md:items-center md:space-x-4">
                        <Link to="/" className={getLinkClasses('/')}>
                            Home
                        </Link>
                        <div className="relative" ref={gamesMenuRef}>
                            <button
                                onClick={() => setIsGamesMenuOpen(!isGamesMenuOpen)}
                                className={`flex items-center ${isActive('/blackjack') || isActive('/roulette') || isActive('/slots') || isActive('/poker')
                                        ? 'text-casino-gold bg-gray-800'
                                        : 'text-white hover:text-casino-gold'
                                    } px-3 py-2 rounded-md text-sm font-medium transition-colors`}
                            >
                                Games <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isGamesMenuOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isGamesMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-casino-black border border-casino-gold rounded-md shadow-lg z-10">
                                    <div className="py-1">
                                        <Link
                                            to="/blackjack"
                                            className={`block px-4 py-2 text-sm ${isActive('/blackjack')
                                                    ? 'bg-casino-gold text-casino-black font-bold'
                                                    : 'text-white hover:bg-casino-gold hover:text-casino-black'
                                                }`}
                                        >
                                            Blackjack
                                        </Link>
                                        <Link
                                            to="/roulette"
                                            className="block px-4 py-2 text-sm text-white hover:bg-casino-gold hover:text-casino-black"
                                        >
                                            Roulette
                                        </Link>
                                        <Link
                                            to="/slots"
                                            className="block px-4 py-2 text-sm text-white hover:bg-casino-gold hover:text-casino-black"
                                        >
                                            Slots
                                        </Link>
                                        <Link
                                            to="/poker"
                                            className="block px-4 py-2 text-sm text-white hover:bg-casino-gold hover:text-casino-black"
                                        >
                                            Poker
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                        <Link to="/promotions" className={getLinkClasses('/promotions')}>
                            Promotions
                        </Link>
                        <Link to="/about" className={getLinkClasses('/about')}>
                            About
                        </Link>
                    </div>

                    {/* User Balance */}
                    <div className="hidden md:flex md:items-center">
                        {user.isLoggedIn && (
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center bg-casino-black border border-casino-gold rounded-full px-3 py-1">
                                    <DollarSign className="h-4 w-4 text-casino-gold" />
                                    <span className="text-white text-sm font-medium ml-1">{user.balance}</span>
                                </div>
                                <div className="flex items-center">
                                    <img
                                        src={user.avatar}
                                        alt="User avatar"
                                        className="h-8 w-8 rounded-full border-2 border-casino-gold"
                                    />
                                    <span className="ml-2 text-white text-sm font-medium">{user.name}</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex md:hidden items-center">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-casino-gold focus:outline-none"
                        >
                            {isMobileMenuOpen ? (
                                <X className="block h-6 w-6" />
                            ) : (
                                <Menu className="block h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-casino-black border-t border-casino-gold">
                        <Link
                            to="/"
                            className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/') ? 'text-casino-gold bg-gray-800' : 'text-white hover:text-casino-gold'
                                }`}
                        >
                            Home
                        </Link>
                        <Link
                            to="/blackjack"
                            className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/blackjack') ? 'text-casino-gold bg-gray-800' : 'text-white hover:text-casino-gold'
                                }`}
                        >
                            Blackjack
                        </Link>
                        <Link
                            to="/roulette"
                            className="block text-white hover:text-casino-gold px-3 py-2 rounded-md text-base font-medium"
                        >
                            Roulette
                        </Link>
                        <Link
                            to="/slots"
                            className="block text-white hover:text-casino-gold px-3 py-2 rounded-md text-base font-medium"
                        >
                            Slots
                        </Link>
                        <Link
                            to="/poker"
                            className="block text-white hover:text-casino-gold px-3 py-2 rounded-md text-base font-medium"
                        >
                            Poker
                        </Link>
                        <Link
                            to="/promotions"
                            className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/promotions') ? 'text-casino-gold bg-gray-800' : 'text-white hover:text-casino-gold'
                                }`}
                        >
                            Promotions
                        </Link>
                        <Link
                            to="/about"
                            className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/about') ? 'text-casino-gold bg-gray-800' : 'text-white hover:text-casino-gold'
                                }`}
                        >
                            About
                        </Link>

                        {user.isLoggedIn && (
                            <>
                                <div className="flex items-center px-3 py-2">
                                    <img
                                        src={user.avatar}
                                        alt="User avatar"
                                        className="h-8 w-8 rounded-full border-2 border-casino-gold"
                                    />
                                    <span className="ml-2 text-white text-sm font-medium">{user.name}</span>
                                </div>
                                <div className="flex items-center px-3 py-2">
                                    <DollarSign className="h-4 w-4 text-casino-gold" />
                                    <span className="text-white text-sm font-medium ml-1">{user.balance}</span>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar; 