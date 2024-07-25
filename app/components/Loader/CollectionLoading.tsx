import React from 'react'

const CollectionLoading = () => {
  return (
    <div className="w-full lg:h-[350px] overflow-hidden animate-pulse bg-blue-card relative rounded-[20px] ">
      <div
        className="inset-0 w-full h-full absolute
        "
      >
        <div className="relative  h-full flex flex-col  sm:pt-0 2xl:pt-10 ">
          <div className="flex-1 flex justify-center items-center">
          <div className="img-container w-[100px] mt-4 h-[100px] rounded-[20px] bg-blue-body  2xl:mt-10 flex justify-center " />
          </div>
          <div className="flex flex-col p-4 mt-2 sm:mt-6 2xl:mt-10">
            <div>
            <span className='px-6 bg-blue-body'/>
            </div>
            <div className="flex justify-between w-full mt-2">
              <div className="flex space-x-1 items-center">
                <span className='py-2 px-6 bg-blue-body'/>
              </div>
              <span className='py-2 px-6 bg-blue-body'/>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex  ">
      </div>
    </div>
  )
}

export default CollectionLoading
