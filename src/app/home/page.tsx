import InitialModal from '@/components/modals/InitialModal';
import db from '@/lib/db';
import { initialProfile } from '@/lib/initial-profile'
import { redirect } from 'next/navigation';
import React from 'react'


type profileType = {
  id: string;
  userId: string;
  name: string | null;
  email: string;
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
};


async function SetupPage() {
    const profile :any = await initialProfile() ;
    const server = await db.server.findFirst({
        where : {
            members : {
                some : {
                    profileId : profile.id,
                }
            }
        }
    })
    console.log(profile , "if ant");
    console.log(server , "@@@@@@@@@@");

     if(server){
        return redirect(`/servers/${server.id}`);
     }
  return (
    <InitialModal/>
  )
}

export default SetupPage