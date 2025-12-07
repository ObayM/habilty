export default function Input({ className = "", error, ...props }) {
    return (
        <div className="relative group">
            <input
                className={`
                        w-full px-4 py-3 bg-white
                        border-2 border-gray-300 
                        rounded-[255px_25px_225px_25px/25px_225px_25px_255px]
                        focus:outline-none focus:border-[#ff7e5f] focus:ring-0
                        transition-all duration-200
                        placeholder:text-gray-400 text-lg
                        group-hover:border-gray-400
                        ${error ? 'border-red-500 focus:border-red-500' : ''}
                        ${className}
                        `}
                {...props}
            />

        </div>
    );
}
