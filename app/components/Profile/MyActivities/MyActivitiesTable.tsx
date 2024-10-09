import React, { useEffect } from "react";
import { ActivitiesTableProps } from "@/types";
import { Table } from "antd";
import { columns } from "./columns";
import APIService from "@/app/utils/APIServices";
import { AxiosResponse } from "axios";
import { useAddress } from "@thirdweb-dev/react";
const MyActivitiesTable = () => {
  const address = useAddress();
  const [activities, setActivities] = React.useState<ActivitiesTableProps | []>(
    []
  );

  const data: ActivitiesTableProps[] = [
    {
      key: "1",
      hash: "0xbb0267a3cbe5ca43c122dc8e582559306d83d8ba47c6d141962973a5a38b3e7b",
      erc_type: "ERC1155",
      event_type: "Transaction",
      value: "3 TBNB",
      from: "0x0000000000000000000000000000000000000000",
      to: "0x61b3ab3e68cada76ed4808e3d712e1f2d42b046f",
      timestamp: "2024-10-07T15:02:15.000Z",
    },
    {
      key: "2",
      hash: "0xbb0267a3cbe5ca43c122dc8e582559306d83d8ba47c6d141962973a5a38b3e7b",
      erc_type: "ERC721",
      event_type: "Transaction",
      value: "3 BNB",
      from: "0x0000000000000000000000000000000000000000",
      to: "0x61b3ab3e68cada76ed4808e3d712e1f2d42b046f",
      timestamp: "2024-10-07T15:02:15.000Z",
    },
    {
      key: "3",
      hash: "0xbb0267a3cbe5ca43c122dc8e582559306d83d8ba47c6d141962973a5a38b3e7b",
      erc_type: "ERC1155",
      event_type: "Transaction",
      value: "3 BNB",
      from: "0x0000000000000000000000000000000000000000",
      to: "0x61b3ab3e68cada76ed4808e3d712e1f2d42b046f",
      timestamp: "2024-10-07T15:02:15.000Z",
    },
  ];
  useEffect(() => {
    const handleGetWalletActivities = async () => {
      if (!address) return;
      try {
        const response: AxiosResponse<{
          data: ActivitiesTableProps;
        }> = await APIService.get(
          `/user/${address}/activity?chain=binance-testnet`
        );
        console.log("API Response:", response); // Log the full API response

        //@ts-ignore
        if (response?.data?.data?.content) {
          //@ts-ignore
          setActivities(response?.data?.data?.content); 
        } else {
          console.warn("No content returned from the API.");
        }
      } catch (error) {
        console.error("Error fetching wallet activities:", error);
      }
    };
    handleGetWalletActivities();
  }, [address]);
  return (
    <div>
      <div className="h-auto flow-hide mt-20">
        <Table<ActivitiesTableProps>
          columns={columns}
          //@ts-ignore
          dataSource={activities}
          className="activities-table"
          rowKey={(record) => record.hash}
        />
      </div>
    </div>
  );
};

export default MyActivitiesTable;
