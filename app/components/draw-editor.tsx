"use client";

import { Button } from "@/components/ui/button";

import { PanelLeft } from "lucide-react";
import { useState } from "react";

import "tldraw/tldraw.css";
import HistoryDrawer from "./history-drawer";
import { Snapshot, User } from "@prisma/client";
import { TldrqwEditor } from "./tldrqw_editor";
import { CardTitle } from "@/components/ui/card";
import { DateTime } from "luxon";

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
  const date = snapshots.filter((snapshot) => snapshot.id === snapshotId);

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
          <div className="flex flex-row gap-2 items-center mt-6 ml-2">
            <Button
              onClick={() => setIsExpanded(!isExpanded)}
              variant="outline"
            >
              <PanelLeft />
            </Button>
            <CardTitle>
              {date.map((snapshot) => (
                <div key={snapshot.id}>
                  {DateTime.fromJSDate(snapshot.createdAt).toFormat(
                    "dd/MM HH:mm "
                  )}
                </div>
              ))}
            </CardTitle>
          </div>
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
