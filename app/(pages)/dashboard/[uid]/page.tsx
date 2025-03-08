import { DrawEditor } from "@/app/components/draw-editor";

type PageProps<T> = {
  params: T;
};

export default async function Dashboard({
  params,
}: PageProps<{ uid: string }>) {
  const uid = params.uid;
  console.log(uid);

  return <DrawEditor />;
}
