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
import { ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { Snapshot, User } from "@prisma/client";

export default function HistoryDrawer({
  isExpanded,
  data,
  user,
}: {
  isExpanded: boolean;
  data: Snapshot[];
  user: User;
}) {
  const showContent = useToggleContent(isExpanded);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card
      className={`
        transition-all duration-300 ease-in-out
        ${isExpanded ? "w-[15%]" : "w-0"} 
        flex flex-col h-full
        ${isExpanded ? "opacity-100" : "opacity-0"}
        ${isExpanded ? "border" : "border-0"}
        overflow-hidden
      `}
    >
      {showContent && (
        <>
          <CardHeader className="transition-opacity duration-200 delay-75">
            <CardTitle>Test TLDraw</CardTitle>
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
                  <Button variant="ghost" className="w-full" key={snapshot.id}>
                    {new Date(snapshot.updatedAt).toISOString()}
                  </Button>
                ))}
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
          <CardFooter className="transition-opacity duration-200 delay-150 ">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarFallback className="bg-blue-500">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <CardTitle>{user.email}</CardTitle>
            </div>
          </CardFooter>
        </>
      )}
    </Card>
  );
}
