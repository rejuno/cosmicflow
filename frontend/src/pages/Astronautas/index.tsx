import { useEffect, useState } from "react";
import axios from "axios";

interface Astronaut {
  id: number;
  name: string;
  profile_image: string | null;
}

export default function Astronauts() {
  const [astronaut, setAstronaut] = useState<Astronaut | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadAstronaut() {
      try {
        const todayKey = new Date().toISOString().split("T")[0];

        const saved = localStorage.getItem("astronautOfTheDay");
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.date === todayKey) {
            setAstronaut(parsed.astronaut);
            setLoading(false);
            return;
          }
        }

        const response = await axios.get(
          "https://ll.thespacedevs.com/2.2.0/astronaut/",
          {
            params: {
              agency_ids: 44,
              limit: 50,
              format: "json",
            },
          }
        );

        const results: Astronaut[] = response.data.results;

        if (results.length === 0) {
          setError("Nenhum astronauta encontrado");
          return;
        }

        const randomIndex = Math.floor(Math.random() * results.length);
        const selectedAstronaut = results[randomIndex];

        localStorage.setItem(
          "astronautOfTheDay",
          JSON.stringify({
            date: todayKey,
            astronaut: selectedAstronaut,
          })
        );

        setAstronaut(selectedAstronaut);
      } catch (err) {
        setError("Erro ao carregar astronauta");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadAstronaut();
  }, []);

  return (
    <div
      className="group cursor-pointer flex flex-col items-center justify-center transition-all"
      onClick={() =>
        astronaut && window.open(
          `https://www.google.com/search?q=${encodeURIComponent(
            astronaut.name
          )}`,
          "_blank"
        )
      }
    >
      <div className="w-64 h-64 relative">
        
        {/* --- CARREGAMENTO BONITO --- */}
        {loading && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-primary/5 rounded-full border border-primary/10 backdrop-blur-sm">
            <div className="relative w-20 h-20">
              {/* Anel Externo */}
              <div className="absolute inset-0 border-2 border-primary/20 rounded-full"></div>
              {/* Órbita Animada */}
              <div className="absolute inset-0 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              {/* Ponto Central (Astronauta em órbita) */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full animate-pulse shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]"></div>
            </div>
            <p className="mt-4 text-primary font-cinzel text-[10px] tracking-[0.3em] animate-pulse">
              Buscando Contato...
            </p>
          </div>
        )}

        {/* --- ERRO --- */}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center text-center p-4 bg-red-50 rounded-full border border-red-100">
            <p className="text-red-500 font-sora text-xs leading-tight">{error}</p>
          </div>
        )}

        {/* --- CONTEÚDO (IMAGEM + OVERLAY) --- */}
        {astronaut && (
          <>
            {/* IMAGEM COM TRANSICÃO FADE-IN */}
            <img
              src={astronaut.profile_image ?? ""}
              alt={astronaut.name}
              className={`w-full h-full rounded-full object-cover object-top-left transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}
            />

            {/* OVERLAY (Seu Design Original) */}
            {!loading && (
              <div
                className="
                  absolute inset-0
                  rounded-full
                  bg-primary/70
                  flex items-center justify-center
                  text-secondary text-3xl font-bold font-cinzel text-center
                  opacity-0
                  transition-opacity duration-300
                  group-hover:opacity-100
                  px-4
                "
              >
                {astronaut.name}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}