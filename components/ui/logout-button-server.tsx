import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";

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
}

export function LogoutButtonServer({
  text = "Logout",
  variant = "default",
  size = "default",
}: LogoutButtonProps) {
  return (
    <form
      action={async () => {
        "use server";

        await signOut();
      }}
    >
      <Button type="submit" variant={variant} size={size}>
        {text}
      </Button>
    </form>
  );
}
