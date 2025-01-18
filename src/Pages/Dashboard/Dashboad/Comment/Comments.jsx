import React, { useState } from 'react';

const Comments = () => {
    const [comments, setComments] = useState([
        {
            id: 1,
            email: 'cy.ganderton@example.com',
            text: 'Great post! Loved the insights.',
            feedback: '',
            reported: false,
        },
        {
            id: 2,
            email: 'hart.hagerty@example.com',
            text: 'I have some questions about the topic.',
            feedback: '',
            reported: false,
        },
        {
            id: 3,
            email: 'brice.swyre@example.com',
            text: 'Thanks for sharing this information.',
            feedback: '',
            reported: false,
        },
    ]);

    const feedbackOptions = [
        'Inappropriate Content',
        'Spam',
        'Harassment',
    ];

    const handleFeedbackChange = (id, feedback) => {
        setComments((prevComments) =>
            prevComments.map((comment) =>
                comment.id === id ? { ...comment, feedback } : comment
            )
        );
    };

    const handleReport = (id) => {
        setComments((prevComments) =>
            prevComments.map((comment) =>
                comment.id === id ? { ...comment, reported: true } : comment
            )
        );
    };

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* Head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Email</th>
                            <th>Comment</th>
                            <th>Feedback</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {comments.map((comment) => (
                            <tr key={comment.id} className="bg-base-200">
                                <th>{comment.id}</th>
                                <td>{comment.email}</td>
                                <td>{comment.text}</td>
                                <td>
                                    <select
                                        className="select select-bordered"
                                        value={comment.feedback}
                                        onChange={(e) =>
                                            handleFeedbackChange(comment.id, e.target.value)
                                        }
                                    >
                                        <option value="" disabled>
                                            Select Feedback
                                        </option>
                                        {feedbackOptions.map((option, index) => (
                                            <option key={index} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-error"
                                        onClick={() => handleReport(comment.id)}
                                        disabled={comment.reported || !comment.feedback}
                                    >
                                        {comment.reported ? 'Reported' : 'Report'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Comments;
