import {ReactNode} from "react";
import NormalLayout from "./NormalLayout";
import { ConnectedNav, MobileNavbar, Footer } from "../components";

const NotConnected = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full min-h-screen h-full bg-blue-body text-white">
      <ConnectedNav/>
      <MobileNavbar />
      <NormalLayout>{children}</NormalLayout>
      <Footer />
    </div>
  );
};

export default NotConnected;
