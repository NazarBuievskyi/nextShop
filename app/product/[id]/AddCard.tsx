'use client'

import {AddCartType} from "@/types/AddCartType";
import {useCartStore} from "@/store";
import {useState} from "react";

export default function AddCard({name, id, image, unit_amount, quantity,}: AddCartType) {
    const cartStore = useCartStore()
    const [added, setAdded] = useState(false)

    const handleAddToCart = () => {
        cartStore.addProduct({id, image, unit_amount, quantity, name})
        setAdded(true)
        setTimeout(() => {
            setAdded(false)
        }, 1000)
    }

    return (
        <>
            <button onClick={handleAddToCart}
                    disabled={added}
                    className='my-4 btn btn-primary'>
                {!added && <span>Add to cart</span>}
                {added && <span>Adding to cart</span>}
            </button>
        </>
    )
}