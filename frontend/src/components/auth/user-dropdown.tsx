import Link from "next/link";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { User, useUser } from "./user-prodiver";
import SignOut from "./sign-out";

function UserDropDown() {
  const user = useUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarFallback className="uppercase">
            {!!user ? user.username.slice(0, 2) : "U"}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      {!!user ? <AuthorizedComponent user={user} /> : <UnauthorizedComponent />}
    </DropdownMenu>
  );
}

function UnauthorizedComponent() {
  return (
    <DropdownMenuContent side="bottom">
      <DropdownMenuLabel className="text-xl">User</DropdownMenuLabel>
      <DropdownMenuItem asChild>
        <Link href={"/sign-in"}>Sign in</Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link href={"/sign-up"}>Sign up</Link>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}

function AuthorizedComponent({ user }: { user: User }) {
  return (
    <DropdownMenuContent side="bottom" className="space-y-2">
      <DropdownMenuLabel className="text-xl">{user.username}</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild>
        <SignOut>Sign out</SignOut>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}

export default UserDropDown;
