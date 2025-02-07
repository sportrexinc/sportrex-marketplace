import  { useEffect, useState } from "react";
import logo from "@/public/assets/sportrex-logo.png";
import { marketNavData  } from "@/app/constants/Navbar";
import Language from "../Language/Language";
import Resources from "./Resources";
import Profile from "./Profile";
import Notification from "./Notification";
import ConnectModal from "../modals/WalletConnectModal";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";

import { useAppDispatch, useAppSelector } from "@/app/redux/store";
import { setAddress } from "@/app/redux/features/auth/AuthSlice";
import ActionBtn from "../Button/ActionBtn";
import { useTranslation } from "react-i18next";
import { SearchIcon } from "@/public/assets/icons";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
const styles = {
  active: "text-white regular light text-[18px] border-b-[1px] border-white",
  inactive: "text-white text-[18px] text-grey-800 regular",
  listItem: "flex items-center justify-center",
};
const MarketNav = ({ current }: any) => {
  const navigate = useRouter();
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [mainAddress, setMainAddress] = useState<any>(auth?.address);
  const { t } = useTranslation(["translation"]);

  const handleClose = () => {
    setOpen(false);
  };
  const address = useAddress();
  useEffect(() => {
    setMainAddress(address);
    if (address) setOpen(false);
  }, [address]);

  useEffect(() => {
    if (address) {
      dispatch(setAddress(mainAddress));
    }
  }, [address]);

  return (
    <div className="hidden lg:flex w-full bg-blue-card h-[82px] z-100  px-16  items-center  ">
      <div className="w-full flex justify-between items-center 2xl:container 2xl:mx-auto ">
        <div className="w-3/12 h-auto">
          <Image
            src={logo}
            alt="logo"
            className="w-48 cursor-pointer"
            onClick={() => navigate.push("/")}
          />
        </div>
        <div className="right w-9/12 flex  items-center  justify-between">
         
          <ul className="w-full flex items-center justify-around space-x-5">
            {marketNavData.map((item, index) => {
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
                  action={() => setOpen((prev) => !prev)}
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
          </ul>
        </div>
        <ConnectModal open={open} setOpen={setOpen} />
      </div>
    </div>
  );
};

export default MarketNav;
