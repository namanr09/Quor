"use client"
import CreateChannelModal from '@/app/_components/modal/CreateChannelModal';
import CreateServerModal from '@/app/_components/modal/CreateServerModal'
import InvitationModal from '@/app/_components/modal/InvitationModal';
import React, { useEffect, useState } from 'react'


export default function ModalProviders() {
    const [isMounted , setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
        }, [])

        if(!isMounted){
            return null;
        }
  return (
    <>
    <CreateServerModal/>
    <InvitationModal/> 
    <CreateChannelModal/>
    </>
)
}
