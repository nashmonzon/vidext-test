// components/User.tsx
"use client";
import { authClient } from "../lib/auth-client";

export function User() {
  const { data: session, isPending, error } = authClient.useSession();

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Welcome, {session?.user?.name}</h1>
      {/* Muestra más información del usuario si es necesario */}
    </div>
  );
}
