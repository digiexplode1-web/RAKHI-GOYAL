import React from "react";
import { useOutletContext, Link } from "react-router-dom";
import { Users, FileText, HeartPulse, MessageSquare } from "lucide-react";

export default function AdminDashboard() {
  const { data } = useOutletContext<any>();

  const stats = [
    { title: "Total Leads", value: data.leads?.length || 0, icon: Users, color: "bg-blue-50 text-blue-600" },
    { title: "New Leads", value: data.leads?.filter((l:any) => l.status === "New").length || 0, icon: Users, color: "bg-green-50 text-green-600" },
    { title: "Treatments", value: data.treatments?.length || 0, icon: HeartPulse, color: "bg-rose-50 text-brand-rose" },
    { title: "Blogs Published", value: data.blogs?.filter((l:any) => l.status === "published").length || 0, icon: FileText, color: "bg-purple-50 text-purple-600" }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {stats.map((stat, i) => {
           const Icon = stat.icon;
           return (
             <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color} mr-4`}>
                   <Icon className="w-6 h-6" />
                </div>
                <div>
                   <p className="text-sm text-gray-500 font-medium mb-1">{stat.title}</p>
                   <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                </div>
             </div>
           );
         })}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h3 className="text-lg font-semibold text-gray-900">Recent Leads</h3>
          <Link to="/admin/leads" className="text-sm font-medium text-brand-plum hover:underline">View All</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                 <th className="py-4 px-6">Name</th>
                 <th className="py-4 px-6">Phone</th>
                 <th className="py-4 px-6">Concern</th>
                 <th className="py-4 px-6">Status</th>
                 <th className="py-4 px-6 text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
               {data.leads?.slice(-5).reverse().map((lead: any) => (
                  <tr key={lead.id} className="hover:bg-gray-50/50 transition-colors">
                     <td className="py-4 px-6 text-sm font-medium text-gray-900">{lead.name}</td>
                     <td className="py-4 px-6 text-sm text-gray-600">{lead.phone}</td>
                     <td className="py-4 px-6 text-sm text-gray-600">{lead.concern}</td>
                     <td className="py-4 px-6">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                          lead.status === 'New' ? 'bg-green-100 text-green-700' :
                          lead.status === 'Contacted' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {lead.status}
                        </span>
                     </td>
                     <td className="py-4 px-6 text-sm text-gray-500 text-right">
                       {new Date(lead.createdAt).toLocaleDateString()}
                     </td>
                  </tr>
               ))}
               {(!data.leads || data.leads.length === 0) && (
                 <tr>
                   <td colSpan={5} className="py-8 text-center text-gray-500 text-sm">No leads yet.</td>
                 </tr>
               )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
