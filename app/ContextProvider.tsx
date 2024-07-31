"use client";
import { FC, ReactNode } from "react";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import { ThirdwebProvider } from "@thirdweb-dev/react";

const ContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastContainer position="bottom-right" />
        <ThirdwebProvider
          activeChain={"binance-testnet"}
          clientId={process.env.NEXT_PUBLIC_THIRD_WEB_CLIENT_ID}
        >
          {children}
        </ThirdwebProvider>
      </PersistGate>
    </Provider>
  );
};

export default ContextProvider;
