import { Loader2 } from 'lucide-react';

export default function Button({
    children, variant = 'primary', className = "", disabled = false, loading = false, type = "button", 
    ...props
}) {
    const baseStyling = "relative px-6 py-3 cursor-pointer text-xl font-bold transition-all disabled:opacity-70 disabled:cursor-not-allowed sketchy-border flex items-center justify-center gap-2";

    const variants = {
        primary: "bg-[#ff7e5f] text-white border-transparent ",
        secondary: "bg-white text-gray-800 border-gray-800",
        ghost: "bg-transparent text-gray-600 border-transparent hover:bg-gray-100/50",
        outline: "bg-transparent text-gray-800 border-gray-800 hover:bg-gray-50"
    };

    return (
        <button
            type={type}
            disabled={disabled || loading}
            className={`${baseStyling} ${variants[variant]} ${className}`}
            {...props}
        >

            {loading && <Loader2 className="w-5 h-5 animate-spin" />}
            
            <span className="relative z-10 flex items-center gap-2">{children}</span>


            {(variant === 'primary' || variant === 'secondary') && !disabled && (
                <div className="absolute inset-0 border-2 border-gray-800
                 rounded-[255px_15px_225px_15px/15px_225px_15px_255px] translate-x-1 translate-y-1 -z-10
                  bg-gray-800/10" />
            )}
        </button>
    );
}
