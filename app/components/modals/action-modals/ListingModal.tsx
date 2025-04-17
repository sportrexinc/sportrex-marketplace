import React, { Fragment, SetStateAction, useState, useEffect } from "react";
import FixedModal from "../FixedModal";
import TextInput from "../../Inputs/TextInput";
import ProfileSelect from "../../Select/ProfileSelect";
import ActionBtn from "../../Button/ActionBtn";
import { ethers } from "ethers";
import Image from "next/image";
import Link from "next/link";
import dummy from "@/public/assets/general/edit-dummy.png";
import pendingImage from "@/public/assets/general/pending-image.png";
import paymentSuccess from "@/public/assets/general/payment-success.png";
import { contractType, useAddress, useContract } from "@thirdweb-dev/react";
import sptMarketplaceAbi from "@/abi/SptMarketplace.json";
import SPT721Abi from "@/abi/SptERC721.json";
import APIService from "@/app/utils/APIServices";
import errorIcon from "@/public/assets/icons/error-icon.png";
import {
  createThirdwebClient,
  getContract,
  prepareContractCall,
  sendTransaction,
  waitForReceipt,
} from "thirdweb";
import { bscTestnet } from "thirdweb/chains";
import { useActiveAccount } from "thirdweb/react";
const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRD_WEB_CLIENT_ID as string,
});
interface listingProps {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  item: any;
}

