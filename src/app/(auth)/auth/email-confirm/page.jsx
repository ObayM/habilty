'use client';

import { useSearchParams } from "next/navigation";
import { Mail, ArrowRight } from "lucide-react";

import Card  from "@/components/ui/Card";
import  Button  from "@/components/ui/Button";

import Link from "next/link";

export default function EmailConfirmPage() {

    const searchParams = useSearchParams();
    const email = searchParams.get('email');

    return (
        <div className="min-h-[calc(100vh-104px)] flex items-center justify-center p-4 relative overflow-hidden">
         
            <Card className="w-full max-w-md text-center relative z-10">

                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-[#fff5f5] rounded-full flex items-center justify-center border-2 border-[#ff7e5f] border-dashed">
                        <Mail className="text-[#ff7e5f]" size={40} />
                    </div>

                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    Check your inbox!
                </h1>

                <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                    We've sent a confirmation link to <br />
                    <span className="font-bold text-[#ff7e5f] decoration-wavy underline decoration-2">
                        {email || 'your email'}
                    </span>
                </p>

                <div className="bg-gray-50 p-4 rounded-lg border-2 border-dashed border-gray-200 mb-8">
                    
                    <p className="text-sm text-gray-500">
                        Can't find it? Check your spam folder or try again in a few moments later!
                    </p>
                </div>

                <Link href="/login">
                    <Button variant="primary" className="w-full">
                        Back to Login <ArrowRight size={20} />
                    </Button>
                </Link>
            </Card>
        </div>
    )
}