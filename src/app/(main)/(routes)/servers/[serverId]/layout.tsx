import ServerSideBar from '@/app/_components/ServerSideBar'
import { currentProfile } from '@/lib/currentProfile';
import { redirect } from 'next/navigation';
import React, { ReactNode } from 'react'

export default async function layout({
    children,
    params
} : {
    children: ReactNode,
    params: any
}) {
    console.log(params.serverId);
    const serverId = params.serverId.toString();
    const user = await currentProfile();
    if(!user) {
        return redirect('/');
    }
  return (
    <div className='h-full flex'>
        <ServerSideBar serverId={serverId} />
        <div className='pl-2 h-full'>{children}</div>
    </div>
  )
}
