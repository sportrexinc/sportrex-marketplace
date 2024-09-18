"use-client";
import React, { useState, useEffect, useLayoutEffect, Fragment } from "react";
import "./modal.css";
import {useRouter} from 'next/navigation'
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

export interface mintModalProps {
  isMinted: boolean;
  setIsMinted: any;
  mintedNFTData: any;
  setMintedNFTData: any;
}

const MintModal = ({
  isMinted,
  setIsMinted,
  mintedNFTData,
  setMintedNFTData,
}: mintModalProps) => { 
    const router = useRouter();

    const handleCancel = () =>{
        setIsMinted(false);
        router.push('/single-nft')
        setMintedNFTData({})
      }
  return (
    <>
      {console.log(mintedNFTData)}
      {isMinted && (
        <div
          className=""
          style={{
            position: "relative",
            width: "100vw", // Full viewport width
            height: "100vh", // Full viewport height

            overflow: "hidden",
          }}
        >
          <Image
            src={mintedNFTData.tokenURI} // Replace with the path to your image
            alt="Background Image"
            layout="fill"
            objectFit="cover"
            className="backdrop-blur-2xl"
          />
          <div className="w-full backdrop-blur-2xl">
            <NormalLayout>
              <div className="w-full h-screen p-4 flex items-center justify-center relative ">
                <span
                  className="absolute top-4 left-4 cursor-pointer"
                  onClick={handleCancel}
                >
                  <CloseIcon />
                </span>
                <div className="w-full lg:w-9/12 xl:w-7/12 mx-auto flex items-center justify-center flex-col">
                  <span className="w-full max-w-[600px] mx-auto flex justify-center">
                    <Image
                      //   Daniel Change this to PicOne
                      // src={mintedNFTData.tokenURI}
                      src={mintedNFTData.tokenURI}
                      alt="minted"
                      className="w-full  max-w-[400px] lg:max-w-[400px]  h-auto rounded-md object-contain"
                      width={600}
                      height={100}
                    />
                  </span>
                  <p className="bold text-white mt-6 text-xl sm:text-2xl lg:text-3xl text-center mx-auto  ">
                    Your item has been minted
                  </p>
                  <div className="w-full sm:w-9/12 lg:w-1/2 mt-8 flex justify-center items-center mx-auto gap-4">
                    <ActionBtn name={"List Item"} />
                    <YellowActionBtn name={"View Item"} />
                  </div>
                  <div className="mx-auto mt-7">
                    <Link
                      target="_blank"
                      href={`https://testnet.bscscan.com/tx/${mintedNFTData.transactionHash}`}
                      className="text-white flex items-center gap-2"
                    >
                      View on BSCscan{" "}
                      <span>
                        <FaArrowUpRightFromSquare />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </NormalLayout>
          </div>
        </div>
      )}
    </>
  );
};

export default MintModal;
