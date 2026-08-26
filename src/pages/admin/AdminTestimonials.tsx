import React, { useState } from "react";
import { compressImage } from "../../utils/imageCompressor";
import { useOutletContext } from "react-router-dom";
import { Plus, Edit2, Trash2, Star } from "lucide-react";

export default function AdminTestimonials() {
  const { data, setData } = useOutletContext<any>();
  const [items, setItems] = useState<any[]>(data.testimonials || []);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({ name: "", text: "", rating: 5, status: "published", image: "" });
  const [saving, setSaving] = useState(false);

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormData({ 
      name: item.name || "", 
      text: item.text || "", 
      rating: item.rating || 5, 
      status: item.status || "published",
      image: item.image || ""
    });
    setIsCreating(false);
  };

  const handleCreateNew = () => {
    setEditingItem(null);
    setFormData({ name: "", text: "", rating: 5, status: "published", image: "" });
    setIsCreating(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, rating: parseInt(e.target.value, 10) });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const token = localStorage.getItem("adminToken");
    
    try {
      if (isCreating) {
        const res = await fetch("/api/admin/testimonials", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(formData),
        });
        const result = await res.json();
        if (result.success) {
          const newItems = [...items, result.item];
          setItems(newItems);
          setData({ ...data, testimonials: newItems });
          setIsCreating(false);
        }
      } else if (editingItem) {
        const res = await fetch(`/api/admin/testimonials/${editingItem.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(formData),
        });
        const result = await res.json();
        if (result.success) {
          const newItems = items.map((i) => (i.id === editingItem.id ? result.item : i));
          setItems(newItems);
          setData({ ...data, testimonials: newItems });
          setEditingItem(null);
        }
      }
    } catch (err) {
      console.error(err);
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this testimonial?")) return;
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await res.json();
      if (result.success) {
        const newItems = items.filter((i) => i.id !== id);
        setItems(newItems);
        setData({ ...data, testimonials: newItems });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-brand-plum">Testimonials</h2>
        {!isCreating && !editingItem && (
          <button onClick={handleCreateNew} className="flex items-center px-4 py-2 bg-brand-plum text-white font-medium rounded-lg hover:bg-brand-plum/90 transition-colors shadow-sm">
            <Plus className="w-4 h-4 mr-2" /> Add Testimonial
          </button>
        )}
      </div>

      {(isCreating || editingItem) ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden p-8 animate-in fade-in slide-in-from-bottom-4">
          <h3 className="text-xl font-semibold mb-6">{isCreating ? "Add Testimonial" : "Edit Testimonial"}</h3>
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Patient Name (or initials)</label>
                <input 
                  required
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-plum focus:border-brand-plum" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating (1-5)</label>
                <input 
                  required
                  type="number"
                  min="1"
                  max="5"
                  name="rating" 
                  value={formData.rating} 
                  onChange={handleRatingChange} 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-plum focus:border-brand-plum" 
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Testimonial Image (Optional)</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const base64 = await compressImage(file);
                      setFormData({ ...formData, image: base64 });
                    }
                  }}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-rose/10 file:text-brand-plum hover:file:bg-brand-rose/20 cursor-pointer"
                />
                {formData.image && (
                  <div className="mt-4">
                    <img src={formData.image} alt="Preview" className="w-16 h-16 object-cover rounded-full border border-gray-200" />
                  </div>
                )}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Review / Text</label>
                <textarea 
                  required
                  name="text" 
                  value={formData.text} 
                  onChange={handleChange} 
                  rows={4} 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-plum focus:border-brand-plum" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-plum focus:border-brand-plum"
                >
                  <option value="draft">Draft (Hidden)</option>
                  <option value="published">Published</option>
                </select>
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
                {saving ? "Saving..." : "Save Testimonial"}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                  <th className="py-4 px-6">Patient Name</th>
                  <th className="py-4 px-6">Rating</th>
                  <th className="py-4 px-6">Review Excerpt</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {items.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-gray-500 text-sm">No testimonials added yet.</td>
                  </tr>
                ) : (
                  items.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-6 text-sm font-medium text-gray-900">{item.name}</td>
                      <td className="py-4 px-6 text-sm text-yellow-500 flex items-center mt-3">
                         {Array.from({ length: item.rating }).map((_, i) => (
                           <Star key={i} className="w-4 h-4 fill-current" />
                         ))}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-500 max-w-xs truncate">{item.text}</td>
                      <td className="py-4 px-6">
                         <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                           item.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                         }`}>
                           {item.status}
                         </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button onClick={() => handleEdit(item)} className="text-brand-plum hover:text-brand-rose p-2 transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-700 p-2 transition-colors ml-2">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
