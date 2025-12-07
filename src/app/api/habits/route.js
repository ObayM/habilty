import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
    const supabase = await createClient();
    const {data: {user}, error: authError } = await supabase.auth.getUser()

    if (authError || !user){
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const todayDate = new Date().toISOString().split('T')[0]; // example output : '2025-12-07'

    const { data: habits, error: FetchHabitsErorr } = await supabase
        .from('habits')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });


    if (FetchHabitsErorr){
        return NextResponse.json({ error: habitsError.message }, { status: 500 });
    }
    
    const { data: logs, error: logsError } = await supabase
        .from('habit_logs')
        .select('habit_id')
        .gte('completed_at', `${todayDate}T00:00:00`)
        .lte('completed_at', `${todayDate}T23:59:59`);

    if (logsError) {
        return NextResponse.json({ error: logsError.message }, { status: 500 });
    }

    const completedHabitIds = new Set(logs.map(log => log.habit_id));

    const habitsList = habits.map(habit => ({
        ...habit,
        isCompleted: completedHabitIds.has(habit.id)
    }));

    return NextResponse.json(habitsList)

}

export async function POST(request) {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user){
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
        
        const { title } = await request.json();

        if (!title || typeof title !== 'string' || !title.trim()) {
            return NextResponse.json({ error: 'Title is required' }, { status: 400 });
        }

        const { data, error } = await supabase
            .from('habits')
            .insert({
                title: title.trim(),
                user_id: user.id
            })
            .select()
            .single();
        
        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(data);

    } catch (error) {
        return NextResponse.json({ error: 'Invalid request :('}, { status:400 })
    }

}