// components/UserCard.tsx
"use client";
// import { useRouter } from "next/router";

import { Button } from "@/components/ui/button";
import { trpc } from "../trpc/client";

const UserCard = () => {
  // const router = useRouter();
  const signOut = trpc.auth.signOut.useMutation();

  const handleSignOut = async () => {
    try {
      await signOut.mutateAsync();
      // router.push("/login");
      console.log("Sign out successful!");
    } catch (error) {
      console.error("Error during sign out:", error);
    }
  };

  return (
    <div>
      <Button onClick={handleSignOut}>Sign Out</Button>
    </div>
  );
};

export default UserCard;
