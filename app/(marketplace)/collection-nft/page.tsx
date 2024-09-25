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
  useAddress,
  useContract,
  useContractWrite,
  useUpdateMetadata,
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
  const { mutateAsync: createNFTCollection } = useContractWrite(
    contract,
    "createNFTCollection"
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
              } as CreateCollectionProps
            }
            onSubmit={async (values, { setSubmitting }) => {
              try {
                setSubmitting(true);
                const data = await contract?.call("create_nft_collection", [
                  values.name,
                  values.symbol,
                ]);
                // const data = await createNFTCollection({
                  //   args: [values.name, values.symbol],
                  //   overrides: {
                    //     value: convertTowei(0.0005),
                    //   },
                    // });
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

                  {/* <TextAreaInput
                    placeholder={t("nft_desc_placeholder")}
                    label={t("description")}
                    name="desc"
                    value={values.desc}
                    setValue={handleChange("desc")}
                    errMessage={
                      <ErrorMessage
                      className="text-red-500"
                      name="desc"
                      component={"div"}
                      />
                      }
                      /> */}
                  {/* <TextInput
                    placeholder={t("external_link_placeholder")}
                    label={t("external_label")}
                    name="external_link"
                    value={values.external_link}
                    setValue={handleChange("external_link")}
                    errMessage={
                      <ErrorMessage
                        className="text-red-500"
                        name="external_link"
                        component={"div"}
                        />
                        }
                        /> */}
                  {/* <FileInput
                    name="banner"
                    onChange={(e) => {
                      console.log(e.target.files[0]);
                      setFieldValue("banner", e.target.files[0]);
                      }}
                      label="Upload Background picture"
                      errMessage={
                        <ErrorMessage
                        className="text-red-500"
                        name="banner"
                        component={"div"}
                        />
                        }
                        /> */}
                  {/* 
                  <SelectInput
                  placeholder={t("select_category")}
                  label={t("category")}
                  name="category"
                  handleChange={handleChange("category")}
                  value={values.category}
                  options={[
                    { value: "art", label: "Art" },
                    { value: "gaming", label: "Gaming" },
                    { value: "memberships", label: "Memberships" },
                    { value: "pfps", label: "PFPs" },
                    { value: "music", label: "Music" },
                    { value: "photography", label: "Photography" },
                    ]}
                    errMessage={
                      <ErrorMessage
                      className="text-red-500"
                      name="category"
                      component={"div"}
                      />
                      }
                      /> */}
                  {/* <SelectInput
                    placeholder="Select %fee"
                    label="% Fee for creator earning "
                    name="fee"
                    options={[
                      { value: "5%", label: "5%" },
                      { value: "10%", label: "10%" },
                      { value: "15%", label: "15%" },
                      ]}
                      /> */}
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
                    label={"Erc Type"}
                    name="erc"
                    value={values.blockChain}
                    handleChange={handleChange("erc")}
                    options={[
                      { value: "erc-20", label: "erc-20" },
                    ]}
                    errMessage={
                      <ErrorMessage
                      className="text-red-500"
                      name="blockChain"
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
