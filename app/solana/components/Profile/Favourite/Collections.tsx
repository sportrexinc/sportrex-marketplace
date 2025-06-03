import React from "react";
import NftAssetCard from "./NftAssetCard";
import CollectionsCard from "./CollectionsCard";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";

const Collections = () => {
  let data = [1, 2, 3, 4, 5, 6, 7, 8];
  const back = () => {};
  const next = () => {};
  return (
    <div>
      <div className="w-full md:min-h-[296px] h-full grid grid-cols-2 lg:grid-cols-4 gap-[16px]   lg:gap-[32px]">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i, index) => (
          <CollectionsCard key={index} />
        ))}
      </div>
      <div className="mt-32 w-full justify-center space-x-12 flex">
        <button
          className="bg-grey-800 rounded-full text-black cursor-pointer  text-lg regular  p-4"
          onClick={back}
        >
          <BsArrowLeft />
        </button>
        <button
          className="bg-yellow text-lg regular rounded-full text-black p-4"
          onClick={next}
        >
          <BsArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Collections;
