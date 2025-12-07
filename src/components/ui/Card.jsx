export default function Card({ children, className = "", title, icon: Icon }) {
    
    return (
        <div className={`p-8 sketchy-box bg-white shadow-sm hover:shadow-md transition-all duration-300 ${className}`}>
            {(title || Icon) && (
                <div className="mb-6 flex items-center gap-3 border-b-2 border-dashed border-gray-100 pb-4">
                    {Icon && (
                        <div className="text-[#ff7e5f]">
                            <Icon size={32} strokeWidth={2} />
                        </div>
                    )}
                    {title && <h2 className="text-2xl font-bold text-gray-800">{title}</h2>}
                </div>
            )}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}