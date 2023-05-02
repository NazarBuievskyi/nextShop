import {create} from 'zustand'
import {persist} from 'zustand/middleware'
import {AddCartType} from "@/types/AddCartType";

type CartItem = {
    name: string,
    id: string,
    images?: string[],
    description?: string,
    unit_amount: number,
    quantity: number,
}


type CartState = {
    isOpen: boolean,
    cart: AddCartType[],
    addProduct: (item: AddCartType) => void
    removeProduct: (item: AddCartType) => void
    toggleCart: () => void,
    clearCart: () => void,
    paymentIntent: string,
    onCheckOut: string,

    setPaymentIntent: (val: string) => void
    setCheckOut: (val: string) => void
}
export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            cart: [],
            isOpen: false,
            paymentIntent: '',
            onCheckOut: 'cart',
            toggleCart: () => set((state) => ({isOpen: !state.isOpen})),
            addProduct: (item) => set((state) => {
                const existingItem = state.cart.find(cartItem => cartItem.id === item.id)
                if (existingItem) {
                    const updatedCart = state.cart.map((cartItem) => {
                        if (cartItem.id === item.id) {
                            return {...cartItem, quantity: cartItem.quantity as number + 1}
                        }
                        return cartItem
                    })
                    return {cart: updatedCart}

                } else {
                    return {cart: [...state.cart, {...item, quantity: 1}]}
                }
            }),
            removeProduct: (item) => set(state => {
                const existingItem = state.cart.find((cartItem) => cartItem.id === item.id)
                if (existingItem && existingItem.quantity > 1) {
                    const updateCart = state.cart.map(cartItem => {
                        if (cartItem.id === item.id) {
                            return {...cartItem, quantity: cartItem.quantity - 1}
                        }
                        return cartItem
                    })
                    return {cart: updateCart}
                } else {
                    //remove item from cart
                    const filteredCart = state.cart.filter(cartItem => cartItem.id !== item.id)
                    return {cart: filteredCart}
                }
            }),
            setPaymentIntent: (val) => set((state) => ({paymentIntent: val})),
            setCheckOut: val => set((state) => ({onCheckOut: val})),
            clearCart: () => set((state) => ({cart: []}))
        }),
        {
            name: 'cart-store'
        }
    )
)