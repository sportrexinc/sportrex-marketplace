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
import { useContract } from "@thirdweb-dev/react";
import { Formik, ErrorMessage } from "formik";
import { useStorageUpload } from "@thirdweb-dev/react";
import * as yup from "yup";
import { CreateSingleNFTProps } from "@/types";
import ContractFactoryAbi from "@/abi/SptContractFactory.json";
import StandardModal from "@/app/components/modals/StandardModal";
import NormalLayout from "@/app/layouts/NormalLayout";
import { CloseIcon } from "@/public/assets/svg";
import Image from "next/image"
import picOne from "../../../public/assets/market/one.png";
import Link from "next/link";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
interface TraitsProps {
  name: string,
  type:string,
}
const SingleNft = () => {
  const { mutateAsync: upload, isLoading } = useStorageUpload();
  const [modal, setModal] = useState<boolean>(false);
  const [singleCreatedNFT, setSingleCreatedNFT] =
    useState<CreateSingleNFTProps | null>(null);
  const [traits, setTraits] = useState<TraitsProps[]>([{ name: "", type: "" }]);
  const [isMinted, setIsMinted] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState(false);
  const validationSchema = yup.object().shape({
    logo: yup.mixed().required("Required"),
    name: yup.string().required("Required"),
    supply: yup.string().required("Required"),
    tokenURI: yup.string().required("Required"),
    blockChain: yup.string().required("Required"),
  });
  const addTraits = () => {
    setTraits([
      ...traits,
      { name: "", type: "", },
    ]);
  };
    const handleTraitChange = (
      index: number,
      key: keyof TraitsProps,
      value: string | number
    ) => {
      const updatedTraits = [...traits];
      updatedTraits[index] = {
        ...updatedTraits[index],
        [key]: value,
      };
      setTraits(updatedTraits);
    };
  const { t } = useTranslation("translation");
  const { contract } = useContract(
    process.env.NEXT_PUBLIC_SPT_MASTER_CONTRACT_FACTORY,
    ContractFactoryAbi
  );
  useEffect(() => {
    window.scrollTo(0, 0);
    console.log(process.env.NEXT_PUBLIC_SPT_MASTER_CONTRACT_FACTORY);
  }, []);

  return (
    <>
      {isMinted && (
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
                    className="w-9/12 max-w-[400px] h-auto rounded-md"
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
                  <Link href={"#"} className="text-white flex items-center gap-2">
                    View on Etherscan{" "}
                    <span>
                      <FaArrowUpRightFromSquare />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </NormalLayout>
        </div>
      )}
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
            initialValues={
              {
                logo: null,
                name: "",
                supply: "",
                tokenURI: "",
                desc: "",
                blockChain: "",
              } as CreateSingleNFTProps
            }
            onSubmit={async (values, { setSubmitting }) => {
              try {
                setSubmitting(true);

                const data = await contract?.call("create_nft", [
                  values.name,
                  values.supply,
                  values.tokenURI,
                ]);
                setSingleCreatedNFT(data.receipt);
                console.log(data);
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
              handleChange,
              handleSubmit,
              setFieldValue,
            }) => {
              const getURI = async () => {
                try {
                  const filesToUpload = [values.logo];
                  const uris = await upload({ data: filesToUpload });
                  console.log(uris);
                  setFieldValue("tokenURI", uris[0]);
                } catch (error) {
                  console.error("Error uploading file:", error);
                }
              };
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
                    <div className="flex-col">
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
                      <SelectInput
                        placeholder={"Select Collection"}
                        // label={t("blockchain_technology")}
                        label="Choose your collection"
                        name="select"
                        options={[
                          { value: "Collection 1", label: "collection 2" },
                        ]}
                        value={values.collectionName}
                        handleChange={handleChange("collectionName")}
                        errMessage={
                          <ErrorMessage
                            className="text-red-500"
                            name="collectionName"
                            component={"div"}
                          />
                        }
                      />
                      <TextInput
                        placeholder={"0"}
                        label={"Number of Supply*"}
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
                                <div className="w-full grid grid-cols-2 gap-[22px] ">
                                  <span className="w-full">
                                    <input
                                      type="text"
                                      className="h-12 rounded-[7px] bg-[#ababab] bg-opacity-10 text-sm text-white placeholder:text-[#ABABAB] regular px-4 w-full outline-none border-none focus:border-none focus:outline-none "
                                      placeholder="Trait Type"
                                      value={item?.type}
                                      onChange={(e: any) =>
                                        handleTraitChange(
                                          index,
                                          "type",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </span>
                                  <span className="w-full">
                                    <input
                                      type="text"
                                      className="h-12 rounded-[7px] bg-[#ababab] bg-opacity-10 text-sm text-white placeholder:text-[#ABABAB] regular px-4 w-full "
                                      placeholder="Trait Name"
                                      value={item?.name}
                                      onChange={(e: any) =>
                                        handleTraitChange(
                                          index,
                                          "name",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                          <div>
                            <button
                              className="bg-white regular text-sm text-[#020733] h-12 rounded-[7px] flex items-center justify-center min-w-[139px]  cursor-pointer"
                              onClick={addTraits}
                            >
                              Add New Trait
                            </button>
                          </div>
                        </div>
                      </div>
                      {/* <TextInput
                    placeholder={"Token URI"}
                    label={"Token URI"}
                    name="tokenURI"
                    value={values.tokenURI}
                    setValue={handleChange("tokenURI")}
                    errMessage={
                      <ErrorMessage
                      className="text-red-500"
                      name="supply"
                      component={"div"}
                      />
                      }
                      /> */}
                      {/* <ActionBtn
                    loading={isLoading}
                    name={t("Get URI")}
                    action={getURI}
                    /> */}
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

                      <SelectInput
                        placeholder={t("ethereum")}
                        label={t("blockchain_technology")}
                        name="blockChain"
                        options={[
                          { value: "bsc-testnet", label: "bsc-testnet" },
                        ]}
                        value={values.blockChain}
                        handleChange={handleChange("blockChain")}
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
              <Fragment key="header">
                <div className="flex items-center">
                  <h4 className="text-lg semibold text-white">
                    Creating your item
                  </h4>
                </div>
              </Fragment>
              <Fragment key="body">
                <div className="flex   pb-0 flex-col items-center justify-center gap-6 ">
                  {/* start */}
                  <div className="w-full flex items-center gap-4">
                    <span className="w-10 h-10 rounded-full bg-blue-btn flex items-center justify-center">
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        className="w-4 h-4 accent-blue-btn"
                        checked
                      />
                    </span>
                    <div className="flex flex-col">
                      <p className="regular text-white text-sm ">
                        Uploading to decentralized server
                      </p>
                      <p className="light text-[#ababab] text-xs">
                        This may take a few minutes.
                      </p>
                    </div>
                  </div>
                  {/* end  */}
                  {/* start */}
                  <div className="w-full flex items-center gap-4">
                    <span className="w-10 h-10 rounded-full bg-blue-btn flex items-center justify-center">
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        className="w-4 h-4 accent-blue-btn"
                        checked
                      />
                    </span>
                    <div className="flex flex-col">
                      <p className="regular text-white text-sm ">
                        Uploading to decentralized server
                      </p>
                      <p className="light text-[#ababab] text-xs">
                        This may take a few minutes.
                      </p>
                    </div>
                  </div>
                  {/* end  */}
                  {/* start */}
                  <div className="w-full flex items-center gap-4">
                    <span className="w-10 h-10 rounded-full bg-blue-btn flex items-center justify-center">
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        className="w-4 h-4 accent-blue-btn"
                        checked
                      />
                    </span>
                    <div className="flex flex-col">
                      <p className="regular text-white text-sm ">
                        Uploading to decentralized server
                      </p>
                      <p className="light text-[#ababab] text-xs">
                        This may take a few minutes.
                      </p>
                    </div>
                  </div>
                  {/* end  */}
                </div>
              </Fragment>

              <Fragment key="footer"></Fragment>
            </StandardModal>
          )}
        </ParentLayout>
      )}
    </>
  );
};

export default SingleNft;
