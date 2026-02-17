'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProjectStatsSidebar from '@/components/ProjectStatsSidebar';
import ProjectContactSidebar from '@/components/ProjectContactSidebar';

interface Property {
  _id: string;
  name: string;
  description: string;
  price: number;
  developer: string;
  location: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  available: boolean;
  images: string[];
  videos?: string[];
  createdAt?: string;
  // Additional fields for detailed view
  storeys?: string;
  projectArea?: string;
  possessionStatus?: string;
  advertiserReraNumber?: string;
  possessionDate?: string;
  projectReraNumber?: string;
  address?: string;
  highlights?: string[];
  amenities?: string[];
  facilities?: string[];
  specifications?: {
    floor?: { [key: string]: string };
    fitting?: { [key: string]: string };
    wallCeiling?: { [key: string]: string };
  };
  connectivity?: {
    commute?: Array<{ name: string; distance: string; time: string }>;
    entertainment?: Array<{ name: string; distance: string; time: string }>;
    essentials?: Array<{ name: string; distance: string; time: string }>;
  };
  pricing?: Array<{
    type: string;
    carpetArea: string;
    price: string;
  }>;
}

interface Developer {
  _id: string;
  name: string;
  logo?: string;
  description?: string;
  website?: string;
  establishedYear?: number;
  totalProjects?: number;
  rating?: number;
}

