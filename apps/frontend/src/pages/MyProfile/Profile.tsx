import React, { useState, memo } from "react";
import { useNavigate } from "react-router-dom";

// ICONS
import { IoMdGrid } from "react-icons/io";
import { VscBookmark } from "react-icons/vsc";
import { GiCog } from "react-icons/gi";
import { GoVerified } from "react-icons/go";
import { FiVideoOff } from "react-icons/fi";

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<number>(0);

  const profile = {
    username: "kharizma_rzkh",
    fullName: "Riz Riz",
    bio: "Eunoia ☀️✨\nDigital Enthusiast | Tech & Design",
    avatarUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400",
    postsCount: 3,
    followersCount: 508,
    followingCount: 505,
    website: "https://untan.ac.id"
  };

  const highlights = [
    { name: "therapy", img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=150" },
    { name: "Sorotan", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" },
    { name: "f", img: "https://images.unsplash.com/photo-1513885045260-6b3086b24c17?w=150" },
    { name: "kuchingмy", img: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=150" }
  ];

  return (
    <div style={{ fontFamily: "Segoe UI, Roboto, Helvetica, Arial, sans-serif", color: "#262626", maxWidth: "935px", margin: "0 auto", padding: "30px 20px" }}>
      
      {/* HEADER SECTION */}
      <header style={{ display: "flex", alignItems: "center", marginBottom: "44px", paddingLeft: "40px" }}>
        {/* Lingkaran Avatar */}
        <div style={{ width: "150px", height: "150px", borderRadius: "50%", overflow: "hidden", marginRight: "100px", border: "1px solid #dbdbdb", flexShrink: 0 }}>
          <img src={profile.avatarUrl} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>

        {/* Info Detail */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", flexGrow: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <h2 style={{ fontSize: "28px", fontWeight: "300", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
              {profile.username}
              <GoVerified style={{ color: "#0095f6", fontSize: "18px" }} />
            </h2>
            <button onClick={() => navigate("/edit-profile")} style={{ backgroundColor: "#efefef", border: "none", borderRadius: "4px", padding: "5px 16px", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}>
              Edit Profile
            </button>
            <GiCog style={{ fontSize: "24px", cursor: "pointer" }} />
          </div>

          <div style={{ display: "flex", gap: "40px", fontSize: "16px" }}>
            <div><strong style={{ fontWeight: "600" }}>{profile.postsCount}</strong> posts</div>
            <div><strong style={{ fontWeight: "600" }}>{profile.followersCount}</strong> followers</div>
            <div><strong style={{ fontWeight: "600" }}>{profile.followingCount}</strong> following</div>
          </div>

          <div style={{ fontSize: "14px", lineHeight: "1.5" }}>
            <h1 style={{ fontWeight: "600", margin: "0 0 4px 0" }}>{profile.fullName}</h1>
            <p style={{ margin: 0, whiteSpace: "pre-line", color: "#262626" }}>{profile.bio}</p>
            <a href={profile.website} target="_blank" rel="noreferrer" style={{ color: "#00376b", fontWeight: "600", textDecoration: "none" }}>
              {profile.website.replace(/^(?:https?:\/\/|www\.)/i, "")}
            </a>
          </div>
        </div>
      </header>

      {/* HIGHLIGHTS / SOROTAN */}
      <div style={{ display: "flex", gap: "28px", padding: "10px 0 30px 40px", borderBottom: "1px solid #dbdbdb", overflowX: "auto" }}>
        {highlights.map((hl, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", cursor: "pointer", flexShrink: 0 }}>
            <div style={{ width: "77px", height: "77px", borderRadius: "50%", padding: "3px", border: "1px solid #dbdbdb", backgroundColor: "#fff" }}>
              <img src={hl.img} alt={hl.name} style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} />
            </div>
            <span style={{ fontSize: "12px", fontWeight: "500" }}>{hl.name}</span>
          </div>
        ))}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", cursor: "pointer" }}>
          <div style={{ width: "77px", height: "77px", borderRadius: "50%", border: "1px solid #dbdbdb", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "30px", fontWeight: "100", color: "#c7c7c7" }}>+</div>
          <span style={{ fontSize: "12px", color: "#8e8e8e" }}>New</span>
        </div>
      </div>

      {/* TABS LAYER */}
      <div style={{ display: "flex", justifyContent: "center", gap: "60px", marginBottom: "20px" }}>
        <button onClick={() => setActiveTab(0)} style={{ background: "none", border: "none", borderTop: activeTab === 0 ? "1px solid #262626" : "1px solid transparent", color: activeTab === 0 ? "#262626" : "#8e8e8e", padding: "12px 0", fontSize: "12px", fontWeight: "600", letterSpacing: "1px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}>
          <IoMdGrid style={{ fontSize: "16px" }} /> POSTS
        </button>
        <button onClick={() => setActiveTab(1)} style={{ background: "none", border: "none", borderTop: activeTab === 1 ? "1px solid #262626" : "1px solid transparent", color: activeTab === 1 ? "#262626" : "#8e8e8e", padding: "12px 0", fontSize: "12px", fontWeight: "600", letterSpacing: "1px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}>
          <VscBookmark style={{ fontSize: "16px" }} /> SAVED
        </button>
      </div>

      {/* GRID LAYOUT POSTINGAN */}
      <div>
        {activeTab === 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "28px" }}>
            <div style={{ aspectRatio: "1/1", backgroundColor: "#fafafa", border: "1px solid #dbdbdb" }}><img src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400" style={{ width: "100%", height: "100%", objectFit: "cover" }} alt=""/></div>
            <div style={{ aspectRatio: "1/1", backgroundColor: "#fafafa", border: "1px solid #dbdbdb" }}><img src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400" style={{ width: "100%", height: "100%", objectFit: "cover" }} alt=""/></div>
            <div style={{ aspectRatio: "1/1", backgroundColor: "#fafafa", border: "1px solid #dbdbdb" }}><img src="https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400" style={{ width: "100%", height: "100%", objectFit: "cover" }} alt=""/></div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 0", textAlign: "center" }}>
            <FiVideoOff style={{ fontSize: "62px", color: "#262626", marginBottom: "16px" }} />
            <h2 style={{ fontSize: "28px", fontWeight: "800", margin: "0 0 10px 0" }}>Photos of you</h2>
            <p style={{ color: "#8e8e8e", fontSize: "14px", margin: 0 }}>When people tag you in photos, they'll appear here.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default memo(Profile);