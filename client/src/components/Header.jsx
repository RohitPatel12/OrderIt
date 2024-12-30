import React, { useLayoutEffect, useState } from "react";
import logo from "../assets/logo.png";
import Search from './Search.jsx'
import {Link, useLocation, useNavigate } from 'react-router-dom'
import { FaRegUser } from "react-icons/fa";
import useMobile from "../hooks/useMobile";
import { IoCartOutline } from "react-icons/io5";
import { BsCart4 } from "react-icons/bs";
import { useSelector } from "react-redux";
import UserMenu from "./UserMenu.jsx";
import { GoTriangleDown, GoTriangleUp  } from "react-icons/go";
// const { totalPrice, totalQty} = useGlobalContext()

const Header = () => {
  const [openCartSection,setOpenCartSection] = useState(false)
  const [ isMobile ] = useMobile()
  const location = useLocation()
  const navigate = useNavigate()
  // const user = useSelector((state)=>state?.user)
  const user = useSelector((state) => {
    // console.log("Redux state:", state);
    return state?.user;
  });
  // console.log("User details", user)
  const [openUserMenu, setOpenUserMenu] = useState(false)
  const isSearchPage = location.pathname === '/search'
  // const cartItem = useSelector(state => state.cartItem.cart)
  const redirectTOLoginPage = () => {
      navigate("/login")
  }
  const handleCloseUserMenu = () => {
    setOpenUserMenu(false)
  }

  const handleMobileUser = () => {
      if(!user._id){
        navigate("/login")
        return
      }
      navigate("/user")
  }

  return (
    <header className="h-24 lg:h-20 shadow-md sticky top-0 flex flex-col justify-center gap-1">
        {
          !(isSearchPage && isMobile) && (
            <div className="container mx-auto flex items-center px-2 justify-between">
        <div className="h-full">
          <Link to={"/"} className="h-full flex justify-center items-center">
            {/** logo */}
            <img
              src={logo}
              width={170}
              height={60}
              alt="logo"
              className="hidden lg:block"
            />
            <img
              src={logo}
              width={110}
              height={60} 
              alt="logo"
              className=" lg:hidden"
            />
          </Link>
        </div>

        {/** search */}
        <div className="hidden lg:block"> 
          <Search/>
        </div>

        {/** login and cart */}
        <div>
          <button className="text-neutral-600 lg:hidden" onClick={handleMobileUser}>
          <FaRegUser size={25}/>
          </button>
          <div className="hidden lg:flex items-center gap-10">
          {/*<button onClick={redirectTOLoginPage} className="text-lg px-2" to={"/login"} >
          login
          </button>
          **/}
          {/**Desktop**/}
          <div className='hidden lg:flex  items-center gap-10 cursor-pointer'>
                                        {
                                            user?._id ? (
                                                <div className='relative'>
                                                    <div onClick={()=>setOpenUserMenu(prev => !prev)} className='flex select-none items-center gap-1 cursor-pointer'>
                                                        <p>Account</p>
                                                        {
                                                            openUserMenu ? (
                                                                  <GoTriangleUp size={25}/> 
                                                            ) : (
                                                                <GoTriangleDown size={25}/>
                                                             )
                                                        }
                                                       
                                                    </div>
                                                    {
                                                        openUserMenu && (
                                                            <div className='absolute right-0 top-12'>
                                                                <div className='bg-white rounded p-4 min-w-52 lg:shadow-lg'>
                                                                    <UserMenu close={handleCloseUserMenu}/>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                    
                                                </div>
                                            ) : (
                                                <button onClick={redirectTOLoginPage} className='text-lg px-2'>Login</button>
                                            )
                                        }
                                        {/* <button onClick={()=>setOpenCartSection(true)} className='flex items-center gap-2 bg-green-800 hover:bg-green-700 px-3 py-2 rounded text-white'>
                                            {/**add to card icons *
                                            <div className='animate-bounce'>
                                                <BsCart4 size={26}/>
                                            </div>
                                            <div className='font-semibold text-sm'>
                                                {
                                                    cartItem[0] ? (
                                                        <div>
                                                            <p>{totalQty} Items</p>
                                                            <p>{DisplayPriceInRupees(totalPrice)}</p>
                                                        </div>
                                                    ) : (
                                                        <p>My Cart</p>
                                                    )
                                                }
                                            </div>    
                                        </button> */}
          </div>
            {/* Add to cart**/}
          <button className="flex items-center gap-2 bg-secondary hover:bg-green-800 px-1 py-1 rounded text-white">
            <div className="animate-bounce">
            <IoCartOutline size={28} />
            </div>
            <div  className="font-semibold">
              <p>my cart</p>
            </div>
          </button>
          </div>
          </div>
        </div>
          )
        }
      
      <div className="container mx-auto px-2 lg:hidden">
        <Search/>
      </div>
    </header>
  );
};

export default Header;
