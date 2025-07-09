'use client';

import LemonIcon from '@/components/LemonIcon';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  const businessExamples = [
    {
      title: "Lemonade",
      time: "1 minute ago",
      color: "bg-yellow-400",
      icon: "🍋",
      child: "👧🏻"
    },
    {
      title: "Slime Shop", 
      time: "2 minutes ago",
      color: "bg-green-400",
      icon: "🧪",
      child: "👧🏾"
    },
    {
      title: "James' Dog Walking",
      time: "5 minutes ago", 
      color: "bg-blue-200",
      icon: "🐕",
      child: "👦🏻"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-300 relative overflow-hidden">
      {/* Background Clouds */}
      <div className="absolute top-10 right-20 opacity-80">
        <div className="relative">
          <div className="w-12 h-12 bg-white rounded-full"></div>
          <div className="w-16 h-16 bg-white rounded-full absolute -right-6 top-2"></div>
          <div className="w-10 h-10 bg-white rounded-full absolute -right-10 top-4"></div>
          <div className="w-8 h-8 bg-white rounded-full absolute -right-14 top-6"></div>
          <div className="w-9 h-9 bg-white rounded-full absolute -right-18 top-8"></div>
        </div>
      </div>
     
      {/* Lemon with drops */}
      <motion.div 
        className="absolute top-20 left-16 z-10"
        initial={{ rotate: 0 }}
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-36 h-36 bg-yellow-300 rounded-full relative">
          {/* Lemon segments */}
          <LemonIcon className="w-36 h-36 absolute" />
        </div>
        {/* Lemon drops */}
        <motion.div 
          className="absolute -bottom-2 left-8 w-5 h-5 bg-yellow-400 rounded-full"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        ></motion.div>
        <motion.div 
          className="absolute -bottom-8 left-6 w-3 h-3 bg-yellow-400 rounded-full"
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
        ></motion.div>
        <motion.div 
          className="absolute -bottom-12 left-10 w-2 h-2 bg-yellow-400 rounded-full"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
        ></motion.div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12 text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-6xl font-black text-blue-900 mb-6 tracking-tight">
            LEMONADE LAB
          </h1>
          
          <h2 className="text-4xl font-bold text-blue-900 mb-8 leading-tight max-w-2xl mx-auto">
            Where young minds learn to build big ideas
          </h2>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              href="/onboarding" 
              className="inline-block bg-red-400 hover:bg-red-500 text-white font-bold py-4 px-12 rounded-full text-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Create Your Business
            </Link>
          </motion.div>
        </motion.div>

        {/* Business Examples */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {businessExamples.map((business, index) => (
            <motion.div
              key={index}
              className={`${business.color} rounded-3xl p-6 shadow-lg transform hover:scale-105 transition-all duration-300`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              {/* Business Stand/Header */}
              <div className="bg-white bg-opacity-30 rounded-2xl p-4 mb-4 relative">
                {index === 0 && (
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-yellow-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    LEMONADE
                  </div>
                )}
                {index === 1 && (
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                    SLIME SHOP
                  </div>
                )}
                {index === 2 && (
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                    JAMES' DOG WALKING
                  </div>
                )}
                
                {/* Character and Business Items */}
                <div className="flex items-center justify-center space-x-4 pt-4">
                  <div className="text-6xl">{business.child}</div>
                  {index === 0 && (
                    <div className="flex space-x-2">
                      <div className="w-8 h-12 bg-yellow-200 rounded-lg flex items-center justify-center text-2xl">🥤</div>
                      <div className="w-6 h-8 bg-yellow-300 rounded-full"></div>
                    </div>
                  )}
                  {index === 1 && (
                    <div className="flex space-x-2">
                      <div className="w-6 h-8 bg-green-300 rounded-lg"></div>
                      <div className="w-6 h-8 bg-blue-300 rounded-lg"></div>
                      <div className="w-6 h-8 bg-purple-300 rounded-lg"></div>
                    </div>
                  )}
                  {index === 2 && (
                    <div className="text-4xl">🐕</div>
                  )}
                </div>
              </div>
              
              {/* Business Info */}
              <div className="text-left">
                <h3 className="text-2xl font-bold text-blue-900 mb-1">{business.title}</h3>
                <p className="text-blue-700 text-sm opacity-75">{business.time}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* How It Works Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-white bg-opacity-20 backdrop-blur-sm rounded-3xl p-8 mb-8"
        >
          <h2 className="text-4xl font-bold text-blue-900 mb-6">
            How Lemonade Lab Works?
          </h2>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              href="/learn-more" 
              className="inline-block bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-4 px-10 rounded-full text-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              Learn More
            </Link>
          </motion.div>
        </motion.div>
      </div>
      {/* Services Section */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">What Kids Learn</h2>
            <div className="w-20 h-1 bg-red-400 mx-auto mb-6"></div>
            <p className="text-xl text-blue-700 max-w-2xl mx-auto">
              Build real business skills through fun, interactive experiences designed just for young entrepreneurs!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "💡",
                title: "Business Ideas",
                description: "Discover creative ways to turn hobbies into businesses",
                color: "bg-yellow-100 border-yellow-300"
              },
              {
                icon: "💰",
                title: "Money Management",
                description: "Learn to count profits, set prices, and save earnings",
                color: "bg-green-100 border-green-300"
              },
              {
                icon: "🎯",
                title: "Goal Setting",
                description: "Set achievable targets and track your progress",
                color: "bg-blue-100 border-blue-300"
              },
              {
                icon: "🤝",
                title: "Customer Service",
                description: "Practice being friendly and helpful to customers",
                color: "bg-purple-100 border-purple-300"
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                className={`${service.color} border-2 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">{service.title}</h3>
                <p className="text-blue-700 text-sm leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Achievement Badges Preview */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-blue-900 mb-8">Earn Cool Badges!</h3>
            <div className="flex justify-center space-x-4 flex-wrap gap-4">
              {[
                { badge: "🥇", name: "First Sale" },
                { badge: "🌟", name: "Super Seller" },
                { badge: "🏆", name: "Goal Crusher" },
                { badge: "👑", name: "Business Boss" }
              ].map((achievement, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-yellow-300 to-yellow-500 w-20 h-20 rounded-full flex items-center justify-center shadow-lg border-4 border-yellow-600"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <span className="text-2xl">{achievement.badge}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo and Description */}
            <div className="md:col-span-2">
              <h3 className="text-3xl font-bold mb-4 text-yellow-400">🍋 LEMONADE LAB</h3>
              <p className="text-blue-200 mb-6 leading-relaxed">
                Empowering young minds to build big ideas through fun, educational business experiences. 
                Where entrepreneurship meets imagination!
              </p>
              <div className="flex space-x-4">
                <Link href="/facebook" className="text-blue-300 hover:text-yellow-400 transition-colors duration-300">
                  <div className="w-10 h-10 bg-blue-800 rounded-full flex items-center justify-center hover:bg-blue-700">
                    📘
                  </div>
                </Link>
                <Link href="/twitter" className="text-blue-300 hover:text-yellow-400 transition-colors duration-300">
                  <div className="w-10 h-10 bg-blue-800 rounded-full flex items-center justify-center hover:bg-blue-700">
                    🐦
                  </div>
                </Link>
                <Link href="/instagram" className="text-blue-300 hover:text-yellow-400 transition-colors duration-300">
                  <div className="w-10 h-10 bg-blue-800 rounded-full flex items-center justify-center hover:bg-blue-700">
                    📷
                  </div>
                </Link>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold mb-4 text-yellow-400">For Kids</h4>
              <ul className="space-y-2">
                <li><Link href="/create" className="text-blue-200 hover:text-yellow-400 transition-colors duration-300">Start a Business</Link></li>
                <li><Link href="/learn" className="text-blue-200 hover:text-yellow-400 transition-colors duration-300">Learn & Play</Link></li>
                <li><Link href="/badges" className="text-blue-200 hover:text-yellow-400 transition-colors duration-300">Earn Badges</Link></li>
                <li><Link href="/gallery" className="text-blue-200 hover:text-yellow-400 transition-colors duration-300">Success Stories</Link></li>
              </ul>
            </div>

            {/* Parent Resources */}
            <div>
              <h4 className="text-lg font-bold mb-4 text-yellow-400">For Parents</h4>
              <ul className="space-y-2">
                <li><Link href="/parents" className="text-blue-200 hover:text-yellow-400 transition-colors duration-300">Parent Guide</Link></li>
                <li><Link href="/safety" className="text-blue-200 hover:text-yellow-400 transition-colors duration-300">Safety & Privacy</Link></li>
                <li><Link href="/support" className="text-blue-200 hover:text-yellow-400 transition-colors duration-300">Support</Link></li>
                <li><Link href="/contact" className="text-blue-200 hover:text-yellow-400 transition-colors duration-300">Contact Us</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-blue-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-blue-300 text-sm mb-4 md:mb-0">
              © 2025 Lemonade Lab. Made with 💛 for young entrepreneurs.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-blue-300 hover:text-yellow-400 transition-colors duration-300">Privacy Policy</Link>
              <Link href="/terms" className="text-blue-300 hover:text-yellow-400 transition-colors duration-300">Terms of Use</Link>
              <Link href="/cookies" className="text-blue-300 hover:text-yellow-400 transition-colors duration-300">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}