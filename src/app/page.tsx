"use client"

/* import { useEffect, useRef } from "react"; */
import Link from "next/link";
import Image from "next/image";

 import { User, Activity, Microscope } from "lucide-react";
/* import { ScrollTrigger } from "gsap/ScrollTrigger"; */

/* import { gsap } from "gsap"; */

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Logo from "@/components/Logo";
import { Doctors } from "@/constants";
import { Button } from "@/components/ui/button";

export default function Page(): JSX.Element {

    return (
        <div className="flex flex-col min-h-screen">
            <header /* ref={headerRef} */ className="bg-white">
                <div className="flex justify-between items-center max-w-7x1 mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <Link href="/">
                        <Logo />
                    </Link>
                    <nav>
                        <ul className="flex space-x-4">
                            <li><Link href="/" className="text-gray-600 hover:text-teal-600">Home</Link></li>
                            <li><Link href="" className="text-gray-600 hover:text-teal-600">Services</Link></li>
                            <li><Link href="" className="text-gray-600 hover:text-teal-600">Doctors</Link></li>
                            <li><Link href="" className="text-gray-600 hover:text-teal-600">Contact</Link></li>
                        </ul>
                    </nav>
                </div>
            </header>

            <main className="flex-grow">
                <section /* ref={heroRef} */ className="bg-gradient-to-r from-teal-500 to-blue-500 text-white py-20">
                    {/* <BackgroundVideo/> */}
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h1 className="text-4x1 font-extrabold  sm:text-5xl md:text-6xl">
                                We take care of your health
                            </h1>
                            <p className="mt-3 max-w-md mx-auto text-base  sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                                We offer quality medical care with a team of professionals <br /> 
                                dedicated to your well-being.
                            </p>
                            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                                <Link href="/patients">
                                    <Button size="lg" className="bg-white text-teal-600 hover:bg-teal-50">Appointment</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
                            Services
                        </h2>
                    </div>
                    <div /* ref={servicesRef} */ className="grid grid-cols-1 md:grid-cols-3 gap-8 px-9">
                        <Card className="text-black">
                            <CardHeader>
                                <User className="w-10 h-10 text-teal-500 mb-2"/>
                                <CardTitle>General medical consultation</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>
                                    Comprehensive medical <br />
                                    care for all your health needs.
                                </CardDescription>
                            </CardContent>
                        </Card>
                        <Card className="text-black">
                            <CardHeader>
                                <Activity className="w-10 h-10 text-teal-500 mb-2"/>
                                <CardTitle>Specialties</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>
                                    We have specialists in various medical areas.
                                </CardDescription>
                            </CardContent>
                        </Card>
                        <Card className="text-black">
                            <CardHeader>
                                <Microscope className="w-10 h-10 text-teal-500 mb-2"/>
                                <CardTitle>Laboratory</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>
                                    We perform clinical analysis with <br />
                                    state-of-the-art technology.
                                </CardDescription>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                <section className="bg-gray-100 py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">Doctors</h2>
                        <div /* ref={doctorsRef} */ className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {Doctors.map((doctor, index) => index < 3 && (
                                <Card key={index}>
                                    <CardHeader>
                                        <Image src={doctor.image} alt={doctor.name} width={100} height={100} className="rounded-full mx-auto"/>
                                        <CardTitle className="text-center mt-4">{doctor.name}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription className="text-center">
                                            {doctor.specialty}
                                        </CardDescription>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
                            Patient testimonials
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[
                                { name: "Juan Pérez", text: "Excelente atención y profesionalismo. Me sentí muy bien cuidado." },
                                { name: "Laura Gómez", text: "Los doctores son muy amables y explican todo detalladamente." },
                            ].map((testimonial, index) => (
                                <Card key={index}>
                                    <CardContent className="pt-8">
                                        <p className="text-lg text-gray-600 italic">{`"${testimonial.text}"`}</p>
                                        <p className="mt-4 font-semibold">{testimonial.name}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                <section /* ref={ctaRef} */ className="bg-gray-50 py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="lg:flex lg:items-center lg:justify-between">
                            <div className="flex-1 min-w-0">
                                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                                    Ready for a healthier life?
                                </h2>
                                <p className="mt-2 text-lg text-gray-500">
                                    Schedule an appointment with our professionals and take the first step towards a healthier life.
                                </p>
                            </div>
                            <div className="mt-5 flex lg:mt-0 lg:ml-4">
                                <Link href="/patients" className="group btn-custom">
                                    Contact us
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                <footer className="bg-gray-800 text-white py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px lg:px-8">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-semibold">
                                    NextHealth
                                </h3>
                                <p className="mt-2 text-sm">
                                    Take care of you and your family&apos;s health with our quality medical care.
                                </p>
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold mb-2">
                                    Follow us on social networks
                                </h4>
                                <div className="flex space-x-4">
                                    <a href="#" className="text-gray-400 hover:text-white">
                                        <span className="sr-only">Facebook</span>
                                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                    <a href="#" className="text-gray-400 hover:text-white">
                                        <span className="sr-only">Instagram</span>
                                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                    <a href="#" className="text-gray-400 hover:text-white">
                                        <span className="sr-only">Twitter</span>
                                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 border-t border-gray-700 pt-8">
                            <p className="text-base text-gray-400 xl:text-center">
                                &copy; 2023 Clínica Salud. Todos los derechos reservados. 
                            </p>
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    )
}