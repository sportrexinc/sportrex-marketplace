import React, { FC } from "react";
import OwnedCard from "./OwnedCard";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
import { GetWalletNFTsResponseAdapter } from "moralis/common-evm-utils";
import NftLoading from "../../Loader/NftLoading";
import { MoralisNftResponse } from "@/types";
import { useAppDispatch } from "@/app/redux/store";
import { getUserNft } from "@/app/redux/features/auth/MyNftSlice";


const Owned: FC<{
  data: MoralisNftResponse | null; 
  loading: boolean;
  count: number;
  address?: string; 
  history: {
    page: number;
    cursor?: string;
  }[]
}> = ({
  data,
  loading,
  count,
  address,
  history
}) => {
  
  const dispatch = useAppDispatch()

  const back = () => {
    console.log(count - 2)
    address && dispatch(getUserNft({
      address,
      chain: "binance-testnet",
      cursor: null,
      limit:15
     }))
  };
  const next = () => {
    address && dispatch(getUserNft({
      address,
      chain: "binance-testnet",
      cursor:  data?.cursor,
      limit: 15
     }))
  };

  return (
    <div>
      <div className="w-full md:min-h-[296px] h-full grid grid-cols-2 lg:grid-cols-5 gap-3 ">
        {!loading && data ? data.result.map((item: any, index: number) => {
          return (
            <OwnedCard item={item} isTrending={true} key={index} />
            
          )
        }) :
          [0,1,2,3,4,5,6,7,8,9].map((_, index: number) => (<NftLoading key={index} />))
        }
      </div>
      <div className="my-10 w-full justify-center space-x-12 flex">
        <button
          className="bg-grey-800 rounded-full text-black cursor-pointer  text-lg regular  p-4"
          onClick={back}
        >
          <BsArrowLeft />
        </button>
        <button
          className="bg-yellow text-lg regular rounded-full text-black p-4"
          onClick={next}
        >
          <BsArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Owned;
