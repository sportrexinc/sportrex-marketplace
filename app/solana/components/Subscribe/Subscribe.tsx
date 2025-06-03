import { useState } from "react";
import { useTranslation } from "react-i18next";
import sendicon from "@/public/assets/sendicon.png";
import axios from "axios";
import NormalLayout from "../../layouts/NormalLayout";
import Image from "next/image";

const url = "https://sportrex-be.herokuapp.com/api/subscribe";

const styles = {
  container:
    "flex md:flex w-full h-full justify-center px-4 sm:px-8 max-w-[1440px] mx-auto",
  contentContainer:
    "md:mx-auto  w-full flex flex-col lg:flex-row items-center py-16 md:justify-between space-y-4 sm:space-y-10 lg:space-y-0",
  inputContainer:
    "w-full max-w-[597px] bg-white flex justify-between rounded-[2.5rem] px-6 py-4",
  input:
    "border-none bg-white outline-none w-10/12 text-grey-dark text-lg regular regular",
  title: "text-[1.375rem] sm:text-[1.5rem]",
  img: "w-10 h-10 cursor-pointer",
  validation: "text-yellow text-lg regular regular",
};

const Subscribe = () => {
    const { t } = useTranslation("translation");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(url, { email });
      if (response.status) {
        setSuccess(true);
        setMessage(response.data?.message);
        setEmail("");
      } else {
        setError(true);
        setMessage(response.data?.message);
      }
    } catch (error: any) {
      setError(true);
      setMessage(error.response.data?.error);
    }
    setLoading(false);
  };
  
  return (
    <>
      <NormalLayout>
        <div className="md:mx-auto bg-[#0E1648]  w-full flex flex-col rounded-[20px] lg:flex-row items-center py-8 md:justify-between gap-y-4 sm:gap-y-10 lg:space-y-0 px-[14px] lg:px-12 lg:py-16">
          <div className="w-full sm:w-9/12 lg:w-5/12  ">
            <div className={styles.title}>
              {/* <ColouredHeaderText text="Be Part Of Greatness, Join the Sportex community " size="30px" /> */}
              <h1 className="grad-text text-22px  md:text-[30px] text-start lg:text-start">
                {/* {t("be_part")} */}
                Be Part Of Greatness, Join the Sportex community
              </h1>
            </div>
          </div>
          <div className="w-full sm:w-9/12  lg:w-6/12 flex justify-center ">
            <form
              className={`flex items-center bg-white h-[72px] rounded-[36px] px-4 w-full justify-between gap-1 `}
              onSubmit={handleSubmit}
            >
              <input
                className={`bg-transparent text-black flex h-auto border-none outline-none focus:outline-none focus:border-none  text-grey-dark text-lg regular flex-grow  `}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="johndoe@gmail.com"
                name="email"
                required
              />

              <button type="submit" className="flex justify-end ">
                <Image
                  className={styles.img}
                  src={sendicon}
                  alt="subscribe"
                  role={"button"}
                />
              </button>
            </form>
          </div>
        </div>
      </NormalLayout>
    </>
  );
};

export default Subscribe;
