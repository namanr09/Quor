"use client"
import { Button } from '@/components/ui/button';
import { UploadDropzone } from '@/lib/uploadthing';
import "@uploadthing/react/styles.css"
import { error } from 'console';
import { X } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

interface FileUploadProps {
    onChange : (url? : string) => void;
    value : string;
    endpoint  : "messageFile" | "serverImage";
}

export default function FileUpload({
    onChange,
    value,
    endpoint
}: FileUploadProps) {
    
    const FileType = value?.split(".").pop();
    if(value && FileType !== 'pdf'){
        return <div className='relative h-20 w-20'>
            <Image  src={value} alt='upload' className='rounded-full ' width={60}  height={60}>
            </Image>
            <button type="button" onClick={()=>onChange("")}>
                <X className='h-4 w-4' />
            </button>
        </div>
    }
  return (
    <UploadDropzone endpoint={endpoint} 
        onClientUploadComplete={
            (res : any)=>{
                console.log(res);
                onChange(res[0].url);
            }
        }
        onUploadError={
            (error : Error)=>{
                console.log(error.message)
                console.log(error.message)
            }
        }
    />
  )
}
