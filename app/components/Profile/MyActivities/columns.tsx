import { Space, Tag } from "antd";
import { TableProps } from "antd/es/table";
import { ActivitiesTableProps } from "@/types";

const truncateMiddle = (text: string, length: number) => {
  if (typeof text !== "string") return text;
  if (text.length <= length) return text;
  const halfLength = Math.floor((length - 3) / 2);
  if (halfLength < 0) return text;

  return `${text.slice(0, halfLength)}...${text.slice(-halfLength)}`;
};

export const columns: TableProps<ActivitiesTableProps>["columns"] = [
  {
    title: "Transaction Hash",
    dataIndex: "hash",
    key: "hash",
    render: (text) => {
      return (
        <a
          className="text-blue-500"
          href={`https://testnet.bscscan.com/tx/${text}`}
          rel="noopener noreferrer"
        >
          {truncateMiddle(text as string, 20)}
        </a>
      );
    },
  },
  {
    title: "Events",
    dataIndex: "event_type",
    key: "event_type",
    render: (_, { event_type }) => (
      <>
        <Tag color={`green`} key={event_type}>
          {event_type.toUpperCase()}
        </Tag>
      </>
    ),
  },

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
    title: "Price",
    dataIndex: "value",
    key: "value",
  },
  {
    title: "Item",
    dataIndex: "token_address",
    key: "token_address",
    render: (text) => {
        return (
          <a
            className="text-blue-500"
            href={`https://testnet.bscscan.com/address/${text}`}
            rel="noopener noreferrer"
          >
            {truncateMiddle(text as string, 20)}
          </a>
        );
      },
  },
  {
    title: "From",
    dataIndex: "from",
    key: "from",
    render: (text) => <p>{truncateMiddle(text as string, 20)}</p>,
  },
  {
    title: "To",
    key: "to",
    dataIndex: "to",
    render: (text) => (
      <a
        className="text-blue-500"
        target="_blank"
        href={`https://testnet.bscscan.com/address/${text}`}
      >
        {truncateMiddle(text as string, 20)}
      </a>
    ),
  },
  {
    title: "Transaction Date",
    key: "timestamp",
    dataIndex: "timestamp",
  },
];
