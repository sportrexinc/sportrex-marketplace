import React, { SetStateAction } from "react";
interface TextInput {
  placeholder: string;
  label: string;
  name: string;
  value?: string;
  setValue: (e: any) => void;
  errMessage?: string | React.ReactNode;
}
const TextInput = ({ placeholder, label, name, value, setValue, errMessage }: TextInput) => {
  return (
    <div className="flex flex-col space-y-4 w-full">
      <label className="text-white semibold text-sm md:text-lg regular">
        {label}
      </label>
      <input
        className="w-full py-2 px-4 bg-blue-card text-sm md:text-base regular  rounded-lg placeholder:text-grey-800 placeholder:text-sm h-[48px] flex items-center focus:bg-blue-card text-white"
        type="text"
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={(e:any) => setValue(e.target.value)}
        
      />
      { errMessage }
    </div>
  );
};

export default TextInput;
