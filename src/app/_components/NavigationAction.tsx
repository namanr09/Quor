"use client"
import { useModal } from '@/hooks/use-modal-store'
import { PlusCircle } from 'lucide-react'
import React from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";






export default function NavigationAction() {
    const {onOpen} = useModal()
  return (
    <div className="" onClick={() => onOpen("createServer")} role="button">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <PlusCircle className="text-muted-foreground" />
          </TooltipTrigger>
          <TooltipContent className='' side='right'>
            <p className='text-xs text-muted-foreground'>Create A New Server</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
