import { FC, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoIosCopy } from "react-icons/io";
import Link from "next/link";
import { useDisconnect } from "@thirdweb-dev/react";
import { useAppSelector } from "@/app/redux/store";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
interface ProfileProps {
  address?: string;
}

const Profile: FC<ProfileProps> = ({ address }) => {
  const [open, setOpen] = useState(false);
  const navigate = useRouter();
  const auth = useAppSelector((state) => state.auth);
  const gotoProfile = () => {
    console.log("clicked");

    navigate.push("/profile");
    setOpen(false);
  };
  const disconnect = useDisconnect();

  const handleCopy = () => {
    navigator.clipboard.writeText(auth?.address);
    toast?.success("Address Copied Successfully");
    setOpen(false);
  };

  return (
    <div className="flex flex-col relative w-fit px-2">
      <div
        className="flex items-center  cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <FaUserCircle className="text-blue-btn text-2xl mr-6 cursor-pointer" />
      </div>
      {open && (
        <div className="absolute  top-[64px] right-0 w-[200px] h-auto flow-hide bg-blue-header p-4 flex flex-col space-y-3 z-40 ">
          <div className="flex items-center space-x-1">
            <h4 className="bold text-white text-md">Connected </h4>
            <span className=" bg-green w-[9px] h-[9px] rounded-full  "></span>
          </div>

          <div
            className="flex space-x-2 cursor-pointer items-center "
            onClick={handleCopy}
          >
            <p className="text-white text-md"> {address?.substring(0, 8)}</p>
            <IoIosCopy className="text-grey-800 text-md cursor-pointer" />
          </div>
          <Link
            href="/profile"
            className="text-yellow regular text-lg regular cursor-pointer"
          >
            My Portfolio
          </Link>
          <p className="text-grey-800 regular cursor-pointer">
            Profile Settings
          </p>
          <p
            onClick={disconnect}
            className="text-grey-800 regular cursor-pointer"
          >
            Disconnect wallet
          </p>
        </div>
      )}
    </div>
  );
};

export default Profile;
