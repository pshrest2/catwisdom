"use client";

import { useEffect, useState } from "react";
import { likeWisdom, unlikeWisdom } from "@/app/lib/actions";
import { LikeButton } from "@/app/custom/like-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { getLikedIds, updateLikedIds } from "@/app/lib/utils";

interface Props {
  wisdomId: number;
  totalLikes: number;
  children: React.ReactNode;
  avatarSrc?: string;
}

export function WisdomCard({
  wisdomId,
  totalLikes,
  avatarSrc,
  children,
}: Props) {
  const [likes, setLikes] = useState(totalLikes);
  const [liked, setLiked] = useState(false);

  const handleLikeWisdom = async (liked: boolean) => {
    const newLikes = liked ? 1 : -1;
    try {
      // perform optimistic updates
      setLiked(liked);
      setLikes((prev) => Math.max(prev + newLikes, 0));
      if (liked) await likeWisdom(wisdomId);
      else await unlikeWisdom(wisdomId);
      updateLikedIds(wisdomId, liked);
    } catch (error) {
      // revert optimistic updates
      setLiked(!liked);
      setLikes((prev) => Math.max(prev - newLikes, 0));

      // TODO: show error
      console.log(`Error with liking API: ${error}`);
    }
  };

  useEffect(() => {
    const likedIds = getLikedIds();
    setLiked(likedIds.includes(wisdomId));
  }, [wisdomId]);

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
      <CardFooter>
        <LikeButton likes={likes} value={liked} onClick={handleLikeWisdom} />
      </CardFooter>
    </Card>
  );
}
