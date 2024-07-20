import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { navigation } from "./navigation";
import "./Header.css";
import User from "../assets/user.png";

function Header() {
  const location = useLocation();
  const removeSpace = location?.search?.slice(3)?.split("%20")?.join(" ");

  const [searchInput, setSearchInput] = useState(removeSpace);
  const navigate = useNavigate();

  useEffect(() => {
    setSearchInput(removeSpace);
  }, [removeSpace]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput) {
      navigate(`/search?q=${searchInput}`);
    }
  };

  return (
    <div className="header fixed top-0 w-full h-16 bg-black bg-opacity-75 z-40 px-4 sm:px-7 md:px-24">
      <div className="hleft h-full">
        <Link to="/">
          <h1>
            <span>T</span>MOVIES<span>2</span>
          </h1>
        </Link>
        <nav className="hidden lg:flex items-center gap-1 ml-5 text-white font-bold">
          {navigation.map((nav, index) => (
            <div key={nav.label + "header" + index}>
              <NavLink
                to={nav.href}
                className={({ isActive }) =>
                  `px-2 hover:text-green-500 ${isActive && "text-neutral-100"}`
                }
              >
                {nav.label}
              </NavLink>
            </div>
          ))}
        </nav>
      </div>
      <div className="ml-auto flex items-center gap-5 text-white">
        <form className="flex items-center gap-2" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search here..."
            className="bg-transparent px-4 py-1 outline-none border-none hidden lg:block"
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
          />
          <button className="text-2xl text-white" type="submit">
            <IoSearchOutline />
          </button>
        </form>
        <div className="w-8 h-8 rounded-full overflow-hidden cursor-pointer active:scale-50 transition-all">
          <img src={User} alt="User" width="100%" height="100%" />
        </div>
      </div>
    </div>
  );
}

export default Header;
