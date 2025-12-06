import React from 'react';

export default function StatCard({ label, value, change, icon, color = 'blue' }) {
  const colorClasses = {
    blue: 'from-blue-600 to-cyan-500',
    green: 'from-green-600 to-emerald-500',
    purple: 'from-purple-600 to-pink-500',
    orange: 'from-orange-600 to-amber-500',
  };

  const isPositive = change >= 0;

  return (
    <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-slate-600 transition">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-slate-400 text-sm font-medium mb-1">{label}</p>
          <p className="text-white text-2xl font-bold">{value}</p>
        </div>
        {icon && (
          <div className={`text-2xl bg-gradient-to-r ${colorClasses[color]} bg-clip-text text-transparent`}>
            {icon}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <span className={`text-sm font-semibold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
          {isPositive ? '↑' : '↓'} {Math.abs(change)}%
        </span>
        <span className="text-slate-500 text-xs">vs last month</span>
      </div>
    </div>
  );
}
