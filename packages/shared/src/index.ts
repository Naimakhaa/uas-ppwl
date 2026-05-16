export interface HealthCheck {
  status: string
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface User {
  id: string;             // Kembalikan ke string karena SQLite kita pakai CUID/UUID (string)
  username: string;
  fullName: string;       // Sesuai dengan schema.prisma
  email: string;
  password?: string | null;
  bio?: string | null;
  avatarUrl?: string | null;
  website?: string | null;
  postsCount: number;
  followersCount: number;
  followingCount: number;
  is_google: boolean;
  google_id?: string | null;
  createdAt: Date;
}