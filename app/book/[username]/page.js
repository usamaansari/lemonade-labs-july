'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { FiCalendar, FiClock, FiUser, FiPhone, FiMail, FiCheckCircle } from 'react-icons/fi';

// Mock data - in a real app, this would come from an API
const mockProviderData = {
  'alex': {
    id: 1,
    name: 'Alex Johnson',
    bio: 'Reliable and friendly neighborhood helper with 2 years of experience in pet care and yard work.',
    services: [
      {
        id: 1,
        name: 'Dog Walking',
        description: '30-minute dog walking service around your neighborhood',
        price: 15,
        duration: 30
      },
      {
        id: 2,
        name: 'Pet Sitting',
        description: 'In-home pet sitting for when you\'re away',
        price: 20,
        duration: 60
      },
      {
        id: 3,
        name: 'Lawn Mowing',
        description: 'Front and back yard mowing service',
        price: 25,
        duration: 60
      }
    ],
    availability: [
      { day: 'Monday', start: '15:00', end: '18:00' },
      { day: 'Wednesday', start: '14:00', end: '18:00' },
      { day: 'Saturday', start: '09:00', end: '14:00' }
    ]
  }
};

export default function BookService() {
  const { username } = useParams();
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);

  // Fetch provider data
  useEffect(() => {
    // In a real app, you would fetch this data from an API
    const fetchProvider = () => {
      setTimeout(() => {
        const data = mockProviderData[username];
        if (data) {
          setProvider(data);
        }
        setLoading(false);
      }, 500);
    };

    fetchProvider();
  }, [username]);

  // Generate available time slots when a date is selected
  useEffect(() => {
    if (selectedDate && selectedService && provider) {
      const day = new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long' });
      const availability = provider.availability.find(avail => avail.day === day);
      
      if (availability) {
        const times = [];
        const [startHour, startMinute] = availability.start.split(':').map(Number);
        const [endHour] = availability.end.split(':').map(Number);
        const duration = selectedService.duration;
        
        let currentTime = new Date();
        currentTime.setHours(startHour, startMinute, 0, 0);
        
        const endTime = new Date();
        endTime.setHours(endHour, 0, 0, 0);
        
        while (currentTime <= endTime) {
          const timeStr = currentTime.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
          });
          times.push(timeStr);
          
          // Move to next time slot
          currentTime = new Date(currentTime.getTime() + duration * 60000);
        }
        
        setAvailableTimes(times);
      } else {
        setAvailableTimes([]);
      }
    }
  }, [selectedDate, selectedService, provider]);

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setStep(2);
  };

  const handleDateSelect = (e) => {
    setSelectedDate(e.target.value);
    setSelectedTime('');
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would submit this to your backend
    const booking = {
      id: Date.now(),
      service: selectedService,
      date: selectedDate,
      time: selectedTime,
      ...formData,
      status: 'confirmed',
      provider: provider.name
    };
    
    setBookingDetails(booking);
    setBookingConfirmed(true);
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      notes: ''
    });
    setStep(4);
  };

  // Generate next 14 days for date selection
  const today = new Date();
  const dateOptions = [];
  
  for (let i = 0; i < 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    const dateStr = date.toISOString().split('T')[0];
    const formattedDate = date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric' 
    });
    
    // Check if provider is available on this day
    const isAvailable = provider?.availability.some(avail => {
      return avail.day === dayName;
    });
    
    if (isAvailable || i === 0) {
      dateOptions.push({
        date: dateStr,
        label: formattedDate,
        disabled: !isAvailable
      });
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Service Provider Not Found</h1>
          <p className="text-gray-600">The page you're looking for doesn't exist or has been moved.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Book a Service</h1>
            <div className="flex items-center">
              <div className="ml-4">
                <p className="text-sm text-gray-500">Provided by</p>
                <p className="font-medium">{provider.name}</p>
              </div>
              <div className="ml-4 flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <FiUser className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {!bookingConfirmed ? (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            {/* Progress Steps */}
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex">
                <div className={`w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm ${step >= 1 ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'}`}>
                  <span className="flex items-center justify-center">
                    <span className={`flex items-center justify-center w-6 h-6 rounded-full mr-2 ${step >= 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                      1
                    </span>
                    Service
                  </span>
                </div>
                <div className={`w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm ${step >= 2 ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'}`}>
                  <span className="flex items-center justify-center">
                    <span className={`flex items-center justify-center w-6 h-6 rounded-full mr-2 ${step >= 2 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                      2
                    </span>
                    Time
                  </span>
                </div>
                <div className={`w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm ${step >= 3 ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'}`}>
                  <span className="flex items-center justify-center">
                    <span className={`flex items-center justify-center w-6 h-6 rounded-full mr-2 ${step >= 3 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                      3
                    </span>
                    Confirm
                  </span>
                </div>
              </nav>
            </div>

            {/* Step 1: Select Service */}
            {step === 1 && (
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-6">Select a Service</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {provider.services.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => handleServiceSelect(service)}
                      className="p-4 border border-gray-200 rounded-lg text-left hover:border-blue-500 hover:bg-blue-50 transition-colors"
                    >
                      <h3 className="font-medium text-gray-900">{service.name}</h3>
                      <p className="mt-1 text-sm text-gray-500">{service.description}</p>
                      <div className="mt-3 flex justify-between items-center">
                        <span className="text-lg font-semibold text-gray-900">
                          ${service.price}
                          <span className="text-sm font-normal text-gray-500"> / {service.duration} min</span>
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Book Now
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Select Date & Time */}
            {step === 2 && selectedService && (
              <div className="p-6">
                <div className="mb-6">
                  <button
                    onClick={() => setStep(1)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                  >
                    &larr; Back to services
                  </button>
                  <h2 className="text-lg font-medium text-gray-900 mt-2">
                    {selectedService.name} - ${selectedService.price}
                  </h2>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-3">Select a Date</h3>
                    <div className="space-y-2">
                      {dateOptions.map((option) => (
                        <button
                          key={option.date}
                          onClick={() => setSelectedDate(option.date)}
                          disabled={option.disabled}
                          className={`w-full text-left p-3 rounded-lg border ${
                            selectedDate === option.date
                              ? 'border-blue-500 bg-blue-50'
                              : option.disabled
                              ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                              : 'border-gray-200 hover:border-blue-300'
                          }`}
                        >
                          <div className="font-medium">
                            {new Date(option.date).toLocaleDateString('en-US', { weekday: 'long' })}
                          </div>
                          <div className="text-sm">
                            {new Date(option.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric'
                            })}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-3">
                      Available Time Slots
                      {selectedDate && (
                        <span className="text-gray-500 font-normal ml-2">
                          on {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                        </span>
                      )}
                    </h3>
                    
                    {!selectedDate ? (
                      <div className="text-center py-8 text-gray-500">
                        Please select a date to see available time slots
                      </div>
                    ) : availableTimes.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        No available time slots for the selected date
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-2">
                        {availableTimes.map((time) => (
                          <button
                            key={time}
                            onClick={() => handleTimeSelect(time)}
                            className={`p-3 rounded-lg border ${
                              selectedTime === time
                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                : 'border-gray-200 hover:border-blue-300'
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    onClick={() => setStep(3)}
                    disabled={!selectedDate || !selectedTime}
                    className={`px-4 py-2 rounded-md text-white ${
                      selectedDate && selectedTime
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : 'bg-gray-300 cursor-not-allowed'
                    }`}
                  >
                    Continue to Details
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Your Information */}
            {step === 3 && selectedService && (
              <div className="p-6">
                <div className="mb-6">
                  <button
                    onClick={() => setStep(2)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                  >
                    &larr; Back to time selection
                  </button>
                  <h2 className="text-lg font-medium text-gray-900 mt-2">
                    Your Information
                  </h2>
                </div>

                <form onSubmit={handleBookingSubmit} className="max-w-lg">
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Your name"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="(123) 456-7890"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                      Additional Notes (Optional)
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      rows="3"
                      value={formData.notes}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Any special instructions or details..."
                    ></textarea>
                  </div>

                  {/* Booking Summary */}
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h3 className="font-medium text-gray-900 mb-3">Booking Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Service:</span>
                        <span className="font-medium">{selectedService.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Date & Time:</span>
                        <span className="font-medium">
                          {new Date(selectedDate).toLocaleDateString('en-US', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric'
                          })}, {selectedTime}
                        </span>
                      </div>
                      <div className="flex justify-between pt-2 mt-2 border-t border-gray-200">
                        <span className="font-medium">Total:</span>
                        <span className="font-bold text-lg">${selectedService.price}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      required
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                      I agree to the <a href="#" className="text-blue-600 hover:text-blue-800">terms and conditions</a>
                    </label>
                  </div>

                  <div className="mt-6">
                    <button
                      type="submit"
                      className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Confirm Booking
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        ) : (
          /* Booking Confirmation */
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
                <FiCheckCircle className="h-10 w-10 text-green-600" aria-hidden="true" />
              </div>
              <h3 className="mt-3 text-lg font-medium text-gray-900">Booking Confirmed!</h3>
              <p className="mt-2 text-sm text-gray-500">
                Your booking with {provider.name} has been confirmed.
              </p>
              
              <div className="mt-8 bg-gray-50 p-6 rounded-lg max-w-md mx-auto text-left">
                <h4 className="text-sm font-medium text-gray-500">Booking Details</h4>
                <dl className="mt-2 space-y-3">
                  <div className="flex justify-between text-sm">
                    <dt className="text-gray-500">Service:</dt>
                    <dd className="font-medium text-gray-900">{bookingDetails.service.name}</dd>
                  </div>
                  <div className="flex justify-between text-sm">
                    <dt className="text-gray-500">Date:</dt>
                    <dd className="font-medium text-gray-900">
                      {new Date(bookingDetails.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </dd>
                  </div>
                  <div className="flex justify-between text-sm">
                    <dt className="text-gray-500">Time:</dt>
                    <dd className="font-medium text-gray-900">{bookingDetails.time}</dd>
                  </div>
                  <div className="flex justify-between text-sm">
                    <dt className="text-gray-500">Provider:</dt>
                    <dd className="font-medium text-gray-900">{provider.name}</dd>
                  </div>
                  <div className="pt-3 mt-3 border-t border-gray-200">
                    <div className="flex justify-between text-base font-medium">
                      <dt>Total</dt>
                      <dd className="text-blue-600">${bookingDetails.service.price}</dd>
                    </div>
                  </div>
                </dl>
              </div>

              <div className="mt-8">
                <p className="text-sm text-gray-500">
                  A confirmation has been sent to {bookingDetails.email}
                </p>
                <div className="mt-6">
                  <button
                    onClick={() => setBookingConfirmed(false)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Book Another Service
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
