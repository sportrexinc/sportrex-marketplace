import React, { FC, useEffect, useState } from "react";
import soccer from "@/public/assets/profile/soccer.jpg";

import ilus from "@/public/assets/profile/profile-ilus.svg";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  MediaRenderer,
  useContract,
  useMetadata,
  useNFTs,
  useTotalCount,
} from "@thirdweb-dev/react";
import { CollectionResult } from "@/types";
import CollectionLoading from "../../Loader/CollectionLoading";
import Image from "next/image";
import Link from "next/link";
import Abi from "@/abi/SptNFTContract.json";
import FavoriteButtonCollection from "./favourite-button-collection";
import Options from "../../options/options";

const CollectionsCard: FC<{
  collection: CollectionResult;
  cardType?: string;
}> = ({ collection,cardType }) => {
  const [liked, setLiked] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);
  const { contract } = useContract(collection.token_address);
  const { data: totalCount, error: countError } = useTotalCount(contract);
  const { data: metadata, isLoading } = useMetadata(contract);
  // const { data: nft } = useNFTs(contract)
  // console.log(nft, 'not wokring');
  useEffect(() => {
    console.log(countError);
  }, [countError]);

  if (isLoading) return <CollectionLoading />;

  return (
    <>
      <div className="w-full md:h-[350px] relative overflow-hidden rounded-[20px] ">
        <div className=" w-full z-10 h-full flex flex-col absolute bg-opacity">
            <div className="absolute right-7 top-7 z-20">
              <Options>
                {cardType === "owned" && (
                  <div className="w-full flex flex-col  py-6 px-4 gap-4">
                    <p className="regular text-sm lg:text-lg text-white hover:text-yellow">
                      List
                    </p>
                    <p className="regular text-sm lg:text-lg text-white hover:text-yellow">
                      Share
                    </p>
                    <p className="regular text-sm lg:text-lg text-white hover:text-yellow">
                      Edit
                    </p>
                  </div>
                )}
                {cardType === "unlisted" && (
                  <div className="w-full flex flex-col  py-6 px-4 gap-4">
                    <p className="regular text-sm lg:text-lg text-white hover:text-yellow">
                      Edit
                    </p>
                    <p className="regular text-sm lg:text-lg text-white hover:text-yellow">
                      Mint
                    </p>
                  </div>
                )}
                {cardType === "listed" && (
                  <div className="w-full flex flex-col  py-6 px-4 gap-4">
                    <p className="regular text-sm lg:text-lg text-white hover:text-yellow">
                      Remove Listing
                    </p>
                  </div>
                )}
                {cardType === "general" && (
                  <div className="w-full flex flex-col  py-6 px-4 gap-4">
                    <p className="regular text-sm lg:text-lg text-white hover:text-yellow">
                      Sell
                    </p>
                    <p className="regular text-sm lg:text-lg text-white hover:text-yellow">
                      Change Collection
                    </p>
                    <p className="regular text-sm lg:text-lg text-white hover:text-yellow">
                      Share
                    </p>
                  </div>
                )}
              </Options>
            </div>
          <Link
            href={`/nft/${collection.token_address}`}
            className="img-container flex-1 items-center w-full flex justify-center relative "
          >
            <Image
              /* @ts-ignore */
              src={metadata?.image || ilus}
              style={{ borderRadius: "20px" }}
              alt="life"
              width={100}
              height={100}
            />
          </Link>
          <div className="flex flex-col p-4 mt-2 sm:mt-6 2xl:mt-10 relative">
            <Link
              href={`/nft/${collection.token_address}`}
              className="text-[18px] leading-[30px]"
            >
              {collection.name}
            </Link>
            <div className="flex justify-between w-full">
              <div className="text-[#fff] semibold leading-[22px]">
                {`${!countError ? totalCount : "_ _"} items`}
              </div>
              <div className="flex space-x-1 items-center">
                <FavoriteButtonCollection item={collection} />
                <h2>0</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-full blur-sm absolute z-0 flex ">
          <Image
            // @ts-ignore
            src={metadata?.image || soccer}
            alt="fghj"
            className="w-full h-full object-cover rounded-[10px] bg-center"
            width={0}
            height={0}
          />
        </div>
      </div>
    </>
  );
};

export default CollectionsCard;
