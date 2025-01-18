import { LiaCommentSolid } from "react-icons/lia";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/UseAuth";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import { FaUsers } from "react-icons/fa";
import { BsFilePost } from "react-icons/bs";

const AdminProfile = () => {
    const {user}=useAuth();
    const axiosSecure= UseAxiosSecure()

    const {data:diteals=[]}=useQuery({
        queryKey:['stats'],
        queryFn: async()=>{
            const { data } = await axiosSecure.get('/admin-stats');
            console.log(data);
            return data
        }
    })

    console.log(diteals);
    const handleTagSubmit = (e) => {
        e.preventDefault();
        const tag = e.target.tag.value;
        console.log(tag);
    };
    return (
        <div>
            AdminProfile
            <div>
                <div className="  p-6 bg-white shadow-md rounded-lg">
                    {/* Admin Info */}
                    <div className="flex  items-center gap-6">
                        <img
                            src={user?.photoURL}
                            alt={`${user?.photoURL}'s profile`}
                            className="w-20 h-20 rounded-full border"
                        />
                        <div>
                            <h2 className="text-2xl font-semibold">{user?.displayName}</h2>
                            <p className="text-gray-600">{user?.email}</p>
                        </div>
                    </div>

                    {/* Site Stats */}
                    <div className="mt-6">
                        <div className="flex  lg:flex-row md:flex-row flex-col shadow">
                            <div className="stat">
                                <div className="stat-title">Total Comments</div>
                                <div className="stat-value text-primary  flex gap-3 items-center"><LiaCommentSolid /> {diteals.AllComment}</div>
                            </div>

                            <div className="stat">
                                
                                <div className="stat-title">Total Post</div>
                                <div className="stat-value text-secondary  flex gap-3 items-center"> <BsFilePost />{diteals.AllPost}</div>
                            </div>

                            <div className="stat">
                                <div className="stat-title">Total users</div>
                                <div className="stat-value flex gap-3 items-center"><FaUsers> </FaUsers>{diteals.Alluser}</div>
                            </div>
                        </div>
                    </div>

                    {/* Add Tags */}
                    <div className="mt-8">
                        <h3 className="text-xl font-semibold mb-4">Add Tags</h3>
                        <form onSubmit={handleTagSubmit} className="flex gap-4">
                            <input
                                type="text"
                                placeholder="Enter tag"
                                name="tag"
                                className="flex-1 p-2 border rounded-md focus:outline-none focus:ring focus:ring-green-300"
                            />
                            <button
                                type="submit"
                                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                            >
                                Add Tag
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;