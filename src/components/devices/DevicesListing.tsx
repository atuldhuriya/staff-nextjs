"use client";
import { FilePdfOutlined, FolderAddOutlined } from "@ant-design/icons";
import { Button, Card, Flex, Image, QRCode, Space, Table, TableProps, Tag } from "antd";
import { getDownloadURL, ref } from "firebase/storage";
import moment from "moment";
import Link from "next/link";
import React, { Fragment } from "react";
import { firebaseStorage } from "seeksolution/app/firebase";
import SeekSolutionApi from "seeksolution/utils/SeekSolutionApi";

const DevicesListing = ({ accessToken }: { accessToken: string }) => {
  const [state, setState] = React.useState([]);

  const downloadQRCode = () => {
    const canvas = document.getElementById('myqrcode')?.querySelector<HTMLCanvasElement>('canvas');
    if (canvas) {
      const url = canvas.toDataURL('srNumber');
      const a = document.createElement('a');
      a.download = 'QRCode.png';
      a.href = url;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const downloadFile = async (url: any) => {
    try {
      console.log("downloadFile called", url);

      const downlodableUrl = await getDownloadURL(ref(firebaseStorage, url));
      console.log("downlodableUrl", downlodableUrl);

      window.open(downlodableUrl);
    } catch (error) {
      console.log("downloadFile error", error);
    }
  };
  

  const columns: TableProps["columns"] = [
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_, record) => moment(_).format("MMM, DD YYYY"),
    },
    {
      title: "Make",
      dataIndex: "make",
      key: "make",
      render: (_, record) => _,
    },
    {
      title: "Model",
      dataIndex: "model",
      key: "model",
      render: (_, record) => <span>{_ || 0}</span>,
    },
    {
      title: "Sr Number",
      dataIndex: "slNumber",
      key: "slNumber",
      render: (_, record) => <span>{_ || 0}</span>,
    },
    {
      title: "Asset",
      dataIndex: "asset",
      key: "asset",
      render: (_, record) => <span>{_ || 0}</span>,
    },
    {
      title: "Specification",
      key: "specefication",
      render: (_, record) => (
        <Button
          type="primary"
          //disabled={!record.specefication}
          icon={<FilePdfOutlined />}
          onClick={() => downloadFile(record.specefication)}
        >
          Download
        </Button>
      ),
    },
    {
      title: "Drawing",
      key: "drawing",
      render: (item, record) => (
        <Button
          type="primary"
          disabled={!record.drawing}
          icon={<FilePdfOutlined />}
          onClick={() => downloadFile(record.drawing)}
        >
          Download
        </Button>
      ),
    },
    {
      title: "QR",
      key: "qr",
      render: (_, record) => (
        <div id="myqrcode">
        <QRCode value="234" bgColor="#fff" style={{ marginBottom: 16}}  size={120} />
        <Button type="primary" onClick={downloadQRCode}>
         Download  QR
        </Button>
      </div>
    
      ),
    },
  ];

  const initialiseApi = async () => {
    try {
      SeekSolutionApi.setToken(accessToken);
      const apiRes = await SeekSolutionApi.Devices.pagination();
      console.log("apiRes", apiRes);

      setState(apiRes);
    } catch (error) {}
  };

  React.useEffect(() => {
    initialiseApi();
  }, []);

  return (
    <Card
      title="Devices"
      extra={[
        <Link href={"/devices/create"} key={"devices/create"}>
          <FolderAddOutlined />
        </Link>,
      ]}
    >
      <Table columns={columns} dataSource={state} />;
    </Card>
  );
};

DevicesListing.displayName = "DevicesListing";
export default DevicesListing;
