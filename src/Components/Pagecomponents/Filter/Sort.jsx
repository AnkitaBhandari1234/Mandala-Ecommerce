const Sort = ({ setSortOption }) => {
  const handleChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <div className="mb-4">
      <select
        onChange={handleChange}
        className="border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#BA4A20]"
      >
        <option value="">Sort by</option>
        <option value="priceAsc">Price: Low to High</option>
        <option value="priceDesc">Price: High to Low</option>
        <option value="rating">Rating</option>
      </select>
    </div>
  );
};

export default Sort;
