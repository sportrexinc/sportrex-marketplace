import React, { useState, useEffect } from "react";
import heart from "@/public/assets/heart.svg";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MediaRenderer, useContract, useNFT } from "@thirdweb-dev/react";
import NftLoading from "../Loader/NftLoading";
import { ethers } from "ethers";
import axios from "axios";
import { NftResult } from "@/types";
import { useRouter } from "next/navigation";
import Link from "next/link";
import FavoriteButton from "../Profile/MyNfts/favourite-button";
import Options from "../options/options";
import ListingModal from "../modals/action-modals/ListingModal";
import sptMarketplaceAbi from "@/abi/SptMarketplace.json";
import ShareModal from "../modals/share-modal";
import UnlistModal from "../modals/action-modals/UnlistModal";
import EndAuctionModal from "../modals/action-modals/EndAuctionModal";
import AuctionModal from "../modals/action-modals/AuctionModal";
import CancelAuctionModal from "../modals/action-modals/CancelAutionModal";
const SingleNftCard = ({
  isTrending,
  item,
  cardType,
}: {
  isTrending: boolean;
  item: any;
  cardType?: string;
}) => {
  const [liked, setLiked] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openListing, setOpenListing] = useState(false);
  const [openUnListing, setOpenUnListing] = useState(false);
  const [openShare, setOpenShare] = useState(false);
  const [isAuction, setIsAuction] = useState(false);
  const [openEndAuction, setOpenEndAuction] = useState(false);
  const [openAuction, setOpenAuction] = useState(false);
  const [openCancelAuction, setOpenCancelAuction] = useState(false);

  const [priceData, setPriceData] = useState<any>();
  const [isFetchingPrice, setIsFetchingPrice] = useState(false);
  const [retrievedNft, setRetrievedNft] = useState<any>({
    image: heart,
    name: "NFT not found",
  });

  const { contract } = useContract(item.contractAddress);

  const { contract: marketplaceContract } = useContract(
    process.env.NEXT_PUBLIC_SPT_MARKETPLACE,
    sptMarketplaceAbi
  );
  const { data: nft, isLoading, error } = useNFT(contract, item?.nftid);
  const router = useRouter();
  const handleNavigate = () => {
    router.push(`/nft/${item.contractAddress}/${item.nftId}`);
  };

  const handleAuctionState = async () => {
    try {
      const auctionState = await marketplaceContract?.call("getAuctionState", [
        item?.contractAddress,
        item?.nftId,
      ]);
      console.log("Auction state: ", auctionState);
      setIsAuction(auctionState);
    } catch (error) {
      console.log("Error fetching auction state: ", error);
    }
  };

  const handleGetPrice = async () => {
    setIsFetchingPrice(true);
    try {
      const getPriceData = await marketplaceContract?.call("getPrice", [
        contract,
        item?._id,
      ]);
      console.log({ getPriceData });
      const priceInWei = ethers.utils.formatEther(getPriceData);
      setPriceData(priceInWei);
    } catch (error) {
      console.log("Error fetching price: ", error);
      setPriceData(null);
    } finally {
      setIsFetchingPrice(false);
    }
  };

  useEffect(() => {
    handleAuctionState();
    if (marketplaceContract && item.contractAddress && item.nftId) {
      handleGetPrice();
    }
  }, [item.contractAddress, item.nftId]);

  if (loading) return <NftLoading />;
  console.log(nft);
  return (
    <div>
      <>
        <div className="w-full overflow-hidden box-border md:h-[350px] h-full bg-blue-header rounded-[10px] p-2 lg:p-4 md:rounded-[20px] flex flex-col  items-start space-y-[12px] justify-between relative">
          <div className="absolute right-7 top-7 z-10">
            <Options>
              {cardType === "owned" && (
                <div className="w-full flex flex-col  py-6 px-4 gap-4">
                  <p
                    className="regular text-sm lg:text-lg text-white hover:text-yellow cursor-pointer"
                    onClick={
                      priceData
                        ? () => setOpenUnListing(true)
                        : () => setOpenListing(!openListing)
                    }
                  >
                    {priceData ? "UnList" : "List"}
                  </p>
                  <p
                    className="regular text-sm lg:text-lg text-white hover:text-yellow cursor-pointer"
                    onClick={() => setOpenShare(true)}
                  >
                    Share
                  </p>
                  <p
                    className="regular text-sm lg:text-lg text-white hover:text-yellow cursor-pointer"
                    onClick={() => setOpenUnListing(true)}
                  >
                    Edit
                  </p>
                  {isAuction ? (
                    <p
                      className="regular text-sm lg:text-lg text-white hover:text-yellow cursor-pointer"
                      onClick={() => setOpenCancelAuction(true)}
                    >
                      Cancel Auction
                    </p>
                  ) : (
                    <p
                      className="regular text-sm lg:text-lg text-white hover:text-yellow cursor-pointer"
                      onClick={() => setOpenAuction(!openAuction)}
                    >
                      Auction
                    </p>
                  )}
                </div>
              )}
              {cardType === "unlisted" && (
                <div className="w-full flex flex-col  py-6 px-4 gap-4">
                  <p className="regular text-sm lg:text-lg text-white hover:text-yellow cursor-pointer">
                    Edit
                  </p>
                  <p className="regular text-sm lg:text-lg text-white hover:text-yellow cursor-pointer">
                    Mint
                  </p>
                </div>
              )}
              {cardType === "listed" && (
                <div className="w-full flex flex-col  py-6 px-4 gap-4">
                  <p className="regular text-sm lg:text-lg text-white hover:text-yellow cursor-pointer">
                    Remove Listing
                  </p>
                </div>
              )}
              {cardType === "general" && (
                <div className="w-full flex flex-col  py-6 px-4 gap-4">
                  <p className="regular text-sm lg:text-lg text-white hover:text-yellow cursor-pointer">
                    Sell
                  </p>
                  <p className="regular text-sm lg:text-lg text-white hover:text-yellow cursor-pointer">
                    Change Collection
                  </p>
                  <p className="regular text-sm lg:text-lg text-white hover:text-yellow cursor-pointer">
                    Share
                  </p>
                </div>
              )}
            </Options>
          </div>
          <Link
            href={`/nft/${item?.contractAddress}/${item?.nftid}`}
            className="w-full relative"
          >
            {cardType === "listed" &&
              item?.status !== "not for sale" &&
              isLoading === false && (
                <div className="absolute bottom-2 right-4">
                  <p className="bold grad-text">On Sale</p>
                </div>
              )}
            <MediaRenderer
              height="233px"
              width="300px"
              style={{
                backgroundColor: nft?.metadata.background_color || "black",
              }}
              className={
                isLoading
                  ? `w-full flex-[3]  rounded-[20px] object-cover animate-pulse`
                  : `w-full flex-[3]  rounded-[20px] object-cover `
              }
              src={nft?.metadata.image}
            />
          </Link>
          <div className="flex flex-1 overflow-hidden justify-between items-center w-full mb-2 px-2">
            <Link href={`/nft/${item?.contractAddress}/${item?.nftid}`}>
              <p className="text-[16px] semibold" onClick={handleNavigate}>
                {item?.nftName}
              </p>
              <div className="text-[#FAC744]  text-[14px] semibold leading-[22px]">
                {isFetchingPrice
                  ? "Loading..."
                  : item?.price
                  ? `${item?.price} BNB`
                  : "NFT not listed"}

                {/* {priceData ? `${priceData} BNB` : "NFT not listed"} */}
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
      </>
      {openListing && (
        <ListingModal item={item} open={openListing} setOpen={setOpenListing} />
      )}
      {openAuction && (
        <AuctionModal item={item} open={openAuction} setOpen={setOpenAuction} />
      )}
      {openUnListing && (
        <UnlistModal
          item={item}
          open={openUnListing}
          setOpen={setOpenUnListing}
        />
      )}
      {openCancelAuction && (
        <CancelAuctionModal
          item={item}
          open={openCancelAuction}
          setOpen={setOpenCancelAuction}
        />
      )}
      {isAuction && (
        <EndAuctionModal
          item={item}
          open={openEndAuction}
          setOpen={setOpenEndAuction}
        />
      )}
      <ShareModal
        openShare={openShare}
        setOpenShare={setOpenShare}
        item={item}
        text={`Check out this ${item?.name} NFT out from Sportrex NFT Marketplace.`}
        url={`https://sportrex-marketplace-18bv.vercel.app/nft/${item?.contractAddress}/${item?.nftId}`}
      />
    </div>
  );
};

export default SingleNftCard;
