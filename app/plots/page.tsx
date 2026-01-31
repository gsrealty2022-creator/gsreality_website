'use client';

import { useState, useEffect, Suspense } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProjectCard from '@/components/ProjectCard';

function PlotsContent() {
    const [allPlots, setAllPlots] = useState<any[]>([]);
    const [filteredPlots, setFilteredPlots] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [locations, setLocations] = useState<any[]>([]);

    useEffect(() => {
        fetchPlots();
        fetchLocations();
    }, []);

    const fetchPlots = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/projects');
            if (response.ok) {
                const data = await response.json();
                // Filter specifically for plots
                const onlyPlots = data.filter((item: any) => item.type === 'plot');
                setAllPlots(onlyPlots);
                setFilteredPlots(onlyPlots);
            }
        } catch (error) {
            console.error('Error fetching plots:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchLocations = async () => {
        try {
            const response = await fetch('/api/locations');
            if (response.ok) {
                const data = await response.json();
                setLocations(data);
            }
        } catch (error) {
            console.error('Error fetching locations:', error);
        }
    };

    const handleFilter = (type: string, value: string) => {
        let filtered = [...allPlots];

        if (type === 'location' && value) {
            filtered = filtered.filter(p => p.location?.toLowerCase() === value.toLowerCase());
        }

        if (type === 'status' && value) {
            // Add status filtering logic if status field is implemented
            // For now, it's a UI placeholder matching the properties page
        }

        setFilteredPlots(filtered);
    };

    return (
        <main className="min-h-screen bg-gray-50">
            <Header />

            {/* Hero Section */}
            <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?w=1600&h=600&fit=crop')",
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/50 to-black/60"></div>
                </div>

                <div className="relative z-10 text-center text-white px-4">
                    <h1 className="text-5xl md:text-6xl font-bold mb-4">Plots</h1>
                    <p className="text-xl text-gray-200">Exclusive land and residential plots for your dream project</p>
                </div>
            </section>

            <div className="container mx-auto px-4 max-w-7xl py-12">
                {/* Filter Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                        <span className="text-gray-700 font-medium whitespace-nowrap">Filter by:</span>

                        {/* Type Filter (Static for Plots) */}
                        <div className="relative">
                            <select className="appearance-none bg-white border border-gray-200 text-gray-700 py-2 pl-4 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:border-transparent cursor-pointer font-medium text-sm min-w-[140px]">
                                <option value="plot">Plot</option>
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
                                onChange={(e) => handleFilter('location', e.target.value)}
                            >
                                <option value="">All Locations</option>
                                {locations.map(loc => (
                                    <option key={loc.id} value={loc.name}>{loc.name}</option>
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
                        Showing <span className="text-brand-secondary font-bold">{filteredPlots.length}</span> plots
                    </div>
                </div>

                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">Available Plots</h2>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-primary"></div>
                    </div>
                ) : filteredPlots.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPlots.map((plot) => (
                            <ProjectCard key={plot._id} property={plot} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-64 bg-white rounded-xl shadow-sm border border-gray-200">
                        <div className="text-6xl mb-4">🏜️</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No plots found</h3>
                        <p className="text-gray-600">
                            We currently don't have any plots matching your criteria.
                        </p>
                    </div>
                )}
            </div>

            <Footer />
        </main>
    );
}

export default function PlotsPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>}>
            <PlotsContent />
        </Suspense>
    );
}
