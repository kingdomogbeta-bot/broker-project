import React, { useState, useEffect } from 'react';
import { LogOut, MessageSquare, Send, X, User } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api';

export default function AdminDashboard({ onNavigate }) {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [adminReplyText, setAdminReplyText] = useState('');
  const [adminToken, setAdminToken] = useState(null);
  const [conversations, setConversations] = useState([]);

  // Check admin authentication on mount
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      onNavigate('admin-login');
      return;
    }
    setAdminToken(token);
    fetchConversations(token);
  }, [onNavigate]);

  const fetchConversations = async (token) => {
    try {
      const res = await fetch(`${API_BASE}/messages`, { headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) {
        if (res.status === 401) {
          localStorage.removeItem('adminToken');
          onNavigate('admin-login');
          return;
        }
        console.error('Failed to load messages');
        return;
      }
      const data = await res.json();
      // Group messages by userId or email
      const grouped = {};
      (data.data || []).forEach((msg) => {
        const key = msg.userId || msg.email || 'anon';
        if (!grouped[key]) grouped[key] = { id: key, userName: msg.name || key, userEmail: msg.email || '', messages: [] };
        grouped[key].messages.push({ id: msg.id, text: msg.text, sender: msg.from === 'owner' ? 'owner' : 'user', timestamp: msg.createdAt });
      });
      setConversations(Object.values(grouped));
    } catch (err) {
      console.error('Error fetching conversations', err);
    }
  };

  const handleOwnerReply = async () => {
    if (!adminReplyText.trim() || !selectedConversation) return;
    try {
      const res = await fetch(`${API_BASE}/messages/${selectedConversation.id}/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${adminToken}` },
        body: JSON.stringify({ text: adminReplyText })
      });
      if (res.ok) {
        const data = await res.json();
        // Update conversation locally
        setSelectedConversation((prev) => ({ ...prev, messages: [...prev.messages, { id: data.data.id, text: data.data.text, sender: 'owner', timestamp: data.data.createdAt }] }));
        setConversations((prev) => prev.map(c => c.id === selectedConversation.id ? { ...c, messages: [...c.messages, { id: data.data.id, text: data.data.text, sender: 'owner', timestamp: data.data.createdAt }] } : c));
        setAdminReplyText('');
      } else {
        console.error('Reply failed');
      }
    } catch (err) {
      console.error('Reply error', err);
    }
  };

  const handleSelectConversation = async (conv) => {
    setSelectedConversation(conv);
    // Optionally fetch fresh conversation from backend
    try {
      const res = await fetch(`${API_BASE}/messages/${conv.id}`, { headers: { Authorization: `Bearer ${adminToken}` } });
      if (res.ok) {
        const data = await res.json();
        setSelectedConversation({ ...conv, messages: data.data.map(m => ({ id: m.id, text: m.text, sender: m.from === 'owner' ? 'owner' : 'user', timestamp: m.createdAt })) });
      }
    } catch (err) {
      console.error('Error loading conversation', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    onNavigate('admin-login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">🔐 Admin Panel</h1>
            <p className="text-slate-400">Manage customer support messages and conversations</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold flex items-center gap-2 transition-all transform hover:scale-105"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Conversations List */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-4 text-white">
                <h2 className="font-bold flex items-center gap-2">
                  <MessageSquare size={20} />
                  Customer Messages ({conversations.length})
                </h2>
              </div>

              {conversations.length === 0 ? (
                <div className="p-8 text-center text-slate-400">
                  <MessageSquare size={48} className="mx-auto mb-3 opacity-30" />
                  <p className="font-medium">No messages yet</p>
                  <p className="text-sm mt-1">Customers will appear here when they message</p>
                </div>
              ) : (
                <div className="max-h-[700px] overflow-y-auto">
                  {conversations.map((conv) => (
                    <button
                      key={conv.id}
                      onClick={() => handleSelectConversation(conv)}
                      className={`w-full text-left p-4 border-b border-slate-700 hover:bg-slate-700/50 transition ${
                        selectedConversation?.id === conv.id ? 'bg-slate-700/50' : ''
                      }`}
                    >
                      <div className="flex justify-between items-start gap-3">
                        <div className="flex items-start gap-3 flex-1">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                            {conv.userName?.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-white font-semibold text-sm">{conv.userName}</p>
                            <p className="text-slate-400 text-xs truncate">{conv.userEmail}</p>
                            <p className="text-slate-300 text-xs mt-2 line-clamp-2">
                              {conv.messages[conv.messages.length - 1]?.text}
                            </p>
                          </div>
                        </div>
                        {conv.unread && (
                          <div className="w-2.5 h-2.5 bg-red-500 rounded-full flex-shrink-0 mt-1" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Conversation View */}
          <div className="lg:col-span-2">
            {selectedConversation ? (
              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden flex flex-col h-full max-h-[700px]">
                {/* Conversation Header */}
                <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-4 flex justify-between items-center text-white">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold">
                      {selectedConversation.userName?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-bold">{selectedConversation.userName}</h3>
                      <p className="text-xs text-blue-100">{selectedConversation.userEmail}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedConversation(null)}
                    className="hover:bg-white/20 p-2 rounded-lg transition"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/50">
                  {selectedConversation.messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === 'owner' ? 'justify-end' : 'justify-start'}`}>
                      <div
                        className={`max-w-xs px-4 py-3 rounded-lg ${
                          msg.sender === 'owner'
                            ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-br-none shadow-lg'
                            : 'bg-slate-700 text-slate-100 rounded-bl-none border border-slate-600'
                        }`}
                      >
                        {msg.sender === 'owner' && (
                          <p className="text-xs font-semibold text-blue-100 mb-1.5">You</p>
                        )}
                        <p className="text-sm break-words">{msg.text}</p>
                        <p className={`text-xs mt-2 ${msg.sender === 'owner' ? 'text-blue-100' : 'text-slate-400'}`}>
                          {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Reply Input */}
                <div className="p-4 border-t border-slate-700 bg-slate-800 space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={adminReplyText}
                      onChange={(e) => setAdminReplyText(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleOwnerReply()}
                      placeholder="Type your response..."
                      className="flex-1 px-4 py-2.5 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 text-sm transition"
                    />
                    <button
                      onClick={handleOwnerReply}
                      disabled={!adminReplyText.trim()}
                      className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:from-blue-700 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-2"
                    >
                      <Send size={18} />
                    </button>
                  </div>
                  <p className="text-xs text-slate-400">Press Enter or click Send to reply</p>
                </div>
              </div>
            ) : (
              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 flex items-center justify-center h-full max-h-[700px]">
                <div className="text-center">
                  <MessageSquare size={48} className="mx-auto mb-4 text-slate-600" />
                  <h3 className="text-white font-bold text-lg mb-2">No Conversation Selected</h3>
                  <p className="text-slate-400">Choose a customer message from the left to start replying</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
            <p className="text-slate-400 text-sm mb-2">Total Conversations</p>
            <p className="text-3xl font-bold text-white">{conversations.length}</p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
            <p className="text-slate-400 text-sm mb-2">Unread Messages</p>
            <p className="text-3xl font-bold text-red-400">{conversations.filter(c => c.unread).length}</p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
            <p className="text-slate-400 text-sm mb-2">Total Messages</p>
            <p className="text-3xl font-bold text-cyan-400">{conversations.reduce((sum, c) => sum + (c.messages?.length||0), 0)}</p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
            <p className="text-slate-400 text-sm mb-2">Logged In As</p>
            <p className="text-lg font-bold text-blue-400">🔐 Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}
