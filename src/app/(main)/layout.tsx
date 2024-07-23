import React, { ReactNode } from 'react'
import NavigationSideBar from '../_components/NavigationSideBar'
import ServerSideBar from '../_components/ServerSideBar'

export default function layout({children} : {children : ReactNode}) {
  return (
    <div className="h-full flex">
      <div className=" flex h-full z-100">
        <div>
          <NavigationSideBar />
        </div>
        <div className="w-[3px] h-full dark:bg-[#41444e] bg-[#1E1F22] "></div>
      </div>
      <main className=" h-full">{children}</main>
    </div>
  );
}