const ListingModal = ({ open, setOpen, item }: listingProps) => {
  const [current, setCurrent] = useState<any>("list");
  const [fixedPrice, setFixedPrice] = useState("");
  const [auctionPrice, setAuctionPrice] = useState("");
  const [auctionDuration, setAuctionDuration] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState(1);
  const [isAuction, setIsAuction] = useState(false);
  const parseMetadata = JSON.parse(item.metadata);
  const chain = bscTestnet;

  const wallet = useActiveAccount();
  const address = wallet?.address;
  const daysToSeconds = (days: any) => {
    return days * 24 * 60 * 60;
  };

  const durationData = [
    {
      value: daysToSeconds(1),
      label: "1 day",
      id: 1,
    },
    {
      value: daysToSeconds(3),
      label: "3 day",
      id: 2,
    },
    {
      value: daysToSeconds(5),
      label: "5 day",
      id: 3,
    },
    {
      value: daysToSeconds(7),
      label: "7 day",
      id: 4,
    },
    {
      value: daysToSeconds(10),
      label: "10 day",
      id: 5,
    },
  ];
  const { contract: marketplaceContract } = useContract(
    process.env.NEXT_PUBLIC_SPT_MARKETPLACE,
    sptMarketplaceAbi
  );

  const customContract = getContract({
    client: client,
    chain: chain as any,
    address: process.env.NEXT_PUBLIC_SPT_MARKETPLACE as any,
    abi: sptMarketplaceAbi as any,
  });

  const nftContract = getContract({
    client: client,
    chain: chain as any,
    address: item.token_address as any,
    abi: SPT721Abi as any,
  });
  // const { contract: nftContract } = useContract(item.token_address, SPT721Abi);

  const ipfsGateway = "https://ipfs.io/ipfs/";
  const ipfsUrl = parseMetadata.image.replace("ipfs://", "");
  const httpsImageUrl = `${ipfsGateway}${ipfsUrl}`;

  const handleListNft = async () => {
    console.log(wallet);
    try {
      const ethValue = ethers.utils.parseEther(fixedPrice);
      // await nftContract?.call("approve", [
      //   process.env.NEXT_PUBLIC_SPT_MARKETPLACE,
      //   item.token_id,
      // ]);
      const approveCall = prepareContractCall({
        contract: nftContract,
        method: "approve",
        params: [process.env.NEXT_PUBLIC_SPT_MARKETPLACE, item.token_id],
      });
      await sendTransaction({
        transaction: approveCall,
        account: wallet as any,
      });

      // const data = await marketplaceContract?.call("listNft", [
      //   item.token_address,
      //   item.token_id,
      //   ethValue,
      // ]);

      const liftNFTCall = prepareContractCall({
        contract: customContract,
        method: "listNft",
        params: [item.token_address, item.token_id, ethValue],
      });
      await sendTransaction({
        transaction: liftNFTCall,
        account: wallet as any,
      });

      const metadataString = item?.metadata;
      const metadata = JSON.parse(metadataString);

      const getSingleResponse = await APIService.get(
        `/marketplace/marketplace-collection/${item.token_address}`
      );
      console.log(getSingleResponse);

      const listData = {
        blockChain: "binance-testnet",
        contractAddress: item.token_address,
        price: fixedPrice,
        nftid: item.token_id,
        status: "buy now",
        collectionId: getSingleResponse?.data?.data?._id,
        nftName: metadata?.name,
        collectionName: item?.name,
      };

      const listApiResponse = await APIService.post(
        `/marketplace/list`,
        listData
      );
      console.log(listApiResponse);
      setCurrent("success");
      // console.log(data);
    } catch (error) {
      console.error(error);
      setCurrent("error");
      setOpen(false);
    } finally {
      //setOpen(false);
    }
  };

  const handleAuction = async () => {
    try {
      const data = await marketplaceContract?.call("startAuction", [
        item.token_address,
        item.token_id,
        auctionDuration,
      ]);
      setCurrent("success");
      console.log(data);
    } catch (error) {
      console.error(error);
      setOpen(false);
    }
  };

  const [selected, setSelected] = useState({
    value: "Select Duration",
    label: "Select",
    id: 1,
  });

  const handleSelect = (option: any) => {
    setSelected(option);
    setAuctionDuration(option.value);
  };
  useEffect(() => {
    // if (current === "pending") {
    //   setTimeout(() => {
    //     setCurrent("success");
    //   }, 5000);
    // }
    console.log(item);
  }, [current]);

  const handleNavigation = () => {};
  return (
    <div>
      {open && (
        <FixedModal
          closeModal={() => {
            setCurrent("list");
            setOpen(false);
          }}
          onConfirm={() => console.log("Life")}
          showCloseIcon
          showHeader
        >
          <div key="header">
            {current === "list" && (
              <h2 className="grad-text semibold text-2xl text-center">
                List NFT
              </h2>
            )}
            {/* {current === "auction" && (
              <h2 className="grad-text semibold text-2xl text-center">
                Auction NFT
              </h2>
            )} */}
            {current === "checkout" && (
              <h2 className="grad-text semibold text-2xl text-center">
                Checkout
              </h2>
            )}
            {current === "pending" && (
              <h2 className="grad-text semibold text-2xl text-center max-w-[270px] mx-auto">
                Waiting for Wallet approval
              </h2>
            )}
            {current === "success" && (
              <h2 className="grad-text semibold text-2xl text-center  mx-auto">
                Transaction Successful
              </h2>
            )}
            {current === "error" && (
              <h2 className="grad-text semibold text-2xl text-center  mx-auto">
                Error
              </h2>
            )}
          </div>

          <div key="body">
            <div className="w-full">
              {current === "list" && (
                <div className="w-full flex flex-col">
                  <h1 className="regular text-white text-lg semibold ">
                    Selected type
                  </h1>
                  <div className="w-full gap-8 flex items-center mt-4">
                    <div
                      className={` ${
                        current === "list" ? "box-bordery-active" : "box-border"
                      }  p-[2px] rounded-[8px] `}
                      onClick={() => setCurrent("list")}
                    >
                      <span
                        className="flex justify-center  items-center semibold min-w-[160px] w-[160px] text-white text-lg  h-[111px]  bg-blue-header z-10   cursor-pointer rounded-[8px] "
                        // onClick={() => navigate.push("/single-nft")}
                      >
                        <p className="text-white mx-auto">Fixed Price</p>
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col mt-6">
                    <label
                      htmlFor="price"
                      className="semibold text-white text-lg"
                    >
                      Price
                    </label>
                    <TextInput
                      placeholder={"Enter Listing Price"}
                      label={""}
                      name={""}
                      setValue={(fixedPrice) => setFixedPrice(fixedPrice)}
                    />
                  </div>
                  <div className="w-full mx-auto mt-12">
                    <ActionBtn
                      name="Proceed"
                      action={() => setCurrent("checkout")}
                    />
                  </div>
                </div>
              )}
              {current === "auction" && (
                <div className="w-full flex flex-col">
                  <h1 className="regular text-white text-lg semibold ">
                    Select type
                  </h1>
                  <div className="w-full gap-8 flex items-center mt-4">
                    <div
                      className={` ${
                        current === "list" ? "box-bordery-active" : "box-border"
                      }  p-[2px] rounded-[8px] `}
                      onClick={() => setCurrent("list")}
                    >
                      <span
                        className="flex justify-center  items-center semibold min-w-[160px] w-[160px] text-white text-lg  h-[111px]  bg-blue-header z-10   cursor-pointer rounded-[8px] "
                        // onClick={() => navigate.push("/single-nft")}
                      >
                        <p className="text-white mx-auto">Fixed Price</p>
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col mt-6">
                    {/* <label
                      htmlFor="price"
                      className="semibold text-white text-lg"
                    >
                      Start Price
                    </label>
                    <TextInput
                      placeholder={"Enter Start Price"}
                      label={""}
                      name={""}
                      setValue={(auctionPrice) => {
                        setAuctionPrice(auctionPrice);
                        console.log(auctionPrice);
                      }}
                    /> */}

                    <label
                      htmlFor="price"
                      className="semibold text-white text-lg mt-4 mb-3"
                    >
                      Time Duration
                    </label>
                    <ProfileSelect
                      selected={selected}
                      setSelected={handleSelect}
                      isOpen={isOpen}
                      setIsOpen={setIsOpen}
                      setActive={setActive}
                      data={durationData}
                      name=""
                    />
                  </div>
                  <div className="w-full mx-auto mt-12">
                    <ActionBtn
                      name="Auction"
                      action={() => {
                        setCurrent("checkout");
                        //handleListNft();
                        console.log(auctionDuration);
                      }}
                    />
                  </div>
                </div>
              )}
              {current === "checkout" && (
                <div className="w-full flex flex-col">
                  <div className="w-full flex items-center gap-4 lg:gap-8">
                    <div className="w-4/12">
                      <Image
                        src={httpsImageUrl}
                        alt="NFT Image"
                        width={100}
                        height={0}
                        className="max-w-[146px] max-h-[138px] w-full h-auto object-cover"
                      />
                    </div>
                    <div className="flex flex-col gap-3">
                      <p className="regular text-[#ABABAB] text-sm">1 Item</p>

                      <p className="regular text-white font-semibold text-xl semibold">
                        {parseMetadata?.name}
                      </p>
                      <div className="flex items-center gap-3">
                        <p className="regular text-yellow text-lg">
                          {isAuction
                            ? auctionPrice
                              ? `${auctionPrice} BNB`
                              : ""
                            : fixedPrice
                            ? `${fixedPrice} BNB`
                            : "NAN BNB"}
                        </p>{" "}
                        {/* <p className="regular text-[#ABABAB] text-sm">
                          $15,000
                        </p> */}
                      </div>
                    </div>
                  </div>
                  <div className="w-full flex justify-between items-center mt-10">
                    <p className="regular text-white font-semibold text-xl semibold">
                      Sub-Total
                    </p>
                    <div className="flex items-center justify-end w-fit">
                      <p className="regular text-yellow text-lg">
                        {" "}
                        {isAuction
                          ? auctionPrice
                            ? `${auctionPrice} BNB`
                            : ""
                          : fixedPrice
                          ? `${fixedPrice} BNB`
                          : "NAN BNB"}
                      </p>{" "}
                      {/* <p className="regular text-[#ABABAB] text-lg">$15,000</p> */}
                    </div>
                  </div>
                  <div className="w-full mx-auto mt-12">
                    <ActionBtn
                      name={"List Now"}
                      action={() => {
                        setCurrent("pending");
                        handleListNft();
                      }}
                    />
                  </div>
                </div>
              )}
              {current === "pending" && (
                <div className="w-full flex flex-col items-center gap-6">
                  <Image
                    src={pendingImage}
                    alt="pending "
                    className="animate-spin mx-auto"
                  />
                  <p className="regular text-white text-[18px] leading-[30px] max-w-[320px] mx-auto text-center  ">
                    We are approving the transaction, please wait for the
                    confirmation
                  </p>
                  <p className="text-[#ababab] regular text-sm">
                    Blockchain confirmation in process
                  </p>
                </div>
              )}
              {current === "success" && (
                <div className="w-full flex flex-col items-center gap-6">
                  <Image
                    src={paymentSuccess}
                    alt="pending "
                    className=" mx-auto"
                  />
                  <p className="regular text-white text-[18px] leading-[30px] max-w-[320px] mx-auto text-center  ">
                    Transaction approved
                  </p>
                  <div className="w-full mx-auto mt-12">
                    <Link
                      className="flex items-center rounded-[10px] justify-center  sm:text-[16px] light bg-blue-btn text-white px-4 py-2  w-full md:py-4 h-[40px] md:h-auto cursor-pointer semibold text-[10px] min-w-max}"
                      href={`/nft/${item.token_address}/${item.token_id}`}
                    >
                      View NFT
                    </Link>
                    {/* <ActionBtn
                      name="View Nft"
                      action={() => {
                        setCurrent("list");
                        setOpen(false);
                      }}
                    /> */}
                  </div>
                </div>
              )}
              {current === "error" && (
                <div className="w-full flex flex-col items-center gap-6">
                  <Image src={errorIcon} alt="pending " className=" mx-auto" />
                  <p className="regular text-white text-[18px] leading-[30px] max-w-[320px] mx-auto text-center  ">
                    Transaction Failed
                  </p>
                  <p className="text-sm regular text-white">
                    Oops, Something went wrong try again later.
                  </p>
                  <div className="w-full mx-auto mt-12">
                    {/* <Link
                      className="flex items-center rounded-[10px] justify-center  sm:text-[16px] light bg-blue-btn text-white px-4 py-2  w-full md:py-4 h-[40px] md:h-auto cursor-pointer semibold text-[10px] min-w-max}"
                      href={`/nft/${item.token_address}/${item.token_id}`}
                    >
                      View NFT
                    </Link> */}
                    <ActionBtn
                      name="Retry"
                      action={() => {
                        setCurrent("list");
                        setOpen(false);
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div key="footer">
            <p>Footer content goes here.</p>
          </div>
        </FixedModal>
      )}
    </div>
  );
};

export default ListingModal;
