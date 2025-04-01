import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Session } from "next-auth";
import { getInitials } from "@/lib/utils";
import LogoutButton from "./ui/logout-button";

const Header = ({ session }: { session: Session }) => {
  return (
    <div className="flex justify-between gap-5 border-b px-6 py-4">
      <Link href="/" className="text-xl font-bold">
        Home
      </Link>

      <ul className="flex flex-row items-center gap-5">
        <li>
          <Link href="/about" className="text-xl font-semibold">
            About
          </Link>
        </li>
        <li>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 rounded-md border px-1 py-1">
              <Avatar className="rounded-md">
                <AvatarFallback className="rounded-md bg-blue-500 text-sm font-semibold text-white">
                  {getInitials(session.user?.name || "AI")}
                </AvatarFallback>
              </Avatar>
              <p className="pr-2 text-lg font-semibold whitespace-nowrap">
                {session.user?.name}
              </p>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link href='/my-profile'>
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogoutButton
                  className="w-full"
                  variant='ghost'
                />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </li>
      </ul>
    </div>
  );
};

export default Header;
