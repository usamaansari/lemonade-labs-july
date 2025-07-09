'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const ParentInfoStep = ({ formData, handleChange, nextStep, prevStep }) => {
  const [siblingName, setSiblingName] = useState('');
  const [siblingAge, setSiblingAge] = useState('');

  const handleAddSibling = (e) => {
    e.preventDefault();
    if (siblingName && siblingAge) {
      handleChange({
        target: {
          name: 'siblingInfo',
          value: [...formData.siblingInfo, { name: siblingName, age: siblingAge }]
        }
      });
      setSiblingName('');
      setSiblingAge('');
    }
  };

  const handleRemoveSibling = (index) => {
    const updatedSiblings = [...formData.siblingInfo];
    updatedSiblings.splice(index, 1);
    handleChange({
      target: { name: 'siblingInfo', value: updatedSiblings }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.parentName && formData.parentEmail) {
      nextStep();
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-amber-800 mb-6">Parent or Guardian Information</h2>
      <p className="text-amber-700 mb-8">
        We need a parent or guardian's contact information to help you get started.
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="parentName" className="block text-sm font-medium text-amber-800 mb-1">
                Parent/Guardian Name *
              </label>
              <input
                type="text"
                id="parentName"
                name="parentName"
                value={formData.parentName}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="Full name"
                required
              />
            </div>
            
            <div>
              <label htmlFor="parentEmail" className="block text-sm font-medium text-amber-800 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                id="parentEmail"
                name="parentEmail"
                value={formData.parentEmail}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="your@email.com"
                required
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="parentPhone" className="block text-sm font-medium text-amber-800 mb-1">
              Phone Number (Optional)
            </label>
            <input
              type="tel"
              id="parentPhone"
              name="parentPhone"
              value={formData.parentPhone}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="(123) 456-7890"
            />
          </div>
          
          {/* Siblings Section */}
          <div className="pt-4 border-t border-amber-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-amber-800">Siblings or Friends</h3>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="hasSiblings"
                  checked={formData.hasSiblings}
                  onChange={(e) => handleChange(e)}
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                <span className="ms-3 text-sm font-medium text-amber-700">
                  {formData.hasSiblings ? 'Adding Siblings' : 'Add Siblings/Friends'}
                </span>
              </label>
            </div>
            
            {formData.hasSiblings && (
              <div className="space-y-4">
                <p className="text-amber-700 text-sm">
                  Add siblings or friends who will be part of this business adventure!
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-1">
                    <input
                      type="text"
                      value={siblingName}
                      onChange={(e) => setSiblingName(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="Name"
                    />
                  </div>
                  <div className="sm:col-span-1">
                    <select
                      value={siblingAge}
                      onChange={(e) => setSiblingAge(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    >
                      <option value="">Age</option>
                      {Array.from({ length: 12 }, (_, i) => i + 5).map((age) => (
                        <option key={age} value={age}>
                          {age} years
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-1">
                    <button
                      type="button"
                      onClick={handleAddSibling}
                      disabled={!siblingName || !siblingAge}
                      className={`w-full px-4 py-2 rounded-lg font-medium ${
                        siblingName && siblingAge
                          ? 'bg-amber-500 text-white hover:bg-amber-600'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Add
                    </button>
                  </div>
                </div>
                
                {formData.siblingInfo.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-amber-800 mb-2">Added Siblings/Friends:</h4>
                    <div className="space-y-2">
                      {formData.siblingInfo.map((sibling, index) => (
                        <div 
                          key={index}
                          className="flex items-center justify-between bg-amber-50 px-4 py-2 rounded-lg"
                        >
                          <span className="text-amber-800">
                            {sibling.name}, {siblingAge} years old
                          </span>
                          <button
                            type="button"
                            onClick={() => handleRemoveSibling(index)}
                            className="text-amber-600 hover:text-amber-800"
                            aria-label="Remove"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Privacy Note */}
          <div className="mt-6 p-4 bg-amber-50 rounded-lg">
            <p className="text-sm text-amber-700">
              <span className="font-semibold">Privacy Note:</span> We take your privacy seriously. 
              Parent/guardian information is only used for account verification and important updates. 
              We'll never share this information with third parties.
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
            disabled={!formData.parentName || !formData.parentEmail}
            className={`px-6 py-3 rounded-full font-bold text-white transition-all ${
              formData.parentName && formData.parentEmail
                ? 'bg-amber-500 hover:bg-amber-600'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            Next: Review
            <span className="ml-2">→</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ParentInfoStep;
