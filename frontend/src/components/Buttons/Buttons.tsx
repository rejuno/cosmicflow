export default function Button({ text, onClick, type = "button" }) {
  return (
    <button type={type} onClick={onClick} className="text-center text-xl font-bold uppercase bg-light text-primary font-sora rounded-lg px-6 py-2 border-transparent shadow-[0_4px_12.6px_0_rgba(0,0,0,0.25)] hover:bg-primary hover:text-light hover:border-light transition">
      {text}
    </button>
  );
}
