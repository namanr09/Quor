"use client"
import CreateServerModal from '@/app/_components/modal/CreateServerModal'
import { currentProfile } from '@/lib/currentProfile'
import { UserButton, useUser } from '@clerk/nextjs'
import { useParams } from 'next/navigation'
import React from 'react'

 const page = async() => {
    const {serverId} = useParams()
  return (
    <div>{serverId}
    <UserButton/>
    </div>
  )
}
export default page