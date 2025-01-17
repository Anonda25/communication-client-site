import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { FaShare } from "react-icons/fa";
import { useState } from "react";
import ShareModal from "../Dashboard/Modal/shareModal";
import UsePublic from "../../Hooks/UsePublic";



const PostCard = () => {
    const { id } = useParams();
    const axiosPublic = UsePublic();
    const [comment, setComment] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false); 
    // Fetch post data
    const { data: post=[], isLoading, refetch } = useQuery({
        queryKey: ["post", id],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/posts/id/${id}`);
            return data;
        },

    });

    const handleUpvote = async () => {
        try {
            await axiosPublic.patch(`/posts/upvote/${id}`);
            refetch();
        } catch (error) {
            console.error("Failed to upvote:", error);
        }
    };

    const handleDownvote = async () => {
        try {
            await axiosPublic.patch(`/posts/downvote/${id}`);
            refetch();
        } catch (error) {
            console.error("Failed to downvote:", error);
        }
    };

    if (isLoading) return <p className="text-center text-lg font-semibold mt-5">Loading...</p>;

    const {
        authorName,
        downVote,
        upVote,
        image,
        postDescription,
        postTitle,
        tag,
        time,
        _id
    } = post;


    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        const commentData = {
            postId: _id,
            comment,
            Name: authorName,
            Title: postTitle
        };
        await axiosPublic.post(`/comments`, commentData)
        setComment("");
    };

    // Dynamic share URL
    const shareUrl = `${window.location.origin}/post/${postTitle}`;
    return (
        <div className="max-w-lg mx-auto my-2 p-6 bg-white shadow-lg rounded-lg">
            {/* Post Image */}
            {image && (
                <img
                    src={image}
                    alt={postTitle || "Post Image"}
                    className="w-full h-64 object-cover rounded-lg mb-4"
                />
            )}
            {/* Author Information */}
            <div className="flex items-center mb-2">
                <div className="mr-3">
                    <span className="block font-medium text-gray-700">Author: {authorName}</span>
                    <span className="text-sm text-gray-500"></span>
                </div>
            </div>

            {/* Post Title */}
            <h2 className="text-2xl font-bold mb-2 text-gray-800">{postTitle}</h2>

            <div className="flex justify-between">
                {/* Tag */}
                {tag && (
                    <p className=" bg-blue-100 text-blue-800 py-2 px-3 rounded-full  font-semibold  ">
                        {tag}
                    </p>
                )}
                {/* Time */}
                {time && <p className="text-sm text-gray-500 mb-5">{format(new Date(time), "hh:mm:ss a")}</p>}
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-4">{postDescription}</p>



            {/* Votes */}
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4 ">
                    <button
                        onClick={handleUpvote}
                        className="text-green-600 font-medium border p-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                        👍 {upVote}
                    </button>
                    <button
                        onClick={handleDownvote}
                        className="text-red-600 font-medium border p-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                        👎 {downVote}
                    </button>
                </div>
                <div>
                    <button onClick={() => setIsModalOpen(true)}  className=" font-medium border px-4 py-3 bg-gray-200 rounded hover:bg-gray-300">
                        <FaShare className="mr-1 text-gray-500" />
                    </button>
                </div>
            </div>
            <form onSubmit={handleCommentSubmit} className="form-control mt-4">
                <label className="label">
                    <span className="label-text">Comment</span>
                </label>
                <textarea
                    className="textarea textarea-info"
                    placeholder="Type your comment"
                    value={comment} 
                    onChange={(e) => setComment(e.target.value)} 
                    required
                ></textarea>
                <div className="mt-2">
                    <button type="submit" className="btn w-full">Submit</button>
                </div>
            </form>

            {/* Share Modal */}
            {isModalOpen && <ShareModal shareUrl={shareUrl} onClose={() => setIsModalOpen(false)} />}
        </div>
    );
};

export default PostCard;

