"use client"
import ParentLayout from "../../layouts/ParentLayout";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import Link from "next/link";
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
            {/* {t("choose_type")} */}
          </p>
          <p className="text-grey-800 text-md flex items-center space-x-1 regular">
            <span className="text-white">
              {/* {t("collection")} */}
              Collection
            </span>
            <span>or</span>

            <span className="text-white">
              Single NFTs
            {/* {t("single")} */}
            </span>
          </p>
        </div>
        {/* #$$$$$$$$$$$$$$$$$$$$$$$ */}
        <div className="mt-16 mb-20 w-full lg:w-10/12 grid sm:gap-x-8 gap-y-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
          <div className="box-bordery  p-[2px] ">
            <Link href={"/solana/single-nft"}
              className="flex justify-center  items-center bold text-white xl:text-3xl h-[150px]  xl:h-[225px] bg-blue-header rounded-[25px]  cursor-pointer "
              // onClick={() => navigate.push("/single-nft")}
            >
              <p>
                {/* {t("single_nft")} */}
                Single NFT

              </p>
            </Link>
          </div>
          {/* <div className="box-bordery  p-[2px] ">
              <Link href={"/bundle-nft"}
              className="flex justify-center  items-center bold text-white xl:text-3xl h-[150px] xl:h-[225px] bg-blue-header rounded-[25px] cursor-pointer"
              
            >
              <p>
               
                Bundle NFT

              </p>
            </Link>
          </div> */}
          <div className="box-bordery  p-[2px] ">

            <Link href={"/solana/collection-nft"}
            className="flex justify-center  items-center bold text-white xl:text-3xl h-[150px] xl:h-[225px] bg-blue-header rounded-[25px] cursor-pointer"
            // onClick={() => navigate.push("/collection-nft")}
            >
              <p>
                {/* {t("collection_nft")} */}
                Collection NFT
                
            </p>
          </Link>
            </div>
        </div>

        {/* E##################### */}
      </div>
    </ParentLayout>
  );
};

export default SelectNft;
