"use client"
import {useEffect} from 'react'
import { ConnectedNav, MobileNavbar, Footer } from '@/app/components';
import NftRankingBody from '@/app/components/NFT/NftRankingBody';

const NftRanking = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    
  return (
    <div className="w-full flex flex-col bg-blue-body min-h-screen overflow-y-scroll">
      <ConnectedNav current={1} />
          <MobileNavbar />
          <NftRankingBody />
      <Footer />
    </div>
  );
}

export default NftRanking
