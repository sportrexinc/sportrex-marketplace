import React from 'react'
import NormalLayout from '../../layouts/NormalLayout'
import heart from "@/public/assets/heart.svg";
import CollectionCarousel from './CollectionCarousel';
import Link from 'next/link';
import { ArrowForward } from '@/public/assets/svg';
const nftItems = [
  {
    name: "Heartcrib",
    price: "0.3 SPT",
    isTrending: true,
    image:heart
  },
  {
    name: "Starhome",
    price: "0.5 SPT",
    isTrending: false,
    image:heart,
  },
  {
    name: "Moonvilla",
    price: "0.8 SPT",
    isTrending: true,
    image:heart
  },
  {
    name: "SunsetBungalow",
    price: "0.4 SPT",
    isTrending: false,
    image:heart,
  },
  {
    name: "CosmosCottage",
    price: "1.0 SPT",
    isTrending: true,
    image:heart
  },
  {
    name: "GalaxyGrove",
    price: "1.2 SPT",
    isTrending: false,
    image:heart,
  },
  {
    name: "Moonvilla",
    price: "0.8 SPT",
    isTrending: true,
    image:heart
  },
  {
    name: "SunsetBungalow",
    price: "0.4 SPT",
    isTrending: false,
    image:heart,
  },
  {
    name: "CosmosCottage",
    price: "1.0 SPT",
    isTrending: true,
    image:heart
  },
  {
    name: "SunsetBungalow",
    price: "0.4 SPT",
    isTrending: false,
    image:heart,
  },
  {
    name: "CosmosCottage",
    price: "1.0 SPT",
    isTrending: true,
    image:heart
  },
  {
    name: "GalaxyGrove",
    price: "1.2 SPT",
    isTrending: false,
    image:heart,
  },
  {
    name: "OrbitOasis",
    price: "0.7 SPT",
    isTrending: true,
    image:heart
  },
  {
    name: "NebulaNest",
    price: "0.6 SPT",
    isTrending: false,
    image:heart,
  },
];
const TrendingGame = () => {
  return (
    <div className="w-full ">
      <NormalLayout>
        <div className="w-full game-bg pb-8 xl:h-[535px]  relative flex flex-col overflow-hidden ">
          <p className="mt-11 bold text-white lg:text-[30px] lg:leading-10 xl:px-10 px-4 lg:px-0">
            Trending in Game
          </p>
          <div className="w-full mt-8 pl-10 overflow-x-hidden">
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
          <div className="absolute game-bg-sub right-0 h-full top-0 bottom-0 2xl:w-[243px] xl:w-[220px]  items-center justify-center min-h-inherit hidden xl:flex">
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
