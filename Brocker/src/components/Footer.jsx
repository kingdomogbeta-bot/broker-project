import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company */}
          <div>
            <h3 className="text-white font-bold mb-4">BrokerHub</h3>
            <p className="text-slate-400 text-sm">
              Leading financial brokerage platform for global trading and investment management.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-400 hover:text-blue-400 text-sm transition">Markets</a></li>
              <li><a href="#" className="text-slate-400 hover:text-blue-400 text-sm transition">Trading Tools</a></li>
              <li><a href="#" className="text-slate-400 hover:text-blue-400 text-sm transition">Research</a></li>
              <li><a href="#" className="text-slate-400 hover:text-blue-400 text-sm transition">Education</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-400 hover:text-blue-400 text-sm transition">Terms of Service</a></li>
              <li><a href="#" className="text-slate-400 hover:text-blue-400 text-sm transition">Privacy Policy</a></li>
              <li><a href="#" className="text-slate-400 hover:text-blue-400 text-sm transition">Risk Disclosure</a></li>
              <li><a href="#" className="text-slate-400 hover:text-blue-400 text-sm transition">Cookie Policy</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>📧 support@brokerhub.com</li>
              <li>📞 +1 (800) 123-4567</li>
              <li>📍 123 Financial St, NY 10001</li>
              <li className="flex gap-4 pt-2">
                <a href="#" className="hover:text-blue-400 transition">Twitter</a>
                <a href="#" className="hover:text-blue-400 transition">LinkedIn</a>
                <a href="#" className="hover:text-blue-400 transition">Facebook</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">
              © 2024 BrokerHub. All rights reserved.
            </p>
            <p className="text-slate-500 text-xs mt-4 md:mt-0">
              Disclaimer: Trading and investing involve substantial risk. Past performance is not indicative of future results.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
