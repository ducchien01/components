import React, { useEffect, useState } from "react";
import { Table } from "antd";
import type { TableProps } from "antd";
import axios from "axios";

interface DataType {
  id: string;
  username: string;
  password: number;
  remember: string;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "UserName",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Password",
    dataIndex: "password",
    key: "password",
  },
  {
    title: "Remember",
    dataIndex: "remember",
    key: "remember",
  },
];

const TableData: React.FC = () => {
  const [data, setData] = useState<DataType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios({
          method: "get",
          url: `http://server.wini.vn/api/data/getAll`,
          headers: {
            "Content-Type": "application/json",
            pid: "VDC",
            module: "Customer",
          },
        });
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return <Table columns={columns} dataSource={data} rowKey="id" />;
};

export default TableData;
