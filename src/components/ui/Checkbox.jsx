import { Check } from 'lucide-react';

export function Checkbox({ checked, onCheckedChange, disabled = false, className = "" }) {
    return (
        <button
            type="button"
            role="checkbox"
            aria-checked={checked}
            disabled={disabled}
            onClick={() => !disabled && onCheckedChange(!checked)}
            className={`
                group relative w-6 h-6 flex items-center justify-center
                border-2 border-gray-800 rounded-md

                transition-all duration-200 ease-in-out
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff7e5f]

                disabled:opacity-50 disabled:cursor-not-allowed
                ${checked ? 'bg-[#ff7e5f] border-[#ff7e5f]' : 'bg-white hover:border-[#ff7e5f]'}
                ${className}
            `}
            style={{
                borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px'
            }}
        >
            <Check
                className={`
                    w-4 h-4 text-white transition-all duration-200
                    ${checked ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}
                `}
                strokeWidth={3}
            />


            <div className={`
                absolute inset-0 -z-10 
                border-2 border-gray-800 rounded-md opacity-20
                transition-transform duration-200
                translate-x-0.5 translate-y-0.5
                group-hover:translate-x-1 group-hover:translate-y-1
            `}
                style={{
                    borderRadius: '15px 225px 15px 255px / 255px 15px 225px 15px'
                }}
            />
        </button>
    );
}
