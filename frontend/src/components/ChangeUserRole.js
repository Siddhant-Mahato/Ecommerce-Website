import React, { useState } from 'react'
import ROLE from '../common/role'
import { IoClose } from "react-icons/io5";
import SummaryApi from '../common';
import { toast } from 'react-toastify';


const ChangeUserRole = ({name,email,role,onClose,userId,callFunc}) => {

    const [userRole, setUserRole] = useState(role);


    // The below function will get the user role chnaged
    const handleOnChangeSelect = (e) => {
        setUserRole(e.target.value);
    }


    const updateUserRole = async() => {
        
        const fetchResponse = await fetch(SummaryApi.updateUser.url, {
            method: SummaryApi.updateUser.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },

            body: JSON.stringify({
                userId:userId,
                role: userRole
            })
        })

        const responseData = await fetchResponse.json();

        if (responseData.success) {
            toast.success(responseData.message);
            onClose();
            callFunc(); // Call the parent component's function to refresh the user list.  // replace 'callFunc' with actual function name in your application.
        }

        console.log(responseData);

    }


  return (
    <div className='fixed w-full h-full z-10 flex justify-center items-center top-0 bottom-0 left-0 right-0 bg-slate-200 bg-opacity-40'>
        <div className='max-auto  bg-white shadow-md p-4 w-full max-w-sm'>

            <button className='block ml-auto' onClick={onClose}>
                <IoClose />
            </button>
            
            <h1 className='pb-4 text-lg font-medium '>Change User Role</h1>
            <p>Name : { name }</p>
            <p>Email: {email}</p>
            <div className='flex items-center justify-between my-4'>
                <p>Role</p>
                <select className='border px-4 py-1' value={userRole} onChange={handleOnChangeSelect}>
                    {
                        Object.values(ROLE).map(e1=>{
                            return <option value={e1} key={e1}>{e1}</option>  // replace 'e1' with actual role keys in your application. 
                        })
                    }
                </select>
            </div>
            <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-auto w-fit block' onClick={updateUserRole}>Change Role</button>
        </div>
    </div>
  )
}

export default ChangeUserRole
