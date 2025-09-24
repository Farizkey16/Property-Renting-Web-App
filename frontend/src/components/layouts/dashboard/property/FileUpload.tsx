"use client";

import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  onChange: (file: File | null) => void;
  initialPreview?: string | null;
};

const FileUpload = ({ onChange, initialPreview }: Props) => {
  const [preview, setPreview] = useState<string>("");

  useEffect(() => {
    if (initialPreview) {
      setPreview(initialPreview);
    }
  }, [initialPreview]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      setPreview(URL.createObjectURL(file));
      onChange(file);
    } else {
      setPreview(initialPreview ?? "");
      onChange(null);
    }
  };

  return (
    <div>
      <Input type="file" accept="image/jpg, image/png" onChange={handleFileChange} />
      {preview && (
        <div className="mt-4">
          <Image
            src={preview}
            alt="Preview"
            width={120}
            height={120}
            className="rounded-lg border object-cover"
          />
        </div>
      )}
    </div>
  );
};

export default FileUpload;
