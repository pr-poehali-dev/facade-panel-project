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

export default function GallerySection() {
  return (
    <section id="gallery" className="py-20 bg-concrete-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14 section-divider pb-8">
          <span className="text-brick-600 font-body text-sm tracking-widest uppercase">Галерея</span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mt-2">
            НАШИ РАБОТЫ
          </h2>
          <p className="text-muted-foreground mt-3">Реальные объекты, сданные нашей командой</p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {[
            "https://cdn.poehali.dev/files/921744b7-4842-49bf-ae28-7702ee760527.jpg",
            "https://cdn.poehali.dev/files/dbf0a448-dd53-4d3c-9f1c-81844c22fe28.jpg",
            "https://cdn.poehali.dev/files/e10e2ba7-f48a-49d8-a037-ff8a5dbdbc2b.jpeg",
            "https://cdn.poehali.dev/files/9ac3633b-412f-4045-b3ef-c38afbb9ab12.png",
            "https://cdn.poehali.dev/files/adccdab1-81eb-4484-a599-40ec880d91c6.png",
            "https://cdn.poehali.dev/files/ee7b04f3-96d3-410b-ae03-1b8eda908333.png",
            "https://cdn.poehali.dev/files/c53255af-e654-4142-9f18-a1de8b2193ea.jpg",
            "https://cdn.poehali.dev/files/3622dd9e-bcde-4e2a-a1df-ed80c47f0b9d.png",
          ].map((src, i) => (
            <div key={i} className="break-inside-avoid overflow-hidden rounded-sm shadow-md hover:shadow-xl transition-shadow">
              <img
                src={src}
                alt={`Работа ${i + 1}`}
                className="w-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>

        <div className="bg-white rounded-sm shadow-sm border border-sand-200 p-8 mt-12">
          <h3 className="font-heading text-xl font-semibold text-foreground mb-6 text-center">
            ПАЛИТРА ЦВЕТОВ RAL
          </h3>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-4">
            {COLORS.map((c) => (
              <div key={c.ral} className="flex flex-col items-center gap-2">
                <div
                  className="w-12 h-12 rounded-sm shadow-inner border border-[rgba(0,0,0,0.1)] hover:scale-110 transition-transform cursor-pointer"
                  style={{ backgroundColor: c.hex }}
                  title={`${c.name} (${c.ral})`}
                />
                <span className="text-xs text-muted-foreground text-center leading-tight">{c.name}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-6">
            Показаны базовые цвета. Доступно <strong>100+ цветов RAL</strong> — уточняйте при заказе.
          </p>
        </div>
      </div>
    </section>
  );
}
