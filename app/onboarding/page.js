'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import OnboardingProgress from '@/components/OnboardingProgress';
import BusinessTypeStep from '@/components/onboarding/BusinessTypeStep';
import BusinessDetailsStep from '@/components/onboarding/BusinessDetailsStep';
import BrandingStep from '@/components/onboarding/BrandingStep';
import ParentInfoStep from '@/components/onboarding/ParentInfoStep';
import ReviewStep from '@/components/onboarding/ReviewStep';

const OnboardingPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessType: '',
    businessName: '',
    ownerName: '',
    ownerAge: '',
    businessIdea: '',
    logo: null,
    logoPreview: '',
    tagline: '',
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    hasSiblings: false,
    siblingInfo: []
  });
  const router = useRouter();

  const steps = [
    { id: 1, name: 'Business Type' },
    { id: 2, name: 'Business Details' },
    { id: 3, name: 'Branding' },
    { id: 4, name: 'Parent Info' },
    { id: 5, name: 'Review' },
  ];

  const nextStep = () => {
    if (step < steps.length) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'file') {
      const file = files[0];
      const reader = new FileReader();
      
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          [name]: file,
          logoPreview: reader.result
        }));
      };
      
      if (file) {
        reader.readAsDataURL(file);
      }
    } else if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Here you would typically send the form data to your backend
      console.log('Form submitted:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Business created successfully!');
      router.push('/dashboard');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to create business. Please try again.');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <BusinessTypeStep 
            formData={formData} 
            handleChange={handleChange} 
            nextStep={nextStep} 
          />
        );
      case 2:
        return (
          <BusinessDetailsStep 
            formData={formData} 
            handleChange={handleChange} 
            nextStep={nextStep} 
            prevStep={prevStep} 
          />
        );
      case 3:
        return (
          <BrandingStep 
            formData={formData} 
            handleChange={handleChange} 
            nextStep={nextStep} 
            prevStep={prevStep} 
          />
        );
      case 4:
        return (
          <ParentInfoStep 
            formData={formData} 
            handleChange={handleChange} 
            nextStep={nextStep} 
            prevStep={prevStep} 
          />
        );
      case 5:
        return (
          <ReviewStep 
            formData={formData} 
            handleSubmit={handleSubmit} 
            prevStep={prevStep} 
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-amber-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-fredoka font-bold text-amber-600 mb-4">
            Let's Build Your Business!
          </h1>
          <p className="text-lg text-amber-800">
            Follow these simple steps to create your very own pretend business
          </p>
        </div>

        <OnboardingProgress steps={steps} currentStep={step} />

        <div className="mt-8 bg-white rounded-2xl shadow-lg overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="p-6 sm:p-8"
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
