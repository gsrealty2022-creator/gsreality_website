import Header from "@/components/Header";
import PropertyListings from "@/components/PropertyListings";
import Footer from "@/components/Footer";

export default function PropertiesPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-500 to-orange-500 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Properties</h1>
            <p className="text-xl text-white/90">
              Discover your dream property from our extensive collection
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-10 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center space-x-4 flex-wrap">
              <span className="text-gray-700 font-semibold">Filter by:</span>
              <select className="px-5 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white font-medium">
                <option>All Types</option>
                <option>House</option>
                <option>Apartment</option>
                <option>Villa</option>
                <option>Condo</option>
              </select>
              <select className="px-5 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white font-medium">
                <option>All Status</option>
                <option>For Sale</option>
                <option>For Rent</option>
              </select>
              <select className="px-5 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white font-medium">
                <option>All Locations</option>
                <option>Downtown</option>
                <option>Suburbs</option>
                <option>Riverside</option>
                <option>Coastal</option>
              </select>
            </div>
            <div className="text-gray-700 font-semibold">
              Showing <span className="text-teal-500 text-xl">6</span> properties
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

