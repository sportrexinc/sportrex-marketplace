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
import Image from "next/image";
export interface TraitsProps {
  value: string;
  trait_type: string;
  
}
 interface mintedNFTProps{
  tokenURI: string;
  metaDataURI: string;
  transactionHash: string;
 }
const SingleNft = () => {
  const [collections, setCollections] = useState<CreateCollectionProps[]>([]);
  const [traits, setTraits] = useState<TraitsProps[]>([]);
  const [trait, setTrait] = useState<TraitsProps>({
    value: "",
    trait_type: "",
  });

  const handleDeleteTrait = (id:number) => {
    const available = traits?.filter((item: any, index: number) => index !== id);
    console.log(available);
    setTraits(available);
  }
  console.log(traits);
  const [mintedNFTData, setMintedNFTData] = useState<mintedNFTProps>({
    tokenURI: "",
    metaDataURI: "",
    transactionHash: "",
  });
  //Change this to true for testing.
  const [isMinted, setIsMinted] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState(false);
  const [contractAddress, setContractAddress] = useState<string>("");
  const [singleNFTData, setSingleNFTData] = useState({});
  const [ercType, setErcType] = useState<string>("");



  
  const address = useAddress();
  const validationSchema = yup.object().shape({
    logo: yup.mixed().required("Required"),
    name: yup.string().required("Required"),
    collectionAddress: yup.string().required("Required"), 
    supply: yup.number().min(1).required("Required"),
  });

  const getAllUserCollections = async () => {
    try {
      const res = await APIService.get(`/user/${address}/collection`);
      console.log(res.data, "response");
      setCollections(res.data.data);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const { t } = useTranslation("translation");

  useEffect(() => {
    window.scrollTo(0, 0);
    if(!collections.length) getAllUserCollections();
  }, [address, collections]);

  return (
    <>
      {/* {isMinted && (
        <div className="bg-blue-body w-full h-screen">
          <NormalLayout>
            <div className="w-full h-screen p-4 flex items-center justify-center relative">
              <span
                className="absolute top-4 left-4 cursor-pointer"
                onClick={() => setIsMinted(false)}
              >
                <CloseIcon />
              </span>
              <div className="w-full lg:w-7/12 xl:w-1/2 mx-auto flex items-center justify-center flex-col">
                <span>
                  <Image
                    src={picOne}
                    alt="minted"
                    className="w-full max-w-[600px] h-auto rounded-md"
                  />
                </span>
                <p className="bold text-white mt-6 text-xl sm:text-2xl lg:text-3xl  ">
                  Your item has been minted
                </p>
                <div className="w-full sm:w-9/12 lg:w-1/2 mt-8 flex justify-center items-center mx-auto gap-4">
                  <ActionBtn name={"List Item"} />
                  <YellowActionBtn name={"View Item"} />
                </div>
                <div className="mx-auto mt-7">
                  <Link
                    href={"#"}
                    className="text-white flex items-center gap-2"
                  >
                    View on BSCscan{" "}
                    <span>
                      <FaArrowUpRightFromSquare />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </NormalLayout>
        </div>
      )} */}
      
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
              supply:"1",
            }}
            onSubmit={async (values, { setSubmitting, setFieldValue }) => {
              setSingleNFTData({...values, ercType});
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
                <div className="w-full flex flex-col xl:flex-row  mx-auto mb-32 gap-12">
                  <div className="xl:w-1/2 w-full h-max">
                   <div className="flex-col mt-8 lg:mt-20">
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
                  </div>
                  </div>
                  <div className="xl:w-1/2 w-full ">
                  
                
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
                  {
                    collections.length > 0 ?  <SelectInput
                    placeholder={"Select Collection"}
                    // label={t("blockchain_technology")}
                    label="Choose your collection"
                    name="select"
                    optionRender={(_, { index }) =>  (
                      <div onClick={() =>  setErcType(collections[index].contractType)} className="flex items-center gap-4">
                           <Image alt="collection" src={collections[index].logoImage?.url as string} width={45} height={45} className="rounded-[10px]"/> 
                        <div>
                          <div className="capitalize text-[14px] text-gray-400">{collections[index].name}</div>
                          <div className="uppercase text-[11px]  text-gray-600">{collections[index].contractType}</div>
                        </div>
                      </div>
                    )}
                    options={ collections.length === 0
                        ? [
                            {
                              value: "",
                              label: "Select a collection",
                            },
                          ]
                        : collections.map((item) => ({
                            value: item.contractAddress as string,
                            label: item.name,
                          }))
                    }
                    value={contractAddress}
                    handleChange={(e) => {
                      console.log(e)
                      setFieldValue("collectionAddress", e);
                      setContractAddress(e);
                      console.log(e);
                    }}
                    errMessage={
                      <ErrorMessage
                        className="text-red-500"
                        name="collectionName"
                        component={"div"}
                      />
                    }
                  /> : "Create a new collection"
                  }
                   
                    <div className="form space-y-8 mt-4">
                    
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
                     {ercType === 'erc 1155' &&
                       <TextInput
                        placeholder={"Enter supply"}
                        label={"Supply*"}
                        name="supply"
                        value={values.supply}
                        setValue={handleChange("supply")}
                        errMessage={
                          <ErrorMessage
                            className="text-red-500"
                            name="supply"
                            component={"div"}
                          />
                        }
                      />}
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
                        <div className="w-full justify-center items-center flex">
                          <div className="w-full flex flex-col">
                            <h1 className="semibold text-base sm:text-lg text-white ">
                              NFT Traits
                            </h1>
                            <p className="text-[#999] regular text-sm ">
                              Traits describes the attributes of your NFT assets
                            </p>
                          </div>
                          <div>
                            <button
                              className="bg-white regular text-sm text-[#020733] h-12 rounded-[7px] flex items-center justify-center min-w-[139px]  cursor-pointer"
                              onClick={() => {
                                // const newTraitFields = [
                                //   ...values.traits,
                                //   trait,
                                // ];
                                // setFieldValue("traits", newTraitFields);
                                setTraits([...traits, {value:"",trait_type:""}]);
                              }}
                            >
                              Add New Trait
                            </button>
                          </div>
                        </div>
                        <div className="w-full flex lg:items-start gap-[22px] mt-4 ">
                          <div className="w-full flex-grow flex flex-col gap-[11px] ">
                            {traits?.map((item, index) => {
                              return (
                                <>
                                  <div
                                    key={index}
                                    className="w-full grid grid-cols-3 gap-[22px] "
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
                                    <span
                                      className="text-red-500 regular text-sm flex items-center"
                                      onClick={() => handleDeleteTrait(index)}
                                    >
                                      Delete 
                                    </span>
                                  </div>
                                </>
                              );
                            })}
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
              mintedNFTData={mintedNFTData}
              setMintedNFTData={setMintedNFTData as any}
              showHeader={true}
              showCloseIcon={true}
              showfooter={true}
              openModal={openModal}
              setOpenModal={setOpenModal as any}
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
       <MintModal 
       isMinted={isMinted} 
       setIsMinted={setIsMinted} 
       mintedNFTData={mintedNFTData}
        setMintedNFTData={setMintedNFTData as any}
       />
    </>
  );
};

export default SingleNft;
