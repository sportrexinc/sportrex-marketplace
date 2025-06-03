import React from "react";

const MyOfferTable = () => {
  return (
    <div>
      <div className="h-auto flow-hide">
        <table className="table-auto min-w-[400px] flow-hide-x md:w-full ">
          <thead>
            <tr className="w-full grid grid-cols-5 reglar text-lg regular text-grey-800 py-2 regular">
              <th className="text-md md:text-lg regular   ">Price</th>
              <th className="text-md md:text-lg regular  ">USD Price</th>
              <th className="text-md  md:text-lg regular  ">
                Floor difference
              </th>
              <th className="text-md md:text-lg regular   ">Expiration</th>
              <th className="text-md  md:text-lg regular    ">From</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5, 6, 7, 8]?.map((item, index) => (
              <tr
                className=" w-full grid grid-cols-5 md:grid-cols-5 py-2 "
                key={index}
              >
                <td className="flex justify-center items-center text-md text-white  md:text-xl">
                  50 SPT
                </td>
                <td className="flex justify-center      items-center text-md text-white  md:text-xl">
                  $40,000
                </td>
                <td className="flex justify-center   items-center text-md text-white  md:text-xl">
                  30%
                </td>
                <td className="flex justify-center items-center text-md text-white  md:text-xl">
                  2/03/2022
                </td>
                <td className="flex justify-center itrmd-center md:justify-center   items-center text-md text-white  md:text-xl">
                  5474548
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOfferTable;
