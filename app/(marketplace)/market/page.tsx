"use client";
import { useState, useEffect } from "react";

import MarketSidebar from "@/app/components/Market/MarketSidebar";
import MarketContent from "@/app/components/Market/MarketContent";
import MarketLayout from "@/app/layouts/MarketLayout";
import { useAppDispatch, useAppSelector } from "@/app/redux/store";
import { getAllListedNft, getAllNftCollection, getMarketplaceCollections } from "@/app/redux/features/marketplace/marketplaceSlice";

const Marketplace = () => {
  const [openSidebar, setOpenSidebar] = useState(true);
  const [loading, setLoading] = useState(false);
  const [collectionLoading, setCollectionLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [allListedNfts, setAllListedNfts] = useState<any>([]);
  const [allCollections, setAllCollections] = useState<any>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [verifyStatus, setVerifyStatus] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [collectionType, setCollectionType] = useState<{ name: string, value: string } | null>(null);
  const [collectionSearchText, setCollectionSearchText] = useState("");

  
  const buildSearchQuery = () => {
    const params = new URLSearchParams();

    if (searchText) params.append("search", searchText);
    if (minPrice) params.append("min_price", minPrice);
    if (maxPrice) params.append("max_price", maxPrice);
    if (status) params.append("status", status);
    if (verifyStatus) params.append("verified_status", verifyStatus);
    if (category) params.append("category", category);
    if (collectionType) params.append("collection_type", collectionType.value);

    return `?${params.toString()}`;
  };
  const buildCollectionSearchQuery = () => {
    const params = new URLSearchParams();

    if (collectionSearchText) params.append("search", collectionSearchText);   
    if (category) params.append("category", category);
   

    return `?${params.toString()}`;
  };

  const handleSearch = async () => {
    const searchQuery = buildSearchQuery();
  
    setLoading(true);
    const { payload } = await dispatch(getAllListedNft(searchQuery));
       if (payload?.data) {
         setAllListedNfts(payload?.data?.nfts);
         setLoading(false);
       }

  }
  const handleSearchCollection = async () => {
    const searchQuery = buildCollectionSearchQuery();
  
    setCollectionLoading(true);
    const { payload } = await dispatch(getAllNftCollection(searchQuery));
       if (payload?.data) {
         setAllCollections(payload?.data);
         setCollectionLoading(false);
       }

  }
  const handleFetchAllNfts = async () => {
    setLoading(true);
    const { payload } = await dispatch(getAllListedNft(""));
    if (payload?.data) {
      setAllListedNfts(payload?.data?.nfts);
      setLoading(false);
    }
  };
  const handleFetchAllCollections = async () => {
    setCollectionLoading(true);
    const { payload } = await dispatch(getMarketplaceCollections());
    if (payload?.data) {
    
      setAllCollections(payload?.data);
      setCollectionLoading(false);
    }
  };
  useEffect(() => {
    handleFetchAllNfts();
    handleFetchAllCollections();

  }, []);

useEffect(() => {
  handleSearch();
}, [minPrice, maxPrice, collectionType, status])
  
  

 
  
  
  return (
    <MarketLayout current={2}>
      <div className="w-full flex h-full sidebar-h ">
        {/* sideabar starts */}
        <MarketSidebar
          openSide={openSidebar}
          setOpenSide={setOpenSidebar}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          status={status}
          setStatus={setStatus}
          category={category}
          setCategory={setCategory}
          allCollections={allCollections}
          setAllCollections={setAllCollections}
          handleSearchCollection={handleSearchCollection}
          collectionSearchText={collectionSearchText}
          setCollectionSearchText={setCollectionSearchText}
        />
        {/* end sideabar starts */}
        {/* sideabar starts */}
        <MarketContent
          openSide={openSidebar}
          setOpenSide={setOpenSidebar}
          allListedNfts={allListedNfts}
          loading={loading}
          searchText={searchText}
          setSearchText={setSearchText}
          collectionType={collectionType}
          setCollectionType={setCollectionType}
          handleSearch={handleSearch}
        />
        {/* end sideabar starts */}
      </div>
    </MarketLayout>
  );
};

export default Marketplace;
