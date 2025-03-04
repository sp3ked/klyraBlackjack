import React from 'react';
import Layout from '../components/common/Layout';
import { Link, useParams, useLocation } from 'react-router-dom';
import { ArrowLeft, Construction } from 'lucide-react';
import { motion } from 'framer-motion';

const ComingSoon = () => {
    const { pathname } = useLocation();
    const pageName = pathname.substring(1).charAt(0).toUpperCase() + pathname.substring(2);

    return (
        <Layout>
            <div className="bg-gradient-to-b from-casino-black to-gray-900 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex justify-between items-center mb-8">
                        <Link to="/" className="flex items-center text-white hover:text-casino-gold transition-colors">
                            <ArrowLeft className="mr-2" />
                            Back to Home
                        </Link>
                    </div>

                    <div className="flex flex-col items-center justify-center py-24">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="bg-gray-800 rounded-lg p-12 border border-gray-700 text-center max-w-2xl"
                        >
                            <Construction className="h-24 w-24 text-casino-gold mx-auto mb-6" />
                            <h1 className="text-3xl font-bold text-white font-casino mb-4">{pageName} Coming Soon</h1>
                            <p className="text-gray-300 mb-8">
                                Our development team is working hard to bring you an exciting {pageName} experience.
                                Check back soon for more updates!
                            </p>
                            <Link
                                to="/blackjack"
                                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-casino-black bg-casino-gold hover:bg-yellow-500 shadow-lg hover:shadow-neon transition-all duration-300"
                            >
                                Play Blackjack Instead
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ComingSoon; 