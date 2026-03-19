const COLORS = [
  { name: "Терракота", hex: "#B5472A", ral: "RAL 3009" },
  { name: "Песочный", hex: "#C4A87A", ral: "RAL 1014" },
  { name: "Антрацит", hex: "#3D3D3D", ral: "RAL 7021" },
  { name: "Слоновая кость", hex: "#F0E6D3", ral: "RAL 1015" },
  { name: "Оливковый", hex: "#6B7645", ral: "RAL 6025" },
  { name: "Шоколад", hex: "#5C3A1E", ral: "RAL 8017" },
  { name: "Бежевый", hex: "#D4C5A9", ral: "RAL 1019" },
  { name: "Белый", hex: "#F5F3EE", ral: "RAL 9010" },
];

const PRICE_PER_M2 = 750;

interface CalculatorSectionProps {
  area: string;
  setArea: (v: string) => void;
  selectedColor: typeof COLORS[number];
  setSelectedColor: (c: typeof COLORS[number]) => void;
  formData: { name: string; phone: string };
  setFormData: (d: { name: string; phone: string }) => void;
  calcSubmitted: boolean;
  sending: boolean;
  totalPrice: number;
  handleCalcSubmit: (e: React.FormEvent) => void;
}

export { COLORS };

export default function CalculatorSection({
  area,
  setArea,
  selectedColor,
  setSelectedColor,
  formData,
  setFormData,
  calcSubmitted,
  sending,
  totalPrice,
  handleCalcSubmit,
}: CalculatorSectionProps) {
  return (
    <section id="calculator" className="py-20 bg-sand-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14 section-divider pb-8">
          <span className="text-brick-600 font-body text-sm tracking-widest uppercase">Расчёт стоимости</span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mt-2">
            УЗНАЙТЕ ЦЕНУ ДЛЯ ВАШЕГО ДОМА
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-sm shadow-md border border-sand-200 overflow-hidden">
            <div className="bg-[hsl(20,40%,12%)] px-8 py-5">
              <h3 className="font-heading text-xl text-white">Калькулятор термопанелей</h3>
              <p className="text-sand-300 text-sm mt-1">Введите параметры — получите ориентировочную стоимость</p>
            </div>

            <div className="p-8">
              {!calcSubmitted ? (
                <form onSubmit={handleCalcSubmit} className="space-y-8">
                  <div>
                    <label className="block font-heading text-sm tracking-wider text-foreground mb-3 uppercase">
                      Площадь стен (м²)
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="number"
                        min="1"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        placeholder="Например: 120"
                        className="flex-1 border border-sand-300 rounded-sm px-4 py-3 text-lg font-body focus:outline-none focus:border-brick-500 bg-sand-50"
                        required
                      />
                      <span className="font-body text-muted-foreground">м²</span>
                    </div>
                  </div>

                  <div>
                    <label className="block font-heading text-sm tracking-wider text-foreground mb-3 uppercase">
                      Выберите цвет
                    </label>
                    <div className="grid grid-cols-4 gap-3">
                      {COLORS.map((color) => (
                        <button
                          key={color.ral}
                          type="button"
                          onClick={() => setSelectedColor(color)}
                          className={`flex flex-col items-center gap-2 p-3 rounded-sm border-2 transition-all ${
                            selectedColor.ral === color.ral
                              ? "border-brick-600 shadow-md scale-105"
                              : "border-sand-200 hover:border-sand-400"
                          }`}
                        >
                          <div
                            className="w-10 h-10 rounded-sm shadow-inner border border-[rgba(0,0,0,0.1)]"
                            style={{ backgroundColor: color.hex }}
                          />
                          <span className="text-xs font-body text-center text-muted-foreground leading-tight">
                            {color.name}
                          </span>
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Выбрано: <strong>{selectedColor.name}</strong> ({selectedColor.ral})
                    </p>
                  </div>

                  {area && parseFloat(area) > 0 && (
                    <div className="bg-sand-100 border border-sand-200 rounded-sm px-6 py-4 flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Ориентировочная стоимость материалов</p>
                        <p className="font-heading text-3xl font-bold text-brick-600 mt-1">
                          {totalPrice.toLocaleString("ru-RU")} ₽
                        </p>
                      </div>
                      <div className="text-right text-sm text-muted-foreground">
                        <p>{area} м²</p>
                        <p>× {PRICE_PER_M2.toLocaleString("ru-RU")} ₽/м²</p>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-heading text-sm tracking-wider text-foreground mb-2 uppercase">
                        Ваше имя
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Иван Иванов"
                        className="w-full border border-sand-300 rounded-sm px-4 py-3 font-body focus:outline-none focus:border-brick-500 bg-sand-50"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-heading text-sm tracking-wider text-foreground mb-2 uppercase">
                        Телефон
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+7 (___) ___-__-__"
                        className="w-full border border-sand-300 rounded-sm px-4 py-3 font-body focus:outline-none focus:border-brick-500 bg-sand-50"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full bg-brick-600 hover:bg-brick-500 disabled:opacity-60 text-white py-4 font-heading text-lg tracking-wider transition-all hover:scale-[1.02] rounded-sm"
                  >
                    {sending ? 'ОТПРАВЛЯЕМ...' : 'ХОЧУ УЗНАТЬ ЦЕНУ ДЛЯ СВОЕГО ДОМА'}
                  </button>
                  <p className="text-xs text-muted-foreground text-center">
                    * Точная стоимость зависит от сложности монтажа. Менеджер уточнит детали.
                  </p>
                </form>
              ) : (
                <div className="text-center py-12">
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="font-heading text-2xl font-bold text-foreground mb-2">Заявка принята!</h3>
                  <p className="text-muted-foreground">
                    Менеджер свяжется с вами в течение 15 минут и уточнит все детали расчёта.
                  </p>
                  {area && (
                    <div className="mt-6 bg-sand-100 rounded-sm px-6 py-4 inline-block">
                      <p className="text-sm text-muted-foreground">Предварительная стоимость</p>
                      <p className="font-heading text-3xl font-bold text-brick-600">{totalPrice.toLocaleString("ru-RU")} ₽</p>
                      <p className="text-xs text-muted-foreground mt-1">{selectedColor.name} · {area} м²</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
