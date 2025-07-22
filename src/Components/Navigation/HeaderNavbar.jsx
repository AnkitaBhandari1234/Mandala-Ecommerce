import React, { useContext, useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import Profile from "../../assets/Icons/profile.svg";
import Wishlist from "../../assets/Icons/wish.svg";
import Cart from "../../assets/Icons/shoppingcart.svg";
import { CartContext } from "../../Context/CartContext";
import { useUser } from "../../Context/UserContext"; // adjust path if needed
import { useNavigate } from "react-router-dom";
import { WishlistContext } from "../../Context/WishlistContext";
import Myprofile from "../UI/Myprofile";
import Logo from "../../assets/logo.png";
import { FiMenu, FiX } from "react-icons/fi"; // Hamburger and close icons

const HeaderNavbar = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [sticky, setsticky] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // hamburger menu toggle state

  useEffect(() => {
    const onscroll = () => {
      if (window.scrollY > 50) {
        setsticky(true);
      } else {
        setsticky(false);
      }
    };

    window.addEventListener("scroll", onscroll);
    return () => window.removeEventListener("scroll", onscroll);
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      navigate(`/search?keyword=${searchQuery}`);
    }
  };

  const { cart } = useContext(CartContext);
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const { wishlist } = useContext(WishlistContext);

  // Toggle hamburger menu open/close
  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Close menu on link click
  const closeMenu = () => setMenuOpen(false);

  // Define your main nav links here or import if you have them elsewhere
  const navLinks = [
    { name: "Shop all", path: "/shop_all" },
    { name: "Decor", path: "/decor" },
    { name: "Textiles", path: "/textiles" },
    { name: "Jewelry", path: "/jewelry" },
    { name: "Ceramics", path: "/ceramics" },
    { name: "Artifacts", path: "/artifacts" },
    { name: "Wellness", path: "/wellness" },
  ];

  return (
    <>
      <div
        className={`grid sm:grid-cols-9 grid-cols-2 items-center w-full sm:px-10 py-1 ${
          sticky
            ? "fixed top-0 bg-white z-10 border-b-[0.5px] border-[#BA4A20]"
            : "relative"
        }`}
      >
        {/* logo image */}
        <div className="sm:text-3xl text-2xl sm:col-span-2 col-span-1 font-playfair tracking-tight font-bold cursor-pointer sm:px-20 px-6 w-fit">
          <Link to="/">
            <img src={Logo} alt="" className="w-full sm:h-20 h-12" />
          </Link>
        </div>

        {/* search bar */}
        <div className="col-span-5 sm:flex hidden flex-row-reverse pl-14">
          <div className="w-full relative">
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
              className="w-full px-3 py-2 rounded-md outline-none border border-[#D1D1D1] text-[16px] font-[400] font-inter focus:ring-1 focus:ring-[#BB4A20]"
            />
            <div
              onClick={handleSearch}
              className="absolute top-1/2 -translate-y-1/2 right-0 text-2xl text-white h-full px-2 py-2 rounded-r-md bg-[#BB4A20] cursor-pointer placeholder:font-poppins"
            >
              <IoSearchOutline />
            </div>
          </div>
        </div>

        {/* icons cart,wishlist,login and hamburger */}
        <div className="sm:col-span-2 col-span-1 flex sm:gap-5 gap-4 text-[#BA4A20] items-center sm:justify-center justify-end px-6 text-2xl">
          {user && user.name ? (
            <Myprofile user={user} />
          ) : (
            <NavLink to="/signup">
              <img
                src={Profile}
                alt="Profile"
                className="sm:w-7 w-5 cursor-pointer"
              />
            </NavLink>
          )}

          {user ? (
            <NavLink to="/cart" className="relative">
              <img src={Cart} alt="Cart" className="sm:w-7 w-5 cursor-pointer" />
              {totalItems > 0 && (
                <span className="font-poppins absolute -top-1 -right-2 bg-red-600 text-white text-xs font-[500] w-4 h-4 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </NavLink>
          ) : (
            <div
              className="relative cursor-pointer"
              onClick={() => {
                alert("Please login to access your cart.");
                navigate("/signup");
              }}
            >
              <img src={Cart} alt="Cart" className="sm:w-7 w-5" />
              {totalItems > 0 && (
                <span className="font-poppins absolute -top-1 -right-2 bg-red-600 text-white text-xs font-[500] w-4 h-4 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </div>
          )}

          <NavLink to="/wishlist" className="relative">
            <img
              src={Wishlist}
              alt="Wishlist"
              className="sm:w-7 w-5 cursor-pointer"
            />

            {wishlist.length > 0 && (
              <span className="font-poppins absolute -top-1 -right-2 bg-red-600 text-white text-xs font-[500] w-4 h-4 flex items-center justify-center rounded-full">
                {wishlist.length}
              </span>
            )}
          </NavLink>

          {/* Hamburger button - visible only on small screens */}
          <button
            onClick={toggleMenu}
            className="sm:hidden ml-2 text-[#BA4A20] focus:outline-none"
            
          >
            {menuOpen ? (
              <FiX className="w-6 h-6" />
            ) : (
              <FiMenu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="sm:hidden bg-white rounded-md w-6/12  fixed top-[50px] right-0 z-20 shadow-md">
          <ul className="flex flex-col gap-4 p-5">
            {navLinks.map((item, id) => (
              <li key={id}>
                <Link
                  to={item.path}
                  onClick={closeMenu}
                  className="capitalize text-[16px] font-[500] text-[#414141] font-poppins hover:text-[#BA4A20] transition-all duration-300"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default HeaderNavbar;
