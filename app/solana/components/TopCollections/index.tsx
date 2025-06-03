import { useState } from "react";
import NormalLayout from "../../../layouts/NormalLayout";
import Marquee from "react-fast-marquee";
import collection from "@/public/assets/single-col.png";
import YellowBtn from "../Button/YellowBtn";
import { useTranslation } from "react-i18next";
import Select from "../Select/ReuseSelect";
import sptStar from "@/public/assets/svg/spt-star.svg";
import vr from "@/public/assets/png/vr.png";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import {
  azuki,
  bored,
  doodles,
  goodVibes,
  milady,
  pudgy,
  punk,
  tyler,
  xcopy,
  ethIcon,
} from "@/public/assets/general";
interface nftProps  {
    name: string;
    floor_price: string;
    image: StaticImageData;
    rate: string;
}
const nftItemsA = [
  {
    name: "Azuki",
    floor_price: "2.57 ETH",
    image: azuki,
    rate: "+4.7%",
  },
  {
    name: "Pudgy Penguins",
    floor_price: "9.22 ETH",
    image: pudgy,
    rate: "+3.3%",
  },
  {
    name: "Crypto Punks",
    floor_price: "42.5 ETH",
    image: punk,
    rate: "+11%",
  },
  {
    name: "Bored Ape Yacht Club",
    floor_price: "14.195 ETH",
    image: bored,
    rate: "+1.5%",
  },
  {
    name: "Bored Ape Yacht Club",
    floor_price: "14.195 ETH",
    image: bored,
    rate: "+1.5%",
  },
  {
    name: "X COPY",
    floor_price: "30 ETH",
    image: xcopy,
    rate: "+36.4%",
  },
  {
    name: "Fidenza by Tyler Hobbs",
    floor_price: "34.38 ETH",
    image: tyler,
    rate: "+0%",
  },
  {
    name: "Doodles",
    floor_price: "2.81 ETH",
    image: doodles,
    rate: "+4.3%",
  },
  {
    name: "Milady Maker",
    floor_price: "3.14 ETH",
    image: milady,
    rate: "+1.6%",
  },
  {
    name: "Good Vibe Club",
    floor_price: "0.26 ETH",
    image: goodVibes,
    rate: "+5%",
  },
];

export const nftItemsB = [
  {
    name: "Good Vibe Club",
    floor_price: "0.26 ETH",
    image: goodVibes,
    rate: "+5%",
  },
  {
    name: "Doodles",
    floor_price: "2.81 ETH",
    image: doodles,
    rate: "+4.3%",
  },
  {
    name: "Azuki",
    floor_price: "2.57 ETH",
    image: azuki,
    rate: "+4.7%",
  },
  {
    name: "Fidenza by Tyler Hobbs",
    floor_price: "34.38 ETH",
    image: tyler,
    rate: "+0%",
  },
  {
    name: "Crypto Punks",
    floor_price: "42.5 ETH",
    image: punk,
    rate: "+11%",
  },
  {
    name: "Milady Maker",
    floor_price: "3.14 ETH",
    image: milady,
    rate: "+1.6%",
  },
  {
    name: "Pudgy Penguins",
    floor_price: "9.22 ETH",
    image: pudgy,
    rate: "+3.3%",
  },
  {
    name: "X COPY",
    floor_price: "30 ETH",
    image: xcopy,
    rate: "+36.4%",
  },
  {
    name: "Bored Ape Yacht Club",
    floor_price: "14.195 ETH",
    image: bored,
    rate: "+1.5%",
  },
  {
    name: "Bored Ape Yacht Club",
    floor_price: "14.195 ETH",
    image: bored,
    rate: "+1.5%",
  },
];

