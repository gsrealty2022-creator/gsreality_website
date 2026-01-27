import Header from "@/components/Header";
import PropertyListings from "@/components/PropertyListings";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function PropertiesPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section with Background Image */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&h=600&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/50 to-black/60"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Our Properties</h1>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-10 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center space-x-4 flex-wrap">
              <span className="text-gray-700 font-semibold">Filter by:</span>
              <select className="px-5 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:border-brand-secondary bg-white font-medium text-gray-700">
                <option>All Types</option>
                <option>House</option>
                <option>Apartment</option>
                <option>Villa</option>
                <option>Condo</option>
              </select>
              <select className="px-5 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:border-brand-secondary bg-white font-medium text-gray-700">
                <option>All Status</option>
                <option>For Sale</option>
                <option>For Rent</option>
              </select>
              <select className="px-5 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:border-brand-secondary bg-white font-medium text-gray-700">
                <option>All Locations</option>
                <option>Downtown</option>
                <option>Suburbs</option>
                <option>Riverside</option>
                <option>Coastal</option>
              </select>
            </div>
            <div className="text-gray-700 font-semibold">
              Showing <span className="text-brand-secondary text-xl">6</span> properties
            </div>
          </div>
        </div>
      </section>

      <div className="bg-white">
        <PropertyListings />
      </div>

      <Footer />
    </main>
  );
}

