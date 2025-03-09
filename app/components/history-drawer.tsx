"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToggleContent } from "../hooks/useToggleContent";
// import { Snapshot, User } from "@prisma/client";
import { Collapsible } from "@radix-ui/react-collapsible";
import {
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown, LogOut, Pencil } from "lucide-react";
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DateTime } from "luxon";

import { Snapshot, User } from "@prisma/client";
import { trpc } from "../trpc/client";
import { useRouter } from "next/navigation";
import { ModeToggle } from "./mode-toggle";

export default function HistoryDrawer({
  isExpanded,
  data,
  user,
  setSnapshotId,
}: {
  isExpanded: boolean;
  data: Snapshot[];
  user: User;
  setSnapshotId: (snapshotId: string) => void;
}) {
  const showContent = useToggleContent(isExpanded);
  const [isOpen, setIsOpen] = useState(false);
  const createSnapshot = trpc.snapshot.createSnapshot.useMutation();
  const [selectedSnapshotId, setSelectedSnapshotId] = useState(() => {
    const savedId = localStorage.getItem("selectedSnapshotId");
    return savedId ? savedId : data.length > 0 ? data[0].id : null;
  });
  const router = useRouter();

  const signOut = trpc.auth.signOut.useMutation();

  const handleSignOut = async (e: React.FormEvent) => {
    e.preventDefault();
    await signOut.mutateAsync();

    localStorage.clear();

    router.push(`/login`);
  };

  useEffect(() => {
    if (selectedSnapshotId) {
      localStorage.setItem("selectedSnapshotId", selectedSnapshotId);
      const url = new URL(window.location.href);
      url.searchParams.set("d", selectedSnapshotId);
      window.history.pushState({}, "", url.toString());
      setSnapshotId(selectedSnapshotId);
    }
  }, [selectedSnapshotId]);

  const handleNewSnapshot = async () => {
    try {
      const newSnapshot = await createSnapshot.mutateAsync({
        userId: user.id,
      });

      if (newSnapshot) {
        setSnapshotId(newSnapshot);
        localStorage.setItem("selectedSnapshotId", newSnapshot);
        const url = new URL(window.location.href);
        url.searchParams.set("d", newSnapshot);
        window.history.pushState({}, "", url.toString());
      }
    } catch (error) {
      console.error("Error creating snapshot:", error);
    }
  };

  return (
    <Card
      className={`
        transition-all duration-300 ease-in-out
        ${isExpanded ? "w-[20%]" : "w-0"} 
        flex flex-col h-full
        ${isExpanded ? "opacity-100" : "opacity-0"}
        ${isExpanded ? "border" : "border-0"}
        overflow-hidden 
      `}
    >
      {showContent && (
        <>
          <CardHeader className="transition-opacity duration-200 delay-75 flex flex-row  justify-between">
            <CardTitle className="content-center">Test TLDraw</CardTitle>
            <div className="flex flex-row gap-2">
              <ModeToggle />
              <Button variant="outline" onClick={handleNewSnapshot}>
                <Pencil />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="flex-grow transition-opacity duration-200 delay-100">
            <Collapsible
              open={isOpen}
              onOpenChange={setIsOpen}
              className="w-full space-y-2"
            >
              <div className="flex items-center justify-between space-x-4 px-4">
                <h4 className="text-sm font-semibold">Hoy</h4>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="w-9 p-0">
                    <ChevronsUpDown className="h-4 w-4" />
                    <div className="sr-only">Toggle</div>
                  </Button>
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent className="space-y-2">
                {data.map((snapshot) => (
                  <Button
                    variant="outline"
                    className={`w-full ${
                      selectedSnapshotId === snapshot.id ? "bg-gray-300" : ""
                    }`}
                    key={snapshot.id}
                    onClick={() => setSelectedSnapshotId(snapshot.id)}
                  >
                    {DateTime.fromJSDate(snapshot.createdAt).toFormat(
                      "HH:mm dd/MM/yyyy"
                    )}
                  </Button>
                ))}
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
          <CardFooter className="transition-opacity duration-200 delay-150 justify-around flex flex-row">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarFallback className="bg-blue-500">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <CardTitle>{user.email}</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="w-9 p-0"
              onClick={handleSignOut}
            >
              <LogOut />
            </Button>
          </CardFooter>
        </>
      )}
    </Card>
  );
}
