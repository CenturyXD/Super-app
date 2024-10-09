const Buttons = ({ type, text, onClick }) => {
    return (
    <button
        className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
        type={type}
    >
        {text}
    </button>
    );
}

export default Buttons;