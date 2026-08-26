import React, { useState } from "react";
import { compressImage } from "../../utils/imageCompressor";
import { useOutletContext } from "react-router-dom";
import { CheckCircle2, Save, Layout, User, Award, Globe, Image as ImageIcon, FileText } from "lucide-react";

export default function AdminSettings() {
  const { data, setData } = useOutletContext<any>();
  
  const [formData, setFormData] = useState({
    ...data.settings,
    whyChooseUsItems: data.settings?.whyChooseUsItems || [
      { title: "Personalized Fertility Plans", desc: "Every couple's journey is different, care should be planned according to individual needs." },
      { title: "Advanced IVF Guidance", desc: "Patient-focused IVF guidance with clear explanation, careful evaluation, and evidence-based planning." },
      { title: "Recurrent IVF Failure", desc: "Detailed assessment for couples who have faced repeated IVF failures." },
      { title: "Advanced Age Support", desc: "Guidance for women planning pregnancy after 35 or with age-related fertility concerns." },
      { title: "Compassionate Counselling", desc: "Emotional and medical support throughout the entire fertility journey." },
      { title: "State-of-the-Art Technology", desc: "Utilizing modern techniques for better outcomes and higher success rates." }
    ]
  });
  
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhyChooseUsChange = (index: number, field: 'title' | 'desc', value: string) => {
    const newItems = [...formData.whyChooseUsItems];
    newItems[index] = { ...newItems[index], [field]: value };
    setFormData({ ...formData, whyChooseUsItems: newItems });
  };

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaving(true);
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (result.success) {
        setData({ ...data, settings: result.settings });
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (error) {
      console.error("Failed to save settings:", error);
    }
    setSaving(false);
  };

  return (
    <div className="max-w-5xl space-y-8 pb-20">
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <Layout className="w-8 h-8 text-brand-plum" /> 
          Website Content Manager
        </h1>
        <p className="text-gray-500 mt-2">Update your website text, images, and features directly from here.</p>
      </div>

      {saved && (
        <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl flex items-center shadow-sm animate-in fade-in slide-in-from-top-2 sticky top-4 z-50">
          <CheckCircle2 className="w-5 h-5 mr-3" />
          <span className="font-medium">Changes saved successfully!</span> The website has been updated.
        </div>
      )}

      {/* 1. Header & Logo Configuration */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="bg-gray-50 border-b border-gray-200 px-8 py-5">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Layout className="w-5 h-5 text-brand-plum" />
            1. Header & Logo Configuration
          </h2>
          <p className="text-sm text-gray-500 mt-1">Manage the website's top navigation logo and branding.</p>
        </div>
        <form onSubmit={handleSave} className="p-8">
          <div className="space-y-6">
            <div className="p-5 bg-blue-50 border border-blue-100 rounded-xl">
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const base64 = await compressImage(file);
                      setFormData({ ...formData, headerLogo: base64 });
                    }
                  }}
                  className="w-full px-4 py-2 bg-white border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer mb-3" 
                />
                <input 
                  name="headerLogo" 
                  value={formData.headerLogo || ""} 
                  onChange={handleChange} 
                  placeholder="https://example.com/logo.png"
                  className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono text-sm" 
                />
                {formData.headerLogo && (
                  <div className="mt-2 text-right">
                    <button type="button" onClick={() => setFormData({ ...formData, headerLogo: "" })} className="text-xs text-red-600 font-bold hover:underline">Remove Logo</button>
                  </div>
                )}
              </div>
              {formData.headerLogo && (
                <div className="mt-4">
                  <p className="text-xs text-blue-700 font-bold mb-2">Image Preview:</p>
                  <div className="bg-white p-4 border border-blue-200 rounded-lg inline-block">
                    <img src={formData.headerLogo} alt="Logo Preview" className="h-10 object-contain" />
                  </div>
                </div>
              )}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Logo Text / Fallback Name</label>
              <input 
                name="logoText" 
                value={formData.logoText || ""} 
                onChange={handleChange} 
                placeholder="e.g. Dr. Rakhi Goyal"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-plum/20 focus:border-brand-plum transition-all text-base" 
              />
            </div>
            
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="showLogoText"
                name="showLogoText"
                checked={formData.showLogoText !== false}
                onChange={(e) => setFormData({ ...formData, showLogoText: e.target.checked })}
                className="w-5 h-5 text-brand-plum rounded focus:ring-brand-plum cursor-pointer border-gray-300"
              />
              <label htmlFor="showLogoText" className="text-sm font-bold text-gray-700 cursor-pointer select-none">
                Show logo text next to the image
              </label>
            </div>
          </div>
          <div className="mt-8 flex justify-end">
            <button 
              type="submit" 
              disabled={saving}
              className="flex items-center gap-2 px-8 py-3 bg-brand-plum text-white font-bold rounded-xl hover:bg-brand-plum/90 transition-all shadow-md active:scale-[0.98]"
            >
              <Save className="w-5 h-5" />
              {saving ? "Saving..." : "Update Logo"}
            </button>
          </div>
        </form>
      </div>

      {/* 2. Hero Section Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="bg-gray-50 border-b border-gray-200 px-8 py-5">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-brand-plum" />
            2. Hero Section
          </h2>
          <p className="text-sm text-gray-500 mt-1">Manage the main landing area of your homepage.</p>
        </div>
        <form onSubmit={handleSave} className="p-8">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Headline Line 1</label>
                <input 
                  name="heroHeadline1" 
                  value={formData.heroHeadline1 || ""} 
                  onChange={handleChange} 
                  placeholder="e.g. EXPERT"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-plum/20 focus:border-brand-plum transition-all text-lg font-medium" 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Headline Line 2</label>
                <input 
                  name="heroHeadline2" 
                  value={formData.heroHeadline2 || ""} 
                  onChange={handleChange} 
                  placeholder="e.g. FERTILITY CARE"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-plum/20 focus:border-brand-plum transition-all text-lg font-medium" 
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Subheading / Description</label>
              <textarea 
                name="heroSubheadline" 
                value={formData.heroSubheadline || ""} 
                onChange={handleChange} 
                rows={3} 
                placeholder="Enter the short paragraph displayed under the main headline..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-plum/20 focus:border-brand-plum transition-all text-base" 
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Primary CTA Button Text</label>
                <input 
                  name="ctaPrimaryText" 
                  value={formData.ctaPrimaryText || ""} 
                  onChange={handleChange} 
                  placeholder="e.g. Book Appointment"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-plum/20 focus:border-brand-plum transition-all" 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Secondary CTA Button Text</label>
                <input 
                  name="ctaSecondaryText" 
                  value={formData.ctaSecondaryText || ""} 
                  onChange={handleChange} 
                  placeholder="e.g. Call Now"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-plum/20 focus:border-brand-plum transition-all" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Badge 1 Title</label>
                <input 
                  name="heroBadge1Title" 
                  value={formData.heroBadge1Title || ""} 
                  onChange={handleChange} 
                  placeholder="e.g. 23+ Years"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-plum/20 focus:border-brand-plum transition-all" 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Badge 1 Subtitle</label>
                <input 
                  name="heroBadge1Subtitle" 
                  value={formData.heroBadge1Subtitle || ""} 
                  onChange={handleChange} 
                  placeholder="e.g. Experience"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-plum/20 focus:border-brand-plum transition-all" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Badge 2 Title</label>
                <input 
                  name="heroBadge2Title" 
                  value={formData.heroBadge2Title || ""} 
                  onChange={handleChange} 
                  placeholder="e.g. 4500+"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-plum/20 focus:border-brand-plum transition-all" 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Badge 2 Subtitle</label>
                <input 
                  name="heroBadge2Subtitle" 
                  value={formData.heroBadge2Subtitle || ""} 
                  onChange={handleChange} 
                  placeholder="e.g. IVF Cycles"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-plum/20 focus:border-brand-plum transition-all" 
                />
              </div>
            </div>

            <div className="p-5 bg-blue-50 border border-blue-100 rounded-xl">
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const base64 = await compressImage(file);
                      setFormData({ ...formData, heroImage: base64 });
                    }
                  }}
                  className="w-full px-4 py-2 bg-white border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer" 
                />
                <div className="flex items-center gap-2 text-blue-700 text-xs font-bold uppercase mt-3 mb-3">
                  <hr className="flex-1 border-blue-200" /> OR ENTER URL <hr className="flex-1 border-blue-200" />
                </div>
                <input 
                  name="heroImage" 
                  value={formData.heroImage || ""} 
                  onChange={handleChange} 
                  placeholder="https://example.com/doctor-image.jpg"
                  className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono text-sm" 
                />
              </div>
              {formData.heroImage && (
                <div className="mt-4">
                  <p className="text-xs text-blue-700 font-bold mb-2">Image Preview:</p>
                  <img src={formData.heroImage} alt="Hero Preview" className="h-32 object-contain rounded-lg border border-blue-200" />
                </div>
              )}
            </div>
          <div className="mt-8 flex justify-end">
            <button 
              type="submit" 
              disabled={saving}
              className="flex items-center gap-2 px-8 py-3 bg-brand-plum text-white font-bold rounded-xl hover:bg-brand-plum/90 transition-all shadow-md active:scale-[0.98]"
            >
              <Save className="w-5 h-5" />
              {saving ? "Saving..." : "Update Hero Content"}
            </button>
          </div>
        </form>
      </div>

      {/* 3. Meet the Specialist Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="bg-gray-50 border-b border-gray-200 px-8 py-5">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <User className="w-5 h-5 text-brand-plum" />
            3. Meet the Specialist (Dr. Profile)
          </h2>
          <p className="text-sm text-gray-500 mt-1">Update doctor details across the Home and About pages.</p>
        </div>
        <form onSubmit={handleSave} className="p-8">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Doctor Name</label>
                <input 
                  name="doctorName" 
                  value={formData.doctorName || ""} 
                  onChange={handleChange} 
                  placeholder="e.g. Dr. Rakhi Goyal"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-plum/20 focus:border-brand-plum transition-all text-lg font-medium" 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Degrees (Comma separated)</label>
                <input 
                  name="doctorDegrees" 
                  value={formData.doctorDegrees || ""} 
                  onChange={handleChange} 
                  placeholder="e.g. MBBS, MD Obstetrics, FNB Reproductive, FICOG"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-plum/20 focus:border-brand-plum transition-all text-base" 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Biography / Preview Text</label>
              <textarea 
                name="aboutText" 
                value={formData.aboutText || ""} 
                onChange={handleChange} 
                rows={5} 
                placeholder="Write a brief professional bio..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-plum/20 focus:border-brand-plum transition-all text-base" 
              />
            </div>

            <div className="p-5 bg-blue-50 border border-blue-100 rounded-xl">
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const base64 = await compressImage(file);
                      setFormData({ ...formData, aboutPageImage: base64 });
                    }
                  }}
                  className="w-full px-4 py-2 bg-white border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer" 
                />
                <div className="flex items-center gap-2 text-blue-700 text-xs font-bold uppercase mt-3 mb-3">
                  <hr className="flex-1 border-blue-200" /> OR ENTER URL <hr className="flex-1 border-blue-200" />
                </div>
                <input 
                  name="aboutPageImage" 
                  value={formData.aboutPageImage || ""} 
                  onChange={handleChange} 
                  placeholder="https://example.com/portrait.jpg"
                  className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono text-sm" 
                />
              </div>
              {formData.aboutPageImage && (
                <div className="mt-4">
                  <p className="text-xs text-blue-700 font-bold mb-2">Image Preview:</p>
                  <img src={formData.aboutPageImage} alt="Doctor Preview" className="h-32 object-contain rounded-lg border border-blue-200" />
                </div>
              )}
            </div>
          <div className="mt-8 flex justify-end">
            <button 
              type="submit" 
              disabled={saving}
              className="flex items-center gap-2 px-8 py-3 bg-brand-plum text-white font-bold rounded-xl hover:bg-brand-plum/90 transition-all shadow-md active:scale-[0.98]"
            >
              <Save className="w-5 h-5" />
              {saving ? "Saving..." : "Update Profile"}
            </button>
          </div>
        </form>
      </div>

      {/* 3. Why Choose Us Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="bg-gray-50 border-b border-gray-200 px-8 py-5">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Award className="w-5 h-5 text-brand-plum" />
            4. "Why Choose Us" Features
          </h2>
          <p className="text-sm text-gray-500 mt-1">Manage the benefits cards displayed on the homepage.</p>
        </div>
        <form onSubmit={handleSave} className="p-8">
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-gray-100">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Section Small Title</label>
                <input 
                  name="whyChooseUsTitle" 
                  value={formData.whyChooseUsTitle || ""} 
                  onChange={handleChange} 
                  placeholder="e.g. Why Choose Us"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-plum/20 focus:border-brand-plum transition-all font-medium" 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Section Main Subtitle</label>
                <input 
                  name="whyChooseUsSubtitle" 
                  value={formData.whyChooseUsSubtitle || ""} 
                  onChange={handleChange} 
                  placeholder="e.g. Precision & Care"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-plum/20 focus:border-brand-plum transition-all font-medium" 
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {formData.whyChooseUsItems.map((item: any, idx: number) => (
                <div key={idx} className="p-6 border border-gray-200 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow relative">
                   <div className="absolute top-0 right-0 bg-gray-100 text-gray-500 px-3 py-1 text-xs font-bold rounded-bl-xl rounded-tr-xl">
                     Card {idx + 1}
                   </div>
                   <div className="space-y-4 pt-2">
                     <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Title</label>
                        <input 
                          value={item.title} 
                          onChange={(e) => handleWhyChooseUsChange(idx, 'title', e.target.value)} 
                          className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-plum/20 focus:border-brand-plum text-sm font-medium" 
                        />
                     </div>
                     <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Description</label>
                        <textarea 
                          value={item.desc} 
                          onChange={(e) => handleWhyChooseUsChange(idx, 'desc', e.target.value)} 
                          rows={3} 
                          className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-plum/20 focus:border-brand-plum text-sm" 
                        />
                     </div>
                   </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-8 flex justify-end">
            <button 
              type="submit" 
              disabled={saving}
              className="flex items-center gap-2 px-8 py-3 bg-brand-plum text-white font-bold rounded-xl hover:bg-brand-plum/90 transition-all shadow-md active:scale-[0.98]"
            >
              <Save className="w-5 h-5" />
              {saving ? "Saving..." : "Update Features"}
            </button>
          </div>
        </form>
      </div>

      {/* 5. Knowledge Base Section Settings */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="bg-gray-50 border-b border-gray-200 px-8 py-5">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <FileText className="w-5 h-5 text-brand-plum" />
            5. Knowledge Base / Education Area
          </h2>
          <p className="text-sm text-gray-500 mt-1">Manage the heading texts for the blog and patient education section.</p>
        </div>
        <form onSubmit={handleSave} className="p-8">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Section Small Subtitle</label>
                <input 
                  name="knowledgeBaseSubtitle" 
                  value={formData.knowledgeBaseSubtitle || ""} 
                  onChange={handleChange} 
                  placeholder="e.g. Knowledge Base"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-plum/20 focus:border-brand-plum transition-all font-medium" 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Section Main Title</label>
                <input 
                  name="knowledgeBaseTitle" 
                  value={formData.knowledgeBaseTitle || ""} 
                  onChange={handleChange} 
                  placeholder="e.g. Fertility Guidance"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-plum/20 focus:border-brand-plum transition-all font-medium" 
                />
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 mt-4 text-sm text-gray-600">
              <strong>Note:</strong> To manage the actual blog articles and images within this section, please use the <strong>Blogs</strong> tab in the sidebar navigation.
            </div>
          </div>
          <div className="mt-8 flex justify-end">
            <button 
              type="submit" 
              disabled={saving}
              className="flex items-center gap-2 px-8 py-3 bg-brand-plum text-white font-bold rounded-xl hover:bg-brand-plum/90 transition-all shadow-md active:scale-[0.98]"
            >
              <Save className="w-5 h-5" />
              {saving ? "Saving..." : "Update Headings"}
            </button>
          </div>
        </form>
      </div>

      {/* 6. Footer 6. Footer 5. Footer & Global Settings Global Settings Card Global Settings Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="bg-gray-50 border-b border-gray-200 px-8 py-5">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Globe className="w-5 h-5 text-brand-plum" />
            6. Footer 5. Footer & Global Settings Global Settings
          </h2>
          <p className="text-sm text-gray-500 mt-1">Manage contact information and bottom footer content.</p>
        </div>
        <form onSubmit={handleSave} className="p-8">
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                <input 
                  name="contactPhone" 
                  value={formData.contactPhone || ""} 
                  onChange={handleChange} 
                  placeholder="e.g. 78148 83261"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-plum/20 focus:border-brand-plum transition-all font-medium" 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                <input 
                  name="contactEmail" 
                  value={formData.contactEmail || ""} 
                  onChange={handleChange} 
                  placeholder="e.g. contact@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-plum/20 focus:border-brand-plum transition-all font-medium" 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">WhatsApp Pre-filled Message</label>
              <input 
                name="whatsappMessage" 
                value={formData.whatsappMessage || ""} 
                onChange={handleChange} 
                placeholder="e.g. Hello, I would like to book a consultation."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-plum/20 focus:border-brand-plum transition-all font-medium" 
              />
            </div>
            
            <hr className="border-gray-100" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Footer Description</label>
                <textarea 
                  name="footerDescription" 
                  value={formData.footerDescription || ""} 
                  onChange={handleChange} 
                  rows={4} 
                  placeholder="Short blurb in the footer..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-plum/20 focus:border-brand-plum transition-all" 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Footer Quote</label>
                <textarea 
                  name="footerQuote" 
                  value={formData.footerQuote || ""} 
                  onChange={handleChange} 
                  rows={4} 
                  placeholder="e.g. Details make perfection..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-plum/20 focus:border-brand-plum transition-all" 
                />
              </div>
            </div>
            
            <div className="p-5 bg-blue-50 border border-blue-100 rounded-xl">
              <label className="block text-sm font-bold text-blue-900 mb-2">Global Background Pattern</label>
              <p className="text-xs text-blue-700 mb-3">Upload a seamless pattern image or provide a direct URL.</p>
              <div className="space-y-3">
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const base64 = await compressImage(file);
                      setFormData({ ...formData, bgPatternUrl: base64 });
                    }
                  }}
                  className="w-full px-4 py-2 bg-white border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer" 
                />
                <div className="flex items-center gap-2 text-blue-700 text-xs font-bold uppercase">
                  <hr className="flex-1 border-blue-200" /> OR <hr className="flex-1 border-blue-200" />
                </div>
                <input 
                  name="bgPatternUrl" 
                  value={formData.bgPatternUrl || ""} 
                  onChange={handleChange} 
                  placeholder="https://www.transparenttextures.com/patterns/cubes.png"
                  className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono text-sm" 
                />
              </div>
              {formData.bgPatternUrl && (
                <div className="mt-4">
                  <p className="text-xs text-blue-700 font-bold mb-2">Pattern Preview:</p>
                  <div className="h-32 w-full rounded-lg border border-blue-200" style={{ backgroundImage: `url(${formData.bgPatternUrl})`, backgroundRepeat: 'repeat' }}></div>
                </div>
              )}
            </div>
          </div>
          <div className="mt-8 flex justify-end">
            <button 
              type="submit" 
              disabled={saving}
              className="flex items-center gap-2 px-8 py-3 bg-brand-plum text-white font-bold rounded-xl hover:bg-brand-plum/90 transition-all shadow-md active:scale-[0.98]"
            >
              <Save className="w-5 h-5" />
              {saving ? "Saving..." : "Update Footer & Global"}
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}
