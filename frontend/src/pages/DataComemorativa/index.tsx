import { useEffect, useState } from "react";
import Button from "../../components/Buttons/Buttons";
import Modal from "../../components/Modal/Modal";

type NasaApod = {
  date: string;
  title: string;
  explanation: string;
  url: string;
  media_type: "image" | "video";
};

type Language = "pt" | "en" | "es" | "ja";

export default function DataComemorativa() {
  const [data, setData] = useState<NasaApod | null>(null);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  
  // ESTADO PARA FORÇAR O COMPONENTE A ATUALIZAR QUANDO O BOTÃO FOR CLICADO
  const [isDarkMode, setIsDarkMode] = useState(() => document.documentElement.classList.contains("dark"));

  const [language] = useState<Language>(() => {
    const browserLang = navigator.language.split("-")[0];
    const supported: Language[] = ["pt", "en", "es", "ja"];
    return supported.includes(browserLang as Language) ? (browserLang as Language) : "en";
  });

  // Listener para detectar quando o seu botão no Header muda a classe do HTML
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  async function translateText(text: string, targetLang: Language) {
    if (targetLang === "en" || !text) return text;
    try {
      const res = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`
      );
      const json = await res.json();
      return json?.[0]?.map((item: any) => item[0]).join("") || text;
    } catch (error) {
      return text;
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const nasaDate = new Date(new Date().getTime() - 5 * 60 * 60 * 1000);
        const yyyy = nasaDate.getUTCFullYear();
        const mm = String(nasaDate.getUTCMonth() + 1).padStart(2, "0");
        const dd = String(nasaDate.getUTCDate()).padStart(2, "0");
        const todayStr = `${yyyy}-${mm}-${dd}`;

        const cacheKey = `nasa_today_${todayStr}_${language}`;
        const cached = localStorage.getItem(cacheKey);

        if (cached) {
          setData(JSON.parse(cached));
          setStatus("success");
          return;
        }

        const apiKey = import.meta.env.VITE_NASA_API_KEY;
        const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${todayStr}`);
        let json = await res.json();

        if (!res.ok) {
          const fallbackRes = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);
          json = await fallbackRes.json();
          if (!fallbackRes.ok) throw new Error("Erro na API");
        }

        const [translatedTitle, translatedExp] = await Promise.all([
          translateText(json.title, language),
          translateText(json.explanation, language),
        ]);

        const finalData = { ...json, title: translatedTitle, explanation: translatedExp };
        localStorage.setItem(cacheKey, JSON.stringify(finalData));
        setData(finalData);
        setStatus("success");
      } catch (err) {
        setStatus("error");
      }
    }
    fetchData();
  }, [language]);

  function formatDate(date: string) {
    const [year, month, day] = date.split("-").map(Number);
    const d = new Date(Date.UTC(year, month - 1, day));
    const langMap: Record<Language, string> = { pt: "pt-BR", en: "en-US", es: "es-ES", ja: "ja-JP" };

    return {
      day: d.toLocaleDateString(langMap[language], { day: "2-digit", timeZone: "UTC" }),
      month: d.toLocaleDateString(langMap[language], { month: "short", timeZone: "UTC" }).replace(".", "").toUpperCase(),
    };
  }

  const uiLabels = {
    pt: { loading: "Carregando...", error: "Erro 🚀", btnOpen: "Leia mais", btnClose: "Fechar" },
    en: { loading: "Loading...", error: "Error 🚀", btnOpen: "Read more", btnClose: "Close" },
    es: { loading: "Cargando...", error: "Error 🚀", btnOpen: "Leer más", btnClose: "Cerrar" },
    ja: { loading: "読み込み中...", error: "エラー 🚀", btnOpen: "もっと読む", btnClose: "閉じる" },
  };

  if (status === "loading") return <p>{uiLabels[language].loading}</p>;
  if (status === "error" || !data) return <p>{uiLabels[language].error}</p>;

  const { day, month } = formatDate(data.date);

  return (
    <>
      <section
        className="relative flex items-end w-full rounded-3xl overflow-hidden bg-cover bg-center shadow-[0_4px_12.6px_0_rgba(0,0,0,0.25)]"
        style={{ backgroundImage: data.media_type === "image" ? `url(${data.url})` : "none" }}
      >
        {/* O DESIGN QUE VOCÊ ENVIOU, AGORA REAGINDO AO ESTADO isDarkMode */}
        <div className={`w-full backdrop-blur-sm backdrop-brightness-75 px-7 py-12 2xl:p-14 gap-5 flex flex-col items-start transition-all duration-500 ${isDarkMode ? 'bg-primary/80' : 'bg-primary/70'}`}>
          
          <div className={`absolute top-3 right-4 p-3 2xl:top-8 2xl:right-8 2xl:p-5 rounded-lg text-center shadow-[0_4px_12.6px_0_rgba(0,0,0,0.25)] transition-all duration-500 ${isDarkMode ? 'bg-primary' : 'bg-light'}`}>
            <span className={`block text-xl 2xl:text-3xl font-sora font-bold ${isDarkMode ? 'text-white' : 'text-primary'}`}>
              {day}
            </span>
            <span className={`block text-lg 2xl:text-xl font-sora font-bold tracking-widest ${isDarkMode ? 'text-white' : 'text-primary'}`}>
              {month}
            </span>
          </div>

          <h2 className="text-2xl w-4/5 2xl:w-full 2xl:text-3xl mt-1 font-cinzel font-bold text-secondary line-clamp-2">
            {data.title}
          </h2>

          <p className="mt-2 text-sm 2xl:text-base font-sora font-light max-w-6xl text-secondary line-clamp-3">
            {data.explanation}
          </p>

          <Button onClick={() => setOpen(true)} text={uiLabels[language].btnOpen} />
        </div>
      </section>

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title={data.title}
        footer={<Button onClick={() => setOpen(false)} text={uiLabels[language].btnClose} />}
      >
        {data.media_type === "image" && (
          <img src={data.url} alt={data.title} className="w-full rounded-lg h-96 object-cover" />
        )}
        <p className={`mt-4 font-sora whitespace-pre-line ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
          {data.explanation}
        </p>
      </Modal>
    </>
  );
}