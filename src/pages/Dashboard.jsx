import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Bell, Settings, Zap, Target, Eye, ArrowUpRight, ArrowDownLeft, MoreVertical, Crown, MessageSquare, Send, X } from 'lucide-react';
import StatCard from '../components/StatCard';
import MarketChart from '../components/MarketChart';
import MarketFeed from '../components/MarketFeed';
import AISignals from '../components/AISignals';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api';

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

const mockTradeHistory = [
  { id: 1, type: 'buy', symbol: 'AAPL', quantity: 10, price: 186.23, time: '2 mins ago', status: 'filled' },
  { id: 2, type: 'sell', symbol: 'EURUSD', quantity: 5000, price: 1.0842, time: '15 mins ago', status: 'filled' },
  { id: 3, type: 'buy', symbol: 'BTC/USD', quantity: 0.1, price: 42350, time: '1 hour ago', status: 'filled' },
  { id: 4, type: 'sell', symbol: 'GOLD', quantity: 10, price: 2045, time: '3 hours ago', status: 'filled' },
];

export default function Dashboard() {
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [showTradeModal, setShowTradeModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [currentPlan, setCurrentPlan] = useState('starter');
  const [portfolio, setPortfolio] = useState(mockPortfolio);
  const [depositData, setDepositData] = useState({ amount: '', method: 'card' });
  const [withdrawData, setWithdrawData] = useState({ amount: '', method: 'bank' });
  const [transactionLoading, setTransactionLoading] = useState(false);
  const [transactionMessage, setTransactionMessage] = useState('');
  const [tradeData, setTradeData] = useState({ symbol: '', quantity: '', price: '', type: 'buy' });
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'alert', title: 'Price Alert', message: 'AAPL reached $186', time: '5 mins ago' },
    { id: 2, type: 'success', title: 'Trade Filled', message: 'Your BTC order was filled', time: '15 mins ago' },
    { id: 3, type: 'info', title: 'Market Update', message: 'Fed announcement in 2 hours', time: '30 mins ago' },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAdminMessages, setShowAdminMessages] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [adminReplyText, setAdminReplyText] = useState('');

  // Deposit handler
  const handleDeposit = async () => {
    if (!depositData.amount || parseFloat(depositData.amount) <= 0) {
      setTransactionMessage('Please enter a valid amount.');
      return;
    }

    setTransactionLoading(true);
    setTransactionMessage('Processing deposit...');

    try {
      const res = await fetch(`${API_BASE}/transactions/deposit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'user_demo',
          amount: parseFloat(depositData.amount),
          method: depositData.method
        })
      });

      if (res.ok) {
        const data = await res.json();
        setPortfolio(prev => ({
          ...prev,
          balance: data.balance,
          availableFunds: data.balance - prev.invested
        }));
        setTransactionMessage(`✅ Deposit of $${depositData.amount} successful!`);
        setDepositData({ amount: '', method: 'card' });
        setTimeout(() => {
          setShowDepositModal(false);
          setTransactionMessage('');
        }, 2000);
      } else {
        setTransactionMessage('❌ Deposit failed. Please try again.');
      }
    } catch (error) {
      console.error('Deposit error:', error);
      setTransactionMessage('❌ Error: Backend not running on http://localhost:4000');
    } finally {
      setTransactionLoading(false);
    }
  };

  // Withdraw handler
  const handleWithdraw = async () => {
    if (!withdrawData.amount || parseFloat(withdrawData.amount) <= 0) {
      setTransactionMessage('Please enter a valid amount.');
      return;
    }

    if (parseFloat(withdrawData.amount) > portfolio.availableFunds) {
      setTransactionMessage('❌ Insufficient balance for withdrawal.');
      return;
    }

    setTransactionLoading(true);
    setTransactionMessage('Processing withdrawal...');

    try {
      const res = await fetch(`${API_BASE}/transactions/withdraw`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'user_demo',
          amount: parseFloat(withdrawData.amount),
          method: withdrawData.method
        })
      });

      if (res.ok) {
        const data = await res.json();
        setPortfolio(prev => ({
          ...prev,
          balance: data.balance,
          availableFunds: data.balance - prev.invested
        }));
        setTransactionMessage(`✅ Withdrawal of $${withdrawData.amount} initiated! Processing in 1-3 business days.`);
        setWithdrawData({ amount: '', method: 'bank' });
        setTimeout(() => {
          setShowWithdrawModal(false);
          setTransactionMessage('');
        }, 2500);
      } else {
        setTransactionMessage('❌ Withdrawal failed. Please try again.');
      }
    } catch (error) {
      console.error('Withdraw error:', error);
      setTransactionMessage('❌ Error: Backend not running on http://localhost:4000');
    } finally {
      setTransactionLoading(false);
    }
  };
  
  // Load user messages from localStorage
  const userChats = JSON.parse(localStorage.getItem('userChats') || '[]');
  const conversations = userChats.reduce((acc, msg) => {
    const existingConv = acc.find(c => c.userEmail === msg.userEmail);
    if (existingConv) {
      existingConv.messages.push(msg);
      existingConv.unread = !msg.read;
    } else {
      acc.push({
        id: msg.id,
        userName: msg.userName,
        userEmail: msg.userEmail,
        messages: [msg],
        unread: true,
      });
    }
    return acc;
  }, []);
  
  const handleOwnerReply = () => {
    if (adminReplyText.trim() && selectedConversation) {
      const ownerMessage = {
        id: Date.now(),
        text: adminReplyText,
        sender: 'owner',
        timestamp: new Date(),
        userName: 'You (Owner)',
        userEmail: 'admin@aurexcapital.com',
      };
      
      // Save owner reply to localStorage
      const allChats = JSON.parse(localStorage.getItem('userChats') || '[]');
      allChats.push(ownerMessage);
      localStorage.setItem('userChats', JSON.stringify(allChats));
      
      // Update selected conversation
      setSelectedConversation({
        ...selectedConversation,
        messages: [...selectedConversation.messages, ownerMessage],
      });
      
      setAdminReplyText('');
    }
  };

  const plans = [
    { id: 'starter', name: 'Starter', price: '$0', features: ['$5K Demo Balance', 'Basic Tools', '5 Watchlists'] },
    { id: 'pro', name: 'Pro', price: '$29/mo', features: ['$50K Demo Balance', 'Advanced Tools', 'Unlimited Watchlists', 'Live Alerts'] },
    { id: 'elite', name: 'Elite', price: '$99/mo', features: ['$500K Demo Balance', 'Premium Tools', 'AI Signals', '1-on-1 Coaching'] },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Trading Dashboard</h1>
            <p className="text-slate-400">Welcome back! Manage your portfolio and execute trades</p>
          </div>
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-3 bg-slate-800 border border-slate-700 rounded-lg hover:border-cyan-500/50 transition"
              >
                <Bell size={20} className="text-slate-300" />
                <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full" />
              </button>
              {showNotifications && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-slate-800 border border-slate-700 rounded-lg p-4 z-50 shadow-2xl">
                  <h3 className="font-bold text-white mb-4">Notifications</h3>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {notifications.map((notif) => (
                      <div key={notif.id} className="p-3 bg-slate-900/50 rounded border border-slate-700 hover:border-cyan-500/50 transition">
                        <p className="font-semibold text-white text-sm">{notif.title}</p>
                        <p className="text-slate-400 text-xs mt-1">{notif.message}</p>
                        <p className="text-slate-500 text-xs mt-2">{notif.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Settings */}
            <button className="p-3 bg-slate-800 border border-slate-700 rounded-lg hover:border-cyan-500/50 transition">
              <Settings size={20} className="text-slate-300" />
            </button>
          </div>
        </div>

        {/* Current Plan Banner */}
        <div className="mb-8 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-lg p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <Crown size={24} className="text-blue-400" />
              </div>
              <div>
                <h3 className="text-white font-bold">Current Plan: <span className="text-cyan-400">{currentPlan === 'starter' ? 'Starter' : currentPlan === 'pro' ? 'Pro' : 'Elite'}</span></h3>
                <p className="text-slate-400 text-sm">Demo Balance: <span className="text-cyan-300 font-semibold">${currentPlan === 'starter' ? '5,000' : currentPlan === 'pro' ? '50,000' : '500,000'}</span></p>
              </div>
            </div>
            <button
              onClick={() => setShowUpgradeModal(true)}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white rounded-lg font-semibold transition-all transform hover:scale-105"
            >
              Upgrade Plan →
            </button>
          </div>
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

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Active Positions */}
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
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
                        className="border-b border-slate-700/50 hover:bg-slate-700/30 cursor-pointer transition"
                      >
                        <td className="py-4 px-4">
                          <span className="font-semibold text-white">{pos.symbol}</span>
                        </td>
                        <td className="py-4 px-4 text-right text-slate-300">{pos.quantity}</td>
                        <td className="py-4 px-4 text-right text-slate-300">${pos.entryPrice.toFixed(2)}</td>
                        <td className="py-4 px-4 text-right text-slate-300">${pos.currentPrice.toFixed(2)}</td>
                        <td className={`py-4 px-4 text-right font-semibold flex items-center justify-end gap-1 ${pos.profit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {pos.profit >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
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

            {/* Recent Trades */}
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-6">Recent Trades</h2>
              <div className="space-y-3">
                {mockTradeHistory.map((trade) => (
                  <div key={trade.id} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-700/50 hover:border-cyan-500/30 transition">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${trade.type === 'buy' ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                        {trade.type === 'buy' ? (
                          <ArrowDownLeft size={20} className="text-green-400" />
                        ) : (
                          <ArrowUpRight size={20} className="text-red-400" />
                        )}
                      </div>
                      <div>
                        <p className="text-white font-semibold">{trade.symbol}</p>
                        <p className="text-slate-400 text-sm">{trade.quantity} units @ ${trade.price}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${trade.type === 'buy' ? 'text-green-400' : 'text-red-400'}`}>
                        {trade.type === 'buy' ? 'BUY' : 'SELL'}
                      </p>
                      <p className="text-slate-400 text-xs">{trade.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Market Overview */}
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
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
            {/* Quick Actions */}
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button onClick={() => setShowDepositModal(true)} className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-semibold transition">
                  Deposit Funds
                </button>
                <button onClick={() => setShowWithdrawModal(true)} className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-semibold transition">
                  Withdraw Earnings
                </button>
                <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg font-semibold transition">
                  View Account Settings
                </button>
              </div>
            </div>

            {/* Portfolio Summary */}
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-6">Portfolio Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Total Positions</span>
                  <span className="text-white font-semibold text-lg">{mockPositions.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Winning Trades</span>
                  <span className="text-green-400 font-semibold text-lg">{mockPositions.filter(p => p.profit > 0).length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Losing Trades</span>
                  <span className="text-red-400 font-semibold text-lg">{mockPositions.filter(p => p.profit < 0).length}</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-slate-700">
                  <span className="text-slate-400">Total P&L</span>
                  <span className="text-green-400 font-bold text-lg">${mockPositions.reduce((sum, p) => sum + p.profit, 0).toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Win Rate</span>
                  <span className="text-cyan-400 font-semibold">{((mockPositions.filter(p => p.profit > 0).length / mockPositions.length) * 100).toFixed(1)}%</span>
                </div>
              </div>
            </div>

            {/* Risk Management */}
            <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Target size={20} className="text-orange-400" />
                <h3 className="text-lg font-bold text-white">Risk Management</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-slate-300 text-sm mb-2">Portfolio Risk: <span className="text-orange-400 font-semibold">8.5%</span></p>
                  <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="w-2/3 h-full bg-gradient-to-r from-yellow-500 to-orange-500" />
                  </div>
                </div>
                <div>
                  <p className="text-slate-300 text-sm mb-2">Stop Loss Set: <span className="text-green-400 font-semibold">75 positions</span></p>
                </div>
                <button className="w-full py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold transition text-sm">
                  Adjust Risk Settings
                </button>
              </div>
            </div>

            {/* Market News */}
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Market News</h3>
              <div className="space-y-4">
                {[
                  { title: 'Fed Holds Rates Steady', time: '2h ago', impact: '↑' },
                  { title: 'Tech Earnings Beat Expectations', time: '4h ago', impact: '↑' },
                  { title: 'Oil Surge on OPEC Decision', time: '6h ago', impact: '↑' },
                ].map((news, idx) => (
                  <div key={idx} className="pb-4 border-b border-slate-700 last:border-b-0">
                    <div className="flex justify-between items-start">
                      <p className="text-white font-medium text-sm hover:text-cyan-400 cursor-pointer transition flex-1">{news.title}</p>
                      <span className="text-green-400 font-bold ml-2">{news.impact}</span>
                    </div>
                    <p className="text-slate-500 text-xs mt-1">{news.time}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Watchlist */}
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Watchlist</h3>
              <div className="space-y-2">
                {[
                  { symbol: 'MSFT', price: '$416.50', change: 1.8 },
                  { symbol: 'GOOGL', price: '$140.23', change: -0.5 },
                  { symbol: 'AMZN', price: '$181.45', change: 3.2 },
                  { symbol: 'NVIDIA', price: '$875.20', change: 4.1 },
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center p-3 hover:bg-slate-700/50 rounded cursor-pointer transition">
                    <span className="text-white font-medium">{item.symbol}</span>
                    <div className="text-right">
                      <p className="text-white text-sm">{item.price}</p>
                      <p className={`text-xs font-semibold ${item.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {item.change >= 0 ? '↑' : '↓'} {Math.abs(item.change)}%
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
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-slate-800 border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Place Trade</h2>
                <button
                  onClick={() => setShowTradeModal(false)}
                  className="text-slate-400 hover:text-white transition text-2xl"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                {/* Trade Type */}
                <div className="flex gap-4">
                  <button
                    onClick={() => setTradeData({ ...tradeData, type: 'buy' })}
                    className={`flex-1 py-3 rounded-lg font-semibold transition ${
                      tradeData.type === 'buy'
                        ? 'bg-green-600 text-white'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    Buy
                  </button>
                  <button
                    onClick={() => setTradeData({ ...tradeData, type: 'sell' })}
                    className={`flex-1 py-3 rounded-lg font-semibold transition ${
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
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
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
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
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
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                  />
                </div>

                {/* Submit */}
                <button
                  onClick={() => {
                    setShowTradeModal(false);
                    setTradeData({ symbol: '', quantity: '', price: '', type: 'buy' });
                  }}
                  className={`w-full py-3 rounded-lg font-semibold text-white transition ${
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

        {/* Upgrade Plan Modal */}
        {showUpgradeModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-slate-800 border border-slate-700 rounded-2xl max-w-3xl w-full p-8 shadow-2xl">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-white">Upgrade Your Plan</h2>
                <button
                  onClick={() => setShowUpgradeModal(false)}
                  className="text-slate-400 hover:text-white transition text-3xl"
                >
                  ✕
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`rounded-xl border-2 p-6 transition-all cursor-pointer ${
                      currentPlan === plan.id
                        ? 'border-cyan-400 bg-cyan-500/10'
                        : 'border-slate-700 hover:border-cyan-500/50'
                    }`}
                    onClick={() => setCurrentPlan(plan.id)}
                  >
                    <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                    <p className="text-2xl font-bold text-cyan-400 mb-4">{plan.price}</p>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-slate-300">
                          <span className="text-green-400">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <button
                      className={`w-full py-2 rounded-lg font-semibold transition ${
                        currentPlan === plan.id
                          ? 'bg-cyan-500 text-white'
                          : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      }`}
                    >
                      {currentPlan === plan.id ? 'Current Plan' : 'Upgrade Now'}
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <p className="text-blue-300 text-sm">
                  💡 Your plan determines your demo balance and available trading tools. Upgrade anytime without penalty.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Deposit Modal */}
        {showDepositModal && (
          <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center backdrop-blur-sm">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-96 max-h-96 shadow-2xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">Deposit Funds</h3>
                <button onClick={() => { setShowDepositModal(false); setTransactionMessage(''); }} className="text-slate-400 hover:text-white">
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-slate-300 block mb-2">Amount (USD)</label>
                  <input
                    type="number"
                    value={depositData.amount}
                    onChange={(e) => setDepositData({ ...depositData, amount: e.target.value })}
                    placeholder="e.g., 1000"
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="text-sm text-slate-300 block mb-2">Payment Method</label>
                  <select
                    value={depositData.method}
                    onChange={(e) => setDepositData({ ...depositData, method: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="card">Credit/Debit Card</option>
                    <option value="bank">Bank Transfer</option>
                    <option value="wallet">Crypto Wallet</option>
                  </select>
                </div>

                {transactionMessage && (
                  <div className={`p-3 rounded-lg text-sm ${transactionMessage.includes('✅') ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                    {transactionMessage}
                  </div>
                )}

                <button
                  onClick={handleDeposit}
                  disabled={transactionLoading}
                  className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-semibold transition disabled:opacity-50"
                >
                  {transactionLoading ? 'Processing...' : 'Deposit Now'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Withdraw Modal */}
        {showWithdrawModal && (
          <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center backdrop-blur-sm">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-96 max-h-96 shadow-2xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">Withdraw Earnings</h3>
                <button onClick={() => { setShowWithdrawModal(false); setTransactionMessage(''); }} className="text-slate-400 hover:text-white">
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-3">
                  <p className="text-xs text-slate-400 mb-1">Available Balance</p>
                  <p className="text-xl font-bold text-green-400">${portfolio.availableFunds.toFixed(2)}</p>
                </div>

                <div>
                  <label className="text-sm text-slate-300 block mb-2">Amount (USD)</label>
                  <input
                    type="number"
                    value={withdrawData.amount}
                    onChange={(e) => setWithdrawData({ ...withdrawData, amount: e.target.value })}
                    placeholder="e.g., 500"
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="text-sm text-slate-300 block mb-2">Withdrawal Method</label>
                  <select
                    value={withdrawData.method}
                    onChange={(e) => setWithdrawData({ ...withdrawData, method: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="bank">Bank Transfer</option>
                    <option value="wallet">Crypto Wallet</option>
                  </select>
                </div>

                {transactionMessage && (
                  <div className={`p-3 rounded-lg text-sm ${transactionMessage.includes('✅') ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                    {transactionMessage}
                  </div>
                )}

                <button
                  onClick={handleWithdraw}
                  disabled={transactionLoading}
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-semibold transition disabled:opacity-50"
                >
                  {transactionLoading ? 'Processing...' : 'Withdraw Now'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
