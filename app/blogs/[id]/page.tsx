'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Blog {
    _id?: string;
    id?: string | number;
    title: string;
    author: string;
    authorImage?: string;
    date: string;
    excerpt: string;
    content?: string;
    image: string;
    category: string;
}

export default function BlogDetailsPage() {
    const { id } = useParams(); // Get ID from URL
    const [blog, setBlog] = useState<Blog | null>(null);
    const [recentBlogs, setRecentBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // In a real app, you would fetch the specific blog by ID
        // AND fetch recent blogs for the sidebar
        // For now, we reuse the fetch all logic and filter/find

        const fetchData = async () => {
            try {
                const response = await fetch('/api/blogs');
                if (response.ok) {
                    const data = await response.json();
                    // Find the current blog
                    // Determine if we are looking by _id or some other id
                    // Assuming the API returns objects with _id.

                    const foundBlog = data.find((b: any) => b._id === id || b.id == id);

                    if (foundBlog) {
                        const formattedBlog: Blog = {
                            _id: foundBlog._id,
                            id: foundBlog._id,
                            title: foundBlog.title,
                            author: foundBlog.author || "John Doe",
                            authorImage: foundBlog.authorImage || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
                            date: foundBlog.date || new Date(foundBlog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
                            excerpt: foundBlog.excerpt,
                            content: foundBlog.content || foundBlog.excerpt, // Use content if available, else excerpt
                            image: foundBlog.image || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
                            category: foundBlog.category || "General"
                        };
                        setBlog(formattedBlog);
                    } else {
                        // Fallback for demo if not found in db (e.g. if we clicked a demo blog)
                        // This logic mimics the demo data from RecentBlogs for seamless transition
                        // In production, you'd likely just show 404 or handle gracefully
                    }

                    // Set recent blogs (excluding current)
                    const recents = data
                        .filter((b: any) => (b._id !== id && b.id != id))
                        .slice(0, 3)
                        .map((b: any) => ({
                            ...b,
                            image: b.image || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop"
                        }));
                    setRecentBlogs(recents);

                }
            } catch (error) {
                console.error('Error fetching blog details:', error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchData();
        }

    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <div className="flex-grow flex justify-center items-center">
                    <p>Loading...</p>
                </div>
                <Footer />
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <div className="flex-grow flex justify-center items-center">
                    <p>Blog not found.</p>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />

            <main className="flex-grow container mx-auto px-4 py-12 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Main Content (Left, 2 cols) */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Blog Image */}
                        <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg">
                            <Image
                                src={blog.image}
                                alt={blog.title}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute top-4 left-4">
                                <span className="bg-brand-secondary text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-md">
                                    {blog.category}
                                </span>
                            </div>
                        </div>

                        {/* Title and Meta */}
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-[#1e266d] mb-4 leading-tight">
                                {blog.title}
                            </h1>
                            <div className="flex items-center text-gray-500 text-sm space-x-6 border-b border-gray-200 pb-6 mb-6">
                                <span className="flex items-center">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                    {blog.date}
                                </span>
                                <span className="flex items-center">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                    By {blog.author}
                                </span>
                            </div>

                            {/* Content */}
                            <article className="prose prose-lg max-w-none text-gray-600">
                                <p className="whitespace-pre-wrap leading-relaxed">
                                    {blog.content}
                                </p>
                            </article>
                        </div>
                    </div>

                    {/* Sidebar (Right, 1 col) */}
                    <div className="lg:col-span-1 space-y-8">
                        {/* Author Card */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-[#1e266d] mb-4 border-l-4 border-brand-secondary pl-3">Author</h3>
                            <div className="flex items-center space-x-4">
                                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-brand-secondary">
                                    <Image
                                        src={blog.authorImage || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"}
                                        alt={blog.author}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900">{blog.author}</p>
                                    <p className="text-sm text-gray-500">Real Estate Expert</p>
                                </div>
                            </div>
                        </div>

                        {/* Recent Posts Widget */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-[#1e266d] mb-6 border-l-4 border-brand-secondary pl-3">Recent Posts</h3>
                            <div className="space-y-6">
                                {recentBlogs.length > 0 ? (
                                    recentBlogs.map((recent) => (
                                        <Link href={`/blogs/${recent._id || recent.id}`} key={recent._id || recent.id} className="flex space-x-4 group">
                                            <div className="relative w-24 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                                                <Image
                                                    src={recent.image}
                                                    alt={recent.title}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                                                />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-brand-secondary transition-colors text-sm">
                                                    {recent.title}
                                                </h4>
                                                <span className="text-xs text-gray-400 mt-1 block">{recent.date}</span>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <p className="text-gray-500 text-sm">No other recent posts.</p>
                                )}
                            </div>
                        </div>

                        {/* Categories Widget (Optional) */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-[#1e266d] mb-4 border-l-4 border-brand-secondary pl-3">Categories</h3>
                            <div className="flex flex-wrap gap-2">
                                {["Luxury", "Market Trends", "Investment", "Tips"].map((cat) => (
                                    <span key={cat} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium hover:bg-brand-secondary hover:text-white transition-colors cursor-pointer">
                                        {cat}
                                    </span>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
