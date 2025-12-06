import React, { useState } from 'react';
import StatCard from '../components/StatCard';
import MarketChart from '../components/MarketChart';

const mockPortfolio = {
  balance: 125000,
  balanceChange: 2.5,
  invested: 87500,
  availableFunds: 37500,
  monthlyReturn: 15250,
  monthlyReturnPercent: 2.1,
};

const mockPositions = [
  { id: 1, symbol: 'AAPL', quantity: 50, entryPrice: 150.00, currentPrice: 186.23, profit: 1811.5, percentChange: 24.15 },
  { id: 2, symbol: 'BTC/USD', quantity: 0.5, entryPrice: 35000, currentPrice: 42350, profit: 3675.0, percentChange: 20.98 },
  { id: 3, symbol: 'EURUSD', quantity: 100000, entryPrice: 1.1000, currentPrice: 1.0842, profit: -1580.0, percentChange: -1.44 },
  { id: 4, symbol: 'TSLA', quantity: 25, entryPrice: 247.50, currentPrice: 242.18, profit: -132.5, percentChange: -2.15 },
];

const mockMarkets = [
  { symbol: 'AAPL', price: '$186.23', change: 2.5, chartData: [100, 105, 102, 108, 115, 112, 120] },
  { symbol: 'BTC/USD', price: '$42,350', change: 5.2, chartData: [95, 98, 102, 110, 105, 115, 125] },
  { symbol: 'EURUSD', price: '1.0842', change: -1.3, chartData: [110, 105, 100, 98, 95, 100, 98] },
  { symbol: 'GOLD', price: '$2,045.50', change: 3.1, chartData: [90, 95, 98, 105, 110, 115, 120] },
];

