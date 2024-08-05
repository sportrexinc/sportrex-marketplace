
import Link from 'next/link';
import NormalLayout from '../../layouts/NormalLayout';
import { useTranslation } from 'react-i18next';
import heart from "@/public/assets/heart.svg";
import Image from 'next/image';
const Blog = () => {
  const posts = [0, 1, 2];
   const { t } = useTranslation("translation");
  return (
    <NormalLayout>
      <div className="px-4 md:px-[60px] w-full space-y-[32px] md:space-y-[64px]">
        <h1 className="grad-text text-[22px] leading-[40px]  md:text-[30px] text-center mx-auto">
          {/* {t("latest_blog")} */}
          Our Latest Blog Posts
        </h1>
        <div className="grid grid-cols-1 sm:place-items-center sm:grid-cols-1 lg:grid-cols-3 gap-[35px]">
          {posts.map((post, index) => (
            <div
              className="flex flex-col space-y-4 bg-no-repeat bg-cover py-[16px] px-[16px] text-white h-fit border-white border border-opacity-30 border-t-0 "
              style={{
                background:
                  "linear-gradient(140deg, transparent 30px, #0e1648 0)",
                borderBottomRightRadius: "30px",
                borderTopRightRadius: "30px",
                borderBottomLeftRadius: "30px",
              }}
              key={index}
            >
              <Image className="w-full h-full" src={heart} alt="" />
              {/* <div
                className="w-full h-[167px] "
                style={{
                  background: `url(/assets/images/blog${index + 1}.svg),
                linear-gradient(135deg, transparent 20px, transparent 0)
                `,
                  borderBottomRightRadius: "30px",
                  borderTopRightRadius: "30px",
                  borderBottomLeftRadius: "30px",
                }}
              ></div> */}
              <h1 className="text-[24px] leading-[35px]">Blog Heading</h1>
              <p className="text-[16px] text-grey-300 leading-[30px]">
                Lorem ipsum lorem ipsum lorem lorem Lorem ipsum lorem ipsum
                lorem lorem.
              </p>
              <div>
                <Link href="#" className="text-[#FAC744] bold leading-[22px]">
                  {/* {t("read_more")} */}
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </NormalLayout>
  );
};

export default Blog;
