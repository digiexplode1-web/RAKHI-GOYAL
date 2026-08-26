import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import PublicLayout from "./components/PublicLayout";
import Home from "./pages/public/Home";
import About from "./pages/public/About";
import Contact from "./pages/public/Contact";
import Treatments from "./pages/public/Treatments";
import TreatmentDetail from "./pages/public/TreatmentDetail";
import AdminLayout from "./components/admin/AdminLayout";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminLeads from "./pages/admin/AdminLeads";
import AdminTreatments from "./pages/admin/AdminTreatments";
import AdminBlogs from "./pages/admin/AdminBlogs";
import AdminTestimonials from "./pages/admin/AdminTestimonials";
import AdminGallery from "./pages/admin/AdminGallery";
import AdminFAQs from "./pages/admin/AdminFAQs";
import AdminMedia from "./pages/admin/AdminMedia";
import React from 'react';

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "treatments", element: <Treatments /> },
      { path: "treatments/:slug", element: <TreatmentDetail /> },
    ],
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "settings", element: <AdminSettings /> },
      { path: "leads", element: <AdminLeads /> },
      { path: "treatments", element: <AdminTreatments /> },
      { path: "blogs", element: <AdminBlogs /> },
      { path: "testimonials", element: <AdminTestimonials /> },
      { path: "gallery", element: <AdminGallery /> },
      { path: "media", element: <AdminMedia /> },
      { path: "faqs", element: <AdminFAQs /> },
    ],
  },
]);

import { LanguageProvider } from "./contexts/LanguageContext";

export default function App() {
  return (
    <LanguageProvider>
      <RouterProvider router={router} />
    </LanguageProvider>
  );
}
