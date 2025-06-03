import React, { useState, useEffect } from "react";
import NewNftCard from "./NewNftCard";

interface Nft {
  name: string;
  floor_price: string;
  image: any;
  isTrending?: boolean;
}

interface CarouselProps {
  items: Nft[];
}

const CollectionCarousel: React.FC<CarouselProps> = ({ items }) => {
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
          index === Math.floor(currentIndex / 4) ? "bg-white" : "bg-white bg-opacity-30"
        }`}
      />
    ));

  return (
    <div className="relative flex flex-col">
      <div className=" grid-cols-4 gap-4 overflow-hidden hidden xl:grid">
        {items.slice(currentIndex, currentIndex + 4).map((item, index) => (
          <NewNftCard key={index} {...item} />
        ))}
      </div>
      <div className=" xl:hidden gap-0 overflow-hidden flex">
        {items.slice(currentIndex, currentIndex + 4).map((item, index) => (
            <div className="min-w-[304px]"  key={index}> 

          <NewNftCard {...item} />
            </div>
        ))}
      </div>
      <div className=" w-full flex justify-center mt-10">{indicators}</div>
    </div>
  );
};

export default CollectionCarousel;
