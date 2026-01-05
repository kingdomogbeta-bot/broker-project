const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const bodyParser = require('express').json;
const messagesRoute = require('./routes/messages');
const transactionsRoute = require('./routes/transactions');
const authRoute = require('./routes/auth');
const aiRoute = require('./routes/ai');

const app = express();

// Basic security headers
app.use(helmet());

// Body parser
app.use(bodyParser());

// CORS configuration via env
const allowedOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';
app.use(cors({ origin: allowedOrigin }));

// Rate limiter (basic)
const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 300, // limit each IP to 300 requests per windowMs
	standardHeaders: true,
	legacyHeaders: false,
});
app.use('/api/', apiLimiter);

app.get('/api/health', (req, res) => res.json({ status: 'ok', uptime: process.uptime() }));

app.use('/api/messages', messagesRoute);
app.use('/api/transactions', transactionsRoute);
app.use('/api/auth', authRoute);
app.use('/api/ai', aiRoute);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Aurex backend running on port ${PORT}`));
