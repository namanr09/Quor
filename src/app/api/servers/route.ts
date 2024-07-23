import { currentProfile } from "@/lib/currentProfile";
import db from "@/lib/db";
import { MemeberRole } from "@prisma/client";
import { NextResponse } from "next/server";
import {v4 as uuidv4} from "uuid"

export async function POST(req : Request) {
    try {
        const {name ,imageUrl } = await req.json();
        const profile = await currentProfile();
        if(!profile){
            return NextResponse.json({error: "You must be logged in to do this" , status : 500} ) 
        }

        const server = await db.server.create({
            data: {
                profileId : profile.id,
                name,
                imageUrl,
                inviteCode : uuidv4(),
                channels : {
                    create : [
                        {name : "general" , profileId : profile.id}
                    ]
                },
                members : {
                    create : [
                        {profileId : profile.id , role : MemeberRole.ADMIN}
                        ]
                }
                
            }
        })

        return NextResponse.json(server);
        
    } catch (error) {
        console.log(error , "server Error");
        return new NextResponse("internal err",{status : 500})
    }
}