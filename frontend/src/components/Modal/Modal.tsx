import { ReactNode, useEffect } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  closeOnOverlayClick?: boolean;
};

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  closeOnOverlayClick = true,
}: ModalProps) {
  // Bloqueia scroll do body
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Fecha com ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={closeOnOverlayClick ? onClose : undefined}
      />

      {/* Modal */}
      <div className="
        relative z-10
        w-full max-w-3xl
        max-h-[90vh]
        bg-white rounded-2xl shadow-xl
        flex flex-col
        mx-4
      ">
        {/* Header */}
        {(title || onClose) && (
          <div className="flex items-center justify-between border-b px-6 py-4 shrink-0">
            {title && (
              <h2 className="text-2xl font-bold font-cinzel text-primary">
                {title}
              </h2>
            )}

            <button
              onClick={onClose}
              className="text-primary text-xl bg-transparent border-none hover:text-black"
              aria-label="Fechar modal"
            >
              ✕
            </button>
          </div>
        )}

        {/* Body (scroll aqui) */}
        <div className="flex-1 overflow-y-auto px-6 py-4 text-primary font-sora text-base font-light gap-4 flex flex-col">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="border-t px-6 py-4 flex justify-end gap-2 shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
