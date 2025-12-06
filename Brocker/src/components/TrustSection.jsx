import React from 'react';

const TrustSection = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-slate-400 text-lg">
            We maintain the highest standards of security and compliance
          </p>
        </div>

        {/* Trust Badges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* SSL Certificate */}
          <div className="bg-slate-800 hover:bg-slate-700 p-6 rounded-lg text-center transition-all border border-slate-700 hover:border-cyan-500">
            <div className="w-12 h-12 mx-auto mb-4 bg-green-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414L10 3.586l4.707 4.707a1 1 0 01-1.414 1.414L10 6.414l-3.293 3.293a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-white font-bold mb-2">SSL Encrypted</h3>
            <p className="text-slate-400 text-sm">256-bit SSL security for all transactions</p>
          </div>

          {/* FCA Regulated */}
          <div className="bg-slate-800 hover:bg-slate-700 p-6 rounded-lg text-center transition-all border border-slate-700 hover:border-cyan-500">
            <div className="w-12 h-12 mx-auto mb-4 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
            </div>
            <h3 className="text-white font-bold mb-2">Regulated</h3>
            <p className="text-slate-400 text-sm">FCA & CIMA regulated broker</p>
          </div>

          {/* Fund Protection */}
          <div className="bg-slate-800 hover:bg-slate-700 p-6 rounded-lg text-center transition-all border border-slate-700 hover:border-cyan-500">
            <div className="w-12 h-12 mx-auto mb-4 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-white font-bold mb-2">Fund Protected</h3>
            <p className="text-slate-400 text-sm">Up to $500K FSCS protection</p>
          </div>

          {/* ISO Certified */}
          <div className="bg-slate-800 hover:bg-slate-700 p-6 rounded-lg text-center transition-all border border-slate-700 hover:border-cyan-500">
            <div className="w-12 h-12 mx-auto mb-4 bg-orange-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 1 1 0 000 2h1a1 1 0 000-2h-1a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2h-1a1 1 0 000 2h1a1 1 0 110 2H4a1 1 0 110-2h1a2 2 0 012-2zm0 4a1 1 0 000 2h12a1 1 0 100-2H4z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-white font-bold mb-2">ISO 27001</h3>
            <p className="text-slate-400 text-sm">Information security certified</p>
          </div>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-slate-800 rounded-xl p-8 border border-slate-700">
          <div className="text-center">
            <p className="text-3xl sm:text-4xl font-bold text-cyan-400 mb-2">15+</p>
            <p className="text-slate-300">Years in Business</p>
          </div>
          <div className="text-center">
            <p className="text-3xl sm:text-4xl font-bold text-cyan-400 mb-2">2M+</p>
            <p className="text-slate-300">Active Users</p>
          </div>
          <div className="text-center">
            <p className="text-3xl sm:text-4xl font-bold text-cyan-400 mb-2">$100B+</p>
            <p className="text-slate-300">Monthly Volume</p>
          </div>
          <div className="text-center">
            <p className="text-3xl sm:text-4xl font-bold text-cyan-400 mb-2">99.9%</p>
            <p className="text-slate-300">Uptime SLA</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
