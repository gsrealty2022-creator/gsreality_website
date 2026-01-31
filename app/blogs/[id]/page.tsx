'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Blog {
    _id: string;
    title: string;
    author: string;
    authorImage?: string;
    authorBio?: string;
    date: string;
    excerpt: string;
    content?: string;
    image: string;
    category: string;
}

export default function BlogDetailsPage() {
    const { id } = useParams();
    const [blog, setBlog] = useState<Blog | null>(null);
    const [recentBlogs, setRecentBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/blogs');
                if (response.ok) {
                    const data = await response.json();
                    const foundBlog = data.find((b: any) => b._id === id);

                    if (foundBlog) {
                        const formattedBlog: Blog = {
                            _id: foundBlog._id,
                            title: foundBlog.title,
                            author: foundBlog.author || "GS Realty Expert",
                            authorImage: foundBlog.authorImage || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
                            authorBio: foundBlog.authorBio || "Real Estate Strategist with over 10 years of experience in premium property market trends and luxury investments.",
                            date: foundBlog.date || new Date(foundBlog.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
                            excerpt: foundBlog.excerpt,
                            content: foundBlog.content || foundBlog.excerpt,
                            image: foundBlog.image || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=600&fit=crop",
                            category: foundBlog.category || "Market Analysis"
                        };
                        setBlog(formattedBlog);
                    }

                    const recents = data
                        .filter((b: any) => (b._id !== id))
                        .slice(0, 3);
                    setRecentBlogs(recents);
                }
            } catch (error) {
                console.error('Error fetching blog details:', error);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchData();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col bg-white">
                <Header />
                <div className="flex-grow flex justify-center items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-brand-secondary"></div>
                </div>
                <Footer />
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="min-h-screen flex flex-col bg-white">
                <Header />
                <div className="flex-grow flex flex-col justify-center items-center py-20">
                    <h2 className="text-2xl font-bold text-brand-primary mb-4">Blog Article Not Found</h2>
                    <Link href="/blogs" className="text-brand-secondary font-bold hover:underline">← Back to all blogs</Link>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />

            <main className="flex-grow">
                {/* Hero Header Section */}
                <section className="bg-gray-50 border-b border-gray-100 py-16 md:py-24">
                    <div className="container mx-auto px-4 max-w-5xl">
                        <div className="text-center max-w-4xl mx-auto space-y-6">
                            <span className="inline-block px-4 py-1.5 bg-brand-secondary/10 text-brand-secondary text-xs font-bold rounded-full uppercase tracking-widest border border-brand-secondary/20">
                                {blog.category}
                            </span>
                            <h1 className="text-4xl md:text-6xl font-black text-[#1e266d] leading-[1.1] tracking-tight">
                                {blog.title}
                            </h1>
                            <div className="flex items-center justify-center space-x-4 pt-4">
                                <span className="h-px bg-gray-300 w-12 hidden sm:block"></span>
                                <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">
                                    Insights from GS Realty Experts
                                </p>
                                <span className="h-px bg-gray-300 w-12 hidden sm:block"></span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Main Content Area */}
                <div className="container mx-auto px-4 py-12 md:py-20 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                        {/* Blog Content (Left) */}
                        <div className="lg:col-span-8">
                            <div className="relative aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl mb-12 border border-gray-100">
                                <Image
                                    src={blog.image}
                                    alt={blog.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>

                            <article className="max-w-none">
                                <div className="prose prose-lg lg:prose-xl prose-slate max-w-none">
                                    <div className="text-gray-700 leading-relaxed font-normal whitespace-pre-wrap first-letter:text-7xl first-letter:font-black first-letter:text-brand-primary first-letter:mr-3 first-letter:float-left">
                                        {blog.content}
                                    </div>
                                </div>

                                {/* Newsletter CTA in middle of content logic (example) */}
                                <div className="my-16 p-10 bg-brand-primary rounded-3xl text-white relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-secondary/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
                                    <h4 className="text-2xl font-bold mb-4 relative z-10">Enjoying this insight?</h4>
                                    <p className="text-gray-300 mb-8 max-w-md relative z-10">Subscribe to our property newsletter for exclusive market trends and off-market opportunities.</p>
                                    <div className="flex flex-col sm:flex-row gap-3 relative z-10">
                                        <input type="email" placeholder="email@address.com" className="bg-white/10 border border-white/20 rounded-xl px-5 py-3 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-brand-secondary transition" />
                                        <button className="bg-brand-secondary text-white font-bold px-8 py-3 rounded-xl hover:bg-amber-600 transition tracking-widest uppercase text-xs">Join Today</button>
                                    </div>
                                </div>
                            </article>
                        </div>

                        {/* Sidebar (Right) */}
                        <aside className="lg:col-span-4 space-y-12">
                            {/* Author Detail Widget */}
                            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 shadow-sm sticky top-32">
                                <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-8 border-b border-gray-200 pb-4">Written By</h3>
                                <div className="flex items-center space-x-5 mb-6">
                                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-brand-secondary p-1 bg-white shadow-md rotate-3">
                                        <div className="relative w-full h-full rounded-xl overflow-hidden">
                                            <Image
                                                src={blog.authorImage || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"}
                                                alt={blog.author}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="font-black text-[#1e266d] text-xl">{blog.author}</p>
                                        <p className="text-brand-secondary font-bold text-xs uppercase tracking-wider">Property Analyst</p>
                                    </div>
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed mb-8 italic">
                                    "{blog.authorBio}"
                                </p>
                                <div className="pt-6 border-t border-gray-200">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Posted On</p>
                                    <p className="font-bold text-[#1e266d]">{blog.date}</p>
                                </div>

                                {/* Shared on Socials */}
                                <div className="mt-8 flex gap-3">
                                    <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-gray-200 cursor-pointer hover:border-brand-secondary transition">𝕏</span>
                                    <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-gray-200 cursor-pointer hover:border-brand-secondary transition">in</span>
                                    <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-gray-200 cursor-pointer hover:border-brand-secondary transition">f</span>
                                </div>
                            </div>

                            {/* Recent Blogs Widget */}
                            <div className="space-y-6">
                                <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-200 pb-4">Read Next</h3>
                                <div className="space-y-6">
                                    {recentBlogs.map((recent) => (
                                        <Link key={recent._id} href={`/blogs/${recent._id}`} className="group block">
                                            <div className="flex gap-4">
                                                <div className="relative w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 group-hover:scale-95 transition-transform duration-300">
                                                    <Image src={recent.image} alt={recent.title} fill className="object-cover" />
                                                </div>
                                                <div className="pt-1">
                                                    <h4 className="font-black text-[#1e266d] text-sm group-hover:text-brand-secondary transition-colors line-clamp-2 leading-tight">
                                                        {recent.title}
                                                    </h4>
                                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2 block">
                                                        5 Min Read
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </aside>

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
