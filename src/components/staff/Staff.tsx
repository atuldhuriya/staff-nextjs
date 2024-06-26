"use client";
import { EditOutlined, FilePdfOutlined, FolderAddOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Card, Flex,  Space, Table, TableProps, Tag } from "antd";
import Search, { SearchProps } from "antd/es/input/Search";
import { getDownloadURL, ref } from "firebase/storage";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment } from "react";
import { firebaseStorage } from "seeksolution/app/firebase";
import SeekSolutionApi from "seeksolution/utils/SeekSolutionApi";

const Staff = () => {
  const [state, setState] = React.useState([{name:"hyy"},{email:"jscch"},{phone:""},{activity:"dhj" }]);
  const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

  

  const columns: TableProps["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) =>_,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (_, record) => _,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (_, record) => <span>{_ || 0}</span>,
    },
   
    {
      title: <div style={{ textAlign:"center"}}>Activity</div>,
      key: "activity",
      render: (_, record) => (
       <Flex justify="center" gap={20} align="center">
        <Button
          type="primary"
        >
           <Link href={`/staff/edit`}>

          <EditOutlined /> 
           </Link>
        </Button>
         <Button
          type="primary"
        >
          <Image src={"/view.svg"} alt="" height={20} width={20}  />
         
        </Button>
       </Flex>
      ),
    },
    
  ];

 

  React.useEffect(() => {
  }, []);

  return (
    <Card
      title="Staff"
      extra={[
        <Flex justify="center" align="center" gap={200}>
        <Search placeholder="input search text" allowClear onSearch={onSearch} style={{ width: 400 }} />
        <Link href={"/staff/create"} key={"devices/create"}>
          <PlusCircleOutlined style={{fontSize: "20px"}}/>
        </Link>
        </Flex>
      ]}
    >
      <Table columns={columns} dataSource={state} />;
    </Card>
  );
};

Staff.displayName = "Staff";
export default Staff;
