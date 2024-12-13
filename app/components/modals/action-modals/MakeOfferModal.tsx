import React, { SetStateAction, useState, useEffect } from "react";
import FixedModal from "../FixedModal";
import { useParams, useRouter } from "next/navigation";
import ActionBtn from "../../Button/ActionBtn";
import { ethers } from "ethers";
import Image from "next/image";
import Link from "next/link";
import sptIcon from "@/public/assets/svg/spt-coin.svg";
import pendingImage from "@/public/assets/general/pending-image.png";
import paymentSuccess from "@/public/assets/general/payment-success.png";
import { useContract } from "@thirdweb-dev/react";
import sptMarketplaceAbi from "@/abi/SptMarketplace.json";
import SPT721Abi from "@/abi/SptERC721.json";
import errorIcon from "@/public/assets/icons/error-icon.png";
interface listingProps {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  item: any;
}

const MakeOfferModal = ({ open, setOpen, item }: listingProps) => {
  const [current, setCurrent] = useState<any>("offer");
  const [fixedPrice, setFixedPrice] = useState("");
  const [auctionPrice, setAuctionPrice] = useState("");
  const [auctionDuration, setAuctionDuration] = useState(0);
  const [makingOffer, setMakingOffer] = useState(false);
  const parseMetadata = JSON.parse(item.metadata);

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
  const [offerPrice, setOfferPrice] = useState<any>();
  const [errorMessage, setErrorMessage] = useState("")
  const [priceDataWei, setPriceDataWei] = useState<any>();
  const ipfsGateway = "https://ipfs.io/ipfs/";
  const ipfsUrl = parseMetadata.image.replace("ipfs://", "");
  const httpsImageUrl = `${ipfsGateway}${ipfsUrl}`;
  const params = useParams();
  const address = params.contractId;
  const tokenId = params.nftId;
  const handleListNft = async () => {
    try {
      const ethValue = ethers.utils.parseEther(fixedPrice);
      await nftContract?.call("approve", [
        process.env.NEXT_PUBLIC_SPT_MARKETPLACE,
        item.token_id,
      ]);
      const data = await marketplaceContract?.call("listNft", [
        item.token_address,
        item.token_id,
        ethValue,
      ]);
      setCurrent("success");
      console.log(data);
    } catch (error) {
      console.error(error);
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

  const handleMakeOffer = async () => {
    try {
      const data = await marketplaceContract?.call(
        "bid",
        [address, tokenId, offerPrice]
        //   {
        //   value: offerPrice,
        // }
      );
      console.log("Bidding NFT: ", data);
      setCurrent("success");
    } catch (error: any) {
      const reason =
        error?.reason || error?.data?.message || "An unexpected error occurred";
      console.log("Error bidding NFT: ", error);
      setErrorMessage(reason)
      setCurrent("error");
      //setOpen(false);
    }
  };

  useEffect(() => {
    // if (current === "pending") {
    //   setTimeout(() => {
    //     setCurrent("success");
    //   }, 5000);
    // }
    console.log(item);
  }, [current]);
  return (
    <div>
      {open && (
        <FixedModal
          closeModal={() => {
            setCurrent("offer");
            setOpen(false);
          }}
          onConfirm={() => console.log("Life")}
          showCloseIcon
          showHeader
        >
          <div key="header">
            {current === "offer" && (
              <h2 className="grad-text semibold text-2xl text-center">
                Make an Offer
              </h2>
            )}
            {current === "auction" && (
              <h2 className="grad-text semibold text-2xl text-center">
                Auction NFT
              </h2>
            )}
            {current === "checkout" && (
              <h2 className="grad-text semibold text-2xl text-center">
                You are Offering
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
              {current === "offer" && (
                <div className="w-full flex flex-col">
                  <h1 className="regular text-white text-lg semibold ">
                    Select type
                  </h1>

                  <div className="flex flex-col mt-6">
                    <label
                      htmlFor="price"
                      className="semibold text-white text-lg mb-3"
                    >
                      Your Price
                    </label>
                    <div className="w-full h-12 rounded-[8px] bg-[#ababab] bg-opacity-10 flex items-center ">
                      <div className="flex items-center h-12 border-r border-r-[#ababab] justify-center gap-3 px-4">
                        <span>
                          <Image
                            src={sptIcon}
                            alt="spt"
                            className="w-6 h-6 rounded-full"
                          />
                        </span>
                        <p className="text-white semibold  ">SPT</p>
                      </div>
                      <input
                        type="number"
                        required
                        className="flex flex-grow px-4 h-12 bg-transparent border-none outline-none focus:outline-none text-white regular placeholder:text-[#ababab]"
                        placeholder="Enter price"
                        onChange={(e) => setOfferPrice(e.target.value)}
                      />
                    </div>
                  </div>
                  {/* <div className="flex flex-col mt-6">
                    <label
                      htmlFor="bid"
                      className="semibold text-white text-lg mb-3"
                    >
                      Bid Expires after
                    </label>
                    <div className="w-full h-12 rounded-[8px] bg-[#ababab] bg-opacity-10 flex items-center ">
                      <div className="flex items-center h-12 border-r border-r-[#ababab] justify-center gap-3 px-4">
                        <p className="text-white semibold  ">5 Days</p>
                      </div>
                      <div className="flex">
                        <input
                          type="time"
                          className="flex flex-grow px-4 h-12 bg-transparent border-none outline-none focus:outline-none text-white regular placeholder:text-[#ababab]  "
                          placeholder="Enter price"
                        />
                      </div>
                    </div>
                  </div> */}
                  <p className="text-grey-800 text-xs semibold text-center mx-auto w-full max-w-[433px] mt-10">
                    All transactions are placed in SPT, system automatically
                    convert your crypocurrency to SPT. Please review the
                    conversion summary below.
                  </p>

                  <div className="flex mt-8 items-center justify-evenly max-w-[360px] mx-auto w-full">
                    <p className="semibold text-white">1SPT</p>
                    <p className="semibold text-white">=</p>
                    <p className="semibold text-white">0.5ETH</p>
                    <p className="semibold text-white">=</p>
                    <p className="semibold text-white">$300</p>
                  </div>
                  <div className="w-full mx-auto mt-12">
                    <ActionBtn
                      name="Make an Offer"
                      action={() => setCurrent("checkout")}
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
                          {offerPrice} BNB
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
                        {offerPrice} BNB
                      </p>{" "}
                      {/* <p className="regular text-[#ABABAB] text-lg">$15,000</p> */}
                    </div>
                  </div>

                  <div className="w-full mx-auto mt-12">
                    <ActionBtn
                      name={"Continue"}
                      action={() => {
                        setCurrent("pending");
                        handleMakeOffer();
                        // {
                        //   isAuction ? handleAuction() : handleListNft();
                        // }
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
                        setCurrent("offer");
                        setOpen(false);
                      }}
                    /> */}
                  </div>
                </div>
              )}
              {current === "error" && (
                <div className="w-full flex flex-col items-center gap-2">
                  <Image src={errorIcon} alt="pending " className="w-[100px] mx-auto" />
                  <p className="regular text-white text-[18px] leading-[30px] max-w-[320px] mx-auto text-center  ">
                    Transaction Failed
                  </p>
                  <p className="text-sm regular text-white">
                    {errorMessage}
                  </p>
                  <div className="w-full mx-auto mt-5">
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

export default MakeOfferModal;
