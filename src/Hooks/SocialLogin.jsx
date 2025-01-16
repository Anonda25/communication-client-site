import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import useAuth from './UseAuth';
import UsePublic from './UsePublic';
import { useNavigate } from 'react-router-dom';

const SocialLogin = () => {
    const { signInWithGoogle, } = useAuth();
    const axiosPublic = UsePublic()
    const navigate = useNavigate()
    const handleGoogleLogin = () => {
        signInWithGoogle()
            .then(result => {
                console.log(result);
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                    image: result.user?.photoURL
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data);
                        navigate('/')
                    })
            })
    }
    return (
        <div>
            <button onClick={handleGoogleLogin} className="btn btn-outline  btn-primary w-full">
                <FaGoogle></FaGoogle>
                GoogleLogin
            </button>
        </div>
    );
};

export default SocialLogin;