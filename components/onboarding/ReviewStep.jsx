'use client';

import { motion } from 'framer-motion';

const ReviewStep = ({ formData, handleSubmit, prevStep }) => {
  const getBusinessTypeName = (type) => {
    const types = {
      'lemonade-stand': 'Lemonade Stand',
      'baked-goods': 'Baked Goods',
      'art-shop': 'Art Shop',
      'pet-care': 'Pet Care',
      'tutoring': 'Tutoring',
      'custom': 'Custom Business'
    };
    return types[type] || type;
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-amber-800 mb-6">Review Your Business</h2>
      <p className="text-amber-700 mb-8">
        Take a moment to review all the information before we create your business.
      </p>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        {/* Business Summary */}
        <div className="p-6 border-b border-amber-100">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="flex-shrink-0 w-24 h-24 rounded-full bg-amber-100 flex items-center justify-center text-4xl">
              {formData.logo || '🏪'}
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-amber-900">{formData.businessName}</h3>
              {formData.tagline && (
                <p className="text-amber-600 italic">"{formData.tagline}"</p>
              )}
              <div className="mt-2 text-sm text-amber-700">
                <p>Business Type: {getBusinessTypeName(formData.businessType)}</p>
                <p>Owner: {formData.ownerName}, {formData.ownerAge} years old</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Business Details */}
        <div className="p-6 border-b border-amber-100">
          <h4 className="font-semibold text-amber-800 mb-3">Business Idea</h4>
          <p className="text-amber-700">{formData.businessIdea}</p>
        </div>
        
        {/* Team Members */}
        {formData.hasSiblings && formData.siblingInfo.length > 0 && (
          <div className="p-6 border-b border-amber-100">
            <h4 className="font-semibold text-amber-800 mb-3">Team Members</h4>
            <div className="space-y-2">
              {formData.siblingInfo.map((sibling, index) => (
                <div key={index} className="flex items-center gap-2 text-amber-700">
                  <span className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center">
                    {index + 1}
                  </span>
                  {sibling.name}, {sibling.age} years old
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Parent Contact */}
        <div className="p-6">
          <h4 className="font-semibold text-amber-800 mb-3">Parent/Guardian Contact</h4>
          <div className="space-y-1 text-amber-700">
            <p><span className="font-medium">Name:</span> {formData.parentName}</p>
            <p><span className="font-medium">Email:</span> {formData.parentEmail}</p>
            {formData.parentPhone && (
              <p><span className="font-medium">Phone:</span> {formData.parentPhone}</p>
            )}
          </div>
        </div>
      </div>
      
      {/* Terms and Conditions */}
      <div className="mb-8 p-4 bg-amber-50 rounded-lg">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
              required
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="terms" className="font-medium text-amber-700">
              I confirm that all the information provided is accurate and I agree to the 
              <a href="#" className="text-amber-600 hover:text-amber-800 underline ml-1">
                Terms of Service
              </a> 
              and 
              <a href="#" className="text-amber-600 hover:text-amber-800 underline ml-1">
                Privacy Policy
              </a>.
            </label>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <button
          type="button"
          onClick={prevStep}
          className="px-6 py-3 rounded-full font-medium text-amber-700 hover:bg-amber-100 transition-colors"
        >
          ← Back to Edit
        </button>
        
        <button
          type="button"
          onClick={handleSubmit}
          className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full transition-colors flex items-center justify-center gap-2"
        >
          🚀 Launch My Business!
        </button>
      </div>
      
      <p className="mt-4 text-center text-sm text-amber-600">
        You'll be able to edit your business details later from your dashboard.
      </p>
    </div>
  );
};

export default ReviewStep;
