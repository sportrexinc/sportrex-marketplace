import React, { Fragment, SetStateAction, useState, useEffect } from "react";
import FixedModal from "../FixedModal";
import TextInput from "../../Inputs/TextInput";
import ProfileSelect from "../../Select/ProfileSelect";
import ActionBtn from "../../Button/ActionBtn";
import Image from "next/image";
import dummy from "@/public/assets/general/edit-dummy.png";
import pendingImage from "@/public/assets/general/pending-image.png";
import paymentSuccess from "@/public/assets/general/payment-success.png";

interface listingProps {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  item: any;
}

const durationData = [
  {
    value: "1 day",
    label: "1 day",
    id: 1,
  },
  {
    value: "3 day",
    label: "3 day",
    id: 2,
  },
  {
    value: "5 day",
    label: "5 day",
    id: 3,
  },
  {
    value: "7 day",
    label: "7 day",
    id: 3,
  },
  {
    value: "10 day",
    label: "10 day",
    id: 3,
  },
];
const ListingModal = ({ open, setOpen, item }: listingProps) => {
  const [current, setCurrent] = useState<any>("list");
  const [fixedPrice, setFixedPrice] = useState(0);
  const [auctionPrice, setAuctionPrice] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState(1);
  const [selected, setSelected] = useState({
    value: "Select Duration",
    label: "Select",
    id: 1,
  });
  useEffect(() => {
    if (current === "pending") {
      setTimeout(() => {
        setCurrent("success");
      }, 5000);
    }
    console.log(item);
  }, [current]);

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
                Waiting for payment approval
              </h2>
            )}
            {current === "success" && (
              <h2 className="grad-text semibold text-2xl text-center  mx-auto">
                Payment Successful
              </h2>
            )}
          </div>

          <div key="body">
            <div className="w-full">
              {current === "list" && (
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
                    <label
                      htmlFor="price"
                      className="semibold text-white text-lg"
                    >
                      Price
                    </label>
                    <TextInput
                      placeholder={"enter price"}
                      label={""}
                      name={""}
                      setValue={(e: any) => setFixedPrice(e?.target?.value)}
                    />
                    <label
                      htmlFor="price"
                      className="semibold text-white text-lg mt-4 mb-3"
                    >
                      Time Duration
                    </label>
                    <ProfileSelect
                      selected={selected}
                      setSelected={setSelected}
                      isOpen={isOpen}
                      setIsOpen={setIsOpen}
                      setActive={setActive}
                      data={durationData}
                      name=""
                    />
                  </div>
                  <div className="w-full mx-auto mt-12">
                    <ActionBtn
                      name="List"
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
                    <label
                      htmlFor="price"
                      className="semibold text-white text-lg"
                    >
                      Start Price
                    </label>
                    <TextInput
                      placeholder={"enter price"}
                      label={""}
                      name={""}
                      setValue={(e: any) => setFixedPrice(e?.target?.value)}
                    />
                    <label
                      htmlFor="price"
                      className="semibold text-white text-lg mt-4 mb-3"
                    >
                      Time Duration
                    </label>
                    <ProfileSelect
                      selected={selected}
                      setSelected={setSelected}
                      isOpen={isOpen}
                      setIsOpen={setIsOpen}
                      setActive={setActive}
                      data={durationData}
                      name=""
                    />
                  </div>
                  <div className="w-full mx-auto mt-12">
                    <ActionBtn name="Auction" />
                  </div>
                </div>
              )}
              {current === "checkout" && (
                <div className="w-full flex flex-col">
                  <div className="w-full flex items-center gap-4 lg:gap-8">
                    <div className="w-4/12">
                      <Image
                        src={dummy}
                        alt="dummy"
                        className="max-w-[146px] max-h-[138px] w-full h-auto "
                      />
                    </div>
                    <div className="flex flex-col gap-3">
                      <p className="regular text-[#ABABAB] text-sm">
                        677 Items
                      </p>
                      <p className="regular text-white font-semibold text-xl semibold">
                        Grafitti Kollectionz
                      </p>
                      <div className="flex items-center gap-3">
                        <p className="regular text-yellow text-lg">
                          0.0532 SPT
                        </p>{" "}
                        <p className="regular text-[#ABABAB] text-sm">
                          $15,000
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full flex justify-between items-center mt-10">
                    <p className="regular text-white font-semibold text-xl semibold">
                      Sub-Total
                    </p>
                    <div className="flex items-center justify-end w-fit">
                      <p className="regular text-yellow text-lg">0.0532 SPT</p>{" "}
                      <p className="regular text-[#ABABAB] text-lg">$15,000</p>
                    </div>
                  </div>
                  <div className="w-full mx-auto mt-12">
                    <ActionBtn
                      name="Buy now"
                      action={() => setCurrent("pending")}
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
                    <ActionBtn
                      name="View Nft"
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
