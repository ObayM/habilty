const steps = [
    { 
        step: 1,
        title: "Connect your chat app",
        desc: "Link your telegram/slack account in one click (this is a lie lol)" 
    },
    { 
        step: 2, 
        title: "Define your habits",
        desc: "By just telling the bot or in the dashboard" 
    },
    { 
        step: 3, 
        title: "Just chat!", 
        desc: "When you do your habits, tell the bot or log it in the website" 
    }
]

export default function HIWSection() {

    return(
        <section className="py-20">
            <div className="max-w-4xl mx-auto px-6">
                <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">How it works</h2>

                <div className="space-y-12">
                    {steps.map((item, i) => (

                        <div key={i} className="flex gap-6 items-start group">

                            <div className="w-16 h-16 shrink-0 flex items-center justify-center text-3xl 
                            font-bold border-2 border-gray-800 rounded-full bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
                            group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none transition-all">

                                {item.step}
                            </div>

                            <div className="pt-2">
                                <h3 className="text-3xl font-bold mb-2">{item.title}</h3>
                                <p className="text-xl text-gray-600">{item.desc}</p>
                            </div>

                        </div>

                    ))}
                </div>
            </div>
        </section>
    )
}