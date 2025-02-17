import { useEffect, useState } from "react";
import thumbnail from "@/public/assets/profile/thumbnail.jpg";


import { FiSettings } from "react-icons/fi";
import { AiFillCamera } from "react-icons/ai";
import "./profile.css";
import defaultPic from "@/public/assets/png/default-profile-pic.jpg";
import logo from "@/public/assets/sportrex-logo.png"
import ReUseModal from "../modals/ReUseModal";
import ActionBtn from "../Button/ActionBtn";
import { toast } from "react-toastify";
import { useAddress } from "@thirdweb-dev/react";
import { useAppDispatch, useAppSelector } from "@/app/redux/store";
import { useRouter } from "next/navigation";
import Image from "next/image"
import { createUserProfile, getUserProfile, resetImageUpload, updateUserProfileAvatar, updateUserProfileBanner } from "@/app/redux/features/auth/AuthSlice";
import Link from "next/link";
import { YellowActionBtn } from "..";
import { setLoading } from "@/app/redux/features/auth/MyNftSlice";
interface ImageUploaderProps {
  onImageUpload: (image: File) => void;
}
const styles = {
  parentContainer: "w-full flex flex-col",
  thumbContainer: "relative flex flex-col ",
  imgContainer:
    "bg-gradient rounded-full w-[200px] md:w-[240px] h-[200px] md:h-[240px] flex items-center justify-center absolute bottom-[-30%] left-[44%]    ",
  profileImg:
    "bg-gradient rounded-full w-[197px] md:w-[230px] h-[197px] md:h-[230px] cursor-pointer object-cover ",
  contentContainer: "mt-40 w-full flex justify-center ",
  content: "w-11/12 sm:8/12 lg:w-5/12 mx-auto flex flex-col w-full",
  nameContainer: " flex items-center space-x-4   w-full justify-center",
};

