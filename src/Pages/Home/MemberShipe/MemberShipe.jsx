import { Elements } from '@stripe/react-stripe-js';
import React from 'react';
import CheckoutForm from './CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';
import { Helmet } from 'react-helmet-async';

const stripePromise = loadStripe(`${import.meta.env.VITE_STRIPE_KEY}`);
const MemberShipe = () => {

    return (
        <div className='p-4'>
            <Helmet>
                <title> Cm || Membership Page</title>
            </Helmet>
           
            
            <div className='lg:w-3/12 mx-auto bg-gray-200 p-10 my-10 rounded-md'>
                
                <div className='text-center p-3  '>
                    <p className='text-2xl font-semibold'>You have a Membership </p>
                    <p className='my-2 font-semibold'>Pay To <span className='text-accent'>50$</span></p>
                </div>


                <div className='my-5 border-2'>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm />
                    </Elements>
                </div>
            </div>
        </div>
    );
};

export default MemberShipe;
