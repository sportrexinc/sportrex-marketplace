import React, { FC, useEffect, useState } from "react";
import heart from "@/public/assets/heart.svg";
import {
  MediaRenderer,
  useContract,
  useUpdateMetadata,
} from "@thirdweb-dev/react";
import { CreateCollectionProps } from "@/types";
import ActionBtn from "../Button/ActionBtn";
import { YellowActionBtn } from "..";
import Abi from "@/abi/SptNFTContract.json";

const CollectionCard: FC<{
  data?: CreateCollectionProps | null;
}> = ({ data }) => {
  const { contract } = useContract(data?.contractAddress, Abi);
  const { mutateAsync: updateMetadata } = useUpdateMetadata(contract);
  const [loading, setLoading] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const res = await updateMetadata({
        name: data?.name,
        image: data?.logoImage?.url,
        ...(data?.desc && { description: data?.desc }),
        ...(data?.external_link && { external_link: data?.external_link }),
      });
      setDisabled(true);
      setLoading(false);
      console.log(res);
    } catch (error: any) {
      alert(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="lg:h-[500px] w-full ">
      <MediaRenderer
        height="200px"
        width="70%"
        className="object-contain  rounded-[10px] -ml-8"
        src={data?.logoImage?.url || heart}
      />

      <div className="mt-4">
        <span className="grad-text text-[18px]">Name: </span>
        <span className="text-gray-300 text-[20px] regular">
          {data?.name || "name"}
        </span>
      </div>
      <div className="mt-4">
        <span className="grad-text text-[18px]">Symbol: </span>
        <span className="text-gray-300 text-[20px] regular">
          {data?.symbol || ""}
        </span>
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <span className="grad-text text-[18px]">Chain: </span>
          <span className="text-gray-300 text-[20px] regular">
            {data?.blockChain || "Binance-testnet"}
          </span>
        </div>
        <a
          className="text-blue-600 underline regular"
          href={`https://testnet.bscscan.com/address/${
            data?.contractAddress || ""
          }`}
          target="_blank"
        >
          Contract Address
        </a>
      </div>
      <div className="flex flex-col gap-y-4 mt-4">
        <ActionBtn
          name="DEPLOY METADATA"
          action={handleClick}
          loading={loading}
          disabled={disabled}
        />
        <YellowActionBtn name="Create NFT" />
      </div>
    </div>
  );
};

export default CollectionCard;
