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

const AuctionModal = ({ open, setOpen, item }: listingProps) => {
  const [current, setCurrent] = useState<any>("auction");
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
  const { contract: nftContract } = useContract(item.token_address, SPT721Abi);

  const ipfsGateway = "https://ipfs.io/ipfs/";
  const ipfsUrl = parseMetadata.image.replace("ipfs://", "");
  const httpsImageUrl = `${ipfsGateway}${ipfsUrl}`;

  const handleAuction = async () => {
    const customContract = getContract({
      client: client,
      chain: chain as any,
      address: process.env.NEXT_PUBLIC_SPT_MARKETPLACE as any,
      abi: sptMarketplaceAbi as any,
    });
    try {
      // const data = await marketplaceContract?.call("startAuction", [
      //   item.token_address,
      //   item.token_id,
      //   auctionDuration,
      // ]);

      const auctionCall = prepareContractCall({
        contract: customContract,
        method: "startAuction",
        params: [item.token_address, item.token_id, auctionDuration],
      });
      const { transactionHash } = await sendTransaction({
        transaction: auctionCall,
        account: wallet as any,
      });

      setCurrent("success");
      console.log(transactionHash);
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
            setCurrent("auction");
            setOpen(false);
          }}
          onConfirm={() => console.log("Life")}
          showCloseIcon
          showHeader
        >
          <div key="header">
            {current === "auction" && (
              <h2 className="grad-text semibold text-2xl text-center">
                Auction NFT
              </h2>
            )}
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
              {current === "auction" && (
                <div className="w-full flex flex-col">
                  <h1 className="regular text-white text-lg semibold ">
                    Selected type
                  </h1>
                  <div className="w-full gap-8 flex items-center mt-4">
                    <div
                      className={` ${
                        current === "auction"
                          ? "box-bordery-active"
                          : "box-border"
                      }  p-[2px] rounded-[8px] `}
                      onClick={() => setCurrent("auction")}
                    >
                      <span
                        className="flex justify-center  items-center semibold min-w-[160px] w-[160px] text-white text-lg  h-[111px]  bg-blue-header z-10   cursor-pointer rounded-[8px] "
                        // onClick={() => navigate.push("/single-nft")}
                      >
                        <p className="text-white mx-auto">Auction</p>
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
                      {httpsImageUrl?.includes("MP4") ? (
                        <video
                          src={httpsImageUrl}
                          autoPlay
                          muted
                          loop
                          className="w-full h-[100px]"
                        />
                      ) : (
                        <Image
                          src={httpsImageUrl}
                          alt="NFT Image"
                          className="max-w-[146px] max-h-[138px] w-full h-auto object-cover"
                          width={100}
                          height={0}
                        />
                      )}
                    </div>
                    <div className="flex flex-col gap-3">
                      <p className="regular text-[#ABABAB] text-sm">1 Item</p>

                      <p className="regular text-white font-semibold text-xl semibold">
                        {parseMetadata?.name}
                      </p>
                    </div>
                  </div>

                  <div className="w-full mx-auto mt-12">
                    <ActionBtn
                      name={`Auction Now`}
                      action={() => {
                        setCurrent("pending");
                        handleAuction();
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
                        setCurrent("auction");
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

export default AuctionModal;
