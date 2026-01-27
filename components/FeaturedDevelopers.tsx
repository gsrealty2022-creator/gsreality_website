'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Developer {
  _id?: string;
  id?: string | number;
  name: string;
  logo: React.ReactNode;
  isDatabase?: boolean;
}

export default function FeaturedDevelopers() {
  const router = useRouter();
  const [databaseDevelopers, setDatabaseDevelopers] = useState<Developer[]>([]);
  const [loading, setLoading] = useState(true);

  // Demo data (fallback)
  const demoDevelopers = [
    {
      id: 1,
      name: "Regency Group",
      logo: (
        <div className="w-full h-24 flex items-center justify-center p-4">
          <div className="text-red-900 font-bold text-lg">REGENCY GROUP</div>
        </div>
      )
    },
    {
      id: 2,
      name: "Risland",
      logo: (
        <div className="w-full h-24 flex items-center justify-center p-4">
          <div className="text-center">
            <div className="text-blue-600 font-bold text-xl">RISLAND</div>
          </div>
        </div>
      )
    },
    {
      id: 3,
      name: "Runwal",
      logo: (
        <div className="w-full h-24 flex items-center justify-center p-4">
          <div className="flex flex-col items-center">
            <div className="text-yellow-600 font-bold text-2xl">RUNWAL</div>
          </div>
        </div>
      )
    },
    {
      id: 4,
      name: "Ruparel Realty",
      logo: (
        <div className="w-full h-24 flex items-center justify-center p-4">
          <div className="text-center">
            <div className="text-brand-secondary font-bold text-2xl inline-block mr-1">R</div>
            <span className="text-black font-bold text-lg">RUPAREL</span>
          </div>
        </div>
      )
    },
    {
      id: 5,
      name: "Rustomjee",
      logo: (
        <div className="w-full h-24 flex items-center justify-center p-4">
          <div className="text-black font-bold text-xl">Rustomjee®</div>
        </div>
      )
    },
    {
      id: 6,
      name: "Sheth",
      logo: (
        <div className="w-full h-24 flex items-center justify-center p-4">
          <div className="text-brand-secondary font-bold text-2xl">sheth</div>
        </div>
      )
    },
    {
      id: 7,
      name: "Developer 7",
      logo: (
        <div className="w-full h-24 flex items-center justify-center p-4">
          <div className="text-brand-secondary font-bold text-lg">Developer</div>
        </div>
      )
    }
  ];

  useEffect(() => {
    fetchDevelopers();
  }, []);

  const fetchDevelopers = async () => {
    try {
      const response = await fetch('/api/developers');
      if (response.ok) {
        const data = await response.json();
        // Convert database developers to display format
        const formatted: Developer[] = data.map((dev: any) => ({
          id: dev._id,
          _id: dev._id,
          name: dev.name,
          isDatabase: true,
          logo: dev.logo ? (
            <div className="w-full h-24 flex items-center justify-center p-4">
              <img src={dev.logo} alt={dev.name} className="max-w-full max-h-full object-contain" />
            </div>
          ) : (
            <div className="w-full h-24 flex items-center justify-center p-4">
              <div className="text-gray-800 font-bold text-lg">{dev.name.toUpperCase()}</div>
            </div>
          )
        }));
        setDatabaseDevelopers(formatted);
      }
    } catch (error) {
      console.error('Error fetching developers:', error);
    } finally {
      setLoading(false);
    }
  };

  // Merge database developers with demo data (database first, then demo)
  const baseDevelopers = [
    ...databaseDevelopers,
    ...demoDevelopers.slice(databaseDevelopers.length).map(dev => ({ ...dev, isDatabase: false }))
  ];

  // Duplicate developers for seamless infinite scroll
  const developers = [...baseDevelopers, ...baseDevelopers];

  const handleDeveloperClick = (developer: any) => {
    if (developer.isDatabase && developer._id) {
      router.push(`/developers/${developer._id}`);
    } else {
      // For demo developers, show a message
      alert(`Developer: ${developer.name}\nThis is a demo developer. Add it to the database to view details.`);
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Heading */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold flex items-center">
            <span className="text-gray-400 relative inline-block">
              Partners with
              <span className="absolute bottom-0 left-0 w-full h-1 bg-brand-secondary"></span>
            </span>
            <span className="text-gray-900 ml-4">GS Reality</span>
          </h2>
        </div>

        {/* Slider Container - Continuous Scroll */}
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll-left">
            {developers.map((developer, index) => (
              <div
                key={`${developer.id}-${index}`}
                className="flex-shrink-0 px-3"
                style={{ width: '300px' }}
              >
                <div
                  className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow border border-gray-200 cursor-pointer"
                  onClick={() => handleDeveloperClick(developer)}
                >
                  {developer.logo}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

