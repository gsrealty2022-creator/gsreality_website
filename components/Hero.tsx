import { useState, useEffect } from 'react';
import Image from 'next/image';

interface HeroSlide {
  _id?: string;
  title: string;
  subtitle?: string;
  image: string;
  order: number;
}

const DEFAULT_SLIDES: HeroSlide[] = [
  {
    title: "Find Your Sweet Home",
    subtitle: "Premium properties in prime locations",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
    order: 0
  },
  {
    title: "Luxury Living Redefined",
    subtitle: "Experience elegance in every corner",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2070&auto=format&fit=crop",
    order: 1
  },
  {
    title: "Modern Architecture",
    subtitle: "Built for the next generation",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop",
    order: 2
  }
];

export default function Hero() {
  const [propertyType, setPropertyType] = useState('residential');
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [propertyTypeFilter, setPropertyTypeFilter] = useState('');
  const [beds, setBeds] = useState('');
  const [showAdvanceSearch, setShowAdvanceSearch] = useState(false);
  const [area, setArea] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState<HeroSlide[]>(DEFAULT_SLIDES);

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      const response = await fetch('/api/hero');
      if (response.ok) {
        const data = await response.json();
        if (data && data.length > 0) {
          setSlides(data);
        }
      }
    } catch (error) {
      console.error('Error fetching hero slides:', error);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic here
    console.log('Search:', {
      propertyType,
      keyword,
      location,
      propertyTypeFilter,
      beds,
      area,
      minPrice,
      maxPrice
    });
  };

  return (
    <section className="relative w-full h-[90vh] min-h-[700px] overflow-hidden">
      {/* White Banner Area Below Navbar */}
      <div className="absolute top-0 left-0 right-0 bg-white z-10 h-32 md:h-40 flex items-center">
        <div className="container mx-auto px-4 w-full">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight inline-block animate-fade-in" key={currentSlide}>
            {slides[currentSlide]?.title || "Find Your Sweet Home"}
          </h1>
        </div>
      </div>

      {/* Background Image with Carousel */}
      <div className="absolute inset-0">
        <div
          className="relative w-full h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          <div className="absolute inset-0 flex">
            {slides.map((slide, index) => (
              <div key={slide._id || index} className="min-w-full h-full relative overflow-hidden">
                <div className="absolute inset-0" style={{ transform: 'translateY(15%)' }}>
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover"
                    style={{ objectPosition: 'center bottom' }}
                    priority={index === 0}
                  />
                </div>
                {/* Dark overlay for better text readability */}
                <div className="absolute inset-0 bg-black/30"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Carousel Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 z-30 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-all shadow-lg hover:scale-110"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 z-30 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-all shadow-lg hover:scale-110"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Content Overlay */}
      <div className="relative z-20 container mx-auto px-4 h-full flex items-end pb-16 md:pb-20">
        <div className="w-full">

          {/* Search Form Card - Overlapping design with enhanced depth */}
          <div className="bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] p-6 md:p-8 relative max-w-4xl w-full transform translate-y-12 md:translate-y-16">
            <form onSubmit={handleSearch} className="space-y-3">
              {/* Top Row: Keyword Input + Toggle Buttons */}
              <div className="flex flex-col md:flex-row gap-2">
                {/* Keyword Input - Left Side */}
                <div className="flex-1 relative">
                  <div className="absolute left-2.5 top-1/2 transform -translate-y-1/2 z-10">
                    <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Keyword"
                    className="w-full pl-9 pr-2.5 py-2 text-xs border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary text-gray-900"
                  />
                </div>

                {/* Vertical Separator */}
                <div className="hidden md:block w-px bg-gray-200 self-stretch"></div>

                {/* Toggle Slider - Right Side */}
                <div className="relative flex bg-gray-100 rounded-lg p-1 border border-gray-200 w-full md:w-auto">
                  {/* Sliding Background */}
                  <div
                    className="absolute top-1 bottom-1 bg-brand-primary rounded-md shadow-sm transition-all duration-300 ease-in-out"
                    style={{
                      width: 'calc(50% - 4px)',
                      left: '4px',
                      transform: `translateX(${propertyType === 'residential' ? '0' : 'calc(100% + 4px)'
                        })`
                    }}
                  ></div>

                  <button
                    type="button"
                    onClick={() => setPropertyType('residential')}
                    className={`relative z-10 flex-1 md:flex-none md:min-w-[120px] px-6 py-1.5 text-xs font-bold transition-colors duration-200 ${propertyType === 'residential' ? 'text-white' : 'text-gray-600 hover:text-gray-900'
                      }`}
                  >
                    Residential
                  </button>
                  <button
                    type="button"
                    onClick={() => setPropertyType('commercial')}
                    className={`relative z-10 flex-1 md:flex-none md:min-w-[120px] px-6 py-1.5 text-xs font-bold transition-colors duration-200 ${propertyType === 'commercial' ? 'text-white' : 'text-gray-600 hover:text-gray-900'
                      }`}
                  >
                    Commercial
                  </button>
                </div>
              </div>

              {/* Middle Row: Three Dropdowns */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {/* Location Dropdown */}
                <div className="relative">
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-2.5 py-2 text-xs border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary text-gray-900 appearance-none bg-white pr-7"
                    style={{ backgroundImage: 'none' }}
                  >
                    <option value="">All Main Locations</option>
                    <option value="downtown">Downtown</option>
                    <option value="suburbs">Suburbs</option>
                    <option value="riverside">Riverside</option>
                    <option value="coastal">Coastal</option>
                  </select>
                  <div className="absolute right-2.5 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Type Dropdown */}
                <div className="relative">
                  <select
                    value={propertyTypeFilter}
                    onChange={(e) => setPropertyTypeFilter(e.target.value)}
                    className="w-full px-2.5 py-2 text-xs border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary text-gray-900 appearance-none bg-white pr-7"
                    style={{ backgroundImage: 'none' }}
                  >
                    <option value="">All Types</option>
                    <option value="house">House</option>
                    <option value="apartment">Apartment</option>
                    <option value="villa">Villa</option>
                    <option value="condo">Condo</option>
                  </select>
                  <div className="absolute right-2.5 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Beds Dropdown */}
                <div className="relative">
                  <select
                    value={beds}
                    onChange={(e) => setBeds(e.target.value)}
                    className="w-full px-2.5 py-2 text-xs border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary text-gray-900 appearance-none bg-white pr-7"
                    style={{ backgroundImage: 'none' }}
                  >
                    <option value="">All Beds</option>
                    <option value="1">1 Bed</option>
                    <option value="2">2 Beds</option>
                    <option value="3">3 Beds</option>
                    <option value="4">4+ Beds</option>
                  </select>
                  <div className="absolute right-2.5 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Advanced Search Fields - Conditional */}
              {showAdvanceSearch && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 pt-1 animate-slide-down">
                  <div className="relative">
                    <input
                      type="number"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      placeholder="Area (Sq Ft)"
                      className="w-full px-2.5 py-2 text-xs border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary text-gray-900"
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      placeholder="Min Price"
                      className="w-full px-2.5 py-2 text-xs border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary text-gray-900"
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      placeholder="Max Price"
                      className="w-full px-2.5 py-2 text-xs border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary text-gray-900"
                    />
                  </div>
                </div>
              )}

              {/* Bottom Row: Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 pt-1">
                {/* Advance Search Button - Left */}
                <button
                  type="button"
                  onClick={() => setShowAdvanceSearch(!showAdvanceSearch)}
                  className={`flex items-center justify-center border border-blue-400 px-3 py-1.5 rounded-md text-xs font-semibold transition whitespace-nowrap ${showAdvanceSearch
                      ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-inner'
                      : 'bg-white text-blue-500 hover:bg-blue-50'
                    }`}
                >
                  <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span>{showAdvanceSearch ? 'Hide Options' : 'Advance Search'}</span>
                  <svg className={`w-3 h-3 ml-1 transition-transform duration-300 ${showAdvanceSearch ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Search Button - Right */}
                <button
                  type="submit"
                  className="bg-brand-primary text-white px-5 py-2 rounded-md text-xs font-bold hover:bg-brand-primary-dark transition shadow-md hover:shadow-lg whitespace-nowrap"
                >
                  Search
                </button>
              </div>
            </form>
          </div>

          {/* Bottom Button: Looking for certain features - Left-aligned */}
          <button className="mt-3 bg-brand-primary text-white px-4 py-2 rounded-md text-xs font-semibold flex items-center gap-1.5 hover:bg-brand-primary-dark transition shadow-md w-full max-w-3xl">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Looking for certain features</span>
          </button>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all ${currentSlide === index ? 'bg-white w-8' : 'bg-white/50 w-2'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
