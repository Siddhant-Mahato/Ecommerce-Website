// import React from 'react'
// import Logo from './Logo'
// import { IoSearchOutline } from "react-icons/io5";
// import { FaRegUser } from "react-icons/fa";
// import { MdOutlineShoppingCart } from "react-icons/md";
// import { Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import SummaryApi from '../common';
// import { toast } from 'react-toastify';
// import { setUserDetails } from '../store/userSlice';



// const Header = () => {

//   const user = useSelector((state) => state?.user?.user)
//   const dispatch = useDispatch();

//   const handleLogout = async() => {
//     const fetchData = await fetch(SummaryApi.user_Logout.url, {
//       method: SummaryApi.user_Logout.method,
//       credentials:'include'
//     })

//     const data = await fetchData.json()

//     if (data.success) {
//       toast.success(data.message)
//       dispatch(setUserDetails(null));  // when user logout page's data will go off
//     }

//     if (data.error) {
//       toast.error(data.message)
//     }

//   }

  
  
//   return (
//     <header className={`h-16 shadow-md bg-white`}>
//       <div className=" h-full flex items-center container mx-auto px-4 justify-between">
//         <div className="">
//           <Link to={"/"}>
//             <Logo w={63} h={10}></Logo>
//           </Link>
//         </div>

//         <div
//           className={` hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2`}
//         >
//           <input
//             className=" w-full outline-none"
//             type="text"
//             placeholder="Search Products Here..."
//           />
//           <div className="bg-red-600 text-lg min-w-[50px] flex items-center justify-center h-8 rounded-r-full text-white">
//             <IoSearchOutline />
//           </div>
//         </div>

//         <div className={` flex items-center gap-7`}>
//           <div className={`text-2xl cursor-pointer`}>
//             {user?.profilePic ? (
//               <img
//                 className="rounded-full w-10 h-10"
//                 src={user?.profilePic}
//                 alt={user?.name}
//               />
//             ) : (
//               <FaRegUser />
//             )}
//           </div>

//           <div className={`text-2xl cursor-pointer relative `}>
//             <span>
//               <MdOutlineShoppingCart />
//             </span>
//             <div
//               className={`bg-red-600 text-white w-5 h-5 p-1 flex items-center justify-center rounded-full absolute -top-2 -right-2`}
//             >
//               <p className="text-sm">0</p>
//             </div>
//           </div>

//           <div>
//             {user?._id ? (
//               <button
//                 className={`px-3 py-1 rounded-full text-white hover:bg-red-700  bg-red-600 `}
//                 onClick={handleLogout}
//               >
//                 Logout
//               </button>
//             ) : (
//               <Link
//                 to={"/login"}
//                 className={`px-3 py-1 rounded-full text-white hover:bg-red-700  bg-red-600 `}
//               >
//                 Login
//               </Link>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

// export default Header


import React, { useContext, useState } from "react";
import Logo from "./Logo";
import { IoSearchOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../common/role";
import UserContext from "../context";

const Header = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const [menuDisplay, setMenuDisplay] = useState(false)
  
  const context = useContext(UserContext)
  
  const navigate = useNavigate()

  const searchInput = useLocation()
  
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll("q");
  const [search, setSearch] = useState(searchQuery);
  // const [search, setSearch] = useState(searchInput?.search.split("=")[1]);

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.user_Logout.url, {
      method: SummaryApi.user_Logout.method,
      credentials: "include",
    });

    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null)); // Clear user data on logout
      navigate("/");
    }
    else {
      toast.error(data.message);
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;

    setSearch(value)
    
    if (value)
    {
      navigate(`/search?q=${value}`)
    }
    else
    {
      navigate("/search")
    }
  }

  return (
    <header className="h-16 shadow-md bg-white fixed w-full z-40">
      <div className="h-full flex items-center container mx-auto px-4 justify-between">
        <div>
          <Link to="/">
            <Logo w={63} h={10} />
          </Link>
        </div>

        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2">
          <input
            className="w-full outline-none"
            type="text"
            placeholder="Search Products Here..."
            onChange={handleSearch}
            value={search}
          />
          <div className="bg-red-600 text-lg min-w-[50px] flex items-center justify-center h-8 rounded-r-full text-white">
            <IoSearchOutline />
          </div>
        </div>
        <div className="flex items-center gap-7">
          {/* Menu for user */}
          <div className="relative flex justify-center ">
            {user?._id && (
              <div
                className="text-3xl cursor-pointer relative flex justify-center"
                onClick={() => setMenuDisplay((prev) => !prev)}
              >
                {user?.profilePic ? (
                  <img
                    className="rounded-full w-10 h-10"
                    src={user.profilePic}
                    alt={user.name}
                  />
                ) : (
                  <FaRegUser />
                )}
              </div>
            )}

            {/*this is for popUp profile || 3:58:00 - Can See || 4:25:00 {fetching data from backend for all user's} || */}

            {menuDisplay && (
              <div className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded hidden md:block">
                <nav>
                  {user?.role === ROLE.ADMIN && (
                    <Link
                      to={"/admin-panel/all-products"}
                      className="whitespace-nowrap hover:bg-slate-100 p-2 "
                      onClick={() => setMenuDisplay((prev) => !prev)}
                    >
                      Admin Panel
                    </Link>
                  )}

                  <Link
                    to={"/order"}
                    className="whitespace-nowrap hidden md:block hover:bg-slate-100 p-2"
                    onClick={() => setMenuDisplay((preve) => !preve)}
                  >
                    Order
                  </Link>
                </nav>
              </div>
            )}
          </div>

          {user?._id && (
            <Link to={"cart"} className="text-2xl cursor-pointer relative">
              <span>
                <MdOutlineShoppingCart />
              </span>

              <div className="bg-red-600 text-white w-5 h-5 p-1 flex items-center justify-center rounded-full absolute -top-2 -right-2">
                <p className="text-sm">{context?.cartProductCount}</p>
              </div>
            </Link>
          )}

          <div>
            {user?._id ? (
              <button
                className="px-3 py-1 rounded-full text-white hover:bg-red-700 bg-red-600"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="px-3 py-1 rounded-full text-white hover:bg-red-700 bg-red-600"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
