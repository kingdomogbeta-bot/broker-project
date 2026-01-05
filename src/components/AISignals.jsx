import React, { useEffect, useState } from 'react';

export default function AISignals() {
  const [signals, setSignals] = useState([]);

  // Simple mock AI signals generator - replace with real AI integration later
  useEffect(() => {
    const generate = () => {
      const assets = ['BTC', 'ETH', 'AAPL', 'TSLA'];
      const newSignals = assets.map((a) => ({
        id: `${a}-${Date.now()}`,
        asset: a,
        action: Math.random() > 0.5 ? 'BUY' : 'SELL',
        confidence: (50 + Math.random() * 50).toFixed(0),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }));
      setSignals(newSignals);
    };

    generate();
    const t = setInterval(generate, 15000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
      <h4 className="text-white font-semibold mb-3">AI Trading Signals (Preview)</h4>
      <div className="space-y-2">
        {signals.map((s) => (
          <div key={s.id} className="flex justify-between items-center bg-slate-900/40 p-2 rounded">
            <div className="text-slate-300 font-medium">{s.asset}</div>
            <div className={`font-bold ${s.action === 'BUY' ? 'text-green-400' : 'text-red-400'}`}>{s.action}</div>
            <div className="text-slate-400 text-sm">{s.confidence}%</div>
            <div className="text-slate-500 text-xs">{s.time}</div>
          </div>
        ))}
      </div>
      <p className="text-xs text-slate-400 mt-3">Note: AI signals are for informational purposes only. Do your own research.</p>
    </div>
  );
}
