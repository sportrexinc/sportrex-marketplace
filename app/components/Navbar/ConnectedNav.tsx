import React, { useEffect, useState } from "react";
import logo from "@/public/assets/sportrex-logo.png";
import { navData } from "@/app/constants/Navbar";
import Language from "../Language/Language";
import Resources from "./Resources";
import Profile from "./Profile";
import Notification from "./Notification";
import ConnectModal from "../modals/WalletConnectModal";
import {
  ConnectWallet,
  useAddress,
  useSDK,
  useDisconnect,
} from "@thirdweb-dev/react";
import { FaUserCircle, FaBell } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/app/redux/store";
import { setAddress } from "@/app/redux/features/auth/AuthSlice";
import ActionBtn from "../Button/ActionBtn";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
const styles = {
  active: "text-white regular light text-[18px] border-b-[1px] border-white",
  inactive: "text-white text-[18px] text-grey-800 regular",
  listItem: "flex items-center justify-center",
};
const ConnectedNav = ({ current }: any) => {
  const navigate = useRouter();
  const disconnect = useDisconnect();
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [mainAddress, setMainAddress] = useState<any>(auth?.address);
  const [signed, setSignedIn] = useState(false);
  const [signature, setSignature] = useState("N/A");
  const address = useAddress();
  const currentDate = new Date();
  const currentTime =
    currentDate.getHours() +
    ":" +
    currentDate.getMinutes() +
    ":" +
    currentDate.getSeconds();
  const date = `${currentDate.getDate()}/${
    currentDate.getMonth() + 1
  }/${currentDate.getFullYear()}`;
  const signInMessage = `Sportrex Marketplace wants you to sign in \n 
  ${address} to use our platform. 
  \n Login Date & Time: ${date} ${currentTime}`;
  const sdk = useSDK();
  const signMessageFunc = async () => {
    if (!address) return; // Add this line to prevent function execution if address is undefined
    try {
      const userSignature = await sdk?.wallet.sign(signInMessage);
      if (!userSignature) {
        throw new Error("No Signature!");
      }
      console.log(userSignature);
      setSignature(userSignature);
      setSignedIn(true);
    } catch (error) {
      console.error(error);
      setSignedIn(false);
    }
  };
  const { t } = useTranslation(["translation"]);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setMainAddress(address);
    if (address) {
      dispatch(setAddress(address));
      setOpen(false);
    }
    if (!signed) {
      signMessageFunc();
    }
  }, [address, dispatch]);
  console.log(signed);
  return (
    <div className="hidden lg:flex w-full bg-blue-card h-[82px] z-100 z-[9999] px-16  items-center sticky top-0 ">
      <div className="w-full flex justify-between items-center 2xl:container 2xl:mx-auto ">
        <div className="w-3/12 h-auto">
          <Image src={logo} alt="logo" className="w-48" />
        </div>
        <div className="right w-9/12 flex ">
          <ul className="w-full flex items-center justify-around space-x-5">
            {navData.map((item, index) => {
              return (
                <li key={index} className={styles.listItem}>
                  <Link
                    href={item.linkTo}
                    className={
                      current === item.id ? styles.active : styles.inactive
                    }
                  >
                    {t(item.text)}
                  </Link>
                </li>
              );
            })}
            <li className={styles.listItem}>
              <Resources />
            </li>
            <li className={styles.listItem}>
              <Language />
            </li>
            <li className={styles.listItem}>
              {/* <ActionBtn action={handleOpen} name="Connect Wallet" /> */}
              <div className="flex items-center ml-4">
                {address && (
                  <>
                    <Notification />
                    <Profile address={address} />
                  </>
                )}
              </div>
              {!address ? (
                <ActionBtn
                  name="Connect Wallet"
                  action={() => {
                    setOpen((prev) => !prev);
                  }}
                />
              ) : (
                <ConnectWallet
                  style={{
                    background: "transparent",
                    border: "0px solid",
                    outline: "none",
                  }}
                />
              )}
            </li>
            {/* <li>
              <button onClick={signMessageFunc}>Sign In</button>
            </li> */}
          </ul>
        </div>
        <ConnectModal open={open} setOpen={setOpen} />
      </div>
    </div>
  );
};

export default ConnectedNav;
