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
  wisdom: string;
  avatarSrc?: string;
}

export function WisdomCard({
  wisdomId,
  totalLikes,
  avatarSrc = "/images/wise-cat.png",
  wisdom,
}: Props) {
  const [likes, setLikes] = useState(totalLikes);
  const [liked, setLiked] = useState(false);
  const [shouldShowToggle, setShouldShowToggle] = useState(false);

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
    if (wisdom.length > 100) {
      setShouldShowToggle(true);
    }
  }, [wisdomId]);

  return (
    <Card className="w-full">
      {avatarSrc && (
        <CardHeader className="flex items-center">
          <Avatar>
            <AvatarImage src={avatarSrc} className="object-cover" />
            <AvatarFallback>CW</AvatarFallback>
          </Avatar>
          <span className="font-bold text-sm mx-2">bellyrubs</span>
        </CardHeader>
      )}
      <img src={avatarSrc} />
      <CardContent className="text-sm">
        <span className={`${shouldShowToggle && "line-clamp-3"}`}>
          {wisdom}
        </span>
        {shouldShowToggle && (
          <button
            onClick={() => setShouldShowToggle(false)}
            className="cursor-pointer text-foreground opacity-60"
          >
            more
          </button>
        )}
      </CardContent>
      <CardFooter>
        <LikeButton likes={likes} value={liked} onClick={handleLikeWisdom} />
      </CardFooter>
    </Card>
  );
}
