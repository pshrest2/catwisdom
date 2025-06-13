import * as React from "react";

type Props = {
  wisdom: string;
};

export function EmailTemplate({ wisdom }: Props) {
  return (
    <div className="max-w-md mx-auto p-6 text-left">
      <h1 className="text-2xl font-semibold mb-4">Wisdom of the day! 🐱✨</h1>
      <p className="p-4 mb-4">{wisdom}</p>
      <p>Have a purrfect day 😽</p>
    </div>
  );
}
