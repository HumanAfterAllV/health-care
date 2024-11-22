"use client";

import React, { useEffect, useState } from "react"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
  
import { decryptKey, encryptKey } from "@/lib/utils";

  

export default function PasskeyModal(): JSX.Element {
    const router = useRouter()
    const path = usePathname();
    const [open, setOpen]  = useState<boolean>(true)
    const [passkey, setPassKey] = useState<string>("");
    const [error, setError] = useState<string>("");


    const encryptedKey = typeof window !== "undefined" ? window.localStorage.getItem("accessKey") : null;

    useEffect(() => {

        const accesKey = encryptedKey && decryptKey(encryptedKey);

        if(accesKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY){
            setOpen(false)
            router.push("/admin")
            
        }
        else{
            setOpen(true)
            setError("Invalid Passkey. Please try again.")
        }

    },[encryptedKey])
    const closeModal = () => {
        setOpen(false)
        router.push("/")
    }

    const validatePassKey = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if(passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY){
            const encryptedKey = encryptKey(passkey)
            localStorage.setItem("accessKey", encryptedKey)
            setOpen(false)
            router.push("/admin")
            
        }
        else{
            setError("Invalid Passkey. Please try again.")
        }
    }
    return(
        <div>
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent className="shad-alert-dialog">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-start justify-between">
                            Admin Access Verification.
                            <Image
                                src="/assets/icons/close.svg"
                                alt="close"
                                width={20}
                                height={20}
                                onClick={() => closeModal()}
                                className="cursor-pointer"
                            />
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            To access the admin page, please enter the passkey.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div>
                        <InputOTP maxLength={6} value={passkey} onChange={(value) => setPassKey(value)}>
                            <InputOTPGroup className="shad-otp">
                                <InputOTPSlot className="shad-otp-slot" index={0} />
                                <InputOTPSlot className="shad-otp-slot" index={1} />
                                <InputOTPSlot className="shad-otp-slot" index={2} />
                                <InputOTPSlot className="shad-otp-slot" index={3} />
                                <InputOTPSlot className="shad-otp-slot" index={4} />
                                <InputOTPSlot className="shad-otp-slot" index={5} />
                            </InputOTPGroup>
                        </InputOTP>
                        {error && <p className="shad-error text-14regular mt-4 flex justify-center">{error}</p>}
                    </div>
                    <AlertDialogFooter>
                        <AlertDialogAction onClick={(e) => validatePassKey(e)} className="shad-primary-btn w-full">
                            Enter Admin Passkey
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}