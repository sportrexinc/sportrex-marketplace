import { Space, Tag } from 'antd';
import { TableProps } from 'antd/es/table'; 
import {ActivitiesTableProps} from "@/types"

export const columns: TableProps<ActivitiesTableProps>['columns'] = [
  {
    title: 'Events',
    dataIndex: 'event_type',
    key: 'event_type',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Price',
    dataIndex: 'value',
    key: 'value',
  },
  {
    title: 'From',
    dataIndex: 'from',
    key: 'from',
  },
  {
    title: 'To',
    key: 'to',
    dataIndex: 'to',
    render: (text) => <a className="text-blue-500" target="_blank" href={`https://testnet.bscscan.com/address/${text}`}>{text}</a>,
  },
  {
    title: 'Transaction Date',
    key: 'timestamp',
    dataIndex: 'timestamp'
  },
];
