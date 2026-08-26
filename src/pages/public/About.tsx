import React from "react";
import { useOutletContext, Link } from "react-router-dom";
import { Stethoscope, Award, BookOpen, HeartPulse } from "lucide-react";

export default function About() {
  const data = useOutletContext<any>();

  return (
    <div className="pt-24 md:pt-32 pb-20">
      
      {/* Bio Section */}
      <section className="container mx-auto px-12 max-w-7xl mb-16 md:mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
           <div className="relative">
              <div className="w-full aspect-[4/5] object-cover bg-white border border-brand-lavender shadow-2xl flex items-center justify-center relative overflow-hidden rounded-[2rem]">
                  {data?.settings?.aboutPageImage ? (
                    <img src={data.settings.aboutPageImage} alt={data?.settings?.doctorName || "Dr. Rakhi Goyal"} className="w-full h-full object-cover" />
                  ) : (
                    <Stethoscope className="w-24 h-24 text-brand-plum/20" />
                  )}
                  <div className="absolute bottom-8 left-8 right-8 z-20 border-t border-brand-lavender pt-4 bg-white/80 backdrop-blur-md p-4 rounded-xl">
                     <p className="font-heading uppercase tracking-widest text-2xl text-brand-plum">{data?.settings?.doctorName || "Dr. Rakhi Goyal"}</p>
                     <p className="font-mono text-brand-plum/70 uppercase text-[10px] tracking-widest mt-1 font-bold">Fertility & IVF Specialist</p>
                  </div>
              </div>
           </div>
           
           <div>
              <span className="text-[10px] mono uppercase text-brand-rose mb-4 block tracking-[0.3em] font-semibold">About The Doctor</span>
              <h1 className="sub-display text-[50px] md:text-[80px] text-brand-plum leading-[0.9] mb-8 uppercase drop-shadow-sm whitespace-pre-line">{data?.settings?.aboutPageHeadline || "Dedicated to\nYour Journey"}</h1>
              
              <div className="text-sm font-medium text-brand-plum/80 leading-relaxed mb-8 max-w-lg space-y-6">
                 <p>{data?.settings?.aboutText}</p>
                 <p className="whitespace-pre-line">
                   {data?.settings?.aboutPageDescription || "With a deep commitment to ethical, evidence-based, and compassionate care, Dr. Goyal believes that every couple's journey is unique. Treatment plans are highly personalized, ensuring patience, transparency, and emotional support at every step."}
                 </p>
              </div>

              <h3 className="text-xl font-heading uppercase text-brand-plum mb-6 tracking-widest border-b border-brand-lavender pb-4 inline-block">Qualifications</h3>
              <ul className="space-y-4 mb-12 border-l border-brand-lavender pl-4">
                 {['MBBS', 'MD Obstetrics & Gynaecology', 'FNB Reproductive Medicine', 'FICOG'].map((qual, i) => (
                    <li key={i} className="flex items-center text-sm font-mono uppercase text-brand-plum/80 tracking-widest font-semibold">
                       <Award className="w-4 h-4 text-brand-rose mr-4 shrink-0" />
                       {qual}
                    </li>
                 ))}
              </ul>

              <Link to="/contact" className="px-8 py-5 bg-gradient-to-r from-brand-rose to-brand-plum hover:opacity-90 transition-opacity text-white text-[10px] uppercase tracking-[0.3em] font-semibold flex items-center justify-center w-fit rounded-sm shadow-xl shadow-brand-rose/20">
                {data?.settings?.ctaPrimaryText || "Start Consultation"}
              </Link>
           </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-brand-peach py-16 md:py-24 border-y border-brand-lavender my-12 md:my-16">
        <div className="container mx-auto px-12 max-w-4xl text-center relative">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-16 bg-brand-rose opacity-40 -mt-24 md:-mt-32"></div>
           <span className="text-[10px] mono uppercase text-brand-rose font-semibold mb-6 block tracking-[0.3em]">Care Philosophy</span>
           <p className="sub-display text-[40px] md:text-[60px] text-brand-plum uppercase leading-[1.1] mb-8">
             "Fertility treatment should be clear, personalized, ethical, and emotionally supportive."
           </p>
           <p className="text-sm font-mono text-brand-plum/80 tracking-widest max-w-2xl mx-auto uppercase font-medium">
             Every couple deserves time, understanding, and a medical strategy created specifically around their clinical reality.
           </p>
        </div>
      </section>

    </div>
  );
}
