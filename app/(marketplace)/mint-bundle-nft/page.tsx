import React, { useState } from "react";
import ParentLayout from "@/app/layouts/ParentLayout";
import dummy from "@/public/assets/general/edit-dummy.png";
import nodata from "@/public/assets/general/nodata.svg";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { linksArrayA } from "@/app/constants/IconsData";
import one from "@/public/assets/market/one.png";
import two from "@/public/assets/market/two.png";
import three from "@/public/assets/market/three.png";
import four from "@/public/assets/market/four.png";
import {
  YellowActionBtn,
  ActionBtn,
  GeneralAccordion,
  Tables,
  MarketList,
} from "@/app/components";
import { useRouter } from "next/navigation";
import Image from "next/image";

const styles = {
  icon: "w-[32px] sm:w-[40px] h-auto  ",
};

const BundleMintNft = () => {
  const [liked, setLiked] = useState(false);

  const naviagte = useRouter();
  const handleMintModal = () => {
    console.log("hey");
  };
  const Edit = () => {
    naviagte.push("/edit-nft");
  };
  const [pD, setPd] = useState<boolean>(true);
  const [aP, setaP] = useState<boolean>(true);
  const [details, setDetails] = useState<boolean>(true);
  const [pA, setPA] = useState<boolean>(true);
  const [offers, setOffers] = useState<boolean>(true);
  const [listing, setListing] = useState<boolean>(true);
  const [events, setEvents] = useState<boolean>(true);

  return (
    <div>
      <ParentLayout current={2}>
        <div className="w-full flex flex-col my-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:space-x-8 ">
            <div className="w-full md:w-6/12  lg:w-4/12 flex flex-col">
              <Image src={dummy} alt="use" className="w-full h-auto" />
              <div className="flex justify-between items-center w-full mt-4 space-x-4">
                <Image src={one} alt="sd" className="w-24 h-auto" />
                <Image src={two} alt="sd" className="w-24 h-auto" />
                <Image src={three} alt="sd" className="w-24 h-auto" />
                <Image src={four} alt="sd" className="w-24 h-auto" />
              </div>
            </div>
            <div className="w-full md:w-6/12  lg:w-7/12 flex items-start">
              <div className="flex flex-col  w-full ">
                <div className="flex justify-between">
                  <p className="mt-4 text-white semibold text-lg regular">
                    Painter #23535
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
                <div className="flex space-x-1 mt-4">
                  <p className="text-grey-800 text-base regular regular">
                    Owned by
                  </p>
                  <p className="text-yellow opacity-80 text-base regular regular">
                    Daniekeys
                  </p>
                </div>
                <p className="text-md text-grey-800 regular  mt-2">
                  2000 items sold
                </p>
                <p className="mt-12 text-grey-800 regular text-md">Price</p>
                <p className="mt-2 grad-text text-lg regular bold">
                  0.5343 SPT
                </p>
                <div className="mt-20 flex space-x-8 items-center w-full">
                  <div className="w-3/12">
                    <ActionBtn
                      name="Buy Bundle  now"
                      action={handleMintModal}
                    />
                  </div>

                  <div className=" w-3/12">
                    <YellowActionBtn name="Make an offer" action={Edit} />
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
              <GeneralAccordion
                open={pD}
                title="Product Description"
                setOpen={setPd}
              >
                <div className="flex">
                  <p className="text-white regular">
                    Lorem ipsum dolor sit amet, consectetur adi Lorem ipsum
                    dolor sit amet, consectetur adi Lorem ipsum dolor sit amet,
                    consectetur adi Lorem ipsum dolor sit amet, consectetur adi
                    Lorem ipsum dolor sit amet, consectetur adi Lorem ipsum
                    dolor sit amet, consectetur adi
                  </p>
                </div>
              </GeneralAccordion>
              <GeneralAccordion open={aP} title="About Painter" setOpen={setaP}>
                <div className="flex">
                  <p className="text-white regular">
                    Lorem ipsum dolor sit amet, consectetur adi Lorem ipsum
                    dolor sit amet, consectetur adi Lorem ipsum dolor sit amet,
                    consectetur adi Lorem ipsum dolor sit amet, consectetur adi
                    Lorem ipsum dolor sit amet, consectetur adi Lorem ipsum
                    dolor sit amet, consectetur adi
                  </p>
                </div>
              </GeneralAccordion>
              <GeneralAccordion
                open={details}
                title="Details"
                setOpen={setDetails}
              >
                <div className="flex flex-col space-y-4">
                  <div className="flex justify-between">
                    <p className="text-base regular text-white w-6/12">
                      Contract Address
                    </p>
                    <p className=" text-grey-800 text-md w-4/12 truncate">
                      45sds5d5ww5dsd5s45yeyrehfhkfhdif
                    </p>
                  </div>
                  <div className="flex justify-between regular">
                    <p className="text-base regular text-white w-6/12">
                      Token Id
                    </p>
                    <p className=" text-grey-800 text-md w-4/12 truncate text-end">
                      45sds5d
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-base regular text-white w-6/12">
                      Token Standard
                    </p>
                    <p className=" text-grey-800 text-md w-4/12 truncate text-end">
                      45sds53
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-base regular text-white w-6/12">
                      Blockchain
                    </p>
                    <p className=" text-grey-800 text-md w-4/12 truncate text-end">
                      Sportrex
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-base regular text-white w-6/12">
                      Metadata
                    </p>
                    <p className=" text-grey-800 text-md w-4/12 truncate text-end ">
                      Editable
                    </p>
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
            <MarketList title="More from this owner" />
          </div>
        </div>
      </ParentLayout>
    </div>
  );
};

export default BundleMintNft;
