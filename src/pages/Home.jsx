import React from 'react';
import Layout from '../components/common/Layout';
import Hero from '../components/common/Hero';
import FeaturedGames from '../components/common/FeaturedGames';
import Promotions from '../components/common/Promotions';
import ChipsScene from '../components/3D/ChipsScene';
import { motion } from 'framer-motion';
import { Shield, Clock, CreditCard, Award } from 'lucide-react';

// Update the Hero component to include 3D chips
const CustomHero = () => {
    return (
        <div className="relative overflow-hidden bg-gradient-to-b from-casino-black to-gray-900 py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Hero content */}
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
                        >
                            <span className="text-casino-gold">Experience</span> the Thrill of Casino Gaming
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-gray-300 text-lg md:text-xl mb-8"
                        >
                            Play your favorite casino games with stunning graphics and realistic gameplay. No download required.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="flex flex-wrap gap-4"
                        >
                            <a href="/blackjack" className="bg-casino-gold hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105">
                                Play Now
                            </a>
                            <a href="#games" className="bg-transparent border-2 border-casino-gold text-casino-gold hover:bg-casino-gold hover:text-black font-bold py-3 px-6 rounded-lg transition-all duration-300">
                                Explore Games
                            </a>
                        </motion.div>
                    </div>

                    {/* 3D Casino Chips */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-[400px] w-full rounded-xl overflow-hidden shadow-2xl"
                    >
                        <ChipsScene className="w-full h-full" />
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

const Home = () => {
    // Features section data
    const features = [
        {
            icon: <Shield className="h-10 w-10 text-casino-gold" />,
            title: 'Secure Gaming',
            description: 'We use the latest encryption technology to ensure your data and transactions are always protected.'
        },
        {
            icon: <Clock className="h-10 w-10 text-casino-gold" />,
            title: '24/7 Support',
            description: 'Our dedicated support team is available around the clock to assist you with any questions or issues.'
        },
        {
            icon: <CreditCard className="h-10 w-10 text-casino-gold" />,
            title: 'Fast Payouts',
            description: 'Enjoy quick and hassle-free withdrawals with our efficient payment processing system.'
        },
        {
            icon: <Award className="h-10 w-10 text-casino-gold" />,
            title: 'Fair Play',
            description: 'All our games are regularly audited to ensure fair play and random outcomes for all players.'
        }
    ];

    return (
        <Layout>
            <CustomHero />
            <FeaturedGames />

            {/* Features Section */}
            <section className="py-16 bg-gradient-to-b from-gray-900 to-casino-black">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Choose <span className="text-casino-gold">Klyra Casino</span></h2>
                        <p className="text-gray-300 max-w-3xl mx-auto">Experience the best online casino gaming with our premium features and services.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:bg-gray-700"
                            >
                                <div className="mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                                <p className="text-gray-300">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Promotions />

            {/* Testimonials Section */}
            <section className="py-16 bg-gradient-to-b from-casino-black to-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What Our <span className="text-casino-gold">Players Say</span></h2>
                        <p className="text-gray-300 max-w-3xl mx-auto">Hear from our satisfied players about their experience with Klyra Casino.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-gray-800 rounded-xl p-6 shadow-lg"
                            >
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 rounded-full bg-casino-gold flex items-center justify-center text-black font-bold text-xl mr-4">
                                        {['J', 'S', 'M'][index]}
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold">{['John D.', 'Sarah M.', 'Michael R.'][index]}</h4>
                                        <p className="text-gray-400 text-sm">Player since {[2021, 2020, 2022][index]}</p>
                                    </div>
                                </div>
                                <p className="text-gray-300 italic">"{
                                    index === 0 ? 'The games are incredibly realistic and the bonuses are generous. I\'ve had a great time playing here!' :
                                        index === 1 ? 'Customer support is top-notch. Any issues I\'ve had were resolved quickly and professionally.' :
                                            'I love the variety of games available. There\'s always something new to try and the interface is very user-friendly.'
                                }"</p>
                                <div className="mt-4 flex">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-5 h-5 text-casino-gold" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-casino-black">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-r from-casino-blue to-casino-purple rounded-2xl p-8 md:p-12 shadow-2xl">
                        <div className="text-center">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Start Playing?</h2>
                            <p className="text-gray-200 max-w-3xl mx-auto mb-8">Join thousands of players and experience the thrill of our casino games. Get started with a welcome bonus!</p>
                            <motion.a
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                href="/blackjack"
                                className="inline-block bg-casino-gold hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-lg shadow-lg transition-all duration-300"
                            >
                                Play Now
                            </motion.a>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Home; 