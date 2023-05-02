`use client`

import {useCartStore} from "@/store";
import Image from "next/image";
import formatPrice from "@/util/PriceFormat";
import {IoAddCircle, IoRemoveCircle} from "react-icons/io5";
import basket from '@/public/shopping-basket-icon-7465.png'
import {AnimatePresence, motion} from "framer-motion";
import Checkout from "@/app/components/Checkout";
import OrderConfirmed from "@/app/components/OrderConfirmed";

export default function Cart() {
    const cartStore = useCartStore()

    //Total Price
    const totalPrice = cartStore.cart.reduce((acc, item) => {
        return acc + item.unit_amount * item.quantity
    }, 0)

    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            onClick={() => cartStore.toggleCart()}
            className={'fixed w-full h-screen left-0 top-0 bg-black/25'}>

            {/*Card*/}

            <motion.div
                layout
                onClick={(e) => e.stopPropagation()}
                className={'bg-white absolute right-0 top-0  h-screen p-12 overflow-y-scroll text-gray-700 w-full lg:w-2/5'}>
                {cartStore.onCheckOut === 'cart' && (
                    <button onClick={() => cartStore.toggleCart()}
                            className={'text-sm font-bold pb-12'}>Back to store
                    </button>
                )}
                {cartStore.onCheckOut === 'checkout' && (
                    <button onClick={() => cartStore.setCheckOut('cart')}
                            className={'text-sm font-bold pb-12'}>
                        Check your Cart
                    </button>
                )}
                {cartStore.onCheckOut === 'cart' && (
                    <>
                        {cartStore.cart.map(item =>
                            <motion.div
                                layout
                                key={item.id}
                                className={'flex py-4 gap-4'}>
                                <Image className={'rounded-md h-24'} src={item.image} alt={item.name} width={120}
                                       height={120}/>
                                <div>
                                    <h2>{item.name}</h2>
                                    <div className={'flex gap-2'}>
                                        <h2>Quantity: {item.quantity}</h2>
                                        <button onClick={() => cartStore.removeProduct({
                                            id: item.id,
                                            name: item.name,
                                            unit_amount: item.unit_amount,
                                            image: item.image,
                                            quantity: item.quantity
                                        })}>
                                            <IoRemoveCircle/>
                                        </button>
                                        <button onClick={() => cartStore.addProduct({
                                            id: item.id,
                                            name: item.name,
                                            unit_amount: item.unit_amount,
                                            image: item.image,
                                            quantity: item.quantity
                                        })}>
                                            <IoAddCircle/>
                                        </button>
                                    </div>
                                    <p className={'text-sm'}>{item.unit_amount && formatPrice(item.unit_amount)}</p>
                                </div>
                            </motion.div>
                        )}
                    </>
                )}
                {/*Checkout and total button*/}
                {cartStore.cart.length > 0 && cartStore.onCheckOut === 'cart' ? (
                    <motion.div layout>
                        <p>Total: {formatPrice(totalPrice)}</p>
                        <button
                            onClick={() => cartStore.setCheckOut('checkout')}
                            className={'py-2 mt-4 bg-teal-700 w-full rounded-md text-white'}>Checkout
                        </button>
                    </motion.div>
                ) : null}
                {/*Checkout form*/}
                {cartStore.onCheckOut === 'checkout' && <Checkout/>}
                {cartStore.onCheckOut === 'success' && <OrderConfirmed/>}
                <AnimatePresence>
                    {!cartStore.cart.length && cartStore.onCheckOut === 'cart' && (
                        <motion.div
                            animate={{scale: 1, rotateZ: 0, opacity: 0.75}}
                            initial={{scale: 0.5, rotateZ: -10, opacity: 0}}
                            exit={{scale: 1, rotateZ: 0, opacity: 0.75}}
                            className={'flex flex-col items-center gap-12 text-2xl font-medium pt-24 opacity-75'}>
                            <h1>Empty (</h1>
                            <Image src={basket} alt={'empty cart'} width={200} height={200}/>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    )
}