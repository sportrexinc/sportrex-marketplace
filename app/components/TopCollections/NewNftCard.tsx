import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface NftCardProps {
  name: string;
  floor_price: string;
  image: any;
  isTrending?: boolean;
}

const NewNftCard: React.FC<NftCardProps> = ({
  name,
  floor_price,
  image,
  isTrending,
}) => {
  const navigate = useRouter();
  const [liked, setLiked] = useState(false);

  return (
    <div
      className="bg-white bg-opacity-5 
      w-full max-w-[256px] xl:min-w-[260px] 2xl:min-w-[304px] xl:max-w-max flex flex-col px-3 pt-3 pb-6 rounded-[20px] cursor-pointer"
      onClick={() => navigate.push("/mint-nft")}
    >
      <Image src={image} alt={name} className="rounded-[20px] w-[275px] h-[181px] object-cover" />
      <p className="text-[18px] leading-[30px] mt-4">{name}</p>
      <div className="flex justify-between w-full mt-2">
        <p className="text-[#FAC744] semibold leading-[22px]">{floor_price}</p>
        <div className="flex space-x-1 items-center">
          {liked ? (
            <AiFillHeart
              className="text-xl text-yellow"
              onClick={(e) => {
                e.stopPropagation();
                setLiked(false);
              }}
            />
          ) : (
            <AiOutlineHeart
              className="text-xl text-grey-800"
              onClick={(e) => {
                e.stopPropagation();
                setLiked(true);
              }}
            />
          )}
          <h2>0</h2>
        </div>
      </div>
    </div>
  );
};

export default NewNftCard;
