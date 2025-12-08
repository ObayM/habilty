import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request) {
    const formData = await request.formData();
    const command = formData.get('command');
    const text = formData.get('text');

    const userId = formData.get('user_id');
    const channelId = formData.get('channel_id');

    const supabase = await createClient();

    if (command === '/habitly-link'){
        const code = text.trim();
        console.log(code)

        const { data: connectCode, error } = await supabase
            .from('connect_codes_slack')
            .select('user_id')
            .eq('code', code)
            .single();

         if (error || !connectCode) {
            console.log(error, connectCode)
            return NextResponse.json({
                response_type: 'ephemeral',
                text: 'Invalid or expired code. Please generate a new one from your dashboard :('
            });
        }
        
        const { error: updateError } = await supabase
            .from('profiles')
            .update({ slack_user_id: userId })
            .eq('id', connectCode.user_id);

        if (updateError){
            return NextResponse.json({
                response_type: 'ephemeral',
                text: 'Failed to link account. Please try again!'
            })
        }

        await supabase.from('connect_codes_slack').delete().eq('code', code)
        
        return NextResponse.json({
            response_type: 'ephemeral',
            text: 'Successfully linked your Habitly account :yay: You will now receive daily reminders!'
        });

    }

    if (command=="/habitly-done"){
        const habitName = text.trim();

        if (!habitName){
             return NextResponse.json({
                response_type: 'ephemeral',
                text: 'Please specify a habit name. Use: `/habit-done [habit name]`'
            });
        }

         const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('id')
            .eq('slack_user_id', userId)
            .single();
        
        if (profileError || !profile) {
            return NextResponse.json({
                response_type: 'ephemeral',
                text: 'Account not linked. Please use `/habit-link [code]` first :)'
            });
        }

        const { data: habits, error: habitsError } = await supabase
            .from('habits')
            .select("id, title")
            .eq('user_id', profile.id)
            .ilike('title', `%${habitName}%`);

        console.log(profile.id)
        if (habitsError || habits.length === 0) {
            console.log(habitsError)
            return NextResponse.json({
                response_type: 'ephemeral',
                text: `Habit "${habitName}" not found.`
            });
        }

        const habit = habits[0]

        const { error: logError } = await supabase
            .from('habit_logs')
            .insert({
                habit_id: habit.id,
                completed_at: new Date().toISOString()

            });

        if (logError) {

            if (logError.code === '23505') {
                return NextResponse.json({
                    response_type: 'ephemeral',
                    text: `You've already logged "${habit.title}" for today!`
                });
            }

            return NextResponse.json({
                response_type: 'ephemeral',
                text: 'Failed to log habit.'
            });
        }

        return NextResponse.json({
            response_type: 'ephemeral',
            text: `Cool! I marked "${habit.title}" as done!`
        });

    }

    return NextResponse.json({ error: 'Unknown command' }, { status: 400 });

}