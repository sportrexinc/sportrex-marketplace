"use client";
import { useEffect } from "react";
import {
  ConnectedNav,
  Footer,
  Subscribe,
  TopCollections,
  BlockhainList,
  MainHero,
  MobileNavbar,
  How,
} from "@/app/components";
import MarketCategory from "@/app/components/MarketCategory/MarketCategory";
import Community from "@/app/components/Community/Cummunity";

import Blog from "@/app/components/LatestBlog/Blog";
import NewNft from "@/app/components/NFT/newNft";
import TrendingNFT from "@/app/components/NFT/trandingNft";
import { useMetadata, useContract } from "@thirdweb-dev/react";
import NewHero from "@/app/components/Hero/NewHero";
import TrendingGame from "@/app/components/TopCollections/trending-game";
import TrendingFashion from "@/app/components/TopCollections/trending-fashion";
import TopSales from "@/app/components/TopCollections/TopSales";
import MobileHero from "@/app/components/Hero/MobileHero";
const Home = () => {
  const contractAddress = "0xa12c6af626218ae1b3341771ab1a657b44050e7a";
  const { contract } = useContract(contractAddress);
  const { data } = useMetadata(contract);
  useEffect(() => {
    window.scrollTo(0, 0);
    console.log(data);
  }, [data]);
  return (
    <div className="w-full min-h-screen h-full bg-blue-body text-white">
      <ConnectedNav />
      <MobileNavbar />
      <Divider size={78}>
        <MainHero />
      </Divider>

      {/* <NewHero />
      <MobileHero/> */}

      {/* <Divider size={78}>
        <BlockhainList />
      </Divider> */}
      {/* <NewCarousel /> */}
      <Divider size="77px">
        {/* <PlatformWork /> */}
        <How />
      </Divider>
      {/* <Divider />
      <TrendingNFT /> */}
      <Divider />
      <div>
        <TopCollections />
        <TrendingGame />
        <TrendingFashion />
        <TopSales />
      </div>
      {/* <Divider size="150px" />

      <NewNft />
      <Divider /> */}
      <div>
        {/* <MarketCategory /> */}
        {/* <MarketCategory /> */}
      </div>
      <Divider size="150px" />

      <Blog />

      <Divider size="150px" />

      <Community />
      {/* <NewNftBg /> */}
      <Divider size="150px" />
      <Subscribe />
      <Divider size="100px" />

      <Footer />
    </div>
  );
};
const Divider = ({
  size,
  children,
}: {
  size?: string | number;
  children?: any;
}) => {
  return (
    <div className="w-full h-full" style={{ marginTop: size || "150px" }}>
      {children}
    </div>
  );
};

export default Home;
