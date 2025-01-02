"use client";

import { useRef, useState } from "react";
import Link from "next/link";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {  Activity, Home, Hospital, Menu, X } from 'lucide-react';
import { useAnimationsGSAP } from "@/hooks/useAnimationsGSAP";

interface NavItems {
    title: string;
    link: string;
    icon?: Icon;
}

export default function Header(): JSX.Element {

    const headerRef = useRef<HTMLHeadElement>(null);
    
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const {elementRef: headerAppear } = useAnimationsGSAP("HeaderAppear");
    
    
    const navItems: NavItems[] = [
        {title: "Schedule", link: "/patients", icon: Home},
        {title: "Services", link: "/", icon: Activity},
        {title: "About", link: "/", icon: Hospital}
    ];

    useGSAP(() => {
        const header = headerRef.current;

        let lastScrollY = 0;
    
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
    
            if (currentScrollY > lastScrollY) {
                gsap.to(header, { y: "-100%", duration: 0.2, ease: "power1.inOut" });
            } 
            else {
                gsap.to(header, { y: "0%", duration: 0.2, ease: "power1.inOut" });
            }
    
            lastScrollY = currentScrollY;
        };
          
        window.addEventListener("scroll", handleScroll);
    
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);


    return(
        <header ref={headerRef} className="fixed top-0 left-0 w-full h-16 z-50 bg-white text-dark-800">
            <div ref={headerAppear} className="container flex justify-between items-center mx-auto h-16">
                <div className="flex md:items-center nav-link">
                    <p className="font-medium text-[24px]">HealthSolutions</p>
                </div>
                <nav className="hidden md:flex md:items-center md:space-x-6">
                    {navItems.map((item, index) => (
                        <Link key={index} href={item.link} className="font-medium text-[18px] nav-link">
                            {item.title}
                        </Link>
                    ))}
                </nav>
            </div>
            <div className="md:hidden">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button variant="outline" className="absolute top-0 right-3 float-right shadow-2xl m-5">
                            {isOpen ? (
                                <X className="h-12 w-12"/>
                            ): (
                                <Menu className="h-12 w-12"/>
                            )}
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[300px] bg-white sm:w-[400px]">
                        <SheetHeader className="border-b border-gray-200">
                            <SheetTitle className="text-[28px] font-medium">Menu</SheetTitle>
                            <SheetDescription className="text-[14px]"></SheetDescription>
                        </SheetHeader>
                        <nav className="flex flex-col items-start justify-start space-y-6 py-8 w-full h-full">
                            {navItems.map((item, index) => (
                                <Link key={index} href={item.link} onClick={() => setIsOpen(false)} className="flex flex-row items-center gap-4 font-medium text-[18px] text-dark-800 pb-2">
                                    {item.icon && <item.icon className="h-8 w-8 mr-2"/>}
                                    {item.title}
                                </Link>
                            ))}
                            <Button variant="ghost" size="icon" className="shad-primary-btn-rt w-full bg-green-400">
                                <Link href="/patients">
                                    Get Schedule
                                </Link>
                            </Button>
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    )
};