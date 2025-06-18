import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

interface Props {
  likes: number;
  onClick: (liked: boolean) => void;
}

export function LikeButton({ likes, onClick, ...props }: Props) {
  const [liked, setLiked] = useState(false);
  const [animating, setAnimating] = useState(false);

  const handleClick = () => {
    const newLiked = !liked;
    onClick(newLiked);
    setLiked(newLiked);
    setAnimating(true);
  };

  useEffect(() => {
    if (animating) {
      const timeout = setTimeout(() => setAnimating(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [animating]);

  return (
    <button
      aria-label={liked ? "Unlike" : "Like"}
      onClick={handleClick}
      className={
        `bg-transparent border-none p-0 cursor-pointer outline-none inline-flex items-center justify-center ` +
        `transition-transform duration-200 ${animating ? "scale-110" : "scale-100"}`
      }
      {...props}
    >
      <Heart
        size={28}
        className={
          `transition-colors duration-200 drop-shadow-sm ` +
          (liked ? "fill-red-500 text-red-500" : "fill-none text-foreground")
        }
      />
      <span className="text-sm px-1 font-bold">{likes}</span>
    </button>
  );
}
