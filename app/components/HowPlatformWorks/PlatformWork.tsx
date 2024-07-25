import React from 'react';
import useResizer from '../../hooks/useResizer';
import ActionBtn from '../Button/ActionBtn';

const PlatformWork = () => {
  const { width, height } = useResizer();
  return (
    <div className="px-4 md:px-[60px] w-full space-y-[32px] md:space-y-[64px]">
      <h1 className="grad-text text-[22px] leading-[28px]  md:text-[30px] text-center mx-auto">
        How The Platform Works
      </h1>
      <div className="flex space-x-[32px] overflow-scroll no-scrollbar">
        {[0, 1, 2].map((i) => (
          <div className={`rounded-xl w-full overflow-scroll md:flex-shrink md:overflow-hidden flow-hide-x flex-shrink-0`}>
            <div className="px-[20px] md:px-[40px] py-[22px] md:py-[44px] relative w-full  h-full bg-contain bg-no-repeat border-gradient rounded-md">
              <div className="space-y-[12px] z-10">
                <img
                  src="/assets/images/section/131.png"
                  alt=""
                  className="w-[80px] h-[80px]"
                />
                <h1 className="text-[24px] leading-[35px]">NFT Purchase</h1>
                <p className="text-[16px] text-grey-300 leading-[30px] mb-[12px]">
                  Choose from different varieties of minted NFT assets from our
                  NFT market place.
                </p>
                <ActionBtn
                  action={() => {}}
                  name="Go to market"
                
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlatformWork;
