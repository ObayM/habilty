
export default function Card({ title, children, icon: Icon }) {
    return (
        <div className="p-6 sketchy-box shadow-sm hover:shadow-md transition-shadow group">
            
            <div className="mb-4 text-[#ff7e5f]">

                <Icon size={48} strokeWidth={1.4} />

            </div>

            <h3 className="text-2xl font-bold mb-2">{title}</h3>
            <p className="text-lg text-gray-600 leading-relaxed">{children}</p>
        </div>
    );
}