"use client"
 
import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { UserFormValidation } from "@/lib/validations"
import { createUser, checkEmailExists } from "@/lib/actions/patient.actions"
import { FormFieldTypes } from "@/types/supabase.types"

import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"

export default function PatientForm({ className }: { className: string }): JSX.Element {

    const router = useRouter()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [showModal, setShowModal] = useState<boolean>(false)
    const [existingUserId, setExistingUserId] = useState<string | null>(null)
    const [existingUserEmail, setExistingUserEmail] = useState<string | null>(null)

    const form = useForm<z.infer<typeof UserFormValidation>>({
        resolver: zodResolver(UserFormValidation),
        defaultValues: {
        name: "",
        email: "",
        phone: "",
        },
    })
 
  async function onSubmit({name, email, phone} : z.infer<typeof UserFormValidation>) {
    setIsLoading(true);
    try {
        const existingUser = await checkEmailExists(email)

        if(existingUser){
            console.log(`User already exists: ${existingUser.userId}`)
            const userId = existingUser.userId;
            setExistingUserEmail(email)
            setExistingUserId(userId)
            setShowModal(true)
            return
        }

        const newUser  = await createUser({ name, email, phone })

        if(newUser){
            console.log(`User created successfully: ${newUser}`)
            router.push(`/patients/${newUser.userId}/register`)
        }
        else{
            throw new Error("An error occurred. Please try again.")
        }
    }
    catch (error: unknown) {
        console.log(error)
    }
    finally{
        setIsLoading(false)
    }
  }


  const modalExistUser = (): JSX.Element => {
    return(
        <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="bg-white">
            <DialogHeader className="mb-4 space-y-5">
                <DialogTitle className="capitalize">User Exists.</DialogTitle>
                <DialogDescription>
                   
                    The user with email <span className="font-medium"> {existingUserEmail}</span> already exists.
                    Redirect to the user&apos;s profile to schedule an appointment.
                
                </DialogDescription>
            </DialogHeader>
            <Button variant="outline" aria-label="Redirect" className="shad-primary-btn-rt bg-green-400" onClick={() => router.push(`/patients/${existingUserId}/new-appointment`)}>
                Redirect to Schedule
            </Button>
        </DialogContent>
    </Dialog>
    )
  }

    return(
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className={className}>
                    <section className="mb-5 space-y-4 animate-item">
                        <h1 className="header">Hi there</h1>
                        <p className="text-gray-500">Schedule your first appointment.</p>
                    </section>
                    <div className="animate-item">
                        <CustomFormField
                            fieldType={FormFieldTypes.INPUT}
                            control={form.control}
                            name="name"
                            label="Full name"
                            placeholder="Your name"
                            iconSrc="/assets/icons/user.svg"
                            iconAlt="user"
                        />
                    </div>
                    <div className="animate-item">
                        <CustomFormField
                            fieldType={FormFieldTypes.INPUT}
                            control={form.control}
                            name="email"
                            label="Email"
                            placeholder="Your email"
                            iconSrc="/assets/icons/email.svg"
                            iconAlt="email"
                        />

                    </div>
                    <div className="animate-item">
                        <CustomFormField
                            fieldType={FormFieldTypes.PHONE_INPUT}
                            control={form.control}
                            name="phone"
                            label="Phone number"
                            placeholder="Your phone number"
                        />

                    </div>
                    <div className="animate-item">
                        <SubmitButton isLoading={isLoading}>
                            Get Started
                        </SubmitButton>

                    </div>

                </form>
            </Form>
            {modalExistUser()}
        </>
    )
}
