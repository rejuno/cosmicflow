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
            `/api/sky?lat=${latitude}&lon=${longitude}`
          );

          const data = await res.json();

          if (!data.imageUrl) {
            setError("Não foi possível carregar o céu");
          } else {
            setImageUrl(data.imageUrl);
          }
        } catch (err) {
          setError("Erro ao carregar o céu");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("Permissão de localização negada");
        setLoading(false);
      }
    );
  }, []);

  if (loading) {
    return <p className="text-white text-center">Carregando céu...</p>;
  }

  if (error) {
    return <p className="text-red-400 text-center">{error}</p>;
  }

  return (
    <div className="max-w-full">
      <img
        src={imageUrl!}
        alt="Céu local"
        className="rounded-xl w-80 h-80 object-cover"
      />
    </div>
  );
}
