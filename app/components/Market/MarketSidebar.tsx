import {useState} from 'react'
import { CollapseIcon, FilterIcon,SearchIcon } from '../../assets/icons';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import pricePic from "../../assets/png/price-samp.png"
import one from "../../assets/png/unsplash_CuEvrPd3NYc.png";
import two from "../../assets/png/unsplash_iMdsjoiftZo.png";
import three from "../../assets/png/unsplash_lylCw4zcA7I.png";
import four from "../../assets/png/unsplash_tXz6g8JYYoI.png";

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
    name: "Art",
    image:one,
  },
  {
    name: "Social",
    image:two,
  },
  {
    name: "Interface",
    image:three,
  },
  {
    name: "Gaming",
    image:four,
  },
  {
    name: "Avatar",
    image:one,
  },
]
const MarketSidebar = ({ openSide, setOpenSide }: { openSide: boolean; setOpenSide: any }) => {
  const [openFilterBy, setOpenFilterBy] = useState(true);
  const [openPrice, setOpenPrice] = useState(true);
  const [openCollection, setOpenCollection] = useState(true);
  const [openCat, setOpenCat] = useState(true);
    return (
      <div
        className={`sidebar-h flex-col lg:pt-10 border-r overflow-y-scroll border-r-[#ababab] border-opacity-10  ${
          openSide ? "max-w-[291px] bg-blue-card w-full flex" : "hidden "
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
            <div className="w-full grid grid-cols-2 gap-y-5 mt-4 pl-8 pr-10 py-6 bg-[#0E1648]">
              <span className="flex items-center space-x-3">
                <input type="checkbox" />
                <label htmlFor="" className="regular text-sm text-white">
                  On sale
                </label>
              </span>
              <span className="flex items-center space-x-3">
                <input type="checkbox" />
                <label htmlFor="" className="regular text-sm text-white">
                  Verified
                </label>
              </span>
              <span className="flex items-center space-x-3">
                <input type="checkbox" />
                <label htmlFor="" className="regular text-sm text-white">
                  Bid
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
          <div className="w-full flex items-center justify-center gap-y-5 mt-4 pl-8 pr-10 py-6 bg-[#0E1648]">
            <img src={pricePic} alt="price pic" />
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
              <input type="text" className='placeholder:text-white placeholder:text-sm text-white text-sm bg-transparent outline-none border-none  ' placeholder='Search Here' />
            </div>
            {/* end of search  */}
            <div className="flex flex-col space-y-4">

            {
              collectData.map((item: any, index: number) => {
                return (
                  <div className="flex space-x-4 items-center " key={index}>
                    <img src={item.image} alt="name" />
                    <p className="semibold text-white">
                      {item.name}
                    </p>
                  </div>
                  )
                })
              }
            </div>
            <p className='semibold text-sm text-[#ababab] '>
              View All
            </p>
          </div>
        )}
        {/* enf of collection */}
        {/* start of collection */}
        <div className="w-full flex items-center justify-between pl-6 pr-10 h-[50px] bg-blue-body py-3  ">
          <div className="flex space-x-4 items-center">
            <p className="text-white semibold">Categories</p>
          </div>
          <span
            className="cursor-pointer"
            onClick={() => setOpenCat(!openCat)}
          >
            {openCat ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </span>
        </div>
        {openCat && (
          <div className="w-full flex flex-col gap-y-5 mt-4 pl-8 pr-10 py-6 bg-[#0E1648]">
           
            <div className="flex flex-col space-y-4">

            {
              catData.map((item: any, index: number) => {
                return (
                  <div className="flex space-x-4 items-center " key={index}>
                    <img src={item.image} alt="name" />
                    <p className="semibold text-white">
                      {item.name}
                    </p>
                  </div>
                  )
                })
              }
            </div>
         
          </div>
        )}
        {/* enf of collection */}
      </div>
    );
}

export default MarketSidebar
