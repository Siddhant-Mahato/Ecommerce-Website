import React, { useEffect, useState } from 'react'
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import moment from 'moment';
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole';


const AllUsers = () => {
    
    const [allUsers, setAllUsers] = useState([]);

    const [openUpdateRole, setOpenUpdateRole] = useState(false);

    const [updateUserDetails, setUpdateUserDetails] = useState({
        email: '',
        role: '',
        name: '',
        _id: ''
    })


    const fetchAllUsers = async () => {
        const fetchData = await fetch(SummaryApi.allUsers.url, {
            method: SummaryApi.allUsers.method,
            credentials: 'include'
        })

        const dataResponse = await fetchData.json();

        if (dataResponse.success) {
            setAllUsers(dataResponse.data);
        }

        if (dataResponse.error) {
            toast.error(dataResponse.message);
        }

        console.log(dataResponse);
    }

    useEffect(() => {
        fetchAllUsers();
    }, [])

    return (
        <div className='bg-white pb-4'>
            <h1>All Users</h1>
            <table className='w-full userTable'>
                <thead>
                    <tr className='bg-black text-white'>
                        <th>S.no</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Created Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody className=''>
                    {
                        allUsers.map((e1, index) => {
                        return (
                            <tr key={e1._id}>
                                <td>{index + 1}</td>
                                <td>{e1?.name}</td>
                                <td>{e1?.email}</td>
                                <td>{e1?.role}</td>
                                <td>{moment(e1?.createdAt).format("ll")}</td>  {/* make date format Perfect || 4:52:00 */}
                                <td>
                                    <button className='bg-green-200 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white' onClick={() => {
                                        setUpdateUserDetails(e1)
                                        setOpenUpdateRole(true)
                                    }} 
                                    >
                                        <MdModeEdit />
                                    </button>  {/* yaha as koe bhi pr click to whi user data as each associated to res user via map */}
                                </td>
                            </tr>
                        );})
                    }
    
                </tbody>
            </table>

            {/* To open the Component of Channging Role */}

            {
                openUpdateRole &&(
                    <ChangeUserRole
                        onClose={() => setOpenUpdateRole(false)}
                        name={updateUserDetails.name} 
                        email={updateUserDetails.email}
                        role={updateUserDetails.role}
                        userId={updateUserDetails._id}
                        callFunc = {fetchAllUsers}
                    />
                )
            }


           
        </div>
    )
}

export default AllUsers
