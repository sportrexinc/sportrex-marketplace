"use client"
import React, { useState } from "react";
import ParentLayout from "@/app/layouts/ParentLayout";
import dummy from "@/public/assets/general/edit-dummy.png";
import nodata from "@/public/assets/general/nodata.svg";
import { YellowActionBtn, ActionBtn, GeneralAccordion } from "@/app/components";
import { useRouter } from "next/navigation";
import Image from "next/image";
const MintNft = () => {
  const navigate = useRouter();
  const handleMintModal = () => {
    console.log("hey");
  };
  const Edit = () => {
    navigate.push("/edit-nft");
  };
  const [pD, setPd] = useState(false);
  const [aP, setaP] = useState(false);
  const [details, setDetails] = useState(false);
  const [pA, setPA] = useState(false);
  const [offers, setOffers] = useState(false);
  const [listing, setListing] = useState(false);
  const [events, setEvents] = useState(false);

  return (
    <div>
      <ParentLayout>
        <div className="w-full flex flex-col my-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:space-x-8 ">
            <div className="w-full md:w-6/12  lg:w-4/12">
              <Image src={dummy} alt="use" className="w-full h-auto" />
            </div>
            <div className="w-full md:w-6/12  lg:w-7/12 flex items-center">
              <div className="flex flex-col  w-full">
                <p className="bold text-yellow text-lg regular">Painter</p>
                <p className="mt-2 text-white semibold text-lg regular">
                  Painter #23535
                </p>
                <div className="flex space-x-1 mt-2">
                  <p className="text-grey-800 text-base regular regular">
                    Owned by
                  </p>
                  <p className="text-yellow opacity-80 text-base regular regular">
                    Daniekeys
                  </p>
                </div>
                <div className="mt-20 flex space-x-8 items-center w-full">
                  <div className="w-3/12">
                    <ActionBtn name="Mint" action={handleMintModal} />
                  </div>

                  <div className=" w-3/12">
                    <YellowActionBtn name="Edit" action={Edit} />
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
                <div className="w-full h-40 flex justify-center items-center">
                  <div className="flex-col space-y-2">
                    <Image
                      src={nodata}
                      alt="this is "
                      className="w-7/12 h-auto mx-auto"
                    />
                    <p className="text-white text-base regular regular text-center">
                      No Offers yet
                    </p>
                  </div>
                </div>
              </GeneralAccordion>
              <GeneralAccordion
                open={listing}
                title="Listings"
                setOpen={setListing}
              >
                <div className="w-full h-40 flex justify-center items-center">
                  <div className="flex-col space-y-2">
                    <Image
                      src={nodata}
                      alt="this is "
                      className="w-7/12 h-auto mx-auto"
                    />
                    <p className="text-white text-base regular regular text-center">
                      No Listings yet
                    </p>
                  </div>
                </div>
              </GeneralAccordion>
            </div>
          </div>
          {/* event part  */}
          <div className="w-full mt-12">
            <GeneralAccordion open={events} title="Events" setOpen={setEvents}>
              <div className="w-full h-40 flex justify-center items-center">
                <div className="flex-col space-y-2">
                  <Image
                    src={nodata}
                    alt="this is "
                    className="w-7/12 h-auto mx-auto"
                  />
                  <p className="text-white text-base regular regular text-center">
                    No Events yet
                  </p>
                </div>
              </div>
            </GeneralAccordion>
          </div>
        </div>
      </ParentLayout>
    </div>
  );
};

export default MintNft;
