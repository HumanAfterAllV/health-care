"use client"

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

type AnimationType =  
"FormAppear"
| "SlideLeft" 
| "HeaderAppear" 
| "HeroAppear" 
| "CardsRecordAppear" 
| "AppearLeft" 
| "AppearRight" 
| "AppearBottom" 
| "AppearTop"

gsap.registerPlugin(ScrollTrigger);

export function useAnimationsGSAP( type: AnimationType ) {
    const elementRef = useRef<HTMLDivElement>(null);
    const elementsRef = useRef<HTMLDivElement[]>([]);
    const timelineRef = useRef<GSAPTimeline | null>(null);

    useEffect(() => {
        const element = elementRef.current;
        const elements = elementsRef.current;
        const cards = document.querySelectorAll(".cards-record");        

        if(!element && elements.length === 0) return;

        let animationContext : gsap.Context | null = null;

        switch (type) {
            case "FormAppear":
                animationContext = gsap.context(() => {
                    gsap.from(element, {
                        y: 50,
                        opacity: 0,
                        duration: 0.0,
                        ease: "power3.out",
                    });

                    gsap.from(".animate-item", {
                        y: 50,
                        opacity: 0,
                        duration: 0.5,
                        stagger: 0.1,
                        ease: "power.out",
                        delay: 0.3
                    })
                });
                break;
            case "SlideLeft":
                animationContext = gsap.context(() => {
                    gsap.fromTo(element, {
                        x: 300,
                        opacity: 0,
                    },
                    {
                        x: 0,
                        opacity: 1,
                        duration: 1.5,
                        stagger: 0.1,
                        ease: "power2.out",
                    });
                });
                break;
            case "HeaderAppear":
                animationContext = gsap.context(() => {
                    gsap.from(element, {
                        y: -100,
                        opacity: 0,
                        duration: 1,
                        ease: "power3.out",
                        clearProps: "all"
                    })

                    gsap.from(".nav-link", {
                        y: -20,
                        opacity: 0,
                        stagger: 0.1,
                        duration: 0.8,
                        ease: "power2.out",
                        delay: 0.3
                    })
                })
                break;
            case "HeroAppear":
                animationContext = gsap.context(() => {
                    timelineRef.current = gsap.timeline({
                        defaults: {
                            duration: 1,
                            ease: "power2.out",
                        },
                        delay: 0.5,
                    });

                    timelineRef.current.from(".hero-text", {
                        y: 100,
                        opacity: 0,
                    })
                });
            case "CardsRecordAppear":
                cards.forEach((card, index) => {
                    gsap.fromTo(card,{
                        x: 100,
                        opacity: 0,
                    }, {
                        x: 0,
                        opacity: 1,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top bottom-=100",
                            end: "bottom center",
                            toggleActions: "play none none reverse",
                        },
                        delay: index * 0.2,
                    })
                })
                break;
            case "AppearLeft":
                animationContext = gsap.context(() => {
                    gsap.fromTo(element, {
                        x: 200,
                        opacity: 0,
                    }, {
                        x: 0,
                        opacity: 1,
                        duration: 1,
                        stagger: 0.1,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: element,
                            start: "top bottom-=100",
                            end: "bottom center",
                            toggleActions: "play none none reverse",
                        },
                        delay: 0.3,
                    })
                })
                break;
            
            case "AppearRight":
                animationContext = gsap.context(() => {
                    elements.forEach((el, index) => {
                        gsap.fromTo(el, {
                            x: - 200,
                            opacity: 0,
                        }, {
                            x: 0,
                            opacity: 1,
                            duration: 0.8,
                            stagger: 0.1,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: el,
                                start: "top bottom-=100",
                                end: "bottom center",
                                toggleActions: "play none none reverse",
                            },
                            delay:index * 0.2,
                        })
                    });
                }, elements[0]);
                break;
            case "AppearBottom":
                animationContext = gsap.context(() => {
                    elements.forEach((el, index) => {
                        gsap.fromTo(el, {
                            y: - 200,
                            opacity: 0,
                        }, {
                            y: 0,
                            opacity: 1,
                            duration: 0.8,
                            stagger: 0.1,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: el,
                                start: "top bottom-=100",
                                end: "bottom center",
                                toggleActions: "play none none reverse",
                            },
                            delay:index * 0.2,
                        })
                    });
                }, elements);
                break;
            case "AppearTop":
                animationContext = gsap.context(() => {
                    elements.forEach((el, index) => {
                        gsap.fromTo(el, {
                            y: 200,
                            opacity: 0,
                        }, {
                            y: 0,
                            opacity: 1,
                            duration: 0.8,
                            stagger: 0.1,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: el,
                                start: "top bottom-=100",
                                end: "bottom center",
                                toggleActions: "play none none reverse",
                            },
                            delay:index * 0.2,
                        })
                    });
                }, elements);
                break;
            default:
                break;
            }
        return () => {
            if(animationContext) animationContext.revert();
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        }
    }, [type]);
    

    return { elementRef, elementsRef };
}