"use client"
import {useState, useEffect} from 'react'

import MarketSidebar from '@/app/components/Market/MarketSidebar';
import MarketContent from '@/app/components/Market/MarketContent';
import MarketLayout from '@/app/layouts/MarketLayout';
import { useAppDispatch, useAppSelector } from '@/app/redux/store';
import { getAllListedNft } from '@/app/redux/features/marketplace/marketplaceSlice';

const Marketplace = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const dispatch = useAppDispatch();
  const [allListedNfts, setAllListedNfts] = useState<any>([]);
  const handleFetchAllNfts = async () => {
    const {payload} = await dispatch(getAllListedNft(""));
    if (payload?.data) {
      setAllListedNfts(payload?.data?.nfts);
    }
  }
  useEffect(() => {
    handleFetchAllNfts();
  }, [])
  
  console.log(allListedNfts)
  return (
    <MarketLayout current={2}>
      <div className="w-full flex h-full sidebar-h ">
        {/* sideabar starts */}
        <MarketSidebar openSide={openSidebar} setOpenSide={setOpenSidebar} />
        {/* end sideabar starts */}
        {/* sideabar starts */}
        <MarketContent openSide={openSidebar} setOpenSide={setOpenSidebar} allListedNfts={allListedNfts} />
        {/* end sideabar starts */}
      </div>
    </MarketLayout>
  );
}

export default Marketplace