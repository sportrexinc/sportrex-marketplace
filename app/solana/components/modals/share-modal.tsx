import React from "react";
import ReUseModal from "./ReUseModal";
import facebook from "@/public/assets/icons/facebook.png";
import instagram from "@/public/assets/icons/instagram.png";
import twitter from "@/public/assets/icons/twitter.png";
import telegram from "@/public/assets/icons/telegram.png";
import discord from "@/public/assets/icons/discord.png";
import toast from "react-toastify";

import Image from "next/image";
const ShareModal = ({
  openShare,
  setOpenShare,
  item,
  url,
  text,
}: {
  openShare: boolean;
  setOpenShare: any;
  item: any;
  url: string | any;
  text: string;
}) => {
  //  const url = `https://sportrex-marketplace-18bv.vercel.app/nft/${item?.token_address}`;
  //  const text = "Check out this awesome page!";

  const handleShare = (shareUrl: string) => {
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <ReUseModal open={openShare} setOpen={setOpenShare}>
      <div className="w-full flex flex-col">
        <div className="flex justify-between items-center">
          <p className="red-hat text-white text text-lg font-bold bold md:text-xl xl:text-2xl w-full min-w-max  ">
            Copy and share link{" "}
          </p>
          <button
            className="cursor-pointer"
            onClick={() => setOpenShare(false)}
          >
            {/* <CancelX /> */}
          </button>
        </div>
        <div className="w-full mt-8 flex flex-col">
          <p className="text-muted text-sm text-white regular">
            Share this link via
          </p>
          <div className="flex items-center gap-6  mt-3">
            <button
              onClick={() =>
                handleShare(
                  `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    url
                  )}`
                )
              }
            >
              <Image src={facebook} alt="facebook" className="w-10 h-10" />
            </button>

            {/* X (Twitter) Share Button */}

            <button
              onClick={() =>
                handleShare(
                  `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                    url
                  )}&text=${encodeURIComponent(`${text}`)}`
                )
              }
            >
              <Image src={twitter} alt="facebook" className="w-10 h-10" />
            </button>

            {/* LinkedIn Share Button */}
            <button
              onClick={() => {
                navigator.clipboard.writeText(url);
                alert("URL copied! Share it in Discord.");
              }}
            >
              <Image src={discord} alt="facebook" className="w-10 h-10" />
            </button>

            {/* WhatsApp Share Button */}
            <button
              onClick={() =>
                handleShare(
                  `https://t.me/share/url?url=${encodeURIComponent(
                    url
                  )}&text=${encodeURIComponent(text)}`
                )
              }
            >
              <Image src={telegram} alt="facebook" className="w-10 h-10" />
            </button>

            {/* Instagram Share Button - Note: No direct share functionality */}
            <button onClick={() => navigator.clipboard.writeText(url)}>
              <Image src={instagram} alt="facebook" className="w-10 h-10" />
            </button>
          </div>
          <p className="mt-6 regular mb-3 text-sm text-white capitalize">
            or copy link
          </p>
          <div className="flex h-12 items-center bg-[#F0F5FC] rounded-[12px] justify-between ">
            <div className="flex gap-2 items-center w-2/3 pl-2">
              <span className="text-black">{/* <IoCopyOutline /> */}</span>
              <p className="text-black truncate ">{url}</p>
            </div>
            <button
              className=" w-fit bg-black rounded-[12px] px-4 h-12 flex items-center justify-center font-medium text-white "
              onClick={() => {
                navigator.clipboard.writeText(url);
              }}
            >
              Copy
            </button>
          </div>
        </div>
      </div>
    </ReUseModal>
  );
};

export default ShareModal;
