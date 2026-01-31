'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

// NavLink Component with hover effects
function NavLink({ href, pathname, children }: { href: string; pathname: string; children: React.ReactNode }) {
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`
        relative flex items-center transition-all duration-300
        ${isActive
          ? 'font-bold'
          : 'font-medium text-gray-200 hover:text-brand-secondary' // Light text for dark navbar
        }
        group
      `}
    >
      <span className={`
        relative inline-block transition-all duration-300
        ${isActive
          ? 'text-brand-secondary' // Solid Gold
          : 'group-hover:text-brand-secondary' // Solid Gold hover
        }
      `}>
        {children}
      </span>
      <span className={`
        ml-1 text-xs text-brand-secondary inline-block origin-center transition-all duration-300
        ${isActive
          ? 'scale-125'
          : 'group-hover:animate-spin-slow'
        }
      `}>
        +
      </span>
    </Link>
  );
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();
  const router = useRouter(); // Error: useRouter not imported

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/properties?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="bg-brand-primary/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-800">
      <nav className="container mx-auto px-6 py-4 max-w-7xl">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          {/* To adjust logo size: Change height and width values below (in pixels) */}
          <Link href="/" className="flex items-center hover:opacity-80 transition">
            <Image
              src="/gs_realty.png"
              alt="GS Realty Logo"
              width={250}
              height={250}
              className="h-20 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="/" pathname={pathname}>
              Home
            </NavLink>
            <NavLink href="/about" pathname={pathname}>
              About
            </NavLink>
            <NavLink href="/properties" pathname={pathname}>
              Projects
            </NavLink>
            <NavLink href="/dubai-projects" pathname={pathname}>
              Dubai Projects
            </NavLink>
            <NavLink href="/plots" pathname={pathname}>
              Plots
            </NavLink>
            <NavLink href="/blogs" pathname={pathname}>
              Blogs
            </NavLink>

            <NavLink href="/pages" pathname={pathname}>
              Services
            </NavLink>
            <NavLink href="/contact" pathname={pathname}>
              Contact
            </NavLink>
          </div>

          {/* Right Side Icons */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Slide-out Search */}
            <form
              onSubmit={handleSearch}
              className={`
                relative flex items-center bg-white/10 border-2 border-gray-700/50 rounded-lg overflow-hidden transition-all duration-500 ease-in-out
                ${isSearchOpen ? 'w-64 border-brand-secondary bg-white' : 'w-11 h-11'}
              `}
            >
              <button
                type="button"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`flex-shrink-0 w-10 h-10 flex items-center justify-center transition-colors ${isSearchOpen ? 'text-brand-primary' : 'text-gray-300 hover:text-brand-secondary'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <input
                type="text"
                placeholder="Search Location, Project, 2BHK..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onBlur={() => {
                  if (!searchQuery) setIsSearchOpen(false);
                }}
                className={`
                  flex-grow bg-transparent border-none outline-none text-brand-primary text-sm font-medium placeholder-gray-400 py-2 pr-4 transition-opacity duration-300
                  ${isSearchOpen ? 'opacity-100' : 'opacity-0 w-0'}
                `}
              />
            </form>

            <Link href="/accounts" className="w-11 h-11 bg-white/10 border-2 border-gray-700/50 rounded-lg flex items-center justify-center hover:border-brand-secondary hover:bg-brand-secondary/10 transition group">
              <svg className="w-5 h-5 text-gray-300 group-hover:text-brand-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-2 bg-brand-primary border-t border-gray-800 p-4 rounded-lg shadow-lg">
            <Link href="/" className="block py-2 text-gray-200 hover:text-brand-secondary transition">
              Home +
            </Link>
            <Link href="/about" className="block py-2 text-gray-200 hover:text-brand-secondary">
              About +
            </Link>
            <Link href="/properties" className="block py-2 text-gray-200 hover:text-brand-secondary">
              Projects +
            </Link>
            <Link href="/dubai-projects" className="block py-2 text-gray-200 hover:text-brand-secondary">
              Dubai Projects +
            </Link>
            <Link href="/plots" className="block py-2 text-gray-200 hover:text-brand-secondary">
              Plots +
            </Link>
            <Link href="/blogs" className="block py-2 text-gray-200 hover:text-brand-secondary">
              Blogs +
            </Link>

            <Link href="/pages" className="block py-2 text-gray-200 hover:text-brand-secondary">
              Services +
            </Link>
            <Link href="/contact" className="block py-2 text-gray-200 hover:text-brand-secondary">
              Contact +
            </Link>
            <Link href="/accounts" className="block py-2 text-brand-secondary font-bold border-t border-gray-800 mt-2 pt-2">
              My Account +
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
