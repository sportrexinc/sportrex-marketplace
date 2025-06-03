import React, { useEffect, useState } from "react";
import ProfileSelect from "../../Select/ProfileSelect";
import Owned from "./Owned";
import { useAddress } from "@thirdweb-dev/react";
import { useAppDispatch, useAppSelector } from "@/app/redux/store";
import { getUserNft } from "@/app/redux/features/auth/MyNftSlice";
import { useActiveAccount } from "thirdweb/react";
const MyNfts = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState(1);
  const [selected, setSelected] = useState({
    value: "Owned by me",
    label: "Owned by me",
    id: 1,
  });
  const wallet = useActiveAccount();
  const address = wallet?.address;
  const dispatch = useAppDispatch();
  const { nft_data, nft_loading, nft_data_history_count, nft_data_history } =
    useAppSelector((state) => state.userNft);

  useEffect(() => {
    if (address)
      dispatch(getUserNft({ address, chain: "binance-testnet", limit: 15 }));
  }, [address]);
  const data = [
    {
      value: "Owned by me",
      label: "Owned by me",
      id: 1,
    },
    {
      value: "Unlisted by me",
      label: "Unlisted by me",
      id: 2,
    },
    {
      value: "Listed by me",
      label: "Listed by me",
      id: 3,
    },
  ];

  return (
    <div className="bg-blue-body w-full h-full">
      <div className="mt-3 w-64">
        <ProfileSelect
          selected={selected}
          setSelected={setSelected}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setActive={setActive}
          active={active}
          data={data}
          name="Owned by me"
        />
      </div>
      <div className="mt-6">
        {/* <div className="flex-[1]"/>
         <div className="flex-[4]"> */}
        <Owned
          data={nft_data}
          loading={nft_loading}
          count={nft_data_history_count}
          address={address}
          history={nft_data_history}
        />
        {/* </div> */}
      </div>
    </div>
  );
};

export default MyNfts;
