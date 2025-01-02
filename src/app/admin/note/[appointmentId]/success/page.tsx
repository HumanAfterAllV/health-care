import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button";

export default function Page(): JSX.Element {
    
    return(
        <div className="flex h-screen max-h-screen px-[5%]">
            <div className="success-img">
                <section className="flex flex-col items-center">
                    <Image
                        src="/assets/gifs/success.gif"
                        height={300}
                        width={280}
                        alt="success"
                    />
                    <h2 className="header mb-6 max-w-[600px] text-center">
                        Success!
                    </h2>
                    <p className="pb-4">
                        The medical note has been saved successfully.
                    </p>
                    <Button aria-label="Return Dashboard" variant="outline" className="shad-primary-btn-rt bg-green-400" asChild>
                        <Link href="/admin">
                            Return to Dashboard
                        </Link>
                    </Button>
                </section>
                <p className="copyright mt-10 py-12">
                    © 2024 CarePulse
                </p>
            </div>
        </div>
    )
}