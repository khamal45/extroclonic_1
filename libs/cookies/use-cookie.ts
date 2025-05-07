"use server";

import { cookies } from "next/headers";

const defaultCookieOptions = {
  path: "/",
  httpOnly: true,
  secure: true,
  sameSite: "strict" as const,
  maxAge: 60 * 60 * 24 * 365,
};

export async function setCookie(name: string, value: string, options = {}) {
  const cookieOptions = { ...defaultCookieOptions, ...options };
  cookies().set(name, value, cookieOptions);
}

export async function deleteCookie(name: string, options = {}) {
  const cookieOptions = { ...defaultCookieOptions, ...options };
  cookies().delete({ name, ...cookieOptions });
}

export async function getCookie(name: string) {
  return cookies().get(name)?.value;
}
