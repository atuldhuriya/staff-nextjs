"use client";
import { FilePdfOutlined, FolderAddOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Flex,
  Form,
  Image,
  Input,
  QRCode,
  Space,
  Table,
  TableProps,
  Tag,
  Upload,
} from "antd";
import { getStorage, ref, uploadBytes } from "firebase/storage";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { Fragment, useState } from "react";
import { firebaseStorage } from "seeksolution/app/firebase";
import SeekSolutionApi from "seeksolution/utils/SeekSolutionApi";

const DevicesListing = ({ accessToken }: { accessToken: string }) => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [srNumber, setSrNumber] = useState("")
  console.log(srNumber);
  
  

  const initialiseApi = async ({ make, model, slNumber, asset, specefication, drawing }: any) => {
    console.log("specefication", specefication);

    try {
      setLoading(true);
      SeekSolutionApi.setToken(accessToken);
      console.log("accessToken", accessToken);

      const speceficationUrl = await uploadBytes(ref(firebaseStorage, 'devices/' + new Date().getTime() + specefication.file.name), specefication.file.originFileObj)
      console.log("speceficationUrl", speceficationUrl);

      const drawingUrl = await uploadBytes(ref(firebaseStorage, 'devices/' + new Date().getTime() + drawing.file.name), drawing.file.originFileObj)
      console.log("drawingUrl", drawingUrl);

      const apiRes = await SeekSolutionApi.Devices.create({
        make,
        model,
        slNumber,
        asset,
        specefication: speceficationUrl.ref.fullPath,
        drawing: drawingUrl.ref.fullPath
      });
      console.log("apiRes", apiRes);
      router.replace("/");
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };


  return (
    <Card title="Create Device">
      <Form onFinish={initialiseApi} layout="vertical">
        <Form.Item
          label="Make"
          name={"make"}
          rules={[{ required: true, message: "This field is required !" }]}
        >
          <Input placeholder="Enter make name" />
        </Form.Item>

        <Form.Item
          label="Model"
          name={"model"}
          rules={[{ required: true, message: "This field is required !" }]}
        >
          <Input placeholder="Enter model name" />
        </Form.Item>
        <Flex gap={'small'} justify="space-between" style={{ width: '95%' }}>
          <Form.Item
            label="Sr Number"
            style={{ width: '95%' }} 
            name={"slNumber"}
            rules={[{ required: true, message: "This field is required !" }]}

          >
            <Input placeholder="Enter sr number name"  onChange={(e)=>{setSrNumber(e.target.value)}}/>
          </Form.Item>
          <QRCode value={srNumber}
           size={150}
           includeMargin={true}
           
          >
             
          </QRCode>
        </Flex>

        <Form.Item
          label="Asset"
          name={"asset"}
          rules={[{ required: true, message: "This field is required !" }]}
        >
          <Input placeholder="Enter asset name" />
        </Form.Item>

        <Form.Item label="Specification" name={"specefication"}
          rules={[{ required: true, message: "This field is required !" }]}
        >
          <Upload.Dragger accept="application/pdf">
            Select file
          </Upload.Dragger>

        </Form.Item>

        <Form.Item label="Drawing" name={"drawing"}
          rules={[{ required: true, message: "This field is required !" }]}>

          <Upload.Dragger accept="application/pdf">Select file</Upload.Dragger>

        </Form.Item>
        <Button type="primary" htmlType="submit" block loading={loading}>
          Create
        </Button>
      </Form>
    </Card>
  );
};

DevicesListing.displayName = "DevicesListing";
export default DevicesListing;
