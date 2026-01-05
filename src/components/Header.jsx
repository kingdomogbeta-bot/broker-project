import React, { useState } from 'react';

export default function Header({ isLoggedIn, onNavigate, currentPage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            onClick={() => onNavigate('home')}
            className="cursor-pointer flex items-center gap-2 group"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <defs>
                  <linearGradient id="g1" x1="0" x2="1">
                    <stop offset="0%" stopColor="#60A5FA" />
                    <stop offset="100%" stopColor="#06B6D4" />
                  </linearGradient>
                </defs>
                <rect x="3" y="3" width="18" height="18" rx="4" fill="url(#g1)" />
                <path d="M7 16L12 8L17 16" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text">
              Aurex Capital
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 items-center">
            <button
              onClick={() => onNavigate('home')}
              className={`transition-colors font-medium ${currentPage === 'home' ? 'text-blue-400' : 'text-slate-300 hover:text-white'}`}
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('markets')}
              className={`transition-colors font-medium ${currentPage === 'markets' ? 'text-blue-400' : 'text-slate-300 hover:text-white'}`}
            >
              Markets
            </button>
            <button
              onClick={() => onNavigate('about')}
              className={`transition-colors font-medium ${currentPage === 'about' ? 'text-blue-400' : 'text-slate-300 hover:text-white'}`}
            >
              About
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className={`transition-colors font-medium ${currentPage === 'contact' ? 'text-blue-400' : 'text-slate-300 hover:text-white'}`}
            >
              Contact
            </button>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex gap-4 items-center">
            {isLoggedIn ? (
              <>
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => onNavigate('logout')}
                  className="px-4 py-2 border border-slate-400 text-slate-300 hover:text-white hover:border-white rounded-lg font-medium transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => onNavigate('login')}
                  className="px-4 py-2 text-slate-300 hover:text-white font-medium transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => onNavigate('register')}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white rounded-lg font-medium transition-all"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-slate-300 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-700 py-4 space-y-2">
            <button onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded">Home</button>
            <button onClick={() => { onNavigate('markets'); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded">Markets</button>
            <button onClick={() => { onNavigate('about'); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded">About</button>
            <button onClick={() => { onNavigate('contact'); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded">Contact</button>
            <div className="border-t border-slate-700 pt-2 mt-2 space-y-2">
              {isLoggedIn ? (
                <>
                  <button onClick={() => { onNavigate('dashboard'); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-2 bg-blue-600 text-white rounded">Dashboard</button>
                  <button onClick={() => { onNavigate('logout'); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-slate-300 hover:text-white">Logout</button>
                </>
              ) : (
                <>
                  <button onClick={() => { onNavigate('login'); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-slate-300">Login</button>
                  <button onClick={() => { onNavigate('register'); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-2 bg-blue-600 text-white rounded">Sign Up</button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
