// Mock API service for trading operations
export const tradingAPI = {
  getPortfolio: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          balance: 125000,
          equity: 129500,
          profit: 4500,
          profitPercent: 3.6,
        });
      }, 500);
    });
  },

  getPositions: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, symbol: 'AAPL', quantity: 50, entryPrice: 150, currentPrice: 186.23, profit: 1811.5 },
          { id: 2, symbol: 'BTC/USD', quantity: 0.5, entryPrice: 35000, currentPrice: 42350, profit: 3675 },
        ]);
      }, 300);
    });
  },

  placeOrder: async (order) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          orderId: Math.random().toString(36).substr(2, 9),
          status: 'executed',
          ...order,
        });
      }, 800);
    });
  },

  getMarketData: async (symbol) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          symbol,
          price: Math.random() * 1000,
          change: (Math.random() - 0.5) * 10,
        });
      }, 200);
    });
  },
};

export const authAPI = {
  login: async (email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          token: 'mock_token_' + Math.random(),
          user: { email, name: 'User' },
        });
      }, 1000);
    });
  },

  register: async (userData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          token: 'mock_token_' + Math.random(),
          user: userData,
        });
      }, 1000);
    });
  },
};
