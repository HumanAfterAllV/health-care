"use client"

import { useRef } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"

interface MarqueeProps {
    text: string;
    className?: string;
    speed: number;
}

export default function Marquee({
    text,
    className = "",
    speed = 50
}: MarqueeProps): JSX.Element {

    const marqueeRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const marquee = marqueeRef.current;
        const content = contentRef.current;

        if (!marquee || !content) return;

        const contentWidth = content.offsetWidth;
        const amountToFill = Math.ceil(window.innerWidth / contentWidth) + 1;

        for(let i = 0; i < amountToFill; i++) {
            const clone = content.cloneNode(true) as HTMLDivElement;
            marquee.appendChild(clone);
        }

        const tl = gsap.timeline({ repeat: -1 });

        tl.to(marquee, {
            x: -contentWidth , 
            duration: contentWidth / speed,  
            ease: "none", 
            modifiers: {
                x: gsap.utils.unitize(
                    (x) => parseFloat(x) % contentWidth
                )
            }
        });

        return () => {
            tl.kill();
        }
    },[])

    return(
        <div className="overflow-hidden w-full h-24">
            <div ref={marqueeRef} className="flex whitespace-nowrap">
                <div ref={contentRef} className={`inline-block py-5 ${className}`}>
                    <p className="text-4xl text-dark-800 font-bold px-6"> {text}</p>
                </div>
            </div>
        </div>
    )
}