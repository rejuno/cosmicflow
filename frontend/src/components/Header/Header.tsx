import { useState, useEffect } from "react";
import logo from "../../assets/images/logolight.webp";
import logoDark from "../../assets/images/logodark.webp";
import moon from "../../assets/icons/darkmoon.webp";
import sun from "../../assets/icons/lightsun.webp";

export default function Header() {
  // Inicializa o estado verificando se o tema dark está salvo ou se o sistema já possui a classe
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      return saved === "dark" || document.documentElement.classList.contains("dark");
    }
    return false;
  });

  // Efeito para aplicar a classe 'dark' no documento e salvar a preferência
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <header className="flex justify-end items-center w-full pr-12 py-2">
      <div className="flex flex-row w-full pl-12 items-center justify-between 2xl:pl-0 2xl:w-4/5">
        {/* LOGO */}
        <img
          src={isDark ? logoDark : logo}
          alt="Logo Cosmic Flow"
          className="w-40"
        />

        {/* TEMA + BOTÃO */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setIsDark(!isDark)}
            aria-label="Alternar tema"
            className={`relative w-24 h-10 rounded-full p-1
              transition-colors duration-300 ease-in-out
              ${isDark ? "bg-white" : "bg-white"}
            `}
          >
            {/* CÍRCULO DESLIZANTE */}
            <span
              className={`absolute top-1 left-1 w-8 h-8 rounded-full
                flex items-center justify-center
                transition-all duration-300 ease-in-out
                ${isDark ? "translate-x-14 bg-light" : "translate-x-0 bg-primary"}
              `}
            >
              <img
                src={isDark ? moon : sun}
                alt={isDark ? "Lua" : "Sol"}
                className={`
                  w-4 h-4
                  transition-transform duration-500 ease-in-out
                  ${isDark ? "rotate-0 scale-100" : "rotate-180 scale-110"}
                `}
              />
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}