import Link from "next/link";

export default function Logo({className}: {className?: string}): JSX.Element {
    return (
        <div className={`flex items-center pb-5 ${className}`}>
            <div className="w-full h-10 mb-4 animate-item">
                <Link href="/" className="text-[32px] font-medium lg:text-[48px]">
                    Health Solution
                </Link>
            </div>
        </div>
    )
}