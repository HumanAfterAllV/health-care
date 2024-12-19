"use client";

import { useRef } from "react";

import { gsap } from "gsap";
import { useGSAP } from '@gsap/react';

import { Button } from "./ui/button";

import Logo from "./Logo";

export default function Header(): JSX.Element {

    const headerRef = useRef<HTMLHeadElement>(null);

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
        <header ref={headerRef} className="fixed top-0 left-0 w-full z-50 bg-transparent text-blue-900">
            <div className="container mx-auto px-4 py-6">
                <nav className="flex items-center justify-between">
                    <Logo />
                    <div className="">
                        <Button variant="ghost" size="lg" className="hover">
                            Contact
                        </Button>
                        <Button variant="ghost" size="lg">
                            About
                        </Button>
                        <Button variant="ghost" size="lg">
                            Terms
                        </Button>
                    </div>
                </nav>
            </div>
        </header>
    )
}