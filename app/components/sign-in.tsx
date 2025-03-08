// components/SignIn.tsx
"use client";
import { useState } from "react";
import { trpc } from "../trpc/client";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signIn = trpc.auth.signIn.useMutation();

  const handleSignIn = async () => {
    try {
      const user = await signIn.mutateAsync({ email, password });
      console.log("Sign in successful!", user);
      // Redirigir al dashboard
    } catch (error) {
      console.error("Error during sign in:", error);
    }
  };

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  );
};

export default SignIn;
