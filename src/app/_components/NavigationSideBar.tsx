import { currentProfile } from '@/lib/currentProfile'
import db from '@/lib/db';
import { redirect } from 'next/navigation';
import React from 'react'
import { ObjectId } from "mongodb";
import { useModal } from '@/hooks/use-modal-store';
import NavigationAction from './NavigationAction';
import { ModeToggle } from './ModeToggle';
import Image from 'next/image';
import ServerButton from './ServerButton';

// import mongo from 'mongodb'


// const ObjectId =  mongo.ObjectId;
export default async function NavigationSideBar() {
    const profile = await currentProfile();
    if(!profile) return redirect('/sign-in');
    // console.log(typeof profile.id);
    // const profileId = new ObjectId(profile.id);
    const profileId = profile.id;
    // console.log(typeof profileId);
    const servers = await db.server.findMany({
        // where : {
        //     members : {
        //     }
        // }
        where: {
        OR: [
          // {
          //   members: {
          //     every: {
          //       profileId : profileId
          //     },
          //   },
          // },
          {
            members: {
              some: {
                profileId : profileId
              },
            },
          },
        ],
      },
    });
    // console.log(profile);
    // console.log(servers);
  return (
    <div className="space-y-4 flex flex-col items-center h-full text-primary max-w-[70px] w-[70px]  p-1 dark:bg-[#1E1F22] py-3 justify-between">
      <div className="flex flex-col justify-start items-center space-y-5">
        <div className='text-xs text-muted-foreground'>
          Servers
        </div>
        <div className='flex flex-col space-y-2'>
          {servers.map((server) => (
              <ServerButton key={`${server.imageUrl}`} server={server}/>
          ))}
        </div>
        <NavigationAction />
      </div>
      <div>
        <ModeToggle />
      </div>
    </div>
  );
}
