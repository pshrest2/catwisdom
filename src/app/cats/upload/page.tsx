"use client";

import { useState } from "react";
import type { PutBlobResult } from "@vercel/blob";
import { Header } from "@/app/custom/header";

export default function CatUploadPage() {
  const [blob, setBlob] = useState<PutBlobResult | null>(null);

  const handleSubmit = async (file: File) => {
    const response = await fetch(`/api/cats/upload?filename=${file.name}`, {
      method: "POST",
      body: file,
    });

    const newBlob = (await response.json()) as PutBlobResult;
    setBlob(newBlob);
  };
  return (
    <div className="flex flex-col items-center mb-4 gap-4">
      <Header />
      <div className="text-4xl xs:text-5xl sm:text-6xl font-bold">
        Upload a cat 🐈
      </div>
      <span className="font-bold">Coming Soon...</span>
    </div>
  );
}
