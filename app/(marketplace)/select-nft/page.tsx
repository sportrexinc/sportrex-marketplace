"use client"
import ParentLayout from "@/app/layouts/ParentLayout";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

const SelectNft = () => {
  const { t } = useTranslation("translation");
  const navigate = useRouter();


  
  return (
    <ParentLayout>
      <div className="w-full flex flex-col">
        <div className="flex flex-col xl:mt-20 ">
          <h1 className="grad-text bold text-3xl mb-3">{t("choose")}</h1>
          <p className="text-grey-800  text-md regular">
            Select the type of NFT you want to create
            {t("choose_type")}
          </p>
          <p className="text-grey-800 text-md flex items-center space-x-1 regular">
            <span className="text-white">
              {t("collection")}
              
            </span>
            <span>or</span>

            <span className="text-white">
              Single
            {t("single")}
            </span>
          </p>
        </div>
        {/* #$$$$$$$$$$$$$$$$$$$$$$$ */}
        <div className="mt-16 mb-20 w-full lg:w-10/12 grid sm:gap-x-8 gap-y-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
          <div className="box-bordery  p-[2px] ">
            <div
              className="flex justify-center  items-center bold text-white xl:text-3xl h-[150px]  xl:h-[225px] bg-blue-header rounded-[25px]  cursor-pointer "
              onClick={() => navigate.push("/single-nft")}
            >
              <p>
                {t("single_nft")}
                

              </p>
            </div>
          </div>
          <div className="box-bordery  p-[2px] ">
            <div
              className="flex justify-center  items-center bold text-white xl:text-3xl h-[150px] xl:h-[225px] bg-blue-header rounded-[25px] cursor-pointer"
              onClick={() => navigate.push("/bundle-nft")}
            >
              <p>
                {t("bundle_nft")}
                

              </p>
            </div>
          </div>
          <div className="box-bordery  p-[2px] ">

          <div
            className="flex justify-center  items-center bold text-white xl:text-3xl h-[150px] xl:h-[225px] bg-blue-header rounded-[25px] cursor-pointer"
            onClick={() => navigate.push("/collection-nft")}
            >
              <p>
                {t("collection_nft")}
                
                
            </p>
          </div>
            </div>
        </div>

        {/* E##################### */}
      </div>
    </ParentLayout>
  );
};

export default SelectNft;
