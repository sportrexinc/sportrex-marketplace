import React from "react";
import wars from "@/public/assets/wars.png";
import Image from "next/image";
const OverviewCard = () => {
  return (
    <div className="rounded-[20px] bg-blue-header p-4 flex flex-col space-y-4 ">
      <div className="flex space-x-4 items-center">
        <div className=" w-2/12">
          <Image src={wars} alt="test" className="w-full h-auto" />
        </div>
        <div className="w/9/12 flex flex-col">
          <p className="text-yellow bold md:text-base regular">Sportrex Apes</p>
          <p className="text-white text-md regular">God of War Assets</p>
        </div>
      </div>
      <div className="bg-blue-dropHeader rounded-[8px] p-3 flex justify-between w-full">
        <p className="semi-bold text-grey-800 text-base regular">APY</p>
        <p className="text-yellow text-base regular semibold">123.56%</p>
      </div>
      <div className="bg-blue-dropHeader rounded-[8px] p-3 flex justify-between w-full">
        <p className="semi-bold text-grey-800 text-base regular">TVL</p>
        <p className="text-yellow text-base regular semibold">$ 4,57754</p>
      </div>
      <div className="bg-blue-dropHeader rounded-[8px] p-3 flex justify-between w-full">
        <p className="semi-bold text-grey-800 text-base regular">Stakers</p>
        <p className="text-yellow text-base regular semibold">754</p>
      </div>
    </div>
  );
};

export default OverviewCard;
