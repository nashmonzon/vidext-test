import { Button } from "@/components/ui/button";

import { ModeToggle } from "./components/mode-toggle";
import { HydrateClient } from "./trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex flex-col h-screen w-full overflow-hidden">
        <Button>Click me</Button>
        <div className="fixed bottom-4 right-4">
          <ModeToggle />
        </div>
      </main>
    </HydrateClient>
  );
}
