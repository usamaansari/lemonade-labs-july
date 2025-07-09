'use client';

import { motion } from 'framer-motion';

const businessTypes = [
  {
    id: 'lemonade-stand',
    name: 'Lemonade Stand',
    emoji: '🍋',
    description: 'Sell refreshing drinks with your own lemonade stand!'
  },
  {
    id: 'baked-goods',
    name: 'Baked Goods',
    emoji: '🍪',
    description: 'Bake and sell delicious cookies, cakes, and more!'
  },
  {
    id: 'art-shop',
    name: 'Art Shop',
    emoji: '🎨',
    description: 'Sell your creative artwork and crafts!'
  },
  {
    id: 'pet-care',
    name: 'Pet Care',
    emoji: '🐶',
    description: 'Offer pet sitting, walking, or grooming services!'
  },
  {
    id: 'tutoring',
    name: 'Tutoring',
    emoji: '📚',
    description: 'Help others learn something you\'re good at!'
  },
  {
    id: 'custom',
    name: 'Custom Business',
    emoji: '✨',
    description: 'Create your own unique business idea!'
  },
];

const BusinessTypeStep = ({ formData, handleChange, nextStep }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.businessType) {
      nextStep();
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-amber-800 mb-6">What kind of business would you like to start?</h2>
      <p className="text-amber-700 mb-8">Choose a business type that excites you the most!</p>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {businessTypes.map((type) => (
            <motion.div
              key={type.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className={`relative rounded-xl p-4 border-2 cursor-pointer transition-colors ${
                formData.businessType === type.id
                  ? 'border-amber-500 bg-amber-50'
                  : 'border-gray-200 hover:border-amber-300'
              }`}
              onClick={() =>
                handleChange({
                  target: { name: 'businessType', value: type.id },
                })
              }
            >
              <div className="flex items-center">
                <div className="text-4xl mr-4">{type.emoji}</div>
                <div>
                  <h3 className="font-bold text-amber-900">{type.name}</h3>
                  <p className="text-sm text-amber-700">{type.description}</p>
                </div>
              </div>
              <div
                className={`absolute top-2 right-2 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  formData.businessType === type.id
                    ? 'bg-amber-500 border-amber-500 text-white'
                    : 'border-gray-300'
                }`}
              >
                {formData.businessType === type.id && (
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            disabled={!formData.businessType}
            className={`px-6 py-3 rounded-full font-bold text-white transition-all ${
              formData.businessType
                ? 'bg-amber-500 hover:bg-amber-600'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            Next: Business Details
            <span className="ml-2">→</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default BusinessTypeStep;
