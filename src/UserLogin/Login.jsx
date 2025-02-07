import { useForm } from "react-hook-form"
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/UseAuth";
import toast from "react-hot-toast";
import SocialLogin from "../Hooks/SocialLogin";
import img from '.././assets/sign In.jpg'
import { Helmet } from "react-helmet-async";
import { motion } from "motion/react"
const Login = () => {
    const { signIn, user, loading, signInWithGoogle } = useAuth();
    
    const { register,handleSubmit, } = useForm()
    const navigate = useNavigate()
   
    const onSubmit = async (value) => {
       
        const {email, password} = value
        try {
            await signIn(email, password) 
            navigate('/')
            toast.success('Login Successful')
          
        } catch (err) {
            console.log(err);
        }
    }

  

    return (
        <div className="flex flex-col lg:flex-row p-10">
            <Helmet>
                <title>cm || Login</title>
            </Helmet>
            <div className="flex-1">

                <motion.img
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={
                        { x: 0, opacity: 1 }}
                    transition={{
                        delay: 1,
                        x: { type: "spring", stiffness: 60 },
                        opacity: { duration: 2 },
                        ease: "easeIn",
                        duration: 2
                    }} img src={img} alt="" />
            </div>
            <motion.div 
                initial={{ x: 100, opacity: 0 }}
                whileInView={
                    { x: 0, opacity: 1 }}
                transition={{
                    delay: 0.8,
                    x: { type: "spring", stiffness: 60 },
                    opacity: { duration: 1 },
                    ease: "easeIn",
                    duration: 1
                }}
            className="flex-1 p-3 ">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-7 my-20">

                    <div className="divider text-xl font-bold">Log In</div>
                    <div className="">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input {...register("email", { required: true })} type="email" placeholder="email" name="email" className="input input-bordered w-full" required />
                    </div>
                    <div className="">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            {...register("password", { required: true })}
                            type="password"
                            name="password"
                            placeholder="password"
                            className="input input-bordered w-full"
                            required />

                    </div>
                    <div className=" mt-6">
                        <button className="btn btn-outline  btn-primary w-full">Login</button>
                        <div className="divider">OR</div>
                        <SocialLogin></SocialLogin>
                    </div>
                    <p className="text-xl text-gray-600 "> You are a new user please!<Link to={'/register'} className="text-green-300 ml-2 underline">Register</Link></p>
                </form>
            </motion.div>
        </div>
    );
};

export default Login;