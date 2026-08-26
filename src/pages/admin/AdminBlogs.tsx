import React, { useState } from "react";
import { compressImage } from "../../utils/imageCompressor";
import { useOutletContext } from "react-router-dom";
import { Plus, Edit2, Trash2 } from "lucide-react";

export default function AdminBlogs() {
  const { data, setData } = useOutletContext<any>();
  const [items, setItems] = useState<any[]>(data.blogs || []);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({ title: "", slug: "", excerpt: "", content: "", status: "draft" });
  const [saving, setSaving] = useState(false);

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormData({ 
      title: item.title || "", 
      slug: item.slug || "", 
      excerpt: item.excerpt || "", 
      content: item.content || "",
      status: item.status || "draft"
    });
    setIsCreating(false);
  };

  const handleCreateNew = () => {
    setEditingItem(null);
    setFormData({ title: "", slug: "", excerpt: "", content: "", status: "draft" });
    setIsCreating(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
    
    // Auto-add date if creating and it's missing
    const payload = {
      ...formData,
      date: isCreating ? new Date().toISOString() : editingItem.date
    };

    try {
      if (isCreating) {
        const res = await fetch("/api/admin/blogs", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(payload),
        });
        const result = await res.json();
        if (result.success) {
          const newItems = [...items, result.item];
          setItems(newItems);
          setData({ ...data, blogs: newItems });
          setIsCreating(false);
        }
      } else if (editingItem) {
        const res = await fetch(`/api/admin/blogs/${editingItem.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(payload),
        });
        const result = await res.json();
        if (result.success) {
          const newItems = items.map((i) => (i.id === editingItem.id ? result.item : i));
          setItems(newItems);
          setData({ ...data, blogs: newItems });
          setEditingItem(null);
        }
      }
    } catch (err) {
      console.error(err);
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this blog post?")) return;
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch(`/api/admin/blogs/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await res.json();
      if (result.success) {
        const newItems = items.filter((i) => i.id !== id);
        setItems(newItems);
        setData({ ...data, blogs: newItems });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-brand-plum">Blog Posts</h2>
        {!isCreating && !editingItem && (
          <button onClick={handleCreateNew} className="flex items-center px-4 py-2 bg-brand-plum text-white font-medium rounded-lg hover:bg-brand-plum/90 transition-colors shadow-sm">
            <Plus className="w-4 h-4 mr-2" /> New Post
          </button>
        )}
      </div>

      {(isCreating || editingItem) ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden p-8 animate-in fade-in slide-in-from-bottom-4">
          <h3 className="text-xl font-semibold mb-6">{isCreating ? "Create Blog Post" : "Edit Blog Post"}</h3>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <input 
                  required
                  name="category" 
                  value={formData.category || ""} 
                  onChange={handleChange} 
                  placeholder="e.g. Guidance, IVF, Nutrition"
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-plum focus:border-brand-plum"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
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
                      setFormData({ ...formData, image: base64 });
                    }
                  }}
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-plum/20 transition-all text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100 cursor-pointer" 
                  />
                  <div className="flex items-center gap-2 text-gray-500 text-xs font-bold uppercase">
                    <hr className="flex-1 border-gray-200" /> OR <hr className="flex-1 border-gray-200" />
                  </div>
                  <input 
                    name="image" 
                    value={formData.image || ""} 
                    onChange={handleChange} 
                    placeholder="https://example.com/blog-image.jpg"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-plum focus:border-brand-plum font-mono text-sm" 
                  />
                </div>
                {formData.image && (
                  <div className="mt-4">
                    <img src={formData.image} alt="Preview" className="h-32 object-cover rounded-lg border border-gray-200" />
                  </div>
                )}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt (Short preview)</label>
                <textarea 
                  required
                  name="excerpt" 
                  value={formData.excerpt} 
                  onChange={handleChange} 
                  rows={2} 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-plum focus:border-brand-plum" 
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Content</label>
                <textarea 
                  required
                  name="content" 
                  value={formData.content} 
                  onChange={handleChange} 
                  rows={10} 
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
                {saving ? "Saving..." : "Save Post"}
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
                  <th className="py-4 px-6">Date</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {items.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-gray-500 text-sm">No blog posts found.</td>
                  </tr>
                ) : (
                  items.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-6 text-sm font-medium text-gray-900">{item.title}</td>
                      <td className="py-4 px-6 text-sm text-gray-500">
                         {item.date ? new Date(item.date).toLocaleDateString() : 'N/A'}
                      </td>
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
