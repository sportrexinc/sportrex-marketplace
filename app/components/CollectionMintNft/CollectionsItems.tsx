import React, { useState, useEffect } from "react";

import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
import Link from "next/link";
import OwnedCard from "../Profile/MyNfts/OwnedCard";
import NftLoading from "../Loader/NftLoading";
import { MoralisNftResponse } from "@/types";
import { useAppDispatch, useAppSelector } from "@/app/redux/store";
import { getUserNft } from "@/app/redux/features/auth/MyNftSlice";
import { useAddress } from "@thirdweb-dev/react";

const CollectionItems = ({ data, loading, address }: any) => {
  const dispatch = useAppDispatch();

  const back = () => {
    address &&
      dispatch(
        getUserNft({
          address,
          chain: "binance-testnet",
          cursor: null,
          limit: 15,
        })
      );
  };
  const next = () => {
    address &&
      dispatch(
        getUserNft({
          address,
          chain: "binance-testnet",
          cursor: data?.cursor,
          limit: 15,
        })
      );
  };

  //console.log(data.data?.result)

  return (
    <div className="w-full flex flex-col justify-center items-center mt-8">
      <div className="w-full md:min-h-[296px] h-full grid grid-cols-2 lg:grid-cols-5 gap-3 ">
        {!loading && data && data.data?.result
          ? data.data?.result.map((item: any, index: number) => {
              return <OwnedCard item={item} isTrending={true} key={index} cardType="general" />;
            })
          : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, index: number) => (
              <NftLoading key={index} />
            ))}
      </div>
      <div className="my-10 w-full justify-center space-x-12 flex">
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
      <div className="w-full flex items-center justify-center mt-[70px] bg-">
        <Link
          href={"/collection-nft"}
          className="bg-blue-btn h-[56px] rounded-[10px] text-white semibold px-9 flex items-center justify-center"
        >
          Add an Item
        </Link>
      </div>
    </div>
  );
};

export default CollectionItems;
