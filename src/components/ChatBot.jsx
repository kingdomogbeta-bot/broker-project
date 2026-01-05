import React, { useState, useEffect } from 'react';
import { MessageCircle, Send, X, AlertCircle } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api';

const ChatBot = ({ onChatOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Hello! 👋 How can we help you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isOwnerOnline, setIsOwnerOnline] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: 'Guest', email: '' });
  const [showUserForm, setShowUserForm] = useState(true);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Initialize userId and load conversation from backend
  useEffect(() => {
    const storedUserId = localStorage.getItem('chatUserId');
    if (storedUserId) {
      setUserId(storedUserId);
      fetchConversation(storedUserId);
    }
  }, []);

  const fetchConversation = async (uid) => {
    try {
      const res = await fetch(`${API_BASE}/messages/${uid}`);
      if (res.ok) {
        const data = await res.json();
        if (data.data && data.data.length > 0) {
          const formattedMsgs = data.data.map(msg => ({
            id: msg.id,
            text: msg.text,
            sender: msg.from === 'owner' ? 'owner' : 'user',
            timestamp: new Date(msg.createdAt),
            userName: msg.name,
            userEmail: msg.email
          }));
          setMessages((prev) => [...prev.filter(m => m.sender === 'bot'), ...formattedMsgs]);
        }
      }
    } catch (error) {
      console.error('Error fetching conversation:', error);
    }
  };


  const handleSendMessage = async () => {
    if (inputValue.trim()) {
      setLoading(true);
      try {
        const userMessage = {
          id: Date.now().toString(),
          text: inputValue,
          sender: 'user',
          timestamp: new Date(),
          userName: userInfo.name,
          userEmail: userInfo.email,
        };
        setMessages((prev) => [...prev, userMessage]);
        setInputValue('');

        // Get AI response
        const aiRes = await fetch(`${API_BASE}/ai/response`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: inputValue })
        });

        if (aiRes.ok) {
          const aiData = await aiRes.json();
          setTimeout(() => {
            const botMessage = {
              id: aiData.data.id,
              text: aiData.data.text,
              sender: 'bot',
              timestamp: new Date(aiData.data.createdAt),
            };
            setMessages((prev) => [...prev, botMessage]);
          }, 800);
        } else {
          console.error('AI response failed');
        }
      } catch (error) {
        console.error('Error sending message:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '18737446276';

  const handleWhatsApp = () => {
    const phoneNumber = WHATSAPP_NUMBER.replace(/[^+0-9]/g, '');
    const message = encodeURIComponent(
      'Hi! I would like to know more about your trading platform.'
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const handleUserSubmit = (e) => {
    e.preventDefault();
    if (userInfo.name.trim()) {
      // Generate userId (in production, use real user IDs from auth)
      const newUserId = `user_${Date.now()}`;
      setUserId(newUserId);
      localStorage.setItem('chatUserId', newUserId);
      setShowUserForm(false);
    }
  };

  return (
    <>
      {/* Floating Chat Button & WhatsApp Button */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4">
        {/* Large WhatsApp Button */}
        <button
          onClick={handleWhatsApp}
          className="px-5 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-lg flex items-center gap-2 transform hover:scale-105 transition-all font-semibold"
          title="Chat on WhatsApp"
        >
          <MessageCircle size={24} />
          WhatsApp
        </button>

        {/* Chat Button - SMS Support */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white rounded-full shadow-lg flex items-center justify-center transform hover:scale-110 transition-all relative group"
          title="Chat with us"
        >
          <MessageCircle size={24} />
          <span className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-pulse"></span>
          {/* Tooltip */}
          <div className="absolute bottom-16 right-0 bg-slate-900 text-white text-xs px-3 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Customer Support Chat
          </div>
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-8 w-96 h-[550px] bg-gradient-to-b from-slate-900 to-slate-800 rounded-2xl shadow-2xl border border-slate-700 z-50 flex flex-col overflow-hidden backdrop-blur-xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-4 flex justify-between items-center text-white">
            <div>
              <h3 className="font-bold text-lg">Aurex Capital Support</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-blue-700 p-2 rounded-lg transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-3 rounded-lg ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-br-none shadow-lg'
                      : msg.sender === 'owner'
                      ? 'bg-green-700 text-white rounded-bl-none shadow-lg border border-green-600'
                      : 'bg-slate-700 text-slate-100 rounded-bl-none border border-slate-600'
                  }`}
                >
                  {msg.sender === 'owner' && <p className="text-xs font-bold mb-1">👨‍💼 Owner</p>}
                  <p className="text-sm">{msg.text}</p>
                  <p className={`text-xs mt-1.5 ${msg.sender === 'user' ? 'text-blue-100' : 'text-slate-400'}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* User Info Form */}
          {showUserForm && (
            <div className="p-4 bg-slate-800/80 border-t border-slate-700 space-y-3">
              <p className="text-slate-300 text-sm font-semibold">Please enter your details to get started:</p>
              <form onSubmit={handleUserSubmit} className="space-y-3">
                <div>
                  <label className="text-xs text-slate-300 block mb-1.5 font-semibold">Your Name *</label>
                  <input
                    type="text"
                    value={userInfo.name}
                    onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                    placeholder="e.g., John Doe"
                    className="w-full px-3 py-2.5 bg-slate-900 border border-slate-600 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-300 block mb-1.5 font-semibold">Email (Optional)</label>
                  <input
                    type="email"
                    value={userInfo.email}
                    onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                    placeholder="your@email.com"
                    className="w-full px-3 py-2.5 bg-slate-900 border border-slate-600 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-600 transition text-sm shadow-lg"
                >
                  Start Chat →
                </button>
              </form>
            </div>
          )}

          {/* Input Area */}
          {!showUserForm && (
            <div className="p-4 border-t border-slate-700 bg-slate-800/80">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  disabled={loading}
                  className="flex-1 px-4 py-2.5 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 text-sm transition disabled:opacity-50"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={loading}
                  className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:from-blue-700 hover:to-cyan-600 transition shadow-lg disabled:opacity-50"
                  title="Send message"
                >
                  <Send size={18} />
                </button>
              </div>
              <p className="text-xs text-slate-400 mt-2">💬 Your message has been received.</p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ChatBot;
