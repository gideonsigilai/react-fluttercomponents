import React, { useRef, useState } from "react";
import { cn } from "../utils";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface XFile {
  name: string;
  path: string;
  size: number;
  type: string;
  lastModified: number;
  previewUrl?: string;
  rawFile: File;
}

interface ImagePickerProps {
  onImagePicked: (file: XFile) => void;
  onMultipleImagesPicked?: (files: XFile[]) => void;
  accept?: string;
  maxFiles?: number;
  source?: "gallery" | "camera";
  imageQuality?: number;
  maxWidth?: number;
  maxHeight?: number;
  className?: string;
  children?: React.ReactNode;
}

function toXFile(file: File): XFile {
  return {
    name: file.name,
    path: file.name,
    size: file.size,
    type: file.type,
    lastModified: file.lastModified,
    previewUrl: URL.createObjectURL(file),
    rawFile: file,
  };
}

// ─── ImagePicker ──────────────────────────────────────────────────────────────
export function ImagePicker({
  onImagePicked,
  onMultipleImagesPicked,
  accept = "image/*",
  maxFiles = 1,
  className,
  children,
}: ImagePickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const xFiles = files.map(toXFile);
    setPreview(xFiles[0].previewUrl || null);

    if (maxFiles === 1) {
      onImagePicked(xFiles[0]);
    } else {
      onMultipleImagesPicked?.(xFiles);
    }
  };

  return (
    <div
      className={cn("cursor-pointer", className)}
      onClick={() => inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={maxFiles > 1}
        onChange={handleChange}
        className="hidden"
      />
      {children || (
        <div className="flex flex-col items-center gap-3 p-8 border-2 border-dashed border-border rounded-xl hover:border-primary/60 hover:bg-primary/5 transition-all">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          {preview ? (
            <img src={preview} alt="Preview" className="w-24 h-24 rounded-lg object-cover border border-border" />
          ) : (
            <>
              <p className="text-sm font-semibold text-foreground">Tap to pick image</p>
              <p className="text-xs text-muted-foreground">PNG, JPEG, WEBP supported</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

// ─── FilePicker ───────────────────────────────────────────────────────────────
interface FilePickerProps {
  onFilePicked: (file: XFile) => void;
  onMultipleFilesPicked?: (files: XFile[]) => void;
  allowedExtensions?: string[];
  type?: "any" | "image" | "video" | "audio" | "pdf" | "custom";
  allowMultiple?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const TYPE_MAP: Record<string, string> = {
  any: "*/*",
  image: "image/*",
  video: "video/*",
  audio: "audio/*",
  pdf: "application/pdf",
};

export function FilePicker({
  onFilePicked,
  onMultipleFilesPicked,
  allowedExtensions,
  type = "any",
  allowMultiple = false,
  className,
  children,
}: FilePickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const accept = allowedExtensions
    ? allowedExtensions.map((e) => `.${e}`).join(",")
    : TYPE_MAP[type] || "*/*";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const xFiles = files.map(toXFile);
    if (allowMultiple) {
      onMultipleFilesPicked?.(xFiles);
    } else {
      onFilePicked(xFiles[0]);
    }
  };

  return (
    <div className={cn("cursor-pointer", className)} onClick={() => inputRef.current?.click()}>
      <input ref={inputRef} type="file" accept={accept} multiple={allowMultiple} onChange={handleChange} className="hidden" />
      {children || (
        <div className="flex items-center gap-2 px-4 py-2.5 border border-border rounded-xl bg-card hover:bg-accent transition text-sm font-semibold">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
          Pick File{allowMultiple ? "s" : ""}
        </div>
      )}
    </div>
  );
}
