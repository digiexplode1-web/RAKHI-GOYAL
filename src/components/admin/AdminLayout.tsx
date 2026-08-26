import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Settings, Users, FileText, CheckSquare, Image as ImageIcon, HeartPulse, LogOut, MessageSquare } from "lucide-react";
import clsx from "clsx";

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
      return;
    }

    fetch("/api/admin/data", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) throw new Error("Unauth");
        return res.json();
      })
      .then(setData)
      .catch(() => {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
      });
  }, [navigate]);

  if (!data) return <div className="min-h-screen flex items-center justify-center">Loading Admin...</div>;

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const navItems = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { name: "Leads", path: "/admin/leads", icon: Users },
    { name: "Settings", path: "/admin/settings", icon: Settings },
    { name: "Website Media", path: "/admin/media", icon: ImageIcon },
    { name: "Treatments", path: "/admin/treatments", icon: HeartPulse },
    { name: "Blogs", path: "/admin/blogs", icon: FileText },
    { name: "Testimonials", path: "/admin/testimonials", icon: MessageSquare },
    { name: "Gallery", path: "/admin/gallery", icon: ImageIcon },
    { name: "FAQs", path: "/admin/faqs", icon: CheckSquare },
  ];

  return (
    <div className="flex min-h-screen bg-brand-ivory font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-brand-lavender flex flex-col fixed h-full z-10 shadow-lg shadow-brand-rose/5">
        <div className="p-6 border-b border-brand-lavender pb-5">
           <h2 className="text-xl font-heading font-bold text-brand-plum">Admin Portal</h2>
           <p className="text-xs text-brand-plum/60 font-semibold mt-1">Dr. Rakhi Goyal</p>
        </div>
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
           {navItems.map(item => {
             const Icon = item.icon;
             const isActive = location.pathname === item.path || (item.path !== "/admin" && location.pathname.startsWith(item.path));
             return (
               <Link 
                 key={item.name} 
                 to={item.path}
                 className={clsx(
                   "flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all",
                   isActive ? "bg-gradient-to-r from-brand-rose to-brand-plum text-white shadow-md shadow-brand-rose/20" : "text-brand-plum/70 hover:bg-brand-blush hover:text-brand-plum"
                 )}
               >
                 <Icon className="w-5 h-5 mr-3" />
                 {item.name}
               </Link>
             )
           })}
        </nav>
        <div className="p-4 border-t border-brand-lavender">
          <button onClick={handleLogout} className="flex items-center w-full px-4 py-3 text-sm font-medium text-red-500 rounded-xl hover:bg-red-50 transition-colors">
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 flex flex-col">
         <header className="h-16 bg-white border-b border-brand-lavender flex items-center px-8 sticky top-0 z-10 shadow-sm shadow-brand-rose/5">
            <div className="flex-1">
               <h1 className="text-xl font-semibold text-brand-plum font-heading tracking-wide">
                  {navItems.find(i => i.path === location.pathname)?.name || "Overview"}
               </h1>
            </div>
            <a href="/" target="_blank" className="text-sm font-bold text-brand-rose hover:text-brand-plum transition-colors uppercase tracking-widest text-[10px]">
              View Website
            </a>
         </header>
         <div className="p-8 pb-24 overflow-y-auto flex-1">
            <Outlet context={{ data, setData }} />
         </div>
      </main>
    </div>
  );
}
