// In-memory transactions store for prototyping
const transactions = {};
const userBalances = {}; // { userId: balance }

exports.deposit = (req, res) => {
  const { userId, amount, method } = req.body;
  if (!userId || !amount || amount <= 0) {
    return res.status(400).json({ error: 'userId, amount (>0), and method required' });
  }

  const txn = {
    id: Date.now().toString(),
    userId,
    type: 'deposit',
    amount: parseFloat(amount),
    method: method || 'card',
    status: 'completed',
    createdAt: new Date().toISOString()
  };

  if (!transactions[userId]) transactions[userId] = [];
  transactions[userId].push(txn);

  // Update balance
  if (!userBalances[userId]) userBalances[userId] = 0;
  userBalances[userId] += txn.amount;

  res.status(201).json({ 
    data: txn,
    balance: userBalances[userId]
  });
};

exports.withdraw = (req, res) => {
  const { userId, amount, method } = req.body;
  if (!userId || !amount || amount <= 0) {
    return res.status(400).json({ error: 'userId, amount (>0), and method required' });
  }

  const balance = userBalances[userId] || 0;
  if (balance < amount) {
    return res.status(400).json({ error: 'Insufficient balance' });
  }

  const txn = {
    id: Date.now().toString(),
    userId,
    type: 'withdraw',
    amount: parseFloat(amount),
    method: method || 'bank',
    status: 'pending',
    createdAt: new Date().toISOString()
  };

  if (!transactions[userId]) transactions[userId] = [];
  transactions[userId].push(txn);

  // Deduct balance
  userBalances[userId] -= txn.amount;

  res.status(201).json({ 
    data: txn,
    balance: userBalances[userId],
    message: 'Withdrawal initiated. Processing may take 1-3 business days.'
  });
};

exports.getBalance = (req, res) => {
  const { userId } = req.params;
  const balance = userBalances[userId] || 0;
  res.json({ balance, userId });
};

exports.getTransactions = (req, res) => {
  const { userId } = req.params;
  const txns = transactions[userId] || [];
  res.json({ data: txns });
};
