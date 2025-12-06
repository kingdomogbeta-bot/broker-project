import React, { useState } from 'react';
import MarketChart from '../components/MarketChart';

const marketsData = [
  { symbol: 'AAPL', price: '$186.23', change: 2.5, chartData: [100, 105, 102, 108, 115, 112, 120], category: 'Stocks' },
  { symbol: 'BTC/USD', price: '$42,350', change: 5.2, chartData: [95, 98, 102, 110, 105, 115, 125], category: 'Crypto' },
  { symbol: 'EURUSD', price: '1.0842', change: -1.3, chartData: [110, 105, 100, 98, 95, 100, 98], category: 'Forex' },
  { symbol: 'GOLD', price: '$2,045.50', change: 3.1, chartData: [90, 95, 98, 105, 110, 115, 120], category: 'Commodities' },
  { symbol: 'NFLX', price: '$287.45', change: 4.8, chartData: [85, 90, 95, 100, 108, 115, 125], category: 'Stocks' },
  { symbol: 'TSLA', price: '$242.18', change: -2.1, chartData: [105, 110, 100, 95, 90, 88, 85], category: 'Stocks' },
  { symbol: 'SPY', price: '$468.92', change: 1.7, chartData: [90, 95, 100, 105, 110, 112, 115], category: 'ETFs' },
  { symbol: 'GBP/USD', price: '1.2743', change: 0.8, chartData: [98, 100, 102, 105, 103, 105, 110], category: 'Forex' },
];

export default function MarketsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'Stocks', 'Crypto', 'Forex', 'Commodities', 'ETFs'];
  
  const filteredMarkets = selectedCategory === 'All' 
    ? marketsData 
    : marketsData.filter(m => m.category === selectedCategory);

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Global Markets</h1>
          <p className="text-slate-400 text-lg">Real-time market data from around the world</p>
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Markets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMarkets.map((market, idx) => (
            <MarketChart
              key={idx}
              symbol={market.symbol}
              price={market.price}
              change={market.change}
              chartData={market.chartData}
            />
          ))}
        </div>

        {/* Market Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-800 rounded-lg border border-slate-700 p-6 text-center">
            <p className="text-slate-400 mb-2">Daily Volume</p>
            <p className="text-3xl font-bold text-white">$50B+</p>
          </div>
          <div className="bg-slate-800 rounded-lg border border-slate-700 p-6 text-center">
            <p className="text-slate-400 mb-2">Instruments</p>
            <p className="text-3xl font-bold text-white">5000+</p>
          </div>
          <div className="bg-slate-800 rounded-lg border border-slate-700 p-6 text-center">
            <p className="text-slate-400 mb-2">Uptime</p>
            <p className="text-3xl font-bold text-white">99.99%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
