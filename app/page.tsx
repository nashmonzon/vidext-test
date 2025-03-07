import { Button } from "@/components/ui/button";

import { ModeToggle } from "./components/mode-toggle";
import { HydrateClient } from "./trpc/server";
import { DrawEditor } from "./components/draw-editor";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex flex-col h-screen w-full overflow-hidden">
        <DrawEditor />
        <Button>Click me</Button>
        <div className="fixed bottom-4 right-4">
          <ModeToggle />
        </div>
      </main>
    </HydrateClient>
  );
}
