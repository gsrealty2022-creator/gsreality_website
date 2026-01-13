'use client';

import React, { useState } from 'react';

export default function PropertyContactSidebar() {
    const [phoneNumber, setPhoneNumber] = useState('');

    return (
        <div className="flex flex-col gap-6">
            {/* Call Me Instantly Card */}
            <div className="bg-[#004d3d] rounded-xl p-6 text-white shadow-lg">
                <h3 className="text-xl font-bold mb-2">Call Me Instantly</h3>
                <p className="text-sm text-gray-200 mb-4">Hang Tight! Our Executive is calling you right now</p>

                <div className="space-y-4">
                    <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center">
                            <span className="mr-1">🇮🇳</span>
                        </div>
                        <input
                            type="tel"
                            placeholder="Phone Number"
                            className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>

                    <button className="w-full bg-white text-[#004d3d] font-bold py-3 rounded-full hover:bg-gray-100 transition shadow-md">
                        Call me now
                    </button>
                </div>
            </div>

            {/* Book Site Visit Card */}
            <div className="bg-white rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.1)] overflow-hidden border border-gray-100">
                <div className="flex border-b">
                    <button className="flex-1 py-4 text-sm font-bold text-[#0F2F4A] border-b-2 border-[#0F2F4A]">
                        Book Free Site Visit
                    </button>
                    <button className="flex-1 py-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                        Online Presentation
                    </button>
                </div>

                <div className="p-5 space-y-4">
                    <div className="relative">
                        <input
                            type="text"
                            readOnly
                            value="Rustomjee Urban Woods"
                            className="w-full bg-[#1F4B6B] text-white px-4 py-2 rounded-full text-sm pr-8"
                        />
                        <button className="absolute right-2 top-1/2 -translate-y-1/2 text-white/70 hover:text-white">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Select Date"
                            className="w-full bg-gray-100 pl-10 pr-4 py-3 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                            defaultValue="01-09-2026 3:09 PM"
                        />
                    </div>

                    <div className="flex gap-4">
                        <label className="flex items-center text-sm font-bold text-black cursor-pointer">
                            <input type="radio" name="ride" className="w-4 h-4 text-black mr-2 bg-black" defaultChecked />
                            OLA
                        </label>
                        <label className="flex items-center text-sm font-normal text-gray-500 cursor-pointer">
                            <input type="radio" name="ride" className="w-4 h-4 text-gray-300 mr-2" />
                            Not Required
                        </label>
                    </div>

                    <ul className="space-y-1 text-xs text-[#0F2F4A]">
                        <li className="flex items-start">
                            <span className="mr-1.5 mt-0.5 w-1 h-1 bg-[#0F2F4A] rounded-full"></span>
                            Free Pick Up & Drop - Book Personal Ola
                        </li>
                        <li className="flex items-start">
                            <span className="mr-1.5 mt-0.5 w-1 h-1 bg-[#0F2F4A] rounded-full"></span>
                            Visit Your Selected 3 Projects in One Tour
                        </li>
                        <li className="flex items-start">
                            <span className="mr-1.5 mt-0.5 w-1 h-1 bg-[#0F2F4A] rounded-full"></span>
                            Just Visit & Decide later
                        </li>
                    </ul>

                    <button className="w-full bg-[#1F4B6B] text-white font-bold py-3 rounded-lg hover:bg-[#163650] transition shadow-md">
                        Book Site Visit
                    </button>
                </div>
            </div>
        </div>
    );
}
