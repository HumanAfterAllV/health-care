"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { gsap } from "gsap/gsap-core"

import { useAnimationsGSAP } from "@/hooks/useAnimationsGSAP"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Hero(): JSX.Element {

    const {elementRef} = useAnimationsGSAP("HeroAppear");

    const textRef1 = useRef<HTMLDivElement>(null);
    const textRef2 = useRef<HTMLDivElement>(null);
    const textRef3 = useRef<HTMLDivElement>(null);
    const textRef4 = useRef<HTMLDivElement>(null);

    const [textDefault, setTextDefault] = useState<Record<string,string>>({
        text1: "We care for you from the very first contact ensuring you receive the best medical care.",
        text2: "Care team assignment and scheduling based on patient needs.",
        text3: "Online or in-person consultations, you choose how to care for your health.",
        text4: "+1485 patients 15 specialties"
    });

    const cards = [
        {
            title: "High quality appointments", 
            text1: "Set up your appointments in minutes and let us handle the rest. Our platform ensures that you’re always in the right place at the right time.", 
            text2: "Effortlessly book your next appointment today",
            text3: "Never miss an appointment again. With our intuitive platform, you can manage, reschedule, and even get reminders for all your bookings. Whether you're meeting a specialist or organizing your week, we've got you covered. Your time is valuable—let us help you make the most of it.",
            text4: "Get the most out of your day with our appointment management features.."
        },
/*         {
            title: "Schedule in advance",
            text1: "Our online scheduling system ensures you find the perfect time for your appointment. No more back-and-forth emails or long waits—just simple, seamless scheduling",
            text2: "Scheduling has never been this easy—book your slot with just a few clicks.",
            text3: "We care for you from the very first contact ensuring you receive the best medical care.",
            text4: "Your schedule, simplified—manage it all in one place."

        }, */
        {
            title: "Design your own care plan",
            text1: "Whether you need one-time bookings or recurring appointments, we offer flexible plans tailored to your needs. Choose the option that works for your schedule.",
            text2: "Find the plan that suits you best—it’s your choice.",
            text3: "Personalize your experience with our 'Choose Your Own Plan' feature. From flexible payment options to tailored scheduling, we make it easy for you to find the perfect plan that fits your lifestyle and needs.",
            text4: "Tailor your experience—choose the plan that works best for you."
        }
    ];

    const handleHover = (cardIndex: number) => {
        console.log('Hover en card:', cardIndex)
        const selectedCard = cards[cardIndex];
        
        gsap.to([textRef1.current, textRef2.current, textRef3.current, textRef4.current], {
            opacity: 0,
            y:0,
            ease: "power2.in",
            duration: 0.5,
            onComplete: () => {
                setTextDefault({
                    text1: selectedCard.text1,
                    text2: selectedCard.text2,
                    text3: selectedCard.text3,
                    text4: selectedCard.text4,
                })
                gsap.to([textRef1.current, textRef2.current, textRef3.current, textRef4.current], {
                    opacity: 1,
                    ease: "power2.in",
                    duration: 0.5
                })
            }
        })
    }

    const handleHoverExit = () => {
        gsap.to([textRef1.current, textRef2.current, textRef3.current, textRef4.current], {
            opacity: 0,
            y:20,
            ease: "power2.inOut",
            duration: 0.5,
            onComplete: () => {
                setTextDefault({
                    text1: "We care for you from the very first contact ensuring you receive the best medical care.",
                    text2: "Care team assignment and scheduling based on patient needs.",
                    text3: "Online or in-person consultations, you choose how to care for your health.",
                    text4: "+1485 patients 15 specialties"
                })
                gsap.to([textRef1.current, textRef2.current, textRef3.current, textRef4.current], {
                    opacity: 1,
                    y:20,
                    ease: "power2.inOut",
                    duration: 0.5,
                })
            }
        })
    }
    return (
        <section ref={elementRef} className="relative grid grid-rows-[1fr_500px] w-full h-full px-10 text-dark-800">
            <div className="hero-text flex flex-col items-center justify-center w-full h-full pt-16">
                <h1 className="font-medium text-[128px] text-center">Health Solution</h1>
            </div>
            <div className="flex flex-col items-center text-[28px] font-normal md:flex sm:flex xl2:hidden text-center pt-10 gap-8">
                <p>We provide a detailed roadmap to ensure you feel confident and informed throughout your healthcare process.</p>
                <Button className="shad-primary-btn-rt bg-green-400 ">
                    <Link href="/patients">
                        schedule an appointment
                    </Link>
                </Button>
            </div>
            <Card className="hidden grid-cols-1 rounded-3xl border-none shadow-none bg-purple-600 lg:grid-cols-[1fr_400px_1fr] lg:grid less-than-xl2:hidden">
                <div className="flex-col items-center justify-between w-full h-full pl-10 text-white py-5 hidden lg:flex">
                    <div >
                        <p ref={textRef1} className="text-[14px]">
                            {textDefault.text1}
                        </p>
                    </div>
                    <div>
                        <p ref={textRef2} className="font-medium text-[24px]">
                            {textDefault.text2}
                        </p>
                    </div>
                    <Card
                        className="flex items-center justify-center w-[400px] h-[100px] shadow-none border-none rounded-3xl bg-dark-800 z-10 transition-colors duration-300 hover:bg-white hover:text-dark-800"
                        onMouseEnter={() => handleHover(0)}
                        onMouseLeave={handleHoverExit}
                    >
                        <p className="font-semibold text-center text-[18px]">
                            {cards[0].title}
                        </p>
                    </Card>
                </div>
                <div className="absolute inset-0 top-24 flex items-center justify-center w-full h-full">
                    <Image
                        src="/assets/images/doctor-hero.png"
                        alt="Doctor"
                        width={600}
                        height={500}
                        priority={true}
                    />
                </div>
                <div className="flex flex-col items-center justify-end py-5 text-white">
                    <Card
                        className="absolute items-center justify-center w-[400px] h-[100px] shadow-none border-none rounded-3xl bg-dark-800 z-10 transition-colors duration-300 hover:bg-white hover:text-dark-800 sm:flex lg:hidden"
                    >
                        <Link href="/patients">
                            schedule an appointment
                        </Link>
                    </Card>
                </div>
                <div className="flex-col items-center justify-between w-full h-full pl-10 py-5 text-white hidden lg:flex">
                    <div className="text-[14px]">
                        <p ref={textRef3}>
                            {textDefault.text3}
                        </p>
                    </div>
                    <div className="font-medium text-[24px]">
                        <p ref={textRef4}>
                            {textDefault.text4}
                        </p>
                    </div>
                    <Card
                        className="flex items-center justify-center w-[400px] h-[100px] shadow-none border-none rounded-3xl bg-dark-800 z-10 transition-colors duration-300 hover:bg-white hover:text-dark-800"
                        onMouseEnter={() => handleHover(1)}
                        onMouseLeave={handleHoverExit}
                    >
                        <p className="font-semibold text-center text-[18px]">
                            {cards[1].title}
                        </p>
                    </Card>
                </div>
            </Card>
            <div className="hidden md:flex">

            </div>
        </section>
    )
}