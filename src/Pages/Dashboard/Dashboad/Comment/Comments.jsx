import React, { useState } from "react";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import UsePublic from "../../../../Hooks/UsePublic";
import useAuth from "../../../../Hooks/UseAuth";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const Comments = () => {
    const { id } = useParams();
 
    const axiosPublic = UsePublic()
    const {user}=useAuth()
    const axiosSeure = UseAxiosSecure();

    const { data: comments = [] } = useQuery({
        queryKey: ['comment'],
        queryFn: async () => {
            const { data } = await axiosSeure.get('/comments');
            return data;
        }
    });
    


    const singleData = comments.filter(comment => comment.postId === id);

    const [feedback, setFeedback] = useState({});
    const [reported, setReported] = useState({});
    const [selectedComment, setSelectedComment] = useState("");


    const handleFeedBack = (id, value) => {
        setFeedback((prev) => ({ ...prev, [id]: value }));
    };


    const handleReportComment = async(id, email, Title) => {
        
        const reportData = {
            commentId: id,
            feedback: feedback[id],
            commenter: email,
            PostTitle: Title,
            status:'pending'
        };
        setReported((prev) => ({ ...prev, [id]: true }));
        
        console.log('the report', reportData, );
        const data = await axiosPublic.post('/reported', reportData)
        toast.success("Comment has been reported!");
        
       console.log(data.data);


    };

    return (
        <div className="p-6">
            <Helmet>
                <title> Cm || Comment</title>
            </Helmet>
            <h2 className="text-2xl font-bold mb-4">Comments</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Comment</th>
                            <th>Feedback</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody >
                        {singleData.map((comment) => (
                            <tr key={comment?._id}>
                                <td>{comment?.email}</td>
                                <td>
                                    {comment?.comment?.length > 20 ? (
                                        <>
                                            {comment.comment.slice(0, 20)}...
                                            <button
                                                className="text-blue-500 ml-2"
                                                onClick={() => setSelectedComment(comment.comment)}
                                            >
                                                Read More
                                            </button>
                                        </>
                                    ) : (
                                        comment?.comment
                                    )}
                                </td>
                                <td>
                                    <select
                                        className="select select-bordered w-full max-w-xs"
                                        value={feedback[comment?._id] || ""}
                                        onChange={(e) =>
                                            handleFeedBack(comment?._id, e.target.value)
                                        }
                                    >
                                        <option value="">Select Feedback</option>
                                        <option value="Offensive Content">Offensive Content</option>
                                        <option value="Spam">Spam</option>
                                        <option value="Irrelevant">Irrelevant</option>
                                    </select>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-error"
                                        disabled={!feedback[comment?._id] || reported[comment._id] }
                                        onClick={() => handleReportComment(comment?._id, comment?.email, comment?.Title)}
                                    >
                                        {reported[comment?._id] ? "Reported" : "Report"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal for full comment */}
            {selectedComment && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Full Comment</h3>
                        <p>{selectedComment}</p>
                        <div className="modal-action">
                            <button
                                className="btn"
                                onClick={() => setSelectedComment("")}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Comments;
