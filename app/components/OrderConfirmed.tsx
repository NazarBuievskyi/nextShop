'use client'

import {motion} from "framer-motion";
import Image from 'next/image'
import thanks from '@/public/giphy.webp'
import Link from "next/link";
import {useCartStore} from "@/store";
import {useEffect} from "react";

export default function OrderConfirmed() {
    const carStore = useCartStore()

    const checkoutOrder = () => {
        setTimeout(() => {
            carStore.setCheckOut('cart',)
        }, 1000)
        carStore.toggleCart()
    }

    useEffect(() => {
        carStore.setPaymentIntent('')
        carStore.clearCart()
    }, [])

    return (
        <motion.div
            className={'flex items-center justify-center my-12'}
            initial={{scale: 0.5, opacity: 0}}
            animate={{scale: 1, opacity: 1}}
        >
            <div className={'p-12 rounded-md text-center'}>
                <h1 className={'text-2xl font-medium'}>Your order has been placed</h1>
                <h2 className={'text-sm my-4'}>Check your email for the bill.</h2>
                <Image src={thanks} className={'py-8'} alt={'Thanks)'}/>
                <div className={'flex items-center justify-center gap-12'}>
                    <Link href={'/dashboard'}>
                        <button onClick={checkoutOrder} className={'font-medium'}>Check your order</button>
                    </Link>
                </div>
            </div>

        </motion.div>
    )
}