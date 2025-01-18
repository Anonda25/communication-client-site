import { Elements } from '@stripe/react-stripe-js';
import React from 'react';
import CheckoutForm from './CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';




const stripePromise = loadStripe(`${import.meta.env.VITE_STRIPE_KEY}`);
const MemberShipe = () => {

    return (
        <div>
            <h1 className='text-center text-2xl'>Is member shipe</h1>
            <div className='w-3/4 mx-auto bg-gray-200 p-10 my-10'>
              


                <Elements stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            </div>
        </div>
    );
};

export default MemberShipe;
