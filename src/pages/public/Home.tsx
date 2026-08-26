import React from "react";
import { useOutletContext, Link } from "react-router-dom";
import { motion } from "motion/react";
import { Heart, Stethoscope, Baby, Shield, CheckCircle2, ChevronRight, Phone, Sparkles, Activity, Dna, Droplets, Flower2, Star } from "lucide-react";
import OvulationCalculator from "../../components/OvulationCalculator";
import SuccessRateEstimator from "../../components/SuccessRateEstimator";
import { useLanguage } from "../../contexts/LanguageContext";

export default function Home() {
  const data = useOutletContext<any>();
  const { t } = useLanguage();
  if (!data) return <div className="min-h-screen bg-brand-ivory flex items-center justify-center">Loading...</div>;

  return (
    <div className="pt-24 md:pt-32 relative overflow-hidden">
      {/* Soft Global Background Enhancements */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-5%] left-[-10%] w-[600px] h-[600px] rounded-full bg-brand-peach/40 blur-[120px] mix-blend-multiply opacity-50" />
        <div className="absolute top-[20%] right-[-5%] w-[800px] h-[800px] rounded-full bg-brand-lavender/30 blur-[150px] mix-blend-multiply opacity-60" />
        <div className="absolute top-[40%] left-[10%] w-[400px] h-[400px] rounded-full bg-white/40 blur-[100px] mix-blend-overlay" />
      </div>

      {/* 1. Premium Hero Section */}
      <section className="relative pt-8 md:pt-12 mb-12 md:mb-16 pb-12 md:pb-16 z-10">
        {/* Soft hero gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-brand-ivory via-brand-ivory/80 to-brand-blush/60 -z-20" />
        
        <div className="container mx-auto px-12 max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-left lg:col-span-7 z-10 max-w-2xl max-lg:mx-auto"
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 mb-4 bg-white/40 backdrop-blur-md rounded-full border border-brand-rose/10 shadow-sm text-brand-plum text-[10px] uppercase tracking-[0.3em] font-semibold">
              <span className="w-2 h-2 bg-brand-rose animate-pulse rounded-full shadow-[0_0_8px_rgba(185,74,117,0.5)]"></span>
              <span>Advanced Fertility Care</span>
            </div>
            
            <div className="relative mb-6">
              <h1 className="display-type text-[100px] sm:text-[120px] md:text-[140px] lg:text-[150px] xl:text-[180px] text-brand-plum leading-[0.75] drop-shadow-xl relative z-10 break-words -mb-2">
                {data.settings.heroHeadline1 || "EXPERT"}
              </h1>
              <h2 className="sub-display text-[45px] sm:text-[50px] md:text-[60px] lg:text-[65px] xl:text-[75px] text-brand-rose/90 pt-0 relative z-10 leading-[0.8]">
                {data.settings.heroHeadline2 || "FERTILITY CARE"}
              </h2>
            </div>

            <p className="text-sm font-medium text-brand-plum/80 mb-6 leading-relaxed max-w-[320px]">
              {data.settings.heroSubheadline || "A study in precision and compassionate guidance."}
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/contact" className="px-8 py-5 bg-gradient-to-r from-brand-rose to-brand-plum text-white transition-all duration-300 hover:shadow-2xl hover:shadow-brand-rose/30 hover:-translate-y-1 text-[10px] uppercase tracking-[0.3em] font-semibold flex items-center justify-center rounded-[2rem]">
                {data.settings.ctaPrimaryText || "Book Consultation"}
              </Link>
              <a href={`tel:${data.settings.contactPhone?.replace(/\s/g, '') || "7814883261"}`} className="px-8 py-5 bg-white border border-brand-rose/20 hover:border-brand-rose hover:bg-brand-rose/5 transition-all duration-300 text-brand-plum text-[10px] uppercase tracking-[0.3em] font-semibold flex items-center justify-center rounded-[2rem] shadow-sm hover:shadow-md">
                <Phone className="w-4 h-4 mr-2 text-brand-rose" />
                {data.settings.ctaSecondaryText || "Call Now"}
              </a>
            </div>
          </motion.div>

          <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
             className="relative lg:col-span-5 pt-10 mt-8 lg:mt-0 max-w-lg lg:max-w-none w-full mx-auto"
          >
             {/* Premium Doctor Card Box */}
             <div className="relative w-full aspect-[4/5] md:aspect-[3/4] bg-white/20 backdrop-blur-xl rounded-[3rem] flex items-end justify-center shadow-2xl shadow-brand-plum/10 border border-white/60 p-2 group">
                {/* Backgrounds wrapper to apply overflow hidden without clipping badges */}
                <div className="absolute inset-0 overflow-hidden rounded-[3rem] z-0">
                  <div className="absolute inset-0 bg-gradient-to-b from-brand-blush/30 to-brand-peach/80 z-0"></div>
                  {data.settings.heroImage && (
                    <div className="absolute inset-0 z-0" style={{ backgroundImage: `url(${data.settings.heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                  )}
                </div>
                
                {/* Simulated Doctor Image Area */}
                {!data.settings.heroImage && (
                  <div className="relative w-full h-full flex flex-col items-center justify-center text-center p-8 z-10 rounded-[2.5rem] overflow-hidden bg-brand-ivory/40 backdrop-blur-sm pointer-events-none">
                     <div className="absolute inset-0 bg-gradient-to-t from-brand-plum/20 to-transparent"></div>
                     <div className="w-24 h-24 rounded-full bg-brand-rose/10 flex items-center justify-center mb-6 shadow-xl shadow-brand-rose/10 border border-white relative">
                       <Baby className="w-10 h-10 text-brand-rose opacity-80" />
                       {/* Circular glow behind baby */}
                       <div className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(185,74,117,0.3)] animate-pulse-soft -z-10 bg-brand-rose/5" />
                     </div>
                     <p className="text-sm font-semibold text-brand-plum relative z-10">Doctor Image</p>
                     <p className="text-[10px] uppercase tracking-widest text-brand-plum/60 mt-2 relative z-10">Update in Admin</p>
                  </div>
                )}
                
                {/* Floating Trust Badges overlaying image */}
                <div className="absolute top-12 -left-6 sm:-left-10 glass-card bg-white/90 backdrop-blur-md px-5 py-4 rounded-3xl flex items-center space-x-3 animation-float border border-white shadow-xl shadow-brand-rose/10 z-20">
                  <div className="w-10 h-10 rounded-full bg-brand-blush text-brand-rose flex items-center justify-center shadow-inner">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-heading tracking-widest text-brand-plum text-sm uppercase">{data.settings.heroBadge1Title || "23+ Years"}</p>
                    <p className="text-[10px] text-brand-plum/60 font-semibold tracking-widest uppercase">{data.settings.heroBadge1Subtitle || "Experience"}</p>
                  </div>
                </div>
                
                <div className="absolute bottom-20 -right-4 sm:-right-8 glass-card bg-white/90 backdrop-blur-md px-5 py-4 rounded-3xl flex items-center space-x-3 animation-float-delayed border border-white shadow-xl shadow-brand-plum/10 z-20">
                   <div className="w-10 h-10 rounded-full bg-brand-lavender/30 text-brand-plum flex items-center justify-center shadow-inner">
                    <Heart className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-heading tracking-widest text-brand-plum text-sm uppercase">{data.settings.heroBadge2Title || "4500+"}</p>
                    <p className="text-[10px] text-brand-plum/60 font-semibold tracking-widest uppercase">{data.settings.heroBadge2Subtitle || "IVF Cycles"}</p>
                  </div>
                </div>
             </div>
          </motion.div>
        </div>

        {/* Decorative Wave Divider at Bottom */}
        <div className="absolute bottom-0 w-full overflow-hidden leading-[0]">
          <svg className="relative block w-full h-[60px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C60.36,17.2,120.48,35.8,181.76,49.27A79.06,79.06,0,0,0,321.39,56.44Z" fill="var(--color-brand-ivory)"></path>
          </svg>
        </div>
      </section>

      {/* 2. Trust Strip */}
      <section className="bg-brand-ivory pt-4 pb-12 md:pb-16 mb-12 md:mb-16 relative">
        <div className="absolute right-0 top-10 text-brand-lavender/30 animation-float-rotate scale-150">
           <Dna className="w-48 h-48" />
        </div>
        <div className="container mx-auto px-12 max-w-7xl relative z-10">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-brand-lavender/40">
              {[
                { label: "23+ Years Experience", step: "01", icon: <CheckCircle2 className="w-4 h-4 text-brand-rose opacity-80" /> },
                { label: "4500+ IVF Cycles", step: "02", icon: <Activity className="w-4 h-4 text-brand-rose opacity-80" /> },
                { label: "Advanced Fertility Care", step: "03", icon: <Shield className="w-4 h-4 text-brand-rose opacity-80" /> },
                { label: "Compassionate Consultation", step: "04", icon: <Heart className="w-4 h-4 text-brand-rose opacity-80" /> }
              ].map((item, i) => (
                <div key={i} className="flex flex-col gap-2 pl-8 first:pl-0 group">
                   <div className="flex items-center gap-2 mb-1">
                     <span className="text-[10px] mono uppercase text-brand-rose font-bold">{item.step}</span>
                     {item.icon}
                   </div>
                   <span className="text-sm font-semibold uppercase text-brand-plum tracking-widest group-hover:text-brand-rose transition-colors">{item.label}</span>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* 3. About Preview */}
      <section className="container mx-auto px-12 max-w-7xl mb-12 md:mb-16 relative z-10">
        <div className="absolute top-[-10%] right-[10%] text-brand-peach/40 animation-float pointer-events-none -z-10">
           <Flower2 className="w-48 h-48" />
        </div>
        
        <div className="bg-white/60 backdrop-blur-lg rounded-[3rem] p-8 lg:p-12 border border-brand-lavender/40 shadow-2xl shadow-brand-plum/5 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-bl from-brand-peach/20 to-brand-ivory/50"></div>
          <div className="absolute -top-32 -left-32 w-64 h-64 bg-brand-rose/5 rounded-full blur-[50px] animate-pulse-soft"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            <div className="lg:col-span-5 relative">
              <div className="w-full aspect-[4/5] object-cover bg-white border border-brand-lavender shadow-inner flex items-center justify-center rounded-3xl relative overflow-hidden group-hover:shadow-[0_0_30px_rgba(185,74,117,0.15)] transition-shadow duration-500">
                  <div className="absolute inset-0 bg-brand-blush/20"></div>
                  {data.settings.aboutPageImage ? (
                    <img src={data.settings.aboutPageImage} alt="Dr. Rakhi Goyal" className="absolute inset-0 w-full h-full object-cover z-0" />
                  ) : (
                    <Stethoscope className="w-20 h-20 text-brand-plum/20 z-10" />
                  )}
                  <div className="absolute bottom-6 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-brand-lavender flex items-center shadow-lg shadow-brand-plum/5 z-20">
                    <span className="w-2 h-2 bg-brand-rose/80 rounded-full animate-pulse mr-3"></span>
                    <span className="text-[10px] mono uppercase font-bold text-brand-plum tracking-widest">Medical Director</span>
                  </div>
              </div>
            </div>
            <div className="lg:col-span-7 pl-0 lg:pl-6">
              <span className="text-[10px] mono uppercase text-brand-rose mb-4 block tracking-[0.3em] font-semibold flex items-center">
                 <Sparkles className="w-3 h-3 mr-2" /> Meet The Specialist
              </span>
              <h2 className="sub-display text-[40px] md:text-[60px] text-brand-plum mb-6 uppercase inline-block font-black leading-none drop-shadow-sm">{data.settings.doctorName || "Dr. Rakhi Goyal"}</h2>
              <div className="flex flex-wrap gap-2 mb-8 mt-2">
                 {(data.settings.doctorDegrees ? data.settings.doctorDegrees.split(',').map((s: string) => s.trim()) : ['MBBS', 'MD Obstetrics', 'FNB Reproductive', 'FICOG']).map((qual: string, i: number) => (
                   <span key={i} className="px-4 py-2 bg-brand-ivory border border-brand-lavender/50 shadow-sm text-[10px] mono uppercase text-brand-plum font-bold rounded-full hover:bg-brand-blush transition-colors cursor-default">
                      {qual}
                   </span>
                 ))}
              </div>
              <p className="text-sm font-medium text-brand-plum/80 leading-relaxed mb-8 max-w-xl text-justify">
                {data.settings.aboutText || "Compassionate and personalized reproductive healthcare with over 23 years of experience. We believe every journey is unique and deserves a tailored approach combining medical excellence with emotional support."}
              </p>
              <Link to="/about" className="inline-flex items-center text-[10px] uppercase tracking-[0.3em] font-bold text-white bg-brand-plum hover:bg-brand-rose px-6 py-4 rounded-full transition-all duration-300 shadow-xl shadow-brand-plum/20 hover:-translate-y-1">
                Explore Full Profile <ChevronRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Why Choose */}
      <section className="bg-brand-ivory py-12 md:py-16 border-t border-brand-lavender/40 mb-12 md:mb-16 relative overflow-hidden">
        <div className="absolute left-[-10%] bottom-[10%] text-brand-lavender/40 animation-float-delayed -z-10 scale-150">
           <Dna className="w-64 h-64" />
        </div>
        <div className="container mx-auto px-12 max-w-7xl relative z-10">
           <div className="mb-10">
             <span className="text-[10px] mono uppercase text-brand-rose mb-4 block tracking-[0.3em] font-semibold flex items-center">
                 <Shield className="w-3 h-3 mr-2" /> {data.settings.whyChooseUsTitle || "Why Choose Us"}
             </span>
             <h2 className="sub-display text-[40px] md:text-[60px] text-brand-plum uppercase max-w-2xl leading-[1.1]">{data.settings.whyChooseUsSubtitle || "Precision & Care"}</h2>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {(() => {
                const defaultCards = [
                  { title: "Personalized Fertility Plans", desc: "Every couple's journey is different, care should be planned according to individual needs.", icon: <Heart className="w-6 h-6" /> },
                  { title: "Advanced IVF Guidance", desc: "Patient-focused IVF guidance with clear explanation, careful evaluation, and evidence-based planning.", icon: <Dna className="w-6 h-6" /> },
                  { title: "Recurrent IVF Failure", desc: "Detailed assessment for couples who have faced repeated IVF failures.", icon: <Activity className="w-6 h-6" /> },
                  { title: "Advanced Age Support", desc: "Guidance for women planning pregnancy after 35 or with age-related fertility concerns.", icon: <Sparkles className="w-6 h-6" /> },
                  { title: "Compassionate Counselling", desc: "Emotional and medical support throughout the entire fertility journey.", icon: <Heart className="w-6 h-6" /> },
                  { title: "Comprehensive Approach", desc: "Care covering female & male fertility, PCOS, hysteroscopy, laparoscopy, and more.", icon: <Shield className="w-6 h-6" /> }
                ];
                const customItems = data.settings.whyChooseUsItems || [];
                return defaultCards.map((defaultCard, i) => {
                  const customItem = customItems[i] || {};
                  return {
                    title: customItem.title || defaultCard.title,
                    desc: customItem.desc || defaultCard.desc,
                    icon: defaultCard.icon
                  };
                });
              })().map((card, i) => (
                 <div key={i} className="bg-white/80 backdrop-blur-sm rounded-[2rem] border border-brand-lavender p-6 md:p-8 group hover:border-brand-rose/50 hover:shadow-2xl hover:shadow-brand-rose/10 transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-brand-peach/30 to-transparent rounded-bl-full translate-x-12 -translate-y-12 group-hover:translate-x-0 group-hover:-translate-y-0 transition-transform duration-500"></div>
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-brand-blush to-brand-peach rounded-2xl flex items-center justify-center text-brand-rose mb-5 md:mb-6 shadow-inner border border-white">
                      {card.icon}
                    </div>
                    <h3 className="text-base md:text-lg font-heading uppercase text-brand-plum mb-2 md:mb-3 tracking-wider z-10 relative">{card.title}</h3>
                    <p className="text-xs font-medium text-brand-plum/70 leading-relaxed z-10 relative">{card.desc}</p>
                 </div>
              ))}
           </div>
        </div>
      </section>

      {/* 5. Treatments Preview */}
      <section className="container mx-auto px-12 max-w-7xl mb-12 md:mb-16 relative">
        <div className="absolute top-[20%] right-[0%] w-64 h-64 bg-brand-blush rounded-full blur-[80px] -z-10 mix-blend-multiply"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 border-b border-brand-lavender/50 pb-6">
          <div className="max-w-2xl">
             <span className="text-[10px] mono uppercase text-brand-rose mb-4 block tracking-[0.3em] font-semibold flex items-center">
                 <Flower2 className="w-3 h-3 mr-2" /> Services
             </span>
             <h2 className="sub-display text-[40px] md:text-[60px] text-brand-plum uppercase leading-[1.1]">Fertility Treatments</h2>
          </div>
          <Link to="/treatments" className="mt-6 md:mt-0 text-[10px] uppercase font-bold tracking-[0.3em] text-brand-rose hover:text-brand-plum transition-colors flex items-center border border-brand-lavender px-6 py-3 rounded-full hover:bg-brand-rose/5">
            View All <ChevronRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
           {data.treatments?.slice(0, 3).map((treatment: any, i:number) => (
              <div key={treatment.id} className="bg-white/90 backdrop-blur-md rounded-[2.5rem] border border-brand-lavender p-6 lg:p-8 group cursor-pointer hover:border-brand-rose/40 transition-all duration-300 hover:shadow-2xl hover:shadow-brand-rose/15 hover:-translate-y-2 flex flex-col relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-tr from-transparent to-brand-peach/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-[100%]"></div>
                 
                 <div className="flex justify-between items-start mb-8 relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-brand-ivory border border-brand-lavender flex items-center justify-center text-brand-rose shadow-inner group-hover:bg-brand-rose/5 transition-colors">
                        {i === 0 && <Heart className="w-6 h-6" />}
                        {i === 1 && <Dna className="w-6 h-6" />}
                        {i === 2 && <Stethoscope className="w-6 h-6" />}
                        {i > 2 && <Activity className="w-6 h-6" />}
                    </div>
                    <span className="mono text-xs text-brand-plum/30 font-bold text-2xl tracking-tighter">0{i+1}</span>
                 </div>
                 
                 <h3 className="text-xl font-heading uppercase text-brand-plum tracking-widest leading-snug mb-4 relative z-10">{treatment.title}</h3>
                 
                 <p className="font-medium text-sm text-brand-plum/70 mb-10 max-w-sm line-clamp-3 relative z-10">
                   {treatment.summary}
                 </p>
                 <Link to={`/treatments/${treatment.slug}`} className="mt-auto flex items-center text-[10px] uppercase tracking-[0.3em] font-bold text-brand-rose group-hover:text-brand-plum transition-colors w-fit pb-1 relative z-10">
                    Explore Details <ChevronRight className="w-4 h-4 ml-1" />
                 </Link>
              </div>
           ))}
        </div>
      </section>

      {/* Interactive Tools Section */}
      <section className="container mx-auto px-12 max-w-7xl mb-12 md:mb-16 relative z-10">
        <div className="absolute top-[50%] right-[0%] w-80 h-80 bg-brand-lavender/30 rounded-full blur-[100px] -z-10 mix-blend-multiply"></div>
        <div className="text-center mb-12">
          <span className="text-[10px] mono uppercase text-brand-rose mb-4 block tracking-[0.3em] font-semibold flex items-center justify-center">
            <Sparkles className="w-3 h-3 mr-2" /> {t('home.tools.badge')}
          </span>
          <h2 className="text-3xl md:text-5xl font-light text-brand-plum mb-6 tracking-wide">
            {t('home.tools.title1')} <span className="font-medium italic">{t('home.tools.title2')}</span>
          </h2>
          <p className="text-sm text-brand-plum/70 font-light max-w-2xl mx-auto leading-relaxed">
            {t('home.tools.desc')}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <OvulationCalculator />
          <SuccessRateEstimator />
        </div>
      </section>

      {/* 6. Testimonials Gallery */}
      <section className="container mx-auto px-12 max-w-7xl mb-12 md:mb-16 relative">
        <div className="absolute top-[30%] left-[0%] w-64 h-64 bg-brand-peach/30 rounded-full blur-[80px] -z-10 mix-blend-multiply"></div>
        <div className="text-center mb-12">
          <span className="text-[10px] mono uppercase text-brand-rose mb-4 block tracking-[0.3em] font-semibold flex items-center justify-center">
            <Star className="w-3 h-3 mr-2" /> Patient Stories
          </span>
          <h2 className="sub-display text-[40px] md:text-[60px] text-brand-plum uppercase leading-[1.1]">Words of Love</h2>
        </div>

        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 hide-scrollbar">
          {data.testimonials?.filter((t: any) => t.status === 'published').length > 0 ? (
            data.testimonials.filter((t: any) => t.status === 'published').map((testimonial: any) => (
              <div key={testimonial.id} className="min-w-[320px] md:min-w-[400px] max-w-[400px] snap-center bg-white/60 backdrop-blur-sm rounded-[2rem] p-8 border border-brand-lavender/50 hover:border-brand-rose/40 hover:shadow-2xl hover:shadow-brand-rose/10 transition-all duration-300">
                <div className="flex items-center space-x-1 mb-6 text-brand-rose">
                  {[...Array(testimonial.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm font-medium text-brand-plum/80 italic mb-8 leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center space-x-4 mt-auto">
                  {testimonial.image ? (
                    <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover border-2 border-brand-lavender/50 shadow-sm" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-brand-rose/10 flex items-center justify-center border-2 border-brand-lavender/50 text-brand-rose shadow-sm">
                      <Heart className="w-5 h-5" />
                    </div>
                  )}
                  <div>
                    <h4 className="font-heading uppercase tracking-widest text-brand-plum text-sm">{testimonial.name}</h4>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full text-center py-12 text-brand-plum/50 text-sm mono uppercase tracking-widest">
              More patient stories coming soon.
            </div>
          )}
        </div>
      </section>

      {/* 7. Emotional Trust & Timeline */}
      <section className="bg-gradient-to-br from-brand-rose/90 to-brand-plum py-16 md:py-24 text-center border-y border-brand-lavender relative overflow-hidden my-12 md:my-16">
        <div className="absolute inset-0 opacity-10 mix-blend-overlay" style={{ backgroundImage: `url(${data.settings.bgPatternUrl || 'https://www.transparenttextures.com/patterns/cubes.png'})`}}></div>
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-brand-peach/20 rounded-full blur-[100px] animation-float pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-white/10 rounded-full blur-[80px] animation-float-delayed pointer-events-none"></div>

        {/* Floating Icons */}
        <Heart className="absolute top-[20%] left-[20%] w-12 h-12 text-white/20 animation-float" />
        <Sparkles className="absolute bottom-[20%] right-[25%] w-8 h-8 text-white/30 animation-float-delayed" />
        <Baby className="absolute top-[30%] right-[15%] w-16 h-16 text-brand-peach/10 animation-float-rotate" />

        <div className="container mx-auto px-12 max-w-4xl relative z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-16 bg-white/30 -mt-32"></div>
          
          <h2 className="sub-display text-[50px] md:text-[80px] text-white mb-8 uppercase leading-[0.9] drop-shadow-md">Every Journey Is Different.</h2>
          <p className="text-sm font-mono tracking-widest text-brand-ivory/80 uppercase max-w-2xl mx-auto mb-12 font-medium">
            Fertility care is not only about treatment. It is about understanding, correct diagnosis, and emotional support.
          </p>
          <Link to="/contact" className="inline-block px-12 py-6 bg-white text-brand-plum text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-brand-ivory shadow-2xl shadow-brand-plum/40 rounded-full transition-all hover:-translate-y-1">
             Start Consultation
          </Link>
        </div>
      </section>

      {/* 8. Patient Education */}
      <section className="container mx-auto px-12 max-w-7xl mb-16 md:mb-24 relative">
         <div className="absolute bottom-[20%] left-[-5%] text-brand-peach/30 animation-float-rotate -z-10 scale-[2]">
             <Sparkles className="w-32 h-32" />
         </div>
         <div className="mb-10 flex flex-col md:flex-row justify-between items-end border-b border-brand-lavender/50 pb-6">
            <div>
               <span className="text-[10px] mono uppercase text-brand-rose mb-4 block tracking-[0.3em] font-semibold flex items-center">
                   <Baby className="w-3 h-3 mr-2" /> {data.settings.knowledgeBaseSubtitle || "Knowledge Base"}
               </span>
               <h2 className="sub-display text-[40px] md:text-[60px] text-brand-plum uppercase leading-[1.1]">{data.settings.knowledgeBaseTitle || "Fertility Guidance"}</h2>
            </div>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {data.blogs?.slice(0,3).map((blog: any) => (
              <div key={blog.id} className="group cursor-pointer bg-white/60 backdrop-blur-sm rounded-[2rem] p-6 border border-brand-lavender hover:border-brand-rose/40 hover:shadow-2xl hover:shadow-brand-rose/10 transition-all duration-300 hover:-translate-y-2">
                <div className="w-full aspect-square bg-gradient-to-tr from-brand-blush to-brand-ivory rounded-2xl border border-brand-lavender/50 mb-6 overflow-hidden flex items-center justify-center relative inner-shadow">
                  {blog.image ? (
                    <img src={blog.image} alt={blog.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-brand-rose/5"></div>
                      <div className="w-full h-full bg-brand-peach opacity-30 transition-transform duration-700 group-hover:scale-105 flex items-center justify-center">
                      </div>
                      <Sparkles className="w-12 h-12 text-brand-rose/20 absolute z-10" />
                    </>
                  )}
                </div>
                <div className="flex gap-4 px-2">
                  <span className="text-[10px] font-mono text-brand-rose font-bold uppercase tracking-widest block pt-1">{blog.category}</span>
                  <div>
                    <h3 className="text-lg font-heading uppercase tracking-wider text-brand-plum mb-3 group-hover:text-brand-rose transition-colors leading-snug">{blog.title}</h3>
                    <p className="text-xs font-medium text-brand-plum/70 line-clamp-3 leading-relaxed">{blog.excerpt}</p>
                  </div>
                </div>
              </div>
            ))}
         </div>
      </section>

    </div>
  );
}
