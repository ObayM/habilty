import Card from "../ui/Card"
import { MessageCircle, BarChart3, Users } from "lucide-react"

export default function FeaturesSection() {
    return(
        <section className="py-20 bg-white/50">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">

                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Why you'll likely stick to your habits</h2>
                    
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        I actually get rid of everything that could distract you, or make the process slower, everything is so smooth, i am building this after long time of using tens of apps and trying to build my habits
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">

                    <Card title="In-chat logging" icon={MessageCircle}>
                        don't like loading screens, if yes, say bye for it, with just a message in natural language to the bot you can simply mark your habit as done or even log a journal entry about it 
                    </Card>
                    
                    <Card title="Accountability friends" icon={Users}>
                        your chosen friends will get reports about your performance which will put you in a little social pressure to mark your habits DONE!
                    </Card>
                    
                    <Card title="Sketchy Analytics" icon={BarChart3}>
                        finally, after good weeks, you can see when you did your habits, and a lot of cool stats about everything around your habits as we will analayze your chat with our bot (don't share sensitive info and we won't share it with anybody lol)
                    </Card>
                </div>
            </div>
        </section>
        )
}