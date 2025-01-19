import React from 'react';
import UseAxiosSecure from '../../../../Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaUsers } from 'react-icons/fa';
import { Helmet } from 'react-helmet';

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
    return (
        <div>
            <Helmet>
                <title> Cm || Manage Users</title>
            </Helmet>
           <div>
                <h1 className='text-2xl'>All User</h1>
                <h1 className='text-2xl'>Total User{users.length}</h1>
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