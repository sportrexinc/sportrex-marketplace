import defaultPic from "@/public/assets/png/default-profile-pic.jpg";
import Image from "next/image";
import { useAddress } from "@thirdweb-dev/react";

const styles = {
  parentContainer: "w-full flex flex-col",
  thumbContainer: "relative flex flex-col items-center ",
  imgContainer:
    "bg-gradient rounded-full w-[200px] md:w-[240px] h-[200px] md:h-[240px] flex items-center justify-center absolute bottom-[-30%] mx-auto max-w-fit z-10   ",
  profileImg:
    "bg-gradient rounded-full w-[197px] md:w-[230px] h-[197px] md:h-[230px] cursor-pointer object-cover ",
  contentContainer: "mt-40 w-full flex justify-center ",
  content: "w-11/12 sm:9/12 lg:w-7/12 2xl:5/12 mx-auto flex flex-col w-full",
  nameContainer: " flex items-center space-x-4  w-full justify-center",
};
const truncateMiddle = (text: string, length: number) => {
  if (typeof text !== "string") return text;
  if (text.length <= length) return text;
  const halfLength = Math.floor((length - 3) / 2);
  if (halfLength < 0) return text;

  return `${text.slice(0, halfLength)}...${text.slice(-halfLength)}`;
};

const CollectionHero = ({ data, loading, address }: any) => {
  const userAddress = useAddress();

  return (
    <div className={styles.parentContainer}>
      <div
        className={styles.thumbContainer}
        style={{
          height: "40vh",
          width: "100%",
          zIndex: 0,
        }}
      >
        <Image
          src={defaultPic} // Replace with the path to your image
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          className="backdrop-blur-2xl"
        />
        <div className="w-full backdrop-blur-2xl overlay-shadow-2 h-[40vh] "></div>

        <div className={styles.imgContainer}>
          <div className="relative z-10">
            <Image
              alt="image"
              src={defaultPic}
              className={styles.profileImg}
              style={{
                borderRadius: "50%",
              }}
            />
          </div>
        </div>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.content}>
          <p className="grad-text semibold text-center mx-auto text-lg md:text-2xl ">
            {data?.data?.result[0]?.name}
          </p>
          <div className="flex items-center gap-1   w-full justify-center">
            <p className="text-xl regular text-white ">Created By</p>
            <p className="text-2xl  text-yellow semibold ">
              {data?.data?.result[0]?.owner_of.toLowerCase() ===
              userAddress?.toLowerCase()
                ? "You"
                : truncateMiddle(data?.data?.result[0]?.owner_of as string, 18)}
            </p>
          </div>
          <div className="mt-6 regular text-white text-lg regular text-center">
            <p>{truncateMiddle(userAddress as string, 23)}</p>
          </div>
          <div className="text-lg regular mt-4 ">
            {/* <p className="text-center regular text-lg regular leading-8">
              description
            </p> */}
          </div>
          {/*  */}
          <div className="w-full flex items-center gap-6 justify-center flex-wrap mt-6">
            {/* start */}
            <div className="flex flex-col bg-blue-dropHeader rounded-[8px] min-h-[72px] h-auto px-3 semibold text-sm text-white max-w-[127px] w-[127px] justify-center ">
              <p>{data.data?.result.length}</p>
              <p>Items</p>
            </div>
            {/* end of a session */}
            {/* start */}
            <div className="flex flex-col bg-blue-dropHeader rounded-[8px] min-h-[72px] h-auto px-3 semibold text-sm text-white max-w-[127px] w-[127px] justify-center ">
              <p>1</p>
              <p>Owners</p>
            </div>
            {/* end of a session */}
            {/* start */}
            <div className="flex flex-col bg-blue-dropHeader rounded-[8px] min-h-[72px] h-auto px-3 semibold text-sm text-white max-w-[127px] w-[127px] justify-center ">
              <p>2 BNB</p>
              <p>Floor Price</p>
            </div>
            {/* end of a session */}
            {/* start */}
            <div className="flex flex-col bg-blue-dropHeader rounded-[8px] min-h-[72px] h-auto px-3 semibold text-sm text-white max-w-[127px] w-[127px] justify-center ">
              <p>10 BNB</p>
              <p>Volume</p>
            </div>
            {/* end of a session */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionHero;
