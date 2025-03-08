"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToggleContent } from "../hooks/useToggleContent";

export default function HistoryDrawer({ isExpanded }: { isExpanded: boolean }) {
  const showContent = useToggleContent(isExpanded);
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
            lista
          </CardContent>
          <CardFooter className="transition-opacity duration-200 delay-150">
            <CardTitle>Nachoo</CardTitle>
          </CardFooter>
        </>
      )}
    </Card>
  );
}
