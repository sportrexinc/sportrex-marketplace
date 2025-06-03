import React from "react";
import NormalLayout from "@/app/layouts/NormalLayout";
import animator from "@/public/assets/animator.png";
import LinkBtn from "../Button/LinkBtn";

import "./How.css";
import { useTranslation } from "react-i18next";
import Image from "next/image";
const options = [
  {
    title: "NFT Purchase",
    description:
      "Choose from different varieties of minted NFT assets from our NFT market place.",
    image: animator,
    imageAlt: "animator",
    name: "Go to market",
    id: 1,
    path: "/solana/market",

  },
  {
    title: "NFT Creation",
    description:
      "Enjoy seamleess NFT creation and minting on Sportrex marketplace with low gas fee.",
    image: animator,
    imageAlt: "animator",
    name: "Mint NFT",
    id: 2,
    path: "/solana/select-nft",
  },
  {
    title: "NFT Staking",
    description:
      "Select your preffered pool for NFT staking and earn yield return on all your staked NFT assets.",
    image: animator,
    imageAlt: "animator",
    name: "Go to vault",
    id: 3,
    path: "/solana/staking",
  },
];


const How = () => {
   const { t } = useTranslation(["translation"]);
  return (
    <NormalLayout>
      <div className="flex  flex-col w-full">
        <div className="header">
          <div className="w-full flex justify-center ">
            <h1 className="text-center grad-text text-3xl bold">
              {/* {t("how_title")} */}
              How The Platform Works
            </h1>
          </div>
          <div className="mt-[90px] flex flex-col md:flex-row lg:flex w-full  gap-y-10 2xl:gap-8 justify-between items-center flow-hide-x 2xl:overflow-x-hidden md:gap-8 xl:gap-4  md:flex-wrap overflow-y-hidden h-full">
            {options.map((option, index) => (
              <div
                className="how-card shape-ex "
                key={index}
                style={{
                  borderBottomRightRadius: "30px",
                  borderTopRightRadius: "30px",
                  borderBottomLeftRadius: "30px",
                }}
              >
                <div
                  className="shape-in"
                  style={{
                    borderBottomRightRadius: "30px",
                    borderTopRightRadius: "30px",
                    borderBottomLeftRadius: "30px",
                  }}
                >
                  <div className="internal rounded-b-[30px] rounded-tr-[20px]">
                    <div className="w-full flex py-4 lg:py-8 px-4 flex-col flow-hide ">
                      <div className="img-container">
                        <Image
                          src={option.image}
                          alt={option.imageAlt}
                          className=" w-[60px] lg:w-[80px] h-auto object-center object-cover "
                        />
                      </div>
                      <div className="mt-2">
                        <h2 className=" text-white text-lg regular  lg:text-2xl font-bold bold bold">
                          {option.title}
                        </h2>
                        <p className="text-white text-base lg:text-base 2xl:text-lg regular  lg:leading-8 leading-[30px]">
                          {option.description}
                        </p>
                      </div>
                      <div className=" w-fit min-w-max mt-4 lg:mt-4">
                        <LinkBtn name={option.name} path={option.path} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
       
        </div>
      </div>
    </NormalLayout>
  );
};

export default How;
