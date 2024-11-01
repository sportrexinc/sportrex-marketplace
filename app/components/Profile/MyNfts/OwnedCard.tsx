import React, { useEffect, useState } from "react";
import heart from "@/public/assets/heart.svg";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MediaRenderer, useContract, useNFT } from "@thirdweb-dev/react";
import NftLoading from "../../Loader/NftLoading";
import axios from "axios";
import { NftResult } from "@/types";
import { useRouter } from "next/navigation";
import Link from "next/link";
import FavoriteButton from "./favourite-button";
import Options from "../../options/options";
import ListingModal from "../../modals/action-modals/ListingModal";

const OwnedCard = ({
  isTrending,
  item,
  cardType
}: {
  isTrending: boolean;
    item: NftResult;
    cardType?: string;
}) => {
  const [liked, setLiked] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openListing, setOpenListing] = useState(false);
  
  const [retrievedNft, setRetrievedNft] = useState<any>({
    image: heart,
    name: "NFT not found",
  });

  const { contract } = useContract(item.token_address);
  const { data: nft, isLoading, error } = useNFT(contract, item.token_id);
  const router = useRouter();
  const handleNavigate = () => {
    router.push(`/nft/${item.token_address}/${item.token_id}`);
  };

  // console.log(nft?.metadata.image);
  if (loading) return <NftLoading />;

  return (
    // <div className="w-full box-border  lg:min-w-[300px] md:h-[350px] sm:w-[280px] lg:w-[304px] h-full bg-no-repeat bg-cover bg-blue-header rounded-[10px] md:rounded-[20px] p-3 flex flex-col items-start space-y-[12px] justify-between relative">
    <>
      <div className="w-full overflow-hidden box-border md:h-[350px] h-full bg-blue-header rounded-[10px] p-2 lg:p-4 md:rounded-[20px] flex flex-col  relative">
        <div className="absolute left-2 top-2">
          {Number(item.amount) > 1 && (
            <span className="bg-black text-[14px] rounded-full p-1 text-green">
              {" "}
              {`x${item.amount}`}{" "}
            </span>
          )}
        </div>
        <div className="absolute right-7 top-7 z-10">
          <Options>
            {cardType === "owned" && (
              <div className="w-full flex flex-col  py-6 px-4 gap-4">
                <p className="regular text-sm lg:text-lg text-white hover:text-yellow" onClick={() => setOpenListing(!openListing)}>
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
          href={`/nft/${item.token_address}/${item.token_id}`}
          className="w-full relative"
        >
          {
            cardType === "listed" && (

            <div className="absolute bottom-2 right-4">
                <p className="bold grad-text">
                  On Sale
</p>
          </div>
            )
          }
          <MediaRenderer
            height="233px"
            width="100%"
            style={{
              backgroundColor: nft?.metadata.background_color || "black",
            }}
            className="w-full flex-[3]  rounded-[20px] object-cover "
            src={nft?.metadata.image}
          />
        </Link>
        <div className="flex flex-1 overflow-hidden justify-between items-center w-full mb-2 px-2">
          <Link href={`/nft/${item.token_address}/${item.token_id}`}>
            <p className="text-[16px] semibold" onClick={handleNavigate}>
              {nft?.metadata.name}
            </p>
            <div className="text-[#FAC744]  text-[14px] semibold leading-[22px]">
              0.3 SPT
            </div>
          </Link>

          <div />
          <div className="flex gap-x-2 items-center">
            {/* {liked ? (
            <AiFillHeart
              className="text-[24px] text-yellow"
              onClick={() => setLiked(false)}
            />
          ) : (
            <AiOutlineHeart
              className="text-[24px] text-grey-800"
              onClick={() => setLiked(true)}
            />
          )} */}
            <FavoriteButton item={item} />
            {/* <span className="regular text-[#ABABAB]">0</span> */}
          </div>
        </div>
      </div>
      <ListingModal item={item} open={openListing} setOpen={setOpenListing} />
    </>
  );
};

export default OwnedCard;
