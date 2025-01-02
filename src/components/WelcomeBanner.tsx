import Image from "next/image"

import { formatDateTime } from "@/lib/utils"

import { Card } from "./ui/card"
export default function WelcomeBanner(): JSX.Element {
    const currentTime = formatDateTime(new Date()).dateTime;

    return (
        <Card className="flex items-center justify-between text-white bg-purple-600 p-4 shadow-none rounded-3xl">
            <div className="flex items-center gap-8">
                <Image
                    src="/assets/images/ui-doc2.png"
                    alt="profile"
                    width={120}
                    height={120}
                />
                <div className="space-y-1">
                    <p className="text-3xl font-light">Welcome, <span className="text-3xl font-medium">Dr. Jasmine</span></p>
                    <p className="text-sm font-light">Have a nice day at work</p>
                </div>
            </div>
            <div className="font-light">
                {currentTime}
            </div>
        </Card>
    )
}