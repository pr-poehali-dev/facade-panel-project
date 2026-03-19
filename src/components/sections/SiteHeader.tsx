import Icon from "@/components/ui/icon";

export default function SiteHeader() {
  return (
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
  );
}
