import React from "react";
import cat from "@/public/assets/backgrounds/cat-desk.png";
import category from "@/public/assets/category.png";
import mob from "@/public/assets/backgrounds/cat-mob.png";
import NormalLayout from "@/app/layouts/NormalLayout";
import { useTranslation } from "react-i18next";
import Image from "next/image";
const items = ["1", "1", "1", "1", "1", "1", "1", "1"];
const Testing = () => {
  const { t } = useTranslation("translation");
  return (
    <NormalLayout>
      <div>
        <div className="relative w-full h-auto hidden md:block rounded-[30px]">
          <div className="w-full h-auto rounded-[30px] ">
            <Image src={cat} alt="ere" className="w-full lg:h-auto sm:h-[300px] rounded-[30px]" />
          </div>

          <div className="absolute top-0 left-0  ">
            <div className="flex flex-col  py-10 px-10 2xl:px-24 2xl:py-16 ">
              <div className="div">
                <h1 className="text-blue-bg mt-2 bold text-3xl text-blue-body">
                  {t("explore_m")}
                </h1>
              </div>
              <div className="grid grid-cols-4 gap-2 md:gap-4 md:gap-y-8  2xl:gap-12 mt-8">
                {items.map((item, Testing) => {
                  return (
                    <div
                      key={Testing}
                      className="w-full h-full flex justify-center items-center"
                    >
                      <Image src={category} alt="ere" className="w-full h-full" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="relative w-full h-auto  md:hidden">
          <div className="w-full h-auto  ">
            <Image src={mob} alt="ere" className="w-full h-auto" />
          </div>
          <div className="absolute top-0 left-0  ">
            <div className="flex flex-col  py-10 px-4 2xl:px-24 2xl:py-16 ">
              <div className="div">
                <h1 className="text-blue-bg mt-2 bold text-[22px] md:text-3xl">
                  Explore market via Categories
                </h1>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 md:gap-y-8  2xl:gap-12 mt-8">
                {items.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="w-full h-full flex justify-center items-center"
                    >
                      <Image src={category} alt="ere" className="w-full h-full" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
     </NormalLayout>
  );
};

export default Testing;
