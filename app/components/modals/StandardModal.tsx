import React, { useState, useEffect, useLayoutEffect } from "react";
import "./modal.css";
import { CloseIcon } from "../../../public/assets/svg/index";
import { useAddress, useContract } from "@thirdweb-dev/react";
import SPT721Abi from "@/abi/SptERC721.json";
import { useStorageUpload } from "@thirdweb-dev/react";
import ActionBtn from "../Button/ActionBtn";
import { TraitsProps } from "@/app/(marketplace)/single-nft/page";
import { CreateSingleNFTProps } from "@/types";

// import { Button } from "../Forms/Button";
interface modalProps {
  showHeader?: boolean;
  children?: any;
  closeModal: (e: React.MouseEvent<HTMLElement>) => void;
  onConfirm: (e: React.MouseEvent<HTMLElement>) => void;
  showCloseIcon?: boolean;
  showfooter?: boolean;
  showCloseButton?: boolean;
  closeButtonLabel?: string;
  closeButtonClassName?: string;
  showConfirmButton?: boolean;
  confirmButtonLabel?: string;
  confirmButtonClassName?: string;
  headerClassName?: string;
  isConfirmButtonDisabled?: boolean;
  loading?: boolean;
  modalWidth?: string;
  modalBodyClasses?: string;
  modalFooterClasses?: string;
  singleNFTData: {
    logo: string;
    name: string;
    desc: string;
    external_link: string;
    traits: TraitsProps[];
    collectionAddress: string;
    
  };
  contractAddress: string
}

const StandardModal = ({
  showHeader,
  children,
  closeModal,
  onConfirm,
  showCloseIcon,
  showfooter,
  showCloseButton,
  closeButtonLabel,
  closeButtonClassName,
  showConfirmButton,
  confirmButtonLabel,
  confirmButtonClassName,
  headerClassName,
  loading,
  modalWidth,
  isConfirmButtonDisabled,
  modalBodyClasses,
  modalFooterClasses,
  singleNFTData,
  contractAddress
}: modalProps) => {



  const { mutateAsync: upload, isLoading } = useStorageUpload();
  const [singleCreatedNFT, setSingleCreatedNFT] =
    useState<CreateSingleNFTProps | null>(null);
  const [tokenURI, setTokenURI] = useState<any>();
  const [fullURI, setFullURI] = useState<any>();
  const findByKey = (name: string) =>
    children.map((child: { key: any }) => {
      if (child.key === name) return child;
    });

  const onCloseModal = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();

    return closeModal(e);
  };
  const { contract } = useContract(contractAddress, SPT721Abi);

  const handleSingleNFTMint = async () => {
    try {
      let tokenURI;


      const imageToUpload = [singleNFTData.logo];
      const imageURI = await upload({ data: imageToUpload });
      console.log(imageURI);
      tokenURI = imageURI[0];
      setTokenURI(imageURI[0]);

      // Uploading MetaDATA to IPFS

      const filesToUpload = {
        name: singleNFTData.name,
        ...(singleNFTData.desc && { description: singleNFTData.desc }),
        image: tokenURI,
        ...(singleNFTData.external_link && {
          external_url: singleNFTData.external_link,
        }),
        ...(singleNFTData.traits.length > 0 && {
          traits: singleNFTData.traits,
        }),
      };
      const metaDataURI = await upload({ data: [filesToUpload] });
      setFullURI(metaDataURI[0]);
      console.log(metaDataURI[0]);

      // RE_WRITE THE LOGIC TO MINT NFT INTO A COLLECTION
      

      const data = await contract?.call("mintToken", [metaDataURI[0]]);
      //setSingleCreatedNFT(data);
      console.log(data);
    } catch (error: any) {
      console.log(error.message);
      //alert(error.message);
    }
  };
  useLayoutEffect(() => {
    handleSingleNFTMint()
  },[])
  // useEffect(() => {
  //   handleSingleNFTMint();
  // }, []);
  return (
    <div className="modal-mask modal-close">
      <div className="modal-wrapper">
        <div
          className="modal-container"
          style={{
            maxWidth: modalWidth ? modalWidth : "543px",
            minWidth: modalWidth ? modalWidth : "543px",
          }}
        >
          {showCloseIcon && (
            <button onClick={onCloseModal} className="close-button ">
              <CloseIcon />
            </button>
          )}

          {showHeader && (
            <div
              className={`modal-header ${
                headerClassName ? headerClassName : ""
              }`}
            >
              {findByKey("header")}
            </div>
          )}

          <div className={`modal-body ${modalBodyClasses}`}>
            {findByKey("body")}
          </div>

          {showfooter && (
            <div className={`modal-footer ${modalFooterClasses}`}>
              {showCloseButton && (
                <ActionBtn
                  name={closeButtonLabel ? closeButtonLabel : "Cancel"}
                  //   className={closeButtonClassName ? closeButtonClassName : ""}
                  action={onCloseModal}
                />
              )}

              {showConfirmButton && (
                <ActionBtn
                  name={confirmButtonLabel ? confirmButtonLabel : "Confirm"}
                  //   className={
                  //     confirmButtonClassName ? confirmButtonClassName : ""
                  //   }

                  action={onConfirm}
                  loading={loading}
                  disabled={isConfirmButtonDisabled}
                />
              )}
              {findByKey("footer")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StandardModal;
