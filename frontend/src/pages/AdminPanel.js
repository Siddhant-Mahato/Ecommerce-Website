import React, { useEffect } from 'react'
import { FaRegUser } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from "../common/role"

const AdminPanel = () => {

    const user = useSelector((state) => state.user.user);
    const navigate = useNavigate()


    // Below function when there would be admin logging out then will go to home page

    useEffect(() => {
        if (user?.role !== ROLE.ADMIN)
        {
            navigate("/")
        }
    },[user])

  return (
    <div className="min-h-[calc(100vh-120px)] lg:flex hidden">
        <aside className="bg-white w-full max-w-60 min-h-full customShadow">
            <div className="h-32 flex justify-center items-center flex-col">
            <div className="text-5xl cursor-pointer relative flex justify-center">
                {user?.profilePic ? (
                <img
                    className="rounded-full w-20 h-20"
                    src={user.profilePic}
                    alt={user.name}
                />
                ) : (
                <FaRegUser />
                )}
            </div>
            <p className="capitalize text-lg font-semibold">{user?.name}</p>
            <p className="text-sm">{user?.role}</p>
            </div>

            {/* Naviagtion */}
            <div>
            <nav className="grid p-4 ">
                <Link to={"all-users"} className="px-2 py-1 hover:bg-slate-100">
                    All User's
                </Link>
                <Link to={"all-products"} className="px-2 py-1 hover:bg-slate-100">
                    product
                </Link>
            </nav>
            </div>
        </aside>

        <main className='w-full h-full p-2'>
            <Outlet/>
        </main>
    </div>
  );
}

export default AdminPanel
