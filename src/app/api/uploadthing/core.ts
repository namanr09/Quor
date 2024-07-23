import { useAuth, useClerk, useUser } from "@clerk/nextjs";
import { auth, currentUser, getAuth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { NextApiRequest , NextApiResponse } from "next";
const f = createUploadthing();

const handleAuth = () =>{
        console.log("inside Auth")
        const { userId } =  auth();
        // console.log(userId);
        if(!userId) throw new Error("Not logged in");
        return {userId : userId};
        
}

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    serverImage :  f({image : {maxFileSize : "4MB" , maxFileCount : 1}}).middleware(()=>handleAuth()).onUploadComplete(()=>{}),
    messageFile : f(["image" , "pdf" , "video"]).middleware(()=>handleAuth()).onUploadComplete(()=>{
    })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
