import {useState} from 'react';


import heart from "@/public/assets/heart.svg";
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
const NftCard = ({ isTrending,item } : {isTrending:boolean,item:any} ) => {
  const navigate = useRouter();
  const [liked, setLiked] = useState(false);
  function getRandomNumberBetween10And60() {
    return Math.floor(Math.random() * 51) + 10;
  }
  const numbers = getRandomNumberBetween10And60();
  return (
    <div
      className="bg-blue-header w-full max-w-[256px] xl:min-w-[260px] 2xl:min-w-[304px] max-h-[300px] xl:max-w-max flex flex-col px-3 pt-3 pb-6 rounded-[20px] cursor-pointer "
      onClick={() => navigate.push("/mint-nft")}
    >
      <Image src={item?.image} alt="" className="rounded-[20px] w-[275px] h-[181px] object-cover" />
      <p className="text-[18px] leading-[30px] mt-4">
        { item?.name}</p>
      <div className="flex justify-between w-full mt-2">
        <p className="text-[#FAC744] semibold leading-[22px]">{item?.floor_price }</p>
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
          <h2>0</h2>
        </div>
      </div>
    </div>
  );
};

export default NftCard;
