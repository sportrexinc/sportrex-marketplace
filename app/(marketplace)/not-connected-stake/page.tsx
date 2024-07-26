"use client"
import React,{useState} from 'react'
import ParentLayout from '@/app/layouts/ParentLayout'
import { ActionBtn,ConnectModal } from '@/app/components'
import Stake from '@/public/assets/stake-animation.svg'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'

const NotConnectedStake = () => {
  const { t } = useTranslation("translation");
   const [open, setOpen] = useState(false);
   let current = 1;

   const handleOpen = () => {
     setOpen(true);
   };
   const handleClose = () => {
     setOpen(false);
   };
  return (
    <ParentLayout>
      <div className="grid h-screen w-full place-items-center">
        <div className="w-full lg:w-5/12 xl:w-4/12 flex flex-col ">
          <div className="mx-auto w-full">
            <Image src={Stake} alt="stake" className="w-[130px] h-auto mx-auto" />
          </div>
          <p className="text-center semibold text-white text-2xl mt-10">
            {t("track_sub")}
          </p>
          <div className="w-full mt-10">
            <ActionBtn name={t("connect_wallet")} action={handleOpen} />
          </div>
        </div>
        <ConnectModal open={open} setOpen={setOpen}   />
      </div>
    </ParentLayout>
  );
}

export default NotConnectedStake
