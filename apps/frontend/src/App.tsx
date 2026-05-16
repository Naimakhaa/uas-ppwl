import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Toaster } from 'sonner';

// IMPORT HALAMAN LOGIN
import Sidebar from "./components/ui/Sidebar";
import Login from './pages/Login/Login';
import EditProfile from "./pages/EditProfile/EditProfile";

// ========================================================
// IMPORT HALAMAN PROFIL SECARA AMAN (MENGHINDARI EROR 500)
// ========================================================
import * as ProfileModule from "./pages/MyProfile/Profile";

// Deteksi otomatis apakah kelompokmu pakai export default atau named export (MyProfile)
const ProfileComponent = 
  ProfileModule.default || 
  (ProfileModule as any).MyProfile || 
  (() => (
    <div className="p-10 text-center">
      <h1 className="text-xl font-bold text-red-500">Gagal Memuat Komponen Profil</h1>
      <p className="text-gray-500">Pastikan file /src/pages/MyProfile/Profile.tsx ada dan namanya benar.</p>
    </div>
  ));
// ========================================================

export default function App() {
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    // Matikan loading screen agar langsung masuk ke rute halaman
    setIsCheckingAuth(false);
  }, []);

  if (isCheckingAuth) {
    return (
      <div className="w-screen h-screen flex flex-col items-center justify-center bg-white">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg"
          alt="Instagram Loading"
          className="w-14 h-14 animate-pulse"
        />
      </div>
    );
  }

  return (
    <BrowserRouter>
      {/* Catatan: w-screen dan items-center/justify-center dihilangkan dari div pembungkus utama 
        agar halaman edit-profile & profile bisa mengisi layar ke kanan dengan fleksibel mengikuti layout Sidebar.
      */}
      <div className="w-full min-h-screen bg-[#fafafa]">
        <Routes>
          {/* Halaman Login berdiri sendiri tanpa Sidebar */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          
          {/* ================================================================
            STRUKTUR BERSARANG (NESTED ROUTES)
            Komponen Sidebar dijadikan INDUK agar selalu muncul di kiri layar.
            ================================================================
          */}
          <Route element={<Sidebar />}>
            {/* Halaman-halaman di bawah ini otomatis akan merender Sidebar di kirinya */}
            <Route path="/profile" element={<ProfileComponent />} />
            <Route path="/edit-profile" element={<EditProfile />} />
          </Route>

        </Routes>
      </div>

      <Toaster position="top-center" richColors />
    </BrowserRouter>
  );
}