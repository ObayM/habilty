import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function POST() {

    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString(); // 15 minutes is kinda more than enough :)


    const { error } = await supabase
        .from('connect_codes_slack')
        .insert({
            code,
            user_id: user.id,
            expires_at: expiresAt
        });

    if (error) {
        console.log(error)
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json({ code });

}