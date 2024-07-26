"use client"
import React from "react";
import ParentLayout from "@/app/layouts/ParentLayout";
import { Header, CustomSelect, LockedCard } from "@/app/components";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
import { sampData } from "@/app/constants";
import { useRouter } from "next/navigation";

const data: number[] = [1, 2, 3, 4];
const LockedStake = () => {
  const navigate = useRouter();
  const back = () => {
    navigate.back();
  };
  const next = () => {
    navigate.push("/not-connected-stake");
  };
  return (
    <ParentLayout current={4}>
      <div className="flex-col w-full">
        <div className="flex flex-col mt-20 justify-center  items-center w-full mx-auto lg:w-3/12 ">
          <Header>Sportrex Ape</Header>
          <h1 className="text-lg regular regular text-white leading-7 text-center">
            APY: 123.45%
          </h1>
        </div>
        <div className="mt-20 grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 md:gap-8">
          {sampData.map((item, index) => (
            <div
              className="flex flex-col bg-blue-header rounded-[20px] h-32 justify-center py-2 px-4  w-full"
              key={index}
            >
              <Header>{item.price}</Header>
              <p className="text-grey-800 text-2xl semibold">{item.name}</p>
            </div>
          ))}
        </div>
        <div className="flex w-full justify-end">
          <div className="flex  mt-20 justify-end  items-center w-full  lg:w-2/12 ">
            <CustomSelect name="Locked NFTS" />
          </div>
        </div>
        <div className="mt-20 grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 md:gap-8">
          {data.map((item, index) => (
            <LockedCard key={index} />
          ))}
        </div>
        <div className="mt-32 w-full justify-center space-x-12 flex">
          <button
            className="bg-grey-800 rounded-full text-black cursor-pointer  text-lg regular  p-4"
            onClick={back}
          >
            <BsArrowLeft />
          </button>
          <button
            className="bg-yellow text-lg regular rounded-full text-black p-4"
            onClick={next}
          >
            <BsArrowRight />
          </button>
        </div>
      </div>
    </ParentLayout>
  );
};

export default LockedStake;
