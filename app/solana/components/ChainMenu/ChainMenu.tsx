import { useState } from "react";

import {
  ethMenuIcon,
  baseMunuIcon,
  sonicMenuIcon,
  blastMenuIcon,
  avalancheMenuIcon,
  solanaMenuIcon,
  bnbMenuIcon,
} from "@/public/assets/icons/menuicons";
import Image from "next/image";
import { ChainsDropdownIcon,GradientCancelIcon } from "@/public/assets/icons";
import { useRouter } from "next/navigation";
import Link from  "next/link";
const gradientBorderStyle = {
  border: "5px solid transparent",
  backgroundClip: "padding-box, border-box",
};
const icons = [
  {
    name: "BNB",
    icon: bnbMenuIcon,
    color: "#F3BA2F",
  },
  {
    name: "ETH",
    icon: ethMenuIcon,
    color: "#0B8311",
  },
  {
    name: "BASE",
    icon: baseMunuIcon,
    color: "#0052FF",
  },
  {
    name: "SONIC",
    icon: sonicMenuIcon,
    color: "#FFFFFF",
  },
  {
    name: "BLAST",
    icon: blastMenuIcon,
    color: "#FCFC03",
  },
  {
    name: "AVALANCHE",
    icon: avalancheMenuIcon,
    color: "#E84142",
  },
  {
    name: "SOLANA",
    icon: solanaMenuIcon,
    color: "#A574DB",
  },
];
const ChainMenu = () => {
  const router = useRouter();
 
  const [activeIcon, setActiveIcon] = useState<null | number>(null);
  const [isHoveredAll, setIsAllHovered] = useState(false);
  const [isHovered, setAllHovered] = useState(false);

  return (
    <div className="w-auto bg-transparent">
      <div
        className="w-[55px] h-full flex flex-col relative bg-white bg-opacity-10 rounded-[16px]"
        style={gradientBorderStyle}
      >
        <div className="flex flex-col items-center gap-4 py-2 px-2">
          {/* All button */}
          <Link
            href={"/"}
            className={`
            flex items-center justify-center
            w-[37px] h-[37px]
            rounded-[16px]
            bg-white bg-opacity-15
            backdrop-blur-[15.8px]
            cursor-pointer
            mb-2
            ${isHoveredAll ? "ring-2 ring-yellow-400" : ""}
          `}
            onMouseEnter={() => setIsAllHovered(true)}
            onMouseLeave={() => setIsAllHovered(false)}
          >
            <p className="text-white text-sm font-medium">All</p>
          </Link>

          {/* Icons list */}
          <div className="flex flex-col gap-4">
            {icons.map((item, idx) => {
              const isActive = activeIcon === idx;
              return (
                <Link
                href={`/${item.name.toLowerCase()}`}
                  key={item.name}
                  className={`
                    relative
                    flex items-center
                    w-[37px] h-[37px]
                    rounded-[16px]
                    gap-4
                    
                    transition-all duration-300 ease-out
                    cursor-pointer
                    group
                    ${isActive ? "bg-white/15 backdrop-blur-md" : ""}
                  `}
                  onMouseEnter={() => setActiveIcon(idx)}
                  onMouseLeave={() => setActiveIcon(null)}
                  // onClick={() => router.push(`/${item.name.toLowerCase()}`)} 
                >
                  <div className="flex items-center gap-4 justify-center w-[37px] z-10">
                    <Image
                      src={item.icon}
                      alt={item.name}
                      width={37}
                      height={37}
                    />
                  </div>
                  <div
                    className={`
                    absolute left-0
                    flex items-center
                    h-full
                    bg-white/15 backdrop-blur-md
                    rounded-[16px]
                    transition-all duration-300
                    w-[37px] group-hover:w-fit
                    overflow-hidden
                  `}
                  >
                    <div className="flex items-center min-w-max px-[37px]">
                      <span className="text-white text-sm font-medium whitespace-nowrap ">
                        {item.name}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChainMenu;


export const MobileChainMenu = () => { 

  const router = useRouter();
  const [open, setOpen] = useState(false);
  
  return (
    <div className="w-full relative flex flex-col ">
      <div className="w-full flex gap-4">
        {/* the sliding part */}
        <div className="w-full h-[40px] flex-grow border border-[#8B14EF] rounded-[10px] overflow-hidden flex items-center gap-4">
          <span
            className="text-white text-[16px] font-medium  h-10 flex items-center  bg-white bg-opacity-15
            backdrop-blur-[15.8px] rounded-[10px] cursor-pointer px-4 min-w-max "
          >
            All
          </span>
          <div className="flex overflow-x-auto flow-hide-x">
            <div className="min-w-max flex items-center gap-4 pr-4">
              {icons.map((item, idx) => {
                return (
                  <div key={idx} className="flex items-center gap-4">
                    <Image
                      src={item.icon}
                      alt={item.name}
                      width={23}
                      height={23}
                    />
                    <p
                      className={`text-[${item.color}] text-[16px] font-medium semibold`}
                      style={{ color: item.color }}
                    >
                      {item.name}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* end of the slider */}

        {/* ths side */}
        <div
          className="w-10 cursor-pointer"
          onClick={() => setOpen((prev) => !prev)}
        >
          <ChainsDropdownIcon />
        </div>
        {/* end of the side */}
      </div>
      <div className="absolute top-11 left-0 w-full z-10">
        {open && (
          <div className="w-full flex flex-col border py-3 px-4 border-[#8B14EF] bg-blue-body  rounded-tr-[9px] rounded-br-[9px] rounded-bl-[9px] max-w-[230px]">
            <div className="w-full flex items-center justify-end ">
              <span onClick={() => setOpen(false)} className="cursor-pointer">
                <GradientCancelIcon />
              </span>
            </div>
            <div className="flex flex-col gap-4 mt-2">
              {icons.map((item, idx) => {
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-4 cursor-pointer"
                    onClick={() => router.push(`/${item.name.toLowerCase()}`)}
                  >
                    <Image
                      src={item.icon}
                      alt={item.name}
                      width={23}
                      height={23}
                    />
                    <p
                      className={`text-[${item.color}] text-[16px] font-medium semibold`}
                      style={{ color: item.color }}
                    >
                      {item.name}
                    </p>
                  </div>
                );
              })}
          </div>
          </div>
        )}
      </div>
    </div>
  );
}
