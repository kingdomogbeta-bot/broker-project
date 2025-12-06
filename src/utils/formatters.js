// Utility functions for formatting and calculations
export const formatCurrency = (value, currency = '$') => {
  return `${currency}${parseFloat(value).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

export const formatPercent = (value) => {
  return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`;
};

export const calculatePnL = (entryPrice, currentPrice, quantity) => {
  return (currentPrice - entryPrice) * quantity;
};

export const calculateReturn = (entryPrice, currentPrice) => {
  return ((currentPrice - entryPrice) / entryPrice) * 100;
};

export const calculateRiskReward = (entryPrice, stopLoss, takeProfit) => {
  const risk = Math.abs(entryPrice - stopLoss);
  const reward = Math.abs(takeProfit - entryPrice);
  return reward / risk;
};

export const truncateAddress = (address, chars = 4) => {
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
};

export const getTextColor = (value) => {
  if (value > 0) return 'text-green-400';
  if (value < 0) return 'text-red-400';
  return 'text-slate-300';
};

export const getBgColor = (value) => {
  if (value > 0) return 'bg-green-500/20';
  if (value < 0) return 'bg-red-500/20';
  return 'bg-slate-500/20';
};
