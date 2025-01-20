import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../Hooks/UseAuth";
import toast from "react-hot-toast";
import UsePublic from "../Hooks/UsePublic";
import SocialLogin from "../Hooks/SocialLogin";
import img from "../assets/signIn.jpg"
import { Helmet } from "react-helmet-async";
const SignUp = () => {
    const axiosPublic = UsePublic()

    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { handleRegister, updateUserProfile, user } = useAuth();

    // On submit, handle form data and image upload
    const onSubmit = async (value) => {
        const { email, password, name, file } = value;
        console.log(value);
        const image = file[0];
        const formData = new FormData();
        formData.append('image', image);

        // Upload image to imgBB
        const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMBB_KEY}`, formData);
        const image_url = data.data.display_url;

        try {

            const response = await axiosPublic.post(`/users`, {
                name,
                email,
                image: image_url,
            });

            if (response.data) {
                toast.success("Registration successful! You have been assigned the Bronze Badge.");
                const result = await handleRegister(email, password);
                await updateUserProfile(name, image_url);

                console.log(result);
                navigate('/');


            }
        } catch (err) {
            toast.error("Error registering user. Please try again.");
            console.error(err);
        }
    };




    return (
        <div className="flex flex-col lg:flex-row p-10 gap-10">
            <Helmet>
                <title>cm || SignUp</title>
            </Helmet>
            
            <div className="flex-1">
             
                <img src={img} alt="" />
            </div>
            <div className="flex-1">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 my-5">
                    {/* Name */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name  </span>
                        </label>
                        <input
                            {...register("name", { required: "Name is required" })}
                            type="text"
                            placeholder="Enter your name"
                            className="input input-bordered"
                        />
                        {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                    </div>

                    {/* Image */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Photo  </span>
                        </label>
                        <input
                            {...register("file", { required: "Profile picture is required" })}
                            type="file"
                            className=" "
                        />
                        {errors.file && <span className="text-red-500 text-sm">{errors.file.message}</span>}
                    </div>

                    {/* Email */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            {...register("email", { required: "Email is required" })}
                            type="email"
                            placeholder="Enter your email"
                            className="input input-bordered"
                        />
                        {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                    </div>

                    {/* Password */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            {...register("password", {
                                required: "Password is required",
                                minLength: { value: 6, message: "Password must be at least 6 characters" }
                            })}
                            type="password"
                            placeholder="Enter your password"
                            className="input input-bordered"
                        />
                        {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                    </div>

                    {/* Submit Button */}
                    <div className="form-control mt-6">
                        <button type="submit" className="btn btn-outline  btn-primary w-full">Register</button>
                        {/* Social Login */}
                        <div className="divider">OR</div>
                        <SocialLogin></SocialLogin>
                    </div>

                    {/* Link to Login */}
                    <p className="text-xl text-gray-600">
                        Already have an account?{" "}
                        <Link to="/login" className="text-green-500 underline">Login</Link>
                    </p>
                </form>

            </div>
        </div>
    );
};

export default SignUp;
