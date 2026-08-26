import React, { useState } from "react";
import { Phone, MapPin, Mail, MessageCircle, Clock, CalendarDays } from "lucide-react";
import { useOutletContext } from "react-router-dom";

export default function Contact() {
  const data = useOutletContext<any>();
  const [form, setForm] = useState({ name: "", phone: "", age: "", city: "", concern: "", date: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setSuccess(true);
        setForm({ name: "", phone: "", age: "", city: "", concern: "", date: "", message: "" });
      }
    } catch(err) {
      alert("Something went wrong");
    }
    setSubmitting(false);
  };

  return (
    <div className="pt-24 md:pt-32 pb-20">
      <div className="container mx-auto px-12 max-w-7xl">
        <div className="mb-16 border-b border-brand-lavender/50 pb-8">
          <span className="text-[10px] mono uppercase text-brand-rose mb-4 block tracking-[0.3em] font-semibold">Contact</span>
          <h1 className="sub-display text-[50px] md:text-[80px] text-brand-plum mb-4 uppercase drop-shadow-sm">Book Your Consultation</h1>
          <p className="text-sm font-mono text-brand-plum/70 tracking-widest max-w-xl font-medium">Take the first step towards personalized fertility guidance.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
           <div className="lg:col-span-5 space-y-8">
              <div className="bg-brand-blush p-10 border border-brand-lavender rounded-[2rem] shadow-xl shadow-brand-rose/5">
                 <h3 className="text-2xl font-heading uppercase tracking-widest text-brand-plum mb-10">Contact Details</h3>
                 <ul className="space-y-10">
                    <li className="flex items-start">
                      <div className="w-10 h-10 bg-white border border-brand-lavender rounded-xl flex items-center justify-center text-brand-plum shrink-0 mr-6 shadow-sm">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-brand-rose mb-2 font-semibold">Call Us Directly</p>
                        <p className="text-xl font-heading tracking-widest text-brand-plum">{data?.settings?.contactPhone}</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-10 h-10 bg-white border border-brand-lavender rounded-xl flex items-center justify-center text-brand-rose shrink-0 mr-6 shadow-sm">
                        <MessageCircle className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-brand-rose mb-2 font-semibold">WhatsApp Fast Reply</p>
                        <a 
                          href={`https://wa.me/91${data?.settings?.contactPhone?.replace(/\s/g, '')}?text=${encodeURIComponent(data?.settings?.whatsappMessage || '')}`} 
                          target="_blank" rel="noreferrer"
                          className="text-brand-plum text-sm font-mono hover:text-brand-rose transition-colors uppercase mt-1 inline-block font-semibold">
                          Chat on WhatsApp
                        </a>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-10 h-10 bg-white border border-brand-lavender rounded-xl flex items-center justify-center text-brand-plum shrink-0 mr-6 shadow-sm">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-brand-rose mb-2 font-semibold">Consultation Hours</p>
                        <p className="font-mono text-brand-plum text-sm uppercase font-semibold">Mon - Sat: 10:00 AM - 6:00 PM</p>
                        <p className="text-brand-plum/60 text-xs font-mono uppercase mt-2 font-semibold">Sunday Closed</p>
                      </div>
                    </li>
                 </ul>
              </div>
           </div>

           <div className="lg:col-span-7">
             <div className="bg-white p-8 md:p-12 border border-brand-lavender rounded-[2rem] shadow-xl shadow-brand-rose/10">
                <h3 className="text-3xl font-heading uppercase tracking-widest text-brand-plum mb-10">Request an Appointment</h3>
                {success ? (
                  <div className="bg-brand-ivory border border-brand-lavender text-brand-plum p-8 text-left rounded-xl">
                     <p className="font-heading text-2xl uppercase tracking-widest mb-4">Request Received</p>
                     <p className="font-medium text-brand-plum/70 mb-8">Our team will contact you shortly to confirm your appointment time.</p>
                     <button onClick={()=>setSuccess(false)} className="px-8 py-4 bg-brand-rose text-white text-[10px] uppercase tracking-[0.3em] font-semibold hover:opacity-90 rounded-sm transition-opacity shadow-sm">Book another</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <label className="block text-[10px] uppercase tracking-[0.3em] text-brand-plum/70 font-semibold mb-4">Full Name *</label>
                        <input required type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-4 py-4 border-b-2 border-brand-lavender focus:border-brand-rose focus:outline-none bg-brand-ivory text-brand-plum font-mono text-sm rounded-t-xl transition-colors" />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-[0.3em] text-brand-plum/70 font-semibold mb-4">Phone Number *</label>
                        <input required type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full px-4 py-4 border-b-2 border-brand-lavender focus:border-brand-rose focus:outline-none bg-brand-ivory text-brand-plum font-mono text-sm rounded-t-xl transition-colors" />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-[0.3em] text-brand-plum/70 font-semibold mb-4">Age</label>
                        <input type="text" value={form.age} onChange={e => setForm({...form, age: e.target.value})} className="w-full px-4 py-4 border-b-2 border-brand-lavender focus:border-brand-rose focus:outline-none bg-brand-ivory text-brand-plum font-mono text-sm rounded-t-xl transition-colors" />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-[0.3em] text-brand-plum/70 font-semibold mb-4">City</label>
                        <input type="text" value={form.city} onChange={e => setForm({...form, city: e.target.value})} className="w-full px-4 py-4 border-b-2 border-brand-lavender focus:border-brand-rose focus:outline-none bg-brand-ivory text-brand-plum font-mono text-sm rounded-t-xl transition-colors" />
                      </div>
                    </div>
                    
                    <div>
                        <label className="block text-[10px] uppercase tracking-[0.3em] text-brand-plum/70 font-semibold mb-4">Primary Concern *</label>
                        <select required value={form.concern} onChange={e => setForm({...form, concern: e.target.value})} className="w-full px-4 py-4 border-b-2 border-brand-lavender focus:border-brand-rose focus:outline-none bg-brand-ivory text-brand-plum font-mono text-sm uppercase appearance-none rounded-t-xl transition-colors">
                           <option value="" disabled className="text-brand-plum/50">Select an option</option>
                           <option value="IVF Inquiry">IVF Treatment Inquiry</option>
                           <option value="IUI Inquiry">IUI Treatment Inquiry</option>
                           <option value="Female Infertility">Female Infertility</option>
                           <option value="Male Infertility">Male Infertility Evaluation</option>
                           <option value="Recurrent IVF Failure">Recurrent IVF Failure</option>
                           <option value="PCOS">PCOS & Ovulation Options</option>
                           <option value="General Consultation">General Fertility Consultation</option>
                        </select>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.3em] text-brand-plum/70 font-semibold mb-4">Preferred Date (Optional)</label>
                      <div className="relative">
                        <input type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} className="w-full pl-4 pr-10 py-4 border-b-2 border-brand-lavender focus:border-brand-rose focus:outline-none bg-brand-ivory text-brand-plum font-mono text-sm uppercase styled-date rounded-t-xl transition-colors" />
                        <CalendarDays className="absolute right-4 top-4 text-brand-rose w-5 h-5 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                       <label className="block text-[10px] uppercase tracking-[0.3em] text-brand-plum/70 font-semibold mb-4">Message or Medical History (Optional)</label>
                       <textarea rows={4} value={form.message} onChange={e => setForm({...form, message: e.target.value})} className="w-full px-4 py-4 border-b-2 border-brand-lavender focus:border-brand-rose focus:outline-none bg-brand-ivory text-brand-plum font-mono text-sm rounded-t-xl transition-colors"></textarea>
                    </div>

                    <button type="submit" disabled={submitting} className="w-full px-8 py-5 bg-gradient-to-r from-brand-rose to-brand-plum hover:opacity-90 transition-opacity text-white text-[10px] uppercase tracking-[0.3em] font-semibold flex items-center justify-center mt-12 disabled:opacity-50 rounded-sm shadow-xl shadow-brand-rose/20">
                      {submitting ? "Processing..." : "Submit Request"}
                    </button>
                  </form>
                )}
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
