"use client";


import Image from "next/image"
import Link from "next/link"

import { ColumnDef } from "@tanstack/react-table"
import { Appointment } from "@/types/supabase.types";

import { formatDateTime } from "@/lib/utils";
import { Doctors } from "@/constants";

import { Notebook } from "lucide-react";
import { Button } from "../ui/button";

import StatusBadge from "../StatusBadge";
import AppointmentModal from "../AppointmentModal";

export const columns: ColumnDef<Appointment>[] = [
    {
        accessorKey: "patient",
        header: "Patient",
        cell: ({ row }) => <p>{String(row.original.patient)}</p>
    },
    {
        accessorKey: "schedule",
        header: "Appointment",
        cell: ({ row }) => <p>{formatDateTime(row.original.schedule).dateTime}</p>
    },
    {
        accessorKey: "reason",
        header: "Reason",
        cell: ({ row }) => <p>{row.original.reason}</p>
    },
    {
        accessorKey: "primaryPhysician",
        header: "Doctor",
        cell : ({ row }) => {
            const doctor = Doctors.find((doctor) => doctor.name === row.original.primaryPhysician.name);

            return (
                <div className="flex items-center gap-3">
                    <Image
                        src={doctor?.image || "/default-doctor-image.png"}
                        alt="Doctor"
                        width={100}
                        height={100}
                        className="size-8"
                    />
                    <p>Dr. {doctor?.name}</p>
                </div>
            )
        }
    },
        {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            <div className="min-w-[115px]">
                <StatusBadge status={row.original.status}/>
            </div>
        )
    },
    {
        id: "actions",
        header: () => <div className="pl-4">Actions</div>,
        cell: ({ row : { original: data} }) => {
            return(
                <div className="flex gap-2 items-center">
                    <AppointmentModal 
                        patient={data.patient}
                        userId={data.userId}
                        appointment={data}
                        type="schedule"
                        title="Schedule"
                        description="Please confirm the following details to schedule the appointment."                        
                    />
                    {data.status === "scheduled" && (
                        <Link className="" href={`/admin/note/${data.appointmentId}`}>
                            <Button variant="outline" size="sm" className="hover:bg-gray-100">
                                <Notebook size={16} />
                            </Button>
                        </Link>
                    )}
                    <AppointmentModal
                        patient={data.patient}
                        userId={data.userId}
                        appointment={data}
                        type="cancel"
                        title="Cancel Appointment"
                        description="Are you sure you want to cancel your appointment?"
                    />
                </div>
            )
        },
    },
];