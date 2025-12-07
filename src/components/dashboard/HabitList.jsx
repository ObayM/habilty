'use client';

import { useEffect, useState, useCallback } from 'react';

import HabitItem from './HabitItem';
import  AddHabit  from './AddHabit';
import { Loader2 } from 'lucide-react';

export default function HabitList() {
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchHabits = useCallback(async () => {
        try {
            const response = await fetch('/api/habits');
            if (!response.ok) throw new Error('Failed to fetch habits');

            const data = await response.json();
            setHabits(data);
        } catch (error) {
            console.error('Error fetching habits:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {

        fetchHabits();

    }, [fetchHabits]);

    if (loading) {
        return (
            <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-[#ff7e5f]" />
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            <AddHabit onAdd={fetchHabits} />

            <div className="space-y-1">
                {habits.length === 0 ? (
                    <div className="text-center py-12 text-gray-400 italic">
                        No habits yet. Start by adding one above!
                    </div>
                ) : (
                    habits.map(habit => (
                        <HabitItem
                            key={habit.id}
                            habit={habit}
                            onUpdate={fetchHabits}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
