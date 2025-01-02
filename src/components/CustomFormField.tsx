"use client";

import React from "react";
import Image from "next/image";
import { Control } from "react-hook-form";
import { E164Number } from "libphonenumber-js/core";

import "react-datepicker/dist/react-datepicker.css";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import DatePicker from "react-datepicker";

import { FormFieldTypes } from "@/types/supabase.types";

import {
FormControl,
FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";


export type CustomProps = {
    control: Control<any>,
    fieldType:  FormFieldTypes,
    name: string,
    label? : string,
    placeholder?: string,
    value?: string,
    iconSrc?: string,
    icon?: Icon,
    iconAlt?: string,
    disabled?: boolean,
    dateFormat?: string,
    showTimeSelect?: boolean,
    children?: React.ReactNode,
    onChange?: (e) => void;
    renderSkeleton?: (field) => React.ReactNode,
}

const RenderField = ({field, props}: {field; props: CustomProps})=> {
    const {fieldType, iconSrc, iconAlt, icon,placeholder, showTimeSelect, dateFormat, renderSkeleton, disabled} = props;
    switch(fieldType){
        case FormFieldTypes.INPUT:
            return (
                <div className="flex border-[1px] items-center border-gray-400 rounded-lg">
                    {iconSrc && (
                        <Image src={iconSrc} alt={iconAlt || 'icon'} height={24} width={24} className="ml-2"/>
                    )}
                    {icon && 
                        React.createElement(icon, { className: "h-6 w-6 ml-2 text-gray-400" })
                    }
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
                <div className="flex rounded-lg border border-gray-400">
                    <Image src="/assets/icons/calendar.svg" height={24} width={24} alt="calendar" className="ml-2"/>
                    <FormControl>
                        <DatePicker
                            selected={field.value}
                            onChange={(date: Date | null) => field.onChange(date)}
                            dateFormat={dateFormat ?? "MM/dd/yyyy"}
                            showTimeSelect={showTimeSelect ?? false}
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