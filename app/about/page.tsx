import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-500 to-orange-500 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">About FD MAKAN</h1>
            <p className="text-xl text-white/90">
              Your Trusted Partner in Real Estate Excellence
            </p>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="mb-16">
              <div className="inline-block mb-4">
                <span className="text-teal-500 font-semibold text-sm uppercase tracking-wider">About Us</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#1a365d] mb-6">Our Story</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <p className="text-lg text-gray-700 leading-relaxed">
                  FD MAKAN has been a leading name in the real estate industry, dedicated to helping 
                  individuals and families find their perfect homes and investment opportunities. 
                  With years of experience and a commitment to excellence, we have built a reputation 
                  for integrity, professionalism, and outstanding customer service.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Our mission is to "Seal The Deal" by providing exceptional real estate services 
                  that exceed expectations. We understand that buying or selling property is one of 
                  life's most significant decisions, and we're here to guide you through every step 
                  of the process.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="text-center p-8 bg-white rounded-xl shadow-lg border-t-4 border-teal-500 hover:shadow-2xl transition-all">
                <div className="text-5xl font-bold text-teal-500 mb-3">500+</div>
                <div className="text-gray-700 font-semibold text-lg">Properties Sold</div>
              </div>
              <div className="text-center p-8 bg-white rounded-xl shadow-lg border-t-4 border-orange-500 hover:shadow-2xl transition-all">
                <div className="text-5xl font-bold text-orange-500 mb-3">1000+</div>
                <div className="text-gray-700 font-semibold text-lg">Happy Clients</div>
              </div>
              <div className="text-center p-8 bg-white rounded-xl shadow-lg border-t-4 border-teal-500 hover:shadow-2xl transition-all">
                <div className="text-5xl font-bold text-[#1a365d] mb-3">15+</div>
                <div className="text-gray-700 font-semibold text-lg">Years Experience</div>
              </div>
            </div>

            <div className="mb-16">
              <div className="inline-block mb-4">
                <span className="text-orange-500 font-semibold text-sm uppercase tracking-wider">Our Foundation</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#1a365d] mb-10">Our Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-8 border-l-4 border-teal-500 bg-white rounded-r-xl shadow-lg hover:shadow-xl transition-all">
                  <h3 className="text-2xl font-bold text-[#1a365d] mb-3">Integrity</h3>
                  <p className="text-gray-700 leading-relaxed">
                    We conduct all our business with the highest ethical standards and transparency.
                  </p>
                </div>
                <div className="p-8 border-l-4 border-orange-500 bg-white rounded-r-xl shadow-lg hover:shadow-xl transition-all">
                  <h3 className="text-2xl font-bold text-[#1a365d] mb-3">Excellence</h3>
                  <p className="text-gray-700 leading-relaxed">
                    We strive for excellence in every transaction and interaction with our clients.
                  </p>
                </div>
                <div className="p-8 border-l-4 border-teal-500 bg-white rounded-r-xl shadow-lg hover:shadow-xl transition-all">
                  <h3 className="text-2xl font-bold text-[#1a365d] mb-3">Customer Focus</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Your satisfaction is our top priority. We listen, understand, and deliver.
                  </p>
                </div>
                <div className="p-8 border-l-4 border-orange-500 bg-white rounded-r-xl shadow-lg hover:shadow-xl transition-all">
                  <h3 className="text-2xl font-bold text-[#1a365d] mb-3">Innovation</h3>
                  <p className="text-gray-700 leading-relaxed">
                    We leverage the latest technology and market insights to serve you better.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className="inline-block mb-4">
                <span className="text-teal-500 font-semibold text-sm uppercase tracking-wider">Meet The Team</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#1a365d] mb-6">Our Team</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-8 max-w-3xl">
                Our team of experienced real estate professionals is dedicated to providing 
                you with personalized service and expert guidance. Each member brings unique 
                expertise and a passion for helping clients achieve their real estate goals.
              </p>
              <div className="bg-gradient-to-r from-teal-500 to-orange-500 text-white p-10 rounded-2xl text-center shadow-xl">
                <p className="text-2xl font-bold mb-3">Ready to work with us?</p>
                <p className="text-lg mb-6 opacity-90">Let's seal the deal together!</p>
                <a 
                  href="/contact" 
                  className="inline-block bg-white text-orange-500 px-10 py-4 rounded-lg font-bold hover:bg-gray-100 transition shadow-lg hover:shadow-xl"
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

