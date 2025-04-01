import { auth } from "@/auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

const layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (session) redirect("/");

  return (
    <main className="h-screen grid-cols-2 overflow-hidden xl:grid">
      <div className="relative hidden h-full w-full xl:block">
        <Image
          src={
            "https://images.pexels.com/photos/30953532/pexels-photo-30953532/free-photo-of-black-and-white-alley-view-in-tokyo.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          }
          alt="background"
          fill
          className="object-cover"
        />
      </div>
      <div className="flex h-full w-full flex-col items-center justify-center bg-white">
        {children}
      </div>
    </main>
  );
};

export default layout;
