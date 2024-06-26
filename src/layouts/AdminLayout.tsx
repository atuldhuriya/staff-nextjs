"use client";
import React from "react";
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  LogoutOutlined,
  MailOutlined,
  SettingOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Avatar, Breadcrumb, Dropdown, Flex, Layout, Menu, theme } from "antd";
import Link from "next/link";
import { ACCESS_TOKEN } from "seeksolution/utils/constant";
import { useRouter } from "next/navigation";
import Image from "next/image";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const sidebarItems: MenuProps["items"] = [
  // getItem('Analytics', 'analytics', null, [getItem(<Link href={`/dashboard`}>Dashboard</Link>, '13'), getItem('Option 14', '14')], 'group'),
  getItem(
    "Basic",
    "basic",
    null,
    [
      getItem(<Link href={`/staff`}>Staff</Link>, "staff"),
      getItem(<Link href={`/devices/page/1`}>Devices</Link>, "devices"),
      // getItem(<Link href={`/ads/page/1`}>Ads</Link>, 'Ads' )
    ],
    "group"
  ),

  // getItem('Navigation One', 'sub1', <MailOutlined />, [
  //     getItem('Item 1', 'g1', null, [getItem('Option 1', '1'), getItem('Option 2', '2')], 'group'),
  //     getItem('Item 2', 'g2', null, [getItem('Option 3', '3'), getItem('Option 4', '4')], 'group'),
  // ]),

  // getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
  //     getItem('Option 5', '5'),
  //     getItem('Option 6', '6'),
  //     getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
  // ]),

  // { type: 'divider' },

  // getItem('Content', 'sub4', <SettingOutlined />, [
  //     getItem('Content 1', '9'),
  //     getItem('Content 2', '10'),
  //     getItem('Content 3', '11'),
  //     getItem('Content 4', '12'),
  // ]),
];

const items: MenuProps["items"] = [
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BarChartOutlined,
  CloudOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `nav ${index + 1}`,
}));

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const router = useRouter();
  const handleDelete = async () => {
    document.cookie =
      ACCESS_TOKEN + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.replace("/");
  };

  return (
    <Layout hasSider>
      <Sider
        // collapsible
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <Flex justify="center">
          <Link href={`/`}>
            <Image
              alt=""
              height={60}
              width={60}
              style={{ padding: "10px" }}
              src={"/Enr Logo Final.png"}
            ></Image>{" "}
          </Link>
        </Flex>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["devices"]}
          items={sidebarItems}
        />
      </Sider>
      <Layout style={{ marginLeft: 190 }}>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Flex gap={"small"} justify="end" align="center">
            {/* <Menu
                            mode="horizontal"
                            defaultSelectedKeys={['2']}
                            items={items}
                            style={{ flex: 1, minWidth: 0 }}
                        /> */}

            <Dropdown
              menu={{
                items: [
                  {
                    key: "logout",
                    icon: <LogoutOutlined onClick={handleDelete} />,
                    label: <span onClick={handleDelete}> Logout</span>,
                  },
                ],
              }}
            >
              <Avatar icon={<UserOutlined />} style={{ margin: "15px" }} />
            </Dropdown>
          </Flex>
        </Header>
        <Content
          style={{ margin: "16px", overflow: "initial", minHeight: "75vh" }}
        >
          {children}
        </Content>
        <Footer style={{ textAlign: "center", fontSize: "15px" }}>
          EnR Consultancy Services{" "}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
