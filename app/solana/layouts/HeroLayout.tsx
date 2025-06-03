import {ReactNode} from 'react'

const styles = {
  parentContainer: "w-full h-full px-4 lg:pl-0 my-4 lg:my-8 relative pt-2 ",
  mainContainer: "w-full h-full  element-index",
  

};

const HeroLayout = ({children} : {children:ReactNode}) => {
  return (
    <div className={styles.parentContainer}>
      <div className={styles.mainContainer}>{children}</div>

      {/* <div className="blur-circle-center bg-index" /> */}
      <div className="blur-circle-top-left-20 bg-index" />
      <div className="blur-circle-bottom-left-20 bg-index" />
      <div className="blur-circle-bottom-left-0 bg-index" />
      
    </div>
  );
}

export default HeroLayout
