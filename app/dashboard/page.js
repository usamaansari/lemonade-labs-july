'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

const DashboardPage = () => {
  const router = useRouter();

  // Check if user has completed onboarding
  useEffect(() => {
    // In a real app, you would check authentication status here
    const isAuthenticated = localStorage.getItem('onboardingComplete');
    
    if (!isAuthenticated) {
      toast.success('Welcome to your new business!');
      localStorage.setItem('onboardingComplete', 'true');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-fredoka font-bold text-amber-700 mb-4">
            Welcome to Your Business Dashboard!
          </h1>
          <p className="text-xl text-amber-800 max-w-3xl mx-auto">
            Get ready to start your entrepreneurial journey. Here's what you can do next:
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: 'Business Plan',
              description: 'Create a simple business plan to guide your journey.',
              icon: '📝',
              action: 'Start Planning',
              color: 'from-blue-500 to-blue-600',
              onClick: () => router.push('/dashboard/business-plan')
            },
            {
              title: 'Inventory',
              description: 'Track your products and supplies.',
              icon: '📦',
              action: 'Manage Inventory',
              color: 'from-green-500 to-green-600',
              onClick: () => router.push('/dashboard/inventory')
            },
            {
              title: 'Customers',
              description: 'Keep track of your customers and orders.',
              icon: '👥',
              action: 'View Customers',
              color: 'from-purple-500 to-purple-600',
              onClick: () => router.push('/dashboard/customers')
            },
            {
              title: 'Finances',
              description: 'Track your earnings and expenses.',
              icon: '💰',
              action: 'View Finances',
              color: 'from-yellow-500 to-yellow-600',
              onClick: () => router.push('/dashboard/finances')
            },
            {
              title: 'Marketing',
              description: 'Promote your business with fun ideas.',
              icon: '📢',
              action: 'Get Ideas',
              color: 'from-pink-500 to-pink-600',
              onClick: () => router.push('/dashboard/marketing')
            },
            {
              title: 'Settings',
              description: 'Update your business information.',
              icon: '⚙️',
              action: 'Go to Settings',
              color: 'from-gray-500 to-gray-600',
              onClick: () => router.push('/dashboard/settings')
            },
          ].map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              onClick={card.onClick}
              className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className={`h-2 bg-gradient-to-r ${card.color}`}></div>
              <div className="p-6">
                <div className="text-4xl mb-4">{card.icon}</div>
                <h3 className="text-xl font-bold text-amber-900 mb-2">{card.title}</h3>
                <p className="text-amber-700 mb-4">{card.description}</p>
                <button className="text-sm font-medium text-amber-600 hover:text-amber-800 transition-colors">
                  {card.action} →
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 bg-white rounded-xl shadow-md p-6 text-center"
        >
          <h2 className="text-2xl font-bold text-amber-800 mb-4">Need Help?</h2>
          <p className="text-amber-700 mb-6 max-w-2xl mx-auto">
            Check out our guide for young entrepreneurs or ask a parent for help if you get stuck!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-6 py-3 bg-amber-100 text-amber-800 rounded-full font-medium hover:bg-amber-200 transition-colors">
              View Tutorials
            </button>
            <button className="px-6 py-3 bg-amber-500 text-white rounded-full font-medium hover:bg-amber-600 transition-colors">
              Ask a Question
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;
