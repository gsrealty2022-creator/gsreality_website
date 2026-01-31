import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="bg-brand-primary text-white py-16">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
                    <div className="md:col-span-3">
                        <div className="mb-6">
                            {/* To adjust logo size: Change height and width values below (in pixels) */}
                            <div>
                                <Image
                                    src="/gs_realty.png"
                                    alt="GS Realty Logo"
                                    width={250}
                                    height={250}
                                    style={{ height: '80px', width: 'auto' }}
                                    className="object-contain"
                                />
                            </div>
                        </div>
                        <p className="text-gray-300 leading-relaxed mb-4">
                            Your trusted partner in finding the perfect property. Experience excellence with GS Realty.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 bg-brand-primary rounded-full flex items-center justify-center hover:bg-brand-primary-dark transition border border-gray-700">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </a>
                            <a href="#" className="w-10 h-10 bg-brand-secondary rounded-full flex items-center justify-center hover:bg-brand-secondary-dark transition">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.057-1.274-.07-1.649-.07-4.844 0-3.196.016-3.586.074-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0-2.163c-3.259 0-3.667.014-4.947.072-1.277.06-2.148.261-2.913.558-.788.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0z" />
                                    <path d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8z" />
                                    <path d="M18.406 4.154a1.44 1.44 0 100 2.88 1.440 1.44 0 000-2.88" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div className="md:col-span-3">
                        <h4 className="text-lg font-semibold mb-6 text-white whitespace-nowrap">Quick Links</h4>
                        <ul className="grid grid-cols-2 gap-x-8 gap-y-3">
                            <li>
                                <Link href="/" className="text-gray-300 hover:text-brand-secondary transition flex items-center group">
                                    <span className="w-0 group-hover:w-2 h-0.5 bg-brand-secondary mr-0 group-hover:mr-2 transition-all"></span>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-gray-300 hover:text-brand-secondary transition flex items-center group">
                                    <span className="w-0 group-hover:w-2 h-0.5 bg-brand-secondary mr-0 group-hover:mr-2 transition-all"></span>
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link href="/properties" className="text-gray-300 hover:text-brand-secondary transition flex items-center group">
                                    <span className="w-0 group-hover:w-2 h-0.5 bg-brand-secondary mr-0 group-hover:mr-2 transition-all"></span>
                                    Projects
                                </Link>
                            </li>
                            <li>
                                <Link href="/dubai-projects" className="text-gray-300 hover:text-brand-secondary transition flex items-center group">
                                    <span className="w-0 group-hover:w-2 h-0.5 bg-brand-secondary mr-0 group-hover:mr-2 transition-all"></span>
                                    Dubai Projects
                                </Link>
                            </li>
                            <li>
                                <Link href="/plots" className="text-gray-300 hover:text-brand-secondary transition flex items-center group">
                                    <span className="w-0 group-hover:w-2 h-0.5 bg-brand-secondary mr-0 group-hover:mr-2 transition-all"></span>
                                    Plots
                                </Link>
                            </li>
                            <li>
                                <Link href="/blogs" className="text-gray-300 hover:text-brand-secondary transition flex items-center group">
                                    <span className="w-0 group-hover:w-2 h-0.5 bg-brand-secondary mr-0 group-hover:mr-2 transition-all"></span>
                                    Blogs
                                </Link>
                            </li>
                            <li>
                                <Link href="/pages" className="text-gray-300 hover:text-brand-secondary transition flex items-center group">
                                    <span className="w-0 group-hover:w-2 h-0.5 bg-brand-secondary mr-0 group-hover:mr-2 transition-all"></span>
                                    Services
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-gray-300 hover:text-brand-secondary transition flex items-center group">
                                    <span className="w-0 group-hover:w-2 h-0.5 bg-brand-secondary mr-0 group-hover:mr-2 transition-all"></span>
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="md:col-span-2">
                        <h4 className="text-lg font-semibold mb-6 text-white">Services</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/properties" className="text-gray-300 hover:text-brand-secondary transition flex items-center group">
                                    <span className="w-0 group-hover:w-2 h-0.5 bg-brand-secondary mr-0 group-hover:mr-2 transition-all"></span>
                                    Property Buying
                                </Link>
                            </li>
                            <li>
                                <Link href="/plots" className="text-gray-300 hover:text-brand-secondary transition flex items-center group">
                                    <span className="w-0 group-hover:w-2 h-0.5 bg-brand-secondary mr-0 group-hover:mr-2 transition-all"></span>
                                    Plot Buying
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-gray-300 hover:text-brand-secondary transition flex items-center group">
                                    <span className="w-0 group-hover:w-2 h-0.5 bg-brand-secondary mr-0 group-hover:mr-2 transition-all"></span>
                                    Property Selling
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-gray-300 hover:text-brand-secondary transition flex items-center group">
                                    <span className="w-0 group-hover:w-2 h-0.5 bg-brand-secondary mr-0 group-hover:mr-2 transition-all"></span>
                                    Property Management
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-gray-300 hover:text-brand-secondary transition flex items-center group">
                                    <span className="w-0 group-hover:w-2 h-0.5 bg-brand-secondary mr-0 group-hover:mr-2 transition-all"></span>
                                    Property Valuation
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-gray-300 hover:text-brand-secondary transition flex items-center group">
                                    <span className="w-0 group-hover:w-2 h-0.5 bg-brand-secondary mr-0 group-hover:mr-2 transition-all"></span>
                                    Investment Consulting
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="md:col-span-4">
                        <h4 className="text-lg font-semibold mb-6 text-white whitespace-nowrap">Contact Info</h4>
                        <ul className="space-y-4 text-gray-300">
                            <li className="flex items-start">
                                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mr-4 mt-1 flex-shrink-0 group-hover:bg-brand-secondary transition-colors">
                                    <svg className="w-5 h-5 text-brand-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <span className="text-xs text-gray-400 block uppercase tracking-wider mb-1 font-bold">Email Us</span>
                                    <a href="mailto:gsrealty2022@gmail.com" className="hover:text-brand-secondary transition-colors font-semibold">gsrealty2022@gmail.com</a>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                                    <svg className="w-5 h-5 text-brand-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div>
                                    <span className="text-xs text-gray-400 block uppercase tracking-wider mb-1 font-bold">Call Now</span>
                                    <a href="tel:+919920355513" className="hover:text-brand-secondary transition-colors font-semibold">+91 9920355513</a>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                                    <svg className="w-5 h-5 text-brand-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <span className="text-xs text-gray-400 block uppercase tracking-wider mb-1 font-bold">Office Address</span>
                                    <span className="font-semibold block leading-snug">
                                        Office No. 9&10, Ace CHS, Plot no.58,<br />
                                        Sector -11, Kharghar, Navi Mumbai<br />
                                        Maharashtra - 410210
                                    </span>
                                </div>
                            </li>
                            <li className="flex items-start pt-4 border-t border-gray-700 mt-2">
                                <div className="bg-brand-secondary/20 border border-brand-secondary/30 px-4 py-2 rounded-xl flex items-center">
                                    <svg className="w-4 h-4 text-brand-secondary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                    <span className="text-xs font-black text-brand-secondary tracking-wider">RERA: A51700044481</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-600 mt-12 pt-8 text-center flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-300">&copy; 2026 GS Realty. All rights reserved. | <span className="text-brand-secondary italic">Excellence in Real Estate</span></p>
                    <p className="text-gray-400 text-sm italic">
                        Powered by <a href="https://pranaviinfotech.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-secondary transition-colors">Pranavi Infotech</a>
                    </p>
                </div>
            </div>
        </footer>
    );
}

