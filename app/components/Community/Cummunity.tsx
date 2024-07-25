import LinkBg from '@/public/assets/section/linkBg.png';
import twitterIcon from '@/public/assets/section/twitter.svg';
import TwitchIcon from '@/public/assets/section/twitch.svg';
import TelegramIcon from '@/public/assets/section/telegram.svg';
import DiscordIcon from '@/public/assets/section/discord.svg';
import Image from 'next/image';


const Community = () => {

  const links = [
    {
      name: 'Twitter',
      icon: twitterIcon,
      link: 'https://twitter.com/Crypto_Currency',
    },
    {
      name: 'Twitch',
      icon: TwitchIcon,
      link: 'https://www.twitch.tv/cryptocurrency',
    },
    {
      name: 'Telegram',
      icon: TelegramIcon,
      link: 'https://www.twitch.tv/cryptocurrency',
    },
    {
      name: 'Discord',
      icon: DiscordIcon,
      link: 'https://www.twitch.tv/cryptocurrency',
    },
  ];
  return (
    <div className="w-full mx-auto">
      <div className="w-full sm:w-10/12 lg:w-2/3 mx-auto flex flex-col items-center text-center space-y-[30px] px-4">
        <h1 className="grad-text text-[22px]  md:text-[30px] leading-[28px] text-center md:text-start">
          Community
        </h1>
        <p className="text-white text-[20px] leading-[25px] w-full sm:w-10/12 lg:w-2/3">
         
          Join a fast-growing community of NFTs holders connected all over the
          multiverse, building the new era of the metaverse via play-to earn.
        </p>
        <div className="flex space-x-[40px] mt-4">
          {links.map((link, index) => (
            <a
              target="_blank"
              rel="noreferrer"
              href={link.link}
              className={index % 2 !== 0 || index === 0 ? "mt-4" : ""}
              key={index}
            >
              <div
                className="relative w-[50px] h-[100px] bg-no-repeat bg-cover "
                style={{ backgroundImage: `url(${LinkBg})` }}
              >
                <div className="w-full h-full blur-[.1px] flex justify-center pt-2">
                  <Image
                    src={link.icon}
                    alt="link"
                    className="w-[30px] h-[30px]"
                  />
                </div>
              </div>
            </a>
          ))}
        </div>
        <div>
          <button className="flex  h-[48px] max-h-[48px] rounded-[10px] justify-center items-center border-[2px] border-[#FAC744] text-[#FAC744] px-[64px] py-[18px] mt-10">
            <p>Explore</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Community;
