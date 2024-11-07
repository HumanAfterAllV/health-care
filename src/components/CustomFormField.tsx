"use client";

import React from "react";
import Image from "next/image";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";

import { Input } from "@/components/ui/input"
import { Control } from "react-hook-form";
import { FormFieldTypes } from "./forms/PatientForms";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { E164Number } from "libphonenumber-js/core";

interface CustomProps {
    control: Control<any>,
    fieldType:  FormFieldTypes,
    name: string,
    label? : string,
    placeholder?: string,
    iconSrc?: string,
    iconAlt?: string,
    disabled?: boolean,
    dateFormats?: string,
    showTimeSelect?: boolean,
    children?: React.ReactNode,
    renderSkeleton?: (field: any) => React.ReactNode,
}

const RenderField = ({field, props}: {field: any; props: CustomProps})=> {
    const {fieldType, iconSrc, iconAlt, placeholder} = props;
    switch(fieldType){
        case FormFieldTypes.INPUT:
            return (
                <div className="flex rounded-mb border border-dark-500 bg-dark-400">
                    {iconSrc && (
                        <Image src={iconSrc} alt={iconAlt || 'icon'} height={24} width={24} className="ml-2"/>
                    )}
                    <FormControl>
                        <Input
                            placeholder={placeholder}
                            {...field}
                            className="shad-input border-0"
                        />
                    </FormControl>
                </div>
            )
        case FormFieldTypes.PHONE_INPUT:
            return (
                <FormControl>
                    <PhoneInput 
                        defaultCountry="US" 
                        value={field.value as undefined | E164Number} 
                        international
                        onChange={field.onChange}
                        placeholder={placeholder}
                        className="input-phone"
                    />
                </FormControl>
            )
        default:
            return <Input {...field} {...props} />
    }

}

export default function CustomFormField(props : CustomProps  ) {
    const { control, fieldType, name, label} = props;
    return(
        <FormField
        control={control}
        name={name}
        render={({ field }) => (
        <FormItem className="flex-1">
            {fieldType !== FormFieldTypes.CHECKBOX && label &&(
                <FormLabel className="shad-input-label">{label}</FormLabel>
            )}
            <RenderField field={field} props={props} />
            <FormMessage className="shad-error" />
        </FormItem> 
        )}
    />
    )
}