import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/1828de66-2b38-4ca3-93cd-9c07400f2c1a/files/3060e33d-1f5a-4f28-8dfc-1d6c2fc322e4.jpg";

export default function ContactsSection() {
  return (
    <>
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
    </>
  );
}
