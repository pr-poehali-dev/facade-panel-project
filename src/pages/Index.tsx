import { useState } from "react";
import Icon from "@/components/ui/icon";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/1828de66-2b38-4ca3-93cd-9c07400f2c1a/bucket/3ac3f203-31e6-4289-a473-939dec441cfb.jpg";

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

const PRICE_PER_M2 = 1250;

const HOUSE_TYPES = ["Частный дом", "Дача", "Коттедж", "Коммерческое здание"];
const WALL_MATERIALS = ["Кирпич", "Газоблок / пеноблок", "Дерево", "Бетон", "Другое"];

const SEND_EMAIL_URL = "https://functions.poehali.dev/515113b2-4033-45a4-ac40-1022653c854f";

export default function Index() {
  const [area, setArea] = useState("");
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const totalPrice = area ? Math.round(parseFloat(area) * PRICE_PER_M2) : 0;

  const [quizStep, setQuizStep] = useState(0);
  const [houseType, setHouseType] = useState("");
  const [wallMaterial, setWallMaterial] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizSending, setQuizSending] = useState(false);
  const [quizError, setQuizError] = useState("");

  const QUIZ_STEPS_COUNT = 5;

  const handleQuizSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setQuizSending(true);
    setQuizError("");
    try {
      const res = await fetch(SEND_EMAIL_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: clientName,
          phone: clientPhone,
          area,
          color: `${selectedColor.name} (${selectedColor.ral})`,
          houseType,
          wallMaterial,
        }),
      });
      if (!res.ok) throw new Error("Ошибка отправки");
      setQuizSubmitted(true);
    } catch {
      setQuizError("Не удалось отправить заявку. Позвоните нам по телефону.");
    } finally {
      setQuizSending(false);
    }
  };

  const resetQuiz = () => {
    setQuizStep(0);
    setHouseType("");
    setWallMaterial("");
    setArea("");
    setClientName("");
    setClientPhone("");
    setQuizSubmitted(false);
    setQuizError("");
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

          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            <a href="#advantages" className="text-sm text-sand-200 hover:text-white transition-colors whitespace-nowrap">Преимущества</a>
            <a href="#calculator" className="text-sm text-sand-200 hover:text-white transition-colors whitespace-nowrap">Калькулятор</a>
            <a href="#gallery" className="text-sm text-sand-200 hover:text-white transition-colors whitespace-nowrap">Галерея</a>
            <a href="#contacts" className="text-sm text-sand-200 hover:text-white transition-colors whitespace-nowrap">Контакты</a>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <a href="tel:608081" className="hidden xl:flex items-center gap-2 text-sand-200 hover:text-white transition-colors whitespace-nowrap">
              <Icon name="Phone" size={15} />
              <span className="font-heading text-lg tracking-wider">60-80-81</span>
            </a>
            <a
              href="https://www.avito.ru/irkutsk/remont_i_stroitelstvo/termopaneli_bez_posrednikov_8100904331"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 bg-[#00AAFF] hover:bg-[#0090DD] text-white px-3 md:px-4 py-2 text-sm font-heading tracking-wider transition-colors rounded-sm whitespace-nowrap flex-shrink-0"
            >
              <Icon name="ShoppingBag" size={15} />
              АВИТО
            </a>
            <a
              href="#contacts"
              className="bg-brick-600 hover:bg-brick-500 text-white px-3 md:px-4 py-2 text-sm font-heading tracking-wider transition-colors rounded-sm whitespace-nowrap flex-shrink-0"
            >
              ЗВОНОК
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-16">
        <div className="absolute inset-0 overflow-hidden">
          <BeforeAfterSlider
            beforeSrc="https://cdn.poehali.dev/projects/1828de66-2b38-4ca3-93cd-9c07400f2c1a/bucket/77c0f384-36f4-4780-b36d-b2a8c2305899.jpg"
            afterSrc={HERO_IMAGE}
            beforeLabel="БЕЗ ПАНЕЛЕЙ"
            afterLabel="С ТЕРМОПАНЕЛЯМИ"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[rgba(20,12,6,0.75)] via-[rgba(20,12,6,0.35)] to-transparent pointer-events-none" />
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
                {quizSubmitted ? (
                  <div className="text-center py-8">
                    <div className="text-5xl mb-4">✅</div>
                    <h3 className="font-heading text-2xl font-bold text-foreground mb-2">Заявка принята!</h3>
                    <p className="text-muted-foreground mb-4">
                      Менеджер свяжется с вами в течение 15 минут и уточнит все детали расчёта.
                    </p>
                    {area && (
                      <div className="bg-sand-100 rounded-sm px-6 py-4 inline-block mb-4">
                        <p className="text-sm text-muted-foreground">Предварительная стоимость</p>
                        <p className="font-heading text-3xl font-bold text-brick-600">{totalPrice.toLocaleString("ru-RU")} ₽</p>
                        <p className="text-xs text-muted-foreground mt-1">{selectedColor.name} · {area} м²</p>
                      </div>
                    )}
                    <div>
                      <button
                        type="button"
                        onClick={resetQuiz}
                        className="text-sm text-brick-600 hover:text-brick-500 underline underline-offset-4"
                      >
                        Рассчитать ещё раз
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-center gap-2">
                      {Array.from({ length: QUIZ_STEPS_COUNT }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-1.5 flex-1 rounded-full transition-colors ${
                            i <= quizStep ? "bg-brick-600" : "bg-sand-200"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-heading">
                      Шаг {quizStep + 1} из {QUIZ_STEPS_COUNT}
                    </p>

                    {quizStep === 0 && (
                      <div>
                        <label className="block font-heading text-lg text-foreground mb-4">
                          Какой у вас объект?
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {HOUSE_TYPES.map((t) => (
                            <button
                              key={t}
                              type="button"
                              onClick={() => {
                                setHouseType(t);
                                setQuizStep(1);
                              }}
                              className={`p-4 rounded-sm border-2 text-left font-body transition-all ${
                                houseType === t
                                  ? "border-brick-600 bg-brick-50 shadow-md"
                                  : "border-sand-200 hover:border-sand-400"
                              }`}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {quizStep === 1 && (
                      <div>
                        <label className="block font-heading text-lg text-foreground mb-4">
                          Из какого материала стены?
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {WALL_MATERIALS.map((m) => (
                            <button
                              key={m}
                              type="button"
                              onClick={() => {
                                setWallMaterial(m);
                                setQuizStep(2);
                              }}
                              className={`p-4 rounded-sm border-2 text-left font-body transition-all ${
                                wallMaterial === m
                                  ? "border-brick-600 bg-brick-50 shadow-md"
                                  : "border-sand-200 hover:border-sand-400"
                              }`}
                            >
                              {m}
                            </button>
                          ))}
                        </div>
                        <button
                          type="button"
                          onClick={() => setQuizStep(0)}
                          className="mt-4 text-sm text-muted-foreground hover:text-foreground"
                        >
                          ← Назад
                        </button>
                      </div>
                    )}

                    {quizStep === 2 && (
                      <div>
                        <label className="block font-heading text-lg text-foreground mb-4">
                          Примерная площадь стен под отделку
                        </label>
                        <div className="flex items-center gap-4">
                          <input
                            type="number"
                            min="1"
                            value={area}
                            onChange={(e) => setArea(e.target.value)}
                            placeholder="Например: 120"
                            autoFocus
                            className="flex-1 border border-sand-300 rounded-sm px-4 py-3 text-lg font-body focus:outline-none focus:border-brick-500 bg-sand-50"
                          />
                          <span className="font-body text-muted-foreground">м²</span>
                        </div>
                        {area && parseFloat(area) > 0 && (
                          <p className="text-sm text-muted-foreground mt-3">
                            Ориентировочно: <strong className="text-brick-600">{totalPrice.toLocaleString("ru-RU")} ₽</strong>
                          </p>
                        )}
                        <div className="flex justify-between items-center mt-4">
                          <button
                            type="button"
                            onClick={() => setQuizStep(1)}
                            className="text-sm text-muted-foreground hover:text-foreground"
                          >
                            ← Назад
                          </button>
                          <button
                            type="button"
                            disabled={!area || parseFloat(area) <= 0}
                            onClick={() => setQuizStep(3)}
                            className="bg-brick-600 hover:bg-brick-500 disabled:opacity-40 text-white px-6 py-3 font-heading tracking-wider rounded-sm"
                          >
                            Далее
                          </button>
                        </div>
                      </div>
                    )}

                    {quizStep === 3 && (
                      <div>
                        <label className="block font-heading text-lg text-foreground mb-4">
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

                        <div className="bg-sand-100 border border-sand-200 rounded-sm px-6 py-4 flex items-center justify-between mt-4">
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

                        <div className="flex justify-between items-center mt-4">
                          <button
                            type="button"
                            onClick={() => setQuizStep(2)}
                            className="text-sm text-muted-foreground hover:text-foreground"
                          >
                            ← Назад
                          </button>
                          <button
                            type="button"
                            onClick={() => setQuizStep(4)}
                            className="bg-brick-600 hover:bg-brick-500 text-white px-6 py-3 font-heading tracking-wider rounded-sm"
                          >
                            Далее
                          </button>
                        </div>
                      </div>
                    )}

                    {quizStep === 4 && (
                      <form onSubmit={handleQuizSubmit}>
                        <label className="block font-heading text-lg text-foreground mb-4">
                          Куда прислать расчёт?
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block font-heading text-sm tracking-wider text-foreground mb-2 uppercase">
                              Ваше имя
                            </label>
                            <input
                              type="text"
                              value={clientName}
                              onChange={(e) => setClientName(e.target.value)}
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
                              value={clientPhone}
                              onChange={(e) => setClientPhone(e.target.value)}
                              placeholder="+7 (___) ___-__-__"
                              className="w-full border border-sand-300 rounded-sm px-4 py-3 font-body focus:outline-none focus:border-brick-500 bg-sand-50"
                              required
                            />
                          </div>
                        </div>

                        <div className="bg-sand-100 border border-sand-200 rounded-sm px-6 py-4 mt-4 text-sm text-muted-foreground space-y-1">
                          <p>{houseType} · {wallMaterial}</p>
                          <p>{area} м² · {selectedColor.name}</p>
                          <p className="font-heading text-xl text-brick-600 mt-1">{totalPrice.toLocaleString("ru-RU")} ₽</p>
                        </div>

                        {quizError && (
                          <p className="text-sm text-red-600 mt-3">{quizError}</p>
                        )}

                        <div className="flex justify-between items-center gap-4 mt-6">
                          <button
                            type="button"
                            onClick={() => setQuizStep(3)}
                            className="text-sm text-muted-foreground hover:text-foreground flex-shrink-0"
                          >
                            ← Назад
                          </button>
                          <button
                            type="submit"
                            disabled={quizSending}
                            className="flex-1 bg-brick-600 hover:bg-brick-500 disabled:opacity-60 text-white py-4 font-heading text-lg tracking-wider rounded-sm transition-all hover:scale-[1.02]"
                          >
                            {quizSending ? "ОТПРАВЛЯЕМ..." : "ПОЛУЧИТЬ РАСЧЁТ"}
                          </button>
                        </div>
                        <p className="text-xs text-muted-foreground text-center mt-4">
                          * Точная стоимость зависит от сложности монтажа. Менеджер уточнит детали при звонке.
                        </p>
                      </form>
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
              НАШИ РАБОТЫ
            </h2>
            <p className="text-muted-foreground mt-3">Реальные объекты, сданные нашей командой</p>
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {[
              "https://cdn.poehali.dev/projects/1828de66-2b38-4ca3-93cd-9c07400f2c1a/bucket/23e826a1-cd81-45d2-b902-4fb1cfefe526.jpg",
              "https://cdn.poehali.dev/projects/1828de66-2b38-4ca3-93cd-9c07400f2c1a/bucket/2ec060f0-e647-49e7-86c9-37e3e1911d9c.jpg",
              "https://cdn.poehali.dev/projects/1828de66-2b38-4ca3-93cd-9c07400f2c1a/bucket/df944f4b-a7bf-4b1d-8751-65b4a23dd050.jpg",
              "https://cdn.poehali.dev/projects/1828de66-2b38-4ca3-93cd-9c07400f2c1a/bucket/cd6037b2-3014-4bcf-a919-e071cfe5c721.jpg",
              "https://cdn.poehali.dev/projects/1828de66-2b38-4ca3-93cd-9c07400f2c1a/bucket/d4d2d56b-5a1d-4bc3-b36c-dd506990319c.jpg",
              "https://cdn.poehali.dev/projects/1828de66-2b38-4ca3-93cd-9c07400f2c1a/bucket/d14bfd6b-9a35-405c-beca-ac88782511db.jpg",
              "https://cdn.poehali.dev/projects/1828de66-2b38-4ca3-93cd-9c07400f2c1a/bucket/b2d04e64-365e-41d6-914e-5bbc69fdb3e9.png",
              "https://cdn.poehali.dev/projects/1828de66-2b38-4ca3-93cd-9c07400f2c1a/bucket/52cd0c25-572b-49ae-8edb-5f7921e5d88e.png",
              "https://cdn.poehali.dev/projects/1828de66-2b38-4ca3-93cd-9c07400f2c1a/bucket/c82df0cf-9b3e-4f34-b418-2e4f00688cbb.png",
              "https://cdn.poehali.dev/projects/1828de66-2b38-4ca3-93cd-9c07400f2c1a/bucket/ed0d9b44-96f4-4fcf-abf3-2242f175ab4d.jpg",
              "https://cdn.poehali.dev/projects/1828de66-2b38-4ca3-93cd-9c07400f2c1a/bucket/37440065-66fe-4fef-a2d9-bc4ef0f1defb.jpeg",
              "https://cdn.poehali.dev/projects/1828de66-2b38-4ca3-93cd-9c07400f2c1a/bucket/8d1656f0-54d3-4351-a268-8bc4ffeea112.jpg",
              "https://cdn.poehali.dev/projects/1828de66-2b38-4ca3-93cd-9c07400f2c1a/bucket/adf1778f-0b35-4453-a5a2-1930ba91b8a6.jpg",
              "https://cdn.poehali.dev/projects/1828de66-2b38-4ca3-93cd-9c07400f2c1a/bucket/058d9d42-8c07-4741-82b1-f8b4a9a7de42.png",
              "https://cdn.poehali.dev/projects/1828de66-2b38-4ca3-93cd-9c07400f2c1a/bucket/51f690d8-a780-43ee-a0e5-c216e455582a.jpg",
              "https://cdn.poehali.dev/projects/1828de66-2b38-4ca3-93cd-9c07400f2c1a/bucket/1f51ebe7-e503-46d9-8bfa-498164fb4c8f.jpg",
              "https://cdn.poehali.dev/projects/1828de66-2b38-4ca3-93cd-9c07400f2c1a/bucket/6b1d22e6-7b7f-4f19-8df3-7e926510761e.jpg",
              "https://cdn.poehali.dev/projects/1828de66-2b38-4ca3-93cd-9c07400f2c1a/bucket/3ac3f203-31e6-4289-a473-939dec441cfb.jpg",
              "https://cdn.poehali.dev/projects/1828de66-2b38-4ca3-93cd-9c07400f2c1a/bucket/a7596ff4-18e8-41f4-97ab-6fed45e75cc5.jpg",
              "https://cdn.poehali.dev/projects/1828de66-2b38-4ca3-93cd-9c07400f2c1a/bucket/2e2044c1-1e6e-4e59-b93d-0fffac834e3d.jpg",
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
      {/* AVITO */}
      <section className="py-12 bg-[hsl(20,40%,12%)] texture-concrete">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-[rgba(255,255,255,0.05)] border border-sand-700/30 rounded-sm p-8 text-center flex flex-col items-center gap-4">
            <div className="w-14 h-14 bg-[#00AAFF] rounded-full flex items-center justify-center">
              <Icon name="ShoppingBag" size={26} className="text-white" />
            </div>
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-white">
              Заказывайте наш товар на Авито
            </h3>
            <p className="text-sand-300 max-w-xl">
              Термопанели «Фактура Элит» также можно заказать напрямую через объявление на Авито — без посредников
            </p>
            <a
              href="https://www.avito.ru/irkutsk/remont_i_stroitelstvo/termopaneli_bez_posrednikov_8100904331"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#00AAFF] hover:bg-[#0090DD] text-white px-8 py-4 font-heading tracking-wider transition-all hover:scale-105 rounded-sm inline-flex items-center gap-2"
            >
              <Icon name="ExternalLink" size={18} />
              ПЕРЕЙТИ НА АВИТО
            </a>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 bg-sand-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14 section-divider pb-8">
            <span className="text-brick-600 font-body text-sm tracking-widest uppercase">Мы рядом</span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mt-2">
              ПРИЕЗЖАЙТЕ СМОТРЕТЬ ОБРАЗЦЫ!
            </h2>
            <p className="text-muted-foreground mt-3">г. Иркутск, ул. Воронежская, 3а</p>
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
                    <p className="text-foreground font-medium">г. Иркутск, ул. Воронежская, 3а</p>
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

              <div className="mt-8 flex flex-col gap-3">
                <a
                  href="tel:+73952608081"
                  className="w-full bg-brick-600 hover:bg-brick-500 text-white px-6 py-4 font-heading tracking-wider text-center transition-all hover:scale-105 rounded-sm flex items-center justify-center gap-2"
                >
                  <Icon name="Phone" size={18} />
                  8(3952)60-80-81
                </a>
                <a
                  href="tel:+79041529339"
                  className="w-full bg-brick-600 hover:bg-brick-500 text-white px-6 py-4 font-heading tracking-wider text-center transition-all hover:scale-105 rounded-sm flex items-center justify-center gap-2"
                >
                  <Icon name="Phone" size={18} />
                  8(904)152-93-39
                </a>
                <div className="flex gap-3">
                  <a
                    href="https://vk.ru/faktura.elit"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#0077FF] hover:bg-[#0066DD] text-white px-6 py-4 font-heading tracking-wider text-center transition-all hover:scale-105 rounded-sm flex items-center justify-center gap-2"
                  >
                    <Icon name="Users" size={18} />
                    ВКонтакте
                  </a>
                  <a
                    href="https://max.ru/join/IeGS79zIL6r84oInWAAlsV77gx5XAgVgNX6jnwg_GTc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#FF6F00] hover:bg-[#E06000] text-white px-6 py-4 font-heading tracking-wider text-center transition-all hover:scale-105 rounded-sm flex items-center justify-center gap-2"
                  >
                    <Icon name="MessageCircle" size={18} />
                    MAX
                  </a>
                </div>
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
              © 2024 Фактура Элит. г. Иркутск, ул. Воронежская, 3а. Тел: 60-80-81
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