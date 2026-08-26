import React, { useState } from "react";
import { compressImage } from "../../utils/imageCompressor";
import { useOutletContext } from "react-router-dom";
import { Plus, Edit2, Trash2 } from "lucide-react";

export default function AdminGallery() {
  const { data, setData } = useOutletContext<any>();
  const [items, setItems] = useState<any[]>(data.gallery || []);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({ url: "", alt: "", caption: "" });
  const [saving, setSaving] = useState(false);

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormData({ 
      url: item.url || "", 
      alt: item.alt || "", 
      caption: item.caption || ""
    });
    setIsCreating(false);
  };

  const handleCreateNew = () => {
    setEditingItem(null);
    setFormData({ url: "", alt: "", caption: "" });
    setIsCreating(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const token = localStorage.getItem("adminToken");
    
    try {
      if (isCreating) {
        const res = await fetch("/api/admin/gallery", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(formData),
        });
        const result = await res.json();
        if (result.success) {
          const newItems = [...items, result.item];
          setItems(newItems);
          setData({ ...data, gallery: newItems });
          setIsCreating(false);
        }
      } else if (editingItem) {
        const res = await fetch(`/api/admin/gallery/${editingItem.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(formData),
        });
        const result = await res.json();
        if (result.success) {
          const newItems = items.map((i) => (i.id === editingItem.id ? result.item : i));
          setItems(newItems);
          setData({ ...data, gallery: newItems });
          setEditingItem(null);
        }
      }
    } catch (err) {
      console.error(err);
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch(`/api/admin/gallery/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await res.json();
      if (result.success) {
        const newItems = items.filter((i) => i.id !== id);
        setItems(newItems);
        setData({ ...data, gallery: newItems });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-brand-plum">Gallery</h2>
        {!isCreating && !editingItem && (
          <button onClick={handleCreateNew} className="flex items-center px-4 py-2 bg-brand-plum text-white font-medium rounded-lg hover:bg-brand-plum/90 transition-colors shadow-sm">
            <Plus className="w-4 h-4 mr-2" /> Add Image
          </button>
        )}
      </div>

      {(isCreating || editingItem) ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden p-8 animate-in fade-in slide-in-from-bottom-4">
          <h3 className="text-xl font-semibold mb-6">{isCreating ? "Add Image to Gallery" : "Edit Image"}</h3>
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Image (URL or Upload)</label>
                <div className="space-y-3">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const base64 = await compressImage(file);
                      setFormData({ ...formData, url: base64 });
                    }
                  }}
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-plum/20 transition-all text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100 cursor-pointer" 
                  />
                  <div className="flex items-center gap-2 text-gray-500 text-xs font-bold uppercase">
                    <hr className="flex-1 border-gray-200" /> OR <hr className="flex-1 border-gray-200" />
                  </div>
                  <input 
                    required
                    name="url" 
                    value={formData.url || ""} 
                    onChange={handleChange} 
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-plum focus:border-brand-plum font-mono text-sm" 
                  />
                </div>
                {formData.url && (
                  <div className="mt-4">
                    <img src={formData.url} alt="Preview" className="h-32 object-cover rounded-lg border border-gray-200" />
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Alt Text (for screen readers)</label>
                <input 
                  required
                  name="alt" 
                  value={formData.alt} 
                  onChange={handleChange} 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-plum focus:border-brand-plum" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Caption (Optional)</label>
                <input 
                  name="caption" 
                  value={formData.caption} 
                  onChange={handleChange} 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-plum focus:border-brand-plum" 
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-4 pt-4 border-t border-gray-100 mt-6">
              <button 
                type="button" 
                onClick={() => { setIsCreating(false); setEditingItem(null); }}
                className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={saving}
                className="px-6 py-2 bg-brand-plum text-white font-medium rounded-lg hover:bg-brand-plum/90 transition-colors shadow-sm"
              >
                {saving ? "Saving..." : "Save Image"}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.length === 0 ? (
            <div className="col-span-full py-12 text-center text-gray-500 bg-white rounded-2xl shadow-sm border border-gray-100 text-sm">
              No images in gallery yet.
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group">
                <div className="aspect-square bg-gray-100 relative overflow-hidden">
                  <img src={item.url} alt={item.alt} className="w-full h-full object-cover" onError={(e) => (e.currentTarget.src = 'https://placehold.co/400x400?text=Invalid+Image')} />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4">
                    <button onClick={() => handleEdit(item)} className="p-2 bg-white text-brand-plum rounded-full hover:bg-brand-blush transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="p-2 bg-white text-red-500 rounded-full hover:bg-red-50 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                   <p className="text-sm font-medium text-gray-900 truncate">{item.caption || 'No caption'}</p>
                   <p className="text-xs text-gray-500 truncate">{item.alt}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
