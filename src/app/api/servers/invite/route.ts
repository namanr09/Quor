import { currentProfile } from "@/lib/currentProfile";
import db from "@/lib/db";
import { MemeberRole } from "@prisma/client";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const {serverId ,  inviteCode  } = await req.json();
    const profile = await currentProfile();
    if (!profile) {
      return NextResponse.json({
        error: "You must be logged in to do this",
        status: 500,
      });
    }
    const serverUpdate = await db.server.update({
        where: {
            id: serverId
        },
        data: {
            inviteCode: inviteCode,
        }
    });
        return NextResponse.json({
            success: true,
            server : serverUpdate 
            }); 
    }
     catch (error) {
    console.log(" hhhhhhhhhhhhhhhhhhhhhhh lorem34 server Error");
    console.log(error, "server Error");
    return new NextResponse("internal err", { status: 500 });
  }
}
