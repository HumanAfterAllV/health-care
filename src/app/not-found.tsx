
import Link from 'next/link';
import { FileQuestion } from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function NotFound(){
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4 text-center">
            <FileQuestion className="h-24 w-24 mb-8" />
            <h1 className="mb-4 text-4xl font-bold">404 - Page Not Found</h1>
            <p className="mb-8 text-xl">Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
            <Button asChild className="shad-primary-btn-rt">
                <Link href="/">
                    Return to Home
                </Link>
            </Button>
        </div>
    );
}