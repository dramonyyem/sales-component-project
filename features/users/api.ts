export async function getUsers(): Promise<string[]> {
  const res = await fetch("/api/users"); // or { cache: "force-cache" } for SSR

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  const result = await res.json();

  return result.data; // <-- return **data only**, not NextResponse
}
