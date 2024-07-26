"use client"
import React, { useEffect, useState } from "react";
import ParentLayout from "@/app/layouts/ParentLayout";
import {
  FileInput,
  TextInput,
  TextAreaInput,
  SelectInput,
  YellowActionBtn,
  ActionBtn,
  Header,
} from "@/app/components";
import { useTranslation } from "react-i18next";
const EditNft = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { t } = useTranslation("translation");

  return (
    <ParentLayout>
      <div className="w-full flex flex-col md:w-10/12 xl:w-6/12 mx-auto mb-32 ">
        <div className="flex flex-col mt-8 xl:mt-20 ">
          <Header>{t("edit_nft")}</Header>
          <p className="text-grey-800  text-sm regular">{t("all_field")}</p>
        </div>
        <div className="mt-12">
          <div className="flex-col">
            <h1 className="semibold text-white  text-sm md:text-xl">
              {t("upload")} (s)*
            </h1>
            <p className="text-grey-800 text-[10px] md:text-md">
              {t("upload_inst")}
            </p>
          </div>
          <div className="form space-y-8 mt-4">
            <FileInput />
            <TextInput
              placeholder={t("name_placeholder")}
              label={t("asset_name")}
              name="name"
              value={""}
              setValue={function (value: React.SetStateAction<string>): void {
                throw new Error("Function not implemented.");
              }}
            />
            <TextInput
              placeholder={t("external_link_placeholder")}
              label={t("external_label")}
              name="link"
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
            <SelectInput
              placeholder={t("collections")}
              label={t("collection_label")}
              name="collections"
              options={[
                { value: "collection", label: "Collection" },
                { value: "single", label: "Single" },
                { value: "bundle", label: "Bundle" },
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
              <div className="w-5/12">
                <ActionBtn name={t("save_item")} action={undefined} />
              </div>
              <div className="w-5/12">
                <YellowActionBtn name={t("delete_item")} action={undefined} />
              </div>
            </div>
            <div className="flex justify-center items-center mt-10">
              <p className="semibold text-grey-800 text-sm md:text-base regular text-center md:text-start ">
                {t("create_note")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </ParentLayout>
  );
};

export default EditNft;
