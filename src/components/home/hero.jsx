import Button from "../ui/Button"
import { Sparkles, Pencil, ArrowRight } from "lucide-react"

export default function Hero() {
    return(

        <div className="max-w-6xl mx-auto px-6 py-20 md:py-32 grid md:grid-cols-2 gap-12 items-center">
            <div>
                <div className="inline-flex items-center gap-2 px-4 py-1 mb-6 text-lg font-bold text-[#ff7e5f] border-2 border-[#ff7e5f] rounded-[255px_15px_225px_15px/15px_225px_15px_255px] rotate-[-2deg]">
                    <Sparkles size={20} /> The coziest habit tracker
                </div>
                
                <h1 className='text-5xl md:text-7xl font-bold leading-[1.1] mb-6'>
                    Track habits where you <span className="relative inline-block">
                            <span className="relative z-10">already are</span>
                        
                        <svg className="absolute bottom-0 left-0 w-full h-3 text-[#ff7e5f]/30 -z-0" viewBox="0 0 100 10" preserveAspectRatio="none">
                            <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                        </svg>
                    </span>
                </h1>

                <p className='text-2xl text-gray-600 mb-8 leading-relaxed'>
                    Tried of forgetting to log your habits because apps are chunky or slow, You can now log Habits directly from Telegram/Slack and get reminders too and stay accountable by sharing your wins & faiulers and look at your awesome stats at the end of the year
                </p>

                <div className="flex flex-col sm:flex-row gap-4">

                    <Button primary>
                        Start Tracking now! <ArrowRight size={20} />
                    </Button>

                </div>

                <p className="mt-4 text-gray-500 text-sm">
                    * This will be forever free & open-source (just kidding if it went really well, i'll get money lol)
                </p>
            </div>


            <div className="relative">
                <div className="sketchy-box p-8 rotate-1 bg-white">
                    <div className="flex items-center gap-4 mb-6 border-b-2 border-gray-100 pb-4 border-dashed">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600">
                            <Sparkles size={28} />
                        </div>
                        <div>
                            <div className="font-bold text-xl">Habitly</div>
                            <div className="text-sm text-gray-500">bot</div>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="flex gap-3">
                            <div className="bg-gray-100 p-3 rounded-tr-2xl rounded-br-2xl rounded-bl-2xl text-lg">
                                hello, did you drink water today?
                            </div>
                        </div>
                        
                        <div className="flex gap-3 justify-end">
                            <div className="bg-[#e3f2fd] p-3 rounded-tl-2xl rounded-bl-2xl rounded-br-2xl text-lg border-2 border-[#bbdefb]">
                                Yup! 500ml just now!
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <div className="bg-gray-100 p-3 rounded-tr-2xl rounded-br-2xl rounded-bl-2xl text-lg w-full">
                                Cool! That's a 5-day streak!
                                <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden border border-gray-300">
                                    <div className="h-full bg-[#ff7e5f] w-[80%]"></div>
                                </div>
                            </div>
                            
                        </div>

                    </div>
                </div>


                <div className="absolute -top-6 -right-6 text-[#ff7e5f] rotate-12">
                    <Sparkles size={48} />
                </div>
                <div className="absolute -bottom-8 -left-8 text-gray-400 -rotate-12">
                    <Pencil size={48} />
                </div>

            </div>
        </div>

)
}