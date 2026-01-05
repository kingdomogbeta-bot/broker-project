import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const TradingSimulator = () => {
  const [balance, setBalance] = useState(10000);
  const [positions, setPositions] = useState([
    { symbol: 'BTC/USD', entry: 42350, current: 42850, quantity: 0.5, profit: 250 },
    { symbol: 'EURUSD', entry: 1.0842, current: 1.0925, quantity: 10000, profit: 830 },
  ]);
  const [totalProfit, setTotalProfit] = useState(1080);

  useEffect(() => {
    // Simulate real-time price updates
    const interval = setInterval(() => {
      setPositions(prev => prev.map(pos => {
        const change = (Math.random() - 0.5) * 100;
        const newPrice = pos.current + change;
        const newProfit = (newPrice - pos.entry) * pos.quantity;
        return { ...pos, current: parseFloat(newPrice.toFixed(4)), profit: parseFloat(newProfit.toFixed(2)) };
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const total = positions.reduce((sum, pos) => sum + pos.profit, 0);
    setTotalProfit(parseFloat(total.toFixed(2)));
  }, [positions]);

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Try Risk-Free Demo Trading
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Practice with real market data using virtual funds. No real money at risk.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left - Account Info */}
          <div className="lg:col-span-1">
            <div className="backdrop-blur-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-2xl p-8" data-aos="fade-right">
              <h3 className="text-white font-bold text-lg mb-6">Demo Account</h3>
              
              <div className="space-y-4 mb-8">
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <p className="text-gray-400 text-sm mb-1">Account Balance</p>
                  <p className="text-cyan-400 font-bold text-2xl">${balance.toLocaleString()}</p>
                </div>

                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <p className="text-gray-400 text-sm mb-1">Total P&L</p>
                  <p className={`font-bold text-2xl ${totalProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {totalProfit >= 0 ? '+' : ''}{totalProfit.toLocaleString()}
                  </p>
                </div>

                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <p className="text-gray-400 text-sm mb-1">ROI</p>
                  <p className="text-yellow-400 font-bold text-2xl">{((totalProfit/10000)*100).toFixed(2)}%</p>
                </div>
              </div>

              <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
                Open Real Account
              </button>
            </div>
          </div>

          {/* Right - Open Positions */}
          <div className="lg:col-span-2">
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8" data-aos="fade-left">
              <h3 className="text-white font-bold text-lg mb-6">Open Positions</h3>
              
              <div className="space-y-4">
                {positions.map((position, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:border-cyan-500/50 transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="text-white font-bold">{position.symbol}</h4>
                        <p className="text-gray-400 text-sm">Qty: {position.quantity}</p>
                      </div>
                      <div className={`text-right ${position.profit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        <div className="flex items-center gap-1 justify-end">
                          {position.profit >= 0 ? (
                            <TrendingUp className="w-5 h-5" />
                          ) : (
                            <TrendingDown className="w-5 h-5" />
                          )}
                          <span className="font-bold">{position.profit >= 0 ? '+' : ''}{position.profit.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between text-sm">
                      <div>
                        <p className="text-gray-400">Entry</p>
                        <p className="text-cyan-300 font-semibold">{position.entry}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-400">Current</p>
                        <p className="text-cyan-300 font-semibold">{position.current}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <p className="text-blue-300 text-sm">
                  💡 Demo prices update every 3 seconds. Start with real account to trade with actual funds.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center" data-aos="zoom-in">
          <p className="text-gray-300 mb-6">Confident in your trading? Start with real money today.</p>
          <button className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all transform hover:scale-105">
            Start Live Trading
          </button>
        </div>
      </div>
    </section>
  );
};

export default TradingSimulator;
