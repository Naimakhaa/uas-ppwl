import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Toaster } from 'sonner';
import { useAuthStore } from '@/stores/auth.store'; // Pastikan path import store Zustand kamu sudah benar
import Profile from "./pages/MyProfile/Profile";
import Login from './pages/Login/Login';

// Komponen Proteksi Route (Mencegah user yang belum login masuk ke /profile)
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const user = useAuthStore((state) => state.user);
  return user ? <>{children}</> : <Navigate to="/login" replace />;
}

// Komponen Pembatas Login (Mencegah user yang SUDAH login kembali ke halaman /login)
function AuthRoute({ children }: { children: React.ReactNode }) {
  const user = useAuthStore((state) => state.user);
  return !user ? <>{children}</> : <Navigate to="/profile" replace />;
}

export default function App() {
  const setAuth = useAuthStore((state) => state.setAuth);
  const user = useAuthStore((state) => state.user);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    // Jalankan pengecekan session ke backend Elysia hanya jika di Zustand user-nya masih kosong
    if (!user) {
      fetch('http://localhost:3000/api/my-profile', { 
        credentials: 'include' // KRUSIAL: Agar cookie session Google ikut dikirim oleh browser
      })
        .then((res) => {
          if (res.ok) return res.json();
          throw new Error('Belum terautentikasi / Guest');
        })
        .then((data) => {
          // Sinkronisasikan data user dari database ke Zustand store
          setAuth(
            {
              id: data.id,
              name: data.name,
              email: data.email,
              avatarUrl: data.avatarUrl || 'https://via.placeholder.com/150',
            },
            'session-cookie-active' 
          );
        })
        .catch(() => {
          console.log('User mengakses sebagai tamu (belum login).');
        })
        .finally(() => {
          // Matikan loading screen setelah pengecekan selesai
          setIsCheckingAuth(false);
        });
    } else {
      setIsCheckingAuth(false);
    }
  }, [user, setAuth]);

  // Tampilkan loading screen sederhana saat aplikasi sedang mencocokkan cookie data Google kamu
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
      <div className="w-screen min-h-screen flex items-center justify-center bg-[#fafafa]">
        <Routes>
          {/* Halaman / dan /login akan otomatis mengusir user ke /profile jika sudah login */}
          <Route path="/" element={<AuthRoute><Login /></AuthRoute>} />
          <Route path="/login" element={<AuthRoute><Login /></AuthRoute>} />
          
          {/* Halaman /profile diproteksi, wajib login dulu baru bisa dibuka */}
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        </Routes>
      </div>

      {/* Taruh Toaster di sini agar popup Sonner-nya bisa muncul secara global */}
      <Toaster position="top-center" richColors />
    </BrowserRouter>
  );
}