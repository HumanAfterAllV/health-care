"use client"

// External modules
import { useLayoutEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ShieldPlus } from "lucide-react";

// Internal modules
import { Doctors } from "@/constants";
import { initLenis, cleanupLenis } from "@/lib/lenis";
import { useAnimationsGSAP } from "@/hooks/useAnimationsGSAP";

//Internal Components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
interface CardsItems {
    icon?: Icon;
    img?: string;
    title?: string;
    number?: string;
    description?: string;
    cardColor?: string;
    textColor?: string;
}

export default function Page(): JSX.Element {

    const { elementRef: cardsRecordElements } = useAnimationsGSAP("CardsRecordAppear")
    const { elementRef: appearLeftElements } = useAnimationsGSAP("AppearLeft")
    const { elementsRef: appearRightElements } = useAnimationsGSAP("AppearRight")
    const { elementsRef: appearBottomElements } = useAnimationsGSAP("AppearBottom")
    const { elementsRef: appearTopElements } = useAnimationsGSAP("AppearTop")

    useLayoutEffect(() => {
        initLenis();
        return () => {
            cleanupLenis();
        }        
    },[])

    const cardsItemsSec1: CardsItems[] = [
        {
            img: "/assets/images/doctor-tablet.jpg", 
            number: "001", 
            title: "Schedule && Manage Appointments", 
            description: "Schedule appointments with your primary physician or any other specialist.", 
            textColor: "text-black-800",
        },
        {
            img: "/assets/images/gastroenterology.jpg",
            number: "002",
            title: "View Medical Records",
            description: "View your medical records, prescriptions, and lab results.",
            textColor: "text-black-800",
        }
    ];

    const cardsItemsSec2 : CardsItems[] = [
        {
            title: "Simplifying healthcare processes for patients",
            description: "View More",
            cardColor: "bg-dark-800",
            icon: ArrowUpRight,
            textColor: "text-white"
        },
        {
            title: "Clear and concise instructions for every step of care",
            description: "View More",
            cardColor: "bg-yellow-500",
            icon: ArrowUpRight,
            textColor: "text-black-800"
        },
    ];

    const cardsItemsSec3: CardsItems[] = [
        {
            title: "Schedule && Manage Appointments",
            icon: ArrowUpRight
        },
        {
            title: "View Medical Records",
            icon: ArrowUpRight
        },
        {
            title: "View Medical Records",
            icon: ArrowUpRight
        }
    ];
    
    return(
        <div className="relative h-screen bg-white">
            <Header />
            <Hero />
            <section className="grid grid-rows-[1fr_1fr_1fr] w-full h-full px-10 gap-3">
                <div className="relative flex items-end justify-center w-full h-full pb-5">
                    <h1 className="font-medium text-[32px] lg:text-[64px]">System of our record</h1>
                </div>
                {cardsItemsSec1.map((item, index) => (
                    <Card ref={cardsRecordElements} key={index} className="cards-record w-full h-full bg-gray-200 rounded-3xl shadow-none">
                        <div className="grid grid-cols-3 w-full h-full lg:grid-cols-[1fr_1fr_1fr_450px]">
                            <div className="flex items-center justify-center w-full h-full pl-3 object-cover">
                                <Image 
                                    src={item.img!} 
                                    alt="doctor"
                                    width={450}
                                    height={250}
                                    className="rounded-3xl"
                                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                                />
                            </div>
                            <div className="hidden lg:flex lg:items-center justify-center w-full h-full text-xl font-medium">
                                {item.number}
                            </div>
                            <div className="flex items-center justify-center w-full h-full px-5 text-lg font-medium">
                                {item.title}
                            </div>
                            <Card className="flex flex-row h-full w-full shadow-none rounded-3xl">
                                <div className="hidden md:flex md:items-center md:justify-center w-full h-full text-sm font-medium text-center">
                                    {item.description}
                                </div>
                                <div className="flex items-center justify-center w-full h-full">
                                    <Button className="w-full h-full" variant="ghost" aria-label="View More">
                                        <Link href="/patients" className="flex flex-row">
                                            View More
                                            <ArrowUpRight className="h-6 w-6" />
                                        </Link>
                                    </Button>
                                </div>
                            </Card>
                        </div>
                    </Card>
                ))}
            </section>
            <section className="grid grid-rows-[200px_1fr] w-full h-full px-10 gap-3 lg:grid-rows-[255px_1fr] ">
                <div className="flex items-end justify-center w-full h-full pb-5">
                    <h1 className="font-medium text-[32px] lg:text-[64px]">Patients need to know</h1>
                </div>
                <div className="grid grid-cols-1 w-full h-full gap-3 lg:grid-cols-2">
                    <div className="grid grid-rows-2 w-full h-full gap-3">
                        <Card ref={(el) => { if (el) appearRightElements.current[0] = el; }} className="relative flex items-center justify-center w-full h-full border-none shadow-none rounded-3xl">
                            <video
                                autoPlay
                                loop
                                muted
                                className="absolute w-full h-full object-cover rounded-3xl"
                            >
                                <source src="/assets/video/doctor-page2.mp4"/>
                            </video>
                        </Card>
                        <Card ref={(el) => { if (el) appearRightElements.current[1] = el; }} className="cards-record2 flex flex-col justify-between text-dark-800 shadow-none bg-yellow-500">
                            <CardHeader className="flex flex-row items-end justify-between w-full">
                                <Button className="shad-primary-btn-rt" aria-label="Schedule Appointment">
                                    <Link href="/patients">
                                        Schedule
                                    </Link>
                                </Button>
                                <div className="flex flex-row">
                                    {Doctors.map((doctor, index) => (
                                        index <= 2 && (
                                            <Image
                                                key={index}
                                                src={doctor.image}
                                                alt={doctor.name}
                                                width={35}
                                                height={35}
                                                className="rounded-full"
                                            />
                                        )
                                    ))}
                                </div>
                            </CardHeader>
                            <CardContent>
                                <h1 className="font-medium text-2xl pb-2">1499 patients</h1>
                                <p className="font-light">
                                    Our team of highly skilled doctors is dedicated to providing exceptional care. 
                                    With over 90% of our doctors holding advanced certifications in their respective fields, 
                                    you can trust that you&apos;re in the best hands.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="hidden w-full h-full lg:block">
                        <Card ref={appearLeftElements} className="flex flex-col justify-between shadow-none h-full bg-purple-600">
                            <CardHeader className="flex items-end justify-end w-full">
                                <h1 className="font-medium text-3xl text-white">Comprehensive support for all your medical questions.</h1>
                            </CardHeader>
                            <CardContent className="relative text-white flex justify-between items-center">
                                <ShieldPlus className="h-24 w-24"/>
                                    <div className="absolute top-0 left-0 flex items-end justify-center w-full h-full">
                                        <Image
                                            src="/assets/images/test-hero.png"
                                            alt="Doctor"
                                            width={600}
                                            height={500}
                                        />
                                    </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
            <section className="grid grid-rows-3 w-full h-full gap-3 px-10">
                <div className="flex items-end justify-center w-full h-full pb-5">
                    <h1 className="font-medium text-[32px] lg:text-[64px]">Guide for the patients</h1>
                </div>
                <div className="grid grid-cols-1 w-full h-full gap-3 lg:grid-cols-2">
                    <div 
                        ref={(el) => { if (el) appearRightElements.current[2] = el; }}
                        className="relative hidden w-full h-full border-none shadow-none rounded-3xl lg:flex items-start justify-center overflow-hidden"
                    >
                        <Image
                            src="/assets/images/doctors-page.jpg"
                            alt="Doctors page"
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 0vw, 100vw"
                            priority
                            quality={90}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        {cardsItemsSec2.map((item, index) => (
                            <Card ref={(el) => { if (el) appearBottomElements.current[index] = el; }} key={index} className={`flex flex-col items-start justify-between shadow-none rounded-3xl ${item.textColor} ${item.cardColor}`}>
                                <CardHeader>
                                    <h1 className="font-medium text-lg">{item.title}</h1>
                                </CardHeader>
                                <CardContent>
                                    <Button className="w-full h-full" variant="ghost" aria-label="View More">
                                        <Link href="" className="flex flex-row font-medium">
                                            {item.description}
                                            <item.icon className="h-6 w-6" />
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
                <div className="grid grid-cols-1 w-full h-full gap-3 lg:grid-cols-2">
                    <Card ref={(el) => { if (el) appearRightElements.current[3] = el; }} className="hidden flex-col items-start justify-between rounded-3xl border-none text-white bg-purple-600 lg:flex">
                        <CardHeader>
                            <h1 className="font-medium text-lg">Step-by-step guidance <br /> for your healthcare journey.</h1>
                        </CardHeader>
                        <CardContent>
                            We provide a detailed roadmap to ensure you feel confident and informed throughout your healthcare process.
                        </CardContent>
                    </Card>
                    <Card ref={(el) => { if (el) appearTopElements.current[0] = el; }} className="relative w-full h-full shadow-none border-none object-cover rounded-3xl">
                        <video
                            autoPlay
                            loop
                            muted
                            className="absolute w-full h-full object-cover rounded-3xl"
                        >
                            <source src="/assets/video/doctor-page.mp4"/>
                        </video>
                        <div className="absolute top-0 left-0 w-full p-5 rounded-b-3xl">
                            <h1 className="text-white text-lg font-medium">
                                Comprehensive support <br />
                                for all your medical questions.
                            </h1>
                        </div>
                    </Card>
                </div>
            </section>
            <section className="grid grid-rows-[255px_255px] w-full h-[550px] px-10">
                <div className="flex items-end justify-center w-full h-full pb-5">
                    <h1 className="font-medium text-[32px] lg:text-[64px]">Contact Now</h1>
                </div>
                <div className="grid grid-cols-1 w-full h-auto gap-4 lg:grid-cols-3">
                    {cardsItemsSec3.map((item, index) => (
                        <Card ref={cardsRecordElements} key={index} className={`cards-record flex flex-col items-start justify-between shadow-none rounded-3xl ${item.textColor} bg-gray-100`}>
                            <CardHeader className="flex items-end justify-end w-full">
                                <item.icon className="h-6 w-6" />
                            </CardHeader>
                            <CardContent>
                                {item.title}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    )
}