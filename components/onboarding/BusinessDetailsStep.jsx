'use client';

import { motion } from 'framer-motion';

const BusinessDetailsStep = ({ formData, handleChange, nextStep, prevStep }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.businessName && formData.ownerName && formData.ownerAge && formData.businessIdea) {
      nextStep();
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-amber-800 mb-6">Tell us about your business</h2>
      <p className="text-amber-700 mb-8">We need a few details to help set up your business.</p>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div>
            <label htmlFor="businessName" className="block text-sm font-medium text-amber-800 mb-1">
              What's your business name? *
            </label>
            <input
              type="text"
              id="businessName"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="e.g., Emma's Awesome Lemonade"
              required
            />
            <p className="mt-1 text-sm text-amber-600">Make it fun and creative!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="ownerName" className="block text-sm font-medium text-amber-800 mb-1">
                Your name *
              </label>
              <input
                type="text"
                id="ownerName"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="First name"
                required
              />
            </div>
            
            <div>
              <label htmlFor="ownerAge" className="block text-sm font-medium text-amber-800 mb-1">
                Your age *
              </label>
              <select
                id="ownerAge"
                name="ownerAge"
                value={formData.ownerAge}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                required
              >
                <option value="">Select your age</option>
                {Array.from({ length: 12 }, (_, i) => i + 5).map((age) => (
                  <option key={age} value={age}>
                    {age} years old
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="businessIdea" className="block text-sm font-medium text-amber-800 mb-1">
              Tell us about your business idea *
            </label>
            <textarea
              id="businessIdea"
              name="businessIdea"
              value={formData.businessIdea}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="What will you sell or what service will you provide?"
              required
            />
            <p className="mt-1 text-sm text-amber-600">
              Example: "I'll sell homemade lemonade with different fruity flavors!"
            </p>
          </div>
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
            disabled={!formData.businessName || !formData.ownerName || !formData.ownerAge || !formData.businessIdea}
            className={`px-6 py-3 rounded-full font-bold text-white transition-all ${
              formData.businessName && formData.ownerName && formData.ownerAge && formData.businessIdea
                ? 'bg-amber-500 hover:bg-amber-600'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            Next: Branding
            <span className="ml-2">→</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default BusinessDetailsStep;
