'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Testimonial {
    id: number;
    name: string;
    role: string;
    quote: string;
    description: string;
    image: string;
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        name: "Daisybee",
        role: "Themeforest User",
        quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ets.",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dores.",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
    },
    {
        id: 2,
        name: "John Doe",
        role: "Real Estate Client",
        quote: "Finding my dream home was effortless with GS Reality. Their team is truly professional and dedicated.",
        description: "The support I received throughout the process was exceptional. They understood my needs perfectly.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
    },
    {
        id: 3,
        name: "Sarah Miller",
        role: "Property Investor",
        quote: "Highly recommended for anyone looking to invest in premium properties. The market insights are invaluable.",
        description: "I've worked with many agencies, but the transparency here is what sets them apart from the rest.",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop"
    }
];

export default function Testimonials() {
    const [activeIndex, setActiveIndex] = useState(0);

    const nextTestimonial = () => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-20 left-[10%] opacity-10 hidden lg:block">
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M40 20C25 20 15 30 15 45C15 60 25 70 40 70C55 70 65 60 65 45C65 30 55 20 40 20ZM95 20C80 20 70 30 70 45C70 60 80 70 95 70C110 70 120 60 120 45C120 30 110 20 95 20Z" fill="#d97706" />
                </svg>
            </div>

            <div className="container mx-auto px-4 max-w-7xl relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

                    {/* Left Side: Image with Dot Pattern */}
                    <div className="relative w-full lg:w-1/2 flex justify-center">
                        {/* Dot Pattern */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] opacity-20 pointer-events-none">
                            <div className="grid grid-cols-10 gap-4">
                                {[...Array(100)].map((_, i) => (
                                    <div key={i} className="w-1.5 h-1.5 bg-brand-secondary rounded-full"></div>
                                ))}
                            </div>
                        </div>

                        {/* Avatar Container */}
                        <div className="relative w-52 h-52 md:w-64 md:h-64 rounded-full border-8 border-amber-100/50 p-4 bg-white shadow-xl z-10">
                            <div className="relative w-full h-full rounded-full overflow-hidden">
                                <Image
                                    src={testimonials[activeIndex].image}
                                    alt={testimonials[activeIndex].name}
                                    fill
                                    className="object-cover transition-opacity duration-500"
                                    sizes="(max-width: 768px) 208px, 256px"
                                />
                            </div>

                            {/* Light Blue Circle Decorative */}
                            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-amber-200/30 rounded-full -z-10 animate-pulse"></div>
                            <div className="absolute -top-10 -left-10 w-24 h-24 bg-amber-100/40 rounded-full -z-10"></div>
                        </div>
                    </div>

                    {/* Right Side: Content */}
                    <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-center text-center">
                        <h2 className="text-3xl md:text-4xl font-bold flex items-center justify-center lg:justify-start mb-8">
                            <span className="text-gray-400 relative inline-block">
                                Customers
                                <span className="absolute bottom-0 left-0 w-full h-1 bg-brand-secondary"></span>
                            </span>
                            <span className="text-gray-900 ml-4">Loves Us</span>
                        </h2>

                        <div className="relative min-h-[300px] flex flex-col items-center">
                            {/* Active Testimonial */}
                            <div key={testimonials[activeIndex].id} className="animate-in fade-in slide-in-from-right-8 duration-700 flex flex-col items-center">
                                <blockquote className="text-2xl md:text-3xl font-semibold text-brand-secondary leading-tight mb-6">
                                    {testimonials[activeIndex].quote}
                                </blockquote>

                                <p className="text-gray-600 text-lg mb-8 leading-relaxed max-w-lg mx-auto">
                                    {testimonials[activeIndex].description}
                                </p>

                                <div className="text-center">
                                    <h4 className="text-xl font-bold text-gray-900">
                                        {testimonials[activeIndex].name}
                                    </h4>
                                    <p className="text-gray-500 border-b border-gray-300 inline-block pb-1 mt-1 cursor-pointer hover:text-brand-secondary transition-colors">
                                        {testimonials[activeIndex].role}
                                    </p>
                                </div>
                            </div>

                            {/* Controls */}
                            <div className="flex flex-col items-center gap-6 mt-12">
                                {/* Arrow Buttons */}
                                <div className="flex gap-4">
                                    <button
                                        onClick={prevTestimonial}
                                        className="w-12 h-12 rounded-full border border-amber-200 flex items-center justify-center text-brand-secondary hover:bg-amber-50 transition"
                                        aria-label="Previous testimonial"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={nextTestimonial}
                                        className="w-12 h-12 rounded-full bg-brand-secondary flex items-center justify-center text-white hover:bg-amber-600 transition shadow-lg shadow-amber-200"
                                        aria-label="Next testimonial"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Pagination Dots */}
                                <div className="flex gap-2">
                                    {testimonials.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setActiveIndex(index)}
                                            className={`h-2 rounded-full transition-all duration-300 ${activeIndex === index ? 'w-8 bg-brand-secondary' : 'w-2 bg-amber-200'
                                                }`}
                                            aria-label={`Go to testimonial ${index + 1}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Another Decorative Quote Mark */}
            <div className="absolute bottom-20 right-[15%] opacity-10 rotate-180 hidden lg:block">
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M40 20C25 20 15 30 15 45C15 60 25 70 40 70C55 70 65 60 65 45C65 30 55 20 40 20ZM95 20C80 20 70 30 70 45C70 60 80 70 95 70C110 70 120 60 120 45C120 30 110 20 95 20Z" fill="#d97706" />
                </svg>
            </div>
        </section>
    );
}
