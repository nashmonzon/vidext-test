// components/SignUp.tsx
"use client";
import { useState } from "react";

import { trpc } from "../trpc/client";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const signUp = trpc.auth.signUp.useMutation();

  const handleSignUp = async () => {
    try {
      const user = await signUp.mutateAsync({ email, password, name });
      console.log("Sign up successful!", user);
      console.log(user);
    } catch (error) {
      console.error("Error during sign up:", error);
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
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
};

export default SignUp;
