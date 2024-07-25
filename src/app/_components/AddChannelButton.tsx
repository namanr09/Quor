"use client"
import { Button } from '@/components/ui/button';
import { useModal } from '@/hooks/use-modal-store';
import { Server } from '@prisma/client';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import React from 'react'
type AddChannelButtonProps = {
  server : Server
}
export default function AddChannelButton({ server }:AddChannelButtonProps) {
  const { onOpen } = useModal();
  return (
    <div className="w-full">
      <Button
        className="w-full"
        variant={"outline"}
        onClick={() => onOpen("createChannel", { server })}
      >
        <PlusCircledIcon className="w-5 h-5" />
        {/* <span className="text-xs ">Create A New Channel</span> */}
      </Button>
    </div>
  );
}
