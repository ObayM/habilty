"use client";

import { useState } from "react";
import Button from "../ui/Button";
import { Copy, Check, Slack } from "lucide-react";

export default function ConnectSlack() {

    const [code, setCode] = useState(null);
    const [copied, setCopied] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const generateCode = async () => {

        setLoading(true);

        try {
            const response = await fetch('api/user/connect-slack',{
                method: 'POST'
            });
            
            if (!response.ok) throw new Error("Failed to generate code :(");

            const data = await response.json();
            setCode(data.code)
            

        } catch (error) {
            console.error('Error generating code -->', error);
        } finally {
            setLoading(false);
        }

    };

    const copyCode = () => {
        if (!code) return;
        navigator.clipboard.writeText(`/habitly-link ${code}`);
        setCopied(true);

        setTimeout(() => setCopied(false), 2000);
    };
    
    return(
        <div className="sketchy-box p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
                <Slack className="text-[#4a154b]" size={24}/>
                <h3 className="text-xl"> Connect Slack</h3>

            </div>

            <p className="text-gray-600 mb-4">
                Get daily reminders and log habits directly from Slack, only works in HackClub slack for now!
            </p>

            {!code ? (
                <Button 
                    onClick={generateCode}
                    loading={loading}
                    className="w-full sm:w-auto"
                >
                    Generate Connect Code
                </Button>
            ):(
                <div className="space-y-3">
                    <div className="p-4 bg-gray-50 border-2 border-dashed border-gray-300 
                    rounded-lg flex items-center justify-between gap-4">

                        <code className="text-lg font-mono font-bold text-[#ff7e5f]">
                            /habitly-link {code}
                        </code>

                        <button
                            onClick={copyCode}
                            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                            title="Copy command"
                        >
                            {copied ? <Check size={20} className="text-green-500" /> : <Copy size={20} className="text-gray-500" />}
                        </button>

                    </div>
                    <p className="text-sm text-gray-500">
                        Paste this command into #siege or dm it to the bot!
                    </p>
                </div>
            )

            }
        </div>
    )
}