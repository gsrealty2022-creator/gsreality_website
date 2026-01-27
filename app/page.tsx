'use client';

import { useEffect } from 'react';
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedPropertyCard from "@/components/FeaturedPropertyCard";
import AboutSection from "@/components/AboutSection";
import StatsSection from "@/components/StatsSection";
import TopSellingProjects from "@/components/TopSellingProjects";
import Testimonials from "@/components/Testimonials";
import PremiumProjects from "@/components/PremiumProjects";
import RecentBlogs from "@/components/RecentBlogs";
import FeaturedDevelopers from "@/components/FeaturedDevelopers";
import FindByLocations from "@/components/FindByLocations";
import Footer from "@/components/Footer";
export default function Home() {
  useEffect(() => {
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div id="hero">
        <Hero />
      </div>
      <FeaturedPropertyCard />
      <div>
        <div id="top-selling">
          <TopSellingProjects />
        </div>
        <div id="find-by-locations">
          <FindByLocations />
        </div>
        <div id="premium-projects">
          <PremiumProjects />
        </div>
        <Testimonials />
        <div id="recent-blogs">
          <RecentBlogs />
        </div>
        <div id="stats">
          <StatsSection />
        </div>
        <div id="about">
          <AboutSection />
        </div>
        <div id="featured-developers">
          <FeaturedDevelopers />
        </div>
      </div>
      <div id="footer">
        <Footer />
      </div>
    </main>
  );
}

