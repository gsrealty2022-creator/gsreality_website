'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

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
          : 'font-medium text-gray-700'
        }
        group
      `}
    >
      <span className={`
        relative inline-block transition-all duration-300
        ${isActive 
          ? 'bg-gradient-to-r from-brand-red via-brand-teal to-brand-red bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient' 
          : 'group-hover:bg-gradient-to-r group-hover:from-brand-red group-hover:via-brand-teal group-hover:to-brand-red group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-[length:200%_100%] group-hover:animate-gradient'
        }
      `}>
        {children}
      </span>
      <span className={`
        ml-1 text-xs text-brand-teal inline-block origin-center transition-all duration-300
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
  const pathname = usePathname();

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <nav className="container mx-auto px-6 py-4 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          {/* To adjust logo size: Change height and width values below (in pixels) */}
          <Link href="/" className="flex items-center hover:opacity-80 transition">
            <Image
              src="/fd_makan_logo-removebg-preview.png"
              alt="FD MAKAN Logo"
              width={300}
              height={300}
              style={{ height: '96px', width: '96px' }}
              className="object-contain"
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
              Property
            </NavLink>
            <NavLink href="/news" pathname={pathname}>
              News
            </NavLink>
            <NavLink href="/pages" pathname={pathname}>
              Pages
            </NavLink>
            <Link href="/contact" className={`text-gray-700 hover:text-brand-red transition font-medium ${pathname === '/contact' ? 'font-bold' : ''}`}>
              Contact
            </Link>
          </div>

          {/* Right Side Icons */}
          <div className="hidden md:flex items-center space-x-3">
            <button className="w-11 h-11 bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center hover:border-brand-red hover:bg-brand-red/10 transition group">
              <svg className="w-5 h-5 text-gray-600 group-hover:text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="w-11 h-11 bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center hover:border-brand-red hover:bg-brand-red/10 transition group">
              <svg className="w-5 h-5 text-gray-600 group-hover:text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
            <button className="w-11 h-11 bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center hover:border-orange-500 hover:bg-orange-50 transition relative group">
              <svg className="w-5 h-5 text-gray-600 group-hover:text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-brand-red text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg">2</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
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
          <div className="md:hidden mt-4 space-y-2">
            <Link href="/" className="block py-2 text-gray-700 hover:text-brand-red transition">
              Home +
            </Link>
            <Link href="/about" className="block py-2 text-gray-700 hover:text-orange-500">
              About +
            </Link>
            <Link href="/properties" className="block py-2 text-gray-700 hover:text-orange-500">
              Property +
            </Link>
            <Link href="/news" className="block py-2 text-gray-700 hover:text-orange-500">
              News +
            </Link>
            <Link href="/pages" className="block py-2 text-gray-700 hover:text-orange-500">
              Pages +
            </Link>
            <Link href="/contact" className="block py-2 text-gray-700 hover:text-orange-500">
              Contact
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}

