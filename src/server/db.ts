import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

if (getApps().length === 0) {
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    try {
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
      initializeApp({ credential: cert(serviceAccount) });
    } catch (e) {
      console.warn("Failed to parse FIREBASE_SERVICE_ACCOUNT JSON, falling back to default project ID:", e);
      initializeApp({ projectId: process.env.FIREBASE_PROJECT_ID || "natural-shift-jthv3" });
    }
  } else {
    initializeApp({ projectId: process.env.FIREBASE_PROJECT_ID || "natural-shift-jthv3" });
  }
}

const db = getFirestore();

// Default initial state
const defaultData = {
  settings: {
    heroHeadline: "Your Parenthood Journey Deserves Expert Fertility Care",
    heroSubheadline: "Consult Dr. Rakhi Goyal, Fertility & IVF Specialist with 23+ years of experience and 4500+ IVF cycles.",
    contactPhone: "78148 83261",
    contactEmail: "care@drrakhigoyal.example.com", 
    whatsappMessage: "Hello Dr. Rakhi Goyal team, I want to book a fertility consultation.",
    aboutText: "Dr. Rakhi Goyal is a Fertility & IVF Specialist with 23+ years of experience in reproductive medicine and gynecology. She has helped thousands of couples through personalized fertility care, IVF treatment, recurrent IVF failure evaluation, advanced-age fertility planning, hysteroscopy, laparoscopy, and reproductive health counselling.",
    seoTitle: "Dr. Rakhi Goyal | Fertility & IVF Specialist",
    seoDescription: "Consult Dr. Rakhi Goyal, Fertility & IVF Specialist with 23+ years of experience and 4500+ IVF cycles. Book appointment for IVF, IUI, PCOS, recurrent IVF failure, and fertility guidance.",
    heroImage: "",
    aboutPageImage: "",
    bgPatternUrl: ""
  },
  leads: [],
  treatments: [
    {
      id: "ivf-treatment",
      title: "IVF Treatment",
      slug: "ivf-treatment",
      summary: "Advanced fertility treatment where eggs and sperm are combined outside the body.",
      content: "IVF is an advanced fertility treatment where eggs and sperm are combined outside the body, and the resulting embryo is transferred into the uterus."
    },
    {
      id: "iui-treatment",
      title: "IUI Treatment",
      slug: "iui-treatment",
      summary: "Prepared sperm is placed directly inside the uterus around the time of ovulation.",
      content: "IUI is a fertility treatment where prepared sperm is placed directly inside the uterus around the time of ovulation."
    }
  ],
  blogs: [
    {
      id: "reports-normal-not-pregnant",
      title: "Reports Normal, Still Not Pregnant?",
      slug: "reports-normal-not-pregnant",
      category: "Unexplained Infertility",
      excerpt: "Understanding why pregnancy might not happen even when basic tests are normal.",
      content: "Sometimes basic fertility tests appear normal, leaving couples confused. This is often called unexplained infertility. A fertility specialist can guide you through advanced evaluations to find the root cause.",
      status: "published"
    }
  ],
  testimonials: [
    {
      id: "t1",
      name: "Anonymous Patient",
      rating: 5,
      treatment: "IVF Treatment",
      text: "Dr. Rakhi Goyal was incredibly supportive throughout our journey. Her guidance was clear and kind.",
      date: "2023-11-15",
      status: "published"
    }
  ],
  faqs: [
    {
      id: "f1",
      question: "When should a couple consult a fertility specialist?",
      answer: "A couple should consider consultation if pregnancy has not happened after regular trying for 12 months, or after 6 months if the female partner is above 35."
    },
    {
      id: "f2",
      question: "Is IVF the only option for infertility?",
      answer: "No. Treatment depends on the cause. Some couples may need medicines, lifestyle guidance, IUI, IVF, or further evaluation."
    }
  ],
  gallery: []
};

async function ensureDb() {
  const settingsDoc = await db.collection("settings").doc("global").get();
  if (!settingsDoc.exists) {
    await db.collection("settings").doc("global").set(defaultData.settings);
    
    for (const treatment of defaultData.treatments) {
      await db.collection("treatments").doc(treatment.id).set(treatment);
    }
    for (const blog of defaultData.blogs) {
      await db.collection("blogs").doc(blog.id).set(blog);
    }
    for (const testimonial of defaultData.testimonials) {
      await db.collection("testimonials").doc(testimonial.id).set(testimonial);
    }
    for (const faq of defaultData.faqs) {
      await db.collection("faqs").doc(faq.id).set(faq);
    }
  }
}

export async function getDb() {
  await ensureDb();
  
  const settingsSnap = await db.collection("settings").doc("global").get();
  const settings = settingsSnap.data() || {};
  
  const leadsSnap = await db.collection("leads").get();
  const leads = leadsSnap.docs.map(d => ({ id: d.id, ...d.data() }));
  
  const treatmentsSnap = await db.collection("treatments").get();
  const treatments = treatmentsSnap.docs.map(d => ({ id: d.id, ...d.data() }));
  
  const blogsSnap = await db.collection("blogs").get();
  const blogs = blogsSnap.docs.map(d => ({ id: d.id, ...d.data() }));
  
  const testimonialsSnap = await db.collection("testimonials").get();
  const testimonials = testimonialsSnap.docs.map(d => ({ id: d.id, ...d.data() }));
  
  const faqsSnap = await db.collection("faqs").get();
  const faqs = faqsSnap.docs.map(d => ({ id: d.id, ...d.data() }));
  
  const gallerySnap = await db.collection("gallery").get();
  const gallery = gallerySnap.docs.map(d => ({ id: d.id, ...d.data() }));
  
  return {
    settings,
    leads,
    treatments,
    blogs,
    testimonials,
    faqs,
    gallery
  };
}

export async function saveDb(data: any) {
  try {
    if (data.settings) {
      await db.collection("settings").doc("global").set(data.settings);
    }
    
    const collections = ['leads', 'treatments', 'blogs', 'testimonials', 'faqs', 'gallery'];
    
    for (const col of collections) {
      if (data[col] && Array.isArray(data[col])) {
        const currentDocs = await db.collection(col).get();
        const currentIds = new Set(currentDocs.docs.map(d => d.id));
        const incomingIds = new Set(data[col].map((item: any) => item.id));
        
        // Delete docs not in incoming
        for (const id of currentIds) {
          if (!incomingIds.has(id)) {
            await db.collection(col).doc(id).delete();
          }
        }
        
        // Set incoming docs
        for (const item of data[col]) {
          if (item.id) {
            await db.collection(col).doc(item.id).set(item);
          }
        }
      }
    }
    
    return data;
  } catch (err) {
    console.error("Error saving DB:", err);
    throw err;
  }
}
