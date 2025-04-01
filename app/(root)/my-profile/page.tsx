import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import LogoutButton from "@/components/ui/logout-button";
import { LogoutButtonServer } from "@/components/ui/logout-button-server";
import React from "react";

const profilePage = () => {
  return (
    <>
      <form
        action={async () => {
          "use server";

          await signOut();
        }}
      >
        <Button>Logout</Button>
      </form>

      <LogoutButtonServer text="Logout" variant="ghost" />

      <LogoutButton text="Sign Out" variant="destructive" />
    </>
  );
};

export default profilePage;
