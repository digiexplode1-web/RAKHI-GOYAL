import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Plus, Edit2, Trash2, CheckCircle2 } from "lucide-react";

export default function AdminTreatments() {
  const { data, setData } = useOutletContext<any>();
  const [items, setItems] = useState<any[]>(data.treatments || []);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({ title: "", slug: "", summary: "", content: "" });
  const [saving, setSaving] = useState(false);

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormData({ title: item.title || "", slug: item.slug || "", summary: item.summary || "", content: item.content || "" });
    setIsCreating(false);
  };

  const handleCreateNew = () => {
    setEditingItem(null);
    setFormData({ title: "", slug: "", summary: "", content: "" });
    setIsCreating(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateSlug = (text: string) => {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    if (isCreating || !formData.slug) {
      setFormData({ ...formData, title, slug: generateSlug(title) });
    } else {
      setFormData({ ...formData, title });
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const token = localStorage.getItem("adminToken");
    try {
      if (isCreating) {
        const res = await fetch("/api/admin/treatments", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(formData),
        });
        const result = await res.json();
        if (result.success) {
          const newItems = [...items, result.item];
          setItems(newItems);
          setData({ ...data, treatments: newItems });
          setIsCreating(false);
        }
      } else if (editingItem) {
        const res = await fetch(`/api/admin/treatments/${editingItem.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(formData),
        });
        const result = await res.json();
        if (result.success) {
          const newItems = items.map((i) => (i.id === editingItem.id ? result.item : i));
          setItems(newItems);
          setData({ ...data, treatments: newItems });
          setEditingItem(null);
        }
      }
    } catch (err) {
      console.error(err);
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this treatment?")) return;
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch(`/api/admin/treatments/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await res.json();
      if (result.success) {
        const newItems = items.filter((i) => i.id !== id);
        setItems(newItems);
        setData({ ...data, treatments: newItems });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-brand-plum">Treatments</h2>
        {!isCreating && !editingItem && (
          <button onClick={handleCreateNew} className="flex items-center px-4 py-2 bg-brand-plum text-white font-medium rounded-lg hover:bg-brand-plum/90 transition-colors shadow-sm">
            <Plus className="w-4 h-4 mr-2" /> Add Treatment
          </button>
        )}
      </div>

      {(isCreating || editingItem) ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden p-8 animate-in fade-in slide-in-from-bottom-4">
          <h3 className="text-xl font-semibold mb-6">{isCreating ? "Add New Treatment" : "Edit Treatment"}</h3>
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input 
                  required
                  name="title" 
                  value={formData.title} 
                  onChange={handleTitleChange} 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-plum focus:border-brand-plum" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Slug (URL)</label>
                <input 
                  required
                  name="slug" 
                  value={formData.slug} 
                  onChange={handleChange} 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-plum focus:border-brand-plum" 
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Summary (Short description)</label>
              <textarea 
                required
                name="summary" 
                value={formData.summary} 
                onChange={handleChange} 
                rows={2} 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-plum focus:border-brand-plum" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Content</label>
              <textarea 
                required
                name="content" 
                value={formData.content} 
                onChange={handleChange} 
                rows={6} 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-plum focus:border-brand-plum" 
              />
            </div>
            <div className="flex justify-end space-x-4 pt-4">
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
                {saving ? "Saving..." : "Save Treatment"}
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
                  <th className="py-4 px-6">Title</th>
                  <th className="py-4 px-6">Slug</th>
                  <th className="py-4 px-6">Summary</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {items.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-gray-500 text-sm">No treatments added yet.</td>
                  </tr>
                ) : (
                  items.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-6 text-sm font-medium text-gray-900">{item.title}</td>
                      <td className="py-4 px-6 text-sm text-gray-500">{item.slug}</td>
                      <td className="py-4 px-6 text-sm text-gray-500 max-w-xs truncate">{item.summary}</td>
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
