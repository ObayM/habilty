'use client';
import HabitList from "@/components/dashboard/HabitList";
import ConnectSlack from "@/components/dashboard/ConnectSlack";
import { useAuth } from "@/components/auth/AuthProvider";

export default function Dashboard() {

    const { profile } = useAuth();

    return (
        <div className="min-h-[calc(100vh-104px)] p-4 sm:p-8">
            <div className="max-w-4xl mx-auto">
                <header className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl text-neutral-800 mb-2">My habits!</h1>
                        <p className="text-gray-500 text-lg">Hey, {profile.username} nice to see you here today!</p>
                    </div>
                    
                </header>

                <main>
                    <ConnectSlack />
                    <HabitList />
                </main>

            </div>
        </div>
    )
}