
import Button from '@/components/ui/Button';
import Hero from '@/components/home/hero';
import FeaturesSection from '@/components/home/features';
import HIWSection from '@/components/home/howItworks';
import Link from "next/link";

export default function Home() {

    return (
        <div className="min-h-screen overflow-x-hidden">
            
            <Hero />
            <FeaturesSection />
            <HIWSection />

            <section className="py-20 px-6 text-center">
                <div className="max-w-3xl mx-auto sketchy-box bg-[#fff5f5] p-12">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to start your streak?</h2>
                    
                    <div className="flex justify-center">
                        <Button primary className="text-2xl px-8 py-4">
                            <Link href={'/dashboard'}>Get Started!</Link>
                        </Button>
                    </div>
                </div>
            </section>

        </div>
    );
}
