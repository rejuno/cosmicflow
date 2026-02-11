import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Dashboard from './Dashboard'
import Header from './components/Header/Header';
import fundoLight from './assets/images/fundolightmode.webp'
import fundoDark from './assets/images/fundodarkmode.webp'

// Criamos um Wrapper para o App para podermos usar o useEffect e monitorar a classe dark
const App = () => {
  const [currentBg, setCurrentBg] = useState(fundoLight);

  useEffect(() => {
    // Função para atualizar o fundo baseado na classe do HTML
    const updateBackground = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setCurrentBg(isDark ? fundoDark : fundoLight);
    };

    // Atualiza ao montar o componente
    updateBackground();

    // Cria um observador para detectar quando a classe 'dark' muda no HTML
    const observer = new MutationObserver(updateBackground);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="min-h-screen bg-cover bg-center transition-all duration-700 ease-in-out"
      style={{ backgroundImage: `url(${currentBg})` }}
    >
      <Header />
      <Dashboard />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)