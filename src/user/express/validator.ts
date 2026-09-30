import { z } from "zod";

import * as c from "./const"

// 1. LOGIN SCHEMA
// Fokus: Sanitasi input & proteksi DoS (mencegah payload password raksasa yang memberatkan hashing CPU).
export const loginReqVal = z.object({
    email: z.email().trim().toLowerCase(),
    password: z
        .string()
        .min(1, "Password wajib diisi")
        .max(100, "Password melebihi batas karakter")
});

// 2. REGISTER SCHEMA
// Fokus: Penegakan aturan keamanan kredensial baru.
export const registerReqVal = z.object({
    email: z.email().trim().toLowerCase(),
    password: z
        .string()
        .min(8, "Password minimal 8 karakter")
        .max(100, "Password maksimal 100 karakter")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            "Password harus mengandung kombinasi huruf besar, huruf kecil, dan angka"
        ),
    type: z
        .enum(
            [c.customerTyped, c.merchantTyped],
            `type hanya boleh ${c.customerTyped} atau ${c.merchantTyped}`
        )
});