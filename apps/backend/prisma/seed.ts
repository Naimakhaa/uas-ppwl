import { prisma } from "./db";

async function main() {
  await prisma.user.upsert({
    where: { username: "carmen" }, // 👈 1. Ganti yang dicari di database jadi carmen
    update: {},
    create: {
      username: "carmen",          // 👈 2. Ganti username akun baru jadi carmen
      fullName: "Carmen",          // Bisa disesuaikan juga nama lengkapnya
      email: "carmen@gmail.com",   // Disesuaikan agar serasi dengan usernamenya
      bio: "Software Engineering Student 2026",
      avatarUrl: "https://github.com/shadcn.png",
      postsCount: 12,
      followersCount: 1200,
      followingCount: 500,
      website: "https://myporto.com",
    },
  });
}

main().finally(() => prisma.$disconnect());