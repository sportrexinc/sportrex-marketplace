import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaBell } from "react-icons/fa";
const Notification = () => {
  const [open, setOpen] = useState(false);
  const history = useRouter();

  return (
    <div className="flex flex-col relative w-fit px-2">
      <div
        className="flex items-center space-x-3 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <FaBell className="text-blue-btn text-2xl" />
      </div>
      {open && (
        <div className="absolute  top-[64px] right-0 w-[400px] h-[300px] flow-hide bg-blue-header p-4 flex flex-col space-y-3 ">
          <h4 className="bold text-white text-md">Notifications</h4>
          <div
            className="flex justify-between cursor-pointer"
            onClick={() => setOpen(false)}
          >
            <div className="w-5/12">
              <p className="regular text-white text-sm leading-6">
                You just got a new bid on Bored Ape Collection
              </p>
            </div>
            <div className="flex justify-end items-end">
              <p className="text-grey-800 regular text-[10px]">Today</p>
            </div>
          </div>
          <div
            className="flex justify-between cursor-pointer"
            onClick={() => setOpen(false)}
          >
            <div className="w-5/12">
              <p className="regular text-white text-sm leading-6">
                You just got a new bid on Bored Ape Collection
              </p>
            </div>
            <div className="flex justify-end items-end">
              <p className="text-grey-800 regular text-[10px]">Today</p>
            </div>
          </div>
          <div
            className="flex justify-between cursor-pointer"
            onClick={() => setOpen(false)}
          >
            <div className="w-5/12">
              <p className="regular text-white text-sm leading-6">
                You just got a new bid on Bored Ape Collection
              </p>
            </div>
            <div className="flex justify-end items-end">
              <p className="text-grey-800 regular text-[10px]">Today</p>
            </div>
          </div>
          <div
            className="flex justify-between cursor-pointer"
            onClick={() => setOpen(false)}
          >
            <div className="w-5/12">
              <p className="regular text-white text-sm leading-6">
                You just got a new bid on Bored Ape Collection
              </p>
            </div>
            <div className="flex justify-end items-end">
              <p className="text-grey-800 regular text-[10px]">Today</p>
            </div>
          </div>
          <div
            className="flex justify-between cursor-pointer"
            onClick={() => setOpen(false)}
          >
            <div className="w-5/12">
              <p className="regular text-white text-sm leading-6">
                You just got a new bid on Bored Ape Collection
              </p>
            </div>
            <div className="flex justify-end items-end">
              <p className="text-grey-800 regular text-[10px]">Today</p>
            </div>
          </div>
          <div
            className="flex justify-between cursor-pointer"
            onClick={() => setOpen(false)}
          >
            <div className="w-5/12">
              <p className="regular text-white text-sm leading-6">
                You just got a new bid on Bored Ape Collection
              </p>
            </div>
            <div className="flex justify-end items-end">
              <p className="text-grey-800 regular text-[10px]">Today</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
