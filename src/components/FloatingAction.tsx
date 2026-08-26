import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function FloatingAction({ data }: { data: any }) {
  const { t } = useLanguage();
  
  if (!data?.settings) return null;

  const phone = data.settings.contactPhone?.replace(/\s/g, '') || "7814883261";
  const whatsappMsg = encodeURIComponent(data.settings.whatsappMessage || "");

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* Phone */}
      <a 
        href={`tel:${phone}`}
        className="hidden md:flex items-center justify-center w-14 h-14 bg-white text-brand-plum rounded-full shadow-[0_8px_30px_rgba(123,46,79,0.15)] hover:shadow-[0_8px_30px_rgba(123,46,79,0.3)] transition-all hover:-translate-y-1 group border border-[#EBCFD9]"
        aria-label={t('general.callNow')}
      >
        <Phone className="w-6 h-6 group-hover:text-brand-rose transition-colors" />
      </a>
      
      {/* WhatsApp */}
      <a 
        href={`https://wa.me/91${phone}?text=${whatsappMsg}`}
        target="_blank" rel="noreferrer"
        className="flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-[0_8px_30px_rgba(37,211,102,0.3)] hover:shadow-[0_8px_30px_rgba(37,211,102,0.5)] transition-all hover:-translate-y-1"
        aria-label={t('general.whatsapp')}
      >
        <MessageCircle className="w-7 h-7" />
      </a>
    </div>
  );
}
