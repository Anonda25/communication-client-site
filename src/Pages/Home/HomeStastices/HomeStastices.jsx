import React from "react";
import { FaComment } from "react-icons/fa";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import UsePublic from "../../../Hooks/UsePublic";
const HomeStastices = ({ post,}) => {
    const axiosPublic = UsePublic()
    const {
        UserEmail,
        UserName,
        authorEmail,
        authorName,
        downVote,
        image,
        postDescription, postTitle,
        tag,
        upVote,
        time,
        userImage,
        _id } = post

    const { data: comments = [] , } = useQuery({
        queryKey: ['comments'],
        queryFn: async () => {
            const { data } = await axiosPublic.get('/comments')
            // console.log(data);
            return data
        }
    })

   

    const Comments = comments.filter((comment) => comment.postId === _id);
    return (

        <div className="max-w-md mx-auto bg-white border rounded-lg shadow-md p-4 mb-5">
            {/* Post Image */}
            <img
                src={image}
                alt="Post"
                className="w-full  rounded-lg mb-4"
            />

            <div className="">
                <p className="font-semibold text-gray-800">{UserName}</p>
                <p className="text-sm text-gray-500">
                    Posted by <span className="font-medium">{authorName}</span>
                </p>
            </div>

            {/* post titel */}
            <div>
                <p className="text-2xl mb-3">{postTitle}</p>
            </div>
            {/* Post Content */}
            <p className="mt-3 text-gray-800">
                {postDescription.length > 30
                    ? post.postDescription.substring(0, 300) + "..."
                    : post.postDescription}
            </p>



            <div className="flex justify-between">
                {/* tags */}
                <p className="text-xl font-bold my-3">{tag}</p>
                {/* Time */}
                {time && <p className="text-xl text-gray-500 my-3">{format(new Date(time), "hh:mm:ss a")}</p>}
            </div>
            {/* Actions */}
            <div className="flex items-center  justify-between  text-gray-600">
                <div className="flex items-center justify-between  space-x-4">
                    <button className="flex items-center cursor-pointer border-2 p-2 rounded-md text-green-500">
                        
                        <span className="font-medium"> 👍{upVote}</span>
                    </button>
                    <button className="flex items-center cursor-pointer  border-2 p-2 rounded-md text-red-500 ">
                 
                        <span className="font-medium">👎 {downVote}</span>
                    </button>
                    <button className="flex items-center cursor-pointer border-2 p-2 rounded-md text-green-500 ">
                        <FaComment className="mr-1 text-gray-500 " />{Comments.length}

                    </button>
                </div>
                <div>
                    <Link to={`/post/${_id}`}>
                        <button className=" cursor-pointer border-2 p-3 rounded-md  "> Read more</button>
                    </Link>
                </div>
            </div>
        </div>

    );
};

export default HomeStastices;



