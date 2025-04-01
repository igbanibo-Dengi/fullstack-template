import { auth } from "@/auth";
import Header from "@/components/Header";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

const layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  if (!session) redirect("/sign-in");

  return (
    <main className="h-full w-full">
      <Header session={session} />
      {children}
    </main>
  );
};

export default layout;
