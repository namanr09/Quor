import { Button } from "@/components/ui/button"
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { currentProfile } from "@/lib/currentProfile"
import db from "@/lib/db"
import { Server } from "@prisma/client"
import { CardStackPlusIcon, PlusCircledIcon, PlusIcon } from "@radix-ui/react-icons"
import { AudioLines, Hash, MessageSquare, Search, Video } from "lucide-react"
import { redirect } from "next/navigation"
import React from "react"
import AddChannelButton from "./AddChannelButton"
type ServerOptionsProps = {
    server : Server
}

export default async function ServerChannels ( {server }  : ServerOptionsProps  )  {
    // const server = await db.server.findUnique({
    //     where: {id: serverId.toString()}
    // })
    const user = await currentProfile();
    if(!user) {
        redirect('/');
    }
    const channels = await db.channel.findMany({
        where: {serverId: server.id}
    })
    // const channels = false;
    // console.log(channels);
    if(!channels){
        return (
          <div className="h-full w-full flex items-center justify-center">
            <div
              className="flex flex-col items-center space-y-2 justify-center text-muted-foreground"
              role="button"
            //   onClick={()=> 2 + 2} // todo
            >
              <CardStackPlusIcon className="w-7 h-7" />
              <span className="text-xs font-bold">Create A New Channel</span>
            </div>
          </div>
        );
    }

    const AudioChannels = channels.filter((channel) => channel.type === 'VOICE')
    const TextChannels = channels.filter((channel) => channel.type === 'TEXT')
    const VideoChannels = channels.filter((channel) => channel.type === 'VIDEO')

    // console.log(AudioChannels);
    // console.log(TextChannels);
    // console.log(VideoChannels);


    if(channels){
        return (
          <div className="flex flex-col items-center h-full w-full   justify-between ">
            <div className="  space-x-1  px-2 flex bg-background rounded items-center">
              <div className="w-full ">
                <input
                  type="text"
                  className="w-[150px]  outline-none border-none p-2 text-xs text-muted-foreground bg-background"
                />
              </div>
              <Search className="text-muted-foreground w-5 h-5" />
            </div>
            <div className="h-full py-4 space-y-2 w-full flex flex-col items-start pl-4">
              <div className="flex space-x-2 text-muted-foreground/90 justify-center items-center text-xs font-bold  ">
                <MessageSquare className="w-4 h-4" />
                <span>Text Channels</span>
              </div>

              <div className="flex flex-col w-full pl-2 p-2 space-y-1">
                {TextChannels.map((channel) => (
                  <div className="flex items-center text-muted-foreground">
                    <Hash className="w-4 h-4" />
                    <span className="text-muted-foreground text-sm truncate ">
                      {channel.name}
                    </span>
                  </div>
                ))}
              </div>
              {/* <div className="w-full h-[1px] bg-muted-foreground/60 "></div> */}

              <div className="flex space-x-2 text-muted-foreground/90 justify-center items-center text-xs font-bold ">
                <AudioLines className="w-4 h-4" />
                <span>Audio Channels</span>
              </div>
              {/* <div className="w-full h-[1px] bg-muted-foreground/60  "></div> */}
              <div className="flex flex-col w-full pl-2 p-1 space-y-1 ">
                {AudioChannels.map((channel) => (
                  <div className="flex items-center text-muted-foreground">
                    <Hash className="w-4 h-4" />
                    <span className="text-muted-foreground text-sm truncate ">
                      {channel.name}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex space-x-2 text-muted-foreground/90 justify-center items-center text-xs font-bold ">
                <Video className="w-4 h-4" />
                <span>Video Channels</span>
              </div>
              <div className="flex flex-col w-full pl-2 p-1 space-y-1">
                {VideoChannels.map((channel) => (
                  <div className="flex items-center text-muted-foreground">
                    <Hash className="w-4 h-4" />
                    <span className="text-muted-foreground text-sm truncate ">
                      {channel.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex p-2 w-full">
              <AddChannelButton server={server} />
            </div>
          </div>
        );
    }
}
