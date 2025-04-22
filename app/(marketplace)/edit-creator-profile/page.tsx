"use client";
import { useEffect, useState } from "react";
import ParentLayout from "@/app/layouts/ParentLayout";
import { AiFillCheckCircle } from "react-icons/ai";
import { FaTimesCircle } from "react-icons/fa";
import {
  FileInput,
  TextInput,
  TextAreaInput,
  SelectInput,
  YellowActionBtn,
  ActionBtn,
  Header,
} from "@/app/components";
import { toast } from "react-toastify";
import { useAddress } from "@thirdweb-dev/react";
import { useAppDispatch, useAppSelector } from "@/app/redux/store";
import { useRouter } from "next/navigation";
import {
  resetAll,
  updateUserProfile,
  verifyUsername,
} from "@/app/redux/features/auth/AuthSlice";
import { useActiveAccount } from "thirdweb/react";
const EditCreatorProfile = () => {
  const dispatch = useAppDispatch();
  const navigate = useRouter();
  const auth = useAppSelector((state) => state.auth);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [errorName, setErrorName] = useState<boolean>(false);
  const [successName, setSuccessName] = useState<boolean>(false);
  const [image, setImage] = useState<any>("");

  const [profileImageUrl, setProfileImageUrl] = useState("");
  const wallet = useActiveAccount();
  const address = wallet?.address;
  useEffect(() => {
    if (userName.length > 3) {
      dispatch(verifyUsername(userName));
    }
  }, [userName]);

  useEffect(() => {
    if (auth?.verifyStatus === "success" && userName?.length > 3) {
      setSuccessName(true);
      setErrorName(false);
    } else if (auth?.verifyStatus === "error" && userName.length > 3) {
      setErrorName(true);
      setSuccessName(false);
    } else return;
  }, [auth?.verifyStatus]);

  const updateProfile = () => {
    if (auth?.verifyStatus === "success") {
      const data = {
        email: email,
        bio: bio,
        username: userName,
        website: website,
      };
      address && dispatch(updateUserProfile({ data, address }));
    } else {
      toast.error("Please make sure username is valid");
    }
  };

  useEffect(() => {
    if (auth.success) {
      toast.success("Profile Updated Successfully");
      setTimeout(() => {
        dispatch(resetAll());
        navigate.push("/profile");
      }, 2000);
    }
  }, [auth.success]);

  return (
    <ParentLayout>
      <div className="w-full flex flex-col md:w-10/12 xl:w-6/12 mx-auto mb-32 ">
        <div className="flex flex-col mt-8 xl:mt-20 ">
          <Header>Edit Profile</Header>
        </div>
        <div className="mt-12">
          <div className="flex-col">
            <h1 className="semibold text-white  text-sm md:text-xl">
              Upload digital File (s)*
            </h1>
            <p className="text-grey-800 text-[10px] md:text-md">
              Add your image / video / audio file / 3D Assets
            </p>
          </div>
          <div className="form space-y-8 mt-4">
            <FileInput />
            {/* <TextInput
              placeholder="Your Username"
              label="User name*"
              name="name"
              value={name}
              setValue={setName}
            /> */}
            <div className="flex flex-col space-y-4">
              <label className="text-white semibold text-sm md:text-lg regular">
                Username
              </label>
              <div className="flex flex-col">
                <div className="flex justify-between items-center space-x-2">
                  <input
                    className={`w-full py-2 px-4 bg-blue-card text-sm md:text-base regular  rounded-lg placeholder:text-grey-800 placeholder:text-sm h-[48px] flex items-center ${
                      errorName ? "border-red-500 border " : ""
                    } `}
                    type="text"
                    placeholder={"Your Username"}
                    name={userName}
                    value={userName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setUserName(e.target.value)
                    }
                  />
                  <span className="flex items-center space-x-3 min-w-[100px]">
                    {successName && (
                      <AiFillCheckCircle className="text-green text-2xl" />
                    )}
                    {errorName && (
                      <FaTimesCircle className="text-red-500 text-2xl" />
                    )}
                    {auth.loading && (
                      <span className="text-[12px] text-white">
                        please wait...
                      </span>
                    )}
                  </span>
                </div>
                <div className="mt-1 flex items-center ">
                  {errorName && (
                    <p className="text-red-500 text-xs">
                      Username Already Taken
                    </p>
                  )}
                  {successName && (
                    <p className="text-green text-xs">Username Available</p>
                  )}
                </div>
              </div>
            </div>
            <TextInput
              placeholder="sportrex.io"
              label="Your Unique link"
              name="link"
              value={website}
              setValue={setWebsite}
            />
            <TextAreaInput
              placeholder="Your Bio Details"
              label="Bio*"
              name="description"
              value={bio}
              setValue={setBio}
            />
            <TextInput
              placeholder="Your Email"
              label="Your Email"
              name="link"
              value={email}
              setValue={setEmail}
            />
          </div>
          <div className="mt-10 flex flex-col  ">
            <div className="mt-20 flex justify-center items-center space-x-8">
              <div className="w-5/12">
                <ActionBtn
                  name={auth?.loading ? "Loading..." : "Save"}
                  action={updateProfile}
                />
              </div>
            </div>
            <div className="flex justify-center items-center mt-10">
              <p className="semibold text-grey-800 text-sm md:text-base regular text-center md:text-start ">
                By clicking create , you are agreeing to our Terms of Service
                and conditions
              </p>
            </div>
          </div>
        </div>
      </div>
    </ParentLayout>
  );
};

export default EditCreatorProfile;
