import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
const FaqDropdown = ({ text, title }: { text: string; title: string }) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <div className="flex flex-col  rounded-lg  ">
      <div className="bg-blue-dropHeader flex justify-between px-6 py-6 rounded-t-lg  text-white">
        <p className=" text-md  lg:text-xl semibold">{title}</p>
        {open ? (
          <IoIosArrowUp
            className="text-3xl cursor-pointer"
            onClick={handleOpen}
          />
        ) : (
          <IoIosArrowDown
            className="text-3xl cursor-pointer"
            onClick={handleOpen}
          />
        )}
      </div>
      {open && (
        <div className="bg-blue-dropBody flex flex-col   rounded-b-lg text-white   transition-all px-6 pt-6 pb-11 bg-blue-header">
          <p className="text-lg regular regular">{text}</p>
        </div>
      )}
    </div>
  );
};

export default FaqDropdown;
