import React from "react";
import NftCard from "../Carousel/NftCard";
import NormalLayout from "../../layouts/NormalLayout";
import { IoIosArrowForward } from "react-icons/io";
import { useTranslation } from "react-i18next";
import Link from "next/link";

const TrendingNFT = () => {
  const { t } = useTranslation(["translation"]);
  return (
    <NormalLayout>
      <div className="trending-bg py-20 lg:py-12 p-2 sm:p-6 lg:p-4 lg:px-8 rounded-[30px] ">
        <div className="w-full  ">
          <div className="w-full flex justify-between items-center mb-[32px] lg:mb-8">
            <h1 className="md:text-3xl md:leading-[28px] font-[700] bold   text-start  text-white">
              {t("trending_nft")}
            </h1>
          </div>
          <div className="w-full md:min-h-[296px] h-full grid grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-[16px]   lg:gap-[32px]">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((ist: any, index: number) => (
              <NftCard isTrending={false} key={index} item={ist} />
            ))}
          </div>
          <div className="w-full flex justify-center items-center mt-8">
            <Link
              href="/market"
              className="text-white flex space-x-3 text-lg regular semibold items-center "
            >
              <span className="text-sm md:text-lg regular">View More</span>
              <IoIosArrowForward className="text-lg regular" />
            </Link>
          </div>
        </div>
      </div>
    </NormalLayout>
  );
};

export default TrendingNFT;
