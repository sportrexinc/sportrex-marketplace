import {useState} from "react";
import NormalLayout from "../../layouts/NormalLayout";
import Marquee from "react-fast-marquee";
import collection from "@/public/assets/single-col.png";
import YellowBtn from "../Button/YellowBtn";
import { useTranslation } from "react-i18next";
import Select from "../Select/ReuseSelect";
import sptStar from "@/public/assets/svg/spt-star.svg";
import vr from "@/public/assets/png/vr.png"
import Link from "next/link";
import Image from "next/image";
const items = ["1", "1", "1", "1", "1","1","1","1"];
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
              <div className="flex justify-between w-full ">
                {items.map((item, index) => {
                  return (
                    <div key={index} className="w-64 mr-3 ">
                      <Image src={collection} alt="logo" className="w-auto" />
                    </div>
                  );
                })}
              </div>
            </Marquee>
          </div>
          <div className="py-4 md:py-2">
            <Marquee
              gradientWidth="0"
              speed={50}
              pauseOnHover
              direction="right"
            >
              <div className="flex justify-between w-full ">
                {items.map((item, index) => {
                  return (
                    <div key={index} className="w-64 mr-3 ">
                      <Image src={collection} alt="logo" className="w-auto" />
                    </div>
                  );
                })}
              </div>
            </Marquee>
          </div>
          <div className="py-0">
            <Marquee gradientWidth="0" speed={50} pauseOnHover>
              <div className="flex justify-between w-full ">
                {items.map((item, index) => {
                  return (
                    <div key={index} className="w-64 mr-3 ">
                      <Image src={collection} alt="logo" className="w-auto" />
                    </div>
                  );
                })}
              </div>
            </Marquee>
          </div>
          <div className="mt-11 flex justify-center">
            <Link
              href={"/nft-ranking"}
              className="text-yellow text-center regular text-base"
            >
              View all ranking
            </Link>
          </div>
          <div className="w-full flex justify-end">
            <Image
              src={sptStar}
              alt="spt"
              className="w-[124px] h-auto lg:w-auto rotate-spin"
            />
          </div>
        </div>
      </NormalLayout>
      <div className="w-full h-[300px] 2xl:h-[250px] ">
        <div className=" w-[600px] 2xl:w-[2600px] flex items-center bg-yellow h-[80px] lg:h-[114px] rotate-card gap-8 2xl:-ml-10 flex-grow  ">
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
          <div className="w-full lg:-mt-20 2xl:-mt-32">
            <Image
              src={sptStar}
              alt="spt"
              className="w-[124px] h-auto lg:w-auto rotate-spin"
            />
          </div>
        </NormalLayout>
      </div>
    </div>
  );
};

export default Top;
