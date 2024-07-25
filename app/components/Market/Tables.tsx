import React from "react";

const data: {
  price: string;
  usd: string;
  fd: string;
  exp: string;
  from: string;
}[] = [
  {
    price: "50SPT",
    usd: "$40,000",
    fd: "30%",
    exp: "2/10/2022",
    from: "54232344",
  },
  {
    price: "20SPT",
    usd: "$40,000",
    fd: "10%",
    exp: "2/10/2022",
    from: "54232344",
  },
  {
    price: "50SPT",
    usd: "$40,000",
    fd: "60%",
    exp: "2/10/2022",
    from: "54232344",
  },
];
const Tables = () => {
  return (
    <div className="w-full">
      <table className="table-auto w-full">
        <thead>
          <tr className="w-full grid grid-cols-5">
            <th className="text-base regular regular text-grey-800 opacity-70 text-start">
              Price
            </th>
            <th className="text-base regular regular text-grey-800 opacity-70">
              USD Price
            </th>
            <th className="text-base regular regular text-grey-800 opacity-70">
              Floor difference
            </th>
            <th className="text-base regular regular text-grey-800 opacity-70">
              Expiration
            </th>
            <th className="text-base regular regular text-grey-800 opacity-70">
              From
            </th>
          </tr>
        </thead>
        <tbody className="w-full mt-2 flex flex-col space-y-4">
          {data.map((item, index) => {
            return (
              <tr className="grid grid-cols-5" key={index}>
                <td className="regular text-white ">{item.price}</td>
                <td className="regular text-white text-center">{item.usd}</td>
                <td className="regular text-white text-center">{item.fd}</td>
                <td className="regular text-white text-center">{item.exp}</td>
                <td className="regular text-white text-center">{item.from}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Tables;
