// components/SignIn.tsx
"use client";
import { useState } from "react";
import { authClient } from "../lib/auth-client";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    try {
      const { data, error } = await authClient.signIn.email(
        {
          email,
          password,
          callbackURL: "/dashboard",
          rememberMe: true,
        },
        {
          onRequest: () => {
            console.log("Signing in...");
          },
          onSuccess: () => {
            console.log("Sign in successful!");
            // Redirigir al dashboard
          },
          onError: (ctx) => {
            alert(ctx.error.message);
          },
        }
      );
      console.log(data, error);
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
