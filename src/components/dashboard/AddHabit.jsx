'use client';
import { useState } from "react";
import { Plus } from "lucide-react";


export default function AddHabit(onAdd) {
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        setLoading(true);
        try {
            const response = await fetch('/api/habits', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: title.trim() }),
            });

            if (!response.ok) throw new Error('Failed to add habit :(');

            setTitle('');
            onAdd();

        } catch (error) {
            console.error('Error adding habit:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6">
            <div className="relative group">

                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Plus className="h-6 w-6 text-gray-400 group-focus-within:text-[#ff7e5f] transition-colors" />
                </div>
                
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Add a new habit..."
                    disabled={loading}
                    className="block w-full pl-12 pr-4 py-4 bg-white/50 border-2 border-dashed border-gray-300 rounded-[255px_15px_225px_15px/15px_225px_15px_255px] text-lg placeholder-gray-400 focus:outline-none focus:border-[#ff7e5f] focus:ring-0 transition-all hover:border-gray-400"
                />
                <button
                    type="submit"
                    disabled={!title.trim() || loading}
                    className="absolute inset-y-2 right-2 px-4 py-1 bg-[#ff7e5f] text-white font-bold rounded-[255px_15px_225px_15px/15px_225px_15px_255px] opacity-0 group-focus-within:opacity-100 focus:opacity-100 transition-all disabled:opacity-0 disabled:pointer-events-none hover:scale-105 active:scale-95"
                >
                    Add
                </button>
            </div>
        </form>
    );
}
