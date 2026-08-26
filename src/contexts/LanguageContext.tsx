import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.treatments': 'Treatments',
    'nav.about': 'About Dr. Rakhi',
    'nav.contact': 'Contact',
    'nav.admin': 'Admin Portal',
    
    // Tools
    'tools.ovulation.title': 'Ovulation & Fertility Window Calculator',
    'tools.ovulation.desc': 'Estimate your most fertile days to plan your pregnancy journey.',
    'tools.ovulation.lastPeriod': 'Last Period Start Date',
    'tools.ovulation.cycleLength': 'Average Cycle Length (Days)',
    'tools.ovulation.calculate': 'Calculate',
    'tools.ovulation.disclaimer': '*Medical Disclaimer: This tool provides estimates only and should not replace professional medical advice.',
    'tools.ovulation.result.ovulation': 'Estimated Ovulation Date',
    'tools.ovulation.result.window': 'Peak Fertility Window',
    
    'tools.ivf.title': 'IVF Success Rate Estimator',
    'tools.ivf.desc': 'Get a general estimate of treatment success based on your profile.',
    'tools.ivf.age': 'Age Group',
    'tools.ivf.attempts': 'Previous IVF Attempts',
    'tools.ivf.condition': 'Primary Condition',
    'tools.ivf.estimate': 'Estimate Success Rate',
    'tools.ivf.result.title': 'Estimated Success Rate',
    'tools.ivf.disclaimer': '*Medical Disclaimer: This is a general statistical estimate. Individual success varies greatly based on thorough clinical evaluation.',
    'tools.ivf.condition.pcos': 'PCOS',
    'tools.ivf.condition.endo': 'Endometriosis',
    'tools.ivf.condition.male': 'Male Factor',
    'tools.ivf.condition.unexplained': 'Unexplained',
    
    // Sections
    'home.tools.badge': 'Interactive Tools',
    'home.tools.title1': 'Plan Your ',
    'home.tools.title2': 'Journey',
    'home.tools.desc': 'Use our interactive estimators to understand your fertility window and explore potential treatment success pathways.',
    
    // General
    'general.bookAppt': 'Book Consultation',
    'general.callNow': 'Call Now',
    'general.whatsapp': 'WhatsApp'
  },
  hi: {
    // Navigation
    'nav.home': 'होम',
    'nav.treatments': 'इलाज',
    'nav.about': 'डॉ. राखी के बारे में',
    'nav.contact': 'संपर्क करें',
    'nav.admin': 'एडमिन पोर्टल',

    // Tools
    'tools.ovulation.title': 'ओव्यूलेशन और फर्टिलिटी विंडो कैलकुलेटर',
    'tools.ovulation.desc': 'अपनी गर्भावस्था की योजना बनाने के लिए अपने सबसे उपजाऊ दिनों का अनुमान लगाएं।',
    'tools.ovulation.lastPeriod': 'पिछली माहवारी शुरू होने की तिथि',
    'tools.ovulation.cycleLength': 'औसत चक्र की लंबाई (दिन)',
    'tools.ovulation.calculate': 'गणना करें',
    'tools.ovulation.disclaimer': '*मेडिकल अस्वीकरण: यह टूल केवल अनुमान प्रदान करता है और पेशेवर चिकित्सा सलाह का स्थान नहीं लेना चाहिए।',
    'tools.ovulation.result.ovulation': 'अनुमानित ओव्यूलेशन तिथि',
    'tools.ovulation.result.window': 'पीक फर्टिलिटी विंडो',

    'tools.ivf.title': 'आईवीएफ सफलता दर अनुमानक (IVF Success Rate)',
    'tools.ivf.desc': 'अपनी प्रोफ़ाइल के आधार पर इलाज की सफलता का सामान्य अनुमान प्राप्त करें।',
    'tools.ivf.age': 'आयु वर्ग',
    'tools.ivf.attempts': 'पिछले आईवीएफ प्रयास',
    'tools.ivf.condition': 'मुख्य स्थिति (बीमारी)',
    'tools.ivf.estimate': 'सफलता दर का अनुमान लगाएं',
    'tools.ivf.result.title': 'अनुमानित सफलता दर',
    'tools.ivf.disclaimer': '*मेडिकल अस्वीकरण: यह एक सामान्य सांख्यिकीय अनुमान है। गहन नैदानिक ​​मूल्यांकन के आधार पर व्यक्तिगत सफलता बहुत भिन्न होती है।',
    'tools.ivf.condition.pcos': 'पीसीओएस (PCOS)',
    'tools.ivf.condition.endo': 'एंडोमेट्रियोसिस',
    'tools.ivf.condition.male': 'पुरुष कारक',
    'tools.ivf.condition.unexplained': 'अस्पष्ट',

    // Sections
    'home.tools.badge': 'इंटरएक्टिव टूल्स',
    'home.tools.title1': 'अपनी ',
    'home.tools.title2': 'योजना बनाएं',
    'home.tools.desc': 'अपनी फर्टिलिटी विंडो को समझने और संभावित उपचार सफलता मार्गों का पता लगाने के लिए हमारे इंटरैक्टिव अनुमानकों का उपयोग करें।',

    // General
    'general.bookAppt': 'परामर्श बुक करें',
    'general.callNow': 'कॉल करें',
    'general.whatsapp': 'व्हाट्सएप'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
