import React, { useEffect } from "react";
import ActionBtn from "../../Button/ActionBtn";
import SingleCollectionCard from "./SingleCollectionCard";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
import CollectionLoading from "../../Loader/CollectionLoading";
import { useAppDispatch, useAppSelector } from "@/app/redux/store";
import { getUserCollection } from "@/app/redux/features/auth/MyNftSlice";
import { useAddress } from "@thirdweb-dev/react";
import { CollectionResult } from "@/types";
import { useRouter } from "next/navigation";
const OwnedByMe = () => {
  const { collection_data, nft_loading } = useAppSelector(state => state.userNft)
  const dispatch = useAppDispatch()
  const address = useAddress()
  
  const back = () => {
    address && dispatch(getUserCollection({
      address,
      chain: "binace-testnet",
      cursor: null,
      limit: 15
     }))
  };
  const next = () => {
    address && dispatch(getUserCollection({
      address,
      chain: "binace-testnet",
      cursor:  collection_data?.cursor,
      limit: 15
     }))
  };
  const navigate = useRouter();
  const createCollection = () => {
    navigate.push("/collection-nft");
  };

 

  useEffect(() => {
   address && dispatch(getUserCollection({
      address,
      chain: 'binance-testnet',
      limit: 15
    }))
  },[address])

  return (
    <div>

      <div className="w-full grid grid-cols-2 lg:grid-cols-5 gap-3">
        { nft_loading ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i, index) => (
          <CollectionLoading key={index} />
        )) : 
         collection_data?.result.map((item: CollectionResult, index: number) => (
          <SingleCollectionCard  collection={item} key={index} cardType="owned" />
         ))
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
      <div className="mt-12 flex">
        <div className="w-2/12 mx-auto">
          <ActionBtn name="Add new collection" action={createCollection} />
        </div>
      </div>
    </div>
  );
};

export default OwnedByMe;
