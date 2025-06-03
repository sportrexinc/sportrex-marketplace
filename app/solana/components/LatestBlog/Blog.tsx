import Link from "next/link";
import NormalLayout from "../../layouts/NormalLayout";
import { useTranslation } from "react-i18next";
import heart from "@/public/assets/heart.svg";
import Image from "next/image";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Rise of DeFi 2.0: Next Generation of DeFi",
      description:
        "Exploring how DeFi 2.0 protocols are revolutionizing financial systems with improved security, scalability, and innovative yield strategies.",
      image: "/assets/images/blog1.svg",
    },
    {
      id: 2,
      title: "NFTs Beyond Digital Art: Real-World Applications",
      description:
        "Discovering how NFT technology is expanding into real estate, supply chain management, and digital identity verification.",
      image: "/assets/images/blog2.svg",
    },
    {
      id: 3,
      title: "Layer 2 Solutions: Scaling Blockchain for Mass Adoption",
      description:
        "Analysis of leading Layer 2 solutions and their role in solving blockchain scalability challenges for mainstream adoption.",
      image: "/assets/images/blog3.svg",
    },
  ];

  const { t } = useTranslation("translation");

  return (
    <NormalLayout>
      <div className="px-4 md:px-[60px] w-full space-y-[32px] md:space-y-[64px]">
        <h1 className="grad-text text-[22px] leading-[40px]  md:text-[30px] text-center mx-auto">
          Our Latest Blog Posts
        </h1>
        <div className="grid grid-cols-1 sm:place-items-center sm:grid-cols-1 lg:grid-cols-3 gap-[35px]">
          {blogPosts.map((post, index) => (
            <div
              
              className="flex flex-col space-y-4 bg-no-repeat bg-cover py-[16px] px-[16px] text-white h-fit  border-opacity-30 border-t-0 "
              style={{
                background:
                  "linear-gradient(140deg, transparent 30px, #0e1648 0)",
                borderBottomRightRadius: "30px",
                borderTopRightRadius: "30px",
                borderBottomLeftRadius: "30px",
              }}
              key={post.id}
            >
              <Image className="w-full h-full" src={heart} alt={post.title} />
              <h1 className="text-[24px] leading-[35px] semibold">{post.title}</h1>
              <p className="text-[16px] text-grey-300 leading-[30px] regular">
                {post.description}
              </p>
              <div>
                <Link href="#" className="text-[#FAC744] bold leading-[22px]">
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
