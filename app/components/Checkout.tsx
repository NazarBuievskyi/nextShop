'use client'

import {loadStripe, StripeElementsOptions} from "@stripe/stripe-js";
import {Elements} from '@stripe/react-stripe-js'
import {useCartStore} from "@/store";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import CheckoutForm from "@/app/components/CheckoutForm";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)


export default function Checkout() {
    const cartStore = useCartStore()
    const router = useRouter()
    const [clientSecret, setClientSecret] = useState('')

    useEffect(() => {
        //Create payment as soon as page loads up
        fetch('/api/create-payment-intent', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                items: cartStore.cart,
                payment_intent_id: cartStore.paymentIntent,
            }),
        }).then((res) => {
            if (res.status === 403) {
                return router.push('/api/auth/signin')
            }
            //SET CLIENT SECRET and the payment intent associated with it
            return res.json()
        }).then((data) => {
            setClientSecret(data.paymentIntent.client_secret)
            cartStore.setPaymentIntent(data.paymentIntent.id)
        })
    }, [])

    const options: StripeElementsOptions = {
        clientSecret,
        appearance: {
            theme: 'stripe',
            labels: 'floating',

        }
    }

    return (
        <div>
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm clientSecret={clientSecret}/>
                </Elements>

            )}
        </div>
    )
}