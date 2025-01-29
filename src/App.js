import { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import ArticleList from './components/ArticleList';
import MarketData from './components/MarketData';
import ArticleForm from './components/ArticleForm';
import './App.css';

export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 'light'
  );
  const [articles, setArticles] = useState([]);
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleTheme = () => {
    setTheme(curr => {
      const newTheme = curr === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Simulated API calls (replace with real endpoints)
        const [articlesResponse, cryptoResponse] = await Promise.all([
          axios.get('https://api.example.com/articles'),
          axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=10')
        ]);

        setArticles(articlesResponse.data);
        setCryptoData(cryptoResponse.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="App" id={theme}>
        <Router>
          <Navbar />
          {loading ? (
            <div className="loading-spinner">Loading...</div>
          ) : (
            <Routes>
              <Route path="/" element={
                <ArticleList articles={articles} />
              } />
              <Route path="/markets" element={
                <MarketData data={cryptoData} />
              } />
              <Route path="/submit" element={
                <ArticleForm setArticles={setArticles} />
              } />
            </Routes>
          )}
        </Router>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;