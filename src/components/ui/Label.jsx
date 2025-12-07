
export default function Label({ children, className = "", htmlFor }) {
    return (
        <label
            htmlFor={htmlFor}
            className={`block text-xl font-bold text-gray-700 mb-2 ml-1 ${className}`}
        >
            {children}
        </label>
    );
}
