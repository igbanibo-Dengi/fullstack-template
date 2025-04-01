"use client";

import { Button } from "@/components/ui/button";
import { logoutAction } from "@/lib/actions/auth";
import { useTransition } from "react";

interface LogoutButtonProps {
  text?: string;
  variant?:
  | "default"
  | "link"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | null;
  size?: "default" | "sm" | "lg" | "icon" | null;
  className?: string;
}

export default function LogoutButton({
  text = "Logout",
  variant = "default",
  size = "default",
  ...props
}: LogoutButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleLogout = async () => {
    startTransition(async () => {
      await logoutAction();
    });
  };

  return (
    <form action={handleLogout} className="w-full">
      <Button
        type="submit"
        variant={variant}
        size={size}
        disabled={isPending}
        className="w-full"
        {...props}
      >
        {isPending ? "Logging out..." : text}
      </Button>
    </form>
  );
}
