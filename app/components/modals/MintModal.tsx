"use-client";
import React, { useState, useEffect, useLayoutEffect, Fragment } from "react";
import "./modal.css";
import { CloseIcon } from "../../../public/assets/svg/index";
import { useAddress, useContract } from "@thirdweb-dev/react";
import SPT721Abi from "@/abi/SptERC721.json";
import { useStorageUpload } from "@thirdweb-dev/react";
import { YellowActionBtn } from "@/app/components";
import ActionBtn from "../Button/ActionBtn";
import { TraitsProps } from "@/app/(marketplace)/single-nft/page";
import { CreateSingleNFTProps } from "@/types";
import NormalLayout from "@/app/layouts/NormalLayout";
import Link from "next/link";
import Image from "next/image";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import picOne from "../../../public/assets/market/one.png";

interface mintModalProps {
  isMinted: boolean;
  setIsMinted: any;
}

const MintModal = ({ isMinted, setIsMinted }: mintModalProps) => {
  return (
    <>
      {isMinted && (
        <div className="bg-blue-body w-full h-screen">
          <NormalLayout>
            <div className="w-full h-screen p-4 flex items-center justify-center relative">
              <span
                className="absolute top-4 left-4 cursor-pointer"
                onClick={() => setIsMinted(false)}
              >
                <CloseIcon />
              </span>
              <div className="w-full lg:w-7/12 xl:w-1/2 mx-auto flex items-center justify-center flex-col">
                <span>
                  <Image
                    src={picOne}
                    alt="minted"
                    className="w-9/12 max-w-[400px] h-auto rounded-md"
                  />
                </span>
                <p className="bold text-white mt-6 text-xl sm:text-2xl lg:text-3xl  ">
                  Your item has been minted
                </p>
                <div className="w-full sm:w-9/12 lg:w-1/2 mt-8 flex justify-center items-center mx-auto gap-4">
                  <ActionBtn name={"List Item"} />
                  <YellowActionBtn name={"View Item"} />
                </div>
                <div className="mx-auto mt-7">
                  <Link
                    href={"#"}
                    className="text-white flex items-center gap-2"
                  >
                    View on Etherscan{" "}
                    <span>
                      <FaArrowUpRightFromSquare />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </NormalLayout>
        </div>
      )}
    </>
  );
};

export default MintModal;
