import { LiaCommentSolid } from "react-icons/lia";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/UseAuth";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import { FaUsers } from "react-icons/fa";
import { BsFilePost } from "react-icons/bs";
import { PieChart } from "react-minimal-pie-chart";
import UsePublic from "../../../../Hooks/UsePublic";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";

const AdminProfile = () => {
    const { user } = useAuth();
    const axiosSecure = UseAxiosSecure();
    const axiosPublic = UsePublic()
    const { register, handleSubmit, reset } = useForm()

    const { data: comments = [], isLoading: loading } = useQuery({
        queryKey: ['comment'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/comments');
            return data;
        },
    });

    const { data: users = [] } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/users');
            return data;
        },
    });

    const { data: posts = [],   } = useQuery({
        queryKey: ["posts"],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/posts');
            return data;
        },
    });



    const onSubmit = async (tag) => {

        try {
            await axiosPublic.post('/tags', tag)
            
            toast.success('add the tags successfully',);
            reset()

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <Helmet>
                <title> Cm || Admin Profile</title>
            </Helmet>
            <div>
                <div className="p-6 bg-white shadow-md rounded-lg">
                    {/* Admin Info */}
                    <div className="flex items-center gap-6">
                        <img
                            src={user?.photoURL}
                            alt={`${user?.displayName}'s profile`}
                            className="w-20 h-20 rounded-full border"
                        />
                        <div>
                            <h2 className="text-2xl font-semibold">{user?.displayName}</h2>
                            <p className="text-gray-600">{user?.email}</p>
                        </div>
                    </div>

                    {/* Site Stats */}
                    <div className="mt-6">
                        <div className="flex lg:flex-row md:flex-row flex-col shadow">
                            <div className="stat">
                                <div className="stat-title">Total Comments</div>
                                <div className="stat-value text-primary flex gap-3 items-center">
                                    <LiaCommentSolid /> {comments.length}
                                </div>
                            </div>

                            <div className="stat">
                                <div className="stat-title">Total Posts</div>
                                <div className="stat-value text-secondary flex gap-3 items-center">
                                    <BsFilePost /> {posts.length}
                                </div>
                            </div>

                            <div className="stat">
                                <div className="stat-title">Total Users</div>
                                <div className="stat-value flex gap-3 items-center">
                                    <FaUsers /> {users.length}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Pie Chart */}
                    <div className="flex justify-center mt-8">
                        <PieChart
                            data={[
                                { title: 'Posts', value: posts.length || 0, color: '#4CAF50' },
                                { title: 'Comments', value: comments.length || 0, color: '#FFC107' },
                                { title: 'Users', value: users.length || 0, color: '#2196F3' },
                            ]}
                            radius={50}
                            label={({ dataEntry }) => `${dataEntry.title}: ${dataEntry.value}`}
                            labelStyle={{
                                fontSize: '5px',
                                fill: '#000',
                                fontWeight: 'bold',
                            }}
                            animate
                            animationDuration={1000}
                            animationEasing="ease-out"
                            style={{ height: '250px', width: '250px' }}
                        />
                    </div>

                    {/* Add Tags */}
                    <div className="mt-8">
                        <h3 className="text-xl font-semibold mb-4">Add Tags</h3>
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">

                            <div className="flex justify-between items-center">
                                <div className="form-control flex-1">
                                    <label className="label">
                                        <span className="label-text">Tags</span>
                                    </label>
                                    <input
                                        {...register("tag", { required: true })}
                                        type="text"
                                        name="tag"
                                        placeholder="tags"
                                        className="input input-bordered w-full"
                                        required />

                                </div>
                                <div className="form-control mt-9 ml-3">
                                    <button className="btn btn-primary ">Submit</button>

                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;
