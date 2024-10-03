"use client";
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
import { Formik, ErrorMessage } from "formik";
import * as yup from "yup";
import { CreateCollectionProps } from "@/types";
import {
  contractType,
  useAddress,
  useContract,
} from "@thirdweb-dev/react";
import APIService from "@/app/utils/APIServices";
import { baseUrl, url } from "@/app/utils/endpoints";
import ReUseModal from "@/app/components/modals/ReUseModal";
import CollectionCard from "@/app/components/Cards/CollectionCard";
import { AxiosResponse } from "axios";
import { useTranslation } from "react-i18next";
import ContractFactoryAbi from "@/abi/SptContractFactory.json";
import CollectionMintModal from "@/app/components/modals/CollectionMintModal";

const CollectionNft = () => {
  // @ts-ignore
  const { t } = useTranslation("translation");
  const { contract } = useContract(
    process.env.NEXT_PUBLIC_SPT_MASTER_CONTRACT_FACTORY,
    ContractFactoryAbi
  );
 
  const address = useAddress();
  const [collection, setCollection] = useState<CreateCollectionProps | null>(
    null
  );
  const [modal, setModal] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const validationSchema = yup.object().shape({
    logo: yup.mixed().required("Required"),
    name: yup.string().required("Required"),
    symbol: yup.string().required("Required"),
    blockChain: yup.string().required("Required"),
    contractType: yup.string().required("Required"),
  });

  return (
    <>
      {
        modal && (
          <CollectionMintModal data={collection} open={modal} setOpen={setModal} />
        )
      }
      { modal === false && (
    <ParentLayout>

      {address && modal === false ? (
        <div className="w-full flex flex-col md:w-10/12 xl:w-6/12 mx-auto mb-32 ">
          <ReUseModal open={modal} setOpen={() => setModal(false)}>
            <CollectionCard data={collection} />
          </ReUseModal>
          
          <div className="flex flex-col mt-8 xl:mt-20 ">
            <Header>Collection Creation</Header>
            <p className="text-grey-800  text-sm regular">
              All fields with asterisks are required
            </p>
          </div>
          <Formik
            initialValues={
              {
                name: "",
                desc: "",
                logo: null,
                banner: null,
                blockChain: "binance-testnet",
                category: "",
                external_link: "",
                feature: null,
                symbol: "",
                contractType: ""
              } as CreateCollectionProps
            }
            onSubmit={async (values, { setSubmitting }) => {
              console.log(values);
              
              let data: any 
              try {
                setSubmitting(true);
               if(values.contractType === 'erc 721') {
                 data = await contract?.call("create_nft_collection", [
                  values.name,
                  values.symbol,
                ]);
               }

               if(values.contractType === 'erc 1155') {
                data = await contract?.call("create_nft_bundle", [
                  values.name,
                  values.symbol,
                  ""
                ]);
               }
                    console.log(data);
                    console.log(contract);

                const contractAddress = data.receipt.logs[0].address;
                
                const formData = new FormData();
                formData.append("logo", values.logo);
                formData.append("name", values.name);
                formData.append("symbol", values.symbol);
                formData.append("contractAddress", contractAddress);
                values.blockChain &&
                formData.append("blockChain", values.blockChain);
                values.category && formData.append("category", values.category);
                values.banner && formData.append("banner", values.banner);
                values.desc && formData.append("desc", values.desc);
                values.external_link &&
                formData.append("external_link", values.external_link);
                formData.append("contractType", values.contractType)
                const response: AxiosResponse<{ data: CreateCollectionProps }> =
                  await APIService.post(
                    `/user/${address}/collection`,
                    formData
                  );
                setCollection(response.data.data);
                setSubmitting(false);
                setModal(true);
              } catch (error: any) {
                setSubmitting(false);
                alert(error.message);
              }
            }}
            validationSchema={validationSchema}
            >
            {({
              isSubmitting,
              values,
              isValid,
              handleChange,
              handleSubmit,
              setFieldValue,
            }) => (
              <div className="mt-12">
                <div className="form space-y-8 ">
                  <TextInput
                    placeholder={"Your Collection Name"}
                    label={"Name*"}
                    name="name"
                    value={values.name}
                    setValue={handleChange("name")}
                    errMessage={
                      <ErrorMessage
                      className="text-red-500"
                      name="name"
                      component={"div"}
                      />
                    }
                    />
                  <TextInput
                    placeholder={"Input your symbol here"}
                    label={"Symbol"}
                    name="symbol"
                    value={values.symbol}
                    setValue={handleChange("symbol")}
                    errMessage={
                      <ErrorMessage
                      className="text-red-500"
                      name="symbol"
                      component={"div"}
                      />
                    }
                    />
                  <FileInput
                    name="logo"
                    onChange={(e) => {
                      console.log(e.target.files[0]);
                      setFieldValue("logo", e.target.files[0]);
                    }}
                    label={"Upload Logo"}
                    errMessage={
                      <ErrorMessage
                      className="text-red-500"
                      name="logo"
                      component={"div"}
                      />
                    }
                    />

                  <SelectInput
                    placeholder=""
                    label={"Blockchain Technology"}
                    name="blockChain"
                    value={values.blockChain}
                    handleChange={handleChange("blockChain")}
                    options={[
                      { value: "binance-testnet", label: "BSC-Testnet" },
                    ]}
                    errMessage={
                      <ErrorMessage
                      className="text-red-500"
                      name="blockChain"
                      component={"div"}
                      />
                    }
                    />
                  <SelectInput
                    placeholder=""
                    label={"Collection Type"}
                    name="contractType"
                    value={values.contractType}
                    handleChange={handleChange("contractType")}
                    options={[
                      { value: "erc 721", label: "Single collection" },
                      { value: "erc 1155", label: "Bundle collection" },
                    ]}
                    errMessage={
                      <ErrorMessage
                      className="text-red-500"
                      name="contractType"
                      component={"div"}
                      />
                    }
                    />
                </div>
                <div className="mt-10 flex flex-col  ">
                  <div className="mt-20 flex justify-center items-center space-x-8">
                    <div className="w-6/12">
                      <ActionBtn
                        loading={isSubmitting}
                        name="Create Collection"
                        action={handleSubmit}
                        />
                    </div>
                  </div>
                  <div className="flex justify-center items-center mt-10">
                    <p className="semibold text-grey-800 text-center text-sm md:text-base regular ">
                      {/* {t("create_note")} */}
                      By clicking create , you are agreeing to our Terms of
                      Service and conditions
                    </p>
                  </div>
                </div>
              </div>
            )}
          </Formik>
        </div>
      ) : (
        <div className="h-[30vh] grid place-items-center">
          {" "}
          {/* @ts-ignore */}
          {"connect_profile_message"} ...
        </div>
      )}
      </ParentLayout>
      )}
      </>
  );
};

export default CollectionNft;
