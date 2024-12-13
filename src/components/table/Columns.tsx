"use client";


import Image from "next/image"
import Link from "next/link"

import { ColumnDef } from "@tanstack/react-table"
import { Appointment } from "@/types/supabase.types";

import { formatDateTime } from "@/lib/utils";
import { Doctors } from "@/constants";

import { MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
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
            const doctor = Doctors.find((doctor) => {
                if (Array.isArray(row.original.primaryPhysician)) {
                    return doctor.name === row.original.primaryPhysician[0].name;
                } else if (typeof row.original.primaryPhysician === "object") {
                    return doctor.name === row.original.primaryPhysician.name;
                }
                return doctor.name === row.original.primaryPhysician;
            });
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
                <StatusBadge status={row.original.status || "pending"}/>
            </div>
        )
    },
    {   
        id: "actions",
        header: () => <div className="pl-4">Actions</div>,
        cell: ({ row: { original: data } }) => {
          return (
            <div className="flex gap-2 items-center">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="hover:bg-gray-100">
                            <MoreHorizontal size={20} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" sideOffset={4} className="w-48 bg-white shadow-lg">
                        {data.status === "scheduled" ? (
                            <DropdownMenuItem asChild>
                                <Link href={`/admin/note/${data.appointmentId}`} className="cursor-pointer hover:bg-[#CAF0F8] p-2 rounded">
                                    Medical Note
                                </Link>
                            </DropdownMenuItem>         
                        ) : null}
                        <DropdownMenuItem asChild>
                            <AppointmentModal
                                patient={data.patient}
                                userId={data.userId}
                                appointment={data}
                                type="schedule"
                                title="Schedule"
                                description="Please confirm the following details to schedule the appointment."
                            />
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <AppointmentModal
                                patient={data.patient}
                                userId={data.userId}
                                appointment={data}
                                type="cancel"
                                title="Cancel Appointment"
                                description="Are you sure you want to cancel your appointment?"
                            />
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
          );
        },
      }
];