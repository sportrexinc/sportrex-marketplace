import React, { useEffect, useState } from "react";
import Carousel from "../Carousel/NewNftCarousel";
import NormalLayout from "../../layouts/NormalLayout";
import { useParams } from "next/navigation";
import { useAppDispatch } from "@/app/redux/store";
import { getMarketplaceCollections } from "@/app/redux/features/marketplace/marketplaceSlice";
import { object } from "yup";
import SingleNftCard from "./SingleNftCard";

const MarketList = ({ title }: { title: string }) => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const address = params.contractId;
  const tokenId = params.nftId;
  const [moreCollections, setMoreCollections] = useState<[]>([]);
  const [isObject, setIsObject] = useState(false);

  const handleFetchMore = async () => {
    try {
      const { payload } = await dispatch(
        getMarketplaceCollections(address as string)
      );
      console.log(payload);
      if (payload) {
        setMoreCollections(payload?.data?.result);
        if (Array.isArray(payload?.data?.result)) {
          setIsObject(false);
        } else if (
          typeof payload?.data?.result === "object" &&
          payload?.data?.result !== null
        ) {
          setIsObject(true);
        }
      }
    } catch (error) {}
  };

  useEffect(() => {
    handleFetchMore();
  }, []);
  console.log(moreCollections);
  return (
    <NormalLayout>
      <div className="w-full px-[12px] ">
        <h1 className="grad-text text-[22px] leading-[28px]  md:text-[30px]  md:text-start mb-[32px] md:mb-[64px]">
          {title}
        </h1>

        {isObject ? (
          <div className="mt-8  gap-5 grid grid-cols-2 2xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-3 place-items-center ">
            {/* <SingleNftCard
              item={moreCollections}
              cardType="listed"
              isTrending={false}
              isToken={true}
            /> */}
          </div>
        ) : (
          <div className="mt-8  gap-5 grid grid-cols-2 2xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-3 place-items-center ">
            {moreCollections?.length > 0 &&
              moreCollections?.map((item: any, index: number) => {
                return (
                  <SingleNftCard
                    item={{
                      contractAddress: item?.token_address,
                      token_id: item?.token_id,
                      nftName: item?.normalized_metadata?.name,
                    }}
                    key={index}
                    cardType="listed"
                    isTrending={false}
                  />
                );
              })}
          </div>
        )}
      </div>
    </NormalLayout>
  );
};

export default MarketList;
