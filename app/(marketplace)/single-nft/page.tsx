"use client";
import { Fragment, useEffect, useState } from "react";
import ParentLayout from "@/app/layouts/ParentLayout";
import {
  FileInput,
  TextInput,
  TextAreaInput,
  SelectInput,
  ActionBtn,
  Header,
  YellowActionBtn,
} from "@/app/components";
import { useTranslation } from "react-i18next";
import { useAddress, useContract } from "@thirdweb-dev/react";
import { Formik, ErrorMessage } from "formik";
import { useStorageUpload } from "@thirdweb-dev/react";
import * as yup from "yup";
import { CreateCollectionProps, CreateSingleNFTProps } from "@/types";
import StandardModal from "@/app/components/modals/StandardModal";
import APIService from "@/app/utils/APIServices";
import MintModal from "../../components/modals/MintModal";
import NormalLayout from "@/app/layouts/NormalLayout";
import Link from "next/link";
import Image from "next/image";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import picOne from "../../../public/assets/market/one.png";
import { CloseIcon } from "../../../public/assets/svg/index";
export interface TraitsProps {
  value: string;
  trait_type: string;
}
const SingleNft = () => {
  const { mutateAsync: upload, isLoading } = useStorageUpload();
  const [modal, setModal] = useState<boolean>(false);
  const [isCollectionLoading, setIsCollectionLoading]= useState(true)
  const [collections, setCollections] = useState<CreateCollectionProps[]>([]);
  const [trait, setTrait] = useState<TraitsProps>({
    value: "",
    trait_type: "",
  });
  const [traits, setTraits] = useState<TraitsProps[]>([]);
  const [isMinted, setIsMinted] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState(false);
  const [contractAddress, setContractAddress] = useState<string>("");
  const [singleNFTData, setSingleNFTData] = useState({});
  const address = useAddress();
  const validationSchema = yup.object().shape({
    logo: yup.mixed().required("Required"),
    name: yup.string().required("Required"),
    collectionAddress: yup.string().required("Required"),
  });

  const getAllUserCollections = async () => {
    try {
      const res = await APIService.get(`/user/${address}/collection`);
      console.log(res.data, "response");
      setCollections(res.data.data);
    } catch (error: any) {
      console.log(error.message);
    }finally{
      setIsCollectionLoading(false)
    }
  };

  const { t } = useTranslation("translation");

  useEffect(() => {
    window.scrollTo(0, 0);
    getAllUserCollections();
  }, [address]);

  return (
    <>
      
      {!isMinted && (
        <ParentLayout>
          {/* <div className="w-full flex flex-col md:w-10/12 xl:w-6/12 mx-auto mb-32 ">
        <ReUseModal open={modal} setOpen={() => setModal(false)}>
        <CollectionCard data={singleCreatedNFT} />
        </ReUseModal>
        <div className="flex flex-col mt-8 xl:mt-20 ">
        <Header>{t("collection_creation")}</Header>
        <p className="text-grey-800  text-sm regular">{t("all_fields")}</p>
        </div>
        </div> */}
          <Formik
            initialValues={{
              logo: null,
              name: "",
              desc: "",
              traits: [] as TraitsProps[],
              collectionAddress: "",
              external_link: "",
            }}
            onSubmit={async (values, { setSubmitting, setFieldValue }) => {
              setSingleNFTData(values);
              console.log(contractAddress);
              setOpenModal(true);
            }}
            validationSchema={validationSchema}
          >
            {({
              isSubmitting,
              values,
              handleChange,
              handleSubmit,
              setFieldValue,
            }) => {
              return (
                <div className="w-full flex flex-col md:w-10/12 xl:w-6/12 mx-auto mb-32 ">
                  <div className="flex flex-col mt-8 xl:mt-20 ">
                    <Header>
                      {/* {t("nft_creation")} */}
                      Nft Creation
                    </Header>
                    <p className="text-grey-800  text-sm regular">
                      {/* {t("all_fields")} */}
                      All fields with asterisks are required
                    </p>
                  </div>
                  <div className="mt-12">
                    <SelectInput
                      placeholder={"Select Collection"}
                      // label={t("blockchain_technology")}
                      label="Choose your collection"
                      name="select"
                      options={
                        isCollectionLoading
                          ? [{ value: "", label: "Loading collections..." }]
                          : collections.length === 0
                          ? [
                              {
                                value: "",
                                label: "No collection created yet..",
                              },
                            ]
                          : collections.map((item) => ({
                              value: item.contractAddress as string,
                              label: item.name,
                            }))
                      }
                      value={contractAddress}
                      handleChange={(e) => {
                        setFieldValue("collectionAddress", e.target.value);
                        setContractAddress(e.target.value);
                        console.log(e.target.value);
                      }}
                      errMessage={
                        <ErrorMessage
                          className="text-red-500"
                          name="collectionName"
                          component={"div"}
                        />
                      }
                    />
                    <div className="flex-col mt-8">
                      <h1 className="semibold text-white text-md md:text-xl">
                        {/* {t("upload")} (s)* */}
                        Upload digital File (s)*
                      </h1>
                      <p className="text-grey-800 text-md">
                        {/* {t("upload_inst")} */}
                        Add your image / video / audio file / 3D Assets
                      </p>
                    </div>
                    <div className="form space-y-8 mt-4">
                      <FileInput
                        name="logo"
                        onChange={(e) => {
                          console.log(e.target.files[0]);
                          setFieldValue("logo", e.target.files[0]);
                        }}
                        errMessage={
                          <ErrorMessage
                            className="text-red-500"
                            name="logo"
                            component={"div"}
                          />
                        }
                      />
                      <TextInput
                        // placeholder={t("name_placeholder")}
                        placeholder="Your Nft name"
                        // label={t("asset_name")}
                        label="Asset name*"
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
                      <TextAreaInput
                        placeholder={" Your Nft Description"}
                        // label={t("desc")}
                        label="Your Nft Description"
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
                      />

                      <TextInput
                        placeholder={"external link"}
                        label={"External Link*"}
                        name="external_link"
                        value={values.external_link}
                        setValue={handleChange("external_link")}
                        errMessage={
                          <ErrorMessage
                            className="text-red-500"
                            name="supply"
                            component={"div"}
                          />
                        }
                      />
                      <div className="w-full flex flex-col">
                        <h1 className="semibold text-base sm:text-lg text-white ">
                          NFT Traits
                        </h1>
                        <p className="text-[#999] regular text-sm ">
                          Traits describes the attributes of your NFT assets
                        </p>
                        <div className="w-full flex lg:items-start gap-[22px] mt-4 ">
                          <div className="w-auto flex-grow flex flex-col gap-[11px]">
                            {traits?.map((item, index) => {
                              return (
                                <>
                                  <div
                                    key={index}
                                    className="w-full grid grid-cols-2 gap-[22px] "
                                  >
                                    <span className="w-full">
                                      <input
                                        type="text"
                                        className="h-12 rounded-[7px] bg-[#ababab] bg-opacity-10 text-sm text-white placeholder:text-[#ABABAB] regular px-4 w-full outline-none border-none focus:border-none focus:outline-none"
                                        placeholder="Trait Type"
                                        onChange={(e: any) =>
                                          setTrait((prev) => ({
                                            ...prev,
                                            trait_type: e.target.value,
                                          }))
                                        }
                                      />
                                    </span>
                                    <span className="w-full">
                                      <input
                                        type="text"
                                        className="h-12 rounded-[7px] bg-[#ababab] bg-opacity-10 text-sm text-white placeholder:text-[#ABABAB] regular px-4 w-full "
                                        placeholder="Trait Name"
                                        onChange={(e: any) =>
                                          setTrait((prev) => ({
                                            ...prev,
                                            value: e.target.value,
                                          }))
                                        }
                                      />
                                    </span>
                                  </div>
                                </>
                              );
                            })}
                          </div>
                          <div>
                            <button
                              className="bg-white regular text-sm text-[#020733] h-12 rounded-[7px] flex items-center justify-center min-w-[139px]  cursor-pointer"
                              onClick={() => {
                                const newTraitFields = [
                                  ...values.traits,
                                  trait,
                                ];
                                setFieldValue("traits", newTraitFields);
                                setTraits(newTraitFields);
                              }}
                            >
                              Add New Trait
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-10 flex flex-col  ">
                      <div className="mt-20 flex justify-center items-center space-x-8">
                        <div className="w-6/12">
                          <ActionBtn
                            loading={isSubmitting}
                            name={t("Create Single NFT")}
                            action={handleSubmit}
                          />
                        </div>
                        {/* <div className="w-5/12">
                <YellowActionBtn name="Save Changes" />
              </div> */}
                      </div>
                      <div className="flex justify-center items-center mt-10">
                        <p className="semibold text-grey-800 text-sm text-center md:text-start md:text-base regular ">
                          {/* {t("create_note")} */}
                          By clicking create , you are agreeing to our Terms of
                          Service and conditions
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }}
          </Formik>
          {openModal && (
            <StandardModal
              singleNFTData={singleNFTData as any}
              contractAddress={contractAddress}
              isMinted={isMinted}
              setIsMinted={setIsMinted}
              showHeader={true}
              showCloseIcon={true}
              showfooter={true}
              closeModal={() => setOpenModal(false)}
              onConfirm={() => ""}
              showCloseButton={false}
              showConfirmButton={false}
              closeButtonLabel={"No, Cancel"}
              confirmButtonClassName="bg-primary-900 text-white"
              confirmButtonLabel="Yes, Remove"
              closeButtonClassName="bg-transparent text-secondary-500 font-[400] rounded-[30px] border border-[#C3E69E]/50 hover:opacity-90"
            >
            </StandardModal>
          )}
           
        </ParentLayout>
      )}
       <MintModal isMinted={isMinted} setIsMinted={setIsMinted}/>
    </>
  );
};

export default SingleNft;
