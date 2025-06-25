"use client";

import { LogOut, LogIn, Cat } from "lucide-react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function AuthButtons() {
  const { data: session } = useSession();
  const avatarSrc = session?.user?.image ?? "https://www.gravatar.com/avatar";

  if (!session) {
    return (
      <Button
        onClick={() => signIn()}
        size="icon"
        className="flex items-center gap-2"
      >
        <LogIn />
      </Button>
    );
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="link" size="icon" title="Logout">
          <Avatar>
            <AvatarImage src={avatarSrc} />
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className="w-full flex items-center gap-2 cursor-pointer"
          asChild
        >
          <Link href="/cats/upload" className="w-full flex items-center gap-2">
            <Cat /> Contribute
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => signOut()}
          className="w-full flex items-center gap-2 cursor-pointer"
        >
          <LogOut /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