export default function Dashboard() {
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [showTradeModal, setShowTradeModal] = useState(false);
  const [tradeData, setTradeData] = useState({ symbol: '', quantity: '', price: '', type: 'buy' });

  return (
    <div className="min-h-screen bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Trading Dashboard</h1>
          <p className="text-slate-400">Manage your portfolio and execute trades</p>
        </div>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            label="Account Balance"
            value={`$${mockPortfolio.balance.toLocaleString()}`}
            change={mockPortfolio.balanceChange}
            icon="💰"
            color="blue"
          />
          <StatCard
            label="Invested Amount"
            value={`$${mockPortfolio.invested.toLocaleString()}`}
            change={1.2}
            icon="📈"
            color="green"
          />
          <StatCard
            label="Available Funds"
            value={`$${mockPortfolio.availableFunds.toLocaleString()}`}
            change={0.0}
            icon="💵"
            color="purple"
          />
          <StatCard
            label="Monthly Return"
            value={`$${mockPortfolio.monthlyReturn.toLocaleString()}`}
            change={mockPortfolio.monthlyReturnPercent}
            icon="🎯"
            color="orange"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Positions & Trading */}
          <div className="lg:col-span-2 space-y-8">
            {/* Active Positions */}
            <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Open Positions</h2>
                <button
                  onClick={() => setShowTradeModal(true)}
                  className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-medium transition"
                >
                  + New Trade
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 px-4 text-slate-400 font-medium text-sm">Symbol</th>
                      <th className="text-right py-3 px-4 text-slate-400 font-medium text-sm">Qty</th>
                      <th className="text-right py-3 px-4 text-slate-400 font-medium text-sm">Entry</th>
                      <th className="text-right py-3 px-4 text-slate-400 font-medium text-sm">Current</th>
                      <th className="text-right py-3 px-4 text-slate-400 font-medium text-sm">P&L</th>
                      <th className="text-right py-3 px-4 text-slate-400 font-medium text-sm">Return</th>
                      <th className="text-center py-3 px-4 text-slate-400 font-medium text-sm">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockPositions.map((pos) => (
                      <tr
                        key={pos.id}
                        onClick={() => setSelectedPosition(pos)}
                        className="border-b border-slate-700 hover:bg-slate-700/50 cursor-pointer transition"
                      >
                        <td className="py-4 px-4">
                          <span className="font-semibold text-white">{pos.symbol}</span>
                        </td>
                        <td className="py-4 px-4 text-right text-slate-300">{pos.quantity}</td>
                        <td className="py-4 px-4 text-right text-slate-300">${pos.entryPrice.toFixed(2)}</td>
                        <td className="py-4 px-4 text-right text-slate-300">${pos.currentPrice.toFixed(2)}</td>
                        <td className={`py-4 px-4 text-right font-semibold ${pos.profit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          ${pos.profit.toFixed(2)}
                        </td>
                        <td className={`py-4 px-4 text-right font-semibold ${pos.percentChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {pos.percentChange >= 0 ? '+' : ''}{pos.percentChange.toFixed(2)}%
                        </td>
                        <td className="py-4 px-4 text-center">
                          <button className="text-cyan-400 hover:text-cyan-300 text-sm font-medium">Close</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Market Overview */}
            <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
              <h2 className="text-xl font-bold text-white mb-6">Market Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockMarkets.map((market, idx) => (
                  <MarketChart
                    key={idx}
                    symbol={market.symbol}
                    price={market.price}
                    change={market.change}
                    chartData={market.chartData}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
              <h3 className="text-lg font-bold text-white mb-6">Portfolio Summary</h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Total Positions</span>
                  <span className="text-white font-semibold">{mockPositions.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Winning Trades</span>
                  <span className="text-green-400 font-semibold">{mockPositions.filter(p => p.profit > 0).length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Losing Trades</span>
                  <span className="text-red-400 font-semibold">{mockPositions.filter(p => p.profit < 0).length}</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-slate-700">
                  <span className="text-slate-400">Total P&L</span>
                  <span className="text-green-400 font-bold">${mockPositions.reduce((sum, p) => sum + p.profit, 0).toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Market News */}
            <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
              <h3 className="text-lg font-bold text-white mb-6">Market News</h3>
              <div className="space-y-4">
                {[
                  { title: 'Fed Holds Interest Rates', time: '2 hours ago' },
                  { title: 'Tech Rally Continues Strong', time: '4 hours ago' },
                  { title: 'Oil Prices Surge 3.5%', time: '6 hours ago' },
                ].map((news, idx) => (
                  <div key={idx} className="pb-4 border-b border-slate-700 last:border-b-0">
                    <p className="text-white font-medium text-sm hover:text-cyan-400 cursor-pointer transition">{news.title}</p>
                    <p className="text-slate-500 text-xs mt-1">{news.time}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Watchlist */}
            <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
              <h3 className="text-lg font-bold text-white mb-6">Watchlist</h3>
              <div className="space-y-2">
                {[
                  { symbol: 'MSFT', price: '$416.50', change: 1.8 },
                  { symbol: 'GOOGL', price: '$140.23', change: -0.5 },
                  { symbol: 'AMZN', price: '$181.45', change: 3.2 },
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center p-3 hover:bg-slate-700/50 rounded cursor-pointer transition">
                    <span className="text-white font-medium">{item.symbol}</span>
                    <div className="text-right">
                      <p className="text-white text-sm">{item.price}</p>
                      <p className={`text-xs ${item.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {item.change >= 0 ? '+' : ''}{item.change}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Trade Modal */}
        {showTradeModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-lg border border-slate-700 max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Place Trade</h2>
                <button
                  onClick={() => setShowTradeModal(false)}
                  className="text-slate-400 hover:text-white transition"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                {/* Trade Type */}
                <div className="flex gap-4">
                  <button
                    onClick={() => setTradeData({ ...tradeData, type: 'buy' })}
                    className={`flex-1 py-2 rounded-lg font-medium transition ${
                      tradeData.type === 'buy'
                        ? 'bg-green-600 text-white'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    Buy
                  </button>
                  <button
                    onClick={() => setTradeData({ ...tradeData, type: 'sell' })}
                    className={`flex-1 py-2 rounded-lg font-medium transition ${
                      tradeData.type === 'sell'
                        ? 'bg-red-600 text-white'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    Sell
                  </button>
                </div>

                {/* Symbol */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Symbol</label>
                  <input
                    type="text"
                    placeholder="e.g., AAPL"
                    value={tradeData.symbol}
                    onChange={(e) => setTradeData({ ...tradeData, symbol: e.target.value.toUpperCase() })}
                    className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Quantity</label>
                  <input
                    type="number"
                    placeholder="1.0"
                    value={tradeData.quantity}
                    onChange={(e) => setTradeData({ ...tradeData, quantity: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Price (Market)</label>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={tradeData.price}
                    onChange={(e) => setTradeData({ ...tradeData, price: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                {/* Submit */}
                <button
                  onClick={() => {
                    setShowTradeModal(false);
                    setTradeData({ symbol: '', quantity: '', price: '', type: 'buy' });
                  }}
                  className={`w-full py-2 rounded-lg font-semibold text-white transition ${
                    tradeData.type === 'buy'
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-red-600 hover:bg-red-700'
                  }`}
                >
                  {tradeData.type === 'buy' ? 'Place Buy Order' : 'Place Sell Order'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
