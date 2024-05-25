"use client";

import { useCallback, Dispatch, SetStateAction } from "react";
import type { FileWithPath } from "@uploadthing/react";
import { useDropzone } from "@uploadthing/react/hooks";
import { generateClientDropzoneAccept } from "uploadthing/client";

import { Button } from "@/components/ui/button";
import { convertFileToUrl } from "@/lib/utils";

import state from "@/store";

type FileUploaderProps = {
  onFieldChange: (url: string) => void;
  imageUrl: string;
  setFiles: Dispatch<SetStateAction<File[]>>;
};

export function FileUploader({
  imageUrl,
  onFieldChange,
  setFiles,
}: FileUploaderProps) {
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFiles(acceptedFiles);

    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      const fileUrl = URL.createObjectURL(selectedFile);
      state.fullDecal = fileUrl;
      setFiles(acceptedFiles);

      onFieldChange("");
    } else {
      state.fullDecal = "";

      onFieldChange("");
    }

    onFieldChange(convertFileToUrl(acceptedFiles[0]));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*" ? generateClientDropzoneAccept(["image/*"]) : undefined,
  });

  return (
    <div
      {...getRootProps()}
      className="flex-center bg-dark-3 h-64 flex p-3 cursor-pointer flex-col overflow-hidden rounded-sm bg-grey-50 dark:bg-[#191919]"
    >
      <input {...getInputProps()} className="cursor-pointer" />

      {imageUrl ? (
        <div className="flex h-full w-full flex-1 justify-center">
          <img
            src={imageUrl}
            alt="image"
            width={250}
            height={250}
            className="w-full object-cover object-center rounded-sm"
          />
        </div>
      ) : (
        <div className="flex-center flex-col py-5 text-grey-500">
          <img
            src="/assets/icons/upload.svg"
            width={77}
            height={77}
            alt="file upload"
          />
          <h3 className="mb-2 mt-2">Drag photo here</h3>
          <p className="p-medium-12 mb-4">SVG, PNG, JPG : MAX 10MB</p>
          <Button
            type="button"
            className="rounded-full dark:bg-[#252525] bg-gray-400 hover:bg-gray-500 dark:hover:bg-[#393939] text-white"
          >
            Select from computer
          </Button>
        </div>
      )}
    </div>
  );
}
