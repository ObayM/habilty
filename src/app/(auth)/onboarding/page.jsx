import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import OnboardingForm from "./form";
import { Sparkles } from 'lucide-react';
import  Card  from '@/components/ui/Card';

export default async function OnboardingPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/signup");
  }


  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();

  if (profile) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-[calc(100vh-104px)] flex items-center justify-center p-4 relative overflow-hidden">


      <Card className="w-full max-w-xl relative z-10">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-2 flex items-center justify-center gap-3">
            <Sparkles className="text-[#ff7e5f]" /> Choose Your Name!
          </h1>

          <p className="text-xl text-gray-600 mt-4">
            This will be your username and you can't change it so choose wisely :)
          </p>
        
        </div>

        <OnboardingForm />
      </Card>
    </div>
  );
}