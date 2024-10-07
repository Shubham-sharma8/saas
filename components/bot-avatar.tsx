import { Avatar, AvatarImage } from "@/components/ui/avatar";

export const BotAvatar = () => {
  return (
    <Avatar className="h-8 w-8">
      <AvatarImage className="p-1 block dark:hidden" src="/logo.png" sizes="(max-width: 1024px) 100vw, (max-width: 1200px) 50vw, 33vw"/>
      <AvatarImage className="p-1 hidden dark:block" src="/logo_white.png" sizes="(max-width: 1024px) 100vw, (max-width: 1200px) 50vw, 33vw"/>
    </Avatar>
  );
};
