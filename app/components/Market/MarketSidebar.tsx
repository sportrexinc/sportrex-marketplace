import {useState} from 'react'
import { CollapseIcon, FilterIcon,SearchIcon } from '@/public/assets/icons';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import pricePic from "@/public/assets/png/price-samp.png"
import one from "@/public/assets/png/unsplash_CuEvrPd3NYc.png";
import two from "@/public/assets/png/unsplash_iMdsjoiftZo.png";
import three from "@/public/assets/png/unsplash_lylCw4zcA7I.png";
import four from "@/public/assets/png/unsplash_tXz6g8JYYoI.png";
import Image from 'next/image';

const collectData = [
  {
    name: "New Age",
    image:one,
  },
  {
    name: "Grand Apes",
    image:two,
  },
  {
    name: "New Age",
    image:three,
  },
  {
    name: "Grand Apes",
    image:four,
  },
  {
    name: "New Age",
    image:one,
  },
]
const catData = [
  {
    name: "art",
    image:one,
  },
  {
    name: "social",
    image:two,
  },
  {
    name: "interface",
    image:three,
  },
  {
    name: "gaming",
    image:four,
  },
  {
    name: "Avatar",
    image:one,
  },
]
const MarketSidebar = ({ openSide, setOpenSide,minPrice,setMinPrice,maxPrice,setMaxPrice,status, setStatus,category, setCategory, allCollections,  handleSearchCollection, collectionSearchText, setCollectionSearchText }: any) => {
  const [openFilterBy, setOpenFilterBy] = useState<boolean>(true);
  const [openPrice, setOpenPrice] = useState<boolean>(true);
  const [openCollection, setOpenCollection] = useState<boolean>(true);
  const [openCat, setOpenCat] = useState<boolean>(true);
  const [showAll, setShowAll] = useState<boolean>(false);
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearchCollection();
    }
  };
  return (
    <div
      className={`sidebar-h flex-col lg:pt-10 border-r overflow-y-scroll border-r-[#ababab] border-opacity-10  ${
        openSide
          ? "fixed top-[100px] lg:top-0 left-0 right-0 z-50 lg:relative lg:max-w-[291px] bg-blue-card w-full flex"
          : "hidden "
      }`}
    >
      {/* start of filter and close */}
      <div className="w-full  flex flex-col bg-[#020733]">
        <div className="w-full flex items-center justify-between pl-6 pr-10 h-[44px] ">
          <div className="flex space-x-4 items-center">
            <span
              onClick={() => setOpenFilterBy(!openFilterBy)}
              className="cursor-pointer"
            >
              <FilterIcon />
            </span>
            <p className="text-white semibold">Filter By</p>
          </div>
          <span className="cursor-pointer" onClick={() => setOpenSide(false)}>
            <CollapseIcon />
          </span>
        </div>
        {openFilterBy && (
          <div className="w-full grid grid-cols-2 gap-y-5 mt-4 pl-8 pr-4 py-6 bg-[#0E1648]">
            <span className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={status && status === "buy now"}
                onClick={() => setStatus("buy now")}
              />
              <label htmlFor="" className="regular text-sm text-white">
                Buy now
              </label>
            </span>
            <span className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={status && status === "not for sale"}
                onClick={() => setStatus("not for sale")}
              />
              <label htmlFor="" className="regular text-sm text-white">
                Not for sale
              </label>
            </span>
            <span className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={status && status === "auction"}
                onClick={() => setStatus("auction")}
              />
              <label htmlFor="" className="regular text-sm text-white">
                Bid
              </label>
            </span>
            <span className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={ status === ""}
                onClick={() => setStatus("")}
              />
              <label htmlFor="" className="regular text-sm text-white">
                All
              </label>
            </span>
          </div>
        )}
      </div>

      {/* end of fileyer close */}
      {/* start of price */}
      <div className="w-full flex items-center justify-between pl-6 pr-10 h-[44px] bg-blue-body py-3 ">
        <div className="flex space-x-4 items-center">
          <p className="text-white semibold">Price Range</p>
        </div>
        <span
          className="cursor-pointer"
          onClick={() => setOpenPrice(!openPrice)}
        >
          {openPrice ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </span>
      </div>
      {openPrice && (
        <div className="w-full  grid grid-cols-2 gap-5 mt-4 pl-8 pr-8 py-6 bg-[#0E1648]">
          <div className="flex flex-col">
            <label htmlFor="" className="regular text-xs mb-1 text-white">
              Min Price
            </label>
            <div className="w-full flex items-center bg-[#ABABAB] bg-opacity-10 rounded-[8px] py-3 px-3 space-x-3 overflow-x-hidden ">
              <input
                type="number"
                className="placeholder:text-white placeholder:text-sm text-white text-sm placeholder:text-opacity-40 bg-transparent outline-none border-none  "
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className="regular text-xs mb-1 text-white">
              Max Price
            </label>
            <div className="w-full flex items-center bg-[#ABABAB] bg-opacity-10 rounded-[8px] py-3 px-3 space-x-3 overflow-x-hidden ">
              <input
                type="number"
                className="placeholder:text-white placeholder:text-opacity-40 placeholder:text-sm text-white text-sm bg-transparent outline-none border-none  "
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
          </div>
        </div>
      )}
      {/* enf of Price */}
      {/* start of collection */}
      <div className="w-full flex items-center justify-between pl-6 pr-10 h-[44px] bg-blue-body py-3 ">
        <div className="flex space-x-4 items-center">
          <p className="text-white semibold">Collections</p>
        </div>
        <span
          className="cursor-pointer"
          onClick={() => setOpenCollection(!openCollection)}
        >
          {openCollection ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </span>
      </div>
      {openCollection && (
        <div className="w-full flex flex-col gap-y-5 mt-4 pl-8 pr-10 py-6 bg-[#0E1648]">
          {/* search */}
          <div className="w-full flex items-center bg-[#ABABAB] bg-opacity-10 rounded-[8px] py-3 px-3 space-x-3 overflow-x-hidden ">
            <span>
              <SearchIcon />
            </span>
            <input
              type="text"
              className="placeholder:text-white placeholder:text-sm text-white text-sm bg-transparent outline-none border-none  "
              placeholder="Search Here"
              value={collectionSearchText}
              onChange={(e) => setCollectionSearchText(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          {/* end of search  */}
          <div className="flex flex-col space-y-4">
            {
            (showAll ? allCollections : allCollections?.slice(0,10))
              ?.map((item: any, index: number) => {
              return (
                <div className="flex space-x-4 items-center " key={index}>
                  <Image
                    src={item?.logoImage?.url}
                    alt="name"
                    width={40}
                    height={40}
                    className="rounded-full w-10 h-10"
                  />
                  <p className="semibold text-white">{item.name}</p>
                </div>
              );
            })}
          </div>
          {
            allCollections?.length > 10 && (

              <p className="semibold text-sm text-[#ababab]" onClick={() => setShowAll(!showAll)}>
                {
                  showAll ? "Show less" : "Show all"
              }  
              </p>
            )
          }
        </div>
      )}
      {/* enf of collection */}
      {/* start of collection */}
      {/* <div className="w-full flex items-center justify-between pl-6 pr-10 h-[50px] bg-blue-body py-3  ">
        <div className="flex space-x-4 items-center">
          <p className="text-white semibold">Categories</p>
        </div>
        <span className="cursor-pointer" onClick={() => setOpenCat(!openCat)}>
          {openCat ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </span>
      </div>
      {openCat && (
        <div className="w-full flex flex-col gap-y-5 mt-4 pl-8 pr-10 py-6 bg-[#0E1648]">
          <div className="flex flex-col space-y-4">
            {catData.map((item: any, index: number) => {
              return (
                <div className="flex space-x-4 items-center cursor-pointer " key={index}
                
                >
                  <Image src={item.image} alt="name" />
                  <p className="semibold text-white capitalize">{item.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      )} */}
      {/* enf of collection */}
    </div>
  );
}

export default MarketSidebar
