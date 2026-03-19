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
            "https://cdn.poehali.dev/projects/1828de66-2b38-4ca3-93cd-9c07400f2c1a/bucket/72118a27-4f74-415f-9c4d-00d96cc4e74c.png",
            "https://cdn.poehali.dev/projects/1828de66-2b38-4ca3-93cd-9c07400f2c1a/bucket/96098e22-b80f-40b6-bd8b-011e19187fb6.png",
            "https://cdn.poehali.dev/projects/1828de66-2b38-4ca3-93cd-9c07400f2c1a/bucket/17db3ec0-a595-4232-9f7d-61573787f394.png",
            "https://cdn.poehali.dev/projects/1828de66-2b38-4ca3-93cd-9c07400f2c1a/bucket/b2d04e64-365e-41d6-914e-5bbc69fdb3e9.png",
            "https://cdn.poehali.dev/projects/1828de66-2b38-4ca3-93cd-9c07400f2c1a/bucket/7bb1aad9-dd56-417e-9d39-106b221d0d93.png",
            "https://cdn.poehali.dev/projects/1828de66-2b38-4ca3-93cd-9c07400f2c1a/bucket/52cd0c25-572b-49ae-8edb-5f7921e5d88e.png",
            "https://cdn.poehali.dev/projects/1828de66-2b38-4ca3-93cd-9c07400f2c1a/bucket/c82df0cf-9b3e-4f34-b418-2e4f00688cbb.png",
            "https://cdn.poehali.dev/projects/1828de66-2b38-4ca3-93cd-9c07400f2c1a/bucket/ed0d9b44-96f4-4fcf-abf3-2242f175ab4d.jpg",
            "https://cdn.poehali.dev/projects/1828de66-2b38-4ca3-93cd-9c07400f2c1a/bucket/37440065-66fe-4fef-a2d9-bc4ef0f1defb.jpeg",
            "https://cdn.poehali.dev/projects/1828de66-2b38-4ca3-93cd-9c07400f2c1a/bucket/8d1656f0-54d3-4351-a268-8bc4ffeea112.jpg",
            "https://cdn.poehali.dev/projects/1828de66-2b38-4ca3-93cd-9c07400f2c1a/bucket/adf1778f-0b35-4453-a5a2-1930ba91b8a6.jpg",
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