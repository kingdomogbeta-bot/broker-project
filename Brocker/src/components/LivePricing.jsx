import React, { useState, useEffect } from 'react';

const LivePricing = () => {
  const [prices, setPrices] = useState([
    { symbol: 'AAPL', name: 'Apple Inc.', price: 186.23, change: 2.5, high: 189.45, low: 182.15, volume: '58.3M' },
    { symbol: 'BTC/USD', name: 'Bitcoin', price: 42350, change: 5.2, high: 43250, low: 41200, volume: '24.5K' },
    { symbol: 'EURUSD', name: 'Euro/USD', price: 1.0842, change: -1.3, high: 1.0920, low: 1.0750, volume: '156.8M' },
    { symbol: 'GOLD', name: 'Gold Spot', price: 2045.50, change: 3.1, high: 2089.00, low: 1998.20, volume: '3.2M' },
    { symbol: 'MSFT', name: 'Microsoft', price: 416.85, change: 1.8, high: 420.15, low: 408.92, volume: '22.1M' },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: 238.45, change: 4.2, high: 245.20, low: 232.80, volume: '142.5M' },
  ]);

  // Simulate live price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPrices((prevPrices) =>
        prevPrices.map((item) => ({
          ...item,
          price:
            item.price +
            (Math.random() - 0.5) * (item.price * 0.02),
          change: item.change + (Math.random() - 0.5) * 0.5,
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Live Market Prices
          </h2>
          <p className="text-slate-400">
            Real-time pricing data updated every second
          </p>
        </div>

        {/* Pricing Table */}
        <div className="overflow-x-auto bg-slate-900 rounded-lg border border-slate-800">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-800/50">
                <th className="px-6 py-4 text-left text-slate-300 font-semibold">Symbol</th>
                <th className="px-6 py-4 text-right text-slate-300 font-semibold">Price</th>
                <th className="px-6 py-4 text-right text-slate-300 font-semibold">24h Change</th>
                <th className="px-6 py-4 text-right text-slate-300 font-semibold">High</th>
                <th className="px-6 py-4 text-right text-slate-300 font-semibold">Low</th>
                <th className="px-6 py-4 text-right text-slate-300 font-semibold">Volume</th>
                <th className="px-6 py-4 text-center text-slate-300 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {prices.map((item) => (
                <tr
                  key={item.symbol}
                  className="border-b border-slate-800 hover:bg-slate-800/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-white font-bold">{item.symbol}</p>
                      <p className="text-slate-400 text-sm">{item.name}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="text-white font-semibold text-lg">
                      {item.symbol.includes('/')
                        ? item.price.toFixed(4)
                        : item.symbol === 'BTC/USD'
                        ? `$${item.price.toLocaleString()}`
                        : `$${item.price.toFixed(2)}`}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        item.change >= 0
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {item.change >= 0 ? '+' : ''}{item.change.toFixed(2)}%
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-slate-300">
                    {item.symbol.includes('/')
                      ? item.high.toFixed(4)
                      : `$${item.high.toLocaleString()}`}
                  </td>
                  <td className="px-6 py-4 text-right text-slate-300">
                    {item.symbol.includes('/')
                      ? item.low.toFixed(4)
                      : `$${item.low.toLocaleString()}`}
                  </td>
                  <td className="px-6 py-4 text-right text-slate-300">
                    {item.volume}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg text-sm font-medium transition">
                      Trade
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Disclaimer */}
        <p className="text-slate-400 text-xs mt-4 text-center">
          Prices are delayed by 15 minutes for demonstration purposes
        </p>
      </div>
    </section>
  );
};

export default LivePricing;
