// Simple in-memory messages controller for prototyping
const messages = [];
const conversations = {}; // { userId: [{ name, email, text, from, timestamp }] }

exports.listMessages = (req, res) => {
  res.json({ data: messages });
};

exports.createMessage = (req, res) => {
  const { userId, name, email, text, from = 'user' } = req.body;
  console.log('[createMessage] Received:', { userId, name, email, text, from });
  
  if (!text) {
    console.error('[createMessage] Missing text field');
    return res.status(400).json({ error: 'text required' });
  }
  
  const msg = { 
    id: Date.now().toString(), 
    userId, 
    name, 
    email, 
    text, 
    from, 
    createdAt: new Date().toISOString() 
  };
  
  messages.push(msg);
  
  // Also store in conversation map
  if (userId) {
    if (!conversations[userId]) conversations[userId] = [];
    conversations[userId].push(msg);
  }
  
  console.log('[createMessage] Created message:', msg);
  res.status(201).json({ data: msg });
};

exports.getConversation = (req, res) => {
  const { userId } = req.params;
  const msgs = conversations[userId] || [];
  res.json({ data: msgs });
};

exports.replyToMessage = (req, res) => {
  const { userId } = req.params;
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'text required' });
  
  const reply = {
    id: Date.now().toString(),
    userId,
    text,
    from: 'owner',
    createdAt: new Date().toISOString()
  };
  
  if (!conversations[userId]) conversations[userId] = [];
  conversations[userId].push(reply);
  messages.push(reply);
  
  res.status(201).json({ data: reply });
};

