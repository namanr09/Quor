import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";


import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import axios from "axios";
import { redirect, useParams, useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { RefreshCcw } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import db from "@/lib/db";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Router } from "next/router";


export default  function InvitationModal() {
    const { isOpen, onClose, type ,data  } = useModal();
    const router  = useRouter();



  const isModalOpen = isOpen && type === "invite";
  const [newCode, setNewCode] = useState("");
  const code = newCode || data.server?.inviteCode;

  const handleOnClose = () => {
    onClose();
  };

  //   const onSubmit = async (values: Z.infer<typeof formSchema>) => {
  //     console.log(values);

  //     try {
  //     } catch (error) {
  //       console.log("Error", error);
  //     }
  //   };
  const onCopy = () =>{
    navigator.clipboard.writeText(`localhost:3000/servers/${data.server?.id}/join/${code}`);
    toast.success("Link copied to clipboard")
  }

  const onRegenrate = async()=>{
    try {
        const newInviteCode  = uuidv4();
        await axios.post("/api/servers/invite",{serverId : data.server?.id , inviteCode : newInviteCode});
        setNewCode(newInviteCode);
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleOnClose}>
      <DialogContent>
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="font-bold text-2xl text-center">
            Copy link to invite people
          </DialogTitle>
          {/* <DialogDescription className="text-center">
            Give your server
          </DialogDescription> */}
          <div className="flex items-center space-x-2">
            <Input
              disabled
              value={`localhost:3000/servers/${data.server?.id}/join/${code}`}
            />
            <Button onClick={() => onRegenrate()}>
              <RefreshCcw />
            </Button>
          </div>
          <Button onClick={onCopy}>Copy</Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
