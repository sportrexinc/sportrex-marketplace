import React, { useEffect } from "react";
import { Carousel as C } from "react-responsive-carousel";
import useResizer from "../../hooks/useResizer";
import NftCard from "./NftCard";

const Carousel = () => {
  const { width, height } = useResizer();
  const isMobile = width < 820;
  useEffect(() => {});
  return (
    <div className="w-full gap-8 flex flex-col">
      
      {[0, 1].map((index) => (
        <div className="w-full h-full flex gap-8 justify-center " key={index}>
          {(isMobile ? [0, 1] : [0, 1, 2, 3]).map((i, index) => (
            <NftCard key={index} isTrending={false} />
          ))}
        </div>
      ))}
      </div>
    
  );
};

export default Carousel;
