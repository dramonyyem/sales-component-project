export const InputSearch = ({
  inputValue,
  setInputValue,
  handleSearch,
}: any) => {
  return (
    <div className="flex justify-center mb-12">
      <div className="flex w-full max-w-xl">
        <input
          type="text"
          placeholder="Enter keyword..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-1 px-5 py-3 rounded-l-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black transition"
        />
        <button
          onClick={handleSearch}
          className="px-6 py-3 bg-black text-white rounded-r-full hover:opacity-90 transition"
        >
          Search
        </button>
      </div>
    </div>
  );
};
