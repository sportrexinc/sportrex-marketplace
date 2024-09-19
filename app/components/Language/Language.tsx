import  { useEffect, useState } from "react";
import { MdArrowDropDown } from "react-icons/md";
import i18next from "i18next";

import { useAppSelector, useAppDispatch } from "@/app/redux/store";
import { updateUserLanguage } from "@/app/redux/features/auth/AuthSlice";

const styles = {
  parent: "flex relative w-full h-full flex-col bg-transparent ",
  sectionA:
    "flex justify-between items-center space-x-4 cursor-pointer text-white text-base regular md:text-xl biome-semibold",
  sectionB: "relative",
  close: "hidden",
  listContainer:
    "absolute top-8 lg:top-16  left-0 bg-blue-header px-2 rounded-sm pt-2 w-48 flex flex-col",
  item: "w-full py-4 text-white hover:bg-blue-btn",
};
const languages: {
  code: string;
  name: string;
  country_code: string;
}[] = [
  {
    code: "en",
    name: "Eng",
    country_code: "gb",
  },
  {
    code: "fr",
    name: "fran",
    country_code: "fr",
  },
  {
    code: "es",
    name: "Spa",
    country_code: "es",
  },
  {
    code: "nl",
    name: "ned",
    country_code: "nl",
  },
  {
    code: "cn",
    name: "中国人",
    country_code: "cn",
  },
  {
    code: "kr",
    name: "한국어",
    country_code: "kr",
  },
  {
    code: "jp",
    name: "日本",
    country_code: "jp",
  },
];

const Drop = () => {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  // const currentLanguageCode = cookies.get("i18next") || "en";
  const currentLanguageCode = auth?.language || "en";
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode);
  const [lang, setLang] = useState<string>(auth?.languageName);
  const [open, setOpen] = useState<boolean>(false);
  const handleSelect = (code: string, name: string) => {
    i18next.changeLanguage(code);
    const data = {
      language: code,
      name: name,
    };
    dispatch(updateUserLanguage(data));

    setLang(name);
    setOpen(false);
  };
  // useEffect(() => {
  //   i18next.changeLanguage(auth?.language);
  // }, []);
  console.log(lang);
  return (
    <div className={styles.parent}>
      <div className={styles.sectionA} onClick={() => setOpen(!open)}>
        <p className="light text-white text-[18px]">English</p>
        <MdArrowDropDown />
      </div>
      <div className={open ? styles.listContainer : styles.close}>
        <ul>
          {languages.map(({ code, name, country_code }) => (
            <li key={country_code} className={styles.item}>
              <button
                className="flex  items-center space-x-6 px-2 "
                onClick={() => handleSelect(code, name)}
                disabled={code === currentLanguageCode}
              >
                <span className={`flag-icon flag-icon-${country_code} `}></span>
                {name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Drop;
