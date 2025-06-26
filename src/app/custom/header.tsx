"use client";

import { AuthButtons } from "@/app/custom/auth-buttons";
import { ModeToggle } from "@/app/custom/mode-toggle";
import Link from "next/link";

interface Props {
  backToHref?: string;
  backToLabel?: string;
}

export function Header({ backToHref, backToLabel }: Props) {
  return (
    <div className="flex flex-row-reverse w-full lg:w-1/2 justify-between items-center mb-8">
      <div className="flex gap-3">
        <AuthButtons />
        <ModeToggle />
      </div>
      {backToHref && backToLabel && (
        <div className="flex text-left w-full">
          <Link
            href={backToHref}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← {backToLabel}
          </Link>
        </div>
      )}
    </div>
  );
}
