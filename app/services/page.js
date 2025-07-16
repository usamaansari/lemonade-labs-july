'use client';

import { useState } from 'react';
import { FiCalendar, FiClock, FiDollarSign, FiPlus, FiTrash2, FiEdit, FiCheckCircle } from 'react-icons/fi';

export default function ServiceManagement() {
  const [activeTab, setActiveTab] = useState('services');
  const [showAddService, setShowAddService] = useState(false);
  const [showAddAvailability, setShowAddAvailability] = useState(false);
  
  // Sample services data
  const [services, setServices] = useState([
    {
      id: 1,
      name: 'Dog Walking',
      description: '30-minute dog walking service',
      price: 15,
      duration: 30,
      category: 'Pet Care'
    },
    {
      id: 2,
      name: 'Lawn Mowing',
      description: 'Front and back yard mowing',
      price: 25,
      duration: 60,
      category: 'Yard Work'
    },
    {
      id: 3,
      name: 'Car Wash',
      description: 'Exterior car wash and vacuuming',
      price: 20,
      duration: 45,
      category: 'Auto Care'
    }
  ]);

  // Sample availability data
  const [availability, setAvailability] = useState([
    {
      id: 1,
      day: 'Monday',
      startTime: '15:00',
      endTime: '17:00',
      serviceId: 1
    },
    {
      id: 2,
      day: 'Wednesday',
      startTime: '14:00',
      endTime: '16:00',
      serviceId: 1
    },
    {
      id: 3,
      day: 'Saturday',
      startTime: '10:00',
      endTime: '14:00',
      serviceId: 2
    }
  ]);

  // Sample bookings data
  const [bookings, setBookings] = useState([
    {
      id: 1,
      customer: 'Alex Johnson',
      service: 'Dog Walking',
      date: '2025-07-20',
      time: '15:30',
      status: 'Confirmed',
      serviceId: 1
    },
    {
      id: 2,
      customer: 'Taylor Smith',
      service: 'Lawn Mowing',
      date: '2025-07-22',
      time: '11:00',
      status: 'Pending',
      serviceId: 2
    }
  ]);

  // New service form state
  const [newService, setNewService] = useState({
    name: '',
    description: '',
    price: '',
    duration: 30,
    category: ''
  });

  // New availability form state
  const [newAvailability, setNewAvailability] = useState({
    serviceId: '',
    day: 'Monday',
    startTime: '09:00',
    endTime: '17:00'
  });

  // Days of the week
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Handle adding a new service
  const handleAddService = (e) => {
    e.preventDefault();
    const service = {
      id: Date.now(),
      ...newService,
      price: parseFloat(newService.price)
    };
    setServices([...services, service]);
    setShowAddService(false);
    setNewService({
      name: '',
      description: '',
      price: '',
      duration: 30,
      category: ''
    });
  };

  // Handle adding new availability
  const handleAddAvailability = (e) => {
    e.preventDefault();
    const avail = {
      id: Date.now(),
      ...newAvailability
    };
    setAvailability([...availability, avail]);
    setShowAddAvailability(false);
    setNewAvailability({
      serviceId: '',
      day: 'Monday',
      startTime: '09:00',
      endTime: '17:00'
    });
  };

  // Handle booking status update
  const updateBookingStatus = (id, status) => {
    setBookings(bookings.map(booking => 
      booking.id === id ? { ...booking, status } : booking
    ));
  };

  // Get service name by ID
  const getServiceName = (id) => {
    const service = services.find(s => s.id === id);
    return service ? service.name : 'Unknown Service';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Service Management</h1>
          <p className="mt-2 text-gray-600">Manage your services, availability, and bookings in one place</p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('services')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'services'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              My Services
            </button>
            <button
              onClick={() => setActiveTab('availability')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'availability'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Availability
            </button>
            <button
              onClick={() => setActiveTab('bookings')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'bookings'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Bookings
            </button>
            <button
              onClick={() => setActiveTab('calendar')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'calendar'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Calendar View
            </button>
          </nav>
        </div>

        {/* Services Tab */}
        {activeTab === 'services' && (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">My Services</h2>
              <button
                onClick={() => setShowAddService(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <FiPlus className="-ml-1 mr-2 h-5 w-5" />
                Add Service
              </button>
            </div>
            <div className="divide-y divide-gray-200">
              {services.map((service) => (
                <div key={service.id} className="px-6 py-4 flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{service.name}</h3>
                    <p className="text-sm text-gray-500">{service.description}</p>
                    <div className="mt-2 flex items-center space-x-4">
                      <span className="inline-flex items-center text-sm text-gray-500">
                        <FiDollarSign className="mr-1" />
                        ${service.price}
                      </span>
                      <span className="inline-flex items-center text-sm text-gray-500">
                        <FiClock className="mr-1" />
                        {service.duration} min
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {service.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-400 hover:text-blue-600">
                      <FiEdit className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600">
                      <FiTrash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
              {services.length === 0 && (
                <div className="px-6 py-12 text-center">
                  <FiCalendar className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No services</h3>
                  <p className="mt-1 text-sm text-gray-500">Get started by adding your first service.</p>
                  <div className="mt-6">
                    <button
                      onClick={() => setShowAddService(true)}
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <FiPlus className="-ml-1 mr-2 h-5 w-5" />
                      New Service
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Availability Tab */}
        {activeTab === 'availability' && (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">My Availability</h2>
              <button
                onClick={() => setShowAddAvailability(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <FiPlus className="-ml-1 mr-2 h-5 w-5" />
                Add Availability
              </button>
            </div>
            <div className="divide-y divide-gray-200">
              {availability.map((avail) => (
                <div key={avail.id} className="px-6 py-4 flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{getServiceName(avail.serviceId)}</h3>
                    <div className="mt-2 flex items-center space-x-4">
                      <span className="inline-flex items-center text-sm text-gray-500">
                        {avail.day}
                      </span>
                      <span className="inline-flex items-center text-sm text-gray-500">
                        {avail.startTime} - {avail.endTime}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-400 hover:text-red-600">
                      <FiTrash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
              {availability.length === 0 && (
                <div className="px-6 py-12 text-center">
                  <FiClock className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No availability set</h3>
                  <p className="mt-1 text-sm text-gray-500">Add your available time slots to start receiving bookings.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Upcoming Bookings</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {bookings.map((booking) => (
                <div key={booking.id} className="px-6 py-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{booking.service}</h3>
                      <div className="mt-2 flex items-center space-x-4">
                        <span className="inline-flex items-center text-sm text-gray-500">
                          <FiCalendar className="mr-1" />
                          {booking.date}
                        </span>
                        <span className="inline-flex items-center text-sm text-gray-500">
                          <FiClock className="mr-1" />
                          {booking.time}
                        </span>
                        <span className="inline-flex items-center text-sm text-gray-500">
                          {booking.customer}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        booking.status === 'Confirmed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {booking.status}
                      </span>
                      {booking.status === 'Pending' && (
                        <button
                          onClick={() => updateBookingStatus(booking.id, 'Confirmed')}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          Confirm
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {bookings.length === 0 && (
                <div className="px-6 py-12 text-center">
                  <FiCheckCircle className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No upcoming bookings</h3>
                  <p className="mt-1 text-sm text-gray-500">Your upcoming bookings will appear here.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Calendar View Tab */}
        {activeTab === 'calendar' && (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Calendar View</h2>
              <div className="h-96 bg-gray-50 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Calendar view will be displayed here</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Service Modal */}
      {showAddService && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Add New Service</h3>
                  <div className="mt-4">
                    <form onSubmit={handleAddService}>
                      <div className="mb-4">
                        <label htmlFor="service-name" className="block text-sm font-medium text-gray-700">Service Name</label>
                        <input
                          type="text"
                          id="service-name"
                          required
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          value={newService.name}
                          onChange={(e) => setNewService({...newService, name: e.target.value})}
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="service-description" className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                          id="service-description"
                          rows="3"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          value={newService.description}
                          onChange={(e) => setNewService({...newService, description: e.target.value})}
                        ></textarea>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <label htmlFor="service-price" className="block text-sm font-medium text-gray-700">Price ($)</label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <span className="text-gray-500 sm:text-sm">$</span>
                            </div>
                            <input
                              type="number"
                              id="service-price"
                              min="0"
                              step="0.01"
                              required
                              className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                              placeholder="0.00"
                              value={newService.price}
                              onChange={(e) => setNewService({...newService, price: e.target.value})}
                            />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="service-duration" className="block text-sm font-medium text-gray-700">Duration (minutes)</label>
                          <select
                            id="service-duration"
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                            value={newService.duration}
                            onChange={(e) => setNewService({...newService, duration: parseInt(e.target.value)})}
                          >
                            <option value="15">15 min</option>
                            <option value="30">30 min</option>
                            <option value="45">45 min</option>
                            <option value="60">1 hour</option>
                            <option value="90">1.5 hours</option>
                            <option value="120">2 hours</option>
                          </select>
                        </div>
                      </div>
                      <div className="mb-4">
                        <label htmlFor="service-category" className="block text-sm font-medium text-gray-700">Category</label>
                        <input
                          type="text"
                          id="service-category"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          placeholder="e.g., Pet Care, Yard Work"
                          value={newService.category}
                          onChange={(e) => setNewService({...newService, category: e.target.value})}
                        />
                      </div>
                      <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                        <button
                          type="submit"
                          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm"
                        >
                          Add Service
                        </button>
                        <button
                          type="button"
                          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                          onClick={() => setShowAddService(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Availability Modal */}
      {showAddAvailability && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Add Availability</h3>
                  <div className="mt-4">
                    <form onSubmit={handleAddAvailability}>
                      <div className="mb-4">
                        <label htmlFor="service-select" className="block text-sm font-medium text-gray-700">Service</label>
                        <select
                          id="service-select"
                          required
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                          value={newAvailability.serviceId}
                          onChange={(e) => setNewAvailability({...newAvailability, serviceId: parseInt(e.target.value)})}
                        >
                          <option value="">Select a service</option>
                          {services.map((service) => (
                            <option key={service.id} value={service.id}>
                              {service.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="mb-4">
                        <label htmlFor="day-select" className="block text-sm font-medium text-gray-700">Day</label>
                        <select
                          id="day-select"
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                          value={newAvailability.day}
                          onChange={(e) => setNewAvailability({...newAvailability, day: e.target.value})}
                        >
                          {days.map((day) => (
                            <option key={day} value={day}>
                              {day}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <label htmlFor="start-time" className="block text-sm font-medium text-gray-700">Start Time</label>
                          <input
                            type="time"
                            id="start-time"
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={newAvailability.startTime}
                            onChange={(e) => setNewAvailability({...newAvailability, startTime: e.target.value})}
                          />
                        </div>
                        <div>
                          <label htmlFor="end-time" className="block text-sm font-medium text-gray-700">End Time</label>
                          <input
                            type="time"
                            id="end-time"
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={newAvailability.endTime}
                            onChange={(e) => setNewAvailability({...newAvailability, endTime: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                        <button
                          type="submit"
                          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm"
                        >
                          Add Availability
                        </button>
                        <button
                          type="button"
                          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                          onClick={() => setShowAddAvailability(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