export default function PropertyDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [property, setProperty] = useState<Property | null>(null);
  const [developer, setDeveloper] = useState<Developer | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showAllHighlights, setShowAllHighlights] = useState(false);
  const [showFullAbout, setShowFullAbout] = useState(false);
  const [pricingFilter, setPricingFilter] = useState('all');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // New state for redesign
  const [openSection, setOpenSection] = useState<string | null>('detail');
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);

  // Mortgage Calculator State
  const [salePrice, setSalePrice] = useState<number>(0);
  const [downPayment, setDownPayment] = useState<number>(0);
  const [loanTerm, setLoanTerm] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(7.5);
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);

  const calculateMortgage = () => {
    const principal = (salePrice - downPayment) * 10000000; // Convert Crores back to raw Rupees
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    if (principal <= 0 || monthlyRate <= 0) return;

    const monthly = (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    setMonthlyPayment(Math.round(monthly));
  };


  useEffect(() => {
    if (params.id) {
      fetchProperty();
    }
  }, [params.id]);

  const fetchProperty = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/projects/${params.id}`);
      if (!response.ok) throw new Error('Property not found');
      const data = await response.json();
      setProperty(data);

      // Fetch developer info
      if (data.developer) {
        const devResponse = await fetch('/api/developers');
        if (devResponse.ok) {
          const developers = await devResponse.json();
          const foundDev = developers.find((d: Developer) => d.name === data.developer);
          if (foundDev) setDeveloper(foundDev);
        }
      }

      // Fetch featured properties for sidebar
      const allPropsResponse = await fetch('/api/projects');
      if (allPropsResponse.ok) {
        const allData = await allPropsResponse.json();
        setFeaturedProperties(allData.filter((p: any) => p._id !== params.id).slice(0, 4));
      }

      // Initialize mortgage calculator with property price in Crores
      if (data.price) {
        const priceInCr = Number((data.price / 10000000).toFixed(2));
        setSalePrice(priceInCr);
        setDownPayment(Number((priceInCr * 0.2).toFixed(2))); // Default 20% down, rounded to 2 decimals
      }
    } catch (error) {
      console.error('Error fetching property:', error);
    } finally {
      setLoading(false);
    }
  };

  const AmenityIcon = ({ name }: { name: string }) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      'Swimming Pool': (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <path d="M2.3 20a6 6 0 0 0 3.4 0 6 6 0 0 1 6.6 0 6 6 0 0 0 6.6 0 6 6 0 0 1 3.4 0" />
          <path d="M17 14v-2a3 3 0 0 0-3-3H4.5" />
          <path d="M14 9V5a2 2 0 0 0-2-2H4.5" />
          <rect width="6" height="3" x="14" y="2" rx="1" />
        </svg>
      ),
      'Gymnasium': (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <path d="m6.5 6.5 11 11" />
          <path d="m3 21 3-3" />
          <path d="m3 3 3 3" />
          <path d="m18 18 3 3" />
          <path d="m18 6 3-3" />
          <path d="M13 3h3" />
          <path d="M3 8v3" />
          <path d="M11 21h3" />
          <path d="M21 13v3" />
        </svg>
      ),
      'Club House': (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <path d="M15 21v-8a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v8" />
        </svg>
      ),
      'Kids Play Area': (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <path d="M10 15v4" />
          <path d="M14 15v4" />
          <path d="M6 3v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3" />
          <path d="m6 6 12 0" />
          <path d="m6 10 12 0" />
        </svg>
      ),
      'Garden': (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <path d="m12 19 0-7" />
          <path d="M19 12a7 7 0 1 1-14 0c0-3.87 3.13-7 7-7s7 3.13 7 7Z" />
          <path d="M7 12h10" />
        </svg>
      ),
      'Multi Purpose Court': (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <rect width="18" height="12" x="3" y="6" rx="2" />
          <path d="M3 12h18" />
          <path d="M12 6v12" />
        </svg>
      ),
      'Golf Course': (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <path d="M12 2v8" />
          <path d="m12 2 4 2-4 2" />
          <path d="M6 12a6 6 0 0 1 12 0c0 2-2 3-6 3s-6-1-6-3Z" />
          <path d="M12 15v4" />
          <path d="M8 21h8" />
        </svg>
      ),
      'Senior Citizen Area': (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <circle cx="12" cy="7" r="4" />
          <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
        </svg>
      ),
      'Squash Court': (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <circle cx="10" cy="10" r="7" />
          <path d="m21 21-6-6" />
          <path d="m15 13 2 2" />
        </svg>
      ),
      'Pets Walking Area': (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <circle cx="11" cy="4" r="2" />
          <path d="M18 19c-1.1 0-2 .9-2 2" />
          <path d="M20 19c-1.1 0-2 .9-2 2" />
          <path d="M9 11v6a2 2 0 0 1-2 2H5" />
          <path d="M11 11h1a2 2 0 0 1 2 2v6" />
          <path d="m7 7 5 4" />
        </svg>
      ),
      'Multi Purpose Lawn': (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <path d="M3 20h18" />
          <path d="M5 20v-4" />
          <path d="M9 20v-8" />
          <path d="M13 20v-12" />
          <path d="M17 20v-6" />
          <path d="M21 20v-2" />
        </svg>
      ),
      'Box Cricket': (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <circle cx="12" cy="12" r="10" />
          <path d="m12 8 0 8" />
          <path d="m8 12 8 0" />
        </svg>
      ),
      'Library': (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      ),
      'Open Gym': (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <path d="M18 20a2 2 0 1 0-4 0" />
          <path d="M10 20a2 2 0 1 0-4 0" />
          <path d="M18 20V4" />
          <path d="M6 20V4" />
          <path d="M18 8H6" />
        </svg>
      ),
      'Amphitheater': (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <path d="M3 21h18" />
          <path d="M6 21v-7a6 6 0 1 1 12 0v7" />
          <path d="M9 21v-4a3 3 0 1 1 6 0v4" />
        </svg>
      ),
      'Banquet Hall': (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <path d="M12 2v20" />
          <path d="M22 17v-4a2 2 0 0 0-2-2h-3L12 7l-5 4H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2z" />
        </svg>
      ),
      'Toddlers Play Area': (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <circle cx="8" cy="8" r="3" />
          <circle cx="16" cy="16" r="3" />
          <path d="M12 12a6 6 0 0 0 6-6" />
          <path d="M12 12a6 6 0 0 1-6 6" />
        </svg>
      ),
      'Seating Area': (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <path d="M7 18V5" />
          <path d="M17 18V5" />
          <path d="M7 11h10" />
          <path d="M5 18h4" />
          <path d="M15 18h4" />
        </svg>
      ),
      'Creche Outdoor Play Area': (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <path d="M3 12a9 9 0 0 1 18 0" />
          <path d="M12 21v-9" />
          <path d="M7 21h10" />
        </svg>
      ),
      'Table Tennis': (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <path d="M4 12h16" />
          <path d="M2 12h2a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H2" />
          <path d="M22 12h-2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h2" />
          <path d="M12 12V4" />
        </svg>
      ),
      'Pet Park': (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <path d="M12 3a9 9 0 0 0-9 9v9" />
          <path d="M12 3a9 9 0 0 1 9 9v9" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
      'Indoor games': (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
          <circle cx="8" cy="8" r="1.5" />
          <circle cx="16" cy="16" r="1.5" />
          <circle cx="8" cy="16" r="1.5" />
          <circle cx="16" cy="8" r="1.5" />
        </svg>
      ),
      'Star Gazing': (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
        </svg>
      ),
      'Badminton Court': (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <path d="M12 12a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" />
          <path d="m14 14 6 6" />
          <path d="m8 14-6 6" />
        </svg>
      ),
      'Skating Ring': (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8a4 4 0 1 0 0 8" />
        </svg>
      ),
      'Mini Theatre': (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <rect width="18" height="12" x="3" y="6" rx="2" />
          <path d="m9 10 6 2-6 2V10Z" />
        </svg>
      ),
      'Multi purpose hall': (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    };

    return iconMap[name] || (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
      </svg>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="text-gray-500">Loading property details...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Property Not Found</h2>
            <button
              onClick={() => router.push('/')}
              className="text-brand-secondary hover:text-brand-secondary-dark"
            >
              Go back to homepage
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Default highlights if not provided
  const defaultHighlights = property.highlights || [
    `Well-appointed ${property.bedrooms || 3} BHK apartments featuring private decks`,
    `Located in ${property.location}`,
    `Premium location with excellent connectivity`,
    `Expansive project offering breathtaking views`,
    `Modern architecture and design`,
    `World-class amenities and facilities`,
    `24/7 multi-level security for safety and peace of mind`,
    `Close to prominent areas and landmarks`,
    `Ready to move in`,
    `RERA approved project`
  ];

  const displayedHighlights = showAllHighlights ? defaultHighlights : defaultHighlights.slice(0, 5);

  // Default amenities and facilities
  const amenitiesToShow = [
    ...(property.amenities || []),
    ...(property.facilities || [])
  ];
  const defaultFacilities = property.facilities || ['Lift', 'Gas Pipeline', 'Power Back Up', 'Parking', 'Security System'];

  // Default pricing data
  const defaultPricing = property.pricing || [
    { type: '2 BHK', carpetArea: `${property.area ? Math.floor(property.area * 0.6) : 687} Sq.ft`, price: `₹ ${((property.price * 0.8) / 10000000).toFixed(2)} Cr` },
    { type: '3 BHK', carpetArea: `${property.area || 1041} Sq.ft`, price: `₹ ${(property.price / 10000000).toFixed(2)} Cr` },
  ];

  const filteredPricing = pricingFilter === 'all'
    ? defaultPricing
    : defaultPricing.filter(p => p.type.includes(pricingFilter));

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      <Header />

      <main className="pb-20">
        {/* Gallery Section - Full width/Split style */}
        <div className="relative w-full h-[300px] md:h-[500px] overflow-hidden bg-gray-100 flex">
          {property.images && property.images.length > 0 ? (
            <>
              {/* Main Image */}
              <div className="relative flex-1 h-full border-r-2 border-white">
                <Image
                  src={property.images[selectedImage]}
                  alt={property.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Secondary Image (Split view as seen in screenshot) */}
              {property.images.length > 1 && (
                <div className="relative hidden md:block w-1/2 h-full">
                  <Image
                    src={property.images[(selectedImage + 1) % property.images.length]}
                    alt={property.name}
                    fill
                    className="object-cover opacity-80"
                  />
                </div>
              )}

              {/* Navigation Arrows */}
              <button
                onClick={() => setSelectedImage((selectedImage - 1 + property.images.length) % property.images.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 transition"
              >
                <svg className="w-6 h-6 text-[#1a2234]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => setSelectedImage((selectedImage + 1) % property.images.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 transition"
              >
                <svg className="w-6 h-6 text-[#1a2234]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Counter Badge */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-1 rounded-full text-sm font-medium backdrop-blur-md">
                {selectedImage + 1} / {property.images.length}
              </div>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No images available
            </div>
          )}
        </div>

        <div className="container mx-auto px-4 max-w-7xl -mt-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Content Column */}
            <div className="lg:col-span-8 space-y-6">
              {/* Property Summary Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                  <div>
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#FFF5EE] text-[#FF7A59] text-xs font-bold uppercase tracking-wider mb-3">
                      Sale
                    </div>
                    <h1 className="text-3xl font-extrabold text-[#0D263B] mb-2">{property.name}</h1>
                    <div className="flex items-center text-gray-500 gap-1">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="font-medium text-lg">{property.location}</span>
                    </div>
                  </div>
                  <div className="md:text-right">
                    <p className="text-4xl font-black text-[#1a2234]">
                      <span className="text-2xl font-bold mr-1">₹</span>
                      {property.price ? (property.price / 10000000).toFixed(2) : "0.00"} Cr
                    </p>
                    <button className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#E8F5F1] text-[#2D9B7C] font-bold hover:bg-[#2D9B7C] hover:text-white transition-all group">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                      Share
                    </button>
                  </div>
                </div>

                {/* Bento Property Stats */}
                <div className="grid grid-cols-3 gap-4 border-t border-gray-100 pt-6" id="overview">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#F0F5FA] flex items-center justify-center text-[#1a2234]">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-[#0D263B]">{property.bedrooms || 3} Beds</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#F0F5FA] flex items-center justify-center text-[#1a2234]">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-[#0D263B]">{property.bathrooms || 2} Baths</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#F0F5FA] flex items-center justify-center text-[#1a2234]">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-[#0D263B]">{property.area || 1200} sqft</p>
                    </div>
                  </div>
                </div>
              </div>


              {/* Highlights Section */}
              <div id="highlights" className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 border-t-4 border-t-[#C5A028]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#FFF9F0] flex items-center justify-center text-[#C5A028]">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-black text-[#0D263B]">Project <span className="text-[#C5A028]">Highlights</span></h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {displayedHighlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#C5A028] shrink-0 group-hover:scale-150 transition-transform"></div>
                      <p className="text-gray-600 font-medium leading-relaxed italic">{highlight}</p>
                    </div>
                  ))}
                </div>
                {defaultHighlights.length > 5 && (
                  <button
                    onClick={() => setShowAllHighlights(!showAllHighlights)}
                    className="mt-6 text-[#C5A028] font-bold text-sm hover:underline flex items-center gap-2"
                  >
                    {showAllHighlights ? 'Show Less' : `View All ${defaultHighlights.length} Highlights`}
                    <svg className={`w-4 h-4 transition-transform ${showAllHighlights ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Accordion Sections */}
              <div className="space-y-4">
                {/* Property Detail Accordion */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden border-l-4 border-l-[#C5A028]">
                  <button
                    onClick={() => setOpenSection(openSection === 'detail' ? null : 'detail')}
                    id="detail"
                    className={`w-full flex items-center justify-between p-6 text-left transition-all ${openSection === 'detail' ? 'bg-[#1a2234] text-white' : 'hover:bg-gray-50 text-[#0D263B]'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${openSection === 'detail' ? 'bg-white/10 text-[#C5A028]' : 'bg-blue-50 text-[#1a2234]'}`}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <h2 className="text-xl font-black">Property <span className={openSection === 'detail' ? 'text-[#C5A028]' : 'text-[#1a2234]'}>Detail</span></h2>
                    </div>
                    <svg className={`w-6 h-6 transition-transform ${openSection === 'detail' ? 'rotate-180 text-[#C5A028]' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openSection === 'detail' && (
                    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center py-3 border-b border-gray-100">
                          <span className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Property ID</span>
                          <span className="text-[#1a2234] font-black tracking-tight">HZ-{property._id.substring(property._id.length - 4).toUpperCase()}</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-gray-100">
                          <span className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Project Area</span>
                          <span className="text-[#0D263B] font-black">{property.projectArea || "N/A"}</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-gray-100">
                          <span className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Storeys</span>
                          <span className="text-[#0D263B] font-black">{property.storeys || "N/A"}</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-gray-100">
                          <span className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Bedrooms</span>
                          <span className="text-[#0D263B] font-black">{property.bedrooms || 3}</span>
                        </div>
                        {property.projectReraNumber && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Project RERA</span>
                            <span className="text-[#C5A028] font-black text-[10px]">{property.projectReraNumber}</span>
                          </div>
                        )}
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center py-3 border-b border-gray-100">
                          <span className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Bathrooms</span>
                          <span className="text-[#0D263B] font-black">{property.bathrooms || 2}</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-gray-100">
                          <span className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Status</span>
                          <span className={`font-black px-3 py-1 rounded-lg text-[10px] uppercase tracking-tighter ${property.possessionStatus?.toLowerCase().includes('ready') ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                            {property.possessionStatus || (property.available ? "For Sale" : "Sold Out")}
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-gray-100">
                          <span className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Developer</span>
                          <span className="text-[#1a2234] font-black">{property.developer}</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-gray-100">
                          <span className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Possession</span>
                          <span className="text-[#0D263B] font-black">{property.possessionDate || "Expected 2024"}</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-gray-100">
                          <span className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Car Parking</span>
                          <span className="text-[#0D263B] font-black">{property.facilities?.includes('Parking') ? 'Available' : 'Contact for Detail'}</span>
                        </div>
                        {property.advertiserReraNumber && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Adv. RERA</span>
                            <span className="text-[#C5A028] font-black text-[10px]">{property.advertiserReraNumber}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Description Accordion */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden border-l-4 border-l-blue-100" id="about">
                  <button
                    onClick={() => setOpenSection(openSection === 'desc' ? null : 'desc')}
                    className={`w-full flex items-center justify-between p-6 text-left transition-all ${openSection === 'desc' ? 'bg-[#1a2234] text-white' : 'hover:bg-gray-50 text-[#0D263B]'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${openSection === 'desc' ? 'bg-white/10 text-[#C5A028]' : 'bg-blue-50 text-[#1a2234]'}`}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                        </svg>
                      </div>
                      <h2 className="text-xl font-black">Description</h2>
                    </div>
                    <svg className={`w-6 h-6 transition-transform ${openSection === 'desc' ? 'rotate-180 text-[#C5A028]' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openSection === 'desc' && (
                    <div className="p-8 font-medium">
                      <p className="text-gray-600 leading-relaxed whitespace-pre-line first-letter:text-4xl first-letter:font-black first-letter:text-[#1a2234] first-letter:mr-3 first-letter:float-left">
                        {property.description}
                      </p>
                    </div>
                  )}
                </div>

                {/* Amenities Accordion */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden border-l-4 border-l-[#2D9B7C]" id="amenities">
                  <button
                    onClick={() => setOpenSection(openSection === 'amenities' ? null : 'amenities')}
                    className={`w-full flex items-center justify-between p-6 text-left transition-all ${openSection === 'amenities' ? 'bg-[#1a2234] text-white' : 'hover:bg-gray-50 text-[#0D263B]'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${openSection === 'amenities' ? 'bg-white/10 text-[#C5A028]' : 'bg-blue-50 text-[#1a2234]'}`}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                      </div>
                      <h2 className="text-xl font-black">Amenities</h2>
                    </div>
                    <svg className={`w-6 h-6 transition-transform ${openSection === 'amenities' ? 'rotate-180 text-[#C5A028]' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openSection === 'amenities' && (
                    <div className="p-8">
                      {amenitiesToShow.length > 0 ? (
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                          {amenitiesToShow.map((amenity: any, index: number) => (
                            <div key={index} className="flex items-center gap-4 group p-3 rounded-xl border border-gray-50 hover:border-[#C5A028]/30 hover:bg-gray-50 transition-all">
                              <div className="w-8 h-8 rounded-full bg-[#E8F5F1] flex items-center justify-center text-[#2D9B7C] border border-[#2D9B7C]/20 shrink-0">
                                <AmenityIcon name={typeof amenity === 'string' ? amenity : amenity.name} />
                              </div>
                              <span className="text-gray-700 text-sm font-bold tracking-tight">{typeof amenity === 'string' ? amenity : amenity.name}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>
                          </div>
                          <p className="text-gray-400 font-medium">No specific amenities listed for this property.</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Pricing Accordion */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden border-l-4 border-l-blue-900" id="pricing">
                  <button
                    onClick={() => setOpenSection(openSection === 'pricing' ? null : 'pricing')}
                    className={`w-full flex items-center justify-between p-6 text-left transition-all ${openSection === 'pricing' ? 'bg-[#1a2234] text-white' : 'hover:bg-gray-50 text-[#0D263B]'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${openSection === 'pricing' ? 'bg-white/10 text-[#C5A028]' : 'bg-blue-50 text-[#1a2234]'}`}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h2 className="text-xl font-black">Pricing <span className={openSection === 'pricing' ? 'text-[#C5A028]' : 'text-[#1a2234]'}>Grid</span></h2>
                    </div>
                    <svg className={`w-6 h-6 transition-transform ${openSection === 'pricing' ? 'rotate-180 text-[#C5A028]' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openSection === 'pricing' && (
                    <div className="p-0 border-t border-gray-100 overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="bg-gray-50/50 text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">
                            <th className="px-8 py-4">Configuration</th>
                            <th className="px-8 py-4">Carpet Area</th>
                            <th className="px-8 py-4 text-right">Investment</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                          {(property.pricing?.length ? property.pricing : defaultPricing).map((item, index) => (
                            <tr key={index} className="group hover:bg-blue-50/30 transition-colors">
                              <td className="px-8 py-5 font-bold text-[#0D263B]">{item.type}</td>
                              <td className="px-8 py-5 text-gray-500 font-medium">{item.carpetArea}</td>
                              <td className="px-8 py-5 font-black text-[#1a2234] text-right">
                                <span className="text-[#2D9B7C] tracking-tighter">{item.price}</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                {/* Location Accordion */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden border-l-4 border-l-blue-100" id="connectivity">
                  <button
                    onClick={() => setOpenSection(openSection === 'loc' ? null : 'loc')}
                    className={`w-full flex items-center justify-between p-6 text-left transition-all ${openSection === 'loc' ? 'bg-[#1a2234] text-white' : 'hover:bg-gray-50 text-[#0D263B]'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${openSection === 'loc' ? 'bg-white/10 text-[#C5A028]' : 'bg-blue-50 text-[#1a2234]'}`}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                      </div>
                      <h2 className="text-xl font-black">Location <span className={openSection === 'loc' ? 'text-[#C5A028]' : 'text-[#1a2234]'}>View</span></h2>
                    </div>
                    <svg className={`w-6 h-6 transition-transform ${openSection === 'loc' ? 'rotate-180 text-[#C5A028]' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openSection === 'loc' && (
                    <div className="p-8 space-y-8">
                      <div>
                        <p className="text-[#1a2234] font-black mb-4 uppercase text-[10px] tracking-[0.2em] flex items-center gap-2">
                          Site Address
                        </p>
                        <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100/50 text-[#0D263B] font-bold italic relative">
                          <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-8 bg-blue-300 rounded-full"></div>
                          "{property.address || `${property.name}, ${property.location}, India`}"
                        </div>
                      </div>
                      <div className="space-y-8">
                        {['commute', 'entertainment', 'essentials'].map((category) => {
                          const items = property.connectivity?.[category as keyof typeof property.connectivity] || [];
                          if (items.length === 0) return null;

                          return (
                            <div key={category}>
                              <p className="text-[#1a2234] font-black mb-4 uppercase text-[10px] tracking-[0.2em] flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-[#C5A028]"></span>
                                {category}
                              </p>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {items.map((item, idx) => (
                                  <div key={idx} className="flex justify-between items-center p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:border-[#C5A028]/30 transition-all group">
                                    <div className="flex flex-col">
                                      <span className="text-gray-500 font-bold text-xs uppercase tracking-wider">{item.name}</span>
                                      {item.time && <span className="text-[10px] text-[#2D9B7C] font-bold italic">{item.time} away</span>}
                                    </div>
                                    <span className="text-[#1a2234] font-black text-sm bg-blue-50 px-4 py-1.5 rounded-xl border border-blue-100 group-hover:bg-[#C5A028] group-hover:text-[#1a2234] transition-colors">{item.distance}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Specifications Accordion */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden border-l-4 border-l-[#1a2234]">
                  <button
                    onClick={() => setOpenSection(openSection === 'specs' ? null : 'specs')}
                    className={`w-full flex items-center justify-between p-6 text-left transition-all ${openSection === 'specs' ? 'bg-[#1a2234] text-white' : 'hover:bg-gray-50 text-[#0D263B]'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${openSection === 'specs' ? 'bg-white/10 text-[#C5A028]' : 'bg-blue-50 text-[#1a2234]'}`}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <h2 className="text-xl font-black">Project <span className={openSection === 'specs' ? 'text-[#C5A028]' : 'text-[#1a2234]'}>Specifications</span></h2>
                    </div>
                    <svg className={`w-6 h-6 transition-transform ${openSection === 'specs' ? 'rotate-180 text-[#C5A028]' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openSection === 'specs' && (
                    <div className="p-8 space-y-10">
                      {[
                        { title: 'Flooring', data: property.specifications?.floor },
                        { title: 'Fittings & Fixtures', data: property.specifications?.fitting },
                        { title: 'Wall & Ceiling', data: property.specifications?.wallCeiling }
                      ].map((spec, sidx) => {
                        if (!spec.data || Object.keys(spec.data).length === 0) return null;
                        return (
                          <div key={sidx} className="relative">
                            <h3 className="text-sm font-black text-[#1a2234] uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                              <span className="w-8 h-px bg-[#C5A028]"></span>
                              {spec.title}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                              {Object.entries(spec.data).map(([key, value], vidx) => (
                                <div key={vidx} className="flex flex-col py-2 border-b border-gray-50">
                                  <span className="text-gray-400 font-bold uppercase text-[9px] tracking-widest mb-1">{key}</span>
                                  <span className="text-[#0D263B] font-bold text-sm tracking-tight">{value}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                      {(!property.specifications ||
                        (!Object.keys(property.specifications.floor || {}).length &&
                          !Object.keys(property.specifications.fitting || {}).length &&
                          !Object.keys(property.specifications.wallCeiling || {}).length)) && (
                          <div className="text-center py-6 text-gray-400 font-medium italic">
                            Detailed specifications are available upon request.
                          </div>
                        )}
                    </div>
                  )}
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden border-l-4 border-l-[#C5A028]" id="faq">
                  <button
                    onClick={() => setOpenSection(openSection === 'faq' ? null : 'faq')}
                    className={`w-full flex items-center justify-between p-6 text-left transition-all ${openSection === 'faq' ? 'bg-[#1a2234] text-white' : 'hover:bg-gray-50 text-[#0D263B]'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${openSection === 'faq' ? 'bg-white/10 text-[#C5A028]' : 'bg-blue-50 text-[#1a2234]'}`}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h2 className="text-xl font-black">Helpful <span className={openSection === 'faq' ? 'text-[#C5A028]' : 'text-[#1a2234]'}>FAQs</span></h2>
                    </div>
                    <svg className={`w-6 h-6 transition-transform ${openSection === 'faq' ? 'rotate-180 text-[#C5A028]' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openSection === 'faq' && (
                    <div className="p-8 space-y-6">
                      {[
                        { q: `What is the price of ${property.name}?`, a: `The starting price is ₹ ${property.price ? (property.price / 10000000).toFixed(2) : "0.00"} Cr.` },
                        { q: `Where is it located?`, a: `It is prime located in ${property.location}.` },
                        { q: `What is the possession status?`, a: `The project is currently ${property.possessionStatus || (property.available ? "Ready to Move" : "Under Construction")}.` }
                      ].map((faq, idx) => (
                        <div key={idx} className="group">
                          <p className="font-black text-[#1a2234] mb-2 flex items-center gap-2">
                            <span className="text-[#C5A028] text-lg">Q.</span>
                            {faq.q}
                          </p>
                          <div className="pl-6 border-l-2 border-gray-100 group-hover:border-[#C5A028]/30 transition-colors">
                            <p className="text-gray-500 text-sm leading-relaxed font-medium">{faq.a}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {/* About Developer Section */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mt-6" id="builder">
                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
                  <div className="shrink-0 flex justify-center w-full md:w-auto">
                    <div className="w-24 h-24 rounded-2xl bg-[#1a2234] flex items-center justify-center text-white text-4xl font-black shadow-xl shadow-blue-900/10">
                      {developer?.name?.[0] || property.developer?.[0]}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#0D263B] mb-4">About {developer?.name || property.developer}</h3>
                    <p className="text-gray-600 leading-relaxed italic font-medium">
                      {developer?.description || `${property.developer} is a leading real estate developer known for high-quality residential projects and architectural excellence.`}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDEBAR */}
            <div className="lg:col-span-4 space-y-6">
              <div className="sticky top-24 space-y-6">
                <ProjectContactSidebar />

                {/* Mortgage Calculator Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-[#F0F5FA] flex items-center justify-center text-[#1a2234]">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-[#0D263B]">Mortgage Calculator</h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Sale Price (Cr)</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">₹</span>
                        <input
                          type="number"
                          step="0.01"
                          value={salePrice}
                          onChange={(e) => setSalePrice(Number(e.target.value))}
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-blue-200 outline-none transition-all font-bold text-[#0D263B]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Down Payment (Cr)</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">₹</span>
                        <input
                          type="number"
                          step="0.01"
                          value={downPayment}
                          onChange={(e) => setDownPayment(Number(e.target.value))}
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-blue-200 outline-none transition-all font-bold text-[#0D263B]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Term (Years)</label>
                        <input
                          type="number"
                          value={loanTerm}
                          onChange={(e) => setLoanTerm(Number(e.target.value))}
                          className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-blue-200 outline-none transition-all font-bold text-[#0D263B]"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Rate (%)</label>
                        <input
                          type="number"
                          step="0.1"
                          value={interestRate}
                          onChange={(e) => setInterestRate(Number(e.target.value))}
                          className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-blue-200 outline-none transition-all font-bold text-[#0D263B]"
                        />
                      </div>
                    </div>

                    <button
                      onClick={calculateMortgage}
                      className="w-full py-4 rounded-xl bg-[#1a2234] text-white font-bold hover:bg-[#0D263B] transition-all shadow-lg shadow-blue-900/10"
                    >
                      Calculate
                    </button>

                    {monthlyPayment !== null && (
                      <div className="mt-6 p-4 rounded-xl bg-[#E8F5F1] border border-[#2D9B7C]/20 text-center">
                        <p className="text-[#2D9B7C] text-sm font-bold uppercase tracking-widest mb-1">Monthly Payment</p>
                        <p className="text-3xl font-black text-[#1a2234]">₹ {monthlyPayment.toLocaleString()}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Discover Latest Section (Full Width) */}
          <div className="mt-16 bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-black text-[#0D263B]">Discover <span className="text-[#C5A028]">Latest</span></h3>
              <div className="h-1.5 w-12 bg-[#C5A028] rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProperties.map((p) => (
                <a
                  key={p._id}
                  href={`/view-project/${p._id}`}
                  className="group block"
                >
                  <div className="relative h-64 rounded-2xl overflow-hidden mb-4">
                    <img
                      src={p.images?.[0] || '/placeholder.jpg'}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <span className="text-white font-bold text-sm">View Project</span>
                    </div>
                  </div>
                  <h4 className="font-bold text-[#0D263B] text-lg mb-1 group-hover:text-[#C5A028] transition-colors">{p.name}</h4>
                  <p className="text-gray-400 text-sm font-medium mb-2">{p.location}</p>
                  <p className="font-black text-[#2D9B7C] text-xl">₹ {(p.price / 10000000).toFixed(2)} Cr</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
