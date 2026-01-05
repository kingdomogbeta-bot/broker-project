// AI-powered trading support chatbot (simulated with knowledge base)
const tradingKnowledge = {
  'bitcoin': 'Bitcoin is the world\'s first cryptocurrency, created in 2009. It\'s used for secure, decentralized transactions. Current price is around $42,000-$45,000. Would you like to know about investing in Bitcoin?',
  'ethereum': 'Ethereum is a blockchain platform that enables smart contracts and decentralized applications. ETH is its native token. It\'s currently trading around $2,200-$2,400. Interested in learning more?',
  'trading': 'Trading involves buying and selling financial assets to profit from price movements. Key strategies include day trading, swing trading, and long-term investing. Risk management is crucial!',
  'leverage': 'Leverage allows you to control larger positions with less capital. However, it amplifies both gains and losses. A 10:1 leverage means a 10% move can wipe out your investment. Use with caution!',
  'risk management': 'Always use stop-losses to limit potential losses. Never risk more than 1-2% of your portfolio on a single trade. Diversify across multiple assets. Keep emotions out of trading!',
  'candlestick': 'Candlestick charts show price movement over time. Each "candle" shows open, high, low, and close prices. Green candles = bullish (price went up), Red candles = bearish (price went down).',
  'support resistance': 'Support is a price level where an asset tends to stop falling. Resistance is where it tends to stop rising. These are key points for traders to watch and make decisions.',
  'portfolio': 'A portfolio is a collection of investments. Diversifying across stocks, bonds, crypto, and commodities reduces risk. A common strategy is 60% stocks, 30% bonds, 10% alternatives.',
  'market': 'Markets are where assets are traded. Stock markets open at 9:30 AM ET and close at 4 PM ET weekdays. Crypto markets trade 24/7/365. Always check trading hours before placing trades!',
  'volatility': 'Volatility measures how much an asset\'s price swings. High volatility = big price swings = more risk but more opportunity. Low volatility = stable but less excitement.',
  'trend': 'An uptrend means prices are rising over time. A downtrend means they\'re falling. Trading WITH the trend (buying in uptrends, selling in downtrends) is usually safer than fighting it.',
  'dividend': 'Dividends are payments companies make to shareholders from profits. They\'re great for passive income. Stocks with consistent dividends are often considered safer investments.',
  'bull market': 'A bull market is when prices are rising and investors are optimistic. Good time for long positions. The opposite is a bear market when prices fall.',
  'bear market': 'A bear market is when prices are falling and investors are pessimistic. Can be good time for short selling or buying dips. The opposite is a bull market.',
  'crypto': 'Cryptocurrency is digital money secured by cryptography. Bitcoin, Ethereum, and thousands of altcoins exist. Crypto trades 24/7 and is highly volatile but offers massive growth potential!',
  'forex': 'Forex is the foreign exchange market where currencies are traded. EUR/USD is the most popular pair. It\'s the largest financial market with trillions in daily volume.',
  'stocks': 'Stocks represent ownership in companies. When you buy Apple stock, you own a piece of Apple. Stocks can provide capital gains and dividends. Long-term investing is often better than day trading.',
  'bonds': 'Bonds are loans you give to companies or governments. They pay interest (yield) over time. Generally safer than stocks but with lower returns.',
  'etf': 'ETFs (Exchange Traded Funds) bundle multiple assets together. Great for diversification! You can buy an ETF holding 500 stocks with one purchase. Perfect for beginners!',
  'dca': 'Dollar Cost Averaging (DCA) means investing a fixed amount regularly regardless of price. This reduces timing risk and is perfect for long-term wealth building. Invest $100 every month for 30 years!',
};

const getAIResponse = (userMessage) => {
  const lowerMessage = userMessage.toLowerCase();
  
  // Check for exact keyword matches
  for (const [keyword, response] of Object.entries(tradingKnowledge)) {
    if (lowerMessage.includes(keyword)) {
      return response;
    }
  }
  
  // If no keyword match, provide a helpful generic response
  const genericResponses = [
    'Great question! That\'s an important topic in trading. Could you be more specific? Are you asking about Bitcoin, Ethereum, stocks, forex, or general trading strategies?',
    'I\'m here to help you learn trading! Ask me about any of these: Bitcoin, Ethereum, trading strategies, risk management, portfolio building, candlestick charts, support/resistance, market trends, or any crypto/forex topic.',
    'Excellent inquiry! Remember, successful trading is about education and risk management. What specific aspect would you like to learn more about?',
    'I appreciate your interest in learning! To give you the best advice, tell me more about what you\'re interested in - are you a beginner, intermediate, or advanced trader?',
  ];
  
  return genericResponses[Math.floor(Math.random() * genericResponses.length)];
};

exports.getAIResponse = (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'message required' });
  
  const response = getAIResponse(message);
  console.log('[AI] User:', message);
  console.log('[AI] Response:', response);
  
  res.json({ 
    data: { 
      text: response,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    } 
  });
};

module.exports = { getAIResponse };