const ProfileHero = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const [isAvatar, setIsAvatar] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const [activeTab, setActiveTab] = useState("nft");
  const [openNewUser, setOpenNewUser] = useState(false);
  const [avatarImage, setAvatarImage] = useState<File | null>(null);
  const [bannerImage, setBannerImage] = useState<File | null>(null);
  
  const navigate = useRouter();
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const address = useAddress()

 const handleImageChange = (
   event: React.ChangeEvent<HTMLInputElement>,
   isAvatar: boolean
 ) => {
   const files = event.target.files;
   if (files && files.length > 0) {
     if (isAvatar) {
       setAvatarImage(files[0]);
       uploadImage(files[0], true);
     } else {
       setBannerImage(files[0]);
       uploadImage(files[0], false);
     }
   }
 };

 const uploadImage = async (image: File, isAvatar: boolean) => {
   if (!image || !address) return;

 
   if (isAvatar) {
    
   await  dispatch(updateUserProfileAvatar({ image, address }));
   } else {
  await dispatch(updateUserProfileBanner({ image, address }));
   }
 };


  

  let defualtData = {
    username: "No Username",
    bio: "No Bio",
    website: "No Website",
    address: "No Address",
    avatar: {
      url: defaultPic,
    },
    banner: {
      url:thumbnail
    }
  };
  const { bio, website, username, banner,avatar } = auth?.userData
    ? auth?.userData
    : defualtData;

  let img =
    "https://res.cloudinary.com/www-daniekeys-com/image/upload/v1614139130/cupcake5_wgeqy0.jpg";
  useEffect(() => {
    if (auth.avatarUpdateSuccess) {
      toast.success("Upload Successful");
      setOpen(false);
      setTimeout(() => {
        dispatch(resetImageUpload());
      address&&  dispatch(getUserProfile({ address }));
      }, 2000);
    }
  }, [auth.avatarUpdateSuccess]);
  const handleFetchProfile = async () => {
    setLoading(true);
    if (address) {
      const { payload, meta } = await dispatch(getUserProfile({ address }));
      setLoading(false);
     
      if (meta.requestStatus === "rejected") {
        setLoading(false);
        setOpenNewUser(true);
      }
    }
  }
  useEffect(() => {
    // address && dispatch(getUserProfile({ address }));
    handleFetchProfile();
  }, [address]);
  

  const handleRegister = async () => {
    setLoading(true);
    try {
        const { payload } = await dispatch(createUserProfile({ address }));
        if (payload.status === "success") {
          setOpenNewUser(false);
          setLoading(false);
          toast.success("Registered Successfully");
          handleFetchProfile();
        }
    } catch (error) {
      console.log(error);
    }
  
  }

  const thumb = banner?.url ? banner?.url : thumbnail
 
  // console.log({ avatar });
  return (
    <div className={styles.parentContainer}>
      <div
        className={styles.thumbContainer}
        style={{
          background: "no-repeat center center fixed",
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.9),rgba(0, 0, 0, 0.1))`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",

          backgroundSize: "cover",
          backgroundColor: "#fafafa",
          height: "40vh",
          width: "100%",
          zIndex: 0,
        }}
      >
        <Image
          src={thumb} // Replace with the path to your image
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          className="backdrop-blur-2xl"
          
        
        />
        <div className="flex space-x-4 absolute right-8 bottom-4">
          <FiSettings
            className="text-white text-3xl cursor-pointer"
            onClick={() => navigate.push("/edit-creator-profile")}
          />
          <div className=" cursor-pointer relative">
            <AiFillCamera className="text-white text-3xl" />
            <input
              className="absolute inset-0 opacity-0 "
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, false)}
            />
          </div>
        </div>
        <div className={styles.imgContainer}>
          <div className="relative">
            <Image
              alt="image"
              src={avatar?.url ? avatar?.url : defaultPic}
              className={styles.profileImg}
              width={200}
              height={200}
              onClick={() => {
                setIsAvatar(true);
                setOpen(true);
              }}
              style={{
                borderRadius: "50%",
              }}
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, true)}
              className="opacity-0 absolute inset-0"
            />
          </div>
        </div>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.content}>
          <div className={styles.nameContainer}>
            <p className="text-xl regular text-white ">Username</p>
            <p className="text-2xl  text-yellow semibold ">
              {username ? username : "No Username"}
            </p>
          </div>
          <div className="mt-6 regular text-white text-lg regular text-center">
            <p>{address}</p>
          </div>
          <div className="text-lg regular mt-4 ">
            <p className="text-center regular text-lg regular leading-8">
              {bio ? bio : "No Bio"}
            </p>
          </div>
        </div>
      </div>
      <ReUseModal open={open} setOpen={setOpen}>
        <div className="w-full flex flex-col space-y-4">
          <h1 className="text-white">
            {isAvatar ? "Update Your Avatar" : "Update your Banner"}
          </h1>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e, true)}
          />
        
        </div>
      </ReUseModal>
      <ReUseModal open={openNewUser} setOpen={setOpenNewUser}>
        <div className="w-full flex flex-col space-y-4">
          <span className="w-full flex justify-center">
            <Image
              src={logo}
              alt="logo"
              className="w-48 cursor-pointer"
              onClick={() => navigate.push("/")}
            />
          </span>

          <h1 className="text-white bold text-center">
            Welcome to Sportrex Nft Marketplace
          </h1>
          <p className="regular text-sm text-white ">
            By connecting your wallet and using Sportrex Nft Marketplace, you
            agree to our
            <Link href="/terms" className="text-yellow underline ml-1">
              Terms of Service
            </Link>{" "}
            and
            <Link href="/privacy" className="text-yellow underline ml-1">
              Privacy Policy
            </Link>
            .
          </p>
          <div className="w-full flex items-center gap-4 mt-8">
            <YellowActionBtn
              name="Cancel"
              action={() => setOpenNewUser(false)}
            />
            <ActionBtn
              name={loading ? "Loading..." : "Accept and Login"}
              disabled={loading}
              action={handleRegister}
            />
          </div>
        </div>
      </ReUseModal>
    </div>
  );
};

export default ProfileHero;
