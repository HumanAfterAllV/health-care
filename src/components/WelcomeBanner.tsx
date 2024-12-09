import Image from "next/image"
import { Card } from "./ui/card"

export default function WelcomeBanner(): JSX.Element {
    return (
        <Card className="flex items-center gap-8 justify-start bg-indigo-600 p-4 text-white rounded-2xl">
            <div className="h-32 w-32">
                <Image
                    src="/assets/images/test.png"
                    alt="profile"
                    width={128}
                    height={128}
                />
            </div>
            <div className="space-y-1">
                <p className="text-3xl font-light">Welcome, <span className="text-3xl font-bold">Dr. Smith</span></p>
                <p className="text-indigo-100">Have a nice day at work</p>
            </div>
        </Card>
    )
}