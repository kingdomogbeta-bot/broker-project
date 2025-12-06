import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import MarketsPage from './pages/MarketsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleNavigation = (page) => {
    if (page === 'logout') {
      setIsLoggedIn(false);
      setUser(null);
      setCurrentPage('home');
    } else if (page === 'login') {
      setCurrentPage('login');
    } else if (page === 'register') {
      setCurrentPage('register');
    } else if (page === 'dashboard') {
      setIsLoggedIn(true);
      setCurrentPage('dashboard');
    } else {
      setCurrentPage(page);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage onNavigate={handleNavigation} />;
      case 'register':
        return <RegisterPage onNavigate={handleNavigation} />;
      case 'dashboard':
        return isLoggedIn ? <Dashboard /> : <HomePage onNavigate={handleNavigation} />;
      case 'markets':
        return <MarketsPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'home':
      default:
        return <HomePage onNavigate={handleNavigation} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <Header isLoggedIn={isLoggedIn} onNavigate={handleNavigation} currentPage={currentPage} />
      <main>
        {renderPage()}
      </main>
      <Footer />
      <ChatBot onChatOpen={() => {}} />
    </div>
  );
}

export default App;
