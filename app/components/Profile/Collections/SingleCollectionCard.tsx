import React, { FC, useState } from "react";
import soccer from "@/public/assets/profile/soccer.jpg";

import ilus from "@/public/assets/profile/profile-ilus.svg";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MediaRenderer, useContract, useMetadata, useNFTs, useTotalCount } from "@thirdweb-dev/react";
import { CollectionResult } from "@/types";
import CollectionLoading from "../../Loader/CollectionLoading";
import Image from "next/image";
const CollectionsCard: FC<{
  collection: CollectionResult;
}> = ({ collection }) => {
  const [liked, setLiked] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);
  const { contract } = useContract(collection.token_address)
  const { data: totalCount } = useTotalCount(contract)
  const { data: metadata, isLoading  } = useMetadata(contract)
  // const { data: nft } = useNFTs(contract)
// console.log(nft, 'not wokring');

if(isLoading) return <CollectionLoading />
  
  return (
    <div className="w-full md:h-[350px] relative overflow-hidden rounded-[20px] ">
      <div
        className=" w-full z-50 h-full flex flex-col absolute bg-opacity"
      >
        
          <div className="img-container flex-1 items-center w-full flex justify-center ">
            {/* @ts-ignore */}
            <MediaRenderer src={ metadata?.image ||  ilus} style={{ borderRadius: "20px" }} alt="life" width="100px" height="100px" />
          </div>
          <div className="flex flex-col p-4 mt-2 sm:mt-6 2xl:mt-10">
            <p className="text-[18px] leading-[30px]">{collection.name}</p>
            <div className="flex justify-between w-full">
              <div className="text-[#fff] semibold leading-[22px]">
               {`${totalCount || '_ _'} items`}
              </div>
              <div className="flex space-x-1 items-center">
                {liked ? (
                  <AiFillHeart
                    className="text-xl text-yellow"
                    onClick={() => setLiked(false)}
                  />
                ) : (
                  <AiOutlineHeart
                    className="text-xl text-grey-800"
                    onClick={() => setLiked(true)}
                  />
                )}
                <h2>0</h2>
              </div>
            </div>
          </div>
        </div>
      <div className="w-full h-full blur-sm absolute z-0 flex  ">
        <Image
        // @ts-ignore
          src={metadata?.image || soccer}
          alt="fghj"
          className="w-full object-cover rounded-[10px] bg-center  "
        />
      </div>
    </div>
  );
};

export default CollectionsCard;
