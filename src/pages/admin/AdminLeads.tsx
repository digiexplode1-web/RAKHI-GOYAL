import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Trash2 } from "lucide-react";

export default function AdminLeads() {
  const { data, setData } = useOutletContext<any>();
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const updateStatus = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch(`/api/admin/leads/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status: newStatus }),
      });
      const result = await res.json();
      if (result.success) {
        // Update local state
        const updatedLeads = data.leads.map((l: any) => l.id === id ? { ...l, status: newStatus } : l);
        setData({ ...data, leads: updatedLeads });
      }
    } catch (e) {
      console.error(e);
    }
    setUpdatingId(null);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this lead?")) return;
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await res.json();
      if (result.success) {
        const updatedLeads = data.leads.filter((l: any) => l.id !== id);
        setData({ ...data, leads: updatedLeads });
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-900">Appointment Leads</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-white border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500 font-semibold">
               <th className="py-4 px-6">Submitted / Preferred</th>
               <th className="py-4 px-6">Name</th>
               <th className="py-4 px-6">Contact Info</th>
               <th className="py-4 px-6">Concern</th>
               <th className="py-4 px-6">Message</th>
               <th className="py-4 px-6">Status</th>
               <th className="py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
             {data.leads?.slice().reverse().map((lead: any) => (
                <tr key={lead.id} className="hover:bg-gray-50/50">
                   <td className="py-4 px-6 text-sm text-gray-500">
                     <span className="font-semibold text-gray-700">Submit:</span> {new Date(lead.createdAt).toLocaleDateString()}<br/>
                     {lead.date && (
                       <span className="text-brand-plum font-semibold">
                         Req: {new Date(lead.date).toLocaleDateString()}
                       </span>
                     )}
                   </td>
                   <td className="py-4 px-6 text-sm font-medium text-gray-900">
                     {lead.name}<br/>
                     <span className="text-xs text-gray-500 font-normal">Age: {lead.age} | {lead.city}</span>
                   </td>
                   <td className="py-4 px-6 text-sm text-gray-600">
                     {lead.phone}
                   </td>
                   <td className="py-4 px-6 text-sm text-gray-600">{lead.concern}</td>
                   <td className="py-4 px-6 text-sm text-gray-500 max-w-xs truncate" title={lead.message}>
                     {lead.message || '-'}
                   </td>
                   <td className="py-4 px-6">
                      <select
                        value={lead.status}
                        onChange={(e) => updateStatus(lead.id, e.target.value)}
                        disabled={updatingId === lead.id}
                        className={`text-sm rounded-lg border-gray-300 py-1.5 pl-3 pr-8 focus:ring-brand-plum focus:border-brand-plum ${
                          lead.status === 'New' ? 'bg-green-50 text-green-800 border-green-200' :
                          lead.status === 'Contacted' ? 'bg-blue-50 text-blue-800 border-blue-200' :
                          lead.status === 'Converted' ? 'bg-purple-50 text-purple-800 border-purple-200' : 
                          'bg-gray-50 text-gray-800 border-gray-200'
                        }`}
                      >
                         <option value="New">New</option>
                         <option value="Contacted">Contacted</option>
                         <option value="Follow-up">Follow-up</option>
                         <option value="Converted">Converted</option>
                         <option value="Closed">Closed</option>
                      </select>
                   </td>
                   <td className="py-4 px-6 text-right">
                     <button onClick={() => handleDelete(lead.id)} className="text-red-500 hover:text-red-700 p-2 transition-colors">
                       <Trash2 className="w-4 h-4" />
                     </button>
                   </td>
                </tr>
             ))}
             {(!data.leads || data.leads.length === 0) && (
               <tr>
                 <td colSpan={7} className="py-12 text-center text-gray-500 text-sm">No appointment leads yet.</td>
               </tr>
             )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
