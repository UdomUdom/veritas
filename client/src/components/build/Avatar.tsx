import {
  Avatar as Avt,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

interface AvatarProps {
  user?: {
    email: string;
    avatar: string;
  };
  className?: string;
  size?: number;
}

export default function Avatar({ user, className }: AvatarProps) {
  return (
    <Avt className={className}>
      <AvatarImage src={user?.avatar || ""} alt="avatar" />
      <AvatarFallback className="select-none">
        {user?.email.split("@")[0].slice(0, 2)}
      </AvatarFallback>
    </Avt>
  );
}
