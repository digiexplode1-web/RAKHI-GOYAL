import React, { useState } from 'react';
import { Activity, Info, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function SuccessRateEstimator() {
  const { t } = useLanguage();
  
  const [age, setAge] = useState<string>('<35');
  const [attempts, setAttempts] = useState<string>('0');
  const [condition, setCondition] = useState<string>('unexplained');
  const [estimate, setEstimate] = useState<{ rate: number, pathway: string } | null>(null);

  const calculate = () => {
    let baseRate = 55; // Base hypothetical rate for <35
    let pathway = "Standard IVF protocol often yields good results. Consider pre-implantation genetic testing for optimal outcomes.";

    // Age factor
    if (age === '35-37') baseRate -= 10;
    else if (age === '38-40') baseRate -= 25;
    else if (age === '>40') baseRate -= 40;

    // Attempts factor
    if (attempts === '1') baseRate -= 5;
    else if (attempts === '2') {
      baseRate -= 15;
      pathway = "Advanced evaluation recommended for recurrent implantation failure. ERA or advanced genetic screening may be suggested.";
    }
    else if (attempts === '3+') {
      baseRate -= 25;
      pathway = "Personalized advanced protocol required. Donor options might be discussed as an alternative pathway to parenthood.";
    }

    // Condition factor
    if (condition === 'pcos') {
      // PCOS often has good egg counts but quality or OHSS risk
      pathway = "Specific protocol to manage OHSS risk while maximizing egg quality is recommended.";
    } else if (condition === 'endo') {
      baseRate -= 10;
      pathway = "Endometriosis management before or during IVF cycle is crucial. Long protocol might be beneficial.";
    } else if (condition === 'male') {
      pathway = "ICSI (Intracytoplasmic Sperm Injection) is highly recommended to overcome male factor challenges.";
    }

    // Floor and ceiling
    const finalRate = Math.max(5, Math.min(75, baseRate));
    
    setEstimate({ rate: finalRate, pathway });
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgba(123,46,79,0.06)] border border-[#EBCFD9] max-w-xl w-full mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-full bg-brand-plum/10 flex items-center justify-center text-brand-plum">
          <Activity className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-normal text-brand-plum tracking-wide">{t('tools.ivf.title')}</h3>
          <p className="text-xs text-brand-plum/70 font-light mt-1">{t('tools.ivf.desc')}</p>
        </div>
      </div>
      
      <div className="space-y-5">
        <div>
          <label className="block text-xs uppercase tracking-widest text-brand-plum font-semibold mb-2">
            {t('tools.ivf.age')}
          </label>
          <div className="grid grid-cols-4 gap-2">
            {['<35', '35-37', '38-40', '>40'].map(val => (
              <button 
                key={val}
                onClick={() => setAge(val)}
                className={`py-2 text-xs font-bold rounded-lg border transition-all ${age === val ? 'bg-brand-rose text-white border-brand-rose' : 'bg-transparent text-brand-plum border-brand-lavender hover:bg-brand-peach'}`}
              >
                {val}
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <label className="block text-xs uppercase tracking-widest text-brand-plum font-semibold mb-2">
            {t('tools.ivf.attempts')}
          </label>
          <div className="grid grid-cols-4 gap-2">
            {['0', '1', '2', '3+'].map(val => (
              <button 
                key={val}
                onClick={() => setAttempts(val)}
                className={`py-2 text-xs font-bold rounded-lg border transition-all ${attempts === val ? 'bg-brand-plum text-white border-brand-plum' : 'bg-transparent text-brand-plum border-brand-lavender hover:bg-brand-peach'}`}
              >
                {val}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest text-brand-plum font-semibold mb-2">
            {t('tools.ivf.condition')}
          </label>
          <select 
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            className="w-full bg-brand-peach/30 border border-[#EBCFD9] rounded-xl px-4 py-3 text-sm text-brand-dark focus:outline-none focus:border-brand-rose"
          >
            <option value="unexplained">{t('tools.ivf.condition.unexplained')}</option>
            <option value="pcos">{t('tools.ivf.condition.pcos')}</option>
            <option value="endo">{t('tools.ivf.condition.endo')}</option>
            <option value="male">{t('tools.ivf.condition.male')}</option>
          </select>
        </div>

        <button 
          onClick={calculate}
          className="w-full bg-brand-plum text-white py-4 rounded-xl text-xs uppercase tracking-[0.2em] font-bold shadow-lg shadow-brand-plum/30 hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
        >
          {t('tools.ivf.estimate')} <ArrowRight className="w-4 h-4" />
        </button>

        {estimate && (
          <div className="mt-6 bg-brand-lavender/30 p-6 rounded-2xl border border-brand-plum/20">
            <div className="mb-4 flex flex-col items-center">
              <span className="block text-[10px] uppercase tracking-[0.2em] text-brand-plum/70 font-bold mb-2">{t('tools.ivf.result.title')}</span>
              <div className="text-4xl font-bold text-brand-plum flex items-baseline">
                ~{estimate.rate}<span className="text-2xl text-brand-plum/60">%</span>
              </div>
            </div>
            <div className="text-center mt-4 pt-4 border-t border-brand-plum/10">
              <p className="text-sm text-brand-dark leading-relaxed">
                {estimate.pathway}
              </p>
            </div>
          </div>
        )}
        
        <div className="flex items-start gap-2 mt-4 text-brand-dark/50 text-[10px] italic">
          <Info className="w-4 h-4 flex-shrink-0" />
          <p>{t('tools.ivf.disclaimer')}</p>
        </div>
      </div>
    </div>
  );
}
