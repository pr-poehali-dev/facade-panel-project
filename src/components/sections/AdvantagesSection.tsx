export default function AdvantagesSection() {
  return (
    <>
      {/* ADVANTAGES */}
      <section id="advantages" className="py-20 bg-sand-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14 section-divider pb-8">
            <span className="text-brick-600 font-body text-sm tracking-widest uppercase">Почему термопанели</span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mt-2">
              4 ГЛАВНЫХ ПРЕИМУЩЕСТВА
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { emoji: "🎨", title: "Любой цвет и фактура", desc: "Более 100 цветов по каталогу RAL. Кирпич, бетон, камень — на ваш выбор" },
              { emoji: "💰", title: "Экономия до 60%", desc: "Утеплитель высокой плотности снижает теплопотери и счета за отопление" },
              { emoji: "⏳", title: "Срок службы 25+ лет", desc: "Не боятся влаги, перепадов температур, УФ-излучения и плесени" },
              { emoji: "🛠", title: "Простой монтаж", desc: "Система шип-паз. Без «мокрых» работ. Монтаж в любое время года" },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-sm p-8 shadow-sm border border-sand-200 hover:shadow-md hover:-translate-y-1 transition-all group"
              >
                <div className="text-4xl mb-4">{item.emoji}</div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-3 group-hover:text-brick-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="py-20 bg-[hsl(20,40%,12%)] texture-concrete">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14 section-divider pb-8">
            <span className="text-brick-400 font-body text-sm tracking-widest uppercase">О нас</span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mt-2">
              ПОЧЕМУ ВЫБИРАЮТ НАС
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { emoji: "💰", title: "Максимальная энергоэффективность", desc: "Утеплитель высокой плотности снижает теплопотери через стены до минимума" },
              { emoji: "🎨", title: "Эстетика без компромиссов", desc: "Широчайший выбор фактур (кирпич, бетон) и любой цвет по каталогу RAL" },
              { emoji: "🧩", title: "Простота монтажа", desc: "Система «шип-паз» без «мокрых» работ и грязи. Монтаж в любое время года" },
              { emoji: "⏳", title: "Долговечность 25+ лет", desc: "Не боятся влаги, перепадов температур, УФ-излучения и плесени" },
              { emoji: "🧼", title: "Минимум ухода", desc: "Достаточно помыть водой из шланга раз в год — и фасад как новый" },
              { emoji: "🔇", title: "Звукоизоляция", desc: "Снижение уличного шума на 30–40 дБ. Тишина и комфорт внутри" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex gap-5 p-6 border border-[rgba(255,255,255,0.08)] rounded-sm hover:border-brick-500 transition-all group"
              >
                <span className="text-3xl flex-shrink-0 mt-1">{item.emoji}</span>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-white mb-2 group-hover:text-brick-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sand-300 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
