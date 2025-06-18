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

interface Props {
  wisdomId: number;
  totalLikes: number;
  children: React.ReactNode;
  avatarSrc?: string;
}

const LOCAL_STORAGE_KEY = "catwisdom.liked.wisdoms";

function getLikedIds(): number[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function updateLikedIds(wisdomId: number, liked: boolean) {
  const current = getLikedIds();
  const updated = liked
    ? [...new Set([...current, wisdomId])]
    : current.filter((id) => id !== wisdomId);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
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
      setLikes((prev) => prev + newLikes);
      if (liked) await likeWisdom(wisdomId);
      else await unlikeWisdom(wisdomId);
      updateLikedIds(wisdomId, liked);
    } catch (error) {
      // revert optimistic updates
      setLiked(!liked);
      setLikes((prev) => prev - newLikes);

      // TODO: show error
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
