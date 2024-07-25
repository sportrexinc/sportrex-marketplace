import React from "react";
import NormalLayout from "@/app/layouts/NormalLayout";
import animator from "@/public/assets/animator.png";
import LinkBtn from "../Button/LinkBtn";
import MobileHow from "./MobileHow";
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
    path: "/market",

  },
  {
    title: "NFT Creation",
    description:
      "Enjoy seamleess NFT creation and minting on Sportrex marketplace with low gas fee.",
    image: animator,
    imageAlt: "animator",
    name: "Mint NFT",
    id: 2,
    path: "/select-nft",
  },
  {
    title: "NFT Staking",
    description:
      "Select your preffered pool for NFT staking and earn yield return on all your staked NFT assets.",
    image: animator,
    imageAlt: "animator",
    name: "Go to vault",
    id: 3,
    path: "/staking",
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
              {t("how_title")}
            </h1>
          </div>
          <div className="mt-[90px] hidden lg:flex w-full  space-x-8 justify-between items-center flow-hide-x lg:overflow-x-hidden overflow-y-hidden h-full">
            {options.map((option, index) => (
              <div
                className="how-card shape-ex"
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
                  <div className="internal">
                    <div className="w-full flex py-4 lg:py-8 px-4 flex-col flow-hide ">
                      <div className="img-container">
                        <Image
                          src={option.image}
                          alt={option.imageAlt}
                          className=" w-[30px] lg:w-[80px] h-auto object-center object-cover "
                        />
                      </div>
                      <div className="mt-2">
                        <h2 className=" text-white text-base regular lg:text-2xl font-bold bold bold">
                          {option.title}
                        </h2>
                        <p className="text-white text-sm lg:text-lg regular leading-4 lg:leading-8">
                          {option.description}
                        </p>
                      </div>
                      <div className=" w-full lg:w-7/12 mt-2 lg:mt-4">
                        <LinkBtn name={option.name} path={option.path} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-[90px]">
            <MobileHow />
          </div>
        </div>
      </div>
    </NormalLayout>
  );
};

export default How;
