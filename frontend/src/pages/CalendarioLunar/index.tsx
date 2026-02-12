import { useEffect, useRef, useState } from "react";
import Modal from "../../components/Modal/Modal";
import Button from "../../components/Buttons/Buttons";

type NasaApod = {
  date: string;
  title: string;
  explanation: string;
  url?: string;
  media_type?: "image" | "video";
};

type Language = "pt" | "en" | "es" | "ja";

const i18n = {
  pt: {
    weekDays: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
    months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
    btnFechar: "Fechar", loading: "Carregando...", prev: "Mês anterior", next: "Próximo mês", connector: "de"
  },
  en: {
    weekDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    btnFechar: "Close", loading: "Loading...", prev: "Previous month", next: "Next month", connector: ""
  },
  es: {
    weekDays: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
    months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Outubro", "Noviembre", "Diciembre"],
    btnFechar: "Cerrar", loading: "Cargando...", prev: "Mes anterior", next: "Próximo mes", connector: "de"
  },
  ja: {
    weekDays: ["日", "月", "火", "水", "木", "金", "土"],
    months: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
    btnFechar: "閉じる", loading: "読み込み中...", prev: "前月", next: "来月", connector: ""
  }
};

function getMonthInfo(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  return { firstDay, daysInMonth };
}

function createLocalDate(year: number, month: number, day: number) {
  return new Date(year, month, day, 12);
}

