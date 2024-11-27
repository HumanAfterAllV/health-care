
import Image from "next/image"
import Link from "next/link"

import { getUser } from "@/lib/actions/patient.actions"

import RegisterForm from "@/components/forms/RegisterForm"
import Logo from "@/components/Logo"

export default async function Register({params: {userId} }: SearchParamProps): Promise<JSX.Element> {

    const user = await getUser(userId);
    
    return (

        <section className="flex h-screen max-h-screen">
            {/* TODO: OTP Verification | Passkey */}
            <div className="remove-scroll container">
                <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
                    <Link href="/" className="py-10">
                        <Logo />
                    </Link>
                    <RegisterForm user={user}/>
                    <div className="text-14-regular mt-20 flex justify-between">
                        <p className="copyright py-12">
                            © 2024 NextHealth
                        </p>
                        <Link href={"/?admin=true"} className="text-green-500 ">
                            Admin
                        </Link>
                    </div>
                </div>
            </div>
            <Image src="/assets/images/doctor-world.jpg" height={1000} width={1000} alt="patient" className="side-img max-w-[390px]"/>
        </section>
        
    )
}