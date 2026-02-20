'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProjectCard from '@/components/ProjectCard';

// Wrap the main content in Suspense for useSearchParams
function PropertiesContent() {
    const searchParams = useSearchParams();
    const initialSearch = searchParams.get('search') || '';

    const [properties, setProperties] = useState<any[]>([]);
    const [developers, setDevelopers] = useState<any[]>([]);
    const [locations, setLocations] = useState<any[]>([]);
    const [filteredProperties, setFilteredProperties] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState(initialSearch);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (properties.length > 0) {
            filterProperties();
        }
    }, [searchParams, properties, developers]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [projectsRes, devsRes, locsRes] = await Promise.all([
                fetch('/api/projects'),
                fetch('/api/developers'),
                fetch('/api/locations')
            ]);

            if (projectsRes.ok && devsRes.ok && locsRes.ok) {
                const projectsData = await projectsRes.json();
                const devsData = await devsRes.json();
                const locsData = await locsRes.json();
                setProperties(projectsData);
                setDevelopers(devsData);
                setLocations(locsData);
                setFilteredProperties(projectsData);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const filterProperties = () => {
        const type = searchParams.get('type')?.toLowerCase(); // residential or commercial
        const search = searchParams.get('search')?.toLowerCase();
        const filterLocation = searchParams.get('filterLocation')?.toLowerCase();
        const filterType = searchParams.get('filterType')?.toLowerCase();
        const beds = searchParams.get('beds');
        const minPrice = parseFloat(searchParams.get('minPrice') || '0');
        const maxPrice = parseFloat(searchParams.get('maxPrice') || 'Infinity');

        let filtered = properties;

        // 1. Property Type (Residential/Commercial) - CROSS DATA FILTERING
        if (type) {
            filtered = filtered.filter(prop => {
                // Check if property itself is of the requested type
                const isPropTypeMatch = prop.type?.toLowerCase() === type;

                // Check if developer of this property is of the requested type
                const propertyDev = developers.find(d => d.name.toLowerCase() === prop.developer?.toLowerCase());
                const isDevTypeMatch = type === 'residential' ? propertyDev?.isResidential : propertyDev?.isCommercial;

                return isPropTypeMatch || isDevTypeMatch;
            });
        }

        // 2. Keyword Search
        if (search) {
            filtered = filtered.filter(prop =>
                prop.name?.toLowerCase().includes(search) ||
                prop.location?.toLowerCase().includes(search) ||
                prop.developer?.toLowerCase().includes(search) ||
                prop.description?.toLowerCase().includes(search)
            );
        }

        // 3. Location Filter (ID based)
        if (filterLocation && filterLocation !== 'all locations') {
            filtered = filtered.filter(prop => {
                // Check if property has locationIds array and if it includes the selected ID
                if (prop.locationIds && Array.isArray(prop.locationIds)) {
                    return prop.locationIds.includes(filterLocation);
                }
                // Fallback to string matching if no IDs (legacy support)
                return prop.location?.toLowerCase().includes(filterLocation.toLowerCase());
            });
        }

        // 4. Specific Property Type Filter (House, Apartment, etc.)
        if (filterType && filterType !== 'all types') {
            filtered = filtered.filter(prop => prop.type?.toLowerCase() === filterType);
        }

        // 5. Beds Filter
        if (beds && beds !== 'all beds') {
            filtered = filtered.filter(prop => {
                const propBeds = String(prop.bedrooms);
                if (beds === '4') return parseInt(propBeds) >= 4;
                return propBeds.includes(beds);
            });
        }

        // 6. Price Range Filter
        if (minPrice > 0 || maxPrice < Infinity) {
            filtered = filtered.filter(prop => {
                const priceMatch = String(prop.price).match(/(\d+(\.\d+)?)/);
                const price = priceMatch ? parseFloat(priceMatch[0]) : 0;
                return price >= minPrice && price <= maxPrice;
            });
        }

        setFilteredProperties(filtered);
    };

    return (
        <main className="min-h-screen bg-gray-50">
            <Header />

            {/* Hero Section with Background Image */}
            <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
                {/* Background Image with Overlay */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&h=600&fit=crop')",
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/50 to-black/60"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 text-center text-white px-4">
                    <h1 className="text-5xl md:text-6xl font-bold mb-4">Projects</h1>
                </div>
            </section>

            <div className="container mx-auto px-4 max-w-7xl py-12">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                        <span className="text-gray-700 font-medium whitespace-nowrap">Filter by:</span>

                        {/* Type Filter */}
                        <div className="relative">
                            <select
                                className="appearance-none bg-white border border-gray-200 text-gray-700 py-2 pl-4 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:border-transparent cursor-pointer font-medium text-sm min-w-[140px]"
                                onChange={(e) => {
                                    const params = new URLSearchParams(searchParams.toString());
                                    if (e.target.value) params.set('filterType', e.target.value);
                                    else params.delete('filterType');
                                    window.history.replaceState(null, '', `?${params.toString()}`);
                                    filterProperties();
                                }}
                            >
                                <option value="">All Types</option>
                                <option value="apartment">Apartment</option>
                                <option value="house">House</option>
                                <option value="villa">Villa</option>
                                <option value="commercial">Commercial</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>

                        {/* Status Filter */}
                        <div className="relative">
                            <select className="appearance-none bg-white border border-gray-200 text-gray-700 py-2 pl-4 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:border-transparent cursor-pointer font-medium text-sm min-w-[140px]">
                                <option>All Status</option>
                                <option>For Sale</option>
                                <option>For Rent</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>

                        {/* Location Filter */}
                        <div className="relative">
                            <select
                                className="appearance-none bg-white border border-gray-200 text-gray-700 py-2 pl-4 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:border-transparent cursor-pointer font-medium text-sm min-w-[140px]"
                                onChange={(e) => {
                                    const params = new URLSearchParams(searchParams.toString());
                                    if (e.target.value) params.set('filterLocation', e.target.value);
                                    else params.delete('filterLocation');
                                    window.history.replaceState(null, '', `?${params.toString()}`);
                                    filterProperties();
                                }}
                            >
                                <option value="">All Locations</option>
                                {locations.map((loc) => (
                                    <option key={loc.id} value={loc.id}>
                                        {loc.name}
                                    </option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 md:mt-0 text-gray-500 font-medium">
                        Showing <span className="text-brand-secondary font-bold">{filteredProperties.length}</span> properties
                    </div>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-primary"></div>
                    </div>
                ) : filteredProperties.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProperties.map((property) => (
                            <ProjectCard key={property._id} property={property} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-64 bg-white rounded-xl shadow-sm border border-gray-200">
                        <div className="text-6xl mb-4">🏠</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No properties found</h3>
                        <p className="text-gray-600">
                            Try adjusting your search query or browse all properties.
                        </p>
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="mt-4 px-6 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-primary-dark transition-colors"
                            >
                                Clear Search
                            </button>
                        )}
                    </div>
                )}
            </div>

            <Footer />
        </main>
    );
}

export default function PropertiesPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>}>
            <PropertiesContent />
        </Suspense>
    );
}
