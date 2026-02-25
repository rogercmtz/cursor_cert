"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export default function DashboardLink() {
  const { data: session, status } = useSession();

  if (status === "loading" || !session) {
    return null;
  }

  return (
    <Link
      href="/dashboards"
      className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
    >
      API Keys Dashboard
    </Link>
  );
}
