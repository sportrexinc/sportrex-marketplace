import React from "react";
import NftAssetCard from "./NftAssetCard";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
import OwnedCard from "../MyNfts/OwnedCard";
import Image from "next/image";
import emptyStateIllustration from "@/public/assets/empty-state-illustration.png";
const getFavorites = () => {
  if (typeof window !== "undefined") {
    // Check if 'favorites' exists in localStorage
    const favorites = localStorage.getItem("favorites");
    return favorites ? JSON.parse(favorites) : [];
  }
  return [];
};
const Owned = () => {
  let data = [1, 2, 3, 4, 5, 6, 7, 8];
  const favorites = getFavorites();
  const back = () => {};
  const next = () => {};

  console.log(favorites);
  return (
    <div>
      {favorites?.length > 0 ? (
        <>
          <div className="w-full md:min-h-[296px] h-full grid grid-cols-2 lg:grid-cols-4 gap-[16px] lg:gap-[32px]">
            {favorites.map((item: any, index: number) => (
              <OwnedCard isTrending item={item} key={index} />
            ))}
          </div>
          <div className="mt-32 w-full justify-center space-x-12 flex">
             <button
                   className="bg-grey-800 rounded-full text-black cursor-pointer  text-lg regular  p-4 max-w-[150px] justify-center flex items-center gap-4"
                   onClick={back}
                 >
                   <BsArrowLeft />
                   Previous
                 </button>
                 <button
                   className="bg-yellow text-lg regular rounded-full text-black p-4 flex items-center gap-4 max-w-[150px] justify-center"
                   onClick={next}
                 >
                   Next
                   <BsArrowRight />
                 </button>
          </div>
        </>
      ) : (
        <div className="flex justify-center flex-col items-center">
          <div>
            <Image
              height={100}
              width={100}
              src={emptyStateIllustration}
              alt=""
            />
          </div>

          <div>
            <p className="text-center mt-5">
              You are yet to have a Favorite NFT...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Owned;
