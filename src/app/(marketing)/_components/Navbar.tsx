"use client"
import { Button } from '@/components/ui/button'
import { SignInButton, SignUp, SignUpButton, UserButton, useUser } from '@clerk/nextjs';
import { Arrow } from '@radix-ui/react-dropdown-menu';
import { ArrowRight, Bird, TvIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import Loader from './Loader';
import { AvatarIcon } from '@radix-ui/react-icons';
import { ModeToggle } from '@/app/_components/ModeToggle';
import Link from 'next/link';

export default function Navbar() {
    const { isLoaded, isSignedIn } = useUser();
  return (
    <div className="w-full flex p-3 items-center justify-between">
      <Link href={'/'} className="flex space-x-2 items-center">
        {/* <Image /> */}
        <Bird className="w-8 h-8" />
        <span className="font-bold text-2xl">LYNK</span>
      </Link>
      {
        <div className="flex items-center space-x-3">
          {!isLoaded && <Loader />}
          {!isSignedIn && isLoaded && (
            <div>
              <Button className="font-bold" variant={"outline"}>
                <SignInButton mode="modal">Login</SignInButton>
              </Button>
              <Button className="font-bold items-center" asChild>
                <SignUpButton mode="modal">
                  <span>
                    Get Free <ArrowRight className="w-4 h-4" />
                  </span>
                </SignUpButton>
              </Button>
            </div>
          )}
          {isSignedIn && isLoaded && (
            <div className="flex items-center space-x-3">
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: "w-10 h-10", // Custom width and height
                  },
                }}
              />
              <Link href={'/home'}>
                <Button className="font-bold items-center space-x-1">
                    <span>Enter LYNK </span>
                    <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          )}
          <ModeToggle/>
        </div>
      }
    </div>
  );
}
