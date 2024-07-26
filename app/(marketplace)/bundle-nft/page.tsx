
"use client"
import ParentLayout from "@/app/layouts/ParentLayout";
import {
  FileInput,
  TextInput,
  TextAreaInput,
  SelectInput,
  YellowActionBtn,
  ActionBtn,
} from "@/app/components";
import { useTranslation } from "react-i18next";
import { useState } from "react";
const BundleNft = () => {
  const { t } = useTranslation("translation");
    const [inputs, setInputs] = useState<string[]>(["", "", ""]);
      const [supplies, setSupplies] = useState("")
    const handleInputChange = (index: number, value: string) => {
      const newInputs = [...inputs];
      newInputs[index] = value;
      setInputs(newInputs);
    };

    const handleAddNew = () => {
      setInputs([...inputs, ""]);
    };
  return (
    <ParentLayout>
      <div className="w-full flex flex-col md:w-10/12 xl:w-6/12 mx-auto mb-32 ">
        <div className="flex flex-col xl:mt-20 ">
          <h1 className="grad-text bold text-3xl mb-3">
            {t("bundle_nft_creation")}
          </h1>
          <p className="text-grey-800  text-sm regular">{t("all_fields")}</p>
        </div>
        <div className="mt-12">
          <div className="flex-col">
            <h1 className="semibold text-white text-xl">
              {t("upload_multiple")} (s)*
            </h1>
            <p className="text-grey-800 text-md">{t("upload_inst")}</p>
          </div>
          <div className="form gap-y-8 mt-4 flex flex-col ">
            <FileInput />
            <TextInput
              placeholder={t("name_placeholder")}
              label={"Bundle Name"}
              name="name"
              value={""}
              setValue={function (value: React.SetStateAction<string>): void {
                throw new Error("Function not implemented.");
              }}
            />
            <TextAreaInput
              placeholder={t("nft_desc_placeholder")}
              label={t("desc")}
              name="description"
              value={""}
              setValue={function (value: React.SetStateAction<string>): void {
                throw new Error("Function not implemented.");
              }}
            />
            <div className="flex flex-col">
              <label className="text-white semibold text-sm md:text-lg regular">
                Add Nft Arrays* .
                <span className="text-white text-xs">
                  Input a unique identifier
                </span>
              </label>
              <div className="w-full">
                {inputs.map((input, index) => (
                  <div className="flex items-center gap-2 w-full ">
                    <span className="bold text-white lg:text-[22px] text-base mt-2 w-auto ">
                      {index + 1}
                    </span>
                    <span className="flex flex-grow w-full">

                  <TextInput
                    key={index}
                    label=""
                    placeholder={`Nft Array ${index + 1} `}
                    name={`name${index}`}
                    value={input}
                    setValue={(value) => handleInputChange(index, value)}
                    />
                    </span>
                    </div>
                ))}
              </div>
              <span className="w-auto max-w-[200px] mt-8">
                <ActionBtn name={"Add new field"} action={handleAddNew} />
              </span>
            </div>
            <TextInput
              placeholder={"0 supplies"}
              label={"Input number of supplies"}
              name="link"
              value={supplies}
              setValue={setSupplies}
            />
            <TextAreaInput
              placeholder={"Your nft description"}
              label={"Properties"}
              name="property  description"
              subLabel=" List attributes that represents your NFT (color, shape, mood, etc..)"
              value={""}
              setValue={function (value: React.SetStateAction<string>): void {
                throw new Error("Function not implemented.");
              }}
            />
            <SelectInput
              placeholder="Select %fee"
              label="% Fee for creator earning "
              name="fee"
              options={[
                { value: "5%", label: "5%" },
                { value: "10%", label: "10%" },
                { value: "15%", label: "15%" },
              ]}
            />
         
            <SelectInput
              placeholder={t("ethereum")}
              label={t("blockchain_technology")}
              name="technology"
              options={[
                { value: "collection", label: "Collection" },
                { value: "single", label: "Single" },
                { value: "bundle", label: "Bundle" },
              ]}
            />
          </div>
          <div className="mt-10 flex flex-col  ">
            <div className="mt-20 flex justify-center items-center space-x-8">
              <div className="w-6/12">
                <ActionBtn
                  name={t("create_nft")}
                  action={() => console.log("ere")}
                />
              </div>
            </div>
            <div className="flex justify-center items-center mt-10">
              <p className="semibold text-grey-800 text-base regular ">
                {t("create_note")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </ParentLayout>
  );
};

export default BundleNft;
