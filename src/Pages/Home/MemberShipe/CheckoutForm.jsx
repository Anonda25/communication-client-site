import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import useAuth from '../../../Hooks/UseAuth';
import { useQuery } from '@tanstack/react-query';
import UsePublic from '../../../Hooks/UsePublic';
import toast from 'react-hot-toast';

const CheckoutForm = () => {
    const [error, setError]=useState();
    const stripe = useStripe();
    const {user}=useAuth()
    const elements = useElements();
    const AxiosSecure=UseAxiosSecure()
    const axiosPiblic=UsePublic()
    const [clientSecret, setClientSecret] = useState()
    const cart=[
        {price:50}
    ]

   
    const { data: userData = [], } = useQuery({
        queryKey: ["userdata", user?.email],
        enabled: !!user?.email, 
        queryFn: async () => {
            const { data } = await AxiosSecure.get(`/user/${user?.email}`);
            return data;
        },
    });
    // console.log(userData?._id);
    

    const TotalPrice = cart.reduce((total, items) => total + items.price, 0)

    useEffect(() => {

        if (TotalPrice > 0) {
            AxiosSecure.post('/payment', { price: TotalPrice })
                .then(res => {
                    // console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }


    }, [AxiosSecure, TotalPrice])


    const handleSubmit = async (event) => {

        // Block native form submission.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setError(error.message)
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setError('')
        }



        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous',
                    
                }
            }
        })

        if (confirmError) {
            console.log("ConfirmError", confirmError);
            
        } else {
            console.log('PaymentIntent', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                console.log(`Payment succeeded! Payment ID: ${paymentIntent.id}`);
                try {
                    const response = await axiosPiblic.patch(`/users/badge/${user?.email}`, );
                    toast.success('Payment succeeded & Badge updated😍',);
                } catch (error) {
                    console.error('Error updating badge:', error);
                }
            }
        }
    };
    return (
        <div className='border'>
            
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button type="submit" className='mt-10 btn btn-accent w-full' disabled={!stripe || !clientSecret}>
                    Pay
                </button>
               
                    <p className='text-red-400'>{error}</p>
                
            </form>

        </div>
    );
};

export default CheckoutForm;


