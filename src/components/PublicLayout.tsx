import { Outlet, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Phone, MessageCircle, Menu, X, Globe } from "lucide-react";
import clsx from "clsx";
import { useLanguage } from "../contexts/LanguageContext";
import FloatingAction from "./FloatingAction";

export default function PublicLayout() {
  const [data, setData] = useState<any>(null);
  const { t } = useLanguage();

  useEffect(() => {
    fetch("/api/public/data")
      .then(res => res.json())
      .then(setData);
  }, []);

  return (
    <div className="flex min-h-screen flex-col font-sans">
      <Header data={data} />
      <main className="flex-grow">
        <Outlet context={data} />
      </main>
      <Footer data={data} />
      
      <FloatingAction data={data} />

      {/* Sticky Mobile Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center bg-white/90 backdrop-blur-md border-t border-brand-lavender/50 sm:hidden pb-safe shadow-[0_-10px_30px_rgba(185,74,117,0.1)]">
        <a href={`tel:${data?.settings?.contactPhone?.replace(/\s/g, '')}`} className="flex-1 flex items-center justify-center py-5 bg-transparent text-brand-plum text-[10px] uppercase font-bold tracking-widest hover:bg-brand-blush">
          <Phone className="w-5 h-5 mr-3 text-brand-rose" />
          Call Now
        </a>
        <div className="w-[1px] h-10 bg-brand-lavender/50"></div>
        <a 
          href={`https://wa.me/91${data?.settings?.contactPhone?.replace(/\s/g, '')}?text=${encodeURIComponent(data?.settings?.whatsappMessage || '')}`} 
          target="_blank" rel="noreferrer"
          className="flex-1 flex items-center justify-center py-5 bg-gradient-to-r from-brand-rose to-brand-plum text-white text-[10px] uppercase font-bold tracking-widest hover:opacity-90">
          <MessageCircle className="w-5 h-5 mr-3" />
          WhatsApp
        </a>
      </div>
    </div>
  );
}

function Header({ data }: { data: any }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 z-50 w-full px-4 sm:px-6 pt-4 md:pt-6 transition-all duration-500">
      <header className={clsx("mx-auto max-w-7xl transition-all duration-500 rounded-3xl flex items-center justify-between px-6 py-4 md:py-4 border relative", 
        isScrolled || mobileMenuOpen
          ? "bg-[rgba(255,250,252,0.95)] backdrop-blur-md shadow-[0_8px_30px_rgba(123,46,79,0.08)] border-[#EBCFD9]" 
          : "bg-[rgba(255,250,252,0.85)] backdrop-blur-md shadow-[0_4px_20px_rgba(123,46,79,0.04)] border-[#EBCFD9]/60"
      )}>
        <Link to="/" className="flex items-center gap-3 group z-20">
          {data?.settings?.headerLogo && (
            <img 
              src={data.settings.headerLogo} 
              alt={data?.settings?.logoText || data?.settings?.doctorName || "Logo"} 
              className="h-10 md:h-12 object-contain" 
            />
          )}
          {(!data?.settings?.headerLogo || data?.settings?.showLogoText !== false) && (
            <div className="flex flex-col items-start">
              <span className="text-base md:text-lg text-brand-plum font-normal tracking-wide group-hover:text-brand-rose transition-colors">
                {data?.settings?.logoText || data?.settings?.doctorName || "Dr. Rakhi Goyal"}
              </span>
              <span className="text-[10px] md:text-xs mono uppercase text-brand-plum/80 mt-0.5 font-bold tracking-[0.15em] group-hover:text-brand-plum transition-colors">
                Fertility & IVF Specialist
              </span>
            </div>
          )}
        </Link>
        <nav className="hidden lg:flex items-center space-x-10">
            <Link to="/" className="text-[11px] uppercase tracking-[0.2em] font-bold text-brand-plum/80 hover:text-brand-rose transition-colors border-b-2 border-transparent hover:border-brand-rose pb-1">{t('nav.home')}</Link>
            <Link to="/about" className="text-[11px] uppercase tracking-[0.2em] font-bold text-brand-plum/80 hover:text-brand-rose transition-colors border-b-2 border-transparent hover:border-brand-rose pb-1">{t('nav.about')}</Link>
            <Link to="/treatments" className="text-[11px] uppercase tracking-[0.2em] font-bold text-brand-plum/80 hover:text-brand-rose transition-colors cursor-pointer border-b-2 border-transparent hover:border-brand-rose pb-1">{t('nav.treatments')}</Link>
            <div className="flex items-center bg-brand-peach/50 rounded-full border border-brand-lavender p-1">
              <Globe className="w-3 h-3 text-brand-plum ml-2" />
              <select 
                className="bg-transparent border-none outline-none text-[10px] uppercase tracking-[0.1em] font-bold text-brand-plum/80 cursor-pointer pr-1"
                value={language}
                onChange={(e) => setLanguage(e.target.value as 'en' | 'hi')}
              >
                <option value="en">EN</option>
                <option value="hi">HI</option>
              </select>
            </div>
        </nav>
        
        <div className="hidden lg:flex items-center gap-6">
            <a href={`tel:${data?.settings?.contactPhone?.replace(/\s/g, '') || "7814883261"}`} className="text-[11px] uppercase tracking-[0.15em] font-bold text-brand-plum/80 hover:text-brand-rose flex items-center transition-colors">
              <Phone className="w-4 h-4 mr-2 text-brand-rose" /> {t('general.callNow')}
            </a>
            <Link to="/contact" className="text-[10px] uppercase tracking-[0.2em] font-bold bg-gradient-to-r from-brand-rose to-[#9E3F64] text-white px-7 py-3.5 rounded-full transition-all hover:shadow-lg hover:shadow-brand-rose/30 hover:-translate-y-0.5">
              {t('general.bookAppt')}
            </Link>
        </div>

        {/* Mobile menu button */}
        <button 
          className="lg:hidden p-2 text-brand-plum hover:text-brand-rose transition-colors z-20"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 p-6 bg-[rgba(255,250,252,0.98)] backdrop-blur-xl border border-[#EBCFD9] rounded-3xl shadow-[0_20px_40px_rgba(123,46,79,0.1)] flex flex-col space-y-6 lg:hidden z-10 animate-in fade-in slide-in-from-top-4 duration-300">
            <nav className="flex flex-col space-y-4 items-center pt-4">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-xs uppercase tracking-[0.2em] font-bold text-brand-plum hover:text-brand-rose transition-colors border-b border-brand-lavender/30 w-full text-center pb-4">{t('nav.home')}</Link>
              <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="text-xs uppercase tracking-[0.2em] font-bold text-brand-plum hover:text-brand-rose transition-colors border-b border-brand-lavender/30 w-full text-center pb-4">{t('nav.about')}</Link>
              <Link to="/treatments" onClick={() => setMobileMenuOpen(false)} className="text-xs uppercase tracking-[0.2em] font-bold text-brand-plum hover:text-brand-rose transition-colors border-b border-brand-lavender/30 w-full text-center pb-4">{t('nav.treatments')}</Link>
              <div className="flex items-center bg-brand-peach/50 rounded-full border border-brand-lavender p-1 px-4 mb-4">
                <Globe className="w-4 h-4 text-brand-plum mr-2" />
                <select 
                  className="bg-transparent border-none outline-none text-xs uppercase tracking-[0.1em] font-bold text-brand-plum/80 cursor-pointer"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as 'en' | 'hi')}
                >
                  <option value="en">EN</option>
                  <option value="hi">HI</option>
                </select>
              </div>
            </nav>
            <div className="flex flex-col gap-4 items-center pb-4">
              <a href={`tel:${data?.settings?.contactPhone?.replace(/\s/g, '') || "7814883261"}`} className="text-xs uppercase tracking-[0.15em] font-bold text-brand-plum hover:text-brand-rose flex items-center transition-colors">
                <Phone className="w-5 h-5 mr-3 text-brand-rose" /> {t('general.callNow')}
              </a>
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="text-xs uppercase tracking-[0.2em] font-bold bg-gradient-to-r from-brand-rose to-[#9E3F64] text-white px-8 py-4 rounded-full transition-all text-center w-full shadow-md shadow-brand-rose/20">
                {t('general.bookAppt')}
              </Link>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

function Footer({ data }: { data: any }) {
  return (
    <footer className="bg-brand-peach border-t border-brand-lavender pt-12 pb-8 mt-auto sm:pb-8 pb-24">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-1">
             <span className="text-xs mono uppercase text-brand-plum block mb-2 font-semibold">
              {data?.settings?.doctorName || "Dr. Rakhi Goyal"}
            </span>
             <span className="block text-[10px] uppercase tracking-widest text-brand-plum/70 mb-4">Fertility & IVF Specialist<br/>{data?.settings?.doctorDegrees || "MBBS, MD, FNB, FICOG"}</span>
             <p className="text-xs text-brand-dark leading-relaxed mb-6 font-light">
               {data?.settings?.footerDescription || "Compassionate and personalized reproductive healthcare with over 23 years of experience."}
             </p>
          </div>
          <div>
            <h4 className="text-xs mono uppercase text-brand-plum font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-[10px] uppercase tracking-widest text-brand-dark/80">
              <li><Link to="/about" className="hover:text-brand-plum transition-colors">About Doctor</Link></li>
              <li><Link to="/treatments" className="hover:text-brand-plum transition-colors">All Treatments</Link></li>
              <li><span className="hover:text-brand-plum cursor-pointer transition-colors">Patient Stories</span></li>
              <li><Link to="/contact" className="hover:text-brand-plum transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs mono uppercase text-brand-plum font-semibold mb-6">Treatments</h4>
            <ul className="space-y-4 text-[10px] uppercase tracking-widest text-brand-dark/80">
              <li><span className="hover:text-brand-plum cursor-pointer transition-colors">IVF Treatment</span></li>
              <li><span className="hover:text-brand-plum cursor-pointer transition-colors">IUI Treatment</span></li>
              <li><span className="hover:text-brand-plum cursor-pointer transition-colors">Female Infertility</span></li>
              <li><span className="hover:text-brand-plum cursor-pointer transition-colors">Recurrent IVF Failure</span></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs mono uppercase text-brand-plum font-semibold mb-6">Contact Info</h4>
            <ul className="space-y-4 text-xs font-light text-brand-dark/80">
              <li className="flex items-center">
                <Phone className="w-4 h-4 mr-3 text-brand-plum" />
                {data?.settings?.contactPhone || '78148 83261'}
              </li>
              <li className="flex items-center">
                <MessageCircle className="w-4 h-4 mr-3 text-brand-rose" />
                WhatsApp anytime
              </li>
            </ul>
            <Link to="/contact" className="inline-block mt-8 px-6 py-3 border border-brand-lavender text-brand-plum text-[10px] uppercase tracking-[0.3em] font-semibold hover:bg-brand-ivory transition-all bg-white shadow-sm">
              {data?.settings?.ctaPrimaryText || "Book Consultation"}
            </Link>
          </div>
        </div>
        <div className="border-t border-brand-lavender pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-brand-dark/50">
          <div>Est. 2024 / {data?.settings?.doctorName || "Dr. Rakhi Goyal"}</div>
          <div className="flex gap-8 italic normal-case text-brand-dark my-4 md:my-0 text-xs">
            <span>"{data?.settings?.footerQuote || "Details make perfection, and perfection is not a detail."}"</span>
          </div>
          <div>&copy; All Rights Reserved</div>
        </div>
      </div>
    </footer>
  );
}
