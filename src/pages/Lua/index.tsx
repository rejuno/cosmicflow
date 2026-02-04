import { useEffect, useState } from "react";
import axios from "axios";

import crescenteGibosa from "./assets/images/crescentegibosa.webp"
import luaCheia from "./assets/images/luacheia.webp"
import luaCrescente from "./assets/images/luacrescente.webp"
import luaMinguante from "./assets/images/luaminguante.webp"
import luaNova from "./assets/images/luanova.webp"
import minguanteGibosa from "./assets/images/minguantegibosa.webp"
import quartoCrescente from "./assets/images/quartocrescente.webp"
import quartoMinguante from "./assets/images/quartominguante.webp"


interface MoonPhase {
  moon_phase: string;
}

export default function Lua() {
  const [moon, setMoon] = useState<MoonPhase | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadMoonPhase() {
      try {
        const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

        const response = await axios.get(
          "https://api.weatherapi.com/v1/astronomy.json",
          {
            params: {
              key: apiKey,
              q: "São Paulo"
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

  if (loading) return <p>Carregando fase da lua...</p>;
  if (error) return <p>{error}</p>;
  if (!moon) return null;

function renderMoonPhase(phase: string){
    switch(phase) {
    case "New Moon": 
        return(
            <div className = "gap-8 flex flex-col items-center text-center">
            <img src={luaNova} alt="Lua Nova" />
            <p className="text-black capitalize">
                Lua Nova
            </p>
            </div>
        );

    case "Waxing Crescent": 
        return(
            <div className = "gap-8 flex flex-col items-center text-center">
            <img src={luaCrescente} alt="Lua Crescente" />
            <p className="text-black capitalize">
                Lua Crescente
            </p>
            </div>
        );
    
    case "First Quarter": 
        return(
            <div className = "gap-8 flex flex-col items-center text-center">
            <img src={quartoCrescente} alt="Quarto Crescente" />
            <p className="text-black capitalize">
                Quarto Crescente
            </p>
            </div>
        );
    
    case "Waxing Gibbous": 
        return(
            <div className = "gap-8 flex flex-col items-center text-center">
            <img src={crescenteGibosa} alt="Gibosa Crescente" />
            <p className="text-black capitalize">
                Gibosa Crescente
            </p>
            </div>
        );
    
    case "Full Moon": 
        return(
            <div className = "gap-8 flex flex-col items-center text-center">
            <img src={luaCheia} alt="Lua Cheia" />
            <p className="text-black capitalize">
                Lua Cheia
            </p>
            </div>
        );
    
    case "Waning Gibbous": 
        return(
            <div className = "gap-8 flex flex-col items-center text-center">
            <img src={minguanteGibosa} alt="Gibosa Minguante" />
            <p className="text-black capitalize">
                Gibosa Minguante
            </p>
            </div>
        );
    
    case "Last Quarter": 
        return(
            <div className = "gap-8 flex flex-col items-center text-center">
            <img src={quartoMinguante} alt="Quarto Minguante" />
            <p className="text-black capitalize">
                Quarto Minguante
            </p>
            </div>
        );
    
    case "Waning Crescent": 
        return(
            <div className = "gap-8 flex flex-col items-center text-center">
            <img src={luaMinguante} alt="Lua Minguante" />
            <p className="text-black capitalize">
                Lua Minguante
            </p>
            </div>
        );


}
}


  return (
    <div className="rounded-2xl bg-white p-6  gap-2 w-64">

    {renderMoonPhase(moon.moon_phase)}
    </div>
  );
}
