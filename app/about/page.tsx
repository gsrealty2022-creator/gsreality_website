import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section with Background Image */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1600&h=600&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/50 to-black/60"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">About Us</h1>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Section Label */}
            <div className="text-center mb-12">
              <div className="inline-block mb-6">
                <span className="text-brand-secondary font-bold text-sm uppercase tracking-widest">ABOUT US</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">15 Years of Excellence in Real Estate</h2>
            </div>

            <div className="mb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <p className="text-lg text-gray-700 leading-relaxed">
                  GS Reality has been a leading name in the real estate industry, dedicated to helping
                  individuals and families find their perfect homes and investment opportunities.
                  With years of experience and a commitment to excellence, we have built a reputation
                  for integrity, professionalism, and outstanding customer service.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Our mission is to provide exceptional real estate services
                  that exceed expectations. We understand that buying or selling property is one of
                  life's most significant decisions, and we're here to guide you through every step
                  of the process.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="text-center p-8 bg-white rounded-xl shadow-lg border-t-4 border-brand-primary hover:shadow-2xl transition-all">
                <div className="text-5xl font-bold text-brand-primary mb-3">500+</div>
                <div className="text-gray-700 font-semibold text-lg">Properties Sold</div>
              </div>
              <div className="text-center p-8 bg-white rounded-xl shadow-lg border-t-4 border-brand-secondary hover:shadow-2xl transition-all">
                <div className="text-5xl font-bold text-brand-secondary mb-3">1000+</div>
                <div className="text-gray-700 font-semibold text-lg">Happy Clients</div>
              </div>
              <div className="text-center p-8 bg-white rounded-xl shadow-lg border-t-4 border-brand-primary hover:shadow-2xl transition-all">
                <div className="text-5xl font-bold text-brand-primary mb-3">15+</div>
                <div className="text-gray-700 font-semibold text-lg">Years Experience</div>
              </div>
            </div>

            <div className="mb-16">
              <div className="inline-block mb-4">
                <span className="text-brand-secondary font-semibold text-sm uppercase tracking-wider">Our Foundation</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#1a365d] mb-10">Our Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-8 border-l-4 border-brand-primary bg-white rounded-r-xl shadow-lg hover:shadow-xl transition-all">
                  <h3 className="text-2xl font-bold text-[#1a365d] mb-3">Integrity</h3>
                  <p className="text-gray-700 leading-relaxed">
                    We conduct all our business with the highest ethical standards and transparency.
                  </p>
                </div>
                <div className="p-8 border-l-4 border-brand-secondary bg-white rounded-r-xl shadow-lg hover:shadow-xl transition-all">
                  <h3 className="text-2xl font-bold text-[#1a365d] mb-3">Excellence</h3>
                  <p className="text-gray-700 leading-relaxed">
                    We strive for excellence in every transaction and interaction with our clients.
                  </p>
                </div>
                <div className="p-8 border-l-4 border-brand-primary bg-white rounded-r-xl shadow-lg hover:shadow-xl transition-all">
                  <h3 className="text-2xl font-bold text-[#1a365d] mb-3">Customer Focus</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Your satisfaction is our top priority. We listen, understand, and deliver.
                  </p>
                </div>
                <div className="p-8 border-l-4 border-brand-secondary bg-white rounded-r-xl shadow-lg hover:shadow-xl transition-all">
                  <h3 className="text-2xl font-bold text-[#1a365d] mb-3">Innovation</h3>
                  <p className="text-gray-700 leading-relaxed">
                    We leverage the latest technology and market insights to serve you better.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className="inline-block mb-4">
                <span className="text-brand-secondary font-semibold text-sm uppercase tracking-wider">Meet The Team</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#1a365d] mb-6">Our Team</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-8 max-w-3xl">
                Our team of experienced real estate professionals is dedicated to providing
                you with personalized service and expert guidance. Each member brings unique
                expertise and a passion for helping clients achieve their real estate goals.
              </p>
              <div className="bg-gradient-to-r from-brand-secondary to-brand-secondary-light text-gray-800 p-10 rounded-2xl text-center shadow-xl">
                <p className="text-2xl font-bold mb-3">Ready to work with us?</p>
                <p className="text-lg mb-6 opacity-90">Let's find your perfect property together!</p>
                <a
                  href="/contact"
                  className="inline-block bg-brand-primary text-white px-10 py-4 rounded-lg font-bold hover:bg-brand-primary-light transition shadow-lg hover:shadow-xl"
                >
                  Get in Touch
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

