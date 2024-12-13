import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileQuestion } from 'lucide-react';

export default function NotFound(){
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-indigo-50 p-4 text-center">
            <FileQuestion className="h-24 w-24 text-[#0096C7] mb-8" />
            <h1 className="mb-4 text-4xl font-bold text-[#023E8A]">404 - Page Not Found</h1>
            <p className="mb-8 text-xl text-[#0096C7]">Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
            <Button asChild className="bg-[#00B4D8] hover:bg-[#48CAE4]">
                <Link href="/">
                    Return to Home
                </Link>
            </Button>
        </div>
    );
}