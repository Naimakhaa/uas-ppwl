import { google } from "googleapis";

// Fungsi untuk membuat client OAuth Google menggunakan variabel dari file .env
export function createOAuthClient() {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    "http://localhost:3000/auth/callback" // Harus sama persis dengan yang di Google Cloud Console
  );
}

// Fungsi untuk membuat URL login Google yang akan dibuka oleh user
export function getAuthUrl(oauth2Client: any) {
  return oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email"
    ],
    prompt: "select_account" // Memaksa Google untuk selalu menampilkan pilihan akun
  });
}