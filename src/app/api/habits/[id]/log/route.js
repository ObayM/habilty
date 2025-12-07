import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request, { params }) {
    
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const today = new Date().toISOString().split('T')[0];
    
    const { error } = await supabase
        .from('habit_logs')
        .insert({
            habit_id: id,
            completed_at: new Date().toISOString()
        });

    if (error) {

        if (error.code === '23505') {
            return NextResponse.json({ message: 'Already logged' }, { status: 200 });
        }
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true })

}

export async function DELETE(request, { params }) {
    const supabase = await createClient();
    
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const today = new Date().toISOString().split('T')[0];

    const { error } = await supabase
        .from('habit_logs')
        .delete()
        .eq('habit_id', id)
        .gte('completed_at', `${today}T00:00:00`)
        .lte('completed_at', `${today}T23:59:59`);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });


}