'use client';

import React, { useState } from 'react';

export default function PropertyContactSidebar() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        description: "I'm interested in this property."
    });

    return (
        <div className="flex flex-col gap-6">
            {/* Detailed Contact Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden group">
                {/* Header with profile */}
                <div className="bg-[#1a2234] p-6 flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center overflow-hidden">
                        <svg className="w-10 h-10 text-white/50" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-[#C5A028] text-[10px] font-black uppercase tracking-widest mb-1">Project Expert</p>
                        <h3 className="text-xl font-black text-white leading-none">GS Realty Expert</h3>
                    </div>
                </div>

                <div className="p-8 space-y-6">
                    <div className="space-y-1.5 focus-within:translate-x-1 transition-transform">
                        <label className="text-xs font-black text-[#1a2234] uppercase tracking-wider ml-1">Name</label>
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-xl text-navy-blue placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#C5A028]/50 transition-all font-medium"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    <div className="space-y-1.5 focus-within:translate-x-1 transition-transform">
                        <label className="text-xs font-black text-[#1a2234] uppercase tracking-wider ml-1">Email</label>
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-xl text-navy-blue placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#C5A028]/50 transition-all font-medium"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    <div className="space-y-1.5 focus-within:translate-x-1 transition-transform">
                        <label className="text-xs font-black text-[#1a2234] uppercase tracking-wider ml-1">Phone No.</label>
                        <div className="relative">
                            <input
                                type="tel"
                                placeholder="+91-123-456-7890"
                                className="w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-xl text-navy-blue placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#C5A028]/50 transition-all font-medium"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5 focus-within:translate-x-1 transition-transform">
                        <label className="text-xs font-black text-[#1a2234] uppercase tracking-wider ml-1">Description</label>
                        <textarea
                            rows={4}
                            className="w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-xl text-navy-blue placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#C5A028]/50 transition-all font-medium resize-none"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    <button className="w-full bg-[#C5A028] text-white font-black py-5 rounded-xl hover:bg-[#B8860B] transition-all transform hover:-translate-y-1 active:scale-95 shadow-xl shadow-yellow-900/20 uppercase tracking-[0.2em] text-sm">
                        Send Inquiry
                    </button>

                    <p className="text-[10px] text-center text-gray-400 uppercase tracking-widest font-bold">
                        Fastest Response Guaranteed
                    </p>
                </div>
            </div>

        </div>
    );
}
