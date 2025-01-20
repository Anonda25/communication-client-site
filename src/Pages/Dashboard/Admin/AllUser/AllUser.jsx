import React, { useState } from 'react';
import UseAxiosSecure from '../../../../Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaUsers } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import DynamicTitle from '../../../../Components/DynamicTitle';
import Loading from '../../../../Components/Loading';

const AllUser = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const axiosSecure = UseAxiosSecure()
    // Fetch posts for the current user
    const { data: users = [], refetch } = useQuery({
        queryKey: ["users", searchTerm ],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/users?name=${searchTerm}`,);
            return data;
        }
    });

    const handlemakeAdmin=(user)=>{
         axiosSecure.patch(`/users/admin/${user._id}`)
         .then(res=>{
            // console.log(res.data);
             refetch()
         })
    }
   
    const handleshearch=(e)=>{
        const data = e.target.value;
        console.log(data);
        setSearchTerm(data)
    }
    // console.log(users);
    return (
        <div>
            <Helmet>
                <title> Cm || Manage Users</title>
            </Helmet>
            <div>
                <DynamicTitle heading="All User" subTitle="Total User"></DynamicTitle>
            </div>
            <div className=' my-2'>
                <input
                    type="text"
                    placeholder="Search by username"
                    value={searchTerm}
                    onChange={handleshearch}
                    className="border border-gray-300 rounded px-3 py-2 w-80"
                />
            </div>
           

           <div>
                <div className="overflow-x-scroll">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Make admin</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user, ind) => <tr key={user._id} className="bg-base-200">
                                    <th>{ind+1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        {
                                            user.role === 'admin' ? 'Admin' : <button  className='bg-orange-500 text-xl p-4 rounded-md' onClick={() => handlemakeAdmin(user)}>
                                              <FaUsers></FaUsers>  
                                            </button>
                                        }
                                        

                                    </td>
                                    <td >{user.Badge}</td>
                                </tr>)
                            }
                            
                           
                        </tbody>
                    </table>
                </div>
           </div>
        </div>
    );
};

export default AllUser;