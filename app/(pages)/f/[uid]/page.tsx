import { DrawEditor } from "@/app/components/draw-editor";
import { trpc } from "@/app/trpc/server";

type PageProps<T> = {
  params: T;
};

export default async function Dashboard({
  params,
}: PageProps<{ uid: string }>) {
  const { uid } = await Promise.resolve(params);
  const userId = uid;
  if (!userId) {
    console.error("User ID is undefined");
    return <div>Error: User ID is undefined</div>;
  }

  const snapshots = await trpc.user.getUserSnapshots({ userId: userId });
  const user = await trpc.user.getUser({ userId: userId });

  console.log(snapshots, "snapshots");
  if (!snapshots || !user) {
    return;
  }

  return <DrawEditor userId={userId} snapshots={snapshots} user={user} />;
}
