import  { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import heart from "../../../assets/heart.svg";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const SingleItemCard = ({ isTrending, image, name, price, likes }: { isTrending: boolean; image: any; name: string; price: string; likes: string | number; }) => {
  const [liked, setLiked] = useState(false);

  const navigate = useNavigate();

  return (
    <div onClick={() => navigate("/mint-nft")} className="w-full cursor-pointer  lg:min-w-[300px] md:h-[296px] sm:w-[280px] lg:w-[304px] h-full bg-no-repeat bg-cover bg-blue-header rounded-[10px] md:rounded-[20px] p-2 md:p-4 flex flex-col items-start space-y-[12px] justify-between relative  ">
 
      <img
        className={`w-full ${
          isTrending
            ? "h-[135px] md:h-[180px]"
            : "h-[120px] w-[270px] md:h-[180px]"
        }`}
        src={image}
        alt={name}
      />
      <p className="text-[18px] leading-[30px]">Heartcrib</p>
      <div className="flex justify-between w-full">
        <Link to="#" className="text-[#FAC744] semibold leading-[22px]">
          {price} SPT
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
                  <h2>{likes}</h2>
        </div>
      </div>
    </div>
  );
};

export default SingleItemCard;
