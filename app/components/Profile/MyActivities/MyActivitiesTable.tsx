import React from "react";

const MyActivitiesTable = () => {
  return (
    <div>
      <div className="h-auto flow-hide">
        <table className="table-auto min-w-[400px] w-full flow-hide-x md:w-full ">
          <thead>
            <tr className="w-full grid grid-cols-5 reglar text-lg regular text-grey-800 py-2 regular">
              <th className="text-md md:text-lg regular ">Events</th>
              <th className="text-md md:text-lg regular">Price</th>
              <th className="text-md  md:text-lg regular ">From</th>
              <th className="text-md md:text-lg regular ">To</th>
              <th className="text-md  md:text-lg regular ">Transaction date</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5, 6, 7, 8]?.map((item, index) => (
              <tr
                className=" w-full grid grid-cols-5 md:grid-cols-5 py-2 "
                key={index}
              >
                <td className="flex justify-center items-center text-md text-white  md:text-xl">
                  Offer
                </td>
                <td className="flex justify-center      items-center text-md text-white  md:text-xl">
                  5 SPT
                </td>
                <td className="flex justify-center   items-center text-md text-white  md:text-xl">
                  5453443
                </td>
                <td className="flex justify-center items-center text-md text-white  md:text-xl">
                  2324353
                </td>
                <td className="flex justify-center itrmd-center md:justify-center   items-center text-md text-white  md:text-xl">
                  3 Hours ago
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyActivitiesTable;
