import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-casino-black border-t border-casino-gold">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Logo and About */}
                    <div className="col-span-1">
                        <div className="flex items-center mb-4">
                            <span className="text-casino-gold font-casino text-2xl font-bold">KLYRA</span>
                            <span className="ml-2 text-white font-casino text-lg">CASINO</span>
                        </div>
                        <p className="text-gray-400 text-sm mb-4">
                            Experience the thrill of our premium online casino. Play the best games, win big, and enjoy a secure gaming environment.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-casino-gold transition-colors">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-casino-gold transition-colors">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-casino-gold transition-colors">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-casino-gold transition-colors">
                                <Youtube size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Games */}
                    <div className="col-span-1">
                        <h3 className="text-white font-bold text-lg mb-4">Games</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/blackjack" className="text-gray-400 hover:text-casino-gold transition-colors text-sm">
                                    Blackjack
                                </Link>
                            </li>
                            <li>
                                <Link to="/roulette" className="text-gray-400 hover:text-casino-gold transition-colors text-sm">
                                    Roulette
                                </Link>
                            </li>
                            <li>
                                <Link to="/slots" className="text-gray-400 hover:text-casino-gold transition-colors text-sm">
                                    Slots
                                </Link>
                            </li>
                            <li>
                                <Link to="/poker" className="text-gray-400 hover:text-casino-gold transition-colors text-sm">
                                    Poker
                                </Link>
                            </li>
                            <li>
                                <Link to="/baccarat" className="text-gray-400 hover:text-casino-gold transition-colors text-sm">
                                    Baccarat
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div className="col-span-1">
                        <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/promotions" className="text-gray-400 hover:text-casino-gold transition-colors text-sm">
                                    Promotions
                                </Link>
                            </li>
                            <li>
                                <Link to="/vip" className="text-gray-400 hover:text-casino-gold transition-colors text-sm">
                                    VIP Program
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-gray-400 hover:text-casino-gold transition-colors text-sm">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/terms" className="text-gray-400 hover:text-casino-gold transition-colors text-sm">
                                    Terms & Conditions
                                </Link>
                            </li>
                            <li>
                                <Link to="/privacy" className="text-gray-400 hover:text-casino-gold transition-colors text-sm">
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="col-span-1">
                        <h3 className="text-white font-bold text-lg mb-4">Contact Us</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start">
                                <Mail className="text-casino-gold mr-2 h-5 w-5 mt-0.5" />
                                <span className="text-gray-400 text-sm">support@klyracasino.com</span>
                            </li>
                            <li className="flex items-start">
                                <Phone className="text-casino-gold mr-2 h-5 w-5 mt-0.5" />
                                <span className="text-gray-400 text-sm">+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-start">
                                <MapPin className="text-casino-gold mr-2 h-5 w-5 mt-0.5" />
                                <span className="text-gray-400 text-sm">
                                    123 Casino Boulevard, Las Vegas, NV 89109
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-500 text-sm">
                            &copy; {new Date().getFullYear()} Klyra Casino. All rights reserved.
                        </p>
                        <div className="flex space-x-4 mt-4 md:mt-0">
                            <img src="https://via.placeholder.com/40x25" alt="Visa" className="h-6" />
                            <img src="https://via.placeholder.com/40x25" alt="Mastercard" className="h-6" />
                            <img src="https://via.placeholder.com/40x25" alt="PayPal" className="h-6" />
                            <img src="https://via.placeholder.com/40x25" alt="Bitcoin" className="h-6" />
                        </div>
                    </div>
                    <div className="mt-4 text-center md:text-left">
                        <p className="text-gray-600 text-xs">
                            Gambling can be addictive. Please play responsibly.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 