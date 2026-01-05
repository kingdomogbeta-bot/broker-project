import React, { useEffect, useState } from 'react';

export default function MarketFeed({ symbols = ['bitcoin', 'ethereum'] }) {
  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchPrices = async () => {
    try {
      const ids = symbols.join(',');
      const res = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`
      );
      const data = await res.json();
      setPrices(data);
      setLoading(false);
    } catch (err) {
      console.error('MarketFeed fetch error', err);
    }
  };

  useEffect(() => {
    fetchPrices();
    const t = setInterval(fetchPrices, 10000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <div className="p-4 text-slate-300">Loading market data...</div>;

  return (
    <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
      <h4 className="text-white font-semibold mb-3">Live Market Feed</h4>
      <div className="space-y-2">
        {Object.keys(prices).map((id) => (
          <div key={id} className="flex justify-between items-center">
            <div className="text-slate-300 capitalize">{id}</div>
            <div className="text-white font-semibold">${prices[id].usd.toLocaleString()}</div>
            <div className={`text-sm ${prices[id].usd_24h_change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {prices[id].usd_24h_change ? prices[id].usd_24h_change.toFixed(2) : '0.00'}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
