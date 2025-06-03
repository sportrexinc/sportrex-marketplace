"use client";
import { useEffect } from "react";
import {
    Footer,
    Subscribe,
    TopCollections, How
} from "./components";
import Community from "./components/Community/Cummunity";

import Blog from "./components/LatestBlog/Blog";
import { useMetadata, useContract } from "@thirdweb-dev/react";
import NewHero from "./components/Hero/NewHero";
import TrendingGame from "./components/TopCollections/trending-game";
import TrendingFashion from "./components/TopCollections/trending-fashion";
import TopSales from "./components/TopCollections/TopSales";
import MobileHero from "./components/Hero/MobileHero";
const SolanaHome = () => {
  const contractAddress = "0xa12c6af626218ae1b3341771ab1a657b44050e7a";
  const { contract } = useContract(contractAddress);
  const { data } = useMetadata(contract);
  useEffect(() => {
    window.scrollTo(0, 0);
   
  }, [data]);
  return (
    <div className="w-full min-h-screen h-full bg-blue-body text-white">
      {/* <ConnectedNav />
      <MobileNavbar />
      <Divider size={78}>
        <MainHero />
      </Divider> */}

      <NewHero />
      <MobileHero/>

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

export default SolanaHome;
