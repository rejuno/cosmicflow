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

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;
  if (!astronaut) return null;

  return (
    <div
  className="group relative w-64 h-64 rounded-full overflow-hidden cursor-pointer"
  onClick={() =>
    window.open(
      `https://www.google.com/search?q=${encodeURIComponent(
        astronaut.name
      )}`,
      "_blank"
    )
  }
>
  <img
    src={astronaut.profile_image ?? ""}
    alt={astronaut.name}
    className="w-full h-full object-cover"
  />

  <div
    className="
      absolute inset-0
      bg-black/70
      flex items-center justify-center
      text-white text-lg font-bold
      opacity-0
      transition-opacity duration-300
      group-hover:opacity-100
    "
  >
    {astronaut.name}
  </div>
</div>
  );
}
