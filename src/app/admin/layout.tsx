import SidebarNav from "@/components/SidebarNav";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen bg-indigo-50">
            <SidebarNav />
            {children}
        </div>
    )
}