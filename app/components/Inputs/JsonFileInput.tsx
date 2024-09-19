import React, { useState } from "react";

interface JsonFileInput {
  onChange?: (e: any) => void;
  name?: string;
  label?: string;
  errMessage?: React.ReactNode | string;
}

const JsonFileInput = ({ onChange, name, label, errMessage }: JsonFileInput) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
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

  return (
    <div className="flex flex-col space-y-4">
      <label className="text-white semibold text-sm md:text-lg regular">
        {label}
      </label>
      <div className="bg-blue-card h-16 lg:h-[145px] w-full flex justify-center items-center rounded-[10px] relative">
        <input
          type="file"
          className="absolute left-0 opacity-0 cursor-pointer top-0 w-full h-full"
          accept=".csv,.json,.xls"
          name={name}
          onChange={handleFileChange}
        />
        {preview ? (
          <div className="text-white text-sm md:text-md regular text-center cursor-pointer">
            {`File uploaded: ${name}`}
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <p className="text-white text-sm md:text-md regular text-center cursor-pointer">
              Click to upload file(s)
            </p>
            <p className="text-grey-800 text-sm md:text-md regular text-center">
              CSV, JSON, XLS. Max 5mb.
            </p>
          </div>
        )}
      </div>
      {errMessage}
    </div>
  );
};

export default JsonFileInput;
