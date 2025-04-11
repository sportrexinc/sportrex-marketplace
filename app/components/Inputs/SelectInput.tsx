import React from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Select, SelectProps } from "antd";
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
  optionRender?: SelectProps["optionRender"];
}

const SelectInput = ({
  options,
  name,
  placeholder,
  label,
  handleChange,
  value,
  errMessage,
  optionRender,
}: SelectInput) => {
  return (
    <div className="flex flex-col">
      <label className="text-white semibold text-sm md:text-lg regular rounded-[10px]">
        {label}
      </label>
      <Select
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        optionRender={optionRender}
        className="h-[48px] placeholder:text-grey-800"
        dropdownStyle={{
          backgroundColor: "#0E1648",
          color: "white",
        }}
        rootClassName="placeholder:text-grey-800 text-white regular"
        variant="borderless"
        // bordered={false}
        // className="w-full bg-blue-card  rounded-lg placeholder:text-grey-800 border-r-[16px] border-r-[transparent] outline-none "
      >
        {options.map((option) => (
          <Select.Option key={option.value} value={option.value}>
            {option.label}
          </Select.Option>
        ))}
      </Select>
      {errMessage}
    </div>
  );
};

export default SelectInput;
