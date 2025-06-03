import React from "react";

interface TextAreaInput {
  placeholder: string;
  label: string;
  name: string;
  value: string;
  subLabel?: string;
  setValue: (e: any) => void | undefined;
  errMessage?: string | React.ReactNode
}

const TextAreaInput = ({ placeholder, label, name, value, setValue, errMessage,subLabel }: TextAreaInput) => {
  return (
    <div className="flex flex-col space-y-2 md:space-y-4">
      <div className="flex flex-col">

      <label className="text-white semibold text-sm md:text-lg regular">
        {label}
      </label>
      <label className="text-white semibold text-xs  regular ">
        {subLabel}
      </label>
      </div>
      <textarea
        className="w-full h-auto min-h-16 xl:h-[156px] px-4 py-2 bg-blue-card  rounded-lg placeholder:text-grey-800 placeholder:text-sm outline-none"
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      { errMessage }
    </div>
  );
};

export default TextAreaInput;
