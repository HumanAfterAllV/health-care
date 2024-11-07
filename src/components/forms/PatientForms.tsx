"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { UserFormValidation } from "@/lib/validations"
import { createUser } from "@/lib/actions/patient.actions"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"



export enum FormFieldTypes {
    INPUT="input",
    TEXTAREA="textarea",
    PHONE_INPUT="phoneInput",
    CHECKBOX="checkbox",
    DATE_PICKER= "datePicker",
    SELECT=  "select",
    SKELETON= "skeleton",
}
 
 
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
        const userData = {name, email, phone}

        const user  = await createUser(userData)

        if(user){
            console.log(`User created successfully: ${user}`)
            router.push(`/patients/${user.userId}/register`)
        }
        else{
            throw new Error("An error occurred. Please try again.")
        }
    }
    catch (error) {
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
                    <p className="text-dark-700">Schedule your first appointment.</p>
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
