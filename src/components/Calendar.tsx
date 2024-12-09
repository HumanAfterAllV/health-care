"use client";
import { useState } from "react"
import { Calendar as Calen } from "@/components/ui/calendar"

export default function Calendar(): JSX.Element {
    const [date, setDate] = useState<Date | undefined>(new Date())
    return (
        <Calen
            mode="single"
            selected={date}
            onSelect={(day) => setDate(day ?? undefined)}
            className="rounded-2xl border bg-white"
        />
    )
}
