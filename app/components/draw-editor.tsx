"use client";

import { Button } from "@/components/ui/button";

import { Cog } from "lucide-react";
import { useState } from "react";

import "tldraw/tldraw.css";
import HistoryDrawer from "./history-drawer";
import { Snapshot, User } from "@prisma/client";
import { TldrqwEditor } from "./tldrqw_editor";

export function DrawEditor({
  userId,
  snapshots,
  user,
}: {
  userId: string;
  snapshots: Snapshot[];
  user: User;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [snapshotId, setSnapshotId] = useState<string | null>(null);

  return (
    <div className="w-full h-[100vh] flex">
      <HistoryDrawer
        isExpanded={isExpanded}
        data={snapshots}
        user={user}
        setSnapshotId={setSnapshotId}
      />
      <div className="flex-1 h-full w-full relative">
        <div className="absolute top-0 left-0 z-10">
          <Button onClick={() => setIsExpanded(!isExpanded)}>
            <Cog />
          </Button>
        </div>

        {snapshots
          .filter((snapshot) => snapshot.id === snapshotId)
          .map((snapshot) => (
            <TldrqwEditor
              key={snapshot.id}
              userId={userId}
              snapshots={snapshot}
            />
          ))}
      </div>
    </div>
  );
}
