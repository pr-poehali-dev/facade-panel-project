import { useState } from "react";
import Icon from "@/components/ui/icon";

const SEND_EMAIL_URL = "https://functions.poehali.dev/515113b2-4033-45a4-ac40-1022653c854f";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/1828de66-2b38-4ca3-93cd-9c07400f2c1a/files/3060e33d-1f5a-4f28-8dfc-1d6c2fc322e4.jpg";

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

const TEXTURES = [
  { name: "Под кирпич", desc: "Классическая фактура красного и силикатного кирпича" },
  { name: "Под бетон", desc: "Брутальная индустриальная эстетика" },
  { name: "Под камень", desc: "Натуральный облицовочный камень" },
];

const PRICE_PER_M2 = 750;

export default function Index() {
  const [area, setArea] = useState("");
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [calcSubmitted, setCalcSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const totalPrice = area ? Math.round(parseFloat(area) * PRICE_PER_M2) : 0;

  const handleCalcSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await fetch(SEND_EMAIL_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          area: area,
          color: `${selectedColor.name} (${selectedColor.ral})`,
        }),
      });
    } finally {
      setSending(false);
      setCalcSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-background font-body overflow-x-hidden">

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[hsl(20,40%,12%)] text-white">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-brick-600 flex items-center justify-center rounded-sm">
              <span className="text-white font-heading text-sm font-bold">ФЭ</span>
            </div>
            <div>
              <div className="font-heading text-lg font-semibold tracking-wider leading-none">ФАКТУРА ЭЛИТ</div>
              <div className="text-xs text-sand-300 leading-none mt-0.5">термопанели для фасадов</div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#advantages" className="text-sm text-sand-200 hover:text-white transition-colors">Преимущества</a>
            <a href="#calculator" className="text-sm text-sand-200 hover:text-white transition-colors">Калькулятор</a>
            <a href="#gallery" className="text-sm text-sand-200 hover:text-white transition-colors">Галерея</a>
            <a href="#contacts" className="text-sm text-sand-200 hover:text-white transition-colors">Контакты</a>
          </div>

          <div className="flex items-center gap-4">
            <a href="tel:608081" className="hidden sm:flex items-center gap-2 text-sand-200 hover:text-white transition-colors">
              <Icon name="Phone" size={15} />
              <span className="font-heading text-lg tracking-wider">60-80-81</span>
            </a>
            <a
              href="#contacts"
              className="bg-brick-600 hover:bg-brick-500 text-white px-4 py-2 text-sm font-heading tracking-wider transition-colors rounded-sm"
            >
              ЗАКАЗАТЬ ЗВОНОК
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-16">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={HERO_IMAGE}
            alt="Дом с фасадными термопанелями"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[rgba(20,12,6,0.82)] via-[rgba(20,12,6,0.55)] to-transparent" />
          <div className="absolute inset-0 texture-brick opacity-30" />
        </div>

        <div className="relative container mx-auto px-4 py-24">
          <div className="max-w-2xl">
            <div
              className="inline-block border-l-4 border-brick-500 pl-4 mb-6 animate-fade-up"
              style={{ animationDelay: "0.1s" }}
            >
              <span className="text-sand-300 text-sm font-body tracking-widest uppercase">г. Иркутск</span>
            </div>

            <h1
              className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 animate-fade-up"
              style={{ animationDelay: "0.2s" }}
            >
              ФАСАДНЫЕ<br />
              <span className="text-brick-400">ТЕРМОПАНЕЛИ</span><br />
              В ИРКУТСКЕ
            </h1>

            <p
              className="text-sand-200 text-xl md:text-2xl font-body mb-4 animate-fade-up"
              style={{ animationDelay: "0.35s" }}
            >
              Утепление + декор за 1 цикл
            </p>
            <p
              className="text-sand-300 text-lg mb-10 animate-fade-up"
              style={{ animationDelay: "0.45s" }}
            >
              Любой цвет на ваш выбор. Экономьте на отоплении до <strong className="text-white">60%</strong>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: "0.55s" }}>
              <a
                href="#calculator"
                className="bg-brick-600 hover:bg-brick-500 text-white px-8 py-4 font-heading text-lg tracking-wider transition-all hover:scale-105 rounded-sm text-center"
              >
                ЗАПИСАТЬСЯ НА ЗАМЕР
              </a>
              <a
                href="#gallery"
                className="border border-sand-400 text-sand-200 hover:text-white hover:border-white px-8 py-4 font-heading text-lg tracking-wider transition-all rounded-sm text-center"
              >
                СМОТРЕТЬ РАБОТЫ
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-[rgba(20,12,6,0.85)] backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { val: "25+", label: "лет гарантия" },
              { val: "60%", label: "экономия тепла" },
              { val: "30 дБ", label: "шумоизоляция" },
              { val: "100+", label: "цветов RAL" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-heading text-2xl font-bold text-brick-400">{s.val}</div>
                <div className="text-sand-300 text-xs mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
                <h3 className="font-heading text-xl font-semibold text-foreground mb-3 group-hover:text-brick-600 transition-colors">
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

      {/* CALCULATOR */}
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

      {/* GALLERY */}
      <section id="gallery" className="py-20 bg-concrete-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14 section-divider pb-8">
            <span className="text-brick-600 font-body text-sm tracking-widest uppercase">Галерея</span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mt-2">
              ЦВЕТА И ФАКТУРЫ
            </h2>
            <p className="text-muted-foreground mt-3">Любой цвет на ваш выбор по каталогу RAL</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {TEXTURES.map((t) => (
              <div key={t.name} className="bg-white rounded-sm border border-sand-200 p-8 text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
                <div className="text-4xl mb-3">🧱</div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-2">{t.name}</h3>
                <p className="text-muted-foreground text-sm">{t.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-sm shadow-sm border border-sand-200 p-8">
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

      {/* PRODUCTION */}
      <section className="py-20 bg-[hsl(20,40%,12%)]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-brick-400 font-body text-sm tracking-widest uppercase">О производстве</span>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mt-3 mb-6">
                МЫ — ПРОИЗВОДИТЕЛИ
              </h2>
              <p className="text-sand-300 text-lg leading-relaxed mb-6">
                Работаем без посредников, поэтому гарантируем качество и лучшую цену.
                Каждая панель проходит контроль на производстве перед отправкой на объект.
              </p>
              <div className="space-y-4">
                {[
                  "Собственное производство в Иркутске",
                  "Прямые поставки без переплат",
                  "Гарантия качества от производителя",
                  "Выезд замерщика бесплатно",
                ].map((point) => (
                  <div key={point} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-brick-600 flex items-center justify-center flex-shrink-0">
                      <Icon name="Check" size={12} className="text-white" />
                    </div>
                    <span className="text-sand-200">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <img
                src={HERO_IMAGE}
                alt="Производство термопанелей"
                className="w-full h-80 object-cover rounded-sm shadow-xl"
              />

            </div>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-20 bg-sand-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14 section-divider pb-8">
            <span className="text-brick-600 font-body text-sm tracking-widest uppercase">Мы рядом</span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mt-2">
              ПРИЕЗЖАЙТЕ СМОТРЕТЬ ОБРАЗЦЫ!
            </h2>
            <p className="text-muted-foreground mt-3">г. Иркутск, ул. Ракитная, 16а/1</p>
          </div>

          <div className="max-w-xl mx-auto">
            <div className="bg-white rounded-sm shadow-sm border border-sand-200 p-8 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-brick-100 rounded-sm flex items-center justify-center flex-shrink-0">
                    <Icon name="MapPin" size={20} className="text-brick-600" />
                  </div>
                  <div>
                    <p className="font-heading text-sm tracking-wider uppercase text-muted-foreground mb-1">Адрес</p>
                    <p className="text-foreground font-medium">г. Иркутск, ул. Ракитная, 16а/1</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-brick-100 rounded-sm flex items-center justify-center flex-shrink-0">
                    <Icon name="Phone" size={20} className="text-brick-600" />
                  </div>
                  <div>
                    <p className="font-heading text-sm tracking-wider uppercase text-muted-foreground mb-1">Телефон</p>
                    <a href="tel:+73952608081" className="text-foreground font-heading text-2xl hover:text-brick-600 transition-colors">
                      8(3952)60-80-81
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-brick-100 rounded-sm flex items-center justify-center flex-shrink-0">
                    <Icon name="Clock" size={20} className="text-brick-600" />
                  </div>
                  <div>
                    <p className="font-heading text-sm tracking-wider uppercase text-muted-foreground mb-1">Режим работы</p>
                    <p className="text-foreground">Пн–Пт: 9:00 – 18:00</p>
                    <p className="text-foreground">Сб: 10:00 – 15:00</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <a
                  href="tel:+73952608081"
                  className="w-full bg-brick-600 hover:bg-brick-500 text-white px-6 py-4 font-heading tracking-wider text-center transition-all hover:scale-105 rounded-sm flex items-center justify-center gap-2"
                >
                  <Icon name="Phone" size={18} />
                  ПОЗВОНИТЬ
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[hsl(20,40%,8%)] text-sand-400 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-brick-600 flex items-center justify-center rounded-sm">
                <span className="text-white font-heading text-xs font-bold">ФЭ</span>
              </div>
              <span className="font-heading tracking-wider text-white">ФАКТУРА ЭЛИТ</span>
            </div>
            <p className="text-sm text-center">
              © 2024 Фактура Элит. г. Иркутск, ул. Ракитная, 16а/1. Тел: 60-80-81
            </p>
            <a href="#" className="text-sm hover:text-white transition-colors underline underline-offset-4">
              Политика конфиденциальности
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}