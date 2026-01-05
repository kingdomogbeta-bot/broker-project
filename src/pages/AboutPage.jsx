import React from 'react';
import Card from '../components/Card';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">About Aurex Capital</h1>
          <p className="text-slate-400 text-lg max-w-3xl mx-auto">
            Pioneering financial innovation since 2018. We've been committed to democratizing access to global markets.
          </p>
        </div>

        {/* Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Our Story</h2>
            <p className="text-slate-400 mb-4">
              Founded in 2018, Aurex Capital was created with a simple mission: to make professional trading accessible to everyone with AI-powered tools and institutional-grade execution.
            </p>
            <p className="text-slate-400 mb-4">
              We started with a small team of passionate traders and developers who believed that technology could revolutionize how people invest and trade.
            </p>
            <p className="text-slate-400">
              Today, we serve over 500,000 traders worldwide, processing billions of dollars in daily volume across all major asset classes.
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-600/20 to-cyan-500/20 rounded-lg p-8 border border-slate-700">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-3xl">🌍</span>
                <div>
                  <p className="text-white font-semibold">Global Coverage</p>
                  <p className="text-slate-400 text-sm">Available in 150+ countries</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-3xl">💼</span>
                <div>
                  <p className="text-white font-semibold">Professional Team</p>
                  <p className="text-slate-400 text-sm">500+ dedicated staff members</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-3xl">🏆</span>
                <div>
                  <p className="text-white font-semibold">Award Winning</p>
                  <p className="text-slate-400 text-sm">30+ industry awards</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card
              icon="🤝"
              title="Integrity"
              description="We operate with the highest standards of transparency and ethical conduct."
            />
            <Card
              icon="🚀"
              title="Innovation"
              description="Continuous improvement and cutting-edge technology drive our platform."
              highlighted
            />
            <Card
              icon="👥"
              title="Community"
              description="We're building a global community of successful traders and investors."
            />
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-slate-800 rounded-lg border border-slate-700 p-12 text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">Our Achievements</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <p className="text-4xl font-bold text-cyan-400">500K+</p>
              <p className="text-slate-400 mt-2">Active Traders</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-cyan-400">$50B+</p>
              <p className="text-slate-400 mt-2">Daily Volume</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-cyan-400">150+</p>
              <p className="text-slate-400 mt-2">Countries</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-cyan-400">99.99%</p>
              <p className="text-slate-400 mt-2">Uptime</p>
            </div>
          </div>
        </div>

        {/* Team */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { name: 'John Smith', title: 'Founder & CEO', role: 'Vision & Strategy' },
              { name: 'Sarah Johnson', title: 'Chief Technology Officer', role: 'Technology' },
              { name: 'Michael Chen', title: 'Chief Financial Officer', role: 'Finance' },
              { name: 'Emily Rodriguez', title: 'Head of Operations', role: 'Operations' },
            ].map((member, idx) => (
              <div key={idx} className="bg-slate-800 rounded-lg border border-slate-700 p-6 text-center hover:border-slate-600 transition">
                <p className="text-white font-bold text-lg mb-1">{member.name}</p>
                <p className="text-cyan-400 font-semibold mb-2">{member.title}</p>
                <p className="text-slate-400 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
