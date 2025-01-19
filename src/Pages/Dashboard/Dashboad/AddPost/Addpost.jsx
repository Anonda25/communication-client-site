import React, { useState,  } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../../Hooks/UseAuth";
import { useQuery } from "@tanstack/react-query";
import UsePublic from "../../../../Hooks/UsePublic";

const AddPost = () => {
    const [selectedTag, setSelectedTag] = useState(null);
    const navigate = useNavigate();
    const { user } = useAuth();
    const axiosPublic = UsePublic()
    // const tagOptions = [
    //     { value: "Technology", label: "Technology" },
    //     { value: "Science", label: "Science" },
    //     { value: "Art", label: "Art" },
    //     { value: "Health", label: "Health" },
    //     { value: "Education", label: "Education" },
    // ];
    

    const { data: postData, isLoading } = useQuery({
        queryKey: ["postCount", user?.email],
        queryFn: async () => {
            const { data } = await axiosPublic(`/posts/count/${user?.email}`);
            return data;
        },
    });
    const { data: userInfo = [], } = useQuery({
        queryKey: ["recentPosts",],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/user/${user?.email}`);
            return data;
        },
    });
    const { data: tags = [], } = useQuery({
        queryKey: ["tags",],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/tags`);
            return data;
        },
    });



    const formattedTags = tags.map((tag) => ({
        value: tag.tag, 
        label: tag.tag, 
    }));
    console.log(tags);

    const postCount = postData?.count || 0;
    const isGoldMember = userInfo?.Badge === "Gold";
    const postedData = postCount >= 5;
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.target;
        const image = form.authorImage.value;
        const authorName = form.authorName.value;
        const authorEmail = form.authorEmail.value;
        const postTitle = form.postTitle.value;
        const postDescription = form.postDescription.value;

        const userInfo = {
            image,
            authorName,
            authorEmail,
            postTitle,
            postDescription,
            tag: selectedTag?.value || null,
            upVote: 0,
            downVote: 0,
            userEmail: user?.email,
            userName: user?.displayName,
            time: new Date(),
            userImage:user?.photoURL
        };

        try {
            const response = await axiosPublic.post(`/posts`, userInfo);
            console.log("Post added successfully:", response.data);
            form.reset();
            setSelectedTag(null);
            navigate("/dashboard/my-posts");
        } catch (error) {
            console.error("Error adding post:", error);
        }
    };
    
    
    if (isLoading) return <p>loading....</p>

    
    return (
        <div>
            {isGoldMember || !postedData ? (
                <div className="max-w-md mx-auto mt-10 p-5 bg-gray-100 rounded shadow">
                    <h1 className="text-2xl font-semibold text-center mb-5">Add Post</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="url"
                            name="authorImage"
                            placeholder="Author Image URL"
                            className="w-full p-2 border rounded"
                            required
                        />
                        <input
                            type="text"
                            name="authorName"
                            placeholder="Author Name"
                            className="w-full p-2 border rounded"
                            required
                        />
                        <input
                            type="email"
                            name="authorEmail"
                            placeholder="Author Email"
                            className="w-full p-2 border rounded"
                            required
                        />
                        <input
                            type="text"
                            name="postTitle"
                            placeholder="Post Title"
                            className="w-full p-2 border rounded"
                            required
                        />
                        <textarea
                            name="postDescription"
                            placeholder="Post Description"
                            className="w-full p-2 border rounded"
                            rows="4"
                            required
                        ></textarea>
                        <Select
                            options={formattedTags}
                            placeholder="Select a tag (optional)"
                            isClearable
                            value={selectedTag}
                            onChange={setSelectedTag}
                        />
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
                        >
                            Add Post
                        </button>
                    </form>
                </div>
            ) : (
                <div className="max-w-md mx-auto mt-10 text-center">
                    <p className="mb-4 text-lg font-semibold">
                        You have reached the maximum post limit. Become a member to add more posts.
                    </p>
                    <button
                        onClick={() => navigate("/membership")}
                        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                    >
                        Become a Member
                    </button>
                </div>
            )}
        </div>
        
        
    );
};

export default AddPost;

