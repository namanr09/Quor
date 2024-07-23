import { currentUser , redirectToSignIn } from "@clerk/nextjs/server";

import db from "./db";
import { redirect } from "next/navigation";

type profileType = {
  id: string;
  userId: string;
  name: string | null;
  email: string;
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export const initialProfile  = async ()  =>{
    const user = await currentUser() ;

    console.log(user);
    
    if(!user){
        return redirect('/sign-in');
    }

    const profile = await db.profile.findUnique({
        where :{
            userId : user?.id
        }
    });

    if(profile) return profile;

    const newProfile  = await db.profile.create({
        data : {
            userId : user?.id !,
            name : `${user?.firstName} ${user?.lastName}`,
            imageUrl : `${user?.imageUrl}`,
            email : `${user?.emailAddresses[0].emailAddress}`
        }
    })

    return newProfile;
}