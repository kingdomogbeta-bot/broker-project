import React from 'react';
import Card from '../components/Card';
import MarketChart from '../components/MarketChart';
import TrustSection from '../components/TrustSection';
import LivePricing from '../components/LivePricing';
import MarketFeed from '../components/MarketFeed';
import AISignals from '../components/AISignals';
import Testimonials from '../components/Testimonials';
import Newsletter from '../components/Newsletter';
import Plans from '../components/Plans';
import ComparisonTool from '../components/ComparisonTool';
import SecurityCompliance from '../components/SecurityCompliance';
import EducationHub from '../components/EducationHub';
import AdvancedSocialProof from '../components/AdvancedSocialProof';
import TradingSimulator from '../components/TradingSimulator';
import ReferralEngagement from '../components/ReferralEngagement';
import PerformanceStats from '../components/PerformanceStats';

const mockMarkets = [
  { symbol: 'AAPL', price: '$186.23', change: 2.5, chartData: [100, 105, 102, 108, 115, 112, 120] },
  { symbol: 'BTC/USD', price: '$42,350', change: 5.2, chartData: [95, 98, 102, 110, 105, 115, 125] },
  { symbol: 'EURUSD', price: '1.0842', change: -1.3, chartData: [110, 105, 100, 98, 95, 100, 98] },
  { symbol: 'GOLD', price: '$2,045.50', change: 3.1, chartData: [90, 95, 98, 105, 110, 115, 120] },
];

export default function HomePage({ onNavigate }) {
  return (
    <div className="bg-slate-950 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-500/10 blur-3xl" />
        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div data-aos="fade-right">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Trade <span className="text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text">Smarter</span>, Earn <span className="text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text">Better</span>
              </h1>
              <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                Access global markets with zero-commission trading, advanced charting tools, and 24/7 support. Join thousands of successful traders today.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => onNavigate('register')}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
                >
                  Get Started Free →
                </button>
                <button className="px-8 py-3 border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 rounded-lg font-semibold transition-all">
                  Watch Demo
                </button>
              </div>

              <div className="flex items-center gap-6 mt-12 pt-8 border-t border-slate-700">
                <div>
                  <p className="text-slate-400 text-sm">Trusted by</p>
                  <p className="text-white font-bold text-xl">500K+ Traders</p>
                </div>
                <div className="h-12 w-px bg-slate-700" />
                <div>
                  <p className="text-slate-400 text-sm">Daily Volume</p>
                  <p className="text-white font-bold text-xl">$50B+</p>
                </div>
                <div className="h-12 w-px bg-slate-700" />
                <div>
                  <p className="text-slate-400 text-sm">Est. Since</p>
                  <p className="text-white font-bold text-xl">2018</p>
                </div>
              </div>
            </div>

            {/* Right Illustration */}
            <div className="relative" data-aos="fade-left">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-2xl blur-2xl opacity-20" />
              <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700">
                <div className="space-y-4">
                  {mockMarkets.slice(0, 2).map((market, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                      <span className="text-white font-semibold">{market.symbol}</span>
                      <span className={`text-sm font-bold ${market.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {market.change >= 0 ? '+' : ''}{market.change}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Overview */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12" data-aos="fade-up">
            <h2 className="text-3xl font-bold text-white mb-2">Live Markets</h2>
            <p className="text-slate-400">Real-time data from global financial markets</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockMarkets.map((market, idx) => (
                  <div key={idx} data-aos="fade-up" data-aos-delay={idx * 100}>
                    <MarketChart
                      symbol={market.symbol}
                      price={market.price}
                      change={market.change}
                      chartData={market.chartData}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-1 space-y-4">
              <MarketFeed />
              <AISignals />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose Aurex Capital?</h2>
            <p className="text-slate-400 text-lg">Everything you need to trade like a professional</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div data-aos="fade-up" data-aos-delay="0">
              <Card
                icon="⚡"
                title="Lightning Fast"
                description="Execute trades in milliseconds with our high-performance infrastructure"
                features={['Sub-millisecond latency', 'Global servers', 'Uptime guarantee']}
                cta="Learn More"
              />
            </div>
            <div data-aos="fade-up" data-aos-delay="100">
              <Card
                icon="🛡️"
                title="Secure & Regulated"
                description="Your funds are protected with enterprise-grade security"
                features={['SSL/TLS encryption', 'Fund segregation', 'Regulatory compliance']}
                cta="Learn More"
                highlighted
              />
            </div>
            <div data-aos="fade-up" data-aos-delay="200">
              <Card
                icon="📊"
                title="Advanced Tools"
                description="Professional-grade charting and analysis tools included"
                features={['250+ indicators', 'Custom alerts', 'Multi-chart analysis']}
                cta="Learn More"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Plans Section - Full Professional Pricing */}
      <Plans />

      {/* Trading Simulator */}
      <TradingSimulator />

      {/* Advanced Social Proof */}
      <AdvancedSocialProof />

      {/* Comparison Tool */}
      <ComparisonTool />

      {/* Education Hub */}
      <EducationHub />

      {/* Security & Compliance */}
      <SecurityCompliance />

      {/* Performance Stats */}
      <PerformanceStats />

      {/* Referral & Engagement */}
      <ReferralEngagement />

      {/* Live Pricing */}
      <div data-aos="fade-up">
        <LivePricing />
      </div>

      {/* Trust Section */}
      <div data-aos="fade-up">
        <TrustSection />
      </div>

      {/* Testimonials */}
      <div data-aos="fade-up">
        <Testimonials />
      </div>

      {/* Newsletter */}
      <div data-aos="fade-up">
        <Newsletter />
      </div>
      <div data-aos="fade-up">
        <Newsletter />
      </div>
    </div>
  );
}
