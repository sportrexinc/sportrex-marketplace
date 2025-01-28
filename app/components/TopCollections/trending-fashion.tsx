import React from "react";
import NormalLayout from "../../layouts/NormalLayout";
import heart from "@/public/assets/heart.svg";
import CollectionCarousel from "./CollectionCarousel";
import { itemsList } from "./index";
import vr from "@/public/assets/png/vr.png";
import starbox from "@/public/assets/png/star-box.png"
import Link from "next/link";
import { ArrowForward } from "@/public/assets/svg";
import Image from "next/image";
export const nftItems = [
  {
    name: "Heartcrib",
    price: "0.3 SPT",
    isTrending: true,
    image: heart,
  },
  {
    name: "Starhome",
    price: "0.5 SPT",
    isTrending: false,
    image: heart,
  },
  {
    name: "Moonvilla",
    price: "0.8 SPT",
    isTrending: true,
    image: heart,
  },
  {
    name: "SunsetBungalow",
    price: "0.4 SPT",
    isTrending: false,
    image: heart,
  },
  {
    name: "Moonvilla",
    price: "0.8 SPT",
    isTrending: true,
    image: heart,
  },
  {
    name: "SunsetBungalow",
    price: "0.4 SPT",
    isTrending: false,
    image: heart,
  },
  {
    name: "CosmosCottage",
    price: "1.0 SPT",
    isTrending: true,
    image: heart,
  },
  {
    name: "GalaxyGrove",
    price: "1.2 SPT",
    isTrending: false,
    image: heart,
  },
  {
    name: "Moonvilla",
    price: "0.8 SPT",
    isTrending: true,
    image: heart,
  },
  {
    name: "SunsetBungalow",
    price: "0.4 SPT",
    isTrending: false,
    image: heart,
  },
  {
    name: "CosmosCottage",
    price: "1.0 SPT",
    isTrending: true,
    image: heart,
  },
  {
    name: "SunsetBungalow",
    price: "0.4 SPT",
    isTrending: false,
    image: heart,
  },
  {
    name: "CosmosCottage",
    price: "1.0 SPT",
    isTrending: true,
    image: heart,
  },
  {
    name: "GalaxyGrove",
    price: "1.2 SPT",
    isTrending: false,
    image: heart,
  },
  {
    name: "OrbitOasis",
    price: "0.7 SPT",
    isTrending: true,
    image: heart,
  },
  {
    name: "NebulaNest",
    price: "0.6 SPT",
    isTrending: false,
    image: heart,
  },
];
const TrendingFashion = () => {
  return (
    <div className="w-full -mt-6 overflow-hidden relative ">
      <NormalLayout>
        <div className="w-full fashion-bg xl:h-[535px] z-40 pb-8 relative flex flex-col overflow-hidden ">
          <p className="mt-11 bold text-white lg:text-[30px] lg:leading-10 xl:px-10 px-4 ">
            Trending in Fashion
          </p>
          <div className="w-full mt-8 pl-10">
            <CollectionCarousel items={nftItems} />
          </div>
          <div className="flex xl:hidden mt-8 justify-center w-full">
            <Link href={"/"} className="flex items-center gap-4 text-yellow">
              <span className="bold lg:text-2xl text-lg">View More</span>
              <span>
                <ArrowForward />
              </span>
            </Link>
          </div>
          <div className="absolute  right-0 h-full top-0 bottom-0 2xl:w-[243px] xl:w-[220px] xl:flex items-center justify-center min-h-inherit hidden xl:h-[553px] backdrop-blur-lg">
            <Link href={"/"} className="flex items-center gap-4 text-yellow">
              <span className="bold lg:text-2xl text-lg">View More</span>
              <span>
                <ArrowForward />
              </span>
            </Link>
          </div>
        </div>
      </NormalLayout>
      <div className="w-full h-[300px] lg:h-[500px] mt-12 ">
        <div className="w-[600px] 2xl:w-[2600px] flex items-center bg-yellow h-[80px] lg:h-[114px] rotate-card-1 gap-8 2xl:-ml-10 flex-grow -ml-10 ">
          {itemsList?.map((item, index) => {
            return (
              <div
                key={index}
                className="bg-[#0E1648] h-[57px] lg:h-[78px] rounded-md lg:min-w-[280px] flex items-center px-4 justify-between min-w-[200px]"
              >
                <div className="flex gap-4 items-center">
                  <Image src={vr} alt="ere" className="w-auto h-auto" />
                  <p className="semibold text-white lg:text-[20px] text-base">
                    Gaming
                  </p>
                </div>
                <span className="regular text-[#ababab] lg:text-lg text-sm">
                  22k
                </span>
              </div>
            );
          })}
        </div>
        <NormalLayout>
          <div className=" 2xl:-mt-5 flex justify-end">
            <Image
              src={starbox}
              alt="star"
              className="w-[124px] h-auto lg:w-auto "
            />
          </div>
        </NormalLayout>
      </div>
    </div>
  );
};

export default TrendingFashion;
