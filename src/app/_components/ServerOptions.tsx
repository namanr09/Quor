"use client"
import db from '@/lib/db';
import { Server } from '@prisma/client';
import React, { useState } from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowDownCircle, ArrowUpIcon, ChevronDown, ChevronUp, PackagePlus, SettingsIcon, Trash, UserRoundPlus, UsersRound } from 'lucide-react';
import { TrashIcon } from '@radix-ui/react-icons';
import { useModal } from '@/hooks/use-modal-store';


type ServerOptionsProps = {
    server : Server
}

export default  function ServerOptions ( {server }  : ServerOptionsProps  )  {
    // const server = await db.server.findUnique({
    //     where: {id: serverId.toString()}
    // })
    const [isOpen ,setIsOpen] = useState(false); 
    const  {onOpen } = useModal();

  return (
    <div className="">
      <DropdownMenu>
        <DropdownMenuTrigger
          className="outline-none "
          role="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center space-x-4">
            <span className="text-xs text-muted-foreground font-bold">
              {server?.name}
            </span>
            {isOpen && (
              <div>
                <ChevronUp className="w-4 h-4 text-muted-foreground" />
              </div>
            )}
            {!isOpen && (
              <div>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </div>
            )}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem role='button' onClick={()=> onOpen('invite', { server  } ) }>
            <div className="text-muted-foreground text-sm flex items-center space-x-2">
              <div>
                <UserRoundPlus className="w-4 h-4" />
              </div>
              <span className="font-bold text-xs">Invite People</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div className="text-muted-foreground  text-sm flex items-center space-x-2">
              <div>
                <PackagePlus className="w-4 h-4" />
              </div>
              <span className="font-bold text-xs">Create Channel</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div className="text-muted-foreground  text-sm flex items-center space-x-2">
              <div>
                <UsersRound className="w-4 h-4" />
              </div>
              <span className="font-bold text-xs">Members</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div className="text-muted-foreground  text-sm flex items-center space-x-2">
              <div>
                <SettingsIcon className="w-4 h-4" />
              </div>
              <span className="font-bold text-xs">Settings</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <div className="text-red-600 text-sm flex items-center space-x-2">
              <div>
                <TrashIcon className="w-4 h-4" />
              </div>
              <span className="font-bold text-xs">Delete Server</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
