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

  const [zoomedLogo, setZoomedLogo] = useState<React.ReactNode | null>(null);

  const handleDeveloperClick = (developer: any) => {
    if (developer.isDatabase && developer._id) {
      router.push(`/developers/${developer._id}`);
    } else {
      // Open zoom modal for demo developers or non-linked ones
      setZoomedLogo(developer.logo);
    }
  };

  const handleZoom = (e: React.MouseEvent, logo: React.ReactNode) => {
    e.stopPropagation();
    setZoomedLogo(logo);
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
            <span className="text-gray-900 ml-4">GS Realty</span>
          </h2>
        </div>

        {/* Slider Container - Continuous Scroll */}
        <div className="relative overflow-hidden group/slider">
          <div className="flex animate-scroll-left hover:pause-animation">
            {developers.map((developer, index) => (
              <div
                key={`${developer.id}-${index}`}
                className="flex-shrink-0 px-4"
                style={{ width: '340px' }}
              >
                <div
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer group relative flex flex-col items-center justify-center h-48"
                  onClick={() => handleDeveloperClick(developer)}
                >
                  {/* Zoom Icon Button */}
                  <button
                    onClick={(e) => handleZoom(e, developer.logo)}
                    className="absolute top-3 right-3 p-2 bg-gray-100 rounded-full text-gray-400 hover:text-brand-primary hover:bg-brand-primary/10 transition-colors opacity-0 group-hover:opacity-100"
                    title="Zoom Logo"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" /></svg>
                  </button>

                  <div className="w-full h-32 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                    {developer.logo}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Zoom Modal */}
      {zoomedLogo && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in"
          onClick={() => setZoomedLogo(null)}
        >
          <div
            className="bg-white p-8 rounded-2xl max-w-2xl w-full max-h-[80vh] flex items-center justify-center relative shadow-2xl transform transition-all scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setZoomedLogo(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className="w-full h-full min-h-[300px] flex items-center justify-center text-4xl [&>div]:!text-5xl [&_img]:!h-auto [&_img]:max-h-[60vh]">
              {zoomedLogo}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

