import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { redirect, useParams } from 'next/navigation';
import db from '@/lib/db';
import ServerOptions from './ServerOptions';
import ServerChannels from './ServerChannels';

type ServerSideBarProps = {
    serverId : String
}

export default async function ServerSideBar({serverId} : ServerSideBarProps) {
    const server = await db.server.findUnique({
        where: { id: serverId.toString() }
        });

        if(!server){
            redirect('/home');
        }
  return (
    <div className="  w-[200px] h-full bg-grey   z-15 dark:bg-[#1E1F22] flex flex-col items-center ">
      <div className="flex items-center p-2">
        <ServerOptions server={server}/>
      </div>
      <div className='flex flex-col h-full w-full'>
        {/* channels */}
        <ServerChannels server={server}/>
      </div>
    </div>
  );
}
