'use client'

import {PaymentElement} from "@stripe/react-stripe-js";
import formatPrice from "@/util/PriceFormat";

export default function CheckoutForm({clientSecret}){
    return(
        <form id={'payment-form'}>
            <PaymentElement id={'payment-element'} options={{layout: 'tabs'}}/>
                <h1>Total: {formatPrice}</h1>
            <button id={'submit'} disabled={isLoading || !stripe || !elements}></button>
        </form>
    )
}