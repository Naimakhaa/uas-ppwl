import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex w-full min-h-screen bg-white text-black font-sans antialiased">
      
      {/* =========================================================
         1. SIDEBAR NAVIGASI (DENGAN TRANSISI DAN UKURAN PRESISI)
         ========================================================= */}
      <nav
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="sticky top-0 h-screen bg-white border-r border-[#e0e0e0] flex flex-col justify-between py-6 px-3 z-50 shrink-0"
        style={{
          width: isHovered ? "245px" : "74px",
          transition: "width 0.3s cubic-bezier(0.25, 1, 0.5, 1)",
        }}
      >
        <div className="flex flex-col gap-6">
          {/* LOGO INSTAGRAM ATAS */}
          <div 
            onClick={() => navigate("/")} 
            className="cursor-pointer min-h-11 flex items-center justify-start pl-3 pt-2"
          >
            {isHovered ? (
              // Logo Teks Instagram (Besar)
              <svg aria-label="Instagram" fill="currentColor" height="29" viewBox="0 0 175 51" width="103" className="transition-all duration-200">
                <path d="M12 40c2.8 0 4-1.2 4-4V16c0-2.8-1.2-4-4-4s-4 1.2-4 4v20c0 2.8 1.2 4 4 4zm0-32c1.7 0 3-1.3 3-3s-1.3-3-3-3-3 1.3-3 3 1.3 3 3 3zm19 14c-1.7 0-3 1.3-3 3v17c0 1.7 1.3 3 3 3s3-1.3 3-3V25c0-1.7-1.3-3-3-3zm.2-6.2c.4-.4.4-1 0-1.4l-4.4-4.4c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l4.4 4.4c.4.4 1 .4 1.4 0zM50.5 22c-5.2 0-9.5 4.3-9.5 9.5s4.3 9.5 9.5 9.5 9.5-4.3 9.5-9.5-4.3-9.5-9.5-9.5zm0 15c-3 0-5.5-2.5-5.5-5.5s2.5-5.5 5.5-5.5 5.5 2.5 5.5 5.5-2.5 5.5-5.5 5.5zm19.8-15c-1.7 0-3 1.3-3 3v17c0 1.7 1.3 3 3 3s3-1.3 3-3V25c0-1.7-1.3-3-3-3zm0-8c1.7 0 3-1.3 3-3s-1.3-3-3-3-3 1.3-3 3 1.3 3 3 3zm21 23c0 2.2 1.8 4 4 4s4-1.8 4-4v-11c0-2.2-1.8-4-4-4s-4 1.8-4 4v11zm4-19c4.4 0 8 3.6 8 8v11c0 4.4-3.6 8-8 8s-8-3.6-8-8v-11c0-4.4 3.6-8 8-8zm24 27c1.7 0 3-1.3 3-3V25c0-1.7-1.3-3-3-3s-3 1.3-3 3v14c0 1.7 1.3 3 3 3zm4.5-23c.4-.4.4-1 0-1.4l-4.4-4.4c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l4.4 4.4c.4.4 1 .4 1.4 0zm19.5 5c-3 0-5.5 2.5-5.5 5.5s2.5 5.5 5.5 5.5 5.5-2.5 5.5-5.5-2.5-5.5-5.5-5.5zm0-4c5.2 0 9.5 4.3 9.5 9.5s-4.3 9.5-9.5 9.5-9.5-4.3-9.5-9.5 4.3-9.5 9.5-9.5zm19.2 4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2s2-.9 2-2V28c0-1.1-.9-2-2-2zm0-8c1.1 0 2-.9 2-2v-2c0-1.1-.9-2-2-2s-2 .9-2 2v2c0 1.1.9 2 2 2z"/>
              </svg>
            ) : (
              // Ikon Kamera Instagram (Kecil)
              <svg className="w-6 h-6 transition-all duration-200" fill="currentColor" viewBox="0 0 512 512">
                <path d="M336 96c21.2 0 41.3 8.4 56.5 23.5S416 154.8 416 176v160c0 21.2-8.4 41.3-23.5 56.5S357.2 416 336 416H176c-21.2 0-41.3-8.4-56.5-23.5S96 357.2 96 336V176c0-21.2 8.4-41.3 23.5-56.5S154.8 96 176 96h160m0-32H176c-61.6 0-112 50.4-112 112v160c0 61.6 50.4 112 112 112h160c61.6 0 112-50.4 112-112V176c0-61.6-50.4-112-112-112z"/>
                <path d="M360 176c-13.3 0-24-10.7-24-24s10.7-24 24-24c13.2 0 24 10.7 24 24s-10.8 24-24 24zM256 192c35.3 0 64 28.7 64 64s-28.7 64-64 64-64-28.7-64-64 28.7-64 64-64m0-32c-53 0-96 43-96 96s43 96 96 96 96-43 96-96-43-96-96-96z"/>
              </svg>
            )}
          </div>

          {/* DAFTAR MENU UTAMA */}
          <div className="flex flex-col gap-1">
            
            {/* HOME */}
            <button
              onClick={() => navigate("/")}
              className={`flex items-center gap-4 p-3 rounded-xl w-full transition-all duration-200 hover:bg-[#f2f2f2] group ${
                isActive("/") ? "font-bold" : "font-normal"
              }`}
            >
              <div className="w-6 h-6 shrink-0 flex items-center justify-center transform group-hover:scale-105 transition-transform">
                <svg aria-label="Home" fill="currentColor" height="24" viewBox="0 0 24 24" width="24">
                  <path d="M22 23h-6.001a1 1 0 0 1-1-1v-5.645a2.002 2.002 0 0 0-2-2h-1.998a2 2 0 0 0-2 2v5.645a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V11a1 1 0 0 1 .343-.75l10-8.5a1.01 1.01 0 0 1 1.315 0l10 8.5A1 1 0 0 1 23 11v11a1 1 0 0 1-1 1Z"></path>
                </svg>
              </div>
              <span className={`text-[15px] text-black transition-all duration-300 ease-in-out whitespace-nowrap ${isHovered ? "opacity-100 max-w-[200px]" : "opacity-0 max-w-0 overflow-hidden"}`}>
                Home
              </span>
            </button>

            {/* REELS */}
            <button className="flex items-center gap-4 p-3 rounded-xl w-full transition-all duration-200 hover:bg-[#f2f2f2] group">
              <div className="w-6 h-6 shrink-0 flex items-center justify-center transform group-hover:scale-105 transition-transform">
                <svg aria-label="Reels" fill="currentColor" height="24" viewBox="0 0 24 24" width="24">
                  <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="2.049" x2="21.951" y1="12" y2="12"></line>
                  <path d="M18.783 22H5.217C3.44 22 2 20.56 2 18.783V5.217C2 3.44 3.44 2 5.217 2h13.566C20.56 2 22 3.44 22 5.217v13.566C22 20.56 20.56 22 18.783 22Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                  <path d="M10 8.552v6.896a.45.45 0 0 0 .676.39l5.517-3.448a.45.45 0 0 0 0-.78l-5.517-3.448A.45.45 0 0 0 10 8.552Z"></path>
                </svg>
              </div>
              <span className={`text-[15px] text-black transition-all duration-300 ease-in-out whitespace-nowrap ${isHovered ? "opacity-100 max-w-[200px]" : "opacity-0 max-w-0 overflow-hidden"}`}>
                Reels
              </span>
            </button>

            {/* MESSAGES */}
            <button className="flex items-center gap-4 p-3 rounded-xl w-full transition-all duration-200 hover:bg-[#f2f2f2] group relative">
              <div className="w-6 h-6 shrink-0 flex items-center justify-center transform group-hover:scale-105 transition-transform relative">
                <svg aria-label="Direct" fill="currentColor" height="24" viewBox="0 0 24 24" width="24">
                  <path d="M22.026 2.03a1.003 1.003 0 0 0-1.07-.123L1.111 11.03a1.003 1.003 0 0 0-.083 1.785l6.002 3.43 3.428 6.003a1.003 1.003 0 0 0 1.785-.083L22.12 3.1c.145-.333.096-.723-.123-1.07Zm-14.7 13.064-4.881-2.79 15.34-6.818-10.459 9.608Zm6.48 4.882-2.79-4.882 9.608-10.459-6.818 15.341Z"></path>
                </svg>
                {/* Badge Notifikasi */}
                <span className="absolute -top-1 -right-1.5 bg-[#ff3b30] text-white text-[10px] font-bold rounded-full h-4 min-w-[16px] px-1 flex items-center justify-center border border-white">
                  9+
                </span>
              </div>
              <span className={`text-[15px] text-black transition-all duration-300 ease-in-out whitespace-nowrap ${isHovered ? "opacity-100 max-w-[200px]" : "opacity-0 max-w-0 overflow-hidden"}`}>
                Messages
              </span>
            </button>

            {/* SEARCH */}
            <button className="flex items-center gap-4 p-3 rounded-xl w-full transition-all duration-200 hover:bg-[#f2f2f2] group">
              <div className="w-6 h-6 shrink-0 flex items-center justify-center transform group-hover:scale-105 transition-transform">
                <svg aria-label="Search" fill="currentColor" height="24" viewBox="0 0 24 24" width="24">
                  <path d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                  <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="16.511" x2="22" y1="16.511" y2="22"></line>
                </svg>
              </div>
              <span className={`text-[15px] text-black transition-all duration-300 ease-in-out whitespace-nowrap ${isHovered ? "opacity-100 max-w-[200px]" : "opacity-0 max-w-0 overflow-hidden"}`}>
                Search
              </span>
            </button>

            {/* EXPLORE */}
            <button className="flex items-center gap-4 p-3 rounded-xl w-full transition-all duration-200 hover:bg-[#f2f2f2] group">
              <div className="w-6 h-6 shrink-0 flex items-center justify-center transform group-hover:scale-105 transition-transform">
                <svg aria-label="Explore" fill="currentColor" height="24" viewBox="0 0 24 24" width="24">
                  <polygon fill="none" points="13.941 13.941 7.581 16.424 10.06 10.06 16.42 7.58 13.941 13.941" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polygon>
                  <circle cx="12" cy="12" fill="none" r="10" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></circle>
                </svg>
              </div>
              <span className={`text-[15px] text-black transition-all duration-300 ease-in-out whitespace-nowrap ${isHovered ? "opacity-100 max-w-[200px]" : "opacity-0 max-w-0 overflow-hidden"}`}>
                Explore
              </span>
            </button>

            {/* NOTIFICATIONS */}
            <button className="flex items-center gap-4 p-3 rounded-xl w-full transition-all duration-200 hover:bg-[#f2f2f2] group">
              <div className="w-6 h-6 shrink-0 flex items-center justify-center transform group-hover:scale-105 transition-transform">
                <svg aria-label="Notifications" fill="currentColor" height="24" viewBox="0 0 24 24" width="24">
                  <path d="M16.792 3.904A4.989 4.989 0 0 1 20.5 9.1c0 5.445 2.155 6.837 2.413 7.1a1 1 0 0 1-.707 1.7H1.8a1 1 0 0 1-.707-1.7c.258-.263 2.414-1.655 2.414-7.1a4.989 4.989 0 0 1 3.707-5.196 2.497 2.497 0 0 1 4.772 0 2.498 2.498 0 0 1 4.799 0Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                  <path d="M9.13 20a3.001 3.001 0 0 0 5.74 0H9.13Z"></path>
                </svg>
              </div>
              <span className={`text-[15px] text-black transition-all duration-300 ease-in-out whitespace-nowrap ${isHovered ? "opacity-100 max-w-[200px]" : "opacity-0 max-w-0 overflow-hidden"}`}>
                Notifications
              </span>
            </button>

            {/* CREATE */}
            <button className="flex items-center gap-4 p-3 rounded-xl w-full transition-all duration-200 hover:bg-[#f2f2f2] group">
              <div className="w-6 h-6 shrink-0 flex items-center justify-center transform group-hover:scale-105 transition-transform">
                <svg aria-label="New post" fill="currentColor" height="24" viewBox="0 0 24 24" width="24">
                  <path d="M2 12V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                  <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="12" x2="12" y1="7" y2="17"></line>
                  <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="7" x2="17" y1="12" y2="12"></line>
                </svg>
              </div>
              <span className={`text-[15px] text-black transition-all duration-300 ease-in-out whitespace-nowrap ${isHovered ? "opacity-100 max-w-[200px]" : "opacity-0 max-w-0 overflow-hidden"}`}>
                Create
              </span>
            </button>

            {/* PROFILE */}
            <button
              onClick={() => navigate("/profile")}
              className={`flex items-center gap-4 p-3 rounded-xl w-full transition-all duration-200 hover:bg-[#f2f2f2] group ${
                isActive("/profile") || isActive("/edit-profile") ? "font-bold bg-[#f2f2f2]" : "font-normal"
              }`}
            >
              {/* Bulatan Foto Profil - Sudah Diperbaiki Ukurannya */}
              <div className="w-6 h-6 rounded-full overflow-hidden border border-gray-300 shrink-0 transform group-hover:scale-105 transition-transform">
                <img 
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=100" 
                  alt="Avatar" 
                  className="w-full h-full object-cover"
                />
              </div>
              <span className={`text-[15px] text-black transition-all duration-300 ease-in-out whitespace-nowrap ${isHovered ? "opacity-100 max-w-[200px]" : "opacity-0 max-w-0 overflow-hidden"}`}>
                Profile
              </span>
            </button>

          </div>
        </div>

        {/* MENU BAGIAN BAWAH */}
        <div className="flex flex-col gap-1">
          {/* MORE (☰) */}
          <button className="flex items-center gap-4 p-3 rounded-xl w-full transition-all duration-200 hover:bg-[#f2f2f2] group">
            <div className="w-6 h-6 shrink-0 flex items-center justify-center transform group-hover:scale-105 transition-transform">
              <svg aria-label="Settings" fill="currentColor" height="24" viewBox="0 0 24 24" width="24">
                <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="3" x2="21" y1="4" y2="4"></line>
                <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="3" x2="21" y1="12" y2="12"></line>
                <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="3" x2="21" y1="20" y2="20"></line>
              </svg>
            </div>
            <span className={`text-[15px] text-black transition-all duration-300 ease-in-out whitespace-nowrap ${isHovered ? "opacity-100 max-w-[200px]" : "opacity-0 max-w-0 overflow-hidden"}`}>
              More
            </span>
          </button>
          
          {/* ALSO FROM META (♾️) */}
          <button className="flex items-center gap-4 p-3 rounded-xl w-full transition-all duration-200 hover:bg-[#f2f2f2] group">
            <div className="w-6 h-6 shrink-0 flex items-center justify-center transform group-hover:scale-105 transition-transform">
              <svg aria-label="Meta" fill="currentColor" height="24" viewBox="0 0 24 24" width="24">
                <path d="M19.123 7.971c-1.341 0-2.48.718-3.13 1.776-.649-1.058-1.788-1.776-3.13-1.776-1.921 0-3.511 1.488-3.614 3.39H4.195C1.882 11.361 0 13.243 0 15.556s1.882 4.195 4.195 4.195h5.054c1.921 0 3.511-1.488 3.614-3.39h5.054c2.313 0 4.195-1.882 4.195-4.195S21.436 7.971 19.123 7.971Zm-14.928 10c-1.21 0-2.195-.985-2.195-2.195s.985-2.195 2.195-2.195h4.168a3.613 3.613 0 0 0-.256 1.344 3.633 3.633 0 0 0 .274 1.353.4.4 0 0 1-.017-.307ZM12.863 15.556c0 1.002-.816 1.818-1.818 1.818s-1.818-.816-1.818-1.818.816-1.818 1.818-1.818 1.818.816 1.818 1.818Zm6.26 2.195h-4.168c.159-.418.256-.87.256-1.344 0-.486-.094-.947-.265-1.373a.4.4 0 0 1 .026.327c1.21 0 2.195.985 2.195 2.195s-.985 2.195-2.195 2.195Z"></path>
              </svg>
            </div>
            <span className={`text-[15px] text-black transition-all duration-300 ease-in-out whitespace-nowrap ${isHovered ? "opacity-100 max-w-[200px]" : "opacity-0 max-w-0 overflow-hidden"}`}>
              Also from Meta
            </span>
          </button>
        </div>
      </nav>

      {/* =========================================================
         2. AREA KONTEN UTAMA (Kanan)
         ========================================================= */}
      <main className="flex-1 min-w-0 flex flex-col bg-white">
        <Outlet />
      </main>

    </div>
  );
};

export default Sidebar;