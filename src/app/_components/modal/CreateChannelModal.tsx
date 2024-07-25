import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


import { useForm } from "react-hook-form";
import * as Z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import FileUpload from "@/app/_components/FileUpload";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import toast from "react-hot-toast";
import { ChannelType, MemeberRole } from "@prisma/client";

const formSchema = Z.object({
  name: Z.string().min(1, { message: "Channel name is required" }),
  type: Z.optional(Z.string().min(1, { message: "Channel Type is required" })),
});

export default function CreateChannelModal() {
  const router = useRouter();
  const { isOpen, onClose, type , data } = useModal();
  // console.log(isOpen);
  // console.log(type);
  // console.log(data.server);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: ChannelType.TEXT,
    },
  });

  const isModalOpen = isOpen && type === "createChannel";

  const isLoading = form.formState.isSubmitting;

  const handleOnClose = () => {
    form.reset();
    onClose();
  };

  //   const onSubmit = async (values: Z.infer<typeof formSchema>) => {
  //     console.log(values);

  //     try {
  //     } catch (error) {
  //       console.log("Error", error);
  //     }
  //   };
  const onSubmit = async (values: Z.infer<typeof formSchema>) => {
    // console.log(values);

    try {
      const value = { serverId: data.server?.id, ...values };
      // console.log(value)
      const channel: any = await axios.post("/api/channel", value);
      form.reset();
      router.refresh();
      toast.success("Channel created successfully");
    //   window.location.reload();
        onClose()
      }
    catch(error) {
      console.log("Error", error);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleOnClose}>
      <DialogContent>
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="font-bold text-2xl text-center">
            Create A New Channel
          </DialogTitle>
          <DialogDescription className="text-center"></DialogDescription>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-5 flex flex-col  "
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Channel name</FormLabel>
                    <FormControl>
                      <Input placeholder="enter name here" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Channel type</FormLabel>
                      <Select disabled={isLoading}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="select a channel type"></SelectValue>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.values(ChannelType).map((type)=>(
                            <SelectItem value={type} key={type} className=" capitalize" >{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {/* <Input type="select" placeholder="enter name here" {...field} /> */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button disabled={isLoading} type="submit" >
                Create
              </Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
