"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface ErrorProps {
    error: Error & {digest?: string};
    reset: () => void;
}

export default function Error({error, reset}: ErrorProps): JSX.Element{
    useEffect(() => {
        console.error(error);
        return reset;
    }, [error, reset]);
    return(
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-pink-50 to-red-100 p-4 text-center">
            <AlertTriangle className="h-24 w-24 text-red-600 mb-8" />
            <h1 className="mb-4 text-4xl font-bold text-red-800">500 - Server Error</h1>
            <p className="mb-8 text-xl text-red-600">We&apos;re sorry, but something went wrong on our end.</p>
            <div className="space-x-4">

                <Button
                    onClick={reset}
                    className="bg-red-600 text-white hover:bg-red-700"
                >
                    Try again
                </Button>
                <Button asChild variant="outline" className="border-red-600 text-red-600 hover:bg-red-100">
                    <Link href="/">
                        Return to Home
                    </Link>
                </Button>
            </div>
        </div>
    )
}