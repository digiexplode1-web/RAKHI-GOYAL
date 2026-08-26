import React, { useState } from 'react';
import { Calendar, Info } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function OvulationCalculator() {
  const { t } = useLanguage();
  const [lastPeriod, setLastPeriod] = useState<string>('');
  const [cycleLength, setCycleLength] = useState<number>(28);
  const [result, setResult] = useState<{ ovulationDate: string, windowStart: string, windowEnd: string } | null>(null);

  const calculate = () => {
    if (!lastPeriod) return;
    
    const startDate = new Date(lastPeriod);
    
    // Ovulation is usually 14 days before the NEXT period.
    // So: nextPeriod = startDate + cycleLength.
    // ovulationDate = nextPeriod - 14.
    // Alternatively: ovulationDate = startDate + cycleLength - 14.
    const ovulationOffset = cycleLength - 14;
    
    const ovulationDate = new Date(startDate);
    ovulationDate.setDate(startDate.getDate() + ovulationOffset);
    
    const windowStart = new Date(ovulationDate);
    windowStart.setDate(ovulationDate.getDate() - 4);
    
    const windowEnd = new Date(ovulationDate);
    windowEnd.setDate(ovulationDate.getDate() + 1);

    const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };

    setResult({
      ovulationDate: ovulationDate.toLocaleDateString(undefined, options),
      windowStart: windowStart.toLocaleDateString(undefined, options),
      windowEnd: windowEnd.toLocaleDateString(undefined, options)
    });
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgba(123,46,79,0.06)] border border-[#EBCFD9] max-w-xl w-full mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-full bg-brand-rose/10 flex items-center justify-center text-brand-rose">
          <Calendar className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-normal text-brand-plum tracking-wide">{t('tools.ovulation.title')}</h3>
          <p className="text-xs text-brand-plum/70 font-light mt-1">{t('tools.ovulation.desc')}</p>
        </div>
      </div>
      
      <div className="space-y-5">
        <div>
          <label className="block text-xs uppercase tracking-widest text-brand-plum font-semibold mb-2">
            {t('tools.ovulation.lastPeriod')}
          </label>
          <input 
            type="date" 
            value={lastPeriod}
            onChange={(e) => setLastPeriod(e.target.value)}
            className="w-full bg-brand-peach/30 border border-[#EBCFD9] rounded-xl px-4 py-3 text-sm text-brand-dark focus:outline-none focus:border-brand-rose focus:ring-1 focus:ring-brand-rose"
          />
        </div>
        
        <div>
          <label className="block text-xs uppercase tracking-widest text-brand-plum font-semibold mb-2">
            {t('tools.ovulation.cycleLength')}
          </label>
          <div className="flex items-center gap-4">
            <input 
              type="range" 
              min="21" max="35" 
              value={cycleLength}
              onChange={(e) => setCycleLength(parseInt(e.target.value))}
              className="flex-grow accent-brand-rose"
            />
            <span className="text-lg font-mono text-brand-plum font-bold bg-brand-lavender/30 px-4 py-2 rounded-lg">
              {cycleLength}
            </span>
          </div>
        </div>

        <button 
          onClick={calculate}
          disabled={!lastPeriod}
          className="w-full bg-gradient-to-r from-brand-rose to-[#9E3F64] text-white py-4 rounded-xl text-xs uppercase tracking-[0.2em] font-bold shadow-lg shadow-brand-rose/30 hover:-translate-y-1 transition-all disabled:opacity-50 disabled:hover:translate-y-0"
        >
          {t('tools.ovulation.calculate')}
        </button>

        {result && (
          <div className="mt-6 bg-brand-blush/40 p-6 rounded-2xl border border-brand-lavender">
            <div className="mb-4 text-center">
              <span className="block text-[10px] uppercase tracking-[0.2em] text-brand-plum/70 font-bold mb-1">{t('tools.ovulation.result.ovulation')}</span>
              <span className="text-xl font-medium text-brand-rose">{result.ovulationDate}</span>
            </div>
            <div className="text-center">
              <span className="block text-[10px] uppercase tracking-[0.2em] text-brand-plum/70 font-bold mb-1">{t('tools.ovulation.result.window')}</span>
              <span className="text-lg text-brand-dark">
                {result.windowStart} - {result.windowEnd}
              </span>
            </div>
          </div>
        )}
        
        <div className="flex items-start gap-2 mt-4 text-brand-dark/50 text-[10px] italic">
          <Info className="w-4 h-4 flex-shrink-0" />
          <p>{t('tools.ovulation.disclaimer')}</p>
        </div>
      </div>
    </div>
  );
}
