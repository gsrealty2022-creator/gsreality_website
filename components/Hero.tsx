'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Hero() {
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

  // Real Image Content - Same image for all banners
  const RealImageContent = () => (
    <div className="relative hidden lg:block">
      <div className="relative w-full h-[500px] rounded-2xl overflow-hidden house-image-container">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Modern Real Estate Property"
          fill
          className="object-cover rounded-2xl"
        />
      </div>
    </div>
  );

  // Text Content Components with different slogans for each banner
  const TextContent1 = () => (
    <div className="relative z-10">
      <h1 className="text-5xl md:text-6xl font-bold text-navy-blue mb-6 leading-tight hero-text-animate">
        Find Your Dream House By Us
      </h1>
      <p className="text-gray-600 mb-8 text-lg leading-relaxed hero-text-delay-1">
        Discover premium properties that match your lifestyle. Your perfect home is just a click away with FD MAKAN.
      </p>
      <div className="flex items-center space-x-4 mb-12 hero-text-delay-2">
        <button className="bg-brand-red text-white px-8 py-4 rounded-lg font-semibold hover:bg-brand-red-dark transition shadow-lg">
          Make An Enquiry
        </button>
        <button className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition">
          <svg className="w-6 h-6 text-brand-red" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </button>
      </div>
    </div>
  );

  // Single banner - Banner 1 only (slider functionality ready for more banners later)
  const banners = [
    // Banner 1: Text Left, Image Right
    <div key="banner1" className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-4" style={{ width: '100%' }}>
      <TextContent1 />
      <RealImageContent />
    </div>
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => {
      const next = (prev + 1) % banners.length;
      return next;
    });
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => {
      const next = (prev - 1 + banners.length) % banners.length;
      return next;
    });
  };

  // Auto-play slider - changes slide every 5 seconds (only if more than 1 banner)
  useEffect(() => {
    if (banners.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % banners.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [banners.length]);

  return (
    <section className="bg-gray-50 relative overflow-hidden pb-12">
      {/* Background Layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 opacity-50"></div>
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="relative">
          {/* Floating Banner Container */}
          <div className="relative bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12 mx-auto max-w-7xl">
            {/* Slider Container Inside Banner */}
            <div className="relative overflow-hidden w-full" style={{ minHeight: '500px' }}>
              <div 
                className="flex"
                style={{ 
                  transform: `translateX(-${currentSlide * 100}%)`,
                  transition: 'transform 0.7s ease-in-out',
                  width: `${banners.length * 100}%`
                }}
              >
                {banners.map((banner, index) => (
                  <div 
                    key={`banner-${index}`}
                    className="flex-shrink-0"
                    style={{ 
                      width: `${100 / banners.length}%`,
                      flexBasis: `${100 / banners.length}%`
                    }}
                  >
                    {banner}
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows - Inside Banner (only show if more than 1 banner) */}
            {banners.length > 1 && (
              <>
                <button 
                  onClick={prevSlide}
                  type="button"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-white bg-opacity-80 rounded-full shadow-xl flex items-center justify-center hover:bg-opacity-100 transition z-30 hover:scale-110 cursor-pointer"
                  aria-label="Previous slide"
                >
                  <svg className="w-6 h-6 text-navy-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button 
                  onClick={nextSlide}
                  type="button"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-white bg-opacity-80 rounded-full shadow-xl flex items-center justify-center hover:bg-opacity-100 transition z-30 hover:scale-110 cursor-pointer"
                  aria-label="Next slide"
                >
                  <svg className="w-6 h-6 text-navy-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Slide Indicators - Inside Banner */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
                  {banners.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      type="button"
                      className={`h-3 rounded-full transition-all cursor-pointer ${
                        currentSlide === index 
                          ? 'bg-brand-red w-8' 
                          : 'bg-gray-300 hover:bg-gray-400 w-3'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Search/Filter Bar - Positioned at bottom of hero section */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-[calc(100%-1rem)] max-w-[95%] z-30">
          <div className="bg-gradient-to-r from-brand-red to-brand-red-dark rounded-2xl shadow-2xl p-8 mx-4 border-4 border-white/20 backdrop-blur-sm">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="relative">
                <label className="text-sm font-semibold text-white mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Choose Area
                </label>
                <select
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  className="w-full px-4 py-4 border-2 border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-white focus:border-white text-gray-900 appearance-none bg-white font-medium shadow-lg hover:shadow-xl transition-all"
                >
                  <option value="">Select Area</option>
                  <option value="downtown">Downtown</option>
                  <option value="suburbs">Suburbs</option>
                  <option value="riverside">Riverside</option>
                  <option value="coastal">Coastal</option>
                </select>
              </div>
              <div className="relative">
                <label className="text-sm font-semibold text-white mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Property Status
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-4 py-4 border-2 border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-white focus:border-white text-gray-900 appearance-none bg-white font-medium shadow-lg hover:shadow-xl transition-all"
                >
                  <option value="">Select Status</option>
                  <option value="for-sale">For Sale</option>
                  <option value="for-rent">For Rent</option>
                  <option value="sold">Sold</option>
                </select>
              </div>
              <div className="relative">
                <label className="text-sm font-semibold text-white mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Property Type
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-4 py-4 border-2 border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-white focus:border-white text-gray-900 appearance-none bg-white font-medium shadow-lg hover:shadow-xl transition-all"
                >
                  <option value="">Select Type</option>
                  <option value="house">House</option>
                  <option value="apartment">Apartment</option>
                  <option value="villa">Villa</option>
                  <option value="condo">Condo</option>
                </select>
              </div>
              <div className="flex items-end">
                <button className="w-full bg-white text-brand-red px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all shadow-2xl hover:shadow-3xl transform hover:scale-105 uppercase tracking-wide flex items-center justify-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  FIND NOW
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
