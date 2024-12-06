import Link from "next/link";

import RenderUserAppointment from "@/components/RenderUserAppointment";
import Logo from "@/components/Logo";

export default function Success(): JSX.Element {

    return (
        <div className="flex h-screen max-h-screen px-[5%]">
            <div className="success-img">
                <Link href="/">
                    <Logo />
                </Link>
                <RenderUserAppointment/>
                <p className="copyright mt-10 py-12">
                    © 2024 CarePulse
                </p>
            </div>
        </div>
    )
}