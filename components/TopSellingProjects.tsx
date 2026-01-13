'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Property {
  _id: string;
  name: string;
  price: number;
  location: string;
  images: string[];
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  subCategory?: string;
}

export default function TopSellingProjects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [databaseProperties, setDatabaseProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  // Demo data (fallback)
  const demoProjects = [
    {
      id: 1,
      name: "Godrej Bliss Kandivali",
      price: "₹ 1.62Cr - ₹ 2.33Cr",
      typology: "2 - 3 Bed Apartment",
      location: "Kandivali, Kandivali West, Mumbai",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop"
    },
    {
      id: 2,
      name: "Shapoorji Pallonji Sarova",
      price: "₹ 1.66Cr - ₹ 3.22Cr",
      typology: "1.5 - 3 Bed Apartment",
      location: "Kandivali East Mumbai Maharashtra",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop"
    },
    {
      id: 3,
      name: "Kalpataru Radiance Goregaon",
      price: "₹ 4.6Cr",
      typology: "2 - 4 Bed Apartment",
      location: "Goregaon West, Mumbai, Maharashtra",
      image: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop"
    }
  ];

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await fetch('/api/properties');
      if (response.ok) {
        const data = await response.json();
        // Filter properties that should be shown in Top Selling
        const topSellingProperties = data.filter((prop: any) => prop.showInTopSelling === true);
        // Convert database properties to display format
        const formatted = topSellingProperties.slice(0, 3).map((prop: Property) => ({
          id: prop._id,
          name: prop.name,
          price: `₹ ${(prop.price / 10000000).toFixed(2)}Cr`,
          typology: prop.bedrooms ? `${prop.bedrooms} - ${prop.bedrooms + 1} Bed Apartment` : 'Property',
          location: prop.location,
          image: prop.images && prop.images.length > 0 ? prop.images[0] : "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop"
        }));
        setDatabaseProperties(formatted);
      }
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  // Merge database properties with demo data (database first, then demo)
  const projects = [
    ...databaseProperties,
    ...demoProjects.slice(databaseProperties.length)
  ].slice(0, 3);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Heading */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold flex items-center">
            <span className="text-brand-red">Top Selling</span>
            <span className="text-gray-900 ml-4">Projects</span>
          </h2>
        </div>

        {/* Projects Grid */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div 
                key={project.id} 
                onClick={() => window.location.href = `/view-details/${String(project.id)}`}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>

                {/* Content */}
                <div className="p-6 relative">
                  {/* Share Icon */}
                  <button className="absolute top-6 right-6 w-10 h-10 bg-brand-teal rounded-full flex items-center justify-center hover:bg-brand-teal-dark transition shadow-md">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                  </button>

                  {/* Project Name */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 pr-12">
                    {project.name}
                  </h3>

                  {/* Price */}
                  <div className="text-brand-red font-semibold text-lg mb-3">
                    {project.price}
                  </div>

                  {/* Typology */}
                  <div className="text-gray-600 mb-2 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    {project.typology}
                  </div>

                  {/* Location */}
                  <div className="text-gray-600 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-sm">{project.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center mt-12 space-x-4">
            {/* Progress Indicator */}
            <div className="flex items-center space-x-2">
              <div className="w-12 h-1 bg-brand-red rounded"></div>
              <div className="w-24 h-1 bg-gray-300 rounded"></div>
            </div>

            {/* Arrow Buttons */}
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center hover:border-brand-red hover:bg-brand-red/10 transition"
              aria-label="Previous"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center hover:border-brand-red hover:bg-brand-red/10 transition"
              aria-label="Next"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

