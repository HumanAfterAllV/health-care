import {Home, Calendar, Mail, Users, Settings, LogOut} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip } from './ui/tooltip';
import { Button } from './ui/button';


export default function SidebarNav(): JSX.Element {

    const navItems = [
        {icon: Home, label: 'Dashboard', href: '/', active: true},
        {icon: Calendar, label: 'Appointments', href: '', active: false},
        {icon: Mail, label: 'Messages', href: '', active: false},
        {icon: Users, label: 'Patients', href: '', active: false},
        {icon: Settings, label: 'Settings', href: '', active: false},
    ];

    return (
        <nav className="fixed flex flex-col h-[calc(100%-16px)] w-[72px] items-center gap-4 bg-indigo-600 py-4 rounded-2xl m-2 mb-4">
            {navItems.map((item,index) => (
            <Button
                key={index}
                variant="ghost"
                size="icon"
                className={cn(
                "h-10 w-10 text-white hover:bg-indigo-500",
                item.active && "bg-indigo-500"
                )}
            >
                <item.icon className="h-5 w-5"/>

            </Button>
            ))}
            <Button
            variant="ghost"
            size="icon"
            className="mt-auto text-white hover:bg-indigo-500"
            >
                <LogOut className="h-5 w-5"/>
            </Button>
        </nav>
    )
}