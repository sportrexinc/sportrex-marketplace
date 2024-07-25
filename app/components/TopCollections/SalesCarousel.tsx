import React, { useState, useEffect } from "react";

import NftCard from "../Carousel/NftCard";

interface Nft {
  name: string;
  price: string;
  image: string;
  isTrending: boolean;
}

interface CarouselProps {
  items: Nft[];
}

const SalesCarousel: React.FC<CarouselProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentMobileIndex, setCurrentMobileIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 4) % items.length);
      setCurrentMobileIndex((prevIndex) => (prevIndex + 2) % items.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [items.length]);

  const indicators = Array(Math.ceil(items.length / 4))
    .fill(null)
    .map((_, index) => (
      <div
        key={index}
        className={`w-3 h-3 mx-1 rounded-full ${
          index === Math.floor(currentIndex / 4)
            ? "bg-white"
            : "bg-white bg-opacity-30"
        }`}
      />
    ));

  return (
    <div className="relative flex flex-col">
      <div className="  lg:grid-cols-4 gap-4 overflow-hidden hidden lg:grid">
        {items.slice(currentIndex, currentIndex + 4).map((item, index) => (
          <NftCard key={index}  isTrending={false}  />
        ))}
      </div>
      <div className="  lg:hidden gap-0 overflow-hidden flex">
        {items.slice(currentMobileIndex, currentMobileIndex + 4).map((item, index) => (
          <div className="min-w-[304px]">

          <NftCard key={index} isTrending={false}  />
          </div>
        ))}
      </div>
      <div className=" w-full flex justify-center mt-10">{indicators}</div>
    </div>
  );
};

export default SalesCarousel;
