const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// In-memory admin (for prototype only)
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || null; // set via env in production

exports.login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'username and password required' });

  // For prototype fallback to plain-text check (only if no hash provided)
  if (!ADMIN_PASSWORD_HASH) {
    if (username === ADMIN_USERNAME && password === (process.env.ADMIN_PASSWORD || 'admin1111')) {
      const token = jwt.sign({ username }, process.env.JWT_SECRET || 'devsecret', { expiresIn: '8h' });
      return res.json({ token });
    }
    return res.status(401).json({ error: 'invalid credentials' });
  }

  // If hash provided, compare
  const passwordMatches = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
  if (!passwordMatches) return res.status(401).json({ error: 'invalid credentials' });

  const token = jwt.sign({ username }, process.env.JWT_SECRET || 'devsecret', { expiresIn: '8h' });
  res.json({ token });
};
