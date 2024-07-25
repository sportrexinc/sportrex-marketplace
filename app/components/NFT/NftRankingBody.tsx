import { useState } from 'react';
import NormalLayout from '../../layouts/NormalLayout'
import Select from '../Select/ReuseSelect';
import pick from "../../assets/icons/name-icon.svg";
import sptIcon from "../../assets/icons/spt-coin.svg"
const NftRankingBody = () => {
    const [selected,setSelected] = useState<any>({})
  return (
    <div className="w-full flex flex-col mb-[600px]">
      <NormalLayout>
        <div className="w-full flex flex-col">
          <h1 className="text-start grad-text bold text-xl md:text-3xl mt-20">
            NFTs Ranking
          </h1>
          <p className="text-white text-lg regular regular text-start max-w-[416px] mt-5">
            Track and view all NFTs ranking and market valuation
          </p>
          <div className="w-full flex justify-end mt-5">
            <span className="w-full max-w-[300px]">
              <Select
                title={"All Item"}
                selected={selected}
                setSelected={setSelected}
                options={[
                  {
                    name: "All time",
                    value: "All time",
                  },
                  {
                    name: "weekly",
                    value: "weekly",
                  },
                  {
                    name: "Monthly",
                    value: "Monthly",
                  },
                ]}
              />
            </span>
          </div>
        </div>
      </NormalLayout>
      <div className="w-full bg-[#192468] h-16 mt-5">
        <NormalLayout>
          <div className="w-full flex flex-col">
            <div className="w-full  flex items-center  justify-between h-[64px] mb-3">
              <div className="text-white semibold text-xl w-2/12">
                Collection
              </div>
              <div className="text-white semibold text-xl w-2/12">Volume</div>
              <div className="text-white semibold text-xl w-2/12">
                Floor Price
              </div>
              <div className="text-white semibold text-xl w-2/12">
                Volume traded
              </div>
              <div className="text-white semibold text-xl w-2/12">Owner</div>
              <div className="text-white semibold text-xl w-2/12">Items</div>
            </div>
            {/* table contents */}
            <div className="w-full flex flex-col space-y-5">
              {[1, 2, 3, 3, 3, 3, 3, 3, 3, 3].map(
                (item: any, index: number) => {
                  return (
                    <div className="w-full flex items-center justify-between  ">
                      {/* start */}
                      <div className="flex space-x-2 items-center w-2/12">
                        <span className="text-xl regular text-white">1</span>
                        <span>
                          <img src={pick} alt="pick" />
                        </span>
                        <span className="text-xl regular text-white">
                          DesignNinja
                        </span>
                      </div>
                      {/* end */}
                      {/* start */}
                      <div className="flex space-x-2 items-center w-2/12">
                        <span>
                          <img src={sptIcon} alt="pick" />
                        </span>
                        <span className="text-xl regular text-white">5000</span>
                      </div>
                      {/* end */}
                      {/* start */}
                      <div className="flex space-x-2 items-center w-2/12">
                        <span>
                          <img src={sptIcon} alt="pick" />
                        </span>
                        <span className="text-xl regular text-white">50</span>
                      </div>
                      {/* end */}
                      {/* start */}
                      <div className="flex space-x-2 items-center w-2/12">
                        <span className="text-xl regular text-white">
                          15.4k
                        </span>
                      </div>
                      {/* end */}
                      {/* start */}
                      <div className="flex space-x-2 items-center w-2/12">
                        <span className="text-xl regular text-white">
                          Desgen454
                        </span>
                      </div>
                      {/* end */}
                      {/* start */}
                      <div className="flex space-x-2 items-center w-2/12">
                        <span className="text-xl regular text-white">10k</span>
                      </div>
                      {/* end */}
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </NormalLayout>
      </div>
    </div>
  );
}

export default NftRankingBody
