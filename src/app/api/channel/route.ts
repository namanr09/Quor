import { currentProfile } from "@/lib/currentProfile";
import db from "@/lib/db";
import { MemeberRole } from "@prisma/client";
import { NextResponse } from "next/server";


export async function POST (req : Request){
    try {
        const {serverId , name , type }  = await req.json();
        const profile = await currentProfile();
        if(!profile) {
            return NextResponse.json({error : "You must be logged in to do that"})
        }
        const server = await db.server.update({
            where : {
                id : serverId.toString(),
                members : {
                    some : {
                        profileId : profile.id,
                        role : {
                            in : [MemeberRole.ADMIN , MemeberRole.MODERATOR]
                        }
                    }
                }
            },
                data : {
                    channels : {
                        create : {
                            name : name,
                            type : type,
                            profileId : profile.id,
                    }
                }
            }
        })
        console.log(server);
        return NextResponse.json(server);
    } catch (error) {
        console.log(error);
        return NextResponse.json(error);
    }
}