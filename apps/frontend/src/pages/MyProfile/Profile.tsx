import React, { useState, useEffect } from "react";
import { IoMdGrid } from "react-icons/io";
import { VscBookmark } from "react-icons/vsc";
import { GiCog } from "react-icons/gi";
import { FiVideoOff, FiLogOut } from "react-icons/fi";

// 1. Definisi Interface untuk TypeScript (Sesuai Kriteria Tugas)
interface ProfileData {
  username: string;
  fullName: string;
  bio: string;
  avatarUrl: string;
  postsCount: number;
  followersCount: number;
  followingCount: number;
  website?: string;
}

const MyProfile: React.FC = () => {
  // 2. State Management
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [activeTab, setActiveTab] = useState<number>(0); // 0: Grid, 1: Saved
  const [loading, setLoading] = useState<boolean>(true);

  // 3. Integrasi Fetch ke Backend (Sesuai Kriteria Tugas Besar)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Ganti URL dengan endpoint backend Elysia-mu
        const response = await fetch("http://localhost:3000/api/my-profile");
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error("Gagal mengambil data profil:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div className="text-center mt-20">Memuat Profil...</div>;

  return (
    <section className="max-w-4xl mx-auto px-4 py-8 font-sans text-gray-900">
      {/* --- HEADER SECTION --- */}
      <header className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
        {/* Avatar */}
        <div className="w-20 h-20 md:w-40 md:h-40 rounded-full border-2 border-gray-200 overflow-hidden shrink-0">
          <img 
            src={profile?.avatarUrl || "https://via.placeholder.com/150"} 
            alt="avatar" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info & Actions */}
        <div className="flex flex-col gap-5 w-full">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            <h2 className="text-xl font-light tracking-wide">{profile?.username}</h2>
            <div className="flex gap-2">
              <button className="bg-gray-100 hover:bg-gray-200 px-4 py-1.5 rounded-lg text-sm font-semibold transition">
                Edit Profile
              </button>
              <button className="bg-gray-100 hover:bg-gray-200 p-2 rounded-lg transition md:hidden">
                <FiLogOut />
              </button>
              <button className="p-1">
                <GiCog className="text-2xl" />
              </button>
            </div>
          </div>

          {/* Statistik (Desktop) */}
          <div className="hidden md:flex gap-10">
            <span><strong>{profile?.postsCount}</strong> posts</span>
            <span><strong>{profile?.followersCount}</strong> followers</span>
            <span><strong>{profile?.followingCount}</strong> following</span>
          </div>

          {/* Bio */}
          <div className="text-sm text-center md:text-left">
            <h1 className="font-bold">{profile?.fullName}</h1>
            <p className="whitespace-pre-line">{profile?.bio}</p>
            {profile?.website && (
              <a href={profile.website} target="_blank" className="text-blue-900 font-semibold block mt-1">
                {profile.website.replace(/^https?:\/\//, "")}
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Statistik (Mobile Only) */}
      <div className="md:hidden flex justify-around border-t py-3 text-sm text-gray-500 mb-4">
        <div className="text-center"><strong>{profile?.postsCount}</strong><br/>posts</div>
        <div className="text-center"><strong>{profile?.followersCount}</strong><br/>followers</div>
        <div className="text-center"><strong>{profile?.followingCount}</strong><br/>following</div>
      </div>

      {/* --- TABS SECTION --- */}
      <div className="border-t border-gray-200">
        <div className="flex justify-center gap-16">
          <button 
            onClick={() => setActiveTab(0)}
            className={`flex items-center gap-2 py-4 text-xs font-bold tracking-widest uppercase transition-all border-t-2 ${
              activeTab === 0 ? "border-black text-black" : "border-transparent text-gray-400"
            }`}
          >
            <IoMdGrid className="text-lg" /> POSTS
          </button>
          <button 
            onClick={() => setActiveTab(1)}
            className={`flex items-center gap-2 py-4 text-xs font-bold tracking-widest uppercase transition-all border-t-2 ${
              activeTab === 1 ? "border-black text-black" : "border-transparent text-gray-400"
            }`}
          >
            <VscBookmark className="text-lg" /> SAVED
          </button>
        </div>
      </div>

      {/* --- CONTENT SECTION --- */}
      <div className="mt-4">
        {activeTab === 0 ? (
          /* Grid Postingan (Jika Kosong) */
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="rounded-full border-2 border-black p-4 mb-4">
              <FiVideoOff className="text-4xl" />
            </div>
            <h2 className="text-3xl font-extrabold">Share Photos</h2>
            <p className="text-gray-500 mt-2">When you share photos, they will appear on your profile.</p>
            <button className="text-blue-500 font-bold mt-4 hover:text-blue-700">Share your first photo</button>
          </div>
        ) : (
          /* Saved Posts (Jika Kosong) */
          <div className="flex flex-col items-center justify-center py-20 text-center">
             <VscBookmark className="text-6xl text-gray-300 mb-4" />
             <h2 className="text-2xl font-bold">Save</h2>
             <p className="max-w-xs text-gray-500 mt-2">Save photos and videos that you want to see again.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyProfile;