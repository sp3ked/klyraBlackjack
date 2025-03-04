import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Gift, Clock, DollarSign, Award } from 'lucide-react';

const Promotions = () => {
    // Hardcoded promotions data for now
    const promotions = [
        {
            id: 1,
            title: 'Welcome Bonus',
            description: 'Get a 100% match on your first deposit up to $1000 plus 50 free spins!',
            icon: <Gift className="h-8 w-8 text-casino-gold" />,
            color: 'bg-gradient-to-br from-purple-900 to-indigo-800',
            buttonText: 'Claim Now',
            buttonLink: '/promotions/welcome',
            expiryDate: '2023-12-31'
        },
        {
            id: 2,
            title: 'Daily Cashback',
            description: 'Receive 10% cashback on all losses every day, automatically credited to your account.',
            icon: <DollarSign className="h-8 w-8 text-casino-gold" />,
            color: 'bg-gradient-to-br from-blue-900 to-blue-800',
            buttonText: 'Learn More',
            buttonLink: '/promotions/cashback',
            expiryDate: 'Ongoing'
        },
        {
            id: 3,
            title: 'Weekend Reload',
            description: 'Reload your account on weekends and get a 50% bonus up to $500 every Saturday and Sunday.',
            icon: <Clock className="h-8 w-8 text-casino-gold" />,
            color: 'bg-gradient-to-br from-red-900 to-red-800',
            buttonText: 'Get Bonus',
            buttonLink: '/promotions/reload',
            expiryDate: 'Ongoing'
        },
        {
            id: 4,
            title: 'VIP Program',
            description: 'Join our exclusive VIP program for personalized bonuses, faster withdrawals, and dedicated support.',
            icon: <Award className="h-8 w-8 text-casino-gold" />,
            color: 'bg-gradient-to-br from-green-900 to-green-800',
            buttonText: 'Join VIP',
            buttonLink: '/vip',
            expiryDate: 'Ongoing'
        }
    ];

    return (
        <section className="py-16 bg-casino-black relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 z-0 opacity-5 bg-casino-pattern"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white font-casino">
                        <span className="text-casino-gold">Exclusive</span> Promotions
                    </h2>
                    <div className="w-24 h-1 bg-casino-gold mx-auto mt-4"></div>
                    <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
                        Take advantage of our generous bonuses and promotions to boost your bankroll and extend your playtime.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {promotions.map((promo, index) => (
                        <motion.div
                            key={promo.id}
                            className={`${promo.color} rounded-xl overflow-hidden shadow-lg border border-gray-800 hover:border-casino-gold transition-all duration-300`}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <div className="p-6">
                                <div className="flex items-center mb-4">
                                    {promo.icon}
                                    <h3 className="text-xl font-bold text-white ml-3">{promo.title}</h3>
                                </div>
                                <p className="text-gray-300 text-sm mb-6 min-h-[60px]">{promo.description}</p>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center text-xs text-gray-400">
                                        <Clock className="h-4 w-4 mr-1" />
                                        <span>Expires: {promo.expiryDate}</span>
                                    </div>
                                    <Link
                                        to={promo.buttonLink}
                                        className="bg-casino-gold hover:bg-yellow-500 text-casino-black px-4 py-2 rounded text-sm font-medium transition-colors"
                                    >
                                        {promo.buttonText}
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link
                        to="/promotions"
                        className="inline-flex items-center justify-center px-6 py-3 border border-casino-gold text-base font-medium rounded-md text-white hover:text-casino-gold hover:border-white transition-all duration-300"
                    >
                        View All Promotions
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Promotions; 