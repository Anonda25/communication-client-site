import { useForm } from "react-hook-form"
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/UseAuth";
import toast from "react-hot-toast";
import SocialLogin from "../Hooks/SocialLogin";

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
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">

                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <p>This is a Login Page </p>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input {...register("email", { required: true })} type="email" placeholder="email" name="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    {...register("password", { required: true })}
                                    type="password"
                                    name="password"
                                    placeholder="password"
                                    className="input input-bordered"
                                    required />

                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary ">Login</button>
                                <div className="divider">OR</div>
                                <SocialLogin></SocialLogin>
                            </div>
                            <p className="text-sm text-gray-600"> You are a new user please!<Link to={'/register'} className="text-green-300">Register</Link></p>
                        </form>
                    </div>
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6 w-3/4">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;