import { Button } from "@/components/ui/button";

import { ModeToggle } from "./components/mode-toggle";
import { HydrateClient } from "./trpc/server";
import { DrawEditor } from "./components/draw-editor";
import { User } from "./components/user";
import SignIn from "./components/sign-in";
import SignUp from "./components/sing-up";
import UserCard from "./components/useCard";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex flex-col h-screen w-full overflow-hidden">
        {/* <DrawEditor />
        <Button>Click me</Button>
        <div className="fixed bottom-4 right-4">
          <ModeToggle />
        </div> */}
        {/* <User /> */}
        <SignIn />
        <SignUp />
        <UserCard />
      </main>
    </HydrateClient>
  );
}
