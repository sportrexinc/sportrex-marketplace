import * as React from "react";

import { FaTimesCircle } from "react-icons/fa";
import demo from "@/public/assets/demo-stake.svg";
import ActionBtn from "../Button/ActionBtn";
import ReUseModal from "./ReUseModal";

export interface ModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function StakeNftModal({ open, setOpen }: ModalProps) {
  // const [value, setValue] = React.useState(false);

  return (
    <div>
      <ReUseModal open={open} setOpen={setOpen}>
        <div className="w-full flex flex-col rounded-[16px] p-8 z-20 ">
          <div className=" flex justify-end items-center">
            <div className="w-full flex justify-between lg:w-8/12 items-center ">
              <p className="grad-text semibold text-2xl text-white">
                Stake NFT
              </p>
              <FaTimesCircle
                onClick={() => setOpen(!open)}
                className="text-white text-2xl cursor-pointer"
              />
            </div>
          </div>
          <div className="mt-8 flex space-x-8">
            <div className="w-4/12 ">
              <img src={demo} alt="demo" className="w-full h-auto" />
            </div>
            <div className="w-7/12 flex flex-col justify-center">
              <p className="text-white semibold text-xl ">
                Grafitti Monstr #34454
              </p>
              <div className="flex items-center space-x-2 mt-5 ">
                <p className="text-yellow text-lg regular regular">
                  0.0532 SPT
                </p>
                <p className="text-white text-md regular ">$15,000</p>
              </div>
            </div>
          </div>
          <div className="flex w-full items-center justify-between mt-6">
            <p className="text-xl text-white semibold">Staking Period</p>
            <p className="text-xl text-yellow semibold">6 Months</p>
          </div>
          <div className="flex w-full items-center justify-between mt-6">
            <p className="text-xl text-white semibold">Staking Earning</p>
            <p className="text-xl text-yellow semibold">0.03555 SPT</p>
          </div>
          <div className="flex justify-center mt-6">
            <p className="text-md text-grey-800 text-center semibold">
              1 SPT = $1000
            </p>
          </div>
          <div className="w-10/12 mx-auto mt-6">
            <ActionBtn action={() => setOpen(!open)} name="Stake now" />
          </div>
        </div>
      </ReUseModal>
    </div>
  );
}
