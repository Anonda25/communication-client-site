import { useForm } from "react-hook-form";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const Announcement= () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const axiosSecure =UseAxiosSecure()
    const onSubmit = (data) => {
        console.log("Form Data:", data);
        
        axiosSecure.post('/Announcements', data)
        .then(res =>{
            console.log(res.data);
            toast.success("Your announcement has been submitted!");
        })
        
        reset();
    };

    return (
        <div className=" p-6 bg-white rounded-md shadow-md">
            <Helmet>
                <title> Cm || Make Announcement</title>
            </Helmet>
            <h1 className="text-2xl font-bold text-center mb-4">Create an Announcement</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Author Image */}
                <div>
                    <label htmlFor="authorImage" className="block text-sm font-medium text-gray-700">
                        Author Image URL
                    </label>
                    <input
                        type="text"
                        id="authorImage"
                        {...register("authorImage", { required: "Image URL is required" })}
                        placeholder="Enter image URL"
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 ${errors.authorImage ? "border-red-500" : ""
                            }`}
                    />
                    {errors.authorImage && (
                        <span className="text-sm text-red-500">{errors.authorImage.message}</span>
                    )}
                </div>

                {/* Author Name */}
                <div>
                    <label htmlFor="authorName" className="block text-sm font-medium text-gray-700">
                        Author Name
                    </label>
                    <input
                        type="text"
                        id="authorName"
                        {...register("authorName", { required: "Author name is required" })}
                        placeholder="Enter your name"
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 ${errors.authorName ? "border-red-500" : ""
                            }`}
                    />
                    {errors.authorName && (
                        <span className="text-sm text-red-500">{errors.authorName.message}</span>
                    )}
                </div>

                {/* Title */}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        {...register("title", { required: "Title is required" })}
                        placeholder="Enter a title"
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 ${errors.title ? "border-red-500" : ""
                            }`}
                    />
                    {errors.title && (
                        <span className="text-sm text-red-500">{errors.title.message}</span>
                    )}
                </div>

                {/* Description */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        id="description"
                        {...register("description", { required: "Description is required" })}
                        placeholder="Write your description here"
                        rows="4"
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 ${errors.description ? "border-red-500" : ""
                            }`}
                    ></textarea>
                    {errors.description && (
                        <span className="text-sm text-red-500">{errors.description.message}</span>
                    )}
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
                    >
                        Submit Announcement
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Announcement;
