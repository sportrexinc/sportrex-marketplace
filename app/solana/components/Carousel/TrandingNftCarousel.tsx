import React, { useEffect } from 'react';
import { Carousel as C } from 'react-responsive-carousel';
import { leftIconSvg, rightIconSvg } from './icons';
import Link from 'next/link';
import Masked from "@/public/assets/images/carousel/masked.png"
import Image from 'next/image';

const Carousel = () => {
  useEffect(() => {
    setTimeout(() => {
      const prevBtn : Element | any = document.querySelector('.control-arrow.control-prev');
      
      prevBtn.innerHTML = leftIconSvg;
      const nextBtn : Element | any= document.querySelector('.control-arrow.control-next');
      nextBtn.innerHTML = rightIconSvg;
    }, 100);
  }, []);
  return (
    <C infiniteLoop showThumbs={false} showStatus={false}>
      {[1, 2, 3].map((i,index) => (
        <div className="w-full min-h-[296px] h-full flex space-x-[32px]" key={index}>
          {[1, 2, 3].map((i,index) => (
            <div className="w-full h-full bg-no-repeat bg-cover bg-blue-header rounded-[20px] p-4 flex flex-col items-start space-y-[12px]" key={index}>
              <Image
                className="w-[270px] h-[180px]"
                src={Masked}
                alt=""
              />
              <p className="text-[18px] leading-[30px]">Heartcrib</p>
              <Link href="#" className="text-[#FAC744] leading-[22px]">Read more</Link>
            </div>
          ))}
        </div>
      ))}
    </C>
  );
};

export default Carousel;
