import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import { sendSlackMessage } from '@/utils/slack';

export async function GET() {
    const supabase = await createClient();

    const todayDate = new Date().toISOString().split('T')[0];

    const {data: profiles, error: profilesError} = await supabase
        .from('profiles')
        .select('id, slack_user_id')
        .not('slack_user_id', 'is', null);

    if (profilesError) {
        return NextResponse.json({ error: profilesError.message }, { status: 500 });
    }

    let sentCount = 0;

    for (const profile of profiles) {
        console.log(profile)
        const { data: habits, erro: habitsError } = await supabase
            .from('habits')
            .select('id, title')
            .eq('user_id', profile.id);

        if (habitsError || !habits.length) continue; // unlucky ppl goes here :pf

        const { data: logs, error: logsError } = await supabase
            .from('habit_logs')
            .select('habit_id')
            .in('habit_id', habits.map(h => h.id))
            .gte('completed_at', `${todayDate}T00:00:00`)
            .lte('completed_at', `${todayDate}T23:59:59`);

        if (logsError) continue;


        const completedIds = new Set(logs.map(l => l.habit_id));
        const incompleteHabits = habits.filter(h => !completedIds.has(h.id));
        
        if (incompleteHabits.length > 0) {

            const text = `Heyy, You still have ${incompleteHabits.length} habits to complete today:\n` 
                        + incompleteHabits.map(h => `- ${h.title}`).join('\n')
                        +`\n\nUse \`/habit-done [habit name]\` to mark them as done :yay:`;

            await sendSlackMessage(profile.slack_user_id, text);
            sentCount++;
        }
    }

    return NextResponse.json({ success: true, sent: sentCount });


}