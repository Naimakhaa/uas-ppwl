import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { prisma } from "../prisma/db";
import type { ApiResponse, HealthCheck, User } from "shared";
import { cors } from "@elysiajs/cors";
import { cookie } from "@elysiajs/cookie";
import { createOAuthClient, getAuthUrl } from "./auth";
import { google } from "googleapis";

const app = new Elysia()
  // 1. Konfigurasi CORS & Cookie
  .use(
    cors({
      origin: ["http://localhost:5173"],
      credentials: true, // Mengizinkan pengiriman cookie session antara frontend & backend
    }),
  )
  .use(cookie())
  .use(swagger())

  // 2. Rute Health Check
  .get("/", (): ApiResponse<HealthCheck> => {
    return {
      data: { status: "ok" },
      message: "server running",
    };
  })

  // 3. Rute Profile Pengguna
  .get(
    "/api/my-profile",
    async ({ set }): Promise<User | { message: string }> => {
      try {
        // Mengambil satu user berdasarkan username "carmen" (sesuai data seed terbaru)
        const user = await prisma.user.findUnique({
          where: {
            username: "carmen",
          },
        });

        if (!user) {
          set.status = 404;
          return { message: "User tidak ditemukan" };
        }

        // Karena shared sudah menyesuaikan, kita bisa kirim object utuh dari DB dengan aman
        return user as unknown as User;
      } catch (error) {
        set.status = 500;
        return { message: "Internal Server Error" };
      }
    },
  )

  // 4. Rute List Users dari Database
  .get("/users", async (): Promise<ApiResponse<User[]>> => {
    const usersFromDb = await prisma.user.findMany();

    // Kirim seluruh data array user mentah dari DB tanpa pangkas properti
    const response: ApiResponse<User[]> = {
      data: usersFromDb as unknown as User[],
      message: "User list retrieved",
    };
    return response;
  })

  // ==========================================
  // FITUR GOOGLE OAUTH LOGIN (TUGAS KAMU)
  // ==========================================

  // URL pemicu: Mengarahkan browser user ke Google Sign-In screen
  .get("/auth/login", ({ redirect }) => {
    const oauth2Client = createOAuthClient();
    const url = getAuthUrl(oauth2Client);
    return redirect(url);
  })

  // Callback URL: Menangkap kembalian dari Google setelah user login
  .get("/auth/callback", async ({ query, set, cookie, redirect }) => {
    const { code } = query as { code: string };
    if (!code) {
      set.status = 400;
      return { error: "Missing authorization code" };
    }

    try {
      const oauth2Client = createOAuthClient();
      const { tokens } = await oauth2Client.getToken(code);
      oauth2Client.setCredentials(tokens);

      const oauth2 = google.oauth2({ auth: oauth2Client, version: "v2" });
      const userInfo = await oauth2.userinfo.get();

      // Mengamankan tipe data string | null | undefined dari Google API
      const googleId = userInfo.data.id ?? "";
      const email = userInfo.data.email ?? "";
      const name = userInfo.data.name ?? "Google User";
      const avatarUrl = userInfo.data.picture ?? null;

      if (!email || !googleId) {
        set.status = 400;
        return { error: "Gagal mengambil data dari Google" };
      }

      // Cek apakah user sudah terdaftar di database
      let user = await prisma.user.findUnique({
        where: { google_id: googleId },
      });

      if (!user) {
        // Jika belum ada di Google ID, cek berdasarkan email (antisipasi akun ganda)
        user = await prisma.user.findUnique({ where: { email } });

        if (user) {
          // Jika email sudah terdaftar lewat form manual temanmu, hubungkan ke Google ID
          user = await prisma.user.update({
            where: { email },
            data: { google_id: googleId, is_google: true },
          });
        } else {
          // Buat user baru & Auto-Generate Username dari Email
          const baseUsername = email.split("@")[0];
          const randomNumber = Math.floor(100 + Math.random() * 900);
          const finalUsername = `${baseUsername}_${randomNumber}`;

          user = await prisma.user.create({
            data: {
              id: crypto.randomUUID(),
              fullName: name,
              email: email,
              username: finalUsername,
              password: null,
              is_google: true,
              google_id: googleId,
              avatarUrl: avatarUrl,
            },
          });
        }
      }

      // Amankan penulisan cookie session agar terbebas dari eror 'possibly undefined'
      if (cookie && cookie.session) {
        const sessionId = crypto.randomUUID();
        cookie.session.value = sessionId;
        cookie.session.maxAge = 60 * 60 * 24; // Berlaku 1 hari
      }

      // Lempar kembali user ke halaman utama Frontend React
      return redirect("http://localhost:5173/");
    } catch (error) {
      console.error("=== EROR ASLI GOOGLE ===");
      console.error(error); // 👈 Ini akan menampilkan detail eror aslinya
      console.error("========================");
      set.status = 500;
      return { error: "Proses Google Authentication Gagal" };
    }
  })

  .listen(3000);

console.log(`🦊 Backend → http://localhost:${app.server?.port}`);
console.log(`📖 Swagger → http://localhost:${app.server?.port}/swagger`);

export type App = typeof app;
