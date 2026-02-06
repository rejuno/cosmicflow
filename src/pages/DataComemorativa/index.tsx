import { useEffect, useState } from "react";

type NasaApod = {
  date: string;
  title: string;
  explanation: string;
  url: string;
  media_type: "image" | "video";
};

export default function DataComemorativa() {
  const [data, setData] = useState<NasaApod | null>(null);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `https://api.nasa.gov/planetary/apod?api_key=${import.meta.env.VITE_NASA_API_KEY}`
        );
        const json = await res.json();

        if (!res.ok || json.error) {
          throw new Error("Erro na API da NASA");
        }

        setData(json);
        setStatus("success");
      } catch (err) {
        setStatus("error");
      }
    }

    fetchData();
  }, []);

  if (status === "loading") {
    return <p>Carregando data comemorativa da NASA...</p>;
  }

  if (status === "error" || !data) {
    return <p>Erro ao carregar dados da NASA 🚀</p>;
  }

  return (
    <>
      <section className="nasa-card">
        <p>{data.date}</p>
        <h2>{data.title}</h2>

        {data.media_type === "image" && (
          <img
            src={data.url}
            alt={data.title}
            onClick={() => setOpen(true)}
            style={{ cursor: "pointer" }}
          />
        )}

        <p>{data.explanation.substring(0, 120)}...</p>

        <button onClick={() => setOpen(true)}>Leia mais</button>
      </section>

      {open && (
        <div className="modal-overlay" onClick={() => setOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{data.title}</h2>

            {data.media_type === "image" && (
              <img src={data.url} alt={data.title} />
            )}

            <p>{data.explanation}</p>

            <button onClick={() => setOpen(false)}>Fechar</button>
          </div>
        </div>
      )}
    </>
  );
}
