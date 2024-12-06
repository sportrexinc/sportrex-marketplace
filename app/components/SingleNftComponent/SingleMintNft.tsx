"use client";
import sptMarketplaceAbi from "@/abi/SptMarketplace.json";
import {
  ActionBtn,
  GeneralAccordion,
  MarketList,
  Tables,
  YellowActionBtn,
} from "@/app/components";
import { linksArrayA } from "@/app/constants/IconsData";
import ParentLayout from "@/app/layouts/ParentLayout";
import { getSingleNftDetail } from "@/app/redux/features/auth/MyNftSlice";
import { useAppDispatch } from "@/app/redux/store";
import nodata from "@/public/assets/general/nodata.svg";
import { useContract } from "@thirdweb-dev/react";
import { Skeleton } from "antd";
import { ethers } from "ethers";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import MakeOfferModal from "../modals/action-modals/MakeOfferModal";
import { toast } from "react-toastify";
const styles = {
  icon: "w-[32px] sm:w-[40px] h-auto  ",
};

const SingleMintNft = () => {
  const [liked, setLiked] = useState(false);

  const navigate = useRouter();

  const dispatch = useAppDispatch();
  const [data, setData] = useState<any>({});
  const [priceData, setPriceData] = useState<any>();
  const [priceDataWei, setPriceDataWei] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [isAuction, setIsAuction] = useState(false);
  const [nftImage, setNftImage] = useState("");
  const [openOffer, setOpenOffer] = useState(false);
  const params = useParams();
  const address = params.contractId;
  const tokenId = params.nftId;
  const { contract: marketplaceContract } = useContract(
    process.env.NEXT_PUBLIC_SPT_MARKETPLACE,
    sptMarketplaceAbi
  );

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    const { payload } = await dispatch(
      getSingleNftDetail({ address: address, tokenId: tokenId })
    );

    if (payload) {
      setData(payload?.data);
      const ipfsGateway = "https://ipfs.io/ipfs/";
      const ipfsUrl = payload?.data?.normalized_metadata?.image.replace(
        "ipfs://",
        ""
      );
      const httpsImageUrl = `${ipfsGateway}${ipfsUrl}`;
      setNftImage(httpsImageUrl);
    }

    setIsLoading(false);
  }, [address, tokenId, dispatch]);

  const handleGetPrice = async () => {
    try {
      const getPriceData = await marketplaceContract?.call("getPrice", [
        address,
        tokenId,
      ]);
      const priceInWei = ethers.utils.formatEther(getPriceData);
      setPriceData(priceInWei);
      setPriceDataWei(getPriceData);
    } catch (error) {
      console.log("Error fetching price: ", error);
    }
  };

  const handleAuctionState = async () => {
    try {
      const auctionState = await marketplaceContract?.call("getAuctionState", [
        address,
        tokenId,
      ]);
      console.log("Auction state: ", auctionState);
      setIsAuction(auctionState);
    } catch (error) {
      console.log("Error fetching auction state: ", error);
    }
  };

  useEffect(() => {
    fetchData();
    handleGetPrice();
    handleAuctionState();
  }, [fetchData]);

  console.log(data);
  console.log(priceData);
  console.log(isAuction);
  const handleBuyCollectionNFT = async () => {
    try {
      const data = await marketplaceContract?.call(
        "buy_coll_token",
        [address, tokenId],
        { value: priceDataWei }
      );
      console.log("Buy NFT: ", data);
    } catch (error) {
      console.log("Error buying NFT: ", error);
    }
  };
  const handleMintModal = () => {
    console.log("hey");
    toast.info("I am the modal for the fulles");
  };
  const Edit = () => {
    navigate.push("/edit-nft");
  };
  const [pD, setPd] = useState(true);
  const [aP, setaP] = useState(true);
  const [details, setDetails] = useState(true);
  const [pA, setPA] = useState(true);
  const [offers, setOffers] = useState(true);
  const [listing, setListing] = useState(true);
  const [events, setEvents] = useState(true);
  const truncateMiddle = (text: string, length: number) => {
    if (typeof text !== "string") return text;
    if (text.length <= length) return text;
    const halfLength = Math.floor((length - 3) / 2);
    if (halfLength < 0) return text;

    return `${text.slice(0, halfLength)}...${text.slice(-halfLength)}`;
  };

  return (
    <div>
      <ParentLayout current={2}>
        <div className="w-full flex flex-col my-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:space-x-8 ">
            <div className="w-full md:w-6/12  lg:w-4/12 flex flex-col ">
              {isLoading ? (
                <Skeleton.Image
                  active={true}
                  className="w-full h-auto rounded-[16px]"
                  style={{
                    width: "100%",
                    height: "400px",
                    borderRadius: "16px",
                  }}
                />
              ) : (
                <Image
                  src={nftImage}
                  alt="NFT Image"
                  className="w-full h-auto rounded-[16px]"
                  width={100}
                  height={100}
                />
              )}

              {/* Commented Out the Flex */}
              {/* <div className="flex  items-center w-full mt-4 gap-4">
                <Image src={one} alt="sd" className="w-24 h-auto" />
                <Image src={two} alt="sd" className="w-24 h-auto" />
                <Image src={three} alt="sd" className="w-24 h-auto" />
              </div> */}
            </div>
            <div className="w-full md:w-6/12  lg:w-7/12 flex items-start">
              <div className="flex flex-col  w-full ">
                <div className="flex justify-between">
                  <p className="mt-4 text-white semibold text-lg regular">
                    {/* {collection?.name} */}
                  </p>
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
                    <p className="regular text-grey-800">23</p>
                  </div>
                </div>
                <div className="flex space-x-5 mt-4">
                  <p className="text-grey-800 text-base regular regular">
                    Owned by:
                  </p>
                  <p className="text-yellow opacity-80 text-base regular regular">
                    {truncateMiddle(data?.owner_of, 18)}
                  </p>
                </div>
                <div className="flex space-x-5 mt-4">
                  <p className="text-grey-800 text-base regular regular">
                    Collection Name:
                  </p>
                  <p className="text-yellow capitalize opacity-80 text-base regular regular">
                    {data?.name}
                  </p>
                </div>
                <div className="flex space-x-5 mt-4">
                  <p className="text-grey-800 text-base regular regular">
                    NFT Name:
                  </p>
                  <p className="text-yellow capitalize opacity-80 text-base regular regular">
                    {data?.normalized_metadata?.name}
                  </p>
                </div>
                <p className="text-md text-grey-800 regular  mt-2">
                  2000 items sold
                </p>
                <p className="mt-12 text-grey-800 regular text-md">Price</p>
                <p className="mt-2 grad-text text-lg regular bold">
                  {priceData ? `${priceData} BNB` : "NFT not Listed"}
                </p>
                <div className="mt-20 flex space-x-8 items-center w-full">
                  <div className="w-3/12">
                    <ActionBtn name="Buy now" action={handleBuyCollectionNFT} />
                  </div>

                  <div className=" w-3/12">
                    {isAuction ? (
                      <YellowActionBtn
                        name="Make an offer"
                        action={() => setOpenOffer(true)}
                      />
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <p className="mt-4 regular text-base regular text-grey-800">
                  Sale ends April 12, 2022 at 6:50pm WAT
                </p>
                <div className="mt-12 flex flex-col ">
                  <p className="text-white regular">share on social media</p>
                  <div className="w-full lg:w-full flex mt-4  mb-4 sm:space-x-8  lg:space-x-4">
                    {linksArrayA.map((item, index) => {
                      return (
                        <a
                          href={item.link}
                          target="_blank"
                          key={index}
                          rel="noopener noreferrer"
                        >
                          <abbr title={`${item.name}`}>
                            <Image
                              src={item.icon}
                              alt="icons"
                              className={styles.icon}
                            />
                          </abbr>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* spliter session */}
          <div className="flex flex-col md:flex-row md:space-x-8 mt-10">
            {/* left */}
            <div className="left w-full flex flex-col space-y-8 lg:space-y-12 md:w-6/12  lg:w-4/12">
              <GeneralAccordion open={pD} title="Description" setOpen={setPd}>
                <div className="flex">
                  <p className="text-white regular">
                    {data?.normalized_metadata?.description}
                  </p>
                </div>
              </GeneralAccordion>
              <GeneralAccordion
                open={aP}
                title={`${data?.normalized_metadata?.name} Traits`}
                setOpen={setaP}
              >
                <div className="flex">
                  {data?.normalized_metadata?.attributes?.length > 0
                    ? data.normalized_metadata.attributes
                    : "No Traits Uploaded"}
                </div>
              </GeneralAccordion>
              <GeneralAccordion
                open={details}
                title={`Details ${data?.normalized_metadata?.name}`}
                setOpen={setDetails}
              >
                <div className="flex flex-col space-y-4">
                  <div className="flex justify-between">
                    <p className="text-base regular text-white w-6/12">
                      Contract Address
                    </p>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://testnet.bscscan.com/token/${data?.token_address}`}
                      className=" text-grey-800 text-md w-4/12 truncate"
                    >
                      {data?.token_address}
                    </a>
                  </div>
                  <div className="flex justify-between regular">
                    <p className="text-base regular text-white w-6/12">
                      Token Id
                    </p>
                    <p className=" text-grey-800 text-md w-4/12 truncate text-end">
                      {data?.token_id}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-base regular text-white w-6/12">
                      Token Standard
                    </p>
                    <p className=" text-grey-800 text-md w-4/12 truncate text-end">
                      {data?.contract_type}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-base regular text-white w-6/12">
                      Blockchain
                    </p>
                    <p className=" text-grey-800 text-md w-4/12 truncate text-end">
                      BSC-Testnet
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-base regular text-white w-6/12">
                      Metadata
                    </p>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`${data?.token_uri}`}
                      className=" text-grey-800 text-md w-4/12 truncate text-end "
                    >
                      {data?.token_uri}
                    </a>
                  </div>
                </div>
              </GeneralAccordion>
            </div>
            {/* right part */}
            <div className="right w-full flex flex-col space-y-8 lg:space-y-12 md:w-6/12  lg:w-8/12">
              <GeneralAccordion
                open={pA}
                title="Price Analytics"
                setOpen={setPA}
              >
                <div className="w-full h-40 flex justify-center items-center">
                  <div className="flex-col space-y-2">
                    <Image
                      src={nodata}
                      alt="this is "
                      className="w-7/12 h-auto mx-auto"
                    />
                    <p className="text-white text-base regular regular text-center">
                      No Price Analytics
                    </p>
                  </div>
                </div>
              </GeneralAccordion>
              <GeneralAccordion
                open={offers}
                title="Offers"
                setOpen={setOffers}
              >
                <Tables />
              </GeneralAccordion>
              <GeneralAccordion
                open={listing}
                title="Listings"
                setOpen={setListing}
              >
                <Tables />
              </GeneralAccordion>
            </div>
          </div>
          {/* event part  */}
          <div className="w-full mt-12">
            <GeneralAccordion open={events} title="Events" setOpen={setEvents}>
              <Tables />
            </GeneralAccordion>
          </div>
          <div className="my-12 w-full">
            <MarketList title="More from this Collection" />
          </div>
        </div>
      </ParentLayout>
      {openOffer && (
        <MakeOfferModal item={data} open={openOffer} setOpen={setOpenOffer} />
      )}
    </div>
  );
};

export default SingleMintNft;
