"use client";
import { FC, ReactNode } from "react";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import { ThirdwebProvider as ThirdwebProviderV4 } from "@thirdweb-dev/react";
import { ThirdwebProvider } from "thirdweb/react";
import "react-toastify/dist/ReactToastify.css";
const ContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastContainer position="top-right" />
        <ThirdwebProviderV4
          activeChain={"binance-testnet"}
          clientId={process.env.NEXT_PUBLIC_THIRD_WEB_CLIENT_ID}
        >
          <ThirdwebProvider>{children}</ThirdwebProvider>
        </ThirdwebProviderV4>
      </PersistGate>
    </Provider>
  );
};

export default ContextProvider;
