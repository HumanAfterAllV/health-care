"use client"
 
import { useState } from "react"
import { useRouter } from "next/navigation"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Form } from "@/components/ui/form"

import { UserFormValidation } from "@/lib/validations"
import { createUser, checkEmailExists } from "@/lib/actions/patient.actions"

import { FormFieldTypes } from "@/types/supabase.types"

import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"


export default function PatientForm(): JSX.Element {
    const router = useRouter()

    const [isLoading, setIsLoading] = useState<boolean>(false)

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
            alert("User already exists. Redirecting to appointment page.")
            router.push(`/patients/${existingUser.userId}/new-appointment`)
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
    return(
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
                <section className="mb-12 space-y-4">
                    <h1 className="header">Hi there</h1>
                    <p className="text-gray-500">Schedule your first appointment.</p>
                </section>
                <CustomFormField
                    fieldType={FormFieldTypes.INPUT}
                    control={form.control}
                    name="name"
                    label="Full name"
                    placeholder="Your name"
                    iconSrc="/assets/icons/user.svg"
                    iconAlt="user"
                />
                <CustomFormField
                    fieldType={FormFieldTypes.INPUT}
                    control={form.control}
                    name="email"
                    label="Email"
                    placeholder="Your email"
                    iconSrc="/assets/icons/email.svg"
                    iconAlt="email"
                />
                <CustomFormField
                    fieldType={FormFieldTypes.PHONE_INPUT}
                    control={form.control}
                    name="phone"
                    label="Phone number"
                    placeholder="Your phone number"
                />

                <SubmitButton isLoading={isLoading}>
                    Get Started
                </SubmitButton>
            </form>
      </Form>
    )
}
