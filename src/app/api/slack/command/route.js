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

        const { data: connectCode, error } = await supabase
            .from('connect_codes')
            .select('user_id')
            .eq('code', code)
            .gt('expires_at', new Date().toISOString())
            .single();

         if (error || !connectCode) {
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
    }
}