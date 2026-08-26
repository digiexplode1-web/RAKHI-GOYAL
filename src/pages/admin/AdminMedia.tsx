import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { CheckCircle2, Save, Image as ImageIcon } from "lucide-react";
import { compressImage } from "../../utils/imageCompressor";

export default function AdminMedia() {
  const { data, setData } = useOutletContext<any>();
  const [formData, setFormData] = useState(data.settings || {});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const compressedBase64 = await compressImage(file);
      setFormData({ ...formData, [field]: compressedBase64 });
    }
  };

  return (
    <div className="max-w-4xl space-y-8 pb-20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <ImageIcon className="w-8 h-8 text-brand-plum" /> 
          Website Media & Images
        </h1>
        <p className="text-gray-500 mt-2">Manage the images used in empty spaces across the website.</p>
      </div>

      {saved && (
        <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl flex items-center shadow-sm animate-in fade-in slide-in-from-top-2 sticky top-4 z-50">
          <CheckCircle2 className="w-5 h-5 mr-3" />
          <span className="font-medium">Images saved successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Hero Image */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Homepage Hero Image</h2>
          <p className="text-sm text-gray-500 mb-6">Upload the image that appears on the main homepage banner.</p>
          
          <input 
            type="file" 
            accept="image/*"
            onChange={(e) => handleFileUpload(e, 'heroImage')}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-rose/10 file:text-brand-plum hover:file:bg-brand-rose/20 cursor-pointer mb-4"
          />
          {formData.heroImage && (
            <img src={formData.heroImage} alt="Hero" className="w-48 rounded-2xl border border-gray-200 shadow-sm" />
          )}
        </div>

        {/* About Image */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Doctor Portrait Image (About Section)</h2>
          <p className="text-sm text-gray-500 mb-6">Upload the image that appears in the Meet The Specialist section.</p>
          
          <input 
            type="file" 
            accept="image/*"
            onChange={(e) => handleFileUpload(e, 'aboutPageImage')}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-rose/10 file:text-brand-plum hover:file:bg-brand-rose/20 cursor-pointer mb-4"
          />
          {formData.aboutPageImage && (
            <img src={formData.aboutPageImage} alt="About" className="w-48 rounded-2xl border border-gray-200 shadow-sm" />
          )}
        </div>

        {/* Header Logo */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Website Logo</h2>
          <p className="text-sm text-gray-500 mb-6">Upload your clinic's logo to replace the text logo in the header.</p>
          
          <input 
            type="file" 
            accept="image/*"
            onChange={(e) => handleFileUpload(e, 'headerLogo')}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-rose/10 file:text-brand-plum hover:file:bg-brand-rose/20 cursor-pointer mb-4"
          />
          {formData.headerLogo && (
            <img src={formData.headerLogo} alt="Logo" className="h-16 object-contain" />
          )}
        </div>

        {/* Background Pattern */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Background Pattern Image</h2>
          <p className="text-sm text-gray-500 mb-6">Upload a seamless texture or pattern for section backgrounds.</p>
          
          <input 
            type="file" 
            accept="image/*"
            onChange={(e) => handleFileUpload(e, 'bgPatternUrl')}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-rose/10 file:text-brand-plum hover:file:bg-brand-rose/20 cursor-pointer mb-4"
          />
          {formData.bgPatternUrl && (
            <img src={formData.bgPatternUrl} alt="Pattern" className="h-24 w-24 object-cover border border-gray-200" />
          )}
        </div>

        {/* Floating Action Bar */}
        <div className="fixed bottom-0 left-64 right-0 p-4 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] flex justify-end z-40">
          <div className="max-w-5xl mx-auto w-full flex justify-end">
            <button 
              type="submit" 
              disabled={saving}
              className="flex items-center px-8 py-3 bg-brand-plum text-white font-medium rounded-xl hover:bg-brand-plum/90 transition-all shadow-md hover:shadow-lg disabled:opacity-50"
            >
              <Save className="w-5 h-5 mr-2" />
              {saving ? "Saving..." : "Save Images"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