const nftItemsC = [
  {
    name: "X COPY",
    floor_price: "30 ETH",
    image: xcopy,
    rate: "+36.4%",
  },
  {
    name: "Bored Ape Yacht Club",
    floor_price: "14.195 ETH",
    image: bored,
    rate: "+1.5%",
  },
  {
    name: "Good Vibe Club",
    floor_price: "0.26 ETH",
    image: goodVibes,
    rate: "+5%",
  },
  {
    name: "Crypto Punks",
    floor_price: "42.5 ETH",
    image: punk,
    rate: "+11%",
  },
  {
    name: "Milady Maker",
    floor_price: "3.14 ETH",
    image: milady,
    rate: "+1.6%",
  },
  {
    name: "Azuki",
    floor_price: "2.57 ETH",
    image: azuki,
    rate: "+4.7%",
  },
  {
    name: "Doodles",
    floor_price: "2.81 ETH",
    image: doodles,
    rate: "+4.3%",
  },
  {
    name: "Pudgy Penguins",
    floor_price: "9.22 ETH",
    image: pudgy,
    rate: "+3.3%",
  },
  {
    name: "Fidenza by Tyler Hobbs",
    floor_price: "34.38 ETH",
    image: tyler,
    rate: "+0%",
  },
  {
    name: "Bored Ape Yacht Club",
    floor_price: "14.195 ETH",
    image: bored,
    rate: "+1.5%",
  },
];

const items = ["1", "1", "1", "1", "1", "1", "1", "1"];

