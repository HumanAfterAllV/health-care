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
import { E164Number } from "libphonenumber-js/core";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Select, SelectContent, SelectTrigger } from "./ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";

interface CustomProps {
    control: Control<any>,
    fieldType:  FormFieldTypes,
    name: string,
    label? : string,
    placeholder?: string,
    iconSrc?: string,
    iconAlt?: string,
    disabled?: boolean,
    dateFormat?: string,
    showTimeSelect?: boolean,
    children?: React.ReactNode,
    renderSkeleton?: (field: any) => React.ReactNode,
}

const RenderField = ({field, props}: {field: any; props: CustomProps})=> {
    const {fieldType, iconSrc, iconAlt, placeholder, showTimeSelect, dateFormat, renderSkeleton, disabled} = props;
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
        case FormFieldTypes.DATE_PICKER:
            return (
                <div className="flex rounded-md border border-dark-500 bg-dark-400">
                    <Image src="/assets/icons/calendar.svg" height={24} width={24} alt="calendar" className="ml-2"/>
                    <FormControl>
                        <DatePicker
                            selected={field.value}
                            onChange={(date) => field.onChange(date)}
                            dateFormat={dateFormat ?? "MM/dd/yyyy"}
                            showDateSelect={showTimeSelect ?? false}
                            timeInputLabel="Time:"
                            wrapperClassName="date-picker"
                        />
                    </FormControl>
                </div>
            )
        case FormFieldTypes.SELECT:
            return(
                <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl className="shad-select-trigger">
                            <SelectTrigger>
                                <SelectValue placeholder={placeholder}/>
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent className="shad-select-content">
                            {props.children}
                        </SelectContent>
                    </Select>
                </FormControl>
            )
        case FormFieldTypes.TEXTAREA:
            return(
                <FormControl>
                    <Textarea
                        placeholder={placeholder}
                        {...field}
                        className="shad-textArea"
                        disabled={disabled}
                    />
                </FormControl>
            )
        case FormFieldTypes.CHECKBOX:
            return(
                <FormControl>
                    <div className="flex items-center gap-4">
                        <Checkbox
                            id={props.name}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                        <label htmlFor={field.name} className="checkbox-label">
                            {props.label}
                        </label>
                    </div>
                </FormControl>
            )
        case FormFieldTypes.SKELETON:
            return renderSkeleton ? renderSkeleton(field) : null
        default:
            return null
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