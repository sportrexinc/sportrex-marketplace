import { useEffect, useState } from "react";
import thumbnail from "@/public/assets/profile/thumbnail.jpg";
import { FiSettings } from "react-icons/fi";
import { AiFillCamera } from "react-icons/ai";
import "./profile.css";
import defaultPic from "@/public/assets/png/default-profile-pic.jpg"
import ReUseModal from "../modals/ReUseModal";
import ActionBtn from "../Button/ActionBtn";
import { toast } from "react-toastify";
import { useAddress } from "@thirdweb-dev/react";
import { useAppDispatch, useAppSelector } from "@/app/redux/store";
import { useRouter } from "next/navigation";
import { getUserProfile, resetImageUpload, updateUserProfileAvatar, updateUserProfileBanner } from "@/app/redux/features/auth/AuthSlice";
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

  const [activeTab, setActiveTab] = useState("nft");
  const navigate = useRouter();
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const address = useAddress()

  const handleImageChangeAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      setSelectedImage(files[0]);
      setIsAvatar(true);
    }
  };
  const handleImageChangeBanner = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      setSelectedImage(files[0]);
      setIsAvatar(false);
    }
  };

  const handleUpload = () => {
    if (selectedImage) {
      // You can create a FormData object and append the image file to it
      const formData = new FormData();
      formData.append("file", selectedImage);
      if (isAvatar ) {
       address && dispatch(updateUserProfileAvatar({formData, address}));
      } else {
       address && dispatch(updateUserProfileBanner({formData, address}));
      }
      console.log(formData);
      // Call the onImageUpload function with the FormData object

      // Clear the selected image after uploading
      setSelectedImage(null);
    }
  };
  useEffect(() => {
    if (selectedImage) {
      handleUpload();
     
      console.log(selectedImage);
    }
  }, [selectedImage])
  

  let defualtData = {
    username: "No Username",
    bio: "No Bio",
    website: "No Website",
    address: "No Address",
    avatar: {
      url: "",
    },
    banner: {
      url:""
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
  useEffect(() => {
        address && dispatch(getUserProfile({ address }));
  }, [address]);

  const thumb = banner?.url ? banner?.url : thumbnail
 
  // console.log({ avatar });
  return (
    <div className={styles.parentContainer}>
      <div
        className={styles.thumbContainer}
        style={{
          background: "no-repeat center center fixed",
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.9),rgba(0, 0, 0, 0.1)) , url(${thumb})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",

          backgroundSize: "cover",
          backgroundColor: "#fafafa",
          height: "40vh",
          width: "100%",
          zIndex: 0,
        }}
      >
        <div className="flex space-x-4 absolute right-8 bottom-4">
          <FiSettings
            className="text-white text-3xl cursor-pointer"
            onClick={() => navigate.push("/edit-creator-profile")}
          />
          <div className=" cursor-pointer relative">
            <AiFillCamera
              className="text-white text-3xl"
             
            />
            <input
              className="absolute inset-0 opacity-0 "
              type="file"
              accept="image/*"
              onChange={handleImageChangeBanner}
            />
          </div>
        </div>
        <div className={styles.imgContainer}>
          <div className="relative">
            <img
              src={avatar?.url ? avatar?.url : defaultPic}
              className={styles.profileImg}
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
              onChange={handleImageChangeAvatar}
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
            onChange={handleImageChangeAvatar}
          />
          <ActionBtn
            name={auth?.loading ? "Loading..." : "Upload"}
            action={handleUpload}
          />
        </div>
      </ReUseModal>
    </div>
  );
};

export default ProfileHero;
