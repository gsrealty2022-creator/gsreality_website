import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";

const newsArticles = [
  {
    id: 1,
    title: "Real Estate Market Trends for 2024",
    excerpt: "Discover the latest trends shaping the real estate market this year and what it means for buyers and sellers.",
    date: "March 15, 2024",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
    category: "Market Trends"
  },
  {
    id: 2,
    title: "Top 5 Neighborhoods to Invest In",
    excerpt: "Our experts share their insights on the most promising neighborhoods for real estate investment.",
    date: "March 10, 2024",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
    category: "Investment"
  },
  {
    id: 3,
    title: "First-Time Home Buyer Guide",
    excerpt: "Everything you need to know about buying your first home, from pre-approval to closing day.",
    date: "March 5, 2024",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
    category: "Buying Guide"
  },
  {
    id: 4,
    title: "Sustainable Living: Green Homes on the Rise",
    excerpt: "Learn about the growing trend of eco-friendly homes and their benefits for homeowners and the environment.",
    date: "February 28, 2024",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
    category: "Sustainability"
  },
  {
    id: 5,
    title: "Luxury Real Estate Market Update",
    excerpt: "An in-depth look at the luxury property market and what's driving demand in high-end real estate.",
    date: "February 20, 2024",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&h=600&fit=crop",
    category: "Luxury"
  },
  {
    id: 6,
    title: "Tips for Selling Your Home Fast",
    excerpt: "Expert advice on how to prepare your home for sale and attract buyers quickly in today's market.",
    date: "February 15, 2024",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop",
    category: "Selling Tips"
  }
];

export default function NewsPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-500 to-orange-500 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Real Estate News</h1>
            <p className="text-xl text-white/90">
              Stay updated with the latest trends, insights, and market news
            </p>
          </div>
        </div>
      </section>

      {/* News Articles */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsArticles.map((article) => (
              <article 
                key={article.id} 
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 group"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-gradient-to-r from-teal-500 to-orange-500 text-white px-4 py-1.5 rounded-full text-xs font-semibold shadow-lg">
                      {article.category}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <div className="text-sm text-gray-500 mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {article.date}
                  </div>
                  <h2 className="text-xl font-bold text-[#1a365d] mb-3 group-hover:text-teal-500 transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                  <a 
                    href="#" 
                    className="text-teal-500 font-semibold hover:text-orange-500 transition inline-flex items-center group"
                  >
                    Read More
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-teal-500 to-orange-500">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-white/90 text-lg mb-8">
              Get the latest real estate news and market insights delivered to your inbox
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 border-2 border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white bg-white/90 placeholder-gray-500 font-medium"
              />
              <button
                type="submit"
                className="bg-white text-orange-500 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition shadow-lg hover:shadow-xl"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

