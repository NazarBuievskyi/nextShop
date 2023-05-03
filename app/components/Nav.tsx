'use client'

import {Session} from "next-auth";
import {signIn, signOut} from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Cart from "@/app/components/Cart";
import {useCartStore} from "@/store";
import {AiFillShopping} from "react-icons/ai";
import {AnimatePresence, motion} from 'framer-motion'
import DarkLight from "@/app/components/DarkLight";



export default function Nav({user}: Session) {
    const cartStore = useCartStore()
    return (
        <nav className={'flex justify-between items-center py-12'}>
            <Link href={'/'}>
                <h1 className={'font-lobster text-2xl'}>Shop Play</h1>
            </Link>
            <ul className={'flex item-center gap-8'}>
                {/*toggle the cart*/}
                <li onClick={() => cartStore.toggleCart()}
                    className={'flex items-center text-3xl relative cursor-pointer'}>
                    <AiFillShopping/>
                    <AnimatePresence>
                        {cartStore.cart.length > 0 && (
                            <motion.span
                                animate={{scale: 1}}
                                inital={{scale: 0}}
                                className={'bg-primary text-white text-sm font-bold w-5 h-5 rounded-full absolute left-4 bottom-4 flex items-center justify-center'}>
                                {cartStore.cart.length}
                            </motion.span>
                        )}
                    </AnimatePresence>
                </li>
                {/*Dark Mode*/}
                <DarkLight/>
                {/*if user is not singed in*/}
                {!user && (
                    <li className={'bg-primary text-white py-2 px-4 rounded-md'}>
                        <button onClick={() => signIn()}>Sign In</button>
                    </li>
                )}
                {user && (
                    <li>
                        <div className={'dropdown dropdown-end cursor-pointer'}>
                            <Image
                                className={'rounded-full'}
                                src={user.image as string}
                                alt={user.name as string}
                                width={38} height={38}
                                tabindex="0"/>

                            <ul tabIndex={0}
                                className="dropdown-content menu p-4 space-y-4 shadow bg-base-100 rounded-box w-72">
                                <Link
                                    className={'hover:bg-base-300 p-2 rounded-md'}
                                    href={'/dashboard'}
                                    onClick={() => {
                                        if (document.activeElement instanceof HTMLElement) {
                                            document.activeElement.blur()
                                        }
                                    }}
                                >Orders</Link>
                                <li className={'hover:bg-base-300 p-2  rounded-md'}
                                    onClick={() => {
                                        signOut()
                                        if (document.activeElement instanceof HTMLElement) {
                                            document.activeElement.blur()
                                        }
                                    }}
                                >Sing out
                                </li>
                            </ul>
                        </div>
                    </li>

                )}
            </ul>
            <AnimatePresence>
                {cartStore.isOpen && <Cart/>}
            </AnimatePresence>
        </nav>
    )
}