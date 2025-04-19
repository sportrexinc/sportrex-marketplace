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
import { ConnectButton } from "thirdweb/react";
import { FaUserCircle, FaBell } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/app/redux/store";
import { setAddress } from "@/app/redux/features/auth/AuthSlice";
import ActionBtn from "../Button/ActionBtn";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { createThirdwebClient } from "thirdweb";
import { createWallet } from "thirdweb/wallets";
import { useActiveAccount } from "thirdweb/react";

const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRD_WEB_CLIENT_ID as string,
});
const styles = {
  active: "text-white regular light text-[18px] border-b-[1px] border-white",
  inactive: "text-white text-[18px] text-grey-800 regular",
  listItem: "flex items-center justify-center",
};

const wallets = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
  createWallet("io.rabby"),
  createWallet("io.zerion.wallet"),
];
const ConnectedNav = ({ current }: any) => {
  const navigate = useRouter();
  const disconnect = useDisconnect();
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [mainAddress, setMainAddress] = useState<any>(auth?.address);
  const [signature, setSignature] = useState<any>(() => {
    // Initialize signature from sessionStorage if available
    const storedSignature = sessionStorage.getItem("signedIn");
    console.log("Initial signature from sessionStorage:", storedSignature);
    return storedSignature || null;
  });
  const [walletConnected, setWalletConnected] = useState<boolean>(false);
  const wallet = useActiveAccount();
  const address = wallet?.address;
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

  const checkWalletConnection = async () => {
    if (!address) {
      console.log("Wallet not connected, address is undefined.");
      return false;
    }
    // Optionally, check if the SDK is connected properly
    const walletInfo = await sdk?.wallet.getAddress();
    if (!walletInfo || walletInfo !== address) {
      console.log("Wallet address from SDK does not match:", walletInfo);
      return false;
    }

    console.log("Wallet is connected with address:", address);
    return true;
  };

  const signMessageFunc = async () => {
    const connected = await checkWalletConnection();
    if (!connected) {
      console.error("Wallet not connected, cannot sign the message.");
      return;
    }

    try {
      console.log("Attempting to sign in with address:", address);
      const userSignature = await sdk?.wallet.sign(signInMessage);
      if (!userSignature) {
        throw new Error("No Signature!");
      }
      console.log("User signature obtained:", userSignature);
      setSignature(userSignature);
      sessionStorage.setItem("signedIn", userSignature);
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };
  const { t } = useTranslation(["translation"]);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (address) {
      setWalletConnected(true);
      dispatch(setAddress(address));
      setOpen(false);
    } else {
      setWalletConnected(false);
    }
    // Check if signature exists, otherwise sign in
    if (walletConnected && !signature) {
      console.log("No signature found, calling signMessageFunc.");
      // signMessageFunc();
    } else if (!walletConnected) {
      console.log("Wallet not connected, waiting for connection.");
    } else {
      console.log("Signature found, skipping signMessageFunc.");
    }
  }, [address, walletConnected]);

  useEffect(() => {
    if (signature) {
      console.log("Setting main address because signature is present.");
      setMainAddress(address);
    }
  }, [signature, address]);

  console.log("Current signature state:", signature);
  return (
    <div className="hidden lg:flex w-full bg-blue-card h-[82px]   px-16  items-center  ">
      <div className="w-full flex justify-between items-center 2xl:container 2xl:mx-auto ">
        <div className="w-3/12 h-auto">
          <Image src={logo} alt="logo" className="w-48" />
        </div>
        <div className="right w-9/12 flex ">
          <ul className="w-full flex items-center justify-around gap-x-4">
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
              <div className="flex items-center ">
                {address && (
                  <>
                    <Notification />
                    <Profile address={address} />
                  </>
                )}
              </div>
              {!address ? (
                // <ActionBtn
                //   name="Connect Wallet"
                //   action={() => {
                //     setOpen((prev) => !prev);
                //   }}
                // />

                <div className="connect-button semi-bold">
                  <ConnectButton
                    client={client}
                    connectButton={{
                      label: "Connect Wallet",
                    }}
                    wallets={wallets}
                  />
                </div>
              ) : (
                <div className="connect-button semi-bold">
                  <ConnectButton
                    client={client}
                    connectButton={{
                      label: "Connect Wallet",
                    }}
                    wallets={wallets}
                  />
                </div>
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
