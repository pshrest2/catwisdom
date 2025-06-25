"use client";

import { useState, useCallback } from "react";
import { Upload, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadProps,
  FileUploadTrigger,
} from "@/components/ui/file-upload";

interface Props {
  onSubmit: Function;
}
export function DropzoneUpload({ onSubmit }: Props) {
  const [files, setFiles] = useState<File[]>([]);

  const onUpload: NonNullable<FileUploadProps["onUpload"]> = useCallback(
    async (files, { onSuccess, onError }) => {
      try {
        // Process each file individually
        const uploadPromises = files.map(async (file) => {
          try {
            // Simulate server processing delay
            await onSubmit(file);
            onSuccess(file);
          } catch (error) {
            onError(
              file,
              error instanceof Error ? error : new Error("Upload failed")
            );
          }
        });

        // Wait for all uploads to complete
        await Promise.all(uploadPromises);
      } catch (error) {
        // This handles any error that might occur outside the individual upload processes
        console.error("Unexpected error during upload:", error);
      }
    },
    []
  );

  const onFileReject = useCallback((file: File, message: string) => {
    console.log(message);
    console.log(
      `"${file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name}" has been rejected`
    );
  }, []);

  return (
    <FileUpload
      maxFiles={1}
      maxSize={5 * 1024 * 1024}
      className="w-full max-w-md"
      value={files}
      onUpload={onUpload}
      onValueChange={setFiles}
      onFileReject={onFileReject}
    >
      <FileUploadDropzone>
        <div className="flex flex-col items-center gap-1 text-center">
          <div className="flex items-center justify-center rounded-full border p-2.5">
            <Upload className="size-6 text-muted-foreground" />
          </div>
          <p className="font-medium text-sm">Drag & drop image here</p>
          <p className="text-muted-foreground text-xs">
            Or click to browse (max 2 files, up to 5MB each)
          </p>
        </div>
        <FileUploadTrigger asChild>
          <Button variant="outline" size="sm" className="mt-2 w-fit">
            Browse files
          </Button>
        </FileUploadTrigger>
      </FileUploadDropzone>
      <FileUploadList>
        {files.map((file, index) => (
          <FileUploadItem key={index} value={file}>
            <FileUploadItemPreview />
            <FileUploadItemMetadata />
            <FileUploadItemDelete asChild>
              <Button variant="ghost" size="icon" className="size-7">
                <X />
              </Button>
            </FileUploadItemDelete>
          </FileUploadItem>
        ))}
      </FileUploadList>
    </FileUpload>
  );
}
