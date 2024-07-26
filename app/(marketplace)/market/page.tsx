"use client"
import {useState} from 'react'

import MarketSidebar from '@/app/components/Market/MarketSidebar';
import MarketContent from '@/app/components/Market/MarketContent';
import MarketLayout from '@/app/layouts/MarketLayout';
const Marketplace = () => {
  const [openSidebar, setOpenSidebar] = useState(true);

  return (
    <MarketLayout current={2}>
      <div className="w-full flex h-full sidebar-h space-x-4">
        {/* sideabar starts */}
        <MarketSidebar openSide={openSidebar} setOpenSide={setOpenSidebar} />
        {/* end sideabar starts */}
        {/* sideabar starts */}
        <MarketContent openSide={openSidebar} setOpenSide={setOpenSidebar} />
        {/* end sideabar starts */}
      </div>
    </MarketLayout>
  );
}

export default Marketplace