import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
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
    </>
  );
};

export default profilePage;
