import React from "react";
import { useOutletContext, Link } from "react-router-dom";
import { Baby, ChevronRight } from "lucide-react";

export default function Treatments() {
  const data = useOutletContext<any>();

  return (
    <div className="pt-24 md:pt-32 pb-20">
      <div className="container mx-auto px-12 max-w-7xl">
        <div className="mb-16 border-b border-brand-lavender pb-8">
          <span className="text-[10px] mono uppercase text-brand-rose mb-4 block tracking-[0.3em] font-semibold">Services</span>
          <h1 className="sub-display text-[50px] md:text-[80px] text-brand-plum uppercase mb-4 max-w-4xl leading-[0.9]">Fertility Treatments <br/>& Reproductive Care</h1>
          <p className="text-sm font-mono text-brand-plum/80 tracking-widest max-w-xl uppercase mt-8 font-medium">Explore personalized options and expert guidance for different fertility concerns.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
           {data?.treatments?.map((treatment: any, i:number) => (
              <div key={treatment.id} className="bg-white rounded-[2rem] border border-brand-lavender p-6 md:p-8 group cursor-pointer hover:border-brand-rose/50 transition-all hover:shadow-xl hover:shadow-brand-rose/10 flex flex-col h-full">
                 <div className="flex justify-between items-start mb-6">
                    <h3 className="text-xl font-heading uppercase text-brand-plum tracking-widest leading-snug">{treatment.title}</h3>
                    <span className="mono text-[10px] text-brand-rose/50 font-bold">0{i+1}</span>
                 </div>
                 <p className="font-medium text-sm text-brand-plum/70 mb-12 leading-relaxed flex-grow">
                   {treatment.summary}
                 </p>
                 <Link to={`/treatments/${treatment.slug}`} className="mt-auto flex items-center text-[10px] uppercase tracking-[0.3em] font-bold text-brand-rose group-hover:text-brand-plum transition-colors w-fit border-b border-transparent group-hover:border-brand-plum pb-1">
                    Explore Details <ChevronRight className="w-4 h-4 ml-1" />
                 </Link>
              </div>
           ))}
        </div>
        
        <div className="mt-20 md:mt-32 pt-16 md:pt-20 border-t border-brand-lavender text-center max-w-3xl mx-auto">
           <h3 className="sub-display text-[40px] text-brand-plum uppercase mb-8">Not sure which path?</h3>
           <p className="text-sm font-mono text-brand-plum/70 tracking-widest uppercase mb-12 font-medium">Every fertility journey is highly individual. The best approach is always decided after a comprehensive evaluation.</p>
           <Link to="/contact" className="px-12 py-6 bg-gradient-to-r from-brand-rose to-brand-plum text-white text-[10px] uppercase tracking-[0.3em] font-semibold hover:opacity-90 shadow-xl shadow-brand-rose/20 rounded-sm transition-opacity inline-block">
                Start Evaluation
           </Link>
        </div>
      </div>
    </div>
  );
}
