const HERO_IMAGE = "https://cdn.poehali.dev/projects/1828de66-2b38-4ca3-93cd-9c07400f2c1a/files/3060e33d-1f5a-4f28-8dfc-1d6c2fc322e4.jpg";

export default function HeroSection() {
  return (
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
  );
}
