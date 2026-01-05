import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
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

  // Initialize AOS animations
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      offset: 100,
      easing: 'ease-in-out',
    });

    // Check for secret admin access via query parameter
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('access') === 'admin-panel-2024') {
      setCurrentPage('admin-login');
      // Clean URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  // Refresh AOS on page change
  useEffect(() => {
    AOS.refresh();
  }, [currentPage]);

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

  // Global SPA navigation: listen for `app:navigate` events from components
  // Components can dispatch: window.dispatchEvent(new CustomEvent('app:navigate', { detail: 'dashboard' }))
  // This keeps navigation decoupled and lets buttons trigger navigation without prop drilling.
  useEffect(() => {
    const handler = (e) => {
      const target = e && e.detail;
      if (target) handleNavigation(target);
    };

    window.addEventListener('app:navigate', handler);

    // Click delegation: buttons with data-to="page" will navigate the SPA
    const clickDelegate = (ev) => {
      const btn = ev.target.closest && ev.target.closest('[data-to]');
      if (btn) {
        const dest = btn.getAttribute('data-to');
        if (dest) handleNavigation(dest);
      }
    };

    document.addEventListener('click', clickDelegate);

    return () => {
      window.removeEventListener('app:navigate', handler);
      document.removeEventListener('click', clickDelegate);
    };
  }, []);

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

  const isAdminPage = false;

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
