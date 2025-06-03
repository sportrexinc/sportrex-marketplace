import React, { useState } from "react";
interface FileInput {
  onChange?: (e: any) => void;
  name?: string;
  label?: string;
  errMessage?: React.ReactNode | string;
}
const FileInput = ({ onChange, name, label, errMessage }: FileInput) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileType, setFileType] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Enforce 30 MB limit
    if (file.size > 30 * 1024 * 1024) {
      alert("File exceeds 30 MB limit.");
      return;
    }
    setFileType(file.type);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      if (onChange) {
        onChange(e);
      }
    }
  };
  const clearPreview = () => {
    URL.revokeObjectURL(preview as any);
    setPreview(null);
    setFileType("");
  };
  return (
    <div className="flex flex-col space-y-4">
      <label className="text-white semibold text-sm md:text-lg regular">
        {label}
      </label>
      <div className="bg-blue-card h-screen lg:h-[80vh] w-full flex justify-center items-center rounded-[10px] relative">
        <input
          type="file"
          className="absolute left-0 opacity-0 cursor-pointer top-0 w-full h-full"
          accept="image/*,video/*,audio/*"
          name={name}
          onChange={handleFileChange}
        />
        {preview ? (
          // Video preview
          fileType.startsWith("video/") ? (
            <video
              src={preview}
              autoPlay // :contentReference[oaicite:2]{index=2}
              muted
              controls
              loop
              className="object-cover h-full w-full rounded-[10px] cursor-pointer"
              onClick={clearPreview}
            />
          ) : fileType.startsWith("audio/") ? (
            // Audio preview
            <audio
              src={preview}
              autoPlay
              controls
              className="h-auto w-full"
              onClick={clearPreview}
            />
          ) : (
            // Image preview
            <img
              src={preview}
              alt="Selected file preview"
              className="object-cover h-full w-full rounded-[10px] cursor-pointer"
              onClick={clearPreview}
            />
          )
        ) : (
          // Placeholder when no file is selected
          <div className="flex flex-col items-center">
            <p className="text-white text-sm md:text-md text-center cursor-pointer">
              Click to upload file(s)
            </p>
            <p className="text-grey-800 text-sm md:text-md text-center">
              JPG, PNG, GIF, WEBP, AVIF, MP4, MP3. Max 30 MB.
            </p>
          </div>
        )}
      </div>
      {errMessage}
    </div>
  );
};

export default FileInput;
