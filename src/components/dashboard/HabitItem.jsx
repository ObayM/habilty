"use client";

import { useState } from "react";
import { Checkbox } from "../ui/Checkbox";
import { Trash2 } from "lucide-react";

export default function HabitItem({ habit, onUpdate }) {
    const [loading, setLoading] = useState(false);

    
    const handleToggle = async (checked) => {
        setLoading(true);
        try {

            const method = checked ? 'POST' : 'DELETE';

            const response = await fetch(`/api/habits/${habit.id}/log`, {
                method: method
            });

            if (!response.ok) throw new Error('Failed to update habit status');

            onUpdate();

        } catch (error) {
            console.error('Error toggling habit:', error);
        } finally {
            setLoading(false);
        }

    };

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this habit? This is final :(')) return;


        setLoading(true);

        try {
            const response = await fetch(`/api/habits/${habit.id}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('Failed to delete habit :(');
            onUpdate();

        } catch (error) {

            console.error('Error deleting habit:', error);

        } finally {

            setLoading(false);
        }

    };

    return (
        <div className="group flex items-center justify-between p-4 mb-3 bg-white sketchy-box
         hover:bg-gray-50 transition-colors">

            <div className="flex items-center gap-4">
                <Checkbox
                    checked={habit.isCompleted}
                    onCheckedChange={handleToggle}
                    disabled={loading}
                />
                <span className={`text-lg font-medium transition-all 
                    ${habit.isCompleted ? 'text-gray-400 line-through decoration-2 decoration-[#ff7e5f]' : 'text-gray-800'}`}>
                    {habit.title}
                </span>
            </div>

            <button
                onClick={handleDelete}
                disabled={loading}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-gray-400 hover:text-red-500"
                title="Delete habit"
            >
                <Trash2 size={18} />
            </button>

        </div>
    );
}
