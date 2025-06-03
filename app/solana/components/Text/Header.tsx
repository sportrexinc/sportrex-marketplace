import React, {ReactNode} from 'react'

const Header = ({children} : {children:ReactNode}) => {
  return (
      <h1 className='grad-text text-[22px] md:text-3xl bold leading-[38px'>
        {children}
   </h1>
  )
}

export default Header