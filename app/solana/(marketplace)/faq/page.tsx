"use client"
import React from "react";
import ParentLayout from "@/app/layouts/ParentLayout";
import { FaqDropdown } from "@/app/components";
import { faqData } from "@/app/constants/FaqData";
import telegram from "@/public/assets/icons/telegram.png";
import twitter from "@/public/assets/icons/twitter.png";
import instagram from "@/public/assets/icons/instagram.png";
import discord from "@/public/assets/icons/discord.png";
import twitch from "@/public/assets/icons/twitch.png";
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

const index = () => {
  return (
    <ParentLayout current={5}>
      <div className="w-full flex flex-col">
        <div className=" md:mt-[80px] flex flex-col items-center space-y-4">
          <h1 className="text-center grad-text bold text-xl md:text-3xl">
            FAQ
          </h1>
          <div className="mx-auto w-full  md:w-4/12 max-w-[338px]">
            <p className="text-white text-lg regular regular text-center ">
              Frequently Asked Questions By Our Users
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8  mt-10 md:mt-20">
          {faqData.map(
            (
              item: {
                id: number;
                title: string;
                text: string;
              },
              index
            ) => {
              return (
                <FaqDropdown key={index} text={item.text} title={item.title} />
              );
            }
          )}
        </div>

        <div className="flex justify-center items-center mt-12 xl:mt-40">
          <div className="flex-col w-full flex xl:w-4/12 mx-auto ">
            <h1 className="grad-text bold text-[22px] mb-6  text-center">
              You Did Not Find What You Are Looking For ?
            </h1>
            <p className="text-white text-lg regular regular text-center leading-5 xl:mb-16  ">
              You can chat with us via our social media channels or click on
              help center
            </p>

            <div className="w-full lg:w-full flex justify-between    mb-4 sm:space-x-8  lg:space-x-4">
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
                        className="w-[32px] sm:w-[40px] lg:w-[60px]  h-auto"
                      />
                    </abbr>
                  </a>
                );
              })}
            </div>
            <div className="flex items-center  mx-auto text-[16px] light bg-blue-btn text-white px-6 py-2 cursor-pointer semibold mt-16 mb-32 rounded-[10px] w-full max-w-[264px] ">
              Help center
            </div>
          </div>
        </div>
      </div>
    </ParentLayout>
  );
};

export default index;