export const itemsList = [
  "1",
  "1",
  "1",
  "1",
  "1",
  "1",
  "1",
  "1",
  "1",
  "1",
  "1",
  "1",
  "1",
  "1",
  "1",
  "1",
  "1",
  "1",
];
const Top = () => {
  const { t } = useTranslation(["translation"]);
  const [time, setTime] = useState("1hrs");
  const [selected, setSelected] = useState<any>({
    name: "",
    value: "",
  });

  return (
    <div className="w-full flex flex-col relative overflow-x-hidden overflow-y-hidden">
      <NormalLayout>
        <div className="w-full flex flex-col ">
          <div className="title flex flex-col gap-4 xl:flex-row  lg:justify-between">
            <div className="w auto flex items-center gap-3 ">
              <h1 className="grad-text text-center bold text-[22px] md:text-3xl font-bold bold ">
                {/* {t("top_10")} */}
                Top Collections
              </h1>
              <p className="regular text-base lg:text-xl text-[#2E405D]">
                Trending Collections
              </p>
            </div>
            <div className="w-auto flex  items-center gap-2">
              <p
                className={
                  time === "1hrs"
                    ? "h-[41px] w-[39px] sm:w-[50px] flex rounded-[8px] items-center justify-center text-white regular text-[10px] sm:text-sm bg-[#FAC744] "
                    : "h-[41px] w-[39px] sm:w-[50px] flex rounded-[8px] items-center justify-center text-white regular text-[10px] sm:text-sm bg-[#0E1648]"
                }
              >
                1hrs
              </p>
              <p
                className={
                  time === "24hrs"
                    ? "h-[41px] w-[39px] sm:w-[50px] flex rounded-[8px] items-center justify-center text-white regular text-[10px] sm:text-sm bg-[#FAC744] "
                    : "h-[41px] w-[39px] sm:w-[50px] flex rounded-[8px] items-center justify-center text-white regular text-[10px] sm:text-sm bg-[#0E1648]"
                }
              >
                24hrs
              </p>
              <p
                className={
                  time === "6hrs"
                    ? "h-[41px] w-[39px] sm:w-[50px] flex rounded-[8px] items-center justify-center text-white regular text-[10px] sm:text-sm bg-[#FAC744] "
                    : "h-[41px] w-[39px] sm:w-[50px] flex rounded-[8px] items-center justify-center text-white regular text-[10px] sm:text-sm bg-[#0E1648]"
                }
              >
                7d
              </p>
              <p
                className={
                  time === "7d"
                    ? "h-[41px] w-[39px] sm:w-[50px] flex rounded-[8px] items-center justify-center text-white regular text-[10px] sm:text-sm bg-[#FAC744] "
                    : "h-[41px] w-[39px] sm:w-[50px] flex rounded-[8px] items-center justify-center text-white regular text-[10px] sm:text-sm bg-[#0E1648]"
                }
              >
                6hrs
              </p>
              <span>
                <Select
                  className="bg-[#0E1648]"
                  title={"Select Network"}
                  selected={selected}
                  setSelected={setSelected}
                  options={[
                    { name: "Ethereum", value: "Ethereum" },
                    { name: "Solana", value: "Solana" },
                    { name: "Tezos", value: "Tezos" },
                    { name: "Corda", value: "Corda" },
                  ]}
                />
              </span>
              <Link
                href={"/nft-ranking"}
                className="text-yellow semibold text-[10px] sm:text-sm lg:text-base hidden sm:flex"
              >
                View all ranking
              </Link>
            </div>
          </div>
          <div className="py-0 mt-8">
            <Marquee gradientWidth="0" speed={50} pauseOnHover>
              <div className="flex justify-between w-full gap-6 mr-6 ">
                {nftItemsA.map((item, index) => {
                  return <TrendItem key={index} {...item} />;
                })}
              </div>
            </Marquee>
          </div>
          <div className="py-4 md:py-5">
            <Marquee
              gradientWidth="0"
              speed={50}
              pauseOnHover
              direction="right"
            >
              <div className="flex justify-between w-full gap-6 mr-6 ">
                {nftItemsB.map((item, index) => {
                  return <TrendItem key={index} {...item} />;
                })}
              </div>
            </Marquee>
          </div>
          <div className="">
            <Marquee gradientWidth="0" speed={50} pauseOnHover>
              <div className="flex justify-between w-full gap-6 mr-6 ">
                {nftItemsC.map((item, index) => {
                  return <TrendItem key={index} {...item} />;
                })}
              </div>
            </Marquee>
          </div>
          <div className="mt-11 flex justify-center md:hidden ">
            <Link
              href={"/nft-ranking"}
              className="text-yellow text-center regular text-base"
            >
              View all ranking
            </Link>
          </div>
          <div className="w-full flex justify-end lg:-mt-0">
            <Image
              src={sptStar}
              alt="spt"
              className=" w-[80px] max-w-[124px] md:max-w-[156px] md:w-[124px] h-auto lg:w-auto rotate-spin"
            />
          </div>
        </div>
      </NormalLayout>
      <div className="w-full h-[300px] 2xl:h-[250px] lg:mt-60 mt-64 ">
        <div className=" w-[600px] 2xl:w-[2600px] flex items-center bg-yellow min-w-max h-[80px] lg:h-[114px] rotate-card gap-8 2xl:-ml-10 flex-grow  ">
          {itemsList?.map((item, index) => {
            return (
              <div
                key={index}
                className="bg-[#0E1648] h-[57px] lg:h-[78px] rounded-md lg:min-w-[280px] flex items-center px-4 justify-between min-w-[200px]"
              >
                <div className="flex gap-4 items-center">
                  <Image src={vr} alt="ere" className="w-auto h-auto" />
                  <p className="semibold text-white  lg:text-[20px] text-sm">
                    Gaming
                  </p>
                </div>
                <span className="regular text-[#ababab] lg:text-lg text-[10px] sm:text-sm">
                  22k
                </span>
              </div>
            );
          })}
        </div>
        <NormalLayout>
          <div className="w-full -mt-64  lg:-mt-64 2xl:-mt-64">
            <Image
              src={sptStar}
              alt="spt"
              className="w-[80px] max-w-[124px] md:max-w-[156px] md:w-[124px] h-auto lg:w-auto rotate-spin"
            />
          </div>
        </NormalLayout>
      </div>
    </div>
  );
};

export default Top;


const TrendItem = ({ floor_price, image, name, rate }: nftProps) => {
  return (
    <div className="w-full ratingItem rounded-[8px] h-[79px] px-[12px]  flex items-center justify-between gap-7 mr-6  ">
      <div className="w-full flex items-center gap-3">
        <span>
          <Image
            src={image}
            alt={name}
            className="w-10 h-10 rounded-full border border-yellow min-w-10 "
          />
        </span>
        <div className="flex flex-col">
          <p className="semibold text-white text-[17px] min-w-max leading-[20px] mb-[5px]">
            {name}
          </p>
          <div className="semibold text-white text-[17px] min-w-max flex items-center gap-[5px] ">
            Floor Price : <span>
            <Image src={ethIcon} className="w-4 h-4" alt="eth icon" />
            </span> {floor_price}
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <p className="text-[#09CE35] regular">{rate}</p>
        <p className="semibold text-white text-[17px] min-w-max">
         {floor_price}
        </p>
      </div>
    </div>
  ); 
}