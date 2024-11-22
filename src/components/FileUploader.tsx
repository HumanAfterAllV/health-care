"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";

import { useDropzone } from "react-dropzone";

import { convertFileToUrl } from "@/lib/utils";

interface FileUploaderProps {
  files: File[] ;
  onChange: (files: File[]) => void;
}

export default function FileUploader({ files, onChange }: FileUploaderProps): JSX.Element {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
        onChange(acceptedFiles);
    },
    [onChange]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  useEffect(() => {
    if (files && files.length > 0) {
        const url = URL.createObjectURL(files[0]);
        setPreviewUrl(url);

        return () => {
            URL.revokeObjectURL(url);
        };
    } else {
        setPreviewUrl(null);
    }
  }, [files]);

  return (
    <div {...getRootProps()} className="file-upload cursor-pointer border p-4 rounded-lg text-center">
        <input {...getInputProps()} />

        {previewUrl ? (
            <Image
                src={convertFileToUrl(files[0])}
                width={400}
                height={400}
                alt="uploaded preview"
                className="max-h-[400px] overflow-hidden object-cover"
            />
        ) : (
        <>
            <Image src="/assets/icons/upload.svg" width={40} height={40} alt="upload icon" />
            <div className="file-upload_label mt-2">
                <p className="text-14-regular">
                <span className="text-green-500">Click to upload</span> or drag and drop files here
                </p>
                <p>SVG, PNG, JPG or GIF (max 800x400)</p>
            </div>
        </>
        )}
    </div>
  );
}
