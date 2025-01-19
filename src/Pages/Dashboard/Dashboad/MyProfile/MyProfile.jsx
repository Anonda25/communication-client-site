import { useContext } from "react";
import { AuthContext } from "../../../../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import UsePublic from "../../../../Hooks/UsePublic";
import { Helmet } from "react-helmet";

const MyProfile = () => {
    const { user } = useContext(AuthContext);
    const axiosPublic = UsePublic()
    // Fetch user's recent posts
    const { data: recentPosts = [], isLoading } = useQuery({
        queryKey: ["recentPosts", user?.email],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/posts/email/${user?.email}`);
            return data;
        },
    });


    const { data: users = [],  } = useQuery({
        queryKey: ["recentPosts", ],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/user/${user?.email}`);
            return data;
        },
    });
  
   


    if (isLoading) return <p>Loading...</p>;

    const member = users?.Badge;
    
    console.log(users);
    return (
        <div className=" bg-base-200 p-6">
            <Helmet>
                <title> Cm || My Profile</title>
            </Helmet>
            <div className="card bg-base-100 shadow-xl p-8">
                {/* User Information */}
                <div className="flex flex-col md:flex-row items-center space-x-6">
                    <img
                        src={users?.image || "https://via.placeholder.com/100"}
                        alt="User Avatar"
                        className="w-24 h-24 rounded-full object-cover border"
                    />
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl font-bold">{users?.name || "Anonymous User"}</h1>
                        <p className="text-gray-500">{users?.email || "No email provided"}</p>
                    </div>
                </div>

                {/* Badges Section */}
                <div className="mt-6">
                    <h2 className="text-xl font-semibold">Badges</h2>
                    <div className="flex space-x-4 mt-3">
                        {member === "Bronze" && (
                            <div className="badge badge-outline badge-primary text-lg px-4 py-2">
                                🥉 Bronze Badge
                            </div>
                        )}
                        {/* Gold Badge */}
                        {member === "Gold" && (
                            <div className="badge badge-outline badge-warning text-lg px-4 py-2">
                                🥇 Gold Badge
                            </div>
                        )}
                    </div>
                </div>

                {/* Recent Posts */}
                <div className="mt-8">
                    <h2 className="text-xl font-semibold">My Recent Posts</h2>
                    {recentPosts.length > 0 ? (
                        <div className="space-y-4 mt-4">
                            {recentPosts.slice(0, 3).map((post) => (
                                <div
                                    key={post._id}
                                    className="p-4 border rounded-md shadow-sm bg-base-200"
                                >
                                    <div className="hero bg-base-200 ">
                                        <div className="hero-content flex-col lg:flex-row-reverse gap-5">
                                            <img
                                                src={post.image}
                                                className="w-[200px]  rounded-lg shadow-2xl" />
                                            <div className="space-y-3">
                                                <h3 className="font-bold text-lg">{post.postTitle}</h3>
                                                <p className="text-gray-600 text-sm w-3/4">
                                                    {post.postDescription.length > 100
                                                        ? post.postDescription.slice(0, 100) + "..."
                                                        : post.postDescription}
                                                </p>
                                                <p className="text-gray-400 text-xs mt-1">
                                                   Post Time: {format(new Date(post?.time), "p")}
                                                </p>
                                                <div className=" flex gap-5 items-center">
                                                    <p>Author Name : {post.authorName}</p>
                                                    <p>Author Email : {post.authorEmail}</p>
                                                </div>

                                                <div className=" flex gap-4 items-center">
                                                    <button className="flex items-center cursor-pointer border-2 p-2 rounded-md text-green-500">

                                                        <span className="font-medium"> 👍{post.upVote}</span>
                                                    </button>
                                                    <button className="flex items-center cursor-pointer  border-2 p-2 rounded-md text-red-500 ">

                                                        <span className="font-medium">👎 {post.downVote}</span>
                                                    </button>
                                                </div>
                                                <p>Tag : {post.tag}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 mt-4">You haven't posted anything yet.</p>
                    )}
                </div>
            </div>
        </div>
        
    );
};

export default MyProfile;
