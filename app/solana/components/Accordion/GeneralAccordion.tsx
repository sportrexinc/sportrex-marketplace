import React, { ReactNode } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
interface GA {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  children: ReactNode;
}
const General = ({ open, setOpen, title, children }: GA) => {
  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="flex w-full  flex-col rounded-2xl ">
      <div
        className="header w-full bg-blue-dropHeader flex justify-between p-4 items-center cursor-pointer rounded-t-xl"
        onClick={toggleOpen}
      >
        <p className="text-white semibold text-lg regular">{title}</p>
        <div className="flex items-center justify-center">
          {open ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </div>
      </div>
      {open && (
        <div className="bg-blue-card p-2 xl:p-4 rounded-b-xl">{children}</div>
      )}
    </div>
  );
};

export default General;
