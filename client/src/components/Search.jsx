import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { FaArrowLeft } from "react-icons/fa6";
import useMobile from "../hooks/useMobile";

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchPage, setIsSearchPage] = useState(false);
  const [ isMobile ] = useMobile()

  useEffect(() => {
    const isSearchPage = location.pathname === "/search";
    setIsSearchPage(isSearchPage);
  }, [location]);

  const redirectToSearchPage = () => {
    navigate("/search");
  };

  return (
    <div className="w-full  min-w-[300px] lg:min-w[420px] h-12 rounded-md border overflow-hidden flex items-center text-neutral-500 bg-slate-50 group-focus-within:outline-primary">
      <div>
      

      {
        (isMobile && isSearchPage) ? (
          <Link to={"/"} className="flex justify-center items-center h-full p-2 m-1 group-focus-within:text-primary bg-white rounded-full shadow">
          <FaArrowLeft size={22} />
          </Link>
        ) : (
            <button className="flex justify-center items-center h-full p-3 group-focus-within:text-primary">
        <IoIosSearch size={22} />
            </button>
        )
      }

       
      </div>
      <div className="w-full h-full">
        {
        !isSearchPage ? (
            // not in search page 
            <div onClick={redirectToSearchPage} className="w-full h-full flex items-center">
        <TypeAnimation
          sequence={[
            // Same substring at the start will only be typed out once, initially
            'Search "milk"',
            1000, // wait 1s before replacing "Mice" with "Hamsters"
            'Search "bread"',
            1000,
            'Search "sugar"',
            1000,
            'Search "paneer"',
            1000,
          ]}
          wrapper="span"
          speed={50}
          repeat={Infinity}
        />
      </div>
        ) : (
            <div className="w-full h-full">
                <input
                type="text"
                placeholder="Seach for an item "
                autoFocus
                className="bg-transparent w-full h-full outline-none"
                />
            </div>   
        )
        }
      </div>
      
    </div>
  );
};

export default Search;
