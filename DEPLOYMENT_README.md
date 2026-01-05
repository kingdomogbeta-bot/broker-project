# Aurex Capital - Professional Broker Platform

A modern, feature-rich trading platform built with React + Vite, featuring real-time market data, AI signals, and a full-stack backend.

## 🚀 Quick Start

### Frontend (Main App)

```bash
npm install
npm run dev
```

Runs on **http://localhost:5175**

### Backend (Express API)

```bash
cd backend
npm install
npm run dev
```

Runs on **http://localhost:4000**

## 📦 Features

- **Trading Dashboard** - View positions, recent trades, and portfolio performance
- **Live Market Feed** - Real-time crypto prices via CoinGecko API
- **AI Signals** - Mock AI trading signals and market intelligence
- **Chat Support** - Customer support widget with persistent messaging (backend API)
- **Deposit/Withdraw** - Fund management with transaction API
- **Multi-page SPA** - Home, Markets, About, Contact, Dashboard
- **Admin Panel** - Hidden admin area for message management (secret access: `?access=admin-panel-2024`)

## 🔒 Admin Access

Secret URL parameter (confidential):
```
https://yoursite.com?access=admin-panel-2024
```

Credentials: 
- Username: `admin`
- Password: `admin1111`

*(Use secure passwords in production)*

## 📡 API Endpoints

### Messages
- `GET /api/messages` - List all messages
- `POST /api/messages` - Create message
- `GET /api/messages/:userId` - Get user conversation
- `POST /api/messages/:userId/reply` - Admin reply

### Transactions
- `POST /api/transactions/deposit` - Deposit funds
- `POST /api/transactions/withdraw` - Withdraw funds
- `GET /api/transactions/:userId/balance` - Get balance
- `GET /api/transactions/:userId/transactions` - Get transaction history

## 🚢 Deployment to Vercel

### Deploy Frontend

```bash
npm i -g vercel
vercel
```

Set environment variable in Vercel dashboard:
```
VITE_API_BASE=https://your-backend-url.vercel.app/api
```

### Deploy Backend

```bash
cd backend
vercel
```

Update the frontend environment variable with the deployed backend URL.

See [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md) for detailed instructions.

## 📧 Contact Info

- **Support Email:** support@aurexcapital.com
- **WhatsApp Complaints:** +1 873-744-6276
- **Copyright:** 2025 Aurex Capital

## 🛠️ Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS, Lucide Icons
- **Backend:** Node.js, Express, CORS
- **Data:** CoinGecko API (market data)
- **Deployment:** Vercel (frontend + backend)
- **Storage:** In-memory (development), DB-ready architecture

## ⚠️ Development vs Production

**Development:**
- Uses localStorage for chat persistence
- Mock AI signals (refresh every 15s)
- Local backend on port 4000

**Production (Vercel):**
- Uses backend API for persistence
- Ready for real ML/AI integration
- Serverless functions on Vercel

## 📝 Next Steps

1. **Secure Authentication:** Replace plaintext admin credentials with bcrypt + JWT
2. **Database:** Connect to PostgreSQL/MongoDB for persistent storage
3. **Real AI:** Integrate actual ML model or AI API for signals
4. **Payment Gateway:** Add Stripe/PayPal for real deposits/withdrawals
5. **Compliance:** Add KYC, risk disclaimers, regulatory notices

---

**Built with ❤️ for modern trading.**
