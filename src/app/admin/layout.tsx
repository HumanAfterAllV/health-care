import Link from "next/link";
import { ReactNode } from "react";

import SidebarNav from "@/components/SidebarNav";
import SearchPatient from "@/components/SearchPatient";

import {Button} from "@/components/ui/button";

import { Plus } from "lucide-react";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen bg-indigo-50">
            <SidebarNav />
            <div className="flex-1 ml-20">
                <div className="sticky top-0 z-10 mb-1 flex items-center justify-between p-8 bg-indigo-50">
                    <h1 className="text-xl font-semibold text-blue-900">Dashboard</h1>
                    <div className="flex flex-row gap-4">
                        <SearchPatient/>
                        <Link href="/admin">
                            <Button 
                            variant="outline" 
                            className="border-[#0865fe] text-[#0865fe] hover:bg-indigo-100"
                            >
                                Dashboard
                            </Button>
                        </Link>
                        <Link href="/">
                            <Button 
                            variant="outline" 
                            className="border-[#0865fe] text-[#0865fe] hover:bg-indigo-100"
                            >
                                Back to Home
                            </Button>
                        </Link>
                        <Button className=" bg-[#0865fe] rounded-2xl text-white">
                            <Plus className="h-5 w-5 mr-2"/>
                            Add Patient
                        </Button>
                    </div>
                </div>
                {children}
            </div>
        </div>
    )
}