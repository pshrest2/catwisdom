"use client";

import { AuthButtons } from "@/app/custom/auth-buttons";
import { ModeToggle } from "@/app/custom/mode-toggle";

export function Header() {
  return (
    <div className="flex flex-row-reverse sm:w-full">
      <div className="flex gap-3">
        <AuthButtons />
        <ModeToggle />
      </div>
    </div>
  );
}
