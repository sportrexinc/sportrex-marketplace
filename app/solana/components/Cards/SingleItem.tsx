import Image from "next/image";
import { useRouter } from "next/navigation";
import {useState} from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
const SingleItem = ({
  isTrending,
  image,
  name,
  price,
  likes,
}: {
  isTrending: boolean;
  image: any;
  name: string;
  price: string;
  likes: string | number;
    }) => {
    const [liked, setLiked] = useState(false);

    const navigate = useRouter();
    return (
      <div
        className="bg-blue-header w-full max-w-[256px] flex flex-col p-3 rounded-[20px] cursor-pointer "
        onClick={() => navigate.push("/mint-nft")}
      >
        <Image src={image} alt="" className="rounded-[20px]" />
        <p className="text-[18px] leading-[30px] mt-4">Heartcrib</p>
        <div className="flex justify-between w-full mt-2">
          <p className="text-[#FAC744] semibold leading-[22px]">{price} SPT</p>
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
            <h2>{likes}</h2>
          </div>
        </div>
      </div>
    );
};

export default SingleItem;
