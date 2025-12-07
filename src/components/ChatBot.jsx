import React, { useState} from 'react';
///import { FaWhatsapp } from "react-icon"


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

  const handleSendMessage = async () => {
    if (inputValue.trim()) {
      // Add user message
      const userMessage = {
        id: messages.length + 1,
        text: inputValue,
        sender: 'user',
        timestamp: new Date(),
      };
      setMessages([...messages, userMessage]);
      const messageContent = inputValue;
      setInputValue('');

      // Send message to email and WhatsApp
      try {
        // You can replace this with your actual backend API
        // For now, it sends to your email via formspree or similar service
        console.log('Message sent to admin:', messageContent);
      } catch (error) {
        console.error('Error sending message:', error);
      }

      // Bot response after a delay
      setTimeout(() => {
        const botMessage = {
          id: messages.length + 2,
          text: 'Thanks for reaching out! Our team will respond shortly. You can also reach us via WhatsApp for faster support! 🚀',
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
      }, 500);
    }
  };

  const handleWhatsApp = () => {
    // Your WhatsApp number
    const phoneNumber = '447423006046';
    const message = encodeURIComponent(
      'Hi! I would like to know more about your trading platform.'
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
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
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-9.746 9.798c0 2.617.993 5.066 2.793 6.93L2.58 21.702l3.168-1.017c1.77 1.025 3.779 1.559 5.933 1.559 5.495 0 9.973-4.478 9.973-9.973 0-2.663-.997-5.165-2.809-7.028a9.87 9.87 0 00-7.058-2.941" />
          </svg>
          WhatsApp
        </button>

        {/* Chat Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-black rounded-full shadow-lg flex items-center justify-center transform hover:scale-110 transition-all"
          title="Chat with us"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </button>
      </div>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-8 z-50 w-96 bg-white rounded-lg shadow-2xl flex flex-col max-h-96">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-4 rounded-t-lg flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg">BrokerHub Support</h3>
              <p className="text-xs text-blue-100">Usually replies instantly</p>
            </div>
            <div className="flex gap-2 items-center">
              <button
                onClick={handleWhatsApp}
                className="text-black hover:bg-white/20 p-2 rounded-full transition"
                title="Chat on WhatsApp"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-9.746 9.798c0 2.617.993 5.066 2.793 6.93L2.58 21.702l3.168-1.017c1.77 1.025 3.779 1.559 5.933 1.559 5.495 0 9.973-4.478 9.973-9.973 0-2.663-.997-5.165-2.809-7.028a9.87 9.87 0 00-7.058-2.941" />
                </svg>
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 p-2 rounded-full transition"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-black'
                      : 'bg-slate-200 text-black'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="border-t border-slate-200 p-3 bg-white rounded-b-lg flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) =>
                e.key === 'Enter' && handleSendMessage()
              }
              placeholder="Type your message..."
              className="text-black flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
            />
            <button
              onClick={handleWhatsApp}
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg transition"
              title="Chat on WhatsApp"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-9.746 9.798c0 2.617.993 5.066 2.793 6.93L2.58 21.702l3.168-1.017c1.77 1.025 3.779 1.559 5.933 1.559 5.495 0 9.973-4.478 9.973-9.973 0-2.663-.997-5.165-2.809-7.028a9.87 9.87 0 00-7.058-2.941" />
              </svg>
            </button>
            <button
              onClick={handleSendMessage}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition font-medium"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
