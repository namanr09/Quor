import { Server } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

type ServerProps =  {
    server : Server 
}

export default function 
({server} :{server :  Server}) {
    // console.log(typeof server);
    // console.log(server.imageUrl);
    
  return (
      <Link href={`/servers/${server.id}`} className="rounded w-[40px] h-[40px]  flex items-center" >
        <Image
          src={`${server.imageUrl }`}
          alt="Images"
          className=" relative object-cover mx-auto rounded border h-full "
          width={40}
          height={40}
        />
      </Link>
  );
}
