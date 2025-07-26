import Chevrondown from '../../../assets/Icons/Chevron down.svg';
const Sort = ({ setSortOption }) => {
  const handleChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <div className="relative w-fit  ">
      <select
        onChange={handleChange}
        className="appearance-none  py-1.5 px-1.5  text-[#858585] font-poppins cursor-pointer bg-[#F9EBD2]  border-[1px] border-[#BA4A20] rounded-lg focus:outline-none"
      >
        <option value="">Sort by</option>
        <option value="priceAsc">Price: Low to High</option>
        <option value="priceDesc">Price: High to Low</option>
        <option value="rating">Rating</option>
      </select>

      {/* Custom arrow */}
      <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
       <img src={Chevrondown} alt='' />
          
       
      </div>
    </div>
  );
};

export default Sort;
