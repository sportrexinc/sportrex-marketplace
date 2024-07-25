import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
const UnlockSelect = ({ name } : {name:string}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<any>({});
  const [options, setOptions] = useState([
    {
      value: "option1",
      label: "Option 1",
    },
    {
      value: "option2",
      label: "Option 2",
    },
    {
      value: "option3",
      label: "Option 3",
    },
  ]);
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  const selectOption = (option: { value: string; label: string; }) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col w-full relative">
      <div
        className="bg-blue-dropHeader flex px-2 text-white justify-between py-1 rounded-md "
        onClick={toggleOpen}
      >
        <p>{selected ? selected.label : name}</p>
        <div className="flex items-center justify-center">
          {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </div>
      </div>
      {isOpen && (
        <div className="bg-blue-header text-white rounded-md shadow-md regular text-[10px] absolute top-8 w-full left-0 z-50">
          <div className="flex flex-col p-4">
            {options.map((option) => (
              <div
                key={option.value}
                className="flex items-center justify-between px-4 py-2 text-[10px] regular hover:bg-blue-btn"
                onClick={() => selectOption(option)}
              >
                <p className="text-sm regular">{option.label}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UnlockSelect;
