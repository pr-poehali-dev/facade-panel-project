import { useState, useRef, useCallback } from "react";

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeLabel = "ДО",
  afterLabel = "ПОСЛЕ",
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(42);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const getPosition = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = clientX - rect.left;
    const pct = Math.min(Math.max((x / rect.width) * 100, 2), 98);
    setPosition(pct);
  }, []);

  const onMouseDown = () => setDragging(true);
  const onMouseMove = (e: React.MouseEvent) => { if (dragging) getPosition(e.clientX); };
  const onMouseUp = () => setDragging(false);
  const onTouchMove = (e: React.TouchEvent) => getPosition(e.touches[0].clientX);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden select-none cursor-col-resize"
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      {/* ПОСЛЕ (фон) */}
      <img src={afterSrc} alt="После" className="absolute inset-0 w-full h-full object-cover" draggable={false} />

      {/* ДО (обрезается по position) */}
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }}>
        <img src={beforeSrc} alt="До" className="absolute inset-0 w-full h-full object-cover" style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : "100vw" }} draggable={false} />
      </div>

      {/* Разделитель */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_12px_rgba(0,0,0,0.5)] z-20"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
        onMouseDown={onMouseDown}
        onTouchStart={() => setDragging(true)}
        onTouchMove={onTouchMove}
        onTouchEnd={() => setDragging(false)}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center gap-1 border border-gray-200">
          <span className="text-gray-600 text-xs">◀▶</span>
        </div>
      </div>

      {/* Лейблы */}
      <div className="absolute top-6 left-5 z-10 bg-[rgba(20,12,6,0.75)] text-white text-sm font-heading tracking-widest px-3 py-1.5 rounded-sm backdrop-blur-sm pointer-events-none">
        {beforeLabel}
      </div>
      <div className="absolute top-6 right-5 z-10 bg-brick-600 text-white text-sm font-heading tracking-widest px-3 py-1.5 rounded-sm pointer-events-none">
        {afterLabel}
      </div>
    </div>
  );
}
