import { useEffect, useState } from "react";
import axios from "axios";

import crescenteGibosa from "./assets/images/crescentegibosa.webp";
import luaCheia from "./assets/images/luacheia.webp";
import luaCrescente from "./assets/images/luacrescente.webp";
import luaMinguante from "./assets/images/luaminguante.webp";
import luaNova from "./assets/images/luanova.webp";
import minguanteGibosa from "./assets/images/minguantegibosa.webp";
import quartoCrescente from "./assets/images/quartocrescente.webp";
import quartoMinguante from "./assets/images/quartominguante.webp";

interface MoonPhase {
  moon_phase: string;
}

type Language = "pt" | "en" | "es" | "ja";

export default function Lua() {
  const [moon, setMoon] = useState<MoonPhase | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [language] = useState<Language>(() => {
    const browserLang = navigator.language.split('-')[0];
    const supported: Language[] = ["pt", "en", "es", "ja"];
    return supported.includes(browserLang as Language) ? (browserLang as Language) : "en";
  });

  // Textos de carregamento por idioma
  const loadingLabels = {
    pt: "Observando a lua...",
    en: "Observing the moon...",
    es: "Observando la luna...",
    ja: "月を観察中..."
  };

  useEffect(() => {
    async function loadMoonPhase() {
      try {
        const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
        const response = await axios.get(
          "https://api.weatherapi.com/v1/astronomy.json",
          {
            params: {
              key: apiKey,
              q: "São Paulo",
            },
          }
        );
        setMoon(response.data.astronomy.astro);
      } catch (err) {
        setError("Erro ao carregar fase da lua");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadMoonPhase();
  }, []);

  const moonPhasesMap: Record<string, { img: string; size: string; labels: Record<Language, string> }> = {
    "New Moon": { 
      img: luaNova, size: "w-40", 
      labels: { pt: "Lua Nova", en: "New Moon", es: "Luna Nueva", ja: "新月" } 
    },
    "Waxing Crescent": { 
      img: luaCrescente, size: "w-24", 
      labels: { pt: "Lua Crescente", en: "Waxing Crescent", es: "Luna Creciente", ja: "三日月" } 
    },
    "First Quarter": { 
      img: quartoCrescente, size: "w-24", 
      labels: { pt: "Quarto Crescente", en: "First Quarter", es: "Cuarto Creciente", ja: "上弦の月" } 
    },
    "Waxing Gibbous": { 
      img: crescenteGibosa, size: "w-32", 
      labels: { pt: "Crescente Gibosa", en: "Waxing Gibbous", es: "Gibosa Creciente", ja: "十三夜月" } 
    },
    "Full Moon": { 
      img: luaCheia, size: "w-40 pl-3", 
      labels: { pt: "Lua Cheia", en: "Full Moon", es: "Luna Llena", ja: "満月" } 
    },
    "Waning Gibbous": { 
      img: minguanteGibosa, size: "w-32 pr-3", 
      labels: { pt: "Minguante Gibosa", en: "Waning Gibbous", es: "Gibosa Menguante", ja: "寝待月" } 
    },
    "Last Quarter": { 
      img: quartoMinguante, size: "w-24", 
      labels: { pt: "Quarto Minguante", en: "Last Quarter", es: "Cuarto Menguante", ja: "下弦の月" } 
    },
    "Waning Crescent": { 
      img: luaMinguante, size: "w-24", 
      labels: { pt: "Lua Minguante", en: "Waning Crescent", es: "Luna Menguante", ja: "有明月" } 
    },
  };

  return (
    <div className="relative rounded-2xl bg-white p-6 w-full min-h-[320px] flex items-center justify-center shadow-sm border border-gray-100">
      
      {/* --- ANIMAÇÃO DE LOADING --- */}
      {loading && (
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="relative w-16 h-16">
            {/* Círculo de fundo */}
            <div className="absolute inset-0 border-4 border-primary/10 rounded-full"></div>
            {/* Círculo animado */}
            <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            {/* Ponto central pulsante */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          </div>
          <p className="text-primary font-sora text-sm tracking-widest animate-pulse uppercase font-medium">
            {loadingLabels[language]}
          </p>
        </div>
      )}

      {/* --- MENSAGEM DE ERRO --- */}
      {!loading && error && (
        <div className="text-center">
          <p className="text-red-400 font-sora">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-2 text-xs text-primary underline"
          >
            Tentar novamente
          </button>
        </div>
      )}

      {/* --- CONTEÚDO DA LUA --- */}
      {!loading && moon && (
        <div className="animate-in fade-in zoom-in duration-700 w-full">
          {(() => {
            const phaseData = moonPhasesMap[moon.moon_phase];
            if (!phaseData) return null;

            return (
              <div className="flex flex-col items-center text-center p-0 justify-center gap-7 h-[240px]">
                <img 
                  src={phaseData.img} 
                  alt={phaseData.labels[language]} 
                  className={`${phaseData.size} drop-shadow-2xl`} 
                />
                <p className="text-primary font-cinzel text-xl font-bold uppercase tracking-wide">
                  {phaseData.labels[language]}
                </p>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}