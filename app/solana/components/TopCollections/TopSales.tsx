import React from 'react'
import NormalLayout from '../../layouts/NormalLayout'
import SalesCarousel from './SalesCarousel'
// import { nftItems } from './trending-fashion'
import { nftItemsB } from '.'
import LinkBtn, { WhiteBtn } from '../Button/LinkBtn'
import first from "@/public/assets/png/first-rec.png";
import second from "@/public/assets/png/second-rec.png";
import third from "@/public/assets/png/third-rec.png";
import Image from 'next/image'
const TopSales = () => {
  return (
    <div className="w-full">
      <NormalLayout>
        <div className="w-full flex flex-col">
          <h1 className="bold text-white lg:text-[30px]">Top sales today</h1>
          <div className="w-full bg-yellow pb-10 lg:pb-0  xl:h-[200px] relative  mt-56 ">
            <div className="w-full -mt-48 overflow-x-hidden">
              <SalesCarousel items={nftItemsB} />
            </div>
          </div>
          <div className="w-full bg-yellow rounded-[20px] -mt-6">
            <div className="w-full bg-white bg-opacity-15 flex flex-col xl:flex-row xl:items-center  ">
              {/* start */}
              <div className="w-full xl:w-5/12 flex flex-col justify-center  h-full xl:px-12  pt-11 lg:pt-0 px-4  pb-11 lg:pb-0">
                <p className="text-[#152139] max-w-[453px] lg:leading-[47px] bold lg:text-[36px] text-2xl  ">
                  START CREATING WEALTH BY TRADING NFT ASSETS AS A CREATOR,
                  BUYER OR SELLER.
                </p>
                <div className="flex items-center mt-11 gap-3  justify-start flex-col lg:flex-row w-8/12 lg:w-full  lg:mx-0 ">
                  <LinkBtn path="/solana/select-nft" name={"Create NFT"} className='w-full' />
                  <WhiteBtn path="/solana/market" name={"Explore Market"} className='w-full' />
                </div>
              </div>
              {/* end of session */}
              {/* start of pics  */}
              <div className="w-full xl:w-7/12 grid grid-cols-3 h-auto  ">
                <div className="w-full">
                  <Image
                    src={first}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-full">
                  <Image
                    src={second}
                    alt=""
                    className=" w-full h-full object-cover"
                  />
                </div>
                <div className="w-full">
                  <Image
                    src={third}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              {/* ends of pics */}
            </div>
          </div>
        </div>
      </NormalLayout>
    </div>
  );
}

export default TopSales
