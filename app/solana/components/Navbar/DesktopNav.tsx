import { useEffect, useState } from "react";
import logo from "@/public/assets/sportrex-logo.png";
import Language from "../Language/Language";

import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import { useAppDispatch } from "@/app/redux/store";
import { setAddress } from "@/app/redux/features/auth/AuthSlice";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import Link from "next/link";
import { useActiveAccount } from "thirdweb/react";
const styles = {
  active: "text-white light text-[18px] border-b-[1px] border-white",
  inactive: "text-white text-[18px] text-grey light",
  listItem: "flex items-center justify-center",
};
const DesktopNav = () => {
  const [open, setOpen] = useState(false);

  const { t } = useTranslation(["translation"]);
  const dispatch = useAppDispatch();
  let current = 1;

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const wallet = useActiveAccount();
  const address = wallet?.address;

  useEffect(() => {
    if (address !== undefined) {
      dispatch(setAddress(address));
    }
  }, [address]);

  return (
    <div className="hidden lg:flex w-full bg-blue-card h-[82px] z-10 px-16  items-center  ">
      <div className="w-full flex justify-between items-center 2xl:container 2xl:mx-auto ">
        <div className="w-3/12 h-auto">
          <Image src={logo} alt="logo" className="w-48" />
        </div>
        <div className="right w-9/12  flex ">
          <ul className="w-full flex items-center justify-around">
            <li className={styles.listItem}>
              <Link
                href="/"
                className={current === 1 ? styles.active : styles.inactive}
              >
                {t("home")}
              </Link>
            </li>
            <li className={styles.listItem}>
              <Language />
            </li>
            <li className={styles.listItem}>
              {/* <ActionBtn action={handleOpen} name="Connect Wallet" /> */}
              <ConnectWallet
                style={{
                  background: "#3333FF",
                  color: "white",
                  borderRadius: "10px",
                }}
              />
            </li>
          </ul>
        </div>
        {/* <ConnectModal open={open} setOpen={setOpen} /> */}
      </div>
    </div>
  );
};

export default DesktopNav;
