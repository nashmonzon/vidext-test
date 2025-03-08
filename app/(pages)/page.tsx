import { redirect } from "next/navigation";
import { type Metadata } from "next/types";

export const metadata = {
  alternates: { canonical: "./" },
} satisfies Metadata;

export default async function Home() {
  redirect("/login");
}
