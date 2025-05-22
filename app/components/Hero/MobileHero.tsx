import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import ActionBtn from "../Button/ActionBtn";
import Language from "../Language/Language";
import Profile from "../Navbar/Profile";
import gifImage from "@/public/assets/gifs/hero-gif.gif";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import { useAppDispatch, useAppSelector } from "@/app/redux/store";
import { setAddress } from "@/app/redux/features/auth/AuthSlice";
import Notification from "../Navbar/Notification";
import logo from "@/public/assets/sportrex-new-logo.svg";
import LinkBtn from "../Button/LinkBtn";
import YellowBtn from "../Button/YellowBtn";
import { useActiveAccount } from "thirdweb/react";
import Image from "next/image";
import { MobileChainMenu } from "../ChainMenu/ChainMenu";
const styles = {
  active: "text-white regular light text-[18px] border-b-[1px] border-white",
  inactive: "text-white text-[18px] text-grey-800 regular",
  listItem: "flex items-center justify-center",
  left: "w-full lg:w-6/12 h-full justify-start flex items-center  element-index max-w-[451px]",
  right: "w-full lg:w-6/12  h-full  element-index",
  leftContainer:
    "w-full h-full  element-index flex flex-col lg:mt-[84px] mb-[84px] lg:mb-0 ",
  imgContainer: "w-full sm:w-9/12 lg:w-10/12 mx-auto  element-index",
};
const MobileHero = () => {
  const { t } = useTranslation(["translation"]);
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [mainAddress, setMainAddress] = useState<any>(auth?.address);

  const handleClose = () => {
    setOpen(false);
  };
  const wallet = useActiveAccount();
  const address = wallet?.address;
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
    <div className="w-full pt-8 px-2">
      <div className="w-full p-[2px]  xl:hidden new-hero-bg-grad rounded-[30px] ">
        <div className="w-full  p-4 flex flex-col bg-blue-body rounded-[30px] ">
          {/* start of the navbar */}
          <div className="w-full h-[64px] flex items-center bg-white bg-opacity-15 mt-8  rounded-[20px]  justify-between px-3 ">
            <span className="w-3/12">
              <Image
                src={logo}
                alt="logo"
                className="w-full max-w-[140px] h-auto"
              />
            </span>
            <div className="flex w-9/12 justify-end items-center">
              <div className={styles.listItem}>
                <Language />
              </div>
              <div className={styles.listItem}>
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
              </div>
            </div>
          </div>
          {/* end of the navbar */}
          <div className="w-full flex flex-col mt-3 mb-9">
            <MobileChainMenu />
          </div>
          {/* end pf first images */}
          {/* CEnter pannel */}
          <div className="w-full xl:w-6/12 xl:min-w-[637px] xl:max-w-[637px] flex flex-col items-center xl:px-4 mt-[34px] ">
            <div className=" flex px-4 py-2 items-center space-x-4 border-[#f1f1f1] border-[1px] rounded-[26px] semibold font-semibold semibold w-fit text-[10px] sm:text-base regular lg:text-lg regular ">
              <div className="no  flex justify-center items-center ">NO 1</div>
              <div className="text">
                {/* <p> {t("hero_t")}</p> */}
                <p> VR & AR Powered Marketplace</p>
              </div>
            </div>
            <div className=" text-[24px] sm:text-3xl lg:text-[42px]  leading-7 sm:leading-[40px] lg:leading-[51px] bold font-bold bold text-center mt-4">
              <span className="grad-text mr-2">
                {/* {t("mint")}, */}
                Mint
              </span>
              <span className="grad-text mr-2">
                {" "}
                {/* {t("buy")}, */}
                Buy,
              </span>
              <span className="text-white mr-2">
                {" "}
                {/* {t("and")} */}
                and
              </span>
              <span className="grad-text mr-2">
                {/* {t("stake")} */}
                Stake
              </span>
              <br />
              <span className="grad-text mr-2">
                {/* {t("nft")} */}
                NFTS
              </span>
              <span className="text-white mr-2">
                {" "}
                {/* {t("with_e")} */}
                with Ease
              </span>
            </div>
            <div className="text-white mt-4 ">
              <p className="text-[16px] sm:text-xl lg:text-2xl leading-[25px] lg:leading-9 regular sm:w-full w-full text-center">
                {/* {t("hero_header")} */}
                Stake and earn yield on the most liquid decentralized NFT
                marketplace, and view your NFTs in VR/AR Mode
              </p>
            </div>
            <div className="flex flex-col mt-8  items-center gap-6 w-7/12 mx-auto max-w-[203px]">
              <LinkBtn
                path="/market"
                name={"Explore Market"}
                // name={t("explore_market")}
                className="w-full"
              />
              <YellowBtn
                path="/select-nft"
                // name={t("create")}
                name={"Create"}
                className="w-full"
              />
            </div>
          </div>
          {/* end of center pannel */}
          <div className="w-full mt-[75px] pb-10">
            <Image
              src={gifImage}
              alt="hero-gif"
              className="w-full mt-12"
              unoptimized
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileHero;
