import React from "react";
import logo from "@/public/assets/sportrex-logo.png";

import telegram from "@/public/assets/icons/telegram.png";
import twitter from "@/public/assets/icons/twitter.png";
import instagram from "@/public/assets/icons/instagram.png";
import discord from "@/public/assets/icons/discord.png";
import twitch from "@/public/assets/icons/twitch.png";
import facebook from "@/public/assets/icons/facebook.png";
import youtube from "@/public/assets/icons/youtube.png";
import medium from "@/public/assets/icons/medium.png";
import reddit from "@/public/assets/icons/reddit.png";
import tiktok from "@/public/assets/icons/tiktok.png";
import { useTranslation } from "react-i18next";
import Image from "next/image";

const linksArrayA = [
  {
    id: "1",
    link: "https://t.me/sportrexofficial",
    icon: telegram,
    name: "telegram",
  },
  {
    id: "2",
    link: "https://twitter.com/sportrexhq",
    icon: twitter,
    name: "twitter",
  },
  {
    id: "3",
    link: "https://instagram.com/sportrexofficial",
    icon: instagram,
    name: "instagram",
  },
  {
    id: "4",
    link: " https://discord.gg/sportrexofficial",
    icon: discord,
    name: "discord",
  },
  {
    id: "5",
    link: "https://www.twitch.tv/sportrexofficial",
    icon: twitch,
    name: "twitch",
  },
];
const linksArrayB = [
  {
    id: "6",
    link: " https://www.youtube.com/channel/UCD-fhKSFYxU4em8mouCunEA",
    icon: youtube,
    name: "youtube",
  },
  {
    id: "7",
    link: "https://www.reddit.com/r/Sportrexofficial/",
    icon: reddit,
    name: "reddit",
  },
  {
    id: "8",
    link: "https://medium.com/@sportrex",
    icon: medium,
    name: "medium",
  },
  {
    id: "9",
    link: "https://www.facebook.com/sportrexofficial",
    icon: facebook,
    name: "facebook",
  },
  {
    id: "10",
    link: "https://vm.tiktok.com/ZM8KVx1gb/",
    icon: tiktok,
    name: "tiktok",
  },
];

const styles = {
  parentContainer: "w-full mt-8 pt-6 regular bg-blue-card text-white px-4 md:px-16",
  container:
    "w-full h-full flex flex-col sm:px-4  lg:px-0 2xl:container 2xl:mx-auto pt-8 pb-4",
  sectionA:
    " w-full flex flex-col lg:flex-row lg:justify-between lg:items-start mb-4  space-x-2 lg:space-x-8",
  partA: "w-full  lg:w-3/12 mb-4 lg:mb-0 lg:flex lg:items-start",
  partAContainer:
    "w-full lg:w-full pl-2 mb-2 md:mb-0  md:pl-0 flex flex-col items-start lg:justify-start",
  logo: "w-48  mb-4",
  partAText: "text-grey text-[1rem] md:text-[1.2rem] regular w-8/12 md:w-full",
  partB:
    "w-full lg:w-6/12 lg:px-4 flex justify-between items-start mb-4 lg:mb-0",
  partB1: "w-6/12  flex flex-col justify-center items-start",
  column: "w-full lg:w-full flex flex-col items-start ",
  title: "text-white text-base regular md:text-xl semibold  mb-2  lg:mb-4",
  colItem:
    "text-grey text-md lg:text-lg regular mb-2 regular cursor-pointer lg:mb-4 font-light",
  partC: "w-6/12  flex flex-col justify-center items-start mb-4 lg:mb-0 ",
  partD: "w-full flex justify-center  lg:w-3/12 mb-4   lg:mb-0",
  partD1: "w-10/12 sm:w-8/12   lg:w-full flex flex-col lg:justify-end mb-4 ",
  iconContainer:
    "w-full lg:w-full flex justify-between  lg:justify-end  mb-4 sm:space-x-8  lg:space-x-4",
  icon: "w-[32px] sm:w-[40px] h-auto  ",
  breaking: "bg-white h-[1px] w-full",
  sectionB: "w-full flex justify-center items-center h-16",
  footnote: "text-grey regular",
};

const Footer = () => {
  // @ts-ignore
  const { t } = useTranslation("translation");
  // write a fuction that gets the current year and returns it
  const getYear = () => {
    const date = new Date();
    return date.getFullYear();
  };

  const arrayA = [
    { name: "Home", link: "#" },
    { name: "About", link: "#About" },
    { name: "Features", link: "#Features" },
    { name: "Partners", link: "#Partners" },
    {
      name: "Whitepaper",
      link: "https://media.publit.io/file/SPORTREX-WHITE-PAPER-2022-version1.pdf",
    },
    { name: "Api", link: "#Api" },
  ];
  const arrayB = ["Home", "About", "Features"];
  const arrayC = [
    "Privacy Policy",
    "Acceptable Use Policy",
    "Notice Policy",
    "Terms of Service",
  ];
  return (
    <div className={styles.parentContainer}>
      <div className={styles.container}>
        <div className={styles.sectionA}>
          <div className={styles.partA}>
            <div className={styles.partAContainer}>
              <Image src={logo} alt="logo" className={styles.logo} />
              <p className={styles.partAText}>NFT Marketplace</p>
            </div>
          </div>
          <div className={styles.partB}>
            <div className={styles.partB1}>
              <p className={styles.title}>Navigation</p>
              <div className={styles.column}>
                {arrayA.map((item, index) => {
                  return (
                    <a
                      href={item.link}
                      className={styles.colItem}
                      key={index}
                      id={item.name}
                    >
                      {item?.name}
                    </a>
                  );
                })}
              </div>
            </div>

            <div className={styles.partC}>
              <p className={styles.title}>Legal</p>
              <div className={styles.column}>
                {arrayC.map((item, index) => {
                  return (
                    <a href={`#${item}`} className={styles.colItem} key={index}>
                      {item}
                    </a>
                  );
                })}
              </div>
            </div>

            {/* 643643463384 */}
          </div>
          <div className={styles.partD}>
            <div className={styles.partD1}>
              <div className={styles.iconContainer}>
                {linksArrayA.map((item, index) => {
                  return (
                    <a
                      href={item.link}
                      target="_blank"
                      key={index}
                      rel="noopener noreferrer"
                    >
                      <abbr title={`${item.name}`}>
                        <Image
                          src={item.icon}
                          alt="icons"
                          className={styles.icon}
                        />
                      </abbr>
                    </a>
                  );
                })}
              </div>
              <div className={styles.iconContainer}>
                {linksArrayB.map((item, index) => {
                  return (
                    <a
                      href={item.link}
                      target="_blank"
                      key={index}
                      rel="noopener noreferrer"
                    >
                      <abbr title={`${item.name}`}>
                        <Image
                          src={item.icon}
                          alt="icons"
                          className={styles.icon}
                        />
                      </abbr>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.breaking} />
        <div className={styles.sectionB}>
          <p className={styles.footnote}>
            © {getYear()} Sportrex Inc. All rights reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
