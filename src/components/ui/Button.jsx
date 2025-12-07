
export default function Button({ children, primary = false, className = "" }) {

    return (
        <button className={`
        relative px-6 py-3 text-xl font-bold transition-all cursor-pointer
        ${primary ? 'bg-[#ff7e5f] text-gray-800' : 'bg-white text-gray-800 border-gray-800'}
        sketchy-border
        ${className}
        `}>
            
            <span className="relative z-10 flex items-center gap-2">{children}</span>


        </button>
    );
}

