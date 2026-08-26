import React from "react";
import { useOutletContext, useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function TreatmentDetail() {
  const { slug } = useParams();
  const data = useOutletContext<any>();
  
  const treatment = data?.treatments?.find((t: any) => t.slug === slug);

  if (!treatment) {
    return (
      <div className="pt-32 pb-20 container mx-auto px-4 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-3xl font-heading font-bold text-brand-plum mb-4">Treatment Not Found</h1>
        <p className="mb-8 text-brand-dark/70">The information you're looking for could not be found.</p>
        <Link to="/treatments" className="text-brand-plum hover:underline font-medium flex items-center">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Treatments
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 md:pt-32 pb-20">
      
      {/* Hero */}
      <section className="border-b border-brand-lavender/50 py-16 md:py-24 mb-16 relative overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-tr from-brand-blush to-brand-ivory -z-10" />
         <div className="container mx-auto px-12 max-w-4xl text-center relative z-10">
            <Link to="/treatments" className="inline-flex items-center text-brand-rose hover:text-brand-plum uppercase tracking-[0.3em] font-semibold text-[10px] mb-12 transition-colors">
               <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Link>
            <h1 className="sub-display text-[50px] md:text-[80px] text-brand-plum uppercase leading-[0.9] mb-8">{treatment.title}</h1>
            <p className="text-sm font-medium text-brand-plum/80 leading-relaxed max-w-2xl mx-auto">{treatment.summary}</p>
         </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-12 max-w-4xl">
         <div className="px-0">
            <p className="text-sm font-medium text-brand-plum/80 leading-relaxed mb-16 max-w-3xl border-l-2 border-brand-rose/30 pl-6">{treatment.content}</p>

            <div className="bg-brand-peach p-10 md:p-16 border border-brand-lavender my-20 text-center relative rounded-[2rem] shadow-xl shadow-brand-rose/5">
               <h3 className="text-3xl font-heading uppercase tracking-widest mb-6 text-brand-plum">Ready for evaluation?</h3>
               <p className="text-sm font-mono text-brand-plum/70 uppercase tracking-widest mb-10 max-w-lg mx-auto font-medium">Discuss if {treatment.title} is the correct step for your journey.</p>
               <Link to="/contact" className="px-12 py-6 bg-gradient-to-r from-brand-rose to-brand-plum hover:opacity-90 transition-opacity text-white text-[10px] uppercase tracking-[0.3em] font-semibold inline-block rounded-sm shadow-xl shadow-brand-rose/20">
                 Request Consultation
               </Link>
            </div>
         </div>
      </section>
    </div>
  );
}
