'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function HousingTopPicks() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const projects = [
    {
      id: 1,
      developerName: "Ishtika Homes",
      developerLogo: (
        <div className="w-full h-full bg-white rounded-lg flex items-center justify-center shadow-md">
          <span className="text-purple-600 font-bold text-xs">ISHIKA HOMES</span>
        </div>
      ),
      projectName: "Ishtika Anahata",
      location: "Samethanahalli, Bangalore East",
      price: "₹86.65 L - 1.18 Cr",
      apartmentTypes: "2, 2.5, 3 BHK Apartments",
      specialOffer: "No EMI Till Possession",
      image: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1200&h=600&fit=crop"
    },
    {
      id: 2,
      developerName: "Rrl Builders And Developers Pvt Ltd",
      developerLogo: (
        <div className="w-full h-full bg-gray-800 rounded-lg flex items-center justify-center">
          <span className="text-yellow-500 font-bold text-sm">RRL</span>
        </div>
      ),
      projectName: "RRL Palm Altezze",
      location: "Bangalore East, Bangalore",
      price: "₹1.01 Cr - 1.3 Cr",
      apartmentTypes: "2, 3 BHK Apartments",
      specialOffer: null,
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=600&fit=crop"
    },
    {
      id: 3,
      developerName: "Prestige Group",
      developerLogo: (
        <div className="w-full h-full bg-white rounded-lg flex items-center justify-center shadow-md">
          <span className="text-blue-600 font-bold text-xs">PRESTIGE</span>
        </div>
      ),
      projectName: "Prestige Park Ridge",
      location: "Whitefield, Bangalore",
      price: "₹2.5 Cr - 4.5 Cr",
      apartmentTypes: "3, 4 BHK Apartments",
      specialOffer: "Early Bird Offer",
      image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&h=600&fit=crop"
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const currentProject = projects[currentIndex];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Heading */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            GS Reality's top picks
          </h2>
          <p className="text-gray-600 text-lg">
            Explore top living options with us.
          </p>
        </div>

        {/* Main Content Area */}
        <div className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Project Card */}
            <div className="lg:col-span-3 relative">
              <div className="bg-brand-secondary/10 rounded-2xl p-4 shadow-lg h-full relative">
                {/* Navigation Arrow - Left */}
                <button
                  onClick={prevSlide}
                  className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition z-10"
                  aria-label="Previous"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Developer Logo */}
                <div className="mb-2">
                  <div className="w-12 h-12">
                    {projects[(currentIndex - 1 + projects.length) % projects.length].developerLogo}
                  </div>
                </div>

                {/* Developer Name */}
                <div className="mb-1">
                  <h3 className="font-bold text-gray-900 text-sm leading-tight">
                    {projects[(currentIndex - 1 + projects.length) % projects.length].developerName}
                  </h3>
                  <a href="#" className="text-brand-primary text-xs font-medium hover:underline">
                    View Projects
                  </a>
                </div>

                {/* Project Details */}
                <div className="mt-2 space-y-1">
                  <h4 className="font-bold text-gray-900 text-sm">
                    {projects[(currentIndex - 1 + projects.length) % projects.length].projectName}
                  </h4>
                  <p className="text-gray-600 text-xs">
                    {projects[(currentIndex - 1 + projects.length) % projects.length].location}
                  </p>
                  <p className="text-brand-secondary font-semibold text-sm">
                    {projects[(currentIndex - 1 + projects.length) % projects.length].price}
                  </p>
                  <p className="text-gray-600 text-xs">
                    {projects[(currentIndex - 1 + projects.length) % projects.length].apartmentTypes}
                  </p>
                  {projects[(currentIndex - 1 + projects.length) % projects.length].specialOffer && (
                    <div className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded text-xs font-medium inline-flex items-center mt-1">
                      <svg className="w-2.5 h-2.5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {projects[(currentIndex - 1 + projects.length) % projects.length].specialOffer}
                    </div>
                  )}
                  <button className="w-full bg-brand-secondary text-white py-1.5 px-3 rounded-lg font-semibold hover:bg-brand-secondary-dark transition mt-2 text-sm">
                    Contact
                  </button>
                </div>
              </div>
            </div>

            {/* Central Large Image */}
            <div className="lg:col-span-6 relative">
              <div className="relative h-[300px] rounded-2xl overflow-hidden shadow-2xl">
                {/* Main Image - Current Project */}
                <div className="absolute inset-0">
                  <Image
                    src={currentProject.image}
                    alt={currentProject.projectName}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  {/* Dark Overlay for better text visibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
              </div>

              {/* Top Right Thumbnail */}
              <div className="absolute top-4 right-4 bg-white rounded-lg shadow-xl p-2 z-10 max-w-[120px]">
                <div className="w-full h-16 rounded overflow-hidden mb-1 relative">
                  <Image
                    src={currentProject.image}
                    alt={currentProject.projectName}
                    fill
                    className="object-cover"
                    sizes="120px"
                  />
                </div>
                <p className="text-xs font-semibold text-gray-700 text-center leading-tight">
                  {currentProject.projectName}
                </p>
              </div>
            </div>

            {/* Right Project Card */}
            <div className="lg:col-span-3 relative">
              <div className="bg-brand-secondary/10 rounded-2xl p-4 shadow-lg h-full relative">
                {/* Navigation Arrow - Right */}
                <button
                  onClick={nextSlide}
                  className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition z-10"
                  aria-label="Next"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Developer Logo */}
                <div className="mb-2">
                  <div className="w-12 h-12">
                    {projects[(currentIndex + 1) % projects.length].developerLogo}
                  </div>
                </div>

                {/* Developer Name */}
                <div className="mb-1">
                  <h3 className="font-bold text-gray-900 text-sm leading-tight">
                    {projects[(currentIndex + 1) % projects.length].developerName}
                  </h3>
                  <a href="#" className="text-brand-primary text-xs font-medium hover:underline">
                    View Projects
                  </a>
                </div>

                {/* Project Details */}
                <div className="mt-2 space-y-1">
                  <h4 className="font-bold text-gray-900 text-sm">
                    {projects[(currentIndex + 1) % projects.length].projectName}
                  </h4>
                  <p className="text-gray-600 text-xs">
                    {projects[(currentIndex + 1) % projects.length].location}
                  </p>
                  <p className="text-brand-secondary font-semibold text-sm">
                    {projects[(currentIndex + 1) % projects.length].price}
                  </p>
                  <p className="text-gray-600 text-xs">
                    {projects[(currentIndex + 1) % projects.length].apartmentTypes}
                  </p>
                  {projects[(currentIndex + 1) % projects.length].specialOffer && (
                    <div className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded text-xs font-medium inline-flex items-center mt-1">
                      <svg className="w-2.5 h-2.5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {projects[(currentIndex + 1) % projects.length].specialOffer}
                    </div>
                  )}
                  <button className="w-full bg-brand-secondary text-white py-1.5 px-3 rounded-lg font-semibold hover:bg-brand-secondary-dark transition mt-2 text-sm">
                    Contact
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

