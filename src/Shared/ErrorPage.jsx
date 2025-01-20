import React from 'react';
import errorImg from '../assets/error.jpg'
import { Link } from 'react-router-dom';
const ErrorPage = () => {
    return (
        <div className='text-center my-10 space-y-2'>
            <img src={errorImg} alt="" className='w-[400px] h-[400px] mx-auto'/>
            <Link to={'/'}><p className='btn btn-accent btn-outline'> Go To Home</p></Link>
        </div>
    );
};

export default ErrorPage;