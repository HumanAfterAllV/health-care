
import RegisterForm from "@/components/forms/RegisterForm"
import { getUser } from "@/lib/actions/patient.actions"
import Image from "next/image"
import Link from "next/link"

export default async function Register({params: {userId} }: SearchParamProps): Promise<JSX.Element> {

    const user = await getUser(userId);
    
    return (

        <section className="flex h-screen max-h-screen">
            {/* TODO: OTP Verification | Passkey */}
            <div className="remove-scroll container">
                <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
                    <Image src="/assets/icons/logo-full.svg" height={1000} width={1000} alt="patient" className="mb-12 h-10 w-fit"/>
                    <RegisterForm user={user}/>
                    <div className="text-14-regular mt-20 flex justify-between">
                        <p className="copyright py-12">
                            © 2024 CarePulse
                        </p>
                        <Link href={"/?admin=true"} className="text-green-500 ">
                            Admin
                        </Link>
                    </div>
                </div>
            </div>
            <Image src="/assets/images/register-img.png" height={1000} width={1000} alt="patient" className="side-img max-w-[390px]"/>
        </section>
        
    )
}