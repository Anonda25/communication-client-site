import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../../Hooks/UseAuth";
import { useNavigate } from "react-router-dom";
import UsePublic from "../../../../Hooks/UsePublic";

const MyPost = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const axiosPublic=UsePublic()
   
    // Fetch posts for the current user
    const { data: posts = [], isLoading,refetch } = useQuery({
        queryKey: ["posts", user?.email],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/posts/email/${user?.email}`);
            return data;
        }
    });

    

    const handleDelete = (postId) => {
        console.log(postId);
        axiosPublic.delete(`/posts/${postId}`)
        .then(res =>{
            console.log(res.data);
            refetch()
        })
    };

    if (isLoading) {
        return <p>Loading your posts...</p>;
    }

   
    return (
        <div className="max-w-4xl mx-auto mt-10 p-5 bg-gray-100 rounded shadow">
            <h1 className="text-2xl font-semibold text-center mb-5">My Posts</h1>
            {posts.length === 0 ? (
                <p className="text-center text-gray-600">You haven't added any posts yet.</p>
            ) : (
                <table className="table-auto w-full text-left bg-white rounded shadow">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2">Post Title</th>
                            <th className="px-4 py-2">Votes</th>
                            <th className="px-4 py-2">Comment</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((post) => (
                            <tr key={post._id} className="border-t">
                                <td className="px-4 py-2">{post.postTitle}</td>
                                <td className="px-4 py-2">{post.upVote || 0}</td>
                                <td>
                                    <button
                                        onClick={() => navigate(`/comments/${post._id}`)}
                                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    >
                                        Comments
                                    </button>
                                    

                                </td>
                                <td className="px-4 py-2 flex gap-2">
                                    
                                    <button
                                        onClick={() => handleDelete(post._id)}
                                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default MyPost;
