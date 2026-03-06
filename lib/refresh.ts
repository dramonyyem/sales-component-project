import { tokenManager } from "./token";

let isRefreshing = false;
let refreshQueue: (() => void)[] = [];

export async function refreshToken() {
  if (isRefreshing) {
    // wait until current refresh finishes
    return new Promise<void>((resolve) => refreshQueue.push(resolve));
  }

  isRefreshing = true;

  try {
    const res = await fetch("/api/auth/refresh", {
      method: "POST",
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to refresh");
    const data = await res.json();

    // store new token
    tokenManager.setToken(data.token);
  } finally {
    isRefreshing = false;
    refreshQueue.forEach((resolve) => resolve());
    refreshQueue = [];
  }
}
