import Link from "next/link";
import Button from "@/components/ui/Button";


export default function Navbar() {
    return(
            <div className="flex justify-between items-center p-6 max-w-6xl mx-auto">
                
                <div className="text-3xl tracking-tighter flex items-center gap-2">
                    <Link href={'/'}>Habilty</Link>
                </div>
                
                <div className="hidden md:flex gap-6 text-xl items-center">
                    <Link href="/dashboard" className="hover:text-[#ff7e5f] transition-colors">Dashboard</Link>
                </div>

                <Button primary="true" ><Link href={'/login'}>Get Started</Link></Button>
            </div>
    );
}

