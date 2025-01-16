import { useContext } from "react";
import { AuthContext } from "../../../../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import UsePublic from "../../../../Hooks/UsePublic";

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
   

    if (isLoading) return <p>Loading...</p>;

    const member = true;
    const isMember = true;
    console.log(recentPosts)
    return (
        <div className="min-h-screen bg-base-200 p-6">
            <div className="card bg-base-100 shadow-xl p-8">
                {/* User Information */}
                <div className="flex flex-col md:flex-row items-center space-x-6">
                    <img
                        src={user?.photoURL || "https://via.placeholder.com/100"}
                        alt="User Avatar"
                        className="w-24 h-24 rounded-full object-cover border"
                    />
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl font-bold">{user?.displayName || "Anonymous User"}</h1>
                        <p className="text-gray-500">{user?.email || "No email provided"}</p>
                    </div>
                </div>

                {/* Badges Section */}
                <div className="mt-6">
                    <h2 className="text-xl font-semibold">Badges</h2>
                    <div className="flex space-x-4 mt-3">
                        {member && (
                            <div className="badge badge-outline badge-primary text-lg px-4 py-2">
                                🥉 Bronze Badge
                            </div>
                        )}
                        {isMember && (
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
                                    <h3 className="font-bold text-lg">{post.postTitle}</h3>
                                    <p className="text-gray-600 text-sm">
                                        {post.postDescription.length > 100
                                            ? post.postDescription.slice(0, 100) + "..."
                                            : post.postDescription}
                                    </p>
                                    <p className="text-gray-400 text-xs mt-1">
                                        {format(new Date(post?.time), "p")}
                                    </p>
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
