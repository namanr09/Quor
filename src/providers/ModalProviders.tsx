"use client"
import CreateServerModal from '@/app/_components/modal/CreateServerModal'
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
    </>
)
}
