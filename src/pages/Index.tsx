import { useState } from "react";
import SiteHeader from "@/components/sections/SiteHeader";
import HeroSection from "@/components/sections/HeroSection";
import AdvantagesSection from "@/components/sections/AdvantagesSection";
import CalculatorSection, { COLORS } from "@/components/sections/CalculatorSection";
import GallerySection from "@/components/sections/GallerySection";
import ContactsSection from "@/components/sections/ContactsSection";

const SEND_EMAIL_URL = "https://functions.poehali.dev/515113b2-4033-45a4-ac40-1022653c854f";
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
      <SiteHeader />
      <HeroSection />
      <AdvantagesSection />
      <CalculatorSection
        area={area}
        setArea={setArea}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        formData={formData}
        setFormData={setFormData}
        calcSubmitted={calcSubmitted}
        sending={sending}
        totalPrice={totalPrice}
        handleCalcSubmit={handleCalcSubmit}
      />
      <GallerySection />
      <ContactsSection />
    </div>
  );
}
