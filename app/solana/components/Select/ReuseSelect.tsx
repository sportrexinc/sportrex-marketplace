import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
const Select = ({ title, selected, setSelected, options, className }: { title: string; className?: string; selected: {name:string,value:string}; setSelected: any; options:{}[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  const selectOption = (option: any) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col w-full relative">
      <div
        className={`${className??"bg-blue-dropHeader"}  flex px-4 text-white justify-between py-3 rounded-md`}
        onClick={toggleOpen}
      >
        <p className="regular">{selected?.name ? selected?.name : title}</p>
        <div className="flex items-center justify-center">
          {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </div>
      </div>
      {isOpen && (
        <div className="bg-blue-header text-white rounded-md shadow-md regular text-md w-full top-12 absolute left-0 z-50">
          <div className="flex flex-col p-4">
            {options.map((option:any) => (
              <div
                key={option?.value}
                className="flex items-center justify-between px-4 py-2 text-md regular hover:bg-blue-btn"
                onClick={() => selectOption(option)}
              >
                <p className="text-sm regular">{option?.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Select;