export default function CalendarioLunar() {
  const today = new Date();
  const todayLocal = createLocalDate(today.getFullYear(), today.getMonth(), today.getDate());

  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [data, setData] = useState<NasaApod | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [language] = useState<Language>(() => {
    const browserLang = navigator.language.split("-")[0];
    const supported: Language[] = ["pt", "en", "es", "ja"];
    return supported.includes(browserLang as Language) ? (browserLang as Language) : "en";
  });

  const texts = i18n[language];

  // --- ESCUTA O TEMA ---
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains("dark"));
  useEffect(() => {
    const observer = new MutationObserver(() => setIsDark(document.documentElement.classList.contains("dark")));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  async function translateText(text: string, targetLang: Language) {
    if (targetLang === "en" || !text) return text;
    try {
      const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`);
      const json = await res.json();
      return json[0].map((item: any) => item[0]).join("");
    } catch { return text; }
  }

  function formatDayMonth(dateStr: string) {
    const d = new Date(dateStr + "T12:00:00");
    const langLocale = { pt: "pt-BR", en: "en-US", es: "es-ES", ja: "ja-JP" }[language];
    return {
      day: d.toLocaleDateString(langLocale, { day: "2-digit" }),
      month: d.toLocaleDateString(langLocale, { month: "short" }).replace(".", "").toUpperCase()
    };
  }

  const { firstDay, daysInMonth } = getMonthInfo(year, month);
  const yearsRange = Array.from({ length: today.getFullYear() + 10 - 1995 + 1 }, (_, i) => 1995 + i);

  async function openDay(date: string) {
    setLoading(true);
    const cacheKey = `nasa_${date}_${language}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      setData(JSON.parse(cached));
      setOpenModal(true);
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${import.meta.env.VITE_NASA_API_KEY}&date=${date}`);
      const json = await res.json();
      const [tTitle, tExp] = await Promise.all([translateText(json.title, language), translateText(json.explanation, language)]);
      const finalData = { ...json, title: tTitle, explanation: tExp };
      localStorage.setItem(cacheKey, JSON.stringify(finalData));
      setData(finalData);
      setOpenModal(true);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  }

  return (
    <>
      {/* --- OVERLAY DE CARREGAMENTO --- */}
      {loading && (
        <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-black/60 backdrop-blur-md transition-opacity duration-300">
          <div className="relative flex items-center justify-center">
            <div className="absolute w-24 h-24 border-2 border-primary/30 rounded-full"></div>
            <div className={`absolute w-24 h-24 border-t-4 rounded-full animate-spin ${isDark ? 'border-secondary' : 'border-primary'}`}></div>
            <div className={`w-6 h-6 rounded-full shadow-[0_0_20px_rgba(var(--primary-rgb),0.8)] animate-pulse ${isDark ? 'bg-secondary' : 'bg-primary'}`}></div>
          </div>
          <span className={`mt-8 font-cinzel text-lg tracking-[0.2em] animate-pulse uppercase ${isDark ? 'text-secondary' : 'text-primary'}`}>
            {texts.loading}
          </span>
        </div>
      )}

      {/* --- CONTAINER PRINCIPAL --- */}
      <section className="relative w-full mx-auto p-5 rounded-2xl space-y-6 bg-primary/20 backdrop-blur-lg border border-white/30 shadow-lg transition-all duration-500">
        
        {/* HEADER */}
        <div className="flex flex-col p-0 2xl:flex-row items-center gap-4 2xl:gap-2 justify-between 2xl:px-14">
          <h1 className={`text-2xl 2xl:text-3xl font-bold font-cinzel transition-colors duration-500 ${isDark ? 'text-secondary' : 'text-primary'}`}>
            {texts.months[month]} {texts.connector} {year}
          </h1>

          <div className="flex items-center gap-0 2xl:gap-2">
            <button onClick={() => setMonth(m => m === 0 ? (setYear(y => y-1), 11) : m - 1)} className={`bg-transparent text-lg border-none cursor-pointer hover:scale-125 transition-transform ${isDark ? 'text-secondary' : 'text-primary'}`}>◀</button>
            <select value={month} onChange={(e) => setMonth(Number(e.target.value))} className={`text-2xl bg-transparent font-sora rounded-lg px-3 py-2 border-none focus:ring-0 outline-none ${isDark ? 'text-secondary' : 'text-primary'}`}>
              {texts.months.map((m, i) => <option key={m} value={i} className="text-black ">{m}</option>)}
            </select>
            <select value={year} onChange={(e) => setYear(Number(e.target.value))} className={`bg-transparent text-2xl font-sora rounded-lg px-3 py-2 border-none focus:ring-0 outline-none ${isDark ? 'text-secondary' : 'text-primary'}`}>
              {yearsRange.map((y) => <option key={y} value={y} className="text-black">{y}</option>)}
            </select>
            <button onClick={() => setMonth(m => m === 11 ? (setYear(y => y+1), 0) : m + 1)} className={`bg-transparent text-lg border-none cursor-pointer hover:scale-125 transition-transform ${isDark ? 'text-secondary' : 'text-primary'}`}>▶</button>
          </div>
        </div>

        {/* DIAS DA SEMANA */}
        <div className="grid grid-cols-7 text-center font-bold text-xl 2xl:text-2xl text-primary font-sora bg-light p-2 rounded-t-lg">
          {texts.weekDays.map((d) => <div key={d}>{d}</div>)}
        </div>

        {/* CALENDÁRIO GRID */}
        <div className="grid grid-cols-7 gap-y-6 gap-x-2 min-h-[330px] text-xl 2xl:text-3xl font-sora font-extrabold">
          {Array.from({ length: 42 }).map((_, index) => {
            const dayNumber = index - firstDay + 1;
            if (dayNumber < 1 || dayNumber > daysInMonth) return <div key={index} />;
            
            const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(dayNumber).padStart(2, "0")}`;
            const isToday = year === today.getFullYear() && month === today.getMonth() && dayNumber === today.getDate();
            const isFuture = createLocalDate(year, month, dayNumber) > todayLocal;

            // --- Lógica de Estilo: Totalmente transparente por padrão ---
            let dayStyle = isDark 
              ? "bg-transparent text-white hover:bg-secondary hover:text-primary" 
              : "bg-transparent text-primary hover:bg-primary hover:text-white";
            
            if (isToday) {
              dayStyle = "bg-light text-primary font-bold shadow-md scale-110";
            }
            if (isFuture) {
              dayStyle = isDark 
                ? "bg-transparent text-white/20 cursor-not-allowed" 
                : "bg-transparent text-primary/30 cursor-not-allowed";
            }

            return (
              <button
                key={dateStr}
                onClick={() => openDay(dateStr)}
                disabled={loading || isFuture}
                className={`relative h-10 w-10 mx-auto rounded-xl flex items-center justify-center transition-all duration-300 border-none outline-none focus:ring-0 ${dayStyle}`}
              >
                {dayNumber}
              </button>
            );
          })}
        </div>
      </section>

      {/* --- MODAL --- */}
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)} title={data?.title} footer={<Button onClick={() => setOpenModal(false)} text={texts.btnFechar} />}>
        {data && (
          <>
            {data.media_type === "image" && data.url && (
              <img src={data.url} alt={data.title} className="w-full rounded-lg h-96 object-cover shadow-inner" />
            )}
            <p className={`mt-4 font-sora text-xl font-normal whitespace-pre-line text-primary`}>
              {data.explanation}
            </p>
          </>
        )}
      </Modal>
    </>
  );
}