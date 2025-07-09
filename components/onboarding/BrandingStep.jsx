'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

// Sample logo options based on business type
const logoOptions = {
  'lemonade-stand': ['🍋', '🥤', '🧃', '🍹', '🍸'],
  'baked-goods': ['🍪', '🧁', '🍰', '🥐', '🥨'],
  'art-shop': ['🎨', '✏️', '🖌️', '📝', '🖼️'],
  'pet-care': ['🐶', '🐱', '🐰', '🐢', '🐠'],
  'tutoring': ['📚', '✏️', '📝', '🧮', '🔬'],
  'custom': ['✨', '🌟', '💡', '🎯', '🏆'],
};

// Sample tagline suggestions based on business type
const taglineSuggestions = {
  'lemonade-stand': [
    'Squeeze the Day!',
    'When Life Gives You Lemons...',
    'The Zest in Town!',
    'Fresh Squeezed Happiness',
    'Sip into Something Refreshing',
  ],
  'baked-goods': [
    'Baked with Love!',
    'Sweet Treats for Sweet People',
    'A Little Slice of Heaven',
    'Where Every Bite is a Delight',
    'From Our Oven to Your Heart',
  ],
  'art-shop': [
    'Color Your World',
    'Where Creativity Comes to Life',
    'Art from the Heart',
    'Express Yourself!',
    'Making Masterpieces Together',
  ],
  'pet-care': [
    'Pawsitively the Best Care!',
    'Because They\'re Family',
    'Happy Pets, Happy Hearts',
    'Where Tails Wag and Purrs Abound',
    'Loving Care for Your Furry Friends',
  ],
  'tutoring': [
    'Unlock Your Potential',
    'Learning Made Fun!',
    'Grow Smarter Every Day',
    'Building Brighter Futures',
    'Where Questions Find Answers',
  ],
  'custom': [
    'Dream Big, Start Small',
    'Where Ideas Take Flight',
    'Making Dreams a Reality',
    'Your Vision, Our Mission',
    'Inspiring Greatness',
  ],
};

const BrandingStep = ({ formData, handleChange, nextStep, prevStep }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Generate a random logo and tagline
  const generateBranding = () => {
    setIsGenerating(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const logos = logoOptions[formData.businessType] || logoOptions.custom;
      const randomLogo = logos[Math.floor(Math.random() * logos.length)];
      
      const suggestions = taglineSuggestions[formData.businessType] || taglineSuggestions.custom;
      const randomTagline = suggestions[Math.floor(Math.random() * suggestions.length)];
      
      handleChange({
        target: { name: 'logo', value: randomLogo },
      });
      
      handleChange({
        target: { name: 'tagline', value: randomTagline },
      });
      
      setIsGenerating(false);
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.logo) {
      nextStep();
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-amber-800 mb-6">Let's brand your business!</h2>
      <p className="text-amber-700 mb-8">Make your business unique with a logo and tagline.</p>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-8">
          {/* Logo Selection */}
          <div className="bg-amber-50 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-amber-800 mb-4">Your Business Logo</h3>
            
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="flex-shrink-0">
                <div className="w-32 h-32 rounded-full bg-white border-4 border-amber-200 flex items-center justify-center text-6xl">
                  {formData.logo || '?'}
                </div>
              </div>
              
              <div className="flex-1">
                <p className="text-amber-700 mb-4">
                  {formData.logo 
                    ? "Love this logo? You can keep it or generate a new one!"
                    : "Click the button below to generate a logo for your business!"
                  }
                </p>
                
                <button
                  type="button"
                  onClick={generateBranding}
                  disabled={isGenerating}
                  className={`px-4 py-2 rounded-full font-medium ${
                    isGenerating
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-amber-500 text-white hover:bg-amber-600'
                  }`}
                >
                  {isGenerating ? (
                    'Generating...'
                  ) : formData.logo ? (
                    '🔄 Try Another Logo'
                  ) : (
                    '✨ Generate Logo'
                  )}
                </button>
              </div>
            </div>
          </div>
          
          {/* Tagline */}
          <div>
            <label htmlFor="tagline" className="block text-sm font-medium text-amber-800 mb-1">
              Your Business Tagline
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                id="tagline"
                name="tagline"
                value={formData.tagline}
                onChange={handleChange}
                className="flex-1 px-4 py-3 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="A catchy phrase that describes your business"
              />
              <button
                type="button"
                onClick={generateBranding}
                disabled={isGenerating}
                className="px-4 py-2 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-colors whitespace-nowrap"
                title="Get a random tagline"
              >
                {isGenerating ? '...' : '✨'}
              </button>
            </div>
            <p className="mt-1 text-sm text-amber-600">
              Example: "Squeeze the Day!" for a lemonade stand
            </p>
          </div>
          
          {/* Preview Card */}
          {formData.logo && (
            <div className="mt-8 p-6 bg-white rounded-xl shadow-md border border-amber-100">
              <h3 className="text-lg font-semibold text-amber-800 mb-4">Your Business Preview</h3>
              
              <div className="flex flex-col items-center text-center p-6 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-lg">
                <div className="w-20 h-20 rounded-full bg-white border-4 border-amber-200 flex items-center justify-center text-4xl mb-4">
                  {formData.logo}
                </div>
                <h4 className="text-xl font-bold text-amber-800">{formData.businessName}</h4>
                {formData.tagline && (
                  <p className="text-amber-600 italic mt-1">"{formData.tagline}"</p>
                )}
                <p className="mt-4 text-amber-700">
                  Owned by: <span className="font-medium">{formData.ownerName}</span>
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-10 flex justify-between">
          <button
            type="button"
            onClick={prevStep}
            className="px-6 py-3 rounded-full font-medium text-amber-700 hover:bg-amber-100 transition-colors"
          >
            ← Back
          </button>
          
          <button
            type="submit"
            disabled={!formData.logo}
            className={`px-6 py-3 rounded-full font-bold text-white transition-all ${
              formData.logo
                ? 'bg-amber-500 hover:bg-amber-600'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            Next: Parent Info
            <span className="ml-2">→</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default BrandingStep;
