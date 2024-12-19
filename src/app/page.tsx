"use client"

import { ForwardRefExoticComponent, RefAttributes, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { CalendarCheck2, ShieldPlus, PillBottle, Check, House } from "lucide-react";
import { LucideProps } from "lucide-react";

import { initLenis, cleanupLenis } from "@/lib/lenis";

import Header from "@/components/Header"
import ContentTransition from "@/components/ContentTransition";


interface CardsItems {
    icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
    title: string;
    description: string;
    cardColor?: string;
}

export default function Page(): JSX.Element {

    useEffect(() => {
        initLenis();
        return () => {
            cleanupLenis();
        }
        
    },[])


    const cardsItems: CardsItems[] = [
        {
            icon: House,
            title: "Home",
            description: 
                "Receive personalized medical care in the comfort of your home. Our professional doctors ensure quality service tailored to your needs.",
            cardColor: "bg-green-500"
        },
        {
            icon: CalendarCheck2,
            title: "Schedule",
            description: 
                "Easily schedule your medical appointments at a time that suits you best. Connect with experienced doctors ready to assist you.",
            cardColor: "bg-purple-500"
        },
        {
            icon: ShieldPlus,
            title: "Secure",
            description: 
                "We prioritize your safety and privacy. Experience secure medical consultations with certified professionals who value your trust.",
            cardColor: "bg-orange-500"
        },
        {
            icon: PillBottle,
            title: "Medication",
            description: 
                "Access prescribed medications directly from our trusted doctors. Simplify your treatment process with expert guidance at every step.",
            cardColor: "bg-pink-500"
        },
    ];

        
    return(
        <div className="h-screen bg-white relative">
            <Header />
            <video
                autoPlay
                loop
                muted
                className="absolute top-0 left-0 w-full h-full object-cover -z-1" 
            >
                <source src="/assets/video/doctor-page2.mp4"  type="video/mp4"/>
            </video>

            <div className="flex items-center justify-start w-full h-full pl-12 relative">
                <Card className="border-none shadow-sm bg-white w-[450px] h-[350px] text-blue-900">
                    <CardHeader>
                        <h1 className="font-bold text-[32px]">Your health, just a click away.</h1>
                        <p className="font-normal text-[24px]">We care for you from the very first contact.</p>
                    </CardHeader>
                    <CardContent>
                        <Link href="/patients">
                            <Button className="shad-primary-btn mt-8 rounded-none">
                                Schedule
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>

            {/* SEC2 */}

            <div className="flex items-center justify-center w-screen h-full">

                <div className="grid grid-cols-3 h-[450px] gap-6 pl-12 text-blue-900">
                    <div className="flex flex-col items-start justify-start w-full h-full gap-3">
                       
                        <p className="text-[60px] text-blue-900">
                            We work with a highly qualified team in <br />
                            <span className="font-bold">various specialties.</span>
                        </p>


                    </div>
                    <div className="relative w-full h-full">
                        <video
                            autoPlay
                            loop
                            muted
                            className="absolute rounded-br-[100px] rounded-2xl top-0 left-0 w-full h-full object-cover" 
                        >
                            <source src="/assets/video/human.mp4" type="video/mp4"/>
                        </video>
                    </div>
                    <div className="flex flex-col items-center justify-center w-full h-full pl-5 gap-3">
                        <p className="text-sm font-bold">Why choose us? </p>
                        <p className="text-[16px] font-light text-gray-500 pt-5">
                            Our team of highly qualified professionals spans a wide range of medical specialties, <br />
                            ensuring you receive the expert care you deserve, tailored to your unique needs.
                        </p>
                    </div>
                </div>
            </div>

            {/* SEC3 */}
            <ContentTransition />

            {/* SEC4 */}
            <div className="w-full h-full flex items-center justify-center">
                 
            </div>
        </div>
    )
}