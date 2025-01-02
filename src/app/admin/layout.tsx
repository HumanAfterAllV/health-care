"use client";

import Link from "next/link";
import { ReactNode, useState, useEffect } from "react";
import { usePathname } from "next/navigation"

import {Button} from "@/components/ui/button";
import SidebarNav from "@/components/SidebarNav";
import SearchPatient from "@/components/SearchPatient";

export default function Layout({ children }: { children: ReactNode }) {
    
    const pathname = usePathname();
    const [title, setTitle] = useState<string>("Dashboard");

    useEffect(() => {
        const getTitle = () => {
           if (pathname === "/admin") {
                setTitle("Dashboard");
           } else if (pathname.startsWith("/admin/note")) {
                setTitle("Medical Note");
           } else if (pathname.startsWith("/admin/")) {
                setTitle("Patient");
           }
        };

        getTitle();
    }, [pathname]);
     
    return (
        <section className="flex min-h-screen ">
            {/* <SidebarNav /> */}
            <div className="flex-1 mx-5">
                <div className="sticky top-0 z-40 mb-1 flex items-center justify-between p-8 bg-white">
                    <h1 className="text-[32px] font-medium">{title}</h1>
                    <div className="flex flex-row gap-4">
                        <SearchPatient/>
                        <Button 
                        variant="ghost" 
                        className="shad-primary-btn-rt"
                        >
                            <Link href="/admin">
                                Dashboard
                            </Link>
                        </Button>
                        <Button 
                            variant="ghost" 
                            className="shad-primary-btn-rt"
                        >
                            <Link href="/">
                                Back to Home
                            </Link>
                        </Button>
                    </div>
                </div>
                {children}
            </div>
        </section>
    )
}