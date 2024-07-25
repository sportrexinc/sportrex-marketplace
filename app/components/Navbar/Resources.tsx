import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
const Resources = () => {
  const [open, setOpen] = useState(false);
  const navigate = useRouter();
  const handleBlog = () => {
    navigate.push("/home");
    setOpen(false);
  };
  const handleFaq = () => {
    navigate.push("/faq");
    setOpen(false);
  };
  return (
    <div className="flex flex-col relative w-fit px-2">
      <div
        className="flex items-center space-x-3 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <p className="regular text-grey-800 text-lg regular">Resources</p>
        <IoMdArrowDropdown className="text-white" />
      </div>
      {open && (
        <div className="absolute w-full top-[64px] left-0 bg-blue-header p-2 flex flex-col space-y-2 ">
          <p
            className="regular text-lg regular hover:text-yellow text-grey-800"
            onClick={handleBlog}
          >
            Blog
          </p>
          <p
            className="regular text-lg regular text-grey-800 hover:text-yellow"
            onClick={handleFaq}
          >
            FAQ
          </p>
        </div>
      )}
    </div>
  );
};

export default Resources;
