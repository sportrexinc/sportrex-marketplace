"use client";
import ParentLayout from "@/app/layouts/ParentLayout";
import {
  FileInput,
  TextInput,
  TextAreaInput,
  SelectInput,
  YellowActionBtn,
  ActionBtn,
} from "@/app/components";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import JsonFileInput from "@/app/components/Inputs/JsonFileInput";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import Image from "next/image";

const BundleNft = () => {
  const { t } = useTranslation("translation");

  const [inputs, setInputs] = useState<string[]>([]);
  const [ercType, setErcType] = useState<string>("");
  const [contractAddress, setContractAddress] = useState<string>("");
  const { created_collections } = useSelector((state: RootState) => state.userNft)
  const erc1155Collections = created_collections?.filter(collection => collection.contractType === "erc 1155")

  const handleInputChange = (index: number, value: string) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  return (
    <ParentLayout>
      <div className="w-full flex flex-col md:w-10/12 xl:w-6/12 mx-auto mb-32 ">
        <div className="flex flex-col xl:mt-20 ">
              
          <h1 className="grad-text bold text-3xl mb-3">
            {/* {t("bundle_nft_creation")} */}
            Bundle Nft Creation
          </h1>
          <p className="text-grey-800  text-sm regular">
            {/* {t("all_fields")} */}
            All fields with asterisks are required
          </p>
        </div>
        {
                created_collections?.length > 0 ?  <SelectInput
                placeholder={"Select Collection"}
                // label={t("blockchain_technology")}
                label="Choose your collection"
                name="select"
                optionRender={(_, { index }) =>  (
                  <div onClick={() =>  setErcType(erc1155Collections[index].contractType)} className="flex items-center gap-4">
                        <Image alt="collection" src={erc1155Collections[index].logoImage?.url as string} width={45} height={45} className="rounded-[10px]"/> 
                    <div>
                      <div className="capitalize text-[14px] text-gray-400">{erc1155Collections[index].name}</div>
                      <div className="uppercase text-[11px]  text-gray-600">{erc1155Collections[index].contractType}</div>
                    </div>
                  </div>
                )}
                options={ erc1155Collections?.length === 0
                    ? [
                        {
                          value: "",
                          label: "Select a collection",
                        },
                      ]
                    : erc1155Collections?.map((item) => ({
                        value: item.contractAddress as string,
                        label: item.name,
                      }))
                }
                value={contractAddress}
                handleChange={(e) =>  setContractAddress(e)}
              /> : "Create a new collection"
              }
        <div className="mt-12">
          <div className="flex-col">
            <h1 className="semibold text-white text-xl">
              {/* {t("upload_multiple")} (s)* */}
              Upload multiple digital File (s)*
            </h1>
            <p className="text-grey-800 text-md">
              File must contain one .csv or .json file with metadata - <br />
              <span>
                <Link
                  href={"./example-with-maps.csv"}
                  download
                  className="text-yellow"
                >
                  Download example.csv
                </Link>
                ,
              </span>
              <span>
                <Link
                  href={"./example-with-ipfs.csv"}
                  download
                  className="text-yellow"
                >
                  Download example.json
                </Link>
              </span>
            </p>
            <p className="text-grey-800 text-md">
              The csv must have a name column, which defines the name of the
              NFT.
            </p>
          </div>
          <div className="form gap-y-8 mt-4 flex flex-col ">
            <JsonFileInput name="file" />
          </div>
          <div className="mt-10 flex flex-col">
            <div className="mt-20 flex justify-center items-center space-x-8">
              <div className="w-6/12">
                <ActionBtn
                  // name={t("create_nft")}
                  name={"Create Bundle"}
                  action={() => console.log("ere")}
                />
              </div>
            </div>
            <div className="flex justify-center items-center mt-10">
              <p className="semibold text-grey-800 text-base regular ">
                {/* {t("create_note")} */}
                By clicking create , you are agreeing to our Terms of Service
                and conditions
              </p>
            </div>
          </div>
        </div>
      </div>
    </ParentLayout>
  );
};

export default BundleNft;
