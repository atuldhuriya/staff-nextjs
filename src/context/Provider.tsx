"use client";
import React, {
  createContext,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { ConfigProvider, Flex, message, theme, Tour } from "antd";
import { MetaMaskUIProvider } from "@metamask/sdk-react-ui";

type ToastFunction = (msg: any) => void;

interface CommonContextType {
  loading: boolean;
  setLoading: React.Dispatch<SetStateAction<boolean>>;
  Toast: {
    error: ToastFunction;
    success: ToastFunction;
    warning: ToastFunction;
  };
}
export const GlobalContext = createContext({} as CommonContextType);
type GlobleContextProviderProps = {
  children: ReactNode;
  theme?: {
    direction: string;
    colorPrimary: string;
  };
};

const { defaultAlgorithm, darkAlgorithm } = theme;
function GlobalProvider(props: GlobleContextProviderProps) {
  const [loading, setLoading] = useState(false);
  const [selectedFiles, setSelectedFile] = useState<Array<any>>([]);

  const [isDarkMode, setIsDarkMode] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();

  const success = (success: any) => {
    messageApi.open({
      type: "success",
      content: success,
    });
  };

  const error = (error: any) => {
    let errorBody = error?.response?.body;
    let message = errorBody?.message;
    let error_message = errorBody?.error_description;
    messageApi.open({
      type: "error",
      content: message
        ? message
        : typeof error_message == "string"
          ? error_message
          : error_message
            ? JSON.stringify(error_message)
            : JSON.stringify(error),
      duration: 3,
    });
    setTimeout(messageApi.destroy, 1000);
  };

  const warning = (warning: any) => {
    messageApi.open({
      type: "warning",
      content: warning,
    });
  };

  const Toast = {
    success,
    warning,
    error,
  };

  return (

    <MetaMaskUIProvider debug={true} sdkOptions={{
      dappMetadata: {
        name: "Example React Dapp",
        url: window.location.host,
      },
      logging: {
        developerMode: true,
      }
      // Other options
    }}>
      <GlobalContext.Provider
        value={{ ...props, loading, setLoading, selectedFiles, setSelectedFile, Toast } as any}
      >
        <ConfigProvider
          // direction={locale == ar_EG ? 'rtl' : 'ltr'}
          // locale={locale}

          theme={{
            algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
            // token: {
            //   colorPrimary: colorPrimary,
            //   fontFamily: montserrat.style.fontFamily,
            // },
            components: {

            },
          }}
        >
          {props.children}
          {contextHolder}
        </ConfigProvider>
      </GlobalContext.Provider>


    </MetaMaskUIProvider >

  );
}

export default GlobalProvider;
