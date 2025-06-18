"use client";

import { LikeButton } from "@/app/custom/like-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useState } from "react";

interface Props {
  children: React.ReactNode;
  avatarSrc?: string;
}

export function WisdomCard({ avatarSrc, children }: Props) {
  const [likes, setLikes] = useState(0);

  const likeWisdom = (liked: boolean) => {
    setLikes((prev) => prev + (liked ? 1 : -1));
  };

  return (
    <Card className="w-full">
      {avatarSrc && (
        <CardHeader className="flex items-center">
          <Avatar className="relative size-32 mx-auto">
            <AvatarImage src="/images/wise-cat.png" className="object-cover" />
            <AvatarFallback>CW</AvatarFallback>
          </Avatar>
        </CardHeader>
      )}
      <CardContent className="text-center">{children}</CardContent>
    </Card>
  );
}
