import React, { ReactNode } from 'react'
import Navbar from './_components/Navbar'

export default function layout({children} : {children : ReactNode}) {
  return (
    <div className='h-full '>
        <Navbar/>
        {children}
        </div>
  )
}
