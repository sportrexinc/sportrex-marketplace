
import { MobileNavbar, Footer, ConnectedNav } from "../components";
import MarketNav from "../components/Navbar/MarketNav";

const MarketLayout = ({
  children,
  current,
}: {
  children?: any;
  current?: number;
}) => {
  return (
    <div className="w-full min-h-screen h-full bg-blue-body text-white">
      <MarketNav current={current} />
      <MobileNavbar />
          <div className="w-full">
              {children}
          </div>
   
    </div>
  );
};

export default MarketLayout;
