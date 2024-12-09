import Link from "next/link";

import { getRecentAppointments } from "@/lib/actions/appointment.actions";

import { columns } from "@/components/table/Columns";
import StatCard from "@/components/StatCard";
import DataTable from "@/components/table/DataTable";

import { Button } from "@/components/ui/button";
import SearchPatient from "@/components/SearchPatient";
import WelcomeBanner from "@/components/WelcomeBanner";
import Calendar from "@/components/Calendar";
import { Plus } from "lucide-react";


export default function Page() : JSX.Element {
    return (
        <div className="flex-1 p-8 ml-20">
            <div className="mb-8 flex items-center justify-between">
                <h1 className="text-xl font-semibold">Dashboard</h1>
                <div className="flex flex-row gap-4">
                    <SearchPatient/>
                    <Button className=" bg-indigo-600 rounded-2xl text-white">
                        <Plus className="h-5 w-5 mr-2"/>
                        Add Patient
                    </Button>
                </div>
            </div>
            <div className="grid gap-8">
                <WelcomeBanner/>
                <div className="grid grid-cols-[2fr_1fr] gap-8">
                    <div className="space-y-8">
                        <StatCard/>
                    </div>
                    <div className="">
                        <Calendar/>
                    </div>
                </div>
            </div>
                <div className="overflow-x-auto pt-10">
                    <DataTable />
                </div>
        </div>
    );
}
