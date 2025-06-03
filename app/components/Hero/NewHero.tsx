import { useState, useEffect } from "react";
import NormalLayout from "../../layouts/NormalLayout";
import logo from "@/public/assets/sportrex-new-logo.svg";
import { navData } from "../../constants/Navbar";
import { useTranslation } from "react-i18next";
import gifImage from "@/public/assets/gifs/hero-gif.gif";
import ActionBtn from "../Button/ActionBtn";
import Language from "../Language/Language";
import Profile from "../Navbar/Profile";
import Resources from "../Navbar/Resources";
import { ConnectButton } from "thirdweb/react";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import { useAppDispatch, useAppSelector } from "@/app/redux/store";
import { setAddress } from "@/app/redux/features/auth/AuthSlice";
import Notification from "../Navbar/Notification";
import LinkBtn from "../Button/LinkBtn";
import YellowBtn from "../Button/YellowBtn";
import BlockhainList from "./BlockhainList";
import Link from "next/link";
import Image from "next/image";
import ConnectModal from "../modals/WalletConnectModal";
import { createThirdwebClient } from "thirdweb";
import { createWallet } from "thirdweb/wallets";
import { useActiveAccount } from "thirdweb/react";
import ChainMenu from "../ChainMenu/ChainMenu";
const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRD_WEB_CLIENT_ID as string,
});
const styles = {
  active: "text-white regular light text-[18px] border-b-[1px] border-white",
  parentContainer: "w-full h-full px-4   ",
  container:
    "2xl:container 2xl:mx-auto flex flex-col  lg:flex-row space-y-6 lg:space-y-0 lg:justify-between",
  inactive: "text-white text-opacity-50 text-[18px] text-grey-800 regular",
  listItem: "flex items-center justify-center",
  left: "w-full relative lg:w-6/12 h-full justify-start flex items-center  element-index max-w-[551px] z-10",
  right:
    "w-full lg:w-6/12  h-full  element-index  flex justify-end bg-blue-body",
  leftContainer:
    "w-full h-full z-10  element-index flex flex-col lg:mt-[84px] mb-[84px] lg:mb-0 ",
  imgContainer: "w-full flex justify-end sm:w-9/12 lg:w-10/12   element-index",
};
const NewHero = ({ current = 1 }: any) => {
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

  const wallets = [
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
    createWallet("me.rainbow"),
    createWallet("io.rabby"),
    createWallet("io.zerion.wallet"),
  ];

  useEffect(() => {
    if (address) {
      dispatch(setAddress(mainAddress));
    }
  }, [address]);

  return (
    <div className="w-full hidden xl:flex  ">
      <ConnectModal open={open} setOpen={handleClose} />
      <NormalLayout>
        <div className="w-full new-hero-bg-grad overflow-hidden p-[2px] mt-7 rounded-[30px]">
          <div className="w-full  flex flex-col relative bg-blue-body rounded-[30px] pb-10 ">
            <div className="absolute bg-[#3333FF80] bg-opacity-50 blur-[60px] 2xl:blur-[110px] lg:left-[200px] 2xl:left-[256px]  top-[18px] h-[312px] w-[312px]"></div>
            <div className="absolute bg-[#3333FF80] bg-opacity-50 blur-[60px] 2xl:blur-[110px] -left-12 top-[306px] h-[312px] w-[312px]"></div>
            <div className="absolute bg-[#3333FF80] bg-opacity-50 blur-[60px] 2xl:blur-[110px] lg:left-[230px] 2xl:left-[276px]  top-[420px] h-[312px] w-[312px]"></div>
            <div className="w-11/12 mx-auto flex flex-col">
              {/* navbar session */}
              <div className="w-full h-[82px] flex items-center bg-white bg-opacity-15 mt-8  rounded-[20px] z-10 ">
                <div className="w-11/12 mx-auto flex items-center justify-between gap-4">
                  <span className="w-2/12">
                    <Image
                      src={logo}
                      alt="logo"
                      className="w-full max-w-[150px] h-auto"
                    />
                  </span>
                  <div className="w-5/12 flex item-center justify-between">
                    {navData.map((item, index) => {
                      return (
                        <div key={index} className={styles.listItem}>
                          <Link
                            href={item.linkTo}
                            className={
                              current === item.id
                                ? styles.active
                                : styles.inactive
                            }
                          >
                            {t(item.text)}
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                  <div className="w-6/12 flex items-center gap-3 justify-between">
                    <div className={styles.listItem}>
                      <Resources />
                    </div>
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
                        // <ActionBtn
                        //   name="Connect Wallet"
                        //   action={() => setOpen((prev) => !prev)}
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
                        // <ConnectWallet
                        //   style={{
                        //     background: "transparent",
                        //     border: "0px solid",
                        //     outline: "none",
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
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {/* end of navbar */}
              {/* start of content session */}
              <div className={styles.parentContainer}>
                <div className={styles.container}>
                  <div className={styles.left}>
                      <div className="w-[200px] -ml-10 ">

                      <ChainMenu />
                      </div>
                    <div className={styles.leftContainer}>
                      <div className=" flex px-4 py-2 items-center space-x-4 border-[#f1f1f1] border-[1px] rounded-[26px] semibold font-semibold semibold w-fit text-[10px] sm:text-base regular lg:text-xs regular ">
                        <div className="no  flex justify-center items-center ">
                          NO 1
                        </div>
                        <div className="text">
                          {/* <p> {t("hero_t")}</p> */}
                          <p> VR & AR Powered Marketplace</p>
                        </div>
                      </div>
                      <div className="w-full sm:w-full lg:w-full mt-5">
                        <div className="flex text-[24px] sm:text-3xl lg:text-[42px] flex-wrap leading-7 sm:leading-[40px] lg:leading-[51px] bold font-bold bold">
                          <span className="grad-text mr-2">
                            {/* {t("mint")}, */}
                            Mint
                          </span>
                          <span className="grad-text mr-2">
                            {/* {t("buy")}, */}
                            Buy,
                          </span>
                          <span className="text-white mr-2">
                            {/* {t("and")} */}
                            and
                          </span>
                          <span className="grad-text mr-2">
                            {/* {t("stake")} */}
                            Stake
                          </span>
                          <span className="grad-text mr-2">
                            {/* {t("nft")} */}
                            NFTS
                          </span>
                          <span className="text-white mr-2">
                            {/* {t("with_e")} */}
                            with Ease
                          </span>
                        </div>
                        <div className="text-[#D4D4D4] mt-4 ">
                          <p className="text-[16px] sm:text-xl lg:text-2xl leading-[25px] lg:leading-9 regular sm:w-full w-full">
                            {/* {t("hero_header")} */}
                            Stake and earn yield on the most liquid
                            decentralized NFT marketplace, and view your NFTs in
                            VR/AR Mode
                          </p>
                        </div>
                        <div className="flex mt-8 gap-4 2xl:space-x-8 items-center">
                          <LinkBtn
                            path="/market"
                            className="min-w-max"
                            // name={t("explore_market")}
                            name={"Explore Market"}
                          />
                          <YellowBtn
                            path="/select-nft"
                            name={"Create"}
                            // name={t("mint")}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.right}>
                    <div className={styles.imgContainer}>
                      <Image
                        src={gifImage}
                        alt="hero-gif"
                        className="w-full mt-12"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* ednd of contenet session */}
            </div>
            <div className="w-full xl:mt-24">
              <BlockhainList />
            </div>
          </div>
        </div>
      </NormalLayout>
    </div>
  );
};

export default NewHero;
