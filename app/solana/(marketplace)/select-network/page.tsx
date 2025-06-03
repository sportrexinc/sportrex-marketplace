"use client"
import ParentLayout from "@/app/layouts/ParentLayout";
import { LinkBtn } from "@/app/components";
import { useTranslation } from "react-i18next";

const SelectNetwork = () => {
  const { t } = useTranslation("translation");

  return (
    <ParentLayout current={2}>
      <h1 className="text-white my-10">Select Network</h1>
      <div className="flex space-x-8">
        <LinkBtn name="single nft" path="/mint-single-nft" />
        <LinkBtn name="collection nft" path="/mint-collection-nft" />
        <LinkBtn name="bundle nft" path="/mint-bundle-nft" />
      </div>
    </ParentLayout>
  );
};

export default SelectNetwork;
