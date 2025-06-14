import { useInitials } from "@/hooks/use-initials";
import { type User } from "@/types";
import { RiVerifiedBadgeFill } from "react-icons/ri";

export function UserInfo({ user, showEmail = true }: { user: User; showEmail?: boolean }) {
  const getInitials = useInitials();

  // console.log(`Authenticated user: ${JSON.stringify(user)}`);

  return (
    <>
      {/*<Avatar className="relative overflow-hidden rounded-full object-contain">*/}

      {/*  /!*<AvatarImage src="https://api.dicebear.com/9.x/dylan/svg" alt={user.username} className="object-contain" />*!/*/}
      {/*  <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">*/}
      {/*    {getInitials(user.username)}*/}
      {/*  </AvatarFallback>*/}
      {/*</Avatar>*/}
      <div className="relative mt-3 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-transparent">
        <img
          className="absolute -top-2.5 left-2"
          src={`https://www.habbo.com.br/habbo-imaging/avatarimage?&figure=${user.figure}&direction=2&head_direction=2&headonly=1`}
          alt=""
        />
      </div>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="flex items-center gap-x-1 truncate font-medium">
          {user.username} <RiVerifiedBadgeFill size={16} />
        </span>
        {showEmail && <span className="text-muted-foreground truncate text-xs">{user.email}</span>}
      </div>
    </>
  );
}
