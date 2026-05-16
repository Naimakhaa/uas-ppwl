import React, { useState, memo } from "react";
import { useNavigate } from "react-router-dom";

interface EditProfileForm {
  name: string;
  avatar_url: string;
  email: string;
  password?: string;
  website?: string;
  bio?: string;
  gender?: string;
}

const EditProfile: React.FC = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState<boolean>(false);

  const [formData, setFormData] = useState<EditProfileForm>({
    name: "Riz Riz",
    avatar_url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400",
    email: "kharizma.rzkh@student.untan.ac.id",
    password: "",
    website: "",
    bio: "Eunoia ☀️✨",
    gender: "Female"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Perubahan Profil Berhasil Disimpan!");
    navigate("/profile");
  };

  return (
    // flexGrow: 1 memastikan area ini memakai sisa ruang di sebelah kanan sidebar utama aplikasi Anda
    <div style={{ display: "flex", flexGrow: 1, minHeight: "100vh", backgroundColor: "#fff", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif", boxSizing: "border-box" }}>

      {/* ================= LAYOUT MENU SETTINGS (TENGAH) ================= */}
      <aside style={{ width: "320px", borderRight: "1px solid #e0e0e0", padding: "30px 24px", boxSizing: "border-box", flexShrink: 0, height: "100vh", overflowY: "auto", position: "sticky", top: 0 }}>
        <h1 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "24px", color: "#000", letterSpacing: "-0.5px" }}>Settings</h1>

        {/* Box Meta Accounts Center */}
        <div style={{ border: "1px solid #e0e0e0", borderRadius: "16px", padding: "16px", marginBottom: "20px", backgroundColor: "#fff" }}>
          <span style={{ fontSize: "11px", fontWeight: "bold", color: "#0095f6", display: "block", marginBottom: "2px", letterSpacing: "0.5px" }}>Meta</span>
          <h3 style={{ fontSize: "14px", fontWeight: "700", margin: "0 0 4px 0", color: "#000" }}>Accounts Center</h3>
          <p style={{ fontSize: "12px", color: "#737373", margin: "0 0 12px 0", lineHeight: "1.4" }}>Manage your connected experiences and account settings across Meta technologies.</p>
          <span style={{ fontSize: "12px", color: "#0095f6", cursor: "pointer", fontWeight: "600" }}>See more in Accounts Center</span>
        </div>

        {/* List Menu Items */}
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <span style={{ fontSize: "12px", fontWeight: "600", color: "#737373", padding: "8px 12px" }}>How you use Instagram</span>
          <div style={{ padding: "12px", backgroundColor: "#f2f2f2", borderRadius: "8px", fontWeight: "700", fontSize: "14px", cursor: "pointer", color: "#000" }}>Edit profile</div>
          <div style={{ padding: "12px", borderRadius: "8px", fontSize: "14px", color: "#000", cursor: "pointer" }}>Notifications</div>

          <span style={{ fontSize: "12px", fontWeight: "600", color: "#737373", padding: "16px 12px 8px 12px" }}>Who can see your content</span>
          <div style={{ padding: "12px", borderRadius: "8px", fontSize: "14px", color: "#000", cursor: "pointer" }}>Account privacy</div>
          <div style={{ padding: "12px", borderRadius: "8px", fontSize: "14px", color: "#000", cursor: "pointer" }}>Close Friends</div>
        </div>
      </aside>

      {/* ================= LAYOUT FORM EDIT PROFILE (KANAN) ================= */}
      <main style={{ flexGrow: 1, padding: "40px 60px", boxSizing: "border-box", backgroundColor: "#fff", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: "650px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "32px", color: "#000" }}>Edit profile</h2>

          {/* Banner Identitas Pengguna */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: "#efefef", padding: "16px 20px", borderRadius: "16px", marginBottom: "32px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div style={{ width: "44px", height: "44px", borderRadius: "50%", overflow: "hidden" }}>
                <img src={formData.avatar_url} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div>
                <strong style={{ display: "block", fontSize: "14px", color: "#000" }}>kharizma_rzkh</strong>
                <span style={{ fontSize: "14px", color: "#737373" }}>{formData.name}</span>
              </div>
            </div>
            <button type="button" onClick={() => setShowModal(true)} style={{ backgroundColor: "#0095f6", color: "#fff", border: "none", borderRadius: "8px", padding: "7px 16px", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}>
              Change photo
            </button>
          </div>

          {/* Formulir */}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

            {/* WEBSITE */}
            <div>
              <label style={{ display: "block", fontSize: "16px", fontWeight: "700", marginBottom: "8px", color: "#000" }}>Website</label>
              <input type="text" name="website" value={formData.website || ""} onChange={handleChange} placeholder="Website" style={{ width: "100%", padding: "12px", border: "1px solid #dbdbdb", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box" }} />
              <span style={{ fontSize: "12px", color: "#737373", marginTop: "8px", display: "block", lineHeight: "1.4" }}>Editing your links is only available on mobile. Visit the Instagram app and edit your profile to change the websites in your bio.</span>
            </div>

            {/* BIO */}
            <div>
              <label style={{ display: "block", fontSize: "16px", fontWeight: "700", marginBottom: "8px", color: "#000" }}>Bio</label>
              <textarea name="bio" value={formData.bio || ""} onChange={handleChange} maxLength={150} style={{ width: "100%", padding: "12px", border: "1px solid #dbdbdb", borderRadius: "8px", fontSize: "14px", minHeight: "80px", boxSizing: "border-box", fontFamily: "inherit", resize: "none" }} />
              <div style={{ textAlign: "right", fontSize: "12px", color: "#737373", marginTop: "4px" }}>{formData.bio?.length || 0} / 150</div>
            </div>

            {/* GENDER */}
            <div>
              <label style={{ display: "block", fontSize: "16px", fontWeight: "700", marginBottom: "8px", color: "#000" }}>Gender</label>
              <select name="gender" value={formData.gender || "Female"} onChange={handleChange} style={{ width: "100%", padding: "12px", border: "1px solid #dbdbdb", borderRadius: "8px", fontSize: "14px", backgroundColor: "#fff", color: "#000", cursor: "pointer" }}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
              <span style={{ fontSize: "12px", color: "#737373", marginTop: "6px", display: "block" }}>This won't be part of your public profile.</span>
            </div>

            {/* NAME */}
            <div>
              <label style={{ display: "block", fontSize: "16px", fontWeight: "700", marginBottom: "8px", color: "#000" }}>Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} style={{ width: "100%", padding: "12px", border: "1px solid #dbdbdb", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box" }} required />
            </div>

            {/* EMAIL */}
            <div>
              <label style={{ display: "block", fontSize: "16px", fontWeight: "700", marginBottom: "8px", color: "#000" }}>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} style={{ width: "100%", padding: "12px", border: "1px solid #dbdbdb", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box" }} required />
            </div>

            {/* PASSWORD */}
            <div>
              <label style={{ display: "block", fontSize: "16px", fontWeight: "700", marginBottom: "8px", color: "#000" }}>New Password</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Isi untuk ubah password" style={{ width: "100%", padding: "12px", border: "1px solid #dbdbdb", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box" }} />
            </div>

            {/* TOMBOL SUBMIT */}
            <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
              <button type="submit" style={{ backgroundColor: "#0095f6", color: "#fff", border: "none", borderRadius: "8px", padding: "12px 24px", fontWeight: "700", fontSize: "14px", cursor: "pointer", width: "100%" }}>
                Submit
              </button>
              <button type="button" onClick={() => navigate("/profile")} style={{ background: "none", border: "none", color: "#737373", fontWeight: "600", cursor: "pointer", fontSize: "14px", width: "100%", textAlign: "center" }}>Cancel</button>
            </div>

          </form>
        </div>
      </main>

      {/* ================= POP-UP MODAL BOX: EDIT FOTO AVATAR ================= */}
      {showModal && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", backgroundColor: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999 }}>
          <div style={{ backgroundColor: "#fff", width: "400px", borderRadius: "12px", overflow: "hidden", textAlign: "center" }}>

            <div style={{ padding: "25px 20px 18px 20px", borderBottom: "1px solid #f0f0f0" }}>
              <div style={{ width: "56px", height: "56px", borderRadius: "50%", overflow: "hidden", margin: "0 auto 12px auto", border: "1px solid #dbdbdb" }}>
                <img src={formData.avatar_url} alt="modal-avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <h4 style={{ margin: "0 0 4px 0", fontSize: "16px", fontWeight: "700", color: "#000" }}>Synced profile photo</h4>
              <span style={{ fontSize: "13px", color: "#737373" }}>Instagram, Facebook</span>
            </div>

            <div
              style={{ padding: "14px", color: "#0095f6", fontWeight: "700", fontSize: "14px", cursor: "pointer", borderBottom: "1px solid #f0f0f0" }}
              onClick={() => {
                const url = prompt("Masukkan Link/URL Foto Baru Anda:", formData.avatar_url);
                if (url && url.trim() !== "") {
                  setFormData({ ...formData, avatar_url: url });
                }
                setShowModal(false);
              }}
            >
              Upload Photo
            </div>

            <div style={{ padding: "14px", fontSize: "14px", color: "#000", cursor: "pointer", borderBottom: "1px solid #f0f0f0" }}>
              Manage sync settings
            </div>

            <div
              style={{ padding: "14px", color: "#ed4956", fontWeight: "700", fontSize: "14px", cursor: "pointer", borderBottom: "1px solid #f0f0f0" }}
              onClick={() => {
                setFormData({ ...formData, avatar_url: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400" });
                setShowModal(false);
              }}
            >
              Remove Current Photo
            </div>

            <div style={{ padding: "14px", fontSize: "14px", color: "#000", cursor: "pointer" }} onClick={() => setShowModal(false)}>
              Cancel
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default memo(EditProfile);