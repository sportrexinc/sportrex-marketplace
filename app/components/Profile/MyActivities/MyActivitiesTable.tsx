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
