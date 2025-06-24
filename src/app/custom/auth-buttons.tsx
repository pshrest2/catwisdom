import { LogOut, LogIn } from "lucide-react";
import { auth, signIn, signOut } from "@/app/lib/auth";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export async function AuthButtons() {
  const session = await auth();
  const avatarSrc = session?.user?.image ?? "https://www.gravatar.com/avatar";

  if (!session) {
    return (
      <form
        action={async () => {
          "use server";
          await signIn();
        }}
      >
        <Button type="submit" size="icon">
          <LogIn />
        </Button>
      </form>
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
        <DropdownMenuItem>
          <Link
            href="/api/auth/signout"
            className="w-full flex items-center gap-2"
          >
            <LogOut /> Logout
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
