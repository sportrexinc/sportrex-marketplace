"use client"
import { useCallback, useEffect, useState } from 'react';
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
import { getSingleCollectionDetail, getUserNft } from '@/app/redux/features/auth/MyNftSlice';
import { useAppDispatch, useAppSelector } from '@/app/redux/store';
import { useAddress } from '@thirdweb-dev/react';
import { useParams,useRouter } from 'next/navigation';


const NewCollectionMint = () => {
    const [activeTab, setActiveTab] = useState(1); 
    
    const navigate = useRouter();
    const params = useParams();
    const address = params.contractId;
    const tokenId = params.nftId;
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
      const [collectionImage, setCollectionImage] = useState("");

    
      const [data, setData] = useState<any>({});
      const [isLoading, setIsLoading] = useState(false);


      const fetchData = useCallback(async () => {
        setIsLoading(true);
        const { payload } = await dispatch(
          getSingleCollectionDetail({ address: address, limit: "100" })
        );

        if (payload) {
          setData(payload?.data?.result?.[0]);
          const ipfsGateway = "https://ipfs.io/ipfs/";
          const ipfsUrl =
            payload?.data?.result?.[0]?.normalized_metadata?.image.replace(
              "ipfs://",
              ""
            );
          const httpsImageUrl = `${ipfsGateway}${ipfsUrl}`;
          setCollectionImage(httpsImageUrl);
        }

        setIsLoading(false);
      }, []);

      useEffect(() => {
        fetchData();
      }, []);
      console.log(data);

      const handleMintModal = () => {
        console.log("hey");
      };
      const Edit = () => {
        navigate.push("/edit-nft");
      };
      const [pD, setPd] = useState(true);
      const [aP, setaP] = useState(true);
      const [details, setDetails] = useState(true);
      const [pA, setPA] = useState(true);
      const [offers, setOffers] = useState(true);
      const [listing, setListing] = useState(true);
      const [events, setEvents] = useState(true);

      const truncateMiddle = (text: string, length: number) => {
        if (typeof text !== "string") return text;
        if (text.length <= length) return text;
        const halfLength = Math.floor((length - 3) / 2);
        if (halfLength < 0) return text;

        return `${text.slice(0, halfLength)}...${text.slice(-halfLength)}`;
      };

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
