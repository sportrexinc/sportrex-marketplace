import React from 'react'
import { AiOutlineHeart } from 'react-icons/ai'

const NftLoading = () => {
  return (
    <div className="w-full animate-pulse md:h-[350px]  h-full bg-no-repeat bg-cover bg-blue-header rounded-[10px] md:rounded-[20px] p-1  flex flex-col items-start space-y-[12px] justify-between relative">
    <div 
      className='bg-blue-body'
      style={{
        // background: "white",
        borderRadius: "10px",
        // height: "200px",
        width: "100%",
        flex: 1
      }}
          />
      <div className="flex px-2 justify-between w-full">
        <div>
        <div  className="px-8 py-3 rounded-[4px] bg-blue-body">
        </div>
        <div className="px-8 py-3 mt-1 rounded-[4px] bg-blue-body" />
        </div>
        <div className="bg-blue-body h-[28px] w-[28px] items-center rounded-full p-3">
          
        </div>
      </div>
    </div>
  )
}

export default NftLoading

