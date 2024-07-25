import { useEffect } from 'react';
import NormalLayout from './NormalLayout'
import { MobileNavbar,Footer, ConnectedNav } from '../components'

const ParentLayout = ({ children, current }: { children?: any; current?: number }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  
  return (
    <div className="w-full min-h-screen h-full bg-blue-body text-white">
      <ConnectedNav current={current} /> 
          <MobileNavbar />
          <NormalLayout>
              {children}
          </NormalLayout>
          <Footer />
    </div>
  );
}

export default ParentLayout