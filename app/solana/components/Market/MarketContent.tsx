import { useState } from "react";
import { SearchIcon, CollapseIcon } from "@/public/assets/icons";
import Select from "../Select/ReuseSelect";

import SingleItemCard from "../Cards/SingleCard";
import SingleItem from "../Cards/SingleItem";
import SingleNftCard from "./SingleNftCard";
import NftLoading from "../Loader/NftLoading";
const selectTypeData = [
  { name: "Single", value: "single-edition" },
  { name: "Bundle", value: "multiple-edition" },
];
const sortData = [
  { name: "Lastest", value: "b" },
  { name: "Last 7 days", value: "s" },
  { name: "Last 30 days", value: "c" },
  { name: "Last 60 days", value: "sd" },
  { name: "Last 90 days", value: "sdsd" },
];
const MarketContent = ({
  openSide,
  setOpenSide,
  allListedNfts,
  loading,
  collectionType,
  setCollectionType,
  searchText,
  setSearchText,
  handleSearch,
}: any) => {
  const [selectedType, setSelectedType] = useState({ name: "", value: "" });
  const [selectedSort, setSelectedSort] = useState({ name: "", value: "" });
  // if (loading) return <NftLoading />;
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div
      className={`sidebar-h  overflow-y-scroll  ${
        openSide ? "lg:px-8 lg:py-12 w-full " : "px-4 lg:px-16 lg:py-12 w-full"
      }`}
    >
      <div className="w-full flex  flex-col gap-4 mt-8 lg:flex-row lg:justify-between lg:items-center ">
        <div className="w-full lg:6/12 max-w-[479px]  2xl:w-4/12 flex items-center gap-4 ">
          {!openSide && (
            <span className="cursor-pointer" onClick={() => setOpenSide(true)}>
              <CollapseIcon />
            </span>
          )}

          {/* search */}
          <div className="w-full flex-grow flex items-center bg-[#ABABAB] bg-opacity-10 rounded-[8px] py-3 px-3 gap-x-3 overflow-x-hidden ">
            <span>
              <SearchIcon />
            </span>
            <input
              type="text"
              className="placeholder:text-white placeholder:text-opacity-50 placeholder:text-sm text-white text-sm bg-transparent outline-none border-none light "
              placeholder="Search NFTs"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          {/* end of search  */}
        </div>
        <div className="lg:w-4/12 lg:max-w-[479px] flex justify-end gap-x-4 w-full ">
          <span className="w-1/2">
            <Select
              options={selectTypeData}
              title={"Select"}
              selected={collectionType}
              setSelected={setCollectionType}
            />
          </span>
          {/* <span>
            <Select
              options={sortData}
              title={"Sort by"}
              selected={selectedSort}
              setSelected={setSelectedSort}
            />
          </span> */}
          <span></span>
        </div>
      </div>
      {/* start of the content side of things */}

      <div className="mt-8  gap-5 grid grid-cols-2 2xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-3 place-items-center ">
        {allListedNfts && allListedNfts.length > 0 ? (
          allListedNfts.map((item: any, index: any) => (
            <SingleNftCard
              key={index}
              item={{
                contractAddress: item.contractAddress,
                token_id: item.nftid,
                nftName: item.nftName,
                price: item.price,
                status: item.status,
                name: item.nftName,
              }}
              cardType="listed"
              isTrending={false}
            />
          ))
        ) : (
          <div className="flex items-center justify-center">
            <div>
              <p className="text-white text-lg light text-center">
                No NFTs Found...
              </p>
            </div>
          </div>
        )}

        {/* {
          SingleItemsData?.map((item: any, index: number) => {
            return (
    <SingleItem key={index} isTrending={false} image={item?.image} name={item?.name} price={item.price} likes={item?.likes}  />
  )
})
        } */}
      </div>

      {/* end of the content */}
    </div>
  );
};

export default MarketContent;
