import React from 'react';
import { Shield, Lock, Award, CheckCircle } from 'lucide-react';

const SecurityCompliance = () => {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-gray-800 via-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Security & Compliance
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Your safety is our priority. Bank-level security protecting your account and funds.
          </p>
        </div>

        {/* Security Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            { icon: <Lock className="w-8 h-8" />, title: 'SSL/TLS Encryption', desc: 'Military-grade encryption for all data transmission' },
            { icon: <Shield className="w-8 h-8" />, title: '2-Factor Auth', desc: 'Multi-layer authentication to protect your account' },
            { icon: <Award className="w-8 h-8" />, title: 'Fund Segregation', desc: 'Client funds kept separate from operating funds' },
            { icon: <CheckCircle className="w-8 h-8" />, title: 'Daily Backups', desc: '24/7 automated security monitoring & backups' },
          ].map((feature, idx) => (
            <div
              key={idx}
              data-aos="fade-up"
              data-aos-delay={idx * 100}
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-cyan-500/50 transition-all group"
            >
              <div className="text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-300 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Compliance Badges */}
        <div className="mb-16" data-aos="fade-up">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Regulatory Certifications</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'FCA Regulated', desc: 'Financial Conduct Authority (UK)', badge: '🇬🇧' },
              { name: 'CFTC Compliant', desc: 'Commodity Futures Trading Commission (USA)', badge: '🇺🇸' },
              { name: 'ISO 27001', desc: 'International Information Security Standard', badge: '🔒' },
            ].map((cert, idx) => (
              <div
                key={idx}
                data-aos="zoom-in"
                data-aos-delay={idx * 100}
                className="backdrop-blur-xl bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-2xl p-8 text-center hover:border-green-400 transition-all"
              >
                <div className="text-5xl mb-4">{cert.badge}</div>
                <h4 className="text-white font-bold text-lg mb-2">{cert.name}</h4>
                <p className="text-gray-300 text-sm">{cert.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Guarantees */}
        <div className="grid md:grid-cols-2 gap-8" data-aos="fade-up">
          {[
            {
              title: '100% Fund Safety',
              items: ['Client funds segregated', 'Crypto cold storage', 'Insurance coverage up to $500K', 'Regular audits']
            },
            {
              title: 'Privacy & Data Protection',
              items: ['GDPR compliant', 'No data selling', 'End-to-end encryption', 'Transparent privacy policy']
            }
          ].map((section, idx) => (
            <div
              key={idx}
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-blue-500/50 transition-all"
            >
              <h3 className="text-white font-bold text-xl mb-6">{section.title}</h3>
              <ul className="space-y-3">
                {section.items.map((item, iIdx) => (
                  <li key={iIdx} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-200">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecurityCompliance;
