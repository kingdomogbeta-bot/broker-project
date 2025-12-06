import React, { useState } from 'react';

export default function MarketChart({ symbol, price, change, chartData }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const maxValue = Math.max(...chartData);
  const minValue = Math.min(...chartData);
  const range = maxValue - minValue;

  return (
    <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 hover:border-slate-600 transition">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-white font-bold text-lg">{symbol}</h3>
          <p className="text-slate-400 text-sm">{price}</p>
        </div>
        <span className={`text-sm font-semibold px-3 py-1 rounded ${change >= 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
          {change >= 0 ? '+' : ''}{change}%
        </span>
      </div>

      {/* Mini Chart */}
      <div className="h-24 flex items-end gap-1 bg-slate-900/50 rounded p-2 cursor-pointer">
        {chartData.map((value, idx) => {
          const height = range > 0 ? ((value - minValue) / range) * 100 : 50;
          const isHovered = hoveredIndex === idx;
          
          return (
            <div
              key={idx}
              className="flex-1 transition-all duration-200"
              style={{ height: `${height || 5}%` }}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className={`w-full h-full rounded-t transition-all ${
                  isHovered
                    ? 'bg-cyan-400'
                    : change >= 0
                    ? 'bg-green-500'
                    : 'bg-red-500'
                }`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
