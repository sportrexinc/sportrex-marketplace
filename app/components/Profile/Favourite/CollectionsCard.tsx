import React, { useState } from "react";
import soccer from "@/public/assets/profile/soccer.jpg";
import ilus from "@/public/assets/profile/profile-ilus.svg";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";
const CollectionsCard = () => {
  const [liked, setLiked] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);
  return (
    <div className="w-full h-[44vh]  2xl:h-[40vh] relative rounded-[20px] ">
      <div
        className="inset-0 w-full h-full absolute bg-opacity
        "
      >
        <div className="relative sm:pt-0 2xl:pt-10 ">
          <div className="absolute flex flex-col top-9 right-0 md:right-2 2xl:right-4 w-48 pr-4 ">
            <BsThreeDotsVertical
              className="text-white text-2xl self-end"
              onClick={() => setOpenOptions(!openOptions)}
            />
            {openOptions && (
              <div className="mt-2 w-40 bg-blue-body rounded-[15px] flex flex-col space-y-1 p-4 ">
                <p className="w-full hover:bg-blue-btn text-white text-lg regular regular">
                  Remove
                </p>
              </div>
            )}
          </div>
          <div className="img-container w-full mt-4  2xl:mt-10 flex justify-center ">
            <Image  src={ilus} alt="life" className="w-20 xl:w-24 h-auto" />
          </div>
          <div className="flex flex-col p-4 mt-2 sm:mt-6 2xl:mt-10">
            <p className="text-[18px] leading-[30px]">New Age</p>
            <div className="flex justify-between w-full">
              <Link href="#" className="text-[#fff] semibold leading-[22px]">
                10 items
              </Link>
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
                <h2>23</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex  ">
        <Image
          src={soccer}
          alt="fghj"
          className="w-full h-[40vh] object-cover rounded-[10px] bg-center  "
        />
      </div>
    </div>
  );
};

export default CollectionsCard;
