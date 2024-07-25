import React from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
interface SelectInput {
  options: {
    value: string;
    label: string;
  }[];
  name: string;
  placeholder: string;
  label: string;
  value?: string;
  handleChange?: (e: any) => void;
  errMessage?: React.ReactNode | string;
}

const SelectInput = ({ 
  options, 
  name, 
  placeholder, 
  label,
  handleChange,
  value,
  errMessage 
}: SelectInput) => {
  return (
    <div>
      <div className="flex flex-col space-y-4">
        <label className="text-white semibold text-sm md:text-lg regular rounded-[10px]">
          {label}
        </label>
        <select
        value={value}
        onChange={handleChange}
          className="w-full py-2 px-4 bg-blue-card  rounded-lg placeholder:text-grey-800 border-r-[16px] border-r-[transparent] outline-none "
          name={name}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        { errMessage }
      </div>
    </div>
  );
};

export default SelectInput;
