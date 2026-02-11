import { useEffect, useState } from "react";

export default function CeuLocal() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocalização não suportada");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const res = await fetch(
            `http://localhost:3000/api/sky?lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();

          if (!data.imageUrl) {
            setError("Não foi possível carregar o céu");
          } else {
            setImageUrl(data.imageUrl);
          }
        } catch (err) {
          console.error(err);
          setError("Erro ao carregar o céu");
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        console.error(err);
        setError("Localização negada");
        setLoading(false);
      }
    );
  }, []);

  return (
    <div className="relative w-full h-60 overflow-hidden rounded-xl bg-primary/10 border border-white/20 shadow-inner">
      
      {/* --- ESTADO: CARREGANDO (ÓRBITA) --- */}
      {loading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/20 backdrop-blur-sm transition-all duration-500">
          <div className="relative flex items-center justify-center">
            {/* Órbita */}
            <div className="absolute w-12 h-12 border border-primary/20 rounded-full"></div>
            {/* Planeta Girando */}
            <div className="absolute w-12 h-12 border-t-2 border-primary rounded-full animate-spin"></div>
            {/* Núcleo Pulsante */}
            <div className="w-3 h-3 bg-primary rounded-full shadow-[0_0_12px_#your-primary-color] animate-pulse"></div>
          </div>
        </div>
      )}

      {/* --- ESTADO: ERRO --- */}
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
          <span className="text-3xl mb-2">🔭</span>
          <p className="text-primary/70 font-sora text-sm italic">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 text-[10px] uppercase tracking-widest text-primary border border-primary/30 px-2 py-1 rounded hover:bg-primary hover:text-white transition-all"
          >
            Tentar novamente
          </button>
        </div>
      )}

      {/* --- ESTADO: SUCESSO --- */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Céu local"
          className={`w-full h-full object-cover transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}
        />
      )}

      {/* Overlay de gradiente para dar profundidade à imagem */}
      {!loading && imageUrl && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
      )}
    </div>
  );
}