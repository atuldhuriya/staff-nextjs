"use client";
import { Button, Card, Flex, Form, Input } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { GlobalContext } from "seeksolution/context/Provider";
import SeekSolutionApi from "seeksolution/utils/SeekSolutionApi";
import { ACCESS_TOKEN } from "seeksolution/utils/constant";

const SignIn = () => {
  const router = useRouter();
  const { Toast, setLoading, loading } = React.useContext(GlobalContext);

  function setCookie(
    cookieName: string,
    cookieValue: string,
    expirationDays: number
  ) {
    var d = new Date();
    d.setTime(d.getTime() + expirationDays * 24 * 60 * 60 * 1000);
    var expires = "expires=" + d.toUTCString();
    document.cookie =
      cookieName + "=" + cookieValue + ";" + expires + ";path=/";
  }

  const handleLogin = async (values: any) => {
    setLoading(true);
    try {
      const apiRes = await SeekSolutionApi.Auth.signin(values);
      setCookie(ACCESS_TOKEN, apiRes.access_token, 1);
      if (apiRes.admin) {
        router.replace("/devices/page/1");
      }
    } catch (error) {
      Toast.error(error);
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyItems: "center",
        marginTop: "120px",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <div style={{ position: "relative" }}>
        <Image
          src={"/Enr Logo Final.png"}
          height={100}
          width={100}
          alt=""
        ></Image>
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            bottom: "1",
            margin: "50px -225px",
            zIndex: "-1",
            border: "black",
            borderStyle: "dashed",
            borderWidth: "2px",
            borderRadius: "10px",
            paddingTop: "40px",
          }}
        >
          <Card
            bordered={false}
            style={{
              width: 550,
            }}
          >
            <Form onFinish={handleLogin} layout="vertical">
              <div>
                <h2>Sign in</h2>
              </div>

              <Form.Item
                label="Email"
                style={{ fontSize: "medium", fontWeight: "bold" }}
                name={"email"}
              >
                <Input placeholder="Username or email" />
              </Form.Item>
              <Form.Item
                label="Password"
                style={{
                  fontSize: "medium",
                  fontWeight: "bold",
                }}
                name={"password"}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>
              <Form.Item>
                <Button
                  block
                  style={{
                    backgroundColor: "#0A428F",
                    fontSize: "medium",
                    fontWeight: "bold",
                    color: "white",
                  }}
                  htmlType="submit"
                  loading={loading}
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
