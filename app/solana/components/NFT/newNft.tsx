import React from 'react';
import Carousel from '../Carousel/NewNftCarousel';
import NormalLayout from '../../layouts/NormalLayout';
import { useTranslation } from 'react-i18next';
const NewNft = () => {
  const {t} = useTranslation("translation")
  return (
    // <NormalLayout>
    <div className="w-full px-[12px] md:px-[64px]">
      <NormalLayout>
        <h1 className="grad-text text-[22px] leading-[28px]  md:text-[30px] text-center md:text-start mb-[32px] md:mb-[64px]">
          {t("new_nfts")}
        </h1>
      </NormalLayout>
      <div>
        <Carousel />
      </div>
    </div>
    // </NormalLayout>
  );
};

export default NewNft;
