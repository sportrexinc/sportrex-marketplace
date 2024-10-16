"use client"
import { useEffect, useState } from 'react';
import NonControlledLayout from '@/app/layouts/NonControlledLayout';
import NormalLayout from '@/app/layouts/NormalLayout';
import React from 'react'
import Collections from '../Profile/Collections';
import Favourite from '../Profile/Favourite';
import MyActivities from '../Profile/MyActivities';
import MyNfts from '../Profile/MyNfts';
import MyOffer from '../Profile/MyOffer';
import ProfileHero from '../Profile/ProfileHero';
import ProfileTab from '../Profile/ProfileTab';
import CollectionHero from './CollectionHero';
import CollectionTab from './CollectionTab';
import CollectionItems from './CollectionsItems';
import { getUserNft } from '@/app/redux/features/auth/MyNftSlice';
import { useAppDispatch, useAppSelector } from '@/app/redux/store';
import { useAddress } from '@thirdweb-dev/react';

const NewCollectionMint = () => {
    const [activeTab, setActiveTab] = useState(1); 
      const address = useAddress();
      const dispatch = useAppDispatch();
      const {
        nft_data,
        nft_loading,
        nft_data_history_count,
        nft_data_history,
      } = useAppSelector((state) => state.userNft);

      useEffect(() => {
        if (address)
          dispatch(
            getUserNft({ address, chain: "binance-testnet", limit: 15 })
          );
      }, [address]);
  return (
    <NonControlledLayout current={1}>
      <div className="">
        <CollectionHero />
      </div>
      <div className="mt-8">
        <CollectionTab activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <div className="w-full h-auto mt-2 ">
        <NormalLayout>
          {activeTab === 1 && (
            <CollectionItems
              data={nft_data}
              loading={nft_loading}
              count={nft_data_history_count}
              address={address}
              history={nft_data_history}
            />
          )}

          {activeTab === 2 && <MyActivities />}
        </NormalLayout>
      </div>
    </NonControlledLayout>
  );
}

export default NewCollectionMint
