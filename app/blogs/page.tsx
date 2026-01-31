'use client';

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

interface Blog {
  _id: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  category?: string;
}

export default function NewsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/blogs');
        if (response.ok) {
          const data = await response.json();
          setBlogs(data);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section with Background Image */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1600&h=600&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/50 to-black/60"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Real Estate Blogs</h1>
          <p className="text-xl text-gray-200">Expert insights, trends, and guides for your property journey</p>
        </div>
      </section>


      {/* News Articles */}
      <section className="py-20 bg-white min-h-[400px]">
        <div className="container mx-auto px-4 max-w-7xl">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-secondary"></div>
            </div>
          ) : blogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((article) => (
                <article
                  key={article._id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 group"
                >
                  <Link href={`/blogs/${article._id}`}>
                    <div className="relative h-56 w-full overflow-hidden">
                      <Image
                        src={article.image || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop"}
                        alt={article.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-brand-secondary text-white px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-bold shadow-lg">
                          {article.category || "Market Insights"}
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </Link>
                  <div className="p-8">
                    <div className="text-xs font-bold text-gray-400 mb-3 flex items-center uppercase tracking-wider">
                      <svg className="w-4 h-4 mr-2 text-brand-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {new Date(article.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>
                    <Link href={`/blogs/${article._id}`}>
                      <h2 className="text-xl font-extrabold text-[#1e266d] mb-3 group-hover:text-brand-secondary transition-colors line-clamp-2 leading-tight">
                        {article.title}
                      </h2>
                    </Link>
                    <p className="text-gray-600 mb-6 line-clamp-3 text-sm leading-relaxed font-medium">
                      {article.excerpt}
                    </p>
                    <Link
                      href={`/blogs/${article._id}`}
                      className="text-brand-primary font-bold hover:text-brand-secondary transition inline-flex items-center group text-sm uppercase tracking-widest"
                    >
                      Read Full Article
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
              <p className="text-gray-400 font-bold">No blogs published yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-brand-primary text-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
                Stay Ahead in the <br />
                <span className="text-brand-secondary">Real Estate Market</span>
              </h2>
              <p className="text-gray-300 text-lg mb-0 max-w-lg">
                Get the latest insights, property investment tips, and market updates delivered directly to your inbox.
              </p>
            </div>
            <div className="max-w-md ml-auto w-full">
              <form className="flex flex-col gap-4">
                <input
                  type="email"
                  placeholder="Your professional email"
                  className="px-6 py-4 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:bg-white focus:text-gray-900 transition-all placeholder:text-gray-400"
                />
                <button
                  type="submit"
                  className="bg-brand-secondary text-white px-8 py-4 rounded-xl font-extrabold hover:bg-amber-600 transition shadow-xl uppercase tracking-widest"
                >
                  Join the Newsletter
                </button>
                <p className="text-[10px] text-gray-500 text-center opacity-60">We respect your privacy. No spam, only insights.</p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

