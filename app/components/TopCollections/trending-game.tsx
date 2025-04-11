import React from 'react'
import NormalLayout from '../../layouts/NormalLayout'
import heart from "@/public/assets/heart.svg";
import CollectionCarousel from './CollectionCarousel';
import Link from 'next/link';
import { ArrowForward } from '@/public/assets/svg';
import {
  azuki,
  bored,
  doodles,
  goodVibes,
  milady,
  pudgy,
  punk,
  tyler,
  xcopy,
  ethIcon,
} from "@/public/assets/general";
const nftItemsA = [
  {
    name: "Azuki",
    floor_price: "2.57 ETH",
    image: azuki,
    rate: "+4.7%",
  },
  {
    name: "Pudgy Penguins",
    floor_price: "9.22 ETH",
    image: pudgy,
    rate: "+3.3%",
  },
  {
    name: "Crypto Punks",
    floor_price: "42.5 ETH",
    image: punk,
    rate: "+11%",
  },
  {
    name: "Bored Ape Yacht Club",
    floor_price: "14.195 ETH",
    image: bored,
    rate: "+1.5%",
  },
  {
    name: "Bored Ape Yacht Club",
    floor_price: "14.195 ETH",
    image: bored,
    rate: "+1.5%",
  },
  {
    name: "X COPY",
    floor_price: "30 ETH",
    image: xcopy,
    rate: "+36.4%",
  },
  {
    name: "Fidenza by Tyler Hobbs",
    floor_price: "34.38 ETH",
    image: tyler,
    rate: "+0%",
  },
  {
    name: "Doodles",
    floor_price: "2.81 ETH",
    image: doodles,
    rate: "+4.3%",
  },
  {
    name: "Milady Maker",
    floor_price: "3.14 ETH",
    image: milady,
    rate: "+1.6%",
  },
  {
    name: "Good Vibe Club",
    floor_price: "0.26 ETH",
    image: goodVibes,
    rate: "+5%",
  },
];

const TrendingGame = () => {
  return (
    <div className="w-full xl:-mt-40 ">
      <NormalLayout>
        <div className="w-full game-bg pb-8 xl:h-[535px]  relative flex flex-col overflow-hidden ">
          <p className="mt-11 bold text-white lg:text-[30px] lg:leading-10 xl:px-10 px-4 lg:px-0">
            Trending in Game
          </p>
          <div className="w-full mt-8 pl-10 overflow-x-hidden">
            <CollectionCarousel items={nftItemsA} />
          </div>
          <div className="flex xl:hidden mt-8 justify-center w-full">
            <Link href={"/"} className="flex items-center gap-4 text-yellow">
              <span className="bold lg:text-2xl text-lg">View More</span>
              <span>
                <ArrowForward />
              </span>
            </Link>
          </div>
          <div className="absolute  right-0 h-full top-0 bottom-0 2xl:w-[243px] xl:w-[220px]  items-center justify-center min-h-inherit xl:h-[553px] backdrop-blur-lg   hidden xl:flex">
            <Link href={"/"} className="flex items-center gap-4 text-yellow">
              <span className="bold lg:text-2xl text-lg">View More</span>
              <span>
                <ArrowForward />
              </span>
            </Link>
          </div>
        </div>
      </NormalLayout>
    </div>
  );
}

export default TrendingGame
