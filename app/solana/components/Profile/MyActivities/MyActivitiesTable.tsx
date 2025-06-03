import React, { useEffect, useState, useRef } from "react";
import { Space, Tag } from "antd";
import { TableProps } from "antd/es/table";
import moment from "moment";
import { Table } from "antd";
import { ActivitiesTableProps } from "@/types";
import { AiOutlineLink } from "react-icons/ai";
import APIService from "@/app/utils/APIServices";
import { AxiosResponse } from "axios";
import { useAddress } from "@thirdweb-dev/react";
import { useActiveAccount } from "thirdweb/react";
import Image from "next/image";
const truncateMiddle = (text: string, length: number) => {
  if (typeof text !== "string") return text;
  if (text.length <= length) return text;
  const halfLength = Math.floor((length - 3) / 2);
  if (halfLength < 0) return text;

  return `${text.slice(0, halfLength)}...${text.slice(-halfLength)}`;
};
//@ts-ignore
const MyActivitiesTable = ({}) => {
  const [activities, setActivities] = React.useState<ActivitiesTableProps | []>(
    []
  );
  const [collectionMetaData, setCollectionMetaData] = useState<
    Record<string, any>
  >({});
  const [tokenImageURI, setTokenImageURI] = useState("");

  const requestedAddressesRef = useRef(new Set<string>());

  const handleNFTMetaData = async (collectionAddress: string) => {
    if (requestedAddressesRef.current.has(collectionAddress)) {
      return; // Exit if this address has already been requested
    }
    requestedAddressesRef.current.add(collectionAddress);
    try {
      const response = await APIService.get(
        `/collections/nfts?address=${collectionAddress}&limit=100`
      );

      if (response?.data?.data?.result) {
        //console.log(response)
        setCollectionMetaData((prevMetaData) => ({
          ...prevMetaData,
          [collectionAddress]: response.data.data.result,
        }));
      }
    } catch (error) {
      console.error("Error fetching Collection MetaData:", error);
    }
  };

  // Use useEffect to fetch metadata for all token addresses
  useEffect(() => {
    if (Array.isArray(activities)) {
      activities.forEach((item) => {
        //@ts-ignore
        if (item.token_address && !collectionMetaData[item.token_address]) {
          //@ts-ignore
          handleNFTMetaData(item.token_address);
        }
      });
    }
  }, [activities]); // Run this effect whenever dataSource changes

  const columns: TableProps<ActivitiesTableProps>["columns"] = [
    {
      title: "Erc_type",
      dataIndex: "erc_type",
      key: "erc_type",
      render: (_, { erc_type }) => (
        <>
          <Tag
            color={erc_type === "ERC1155" ? "yellow" : "orange"}
            key={erc_type}
          >
            {erc_type.toUpperCase()}
          </Tag>
        </>
      ),
    },
    {
      title: "Item",
      dataIndex: "token_address",
      key: "token_address",
      render: (text) => {
        const currentMetaData = collectionMetaData[text];
        let httpsImageUrl = "";
        // Check if currentMetaData is defined and has the expected array structure
        if (
          currentMetaData &&
          Array.isArray(currentMetaData) &&
          currentMetaData.length > 0
        ) {
          const tokenURI = currentMetaData[0]?.normalized_metadata?.image;

          // Check if tokenURI exists and starts with "ipfs://"
          if (tokenURI && tokenURI.startsWith("ipfs://")) {
            const ipfsGateway = "https://ipfs.io/ipfs/";
            const ipfsUrl = tokenURI.replace("ipfs://", "");
            httpsImageUrl = `${ipfsGateway}${ipfsUrl}`;
            // console.log(currentMetaData); // For debugging
            //setTokenImageURI(httpsImageUrl);
          } else {
            console.warn(
              "Token URI is missing or does not start with 'ipfs://'"
            );
          }
        } else {
          console.warn("Current metadata is not an array or is undefined.");
        }

        return (
          <div className="flex ">
            {currentMetaData &&
            currentMetaData[0].name &&
            currentMetaData[0].symbol ? (
              <div className="flex justify-center items-center gap-5">
                <div>
                  <Image
                    alt="collection"
                    src={httpsImageUrl}
                    width={45}
                    height={45}
                    className="rounded-[10px]"
                  />
                </div>
                <div>
                  <p>{currentMetaData[0].name}</p>
                  <a
                    target="_blank"
                    className="text-[#FFF]"
                    href={`https://testnet.bscscan.com/token/${text}`}
                    rel="noopener noreferrer"
                  >
                    <p>{currentMetaData[0].symbol}</p>
                  </a>
                </div>
              </div>
            ) : (
              <p>Loading metadata...</p> // You can show a loading state until the metadata is available
            )}
          </div>
        );
      },
    },
    {
      title: "Price",
      dataIndex: "value",
      key: "value",
      render: (text) => {
        return <p>{text === "0" ? "---" : text}</p>;
      },
    },
    {
      title: "From",
      dataIndex: "from",
      key: "from",
      render: (text) => <p>{truncateMiddle(text as string, 18)}</p>,
    },
    {
      title: "To",
      key: "to",
      dataIndex: "to",
      render: (text) => {
        return (
          <a
            className="text-blue-500"
            target="_blank"
            href={`https://testnet.bscscan.com/address/${text}`}
            rel="noopener noreferrer"
          >
            {text.toLowerCase() === address?.toLowerCase()
              ? "You"
              : truncateMiddle(text as string, 18)}
          </a>
        );
      },
    },
    {
      title: "Transaction Date",
      key: "timestamp",
      dataIndex: "timestamp",
      render: (text, record) => (
        <a
          className="text-blue-500 flex items-center justify-center gap-2"
          target="_blank"
          href={`https://testnet.bscscan.com/tx/${record.hash}`}
          rel="noopener noreferrer"
        >
          {moment(text).fromNow()} <AiOutlineLink />
        </a>
      ),
    },
  ];

  const wallet = useActiveAccount();
  const address = wallet?.address;
  useEffect(() => {
    const handleGetWalletActivities = async () => {
      if (!address) return;
      try {
        const response: AxiosResponse<{
          data: ActivitiesTableProps;
        }> = await APIService.get(
          `/user/${address}/activity?chain=binance-testnet`
        );
        //console.log("API Response:", response); // Log the full API response

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
