import React from 'react';
import UseAxiosSecure from '../../../../Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaUsers } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import DynamicTitle from '../../../../Components/DynamicTitle';
import Loading from '../../../../Components/Loading';

const AllUser = () => {

    const axiosSecure = UseAxiosSecure()
    // Fetch posts for the current user
    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ["users", ],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/users',);
            return data;
        }
    });

    const handlemakeAdmin=(user)=>{
         axiosSecure.patch(`/users/admin/${user._id}`)
         .then(res=>{
            console.log(res.data);
             refetch()
         })
    }
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <Helmet>
                <title> Cm || Manage Users</title>
            </Helmet>
            <div>
                <DynamicTitle heading="All User" subTitle="Total User"></DynamicTitle>
            </div>
            <div className=' my-2'>
                <input type="text" placeholder="Type The user Name" className="input input-bordered w-full max-w-xs" />
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