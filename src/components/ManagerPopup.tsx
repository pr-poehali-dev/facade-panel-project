import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

export default function ManagerPopup() {
  const [visible, setVisible] = useState(false);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem("manager_popup_shown");
    if (alreadyShown) return;

    const timer = setTimeout(() => {
      setVisible(true);
      sessionStorage.setItem("manager_popup_shown", "1");
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    setVisible(false);
    document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setClosed(true);
    setTimeout(() => setVisible(false), 200);
  };

  if (!visible) return null;

  return (
    <div
      onClick={handleClick}
      className={`fixed bottom-5 right-5 z-[60] max-w-[300px] bg-white rounded-sm shadow-2xl border border-sand-200 p-4 cursor-pointer transition-all duration-300 ${
        closed ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0 animate-fade-up"
      }`}
    >
      <button
        onClick={handleClose}
        className="absolute -top-2 -right-2 w-6 h-6 bg-[hsl(20,40%,12%)] hover:bg-brick-600 text-white rounded-full flex items-center justify-center transition-colors"
        aria-label="Закрыть"
      >
        <Icon name="X" size={14} />
      </button>
      <div className="flex items-start gap-3">
        <div className="w-11 h-11 rounded-full bg-brick-600 flex items-center justify-center flex-shrink-0 text-white font-heading text-lg">
          А
        </div>
        <div>
          <p className="font-heading text-sm text-foreground mb-1">Андрей, менеджер</p>
          <p className="text-sm text-muted-foreground leading-snug">
            Здравствуйте, меня зовут Андрей! Приглашаю рассчитать стоимость вашего объекта
          </p>
        </div>
      </div>
    </div>
  );
}