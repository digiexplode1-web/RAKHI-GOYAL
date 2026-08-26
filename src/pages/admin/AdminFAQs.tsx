import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Plus, Edit2, Trash2 } from "lucide-react";

export default function AdminFAQs() {
  const { data, setData } = useOutletContext<any>();
  const [items, setItems] = useState<any[]>(data.faqs || []);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({ question: "", answer: "" });
  const [saving, setSaving] = useState(false);

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormData({ 
      question: item.question || "", 
      answer: item.answer || ""
    });
    setIsCreating(false);
  };

  const handleCreateNew = () => {
    setEditingItem(null);
    setFormData({ question: "", answer: "" });
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
        const res = await fetch("/api/admin/faqs", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(formData),
        });
        const result = await res.json();
        if (result.success) {
          const newItems = [...items, result.item];
          setItems(newItems);
          setData({ ...data, faqs: newItems });
          setIsCreating(false);
        }
      } else if (editingItem) {
        const res = await fetch(`/api/admin/faqs/${editingItem.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(formData),
        });
        const result = await res.json();
        if (result.success) {
          const newItems = items.map((i) => (i.id === editingItem.id ? result.item : i));
          setItems(newItems);
          setData({ ...data, faqs: newItems });
          setEditingItem(null);
        }
      }
    } catch (err) {
      console.error(err);
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this FAQ?")) return;
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch(`/api/admin/faqs/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await res.json();
      if (result.success) {
        const newItems = items.filter((i) => i.id !== id);
        setItems(newItems);
        setData({ ...data, faqs: newItems });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-brand-plum">Frequently Asked Questions</h2>
        {!isCreating && !editingItem && (
          <button onClick={handleCreateNew} className="flex items-center px-4 py-2 bg-brand-plum text-white font-medium rounded-lg hover:bg-brand-plum/90 transition-colors shadow-sm">
            <Plus className="w-4 h-4 mr-2" /> Add FAQ
          </button>
        )}
      </div>

      {(isCreating || editingItem) ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden p-8 animate-in fade-in slide-in-from-bottom-4">
          <h3 className="text-xl font-semibold mb-6">{isCreating ? "Add FAQ" : "Edit FAQ"}</h3>
          <form onSubmit={handleSave} className="space-y-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Question</label>
                <input 
                  required
                  name="question" 
                  value={formData.question} 
                  onChange={handleChange} 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-plum focus:border-brand-plum" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Answer</label>
                <textarea 
                  required
                  name="answer" 
                  value={formData.answer} 
                  onChange={handleChange} 
                  rows={4} 
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
                {saving ? "Saving..." : "Save FAQ"}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="space-y-4">
          {items.length === 0 ? (
            <div className="py-12 text-center text-gray-500 bg-white rounded-2xl shadow-sm border border-gray-100 text-sm">
              No FAQs added yet.
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex justify-between items-start group">
                <div className="max-w-3xl">
                  <h4 className="font-semibold text-gray-900 mb-2 text-lg">{item.question}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.answer}</p>
                </div>
                <div className="flex items-center space-x-2 shrink-0 ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleEdit(item)} className="p-2 text-brand-plum hover:bg-brand-blush rounded-full transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
