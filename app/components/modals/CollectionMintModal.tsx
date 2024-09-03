"use-client";
import "./modal.css";
import { CloseIcon } from "../../../public/assets/svg/index";
import NormalLayout from "@/app/layouts/NormalLayout";
import Image from "next/image";
import picOne from "../../../public/assets/market/one.png";
import CollectionCard from "@/app/components/Cards/CollectionCard";

export interface collectionMintModalProps {
  open: boolean;
    setOpen: any;
    data: any;

}

const CollectionMintModal = ({
  open,
  setOpen,
  data,
}: collectionMintModalProps) => {
    
   return (
     <>
       {open && (
         <div
           className=""
           style={{
             position: "relative",
             width: "100vw", // Full viewport width
             height: "100vh", // Full viewport height

             overflow: "hidden",
           }}
         >
           <Image
             src={data?.logoImage?.url || picOne} // Replace with the path to your image
             alt="Background Image"
             layout="fill"
             objectFit="cover"
             className="backdrop-blur-2xl"
           />
           <div className="w-full backdrop-blur-2xl">
             <NormalLayout>
               <div className="w-full h-screen p-4 flex items-center justify-center relative ">
                 <span
                   className="absolute top-4 left-4 cursor-pointer"
                   onClick={() => setOpen(false)}
                 >
                   <CloseIcon />
                 </span>
                 <div className="w-full lg:w-9/12 xl:w-7/12 mx-auto flex items-center justify-center flex-col max-w-[600px]">
                   <CollectionCard data={data} />
                 </div>
               </div>
             </NormalLayout>
           </div>
         </div>
       )}
     </>
   );
};

export default CollectionMintModal;
