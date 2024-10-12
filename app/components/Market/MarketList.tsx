import React from "react";
import Carousel from "../Carousel/NewNftCarousel";
import NormalLayout from "../../layouts/NormalLayout";
const MarketList = ({title} : {title:string}) => {
  return (
    <NormalLayout>
      <div className="w-full px-[12px] ">
        <h1 className="grad-text text-[22px] leading-[28px]  md:text-[30px]  md:text-start mb-[32px] md:mb-[64px]">
          {title}
        </h1>
        <div className="w-full ">
          <Carousel />
        </div>
      </div>
    </NormalLayout>
  );
};

export default MarketList;
